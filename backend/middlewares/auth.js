const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // ✅ Agar token nahi hai → request allow karo (public routes ke liye)
  if (!authHeader) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  next();
};

module.exports = verifyToken;