const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // Input validation
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ error: 'Всі поля є обов\'язковими' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Неправильний формат email' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль має бути довше 6 символів' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Користувач з таким email вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Користувач успішно зареєстрований',
      token,
      user: {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Помилка при реєстрації' });
  }
};

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

module.exports = { registerUser, loginUser };

