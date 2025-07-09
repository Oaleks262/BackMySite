const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Користувача не знайдено' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Невірний пароль' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ 
      token, 
      user: { 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка входу' });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  // Input validation
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Поточний пароль і новий пароль є обов\'язковими' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Новий пароль має бути довше 6 символів' });
  }

  try {
    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Користувача не знайдено' });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Поточний пароль невірний' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.status(200).json({ message: 'Пароль успішно змінено' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при зміні пароля' });
  }
};

module.exports = { loginUser, changePassword };

