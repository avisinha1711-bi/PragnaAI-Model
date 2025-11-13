const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { validateLacticAcidAnalysis } = require('../middleware/validation');
const analysisController = require('../controllers/analysisController');
router.use(authMiddleware);
router.post('/lactic-acid', validateLacticAcidAnalysis, analysisController.analyzeLacticAcid);
router.get('/history', analysisController.getAnalysisHistory);
module.exports = router;
