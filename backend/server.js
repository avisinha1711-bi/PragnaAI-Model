const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const app = express();
// Security Middleware
app.use(helmet());
app.use(cors({
origin: process.env.FRONTEND_URL || 'http://localhost:3000',
credentials: true
}));
// Rate limiting
const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 100
});
app.use(limiter);
// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// Security headers
app.use((req, res, next) => {
res.header('X-Content-Type-Options', 'nosniff');
res.header('X-Frame-Options', 'DENY');
res.header('X-XSS-Protection', '1; mode=block');
next();
});
// Database connection
require('./config/database')();
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/analysis', require('./routes/analysis'));
app.use('/api/patients', require('./routes/patients'));
app.use('/api/research', require('./routes/research'));
// Health check
app.get('/api/health', (req, res) => {
res.status(200).json({
status: 'success',
message: 'PragnaAI Backend Running',
timestamp: new Date().toISOString()
});
});
// Root endpoint
app.get('/', (req, res) => {
res.json({
message: '🚀 PragnaAI Cancer Diagnosis API',
version: '1.0.0',
disclaimer: '🔬 RESEARCH PROTOTYPE',
endpoints: {
auth: '/api/auth',
analysis: '/api/analysis',
patients: '/api/patients',
research: '/api/research'
}
  });
});
// 404 handler
app.use('*', (req, res) => {
res.status(404).json({
status: 'error',
message: 'Route not found'
});
});
// Error handling
app.use(require('./middleware/errorHandler'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`
🚀 PragnaAI Backend Server Started
📍 Port: ${PORT}
🔬 Research Prototype Only
`);
});
module.exports = app;
