const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = async (req, res, next) => {
try {
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) {
return res.status(401).json({
status: 'error',
message: 'No authentication token provided'
});
}
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'research_only_secret_key');
const user = await User.findById(decoded.id).select('-password');
if (!user) {
return res.status(401).json({
status: 'error',
message: 'Invalid authentication token'
});
}
req.user = user;
next();
} catch (error) {
res.status(401).json({
status: 'error',
message: 'Invalid authentication token'
});
}
};
module.exports = { authMiddleware };
