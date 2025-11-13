const mongoose = require('mongoose');
const analysisSchema = new mongoose.Schema({
patientId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Patient',
required: true
  },
molecularReadings: {
carbonylStretch: {
value: { type: Number, required: true },
unit: { type: String, default: 'MHz' }
},
methylDeformation: {
value: { type: Number, required: true },
unit: { type: String, default: 'MHz' }
},
carbonOxygenStretch: {
value: { type: Number, required: true },
unit: { type: String, default: 'MHz' }
},
hydroxylStretch: {
value: { type: Number, required: true },
unit: { type: String, default: 'MHz' }
}
},
analysisResults: {
cancerProbability: {
type: Number,
required: true,
min: 0,
max: 1
},
riskLevel: {
type: String,
enum: ['low', 'medium', 'high'],
required: true
  },
confidenceScore: {
type: Number,
required: true
},
molecularReasons: [String],
recommendations: [String],
aiReasoning: String
},
mlModelVersion: {
type: String,
default: 'lactic-acid-v1.0'
},
createdBy: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
}
}, {
timestamps: true
});
module.exports = mongoose.model('Analysis', analysisSchema);
