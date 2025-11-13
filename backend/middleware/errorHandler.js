const errorHandler = (err, req, res, next) => {
let error = { ...err };
error.message = err.message;
console.error('Error:', err);
// Mongoose errors
if (err.name === 'CastError') {
const message = 'Resource not found';
error = { message, statusCode: 404 };
}
if (err.code === 11000) {
const message = 'Duplicate field value entered';
error = { message, statusCode: 400 };
}
if (err.name === 'ValidationError') {
const message = Object.values(err.errors).map(val => val.message).join(', ');
error = { message, statusCode: 400 };
}
// JWT errors
if (err.name === 'JsonWebTokenError') {
  const message = 'Invalid token';
error = { message, statusCode: 401 };
}
res.status(error.statusCode || 500).json({
status: 'error',
message: error.message || 'Server Error'
});
};
module.exports = errorHandler;
required: [true, 'Email is required'],
unique: true,
lowercase: true
},
password: {
type: String,
required: [true, 'Password is required'],
minlength: [6, 'Password must be at least 6 characters'],
select: false
},
role: {
type: String,
enum: ['researcher', 'doctor'],
default: 'researcher'
}
}, {
timestamps: true
});
// Encrypt password
userSchema.pre('save', async function(next) {
if (!this.isModified('password')) {
next();
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});
// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);
unique: true
},
createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
}
}, {
timestamps: true
});
// Generate research ID
patientSchema.pre('save', function(next) {
if (!this.researchId) {
this.researchId = `RES${Date.now()}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
}
next();
});
module.exports = mongoose.model('Patient', patientSchema);
