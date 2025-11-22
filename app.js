// app.js - Enhanced with Agentic AI Integration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Agentic AI System
    window.agenticAI = new PragnaAgenticAI();
    
    // Modify your existing analyzePatient function
    async function analyzePatient() {
        // Your existing validation code...
        
        // Use Agentic AI instead of simple calculation
        const patientData = {
            vibrations: [input1.value, input2.value, input3.value, input4.value].map(parseFloat),
            age: parseInt(document.getElementById('patient-age').value),
            gender: document.querySelector('input[name="gender"]:checked')?.value,
            name: document.getElementById('patient-name').value
        };
        
        try {
            const agenticResult = await window.agenticAI.performAgenticDiagnosis(patientData);
            displayAgenticResults(agenticResult);
        } catch (error) {
            console.error('Agentic analysis failed:', error);
            // Fallback to original method
            const probability = enhancedLacticAcidPrediction(patientData.vibrations);
            displayResults(probability, patientData.name, patientData.age, patientData.gender);
        }
    }
    
    function displayAgenticResults(result) {
        // Enhanced display with agentic features
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h3>🤖 Agentic AI Diagnosis Report</h3>
            <div class="agentic-summary">
                <div class="consensus-risk">Consensus Risk: ${result.riskLevel}</div>
                <div class="probability">Probability: ${Math.round(result.probability * 100)}%</div>
                <div class="confidence">Confidence: ${Math.round(result.confidence * 100)}%</div>
                <div class="agent-agreement">Agent Agreement: ${Math.round(result.agentAgreement * 100)}%</div>
            </div>
            <!-- Your existing display logic... -->
        `;
        
        // Show reasoning chain
        displayReasoningChain(result.reasoningChain);
    }
});
