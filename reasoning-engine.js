// reasoning-engine.js - Advanced Reasoning and Explanation System
class ReasoningEngine {
    constructor() {
        this.reasoningSteps = [];
        this.currentContext = null;
    }

    async performChainOfThoughtAnalysis(patientData, vibrations) {
        this.reasoningSteps = [];
        this.currentContext = { patientData, vibrations };
        
        await this.executeReasoningChain();
        return this.generateReasoningSummary();
    }

    async executeReasoningChain() {
        // Step 1: Data Quality Assessment
        await this.addReasoningStep(
            "DATA_QUALITY",
            "Assessing input data quality and completeness...",
            this.assessDataQuality.bind(this)
        );

        // Step 2: Pattern Recognition
        await this.addReasoningStep(
            "PATTERN_RECOGNITION", 
            "Identifying molecular vibration patterns...",
            this.recognizePatterns.bind(this)
        );

        // Step 3: Biomarker Correlation
        await this.addReasoningStep(
            "BIOMARKER_CORRELATION",
            "Correlating patterns with known cancer biomarkers...",
            this.correlateBiomarkers.bind(this)
        );

        // Step 4: Metabolic Pathway Analysis
        await this.addReasoningStep(
            "METABOLIC_ANALYSIS",
            "Analyzing implications for cellular metabolism...",
            this.analyzeMetabolicPathways.bind(this)
        );

        // Step 5: Clinical Significance
        await this.addReasoningStep(
            "CLINICAL_SIGNIFICANCE",
            "Evaluating clinical relevance and risk assessment...",
            this.evaluateClinicalSignificance.bind(this)
        );
    }

    async addReasoningStep(stepType, description, analysisFunction) {
        const step = {
            type: stepType,
            description,
            startTime: new Date(),
            analysis: null
        };

        this.reasoningSteps.push(step);
        this.displayReasoningStep(step);

        // Execute the analysis
        step.analysis = await analysisFunction();
        step.endTime = new Date();
        step.duration = step.endTime - step.startTime;

        this.updateReasoningStep(step);
    }

    assessDataQuality() {
        const { vibrations } = this.currentContext;
        
        return {
            qualityScore: this.calculateDataQuality(vibrations),
            issues: this.identifyDataIssues(vibrations),
            completeness: this.assessCompleteness(vibrations),
            confidence: 0.92
        };
    }

    recognizePatterns() {
        const { vibrations } = this.currentContext;
        const [carbonyl, methyl, carbon_oxygen, hydroxyl] = vibrations;
        
        const patterns = {
            warburgEffect: carbonyl > 1.6 && hydroxyl > 2.5,
            metabolicStress: carbonyl > 1.4 && carbon_oxygen > 3.0,
            energyImbalance: Math.abs((carbonyl/1.2) - (methyl/1.8)) > 0.5,
            oxidativeShift: hydroxyl > 2.8 && carbon_oxygen > 3.2
        };

        return {
            detectedPatterns: Object.keys(patterns).filter(key => patterns[key]),
            patternStrength: this.calculatePatternStrength(patterns),
            consistency: this.assessPatternConsistency(patterns),
            confidence: 0.88
        };
    }

    correlateBiomarkers() {
        const { vibrations } = this.currentContext;
        
        const correlations = {
            carbonyl: this.assessCarbonylSignificance(vibrations[0]),
            hydroxyl: this.assessHydroxylSignificance(vibrations[3]),
            metabolicRatio: this.calculateMetabolicRatio(vibrations),
            patternCluster: this.identifyPatternCluster(vibrations)
        };

        return {
            significantBiomarkers: this.filterSignificantBiomarkers(correlations),
            correlationStrength: this.calculateCorrelationStrength(correlations),
            biomarkerConfidence: this.assessBiomarkerConfidence(correlations),
            confidence: 0.85
        };
    }

    analyzeMetabolicPathways() {
        const { vibrations } = this.currentContext;
        
        return {
            affectedPathways: this.identifyAffectedPathways(vibrations),
            metabolicShift: this.quantifyMetabolicShift(vibrations),
            energyProduction: this.assessEnergyProduction(vibrations),
            confidence: 0.83
        };
    }

    evaluateClinicalSignificance() {
        const { patientData, vibrations } = this.currentContext;
        
        return {
            riskLevel: this.determineOverallRisk(vibrations),
            clinicalUrgency: this.assessClinicalUrgency(vibrations, patientData),
            followUpActions: this.generateFollowUpActions(vibrations, patientData),
            confidence: 0.90
        };
    }

    // Helper methods with detailed implementations
    calculateDataQuality(vibrations) {
        const validRanges = vibrations.every((val, idx) => {
            const ranges = [[0.5, 3.5], [0.8, 3.8], [1.5, 4.8], [1.2, 4.2]];
            return val >= ranges[idx][0] && val <= ranges[idx][1];
        });
        
        return validRanges ? 0.95 : 0.75;
    }

    calculatePatternStrength(patterns) {
        const truePatterns = Object.values(patterns).filter(Boolean).length;
        return truePatterns / Object.keys(patterns).length;
    }

    assessCarbonylSignificance(carbonylValue) {
        if (carbonylValue > 1.8) return { significance: 'HIGH', reasoning: 'Strong indicator of Warburg effect' };
        if (carbonylValue > 1.5) return { significance: 'MEDIUM', reasoning: 'Moderate metabolic alteration' };
        return { significance: 'LOW', reasoning: 'Within normal metabolic range' };
    }

    identifyAffectedPathways(vibrations) {
        const [carbonyl, methyl, carbon_oxygen, hydroxyl] = vibrations;
        const pathways = [];
        
        if (carbonyl > 1.6) pathways.push('Glycolytic Flux');
        if (hydroxyl > 2.8) pathways.push('Oxidative Phosphorylation');
        if (carbonyl > 1.6 && hydroxyl > 2.8) pathways.push('Warburg Metabolism');
        
        return pathways;
    }

    determineOverallRisk(vibrations) {
        const riskScore = this.calculateComprehensiveRisk(vibrations);
        
        if (riskScore > 0.8) return 'HIGH';
        if (riskScore > 0.6) return 'MODERATE_HIGH';
        if (riskScore > 0.4) return 'MODERATE';
        if (riskScore > 0.2) return 'LOW_MODERATE';
        return 'LOW';
    }

    calculateComprehensiveRisk(vibrations) {
        const [carbonyl, methyl, carbon_oxygen, hydroxyl] = vibrations;
        
        let risk = 0;
        
        // Carbonyl contribution (most important)
        risk += Math.max(0, (carbonyl - 1.2) / 0.8) * 0.4;
        
        // Hydroxyl contribution
        risk += Math.max(0, (hydroxyl - 2.2) / 1.0) * 0.3;
        
        // Metabolic imbalance
        const imbalance = Math.abs((carbonyl/1.2) - (methyl/1.8));
        risk += Math.min(1, imbalance / 1.0) * 0.2;
        
        // Pattern consistency bonus
        const patterns = this.recognizePatterns();
        risk += patterns.patternStrength * 0.1;
        
        return Math.min(1, risk);
    }

    generateReasoningSummary() {
        const summary = {
            totalSteps: this.reasoningSteps.length,
            totalDuration: this.reasoningSteps.reduce((acc, step) => acc + step.duration, 0),
            stepDetails: this.reasoningSteps.map(step => ({
                type: step.type,
                description: step.description,
                duration: step.duration,
                analysis: step.analysis
            })),
            finalAssessment: this.synthesizeFinalAssessment()
        };

        return summary;
    }

    synthesizeFinalAssessment() {
        const lastStep = this.reasoningSteps[this.reasoningSteps.length - 1];
        return lastStep.analysis;
    }

    displayReasoningStep(step) {
        console.log(`🧠 ${step.type}: ${step.description}`);
        
        // You can also update UI here
        if (typeof window !== 'undefined' && window.PragnaAgenticAI) {
            window.PragnaAgenticAI.addReasoningStep('ReasoningEngine', step.description);
        }
    }

    updateReasoningStep(step) {
        console.log(`✅ ${step.type} completed in ${step.duration}ms`);
    }
}

// Make available globally
window.ReasoningEngine = ReasoningEngine;
