const bcrypt = require('bcrypt');
const { authenticator } = require('otplib');
const qrcode = require('qrcode');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generate2FASecret = () => {
  return authenticator.generateSecret();
};

const verify2FAToken = (token, secret) => {
  return authenticator.check(token, secret);
};

const generateQRCode = async (otpauthUrl) => {
  return await qrcode.toDataURL(otpauthUrl);
};

module.exports = {
  hashPassword,
  verifyPassword,
  generate2FASecret,
  verify2FAToken,
  generateQRCode,
};
