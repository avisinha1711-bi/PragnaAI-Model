const Analysis = require('../models/Analysis');
const Patient = require('../models/Patient');
const { enhancedLacticAcidPrediction } = require('../utils/mlModel');
// Analyze lactic acid molecular vibrations
exports.analyzeLacticAcid = async (req, res) => {
try {
const startTime = Date.now();
const {
patientName,
patientAge,
patientGender,
molecularReadings
} = req.body;
// Research disclaimer
const researchDisclaimer = "🔬 THIS ANALYSIS IS FOR RESEARCH PURPOSES ONLY - NOT FOR MEDICAL DIAGNOSIS";
// Create patient
const patient = new Patient({
name: patientName,
age: patientAge,
gender: patientGender,
createdBy: req.user.id
});
await patient.save();
// Extract molecular value
  const molecularValues = [
molecularReadings.carbonylStretch,
molecularReadings.methylDeformation,
molecularReadings.carbonOxygenStretch,
molecularReadings.hydroxylStretch
];
// AI analysis
const cancerProbability = enhancedLacticAcidPrediction(molecularValues);
// Determine risk level
let riskLevel = 'low';
if (cancerProbability > 0.8) riskLevel = 'high';
else if (cancerProbability >= 0.5) riskLevel = 'medium';
// Calculate confidence
const confidenceScore = calculateConfidenceScore(molecularValues, cancerProbability);
// Create analysis record
const analysis = new Analysis({
patientId: patient._id,
molecularReadings: {
carbonylStretch: { value: molecularReadings.carbonylStretch },
methylDeformation: { value: molecularReadings.methylDeformation },
carbonOxygenStretch: { value: molecularReadings.carbonOxygenStretch },
hydroxylStretch: { value: molecularReadings.hydroxylStretch }
},
analysisResults: {
cancerProbability,
riskLevel,
  confidenceScore,
molecularReasons: generateMolecularReasons(molecularValues, cancerProbability),
recommendations: generateRecommendations(cancerProbability, riskLevel),
aiReasoning: generateAIReasoning(molecularValues, cancerProbability)
},
createdBy: req.user.id
});
await analysis.save();
// Return response
res.status(200).json({
status: 'success',
message: 'Lactic acid analysis completed',
disclaimer: researchDisclaimer,
analysisId: analysis._id,
results: {
cancerProbability: Math.round(cancerProbability * 100),
riskLevel,
confidenceScore: Math.round(confidenceScore * 100),
molecularReasons: analysis.analysisResults.molecularReasons,
recommendations: analysis.analysisResults.recommendations,
technicalDetails: {
modelVersion: 'lactic-acid-v1.0',
analysisDuration: Date.now() - startTime
}
}
});
} catch (error) {
  console.error('Analysis error:', error);
res.status(500).json({
status: 'error',
message: 'Analysis failed'
});
}
};
// Get analysis history
exports.getAnalysisHistory = async (req, res) => {
try {
const analyses = await Analysis.find({ createdBy: req.user.id })
.populate('patientId', 'name age gender researchId')
.sort({ createdAt: -1 })
.limit(10);
res.status(200).json({
status: 'success',
data: analyses
});
} catch (error) {
res.status(500).json({
status: 'error',
message: 'Failed to fetch analysis history'
});
}
};
// Helper functions
function calculateConfidenceScore(values, probability) {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
const dataQuality = Math.max(0.5, 1 - (variance / 2));
return Math.min(0.95, 0.7 + (probability * 0.2) + (dataQuality * 0.1));
}
function generateMolecularReasons(values, probability) {
const reasons = [];
if (probability > 0.7) {
reasons.push("Elevated carbonyl stretch suggests altered lactic acid metabolism");
reasons.push("Methyl group deformation patterns indicate potential Warburg effect");
} else if (probability > 0.4) {
reasons.push("Moderate changes in lactic acid molecular vibrations detected");
} else {
reasons.push("Lactic acid molecular vibrations within normal ranges");
}
return reasons;
}
function generateRecommendations(probability, riskLevel) {
const recommendations = [];
if (riskLevel === 'high') {
recommendations.push("Consider comprehensive metabolic panel testing");
recommendations.push("LDH levels assessment recommended");
} else if (riskLevel === 'medium') {
recommendations.push("Routine metabolic screening recommended");
} else {
recommendations.push("Maintain routine health checkups");
}
  recommendations.push("REMINDER: This is research data only - consult healthcare professionals");
return recommendations;
}
function generateAIReasoning(values, probability) {
if (probability > 0.7) {
return "The AI has detected significant alterations in lactic acid molecular vibration patterns consistent with cancer metabolism.";
} else if (probability > 0.4) {
return "Moderate changes in lactic acid molecular vibrations observed. Further investigation recommended.";
} else {
return "Lactic acid molecular vibrations appear within normal metabolic ranges.";
}
}
