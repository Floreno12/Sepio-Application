const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, generate2FASecret, verifyPassword, verify2FAToken, generateQRCode } = require('../utils/authUtils');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const secret2FA = generate2FASecret();
  const otpauthUrl = authenticator.keyuri(name, 'MyApp', secret2FA);
  const qrCode = await generateQRCode(otpauthUrl);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        secret2FA,
      },
    });
    res.json({ user: newUser, qrCode });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
};

const loginUser = async (req, res) => {
  const { name, password, token2FA } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    if (!verify2FAToken(token2FA, user.secret2FA)) {
      return res.status(401).send('Invalid 2FA token');
    }

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { registerUser, loginUser };

