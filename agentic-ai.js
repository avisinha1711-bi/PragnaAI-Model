// agentic-ai.js - Core Agentic AI System
class PragnaAgenticAI {
    constructor() {
        this.agents = {};
        this.reasoningChain = [];
        this.consensusResults = null;
        this.isActive = false;
        this.init();
    }

    async init() {
        console.log("🤖 Initializing PragnaAI Agentic System...");
        this.updateSystemStatus("Initializing Multi-Agent Network");
        
        // Initialize specialized agents
        this.agents = {
            biomarkerAnalyst: new BiomarkerAnalysisAgent(),
            clinicalConsultant: new ClinicalConsultationAgent(),
            riskAssessor: new RiskAssessmentAgent(),
            dataValidator: new DataValidationAgent(),
            reportGenerator: new ReportGenerationAgent()
        };

        await this.initializeAgents();
        this.isActive = true;
        this.updateSystemStatus("Agents Ready - Awaiting Patient Data");
    }

    async initializeAgents() {
        const agentPromises = Object.values(this.agents).map(agent => 
            agent.initialize ? agent.initialize() : Promise.resolve()
        );
        await Promise.all(agentPromises);
    }

    async performAgenticDiagnosis(patientData) {
        if (!this.isActive) {
            throw new Error("Agentic system not initialized");
        }

        this.updateSystemStatus("Orchestrating Multi-Agent Analysis");
        this.clearReasoningDisplay();

        try {
            // Step 1: Data Validation
            await this.executeAgentWorkflow('dataValidator', patientData, "Validating input data quality...");
            
            // Step 2: Parallel Agent Analysis
            const analysisResults = await this.parallelAgentAnalysis(patientData);
            
            // Step 3: Build Consensus
            this.consensusResults = await this.buildAgentConsensus(analysisResults);
            
            // Step 4: Generate Comprehensive Report
            const finalReport = await this.generateComprehensiveReport(analysisResults);
            
            this.updateSystemStatus("Analysis Complete - Consensus Reached");
            return finalReport;

        } catch (error) {
            this.updateSystemStatus(`Analysis Failed: ${error.message}`);
            throw error;
        }
    }

    async parallelAgentAnalysis(patientData) {
        this.addReasoningStep("Multi-Agent", "Initiating parallel agent analysis...");
        
        const analysisPromises = {
            biomarker: this.agents.biomarkerAnalyst.analyze(patientData),
            clinical: this.agents.clinicalConsultant.analyze(patientData),
            risk: this.agents.riskAssessor.analyze(patientData)
        };

        const results = await Promise.allSettled(Object.values(analysisPromises));
        
        // Process results
        return this.processAgentResults(results, Object.keys(analysisPromises));
    }

    async buildAgentConsensus(analysisResults) {
        this.addReasoningStep("Consensus", "Building multi-agent consensus...");
        
        const agentOpinions = analysisResults.map(result => ({
            agent: result.agent,
            riskLevel: result.riskLevel,
            confidence: result.confidence,
            reasoning: result.reasoning,
            timestamp: new Date().toISOString()
        }));

        // Calculate weighted consensus
        const consensus = this.calculateWeightedConsensus(agentOpinions);
        
        this.displayAgentConsensus(agentOpinions);
        return consensus;
    }

    calculateWeightedConsensus(opinions) {
        const weights = {
            biomarkerAnalyst: 0.4,
            clinicalConsultant: 0.35,
            riskAssessor: 0.25
        };

        let totalWeight = 0;
        let weightedProbability = 0;
        let combinedConfidence = 0;

        opinions.forEach(opinion => {
            const weight = weights[opinion.agent] || 0.3;
            weightedProbability += this.riskToProbability(opinion.riskLevel) * weight;
            combinedConfidence += opinion.confidence * weight;
            totalWeight += weight;
        });

        const finalProbability = weightedProbability / totalWeight;
        const finalConfidence = combinedConfidence / totalWeight;

        return {
            probability: finalProbability,
            confidence: finalConfidence,
            riskLevel: this.probabilityToRiskLevel(finalProbability),
            agentAgreement: this.calculateAgreementScore(opinions),
            timestamp: new Date().toISOString()
        };
    }

    riskToProbability(riskLevel) {
        const riskMap = {
            'HIGH': 0.85,
            'MODERATE_HIGH': 0.65,
            'MODERATE': 0.45,
            'LOW_MODERATE': 0.25,
            'LOW': 0.1
        };
        return riskMap[riskLevel] || 0.5;
    }

    probabilityToRiskLevel(probability) {
        if (probability >= 0.8) return 'HIGH';
        if (probability >= 0.6) return 'MODERATE_HIGH';
        if (probability >= 0.4) return 'MODERATE';
        if (probability >= 0.2) return 'LOW_MODERATE';
        return 'LOW';
    }

    calculateAgreementScore(opinions) {
        if (opinions.length <= 1) return 1;
        
        const riskValues = opinions.map(op => this.riskToProbability(op.riskLevel));
        const mean = riskValues.reduce((a, b) => a + b) / riskValues.length;
        const variance = riskValues.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / riskValues.length;
        
        return Math.max(0, 1 - Math.sqrt(variance));
    }

    // UI Integration Methods
    updateSystemStatus(status) {
        const statusElement = document.getElementById('system-status');
        if (statusElement) {
            statusElement.textContent = status;
        }
        console.log(`🔧 System Status: ${status}`);
    }

    addReasoningStep(agent, reasoning) {
        const step = {
            agent,
            reasoning,
            timestamp: new Date().toISOString(),
            step: this.reasoningChain.length + 1
        };
        
        this.reasoningChain.push(step);
        this.displayReasoningStep(step);
    }

    displayReasoningStep(step) {
        const reasoningChain = document.getElementById('reasoning-chain');
        if (!reasoningChain) return;

        const stepElement = document.createElement('div');
        stepElement.className = 'reasoning-step';
        stepElement.innerHTML = `
            <div class="step-marker">${step.step}</div>
            <div class="step-content">
                <strong>${step.agent}:</strong> ${step.reasoning}
                <div class="step-time">${new Date(step.timestamp).toLocaleTimeString()}</div>
            </div>
        `;

        reasoningChain.appendChild(stepElement);
        stepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    displayAgentConsensus(opinions) {
        const agentOpinionsElement = document.getElementById('agent-opinions');
        if (!agentOpinionsElement) return;

        agentOpinionsElement.innerHTML = '';

        opinions.forEach(opinion => {
            const opinionElement = document.createElement('div');
            opinionElement.className = `agent-opinion ${opinion.riskLevel.toLowerCase().replace('_', '-')}-risk`;
            opinionElement.innerHTML = `
                <div class="agent-name">${this.formatAgentName(opinion.agent)}</div>
                <div class="risk-assessment">Risk: ${opinion.riskLevel}</div>
                <div class="agent-reasoning">${opinion.reasoning}</div>
                <div class="agent-confidence">Confidence: ${Math.round(opinion.confidence * 100)}%</div>
            `;
            agentOpinionsElement.appendChild(opinionElement);
        });
    }

    formatAgentName(agentId) {
        const nameMap = {
            biomarkerAnalyst: 'Biomarker Analyst',
            clinicalConsultant: 'Clinical Consultant', 
            riskAssessor: 'Risk Assessor',
            dataValidator: 'Data Validator'
        };
        return nameMap[agentId] || agentId;
    }

    clearReasoningDisplay() {
        this.reasoningChain = [];
        const reasoningChain = document.getElementById('reasoning-chain');
        if (reasoningChain) {
            reasoningChain.innerHTML = `
                <div class="reasoning-step">
                    <div class="step-marker">1</div>
                    <div class="step-content">
                        <strong>System:</strong> Starting agentic analysis...
                    </div>
                </div>
            `;
        }
    }

    async executeAgentWorkflow(agentName, data, reasoning) {
        this.addReasoningStep(agentName, reasoning);
        
        // Simulate agent processing time
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
        
        const result = await this.agents[agentName].analyze(data);
        this.addReasoningStep(agentName, `Completed: ${result.summary}`);
        
        return result;
    }

    async generateComprehensiveReport(analysisResults) {
        this.addReasoningStep("Report Generator", "Compiling comprehensive diagnostic report...");
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            ...this.consensusResults,
            detailedAnalysis: analysisResults,
            reasoningChain: this.reasoningChain,
            systemVersion: "PragnaAI-Agentic-v1.0",
            reportGenerated: new Date().toISOString(),
            agentic: true
        };
    }
}

// Make globally available
window.PragnaAgenticAI = PragnaAgenticAI;
