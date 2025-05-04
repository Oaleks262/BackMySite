const generatePassword = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < length; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    return pass;
  };
  
  module.exports = generatePassword;
  