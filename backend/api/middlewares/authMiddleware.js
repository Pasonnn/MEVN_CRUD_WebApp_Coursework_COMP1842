// ../middlewares/authMiddleware.js

const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

exports.authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: "No token provided." });

  try {
    // Decode the token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID
    req.userRole = decoded.role; // Attach user role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token.", details: err.message });
  }
};

exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    console.log('Authorized Roles:', roles);
    console.log('Requesting User Role:', req.userRole);
    // Check user role (assuming you add a `role` field to the User model)
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: "Access denied." });
    }
    next();
  };
};
