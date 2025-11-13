const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Generate JWT Token
const generateToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET || 'research_only_secret_key', {
expiresIn: '30d',
});
};
// Register user
exports.register = async (req, res) => {
try {
const { name, email, password } = req.body;
const userExists = await User.findOne({ email });
if (userExists) {
return res.status(400).json({
status: 'error',
message: 'User already exists with this email'
});
}
const user = await User.create({ name, email, password });
const token = generateToken(user._id);
res.status(201).json({
status: 'success',
message: 'User registered successfully',
  data: {
user: {
id: user._id,
name: user.name,
email: user.email,
role: user.role
},
token,
disclaimer: '🔬 RESEARCH PLATFORM'
}
});
} catch (error) {
res.status(500).json({
status: 'error',
message: 'Registration failed'
});
}
};
// Login user
exports.login = async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email }).select('+password');
if (user && (await user.matchPassword(password))) {
const token = generateToken(user._id);
  res.json({
status: 'success',
message: 'Login successful',
data: {
user: {
id: user._id,
name: user.name,
email: user.email,
role: user.role
},
token
}
});
} else {
res.status(401).json({
status: 'error',
message: 'Invalid email or password'
});
}
} catch (error) {
res.status(500).json({
status: 'error',
message: 'Login failed'
});
}
};
