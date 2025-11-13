const Joi = require('joi');
// Validation schemas
const lacticAcidAnalysisSchema = Joi.object({
patientName: Joi.string().min(1).max(100).required(),
  patientAge: Joi.number().integer().min(1).max(120).required(),
patientGender: Joi.string().valid('male', 'female', 'other').required(),
molecularReadings: Joi.object({
carbonylStretch: Joi.number().min(0).max(10).required(),
methylDeformation: Joi.number().min(0).max(10).required(),
carbonOxygenStretch: Joi.number().min(0).max(10).required(),
hydroxylStretch: Joi.number().min(0).max(10).required()
}).required()
});
const userSchema = Joi.object({
email: Joi.string().email().required(),
password: Joi.string().min(6).required(),
name: Joi.string().min(2).max(50).required()
});
const validate = (schema) => {
return (req, res, next) => {
const { error } = schema.validate(req.body);
if (error) {
return res.status(400).json({
status: 'error',
message: 'Validation failed',
errors: error.details.map(detail => detail.message)
});
}
next();
};
};
module.exports = {
validateLacticAcidAnalysis: validate(lacticAcidAnalysisSchema),
validateUser: validate(userSchema)
};
