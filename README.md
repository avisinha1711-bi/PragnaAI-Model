<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BioAI - Biological Research with AI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #0c2e44 0%, #1a4d6e 100%);
            color: #f5f5f5;
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            padding: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo-icon {
            font-size: 2.5rem;
            color: #4ecdc4;
        }
        
        .logo-text {
            font-size: 1.8rem;
            font-weight: 700;
            color: #fff;
        }
        
        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }
        
        nav a {
            color: #f5f5f5;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            font-size: 1.1rem;
        }
        
        nav a:hover {
            color: #4ecdc4;
        }
        
        .hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 80px 0;
        }
        
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, #4ecdc4, #6fffe9);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        
        .hero p {
            font-size: 1.4rem;
            max-width: 800px;
            margin-bottom: 40px;
            color: #d1e8e2;
        }
        
        .btn {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(45deg, #4ecdc4, #2a9d8f);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            text-decoration: none;
        }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
        
        .btn:active {
            transform: translateY(0);
        }
        
        .features {
            padding: 80px 0;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            margin: 40px 0;
        }
        
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 60px;
            color: #4ecdc4;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            transition: transform 0.3s;
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
        }
        
        .feature-icon {
            font-size: 3rem;
            color: #4ecdc4;
            margin-bottom: 20px;
        }
        
        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        .demo {
            padding: 80px 0;
            text-align: center;
        }
        
        .demo-container {
            background: rgba(255, 255, 255, 0.05);
            padding: 40px;
            border-radius: 15px;
            margin-top: 40px;
        }
        
        .input-group {
            margin-bottom: 30px;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 10px;
            font-size: 1.2rem;
        }
        
        .input-group input {
            width: 100%;
            max-width: 500px;
            padding: 15px;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
        }
        
        .result {
            margin-top: 30px;
            padding: 20px;
            background: rgba(78, 205, 196, 0.2);
            border-radius: 8px;
            min-height: 100px;
            text-align: left;
        }
        
        footer {
            text-align: center;
            padding: 40px 0;
            margin-top: 40px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
        }
        
        .social-links a {
            color: #f5f5f5;
            font-size: 1.5rem;
            transition: color 0.3s;
        }
        
        .social-links a:hover {
            color: #4ecdc4;
        }
        
        .api-status {
            margin-top: 20px;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
        }
        
        .status-connected {
            background: rgba(46, 204, 113, 0.2);
            color: #2ecc71;
        }
        
        .status-disconnected {
            background: rgba(231, 76, 60, 0.2);
            color: #e74c3c;
        }
        
        @media (max-width: 768px) {
            nav ul {
                gap: 15px;
                margin-top: 20px;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
            
            .hero p {
                font-size: 1.1rem;
            }
            
            .feature-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-dna"></i>
                </div>
                <div class="logo-text">BioAI</div>
            </div>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#demo">Demo</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
            </nav>
        </header>

        <section class="hero" id="home">
            <h1>Revolutionizing Biology with Artificial Intelligence</h1>
            <p>BioAI leverages cutting-edge machine learning algorithms to analyze biological data, predict protein structures, and accelerate drug discovery.</p>
            <a href="#demo" class="btn">Try Our Demo</a>
        </section>

        <section class="features" id="features">
            <h2 class="section-title">Our Capabilities</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-dna"></i>
                    </div>
                    <h3>Genome Analysis</h3>
                    <p>Advanced AI algorithms for genome sequencing and variant detection with unprecedented accuracy.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-pills"></i>
                    </div>
                    <h3>Drug Discovery</h3>
                    <p>Predict molecular interactions and identify potential drug candidates faster than traditional methods.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-microscope"></i>
                    </div>
                    <h3>Protein Folding</h3>
                    <p>Predict 3D protein structures from amino acid sequences with state-of-the-art deep learning models.</p>
                </div>
            </div>
        </section>

        <section class="demo" id="demo">
            <h2 class="section-title">Interactive Demo</h2>
            <p>Enter a protein sequence to see our AI in action (example: MLPGLALLLL)</p>
            
            <div class="demo-container">
                <div class="input-group">
                    <label for="protein-input">Protein Sequence</label>
                    <input type="text" id="protein-input" placeholder="Enter protein sequence...">
                </div>
                <button class="btn" onclick="analyzeProtein()">Analyze Sequence</button>
                
                <div class="result" id="result">
                    <p>Results will be displayed here</p>
                </div>
                
                <div class="api-status" id="api-status">
                    <p>Checking backend connection...</p>
                </div>
            </div>
        </section>

        <footer id="about">
            <h3>BioAI Research Initiative</h3>
            <p>Advancing the frontier of biological sciences through artificial intelligence</p>
            
            <div class="social-links">
                <a href="#"><i class="fab fa-github"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
            
            <p>&copy; 2023 BioAI. All rights reserved.</p>
        </footer>
    </div>

    <script>
        // Function to check backend connection
        async function checkBackendConnection() {
            const statusElement = document.getElementById('api-status');
            
            try {
                // Replace with your actual backend API endpoint
                const response = await fetch('https://your-backend-url.com/api/status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    statusElement.innerHTML = '<p class="status-connected"><i class="fas fa-check-circle"></i> Successfully connected to BioAI backend</p>';
                } else {
                    throw new Error('Backend not responding correctly');
                }
            } catch (error) {
                statusElement.innerHTML = '<p class="status-disconnected"><i class="fas fa-exclamation-circle"></i> Could not connect to backend. Using demo mode.</p>';
                console.error('Backend connection error:', error);
            }
        }
        
        // Function to analyze protein sequence
        async function analyzeProtein() {
            const input = document.getElementById('protein-input').value;
            const resultDiv = document.getElementById('result');
            
            if (!input) {
                resultDiv.innerHTML = '<p>Please enter a protein sequence to analyze</p>';
                return;
            }
            
            // Simple validation for protein sequence (only amino acid letters)
            if (!/^[ACDEFGHIKLMNPQRSTVWY]+$/i.test(input)) {
                resultDiv.innerHTML = '<p>Please enter a valid protein sequence containing only standard amino acid codes</p>';
                return;
            }
            
            // Show loading state
            resultDiv.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Analyzing sequence with BioAI model...</p>';
            
            try {
                // Replace with your actual backend API endpoint
                const response = await fetch('https://your-backend-url.com/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sequence: input })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    
                    // Display results from backend
                    resultDiv.innerHTML = `
                        <h3>Analysis Results</h3>
                        <p><strong>Sequence Length:</strong> ${data.length} amino acids</p>
                        <p><strong>Molecular Weight:</strong> ≈ ${data.molecularWeight} Da</p>
                        <p><strong>Hydrophobicity Index:</strong> ${data.hydrophobicity}</p>
                        <p><strong>Predicted Structure:</strong> ${data.structure}</p>
                        <p><strong>Confidence:</strong> ${data.confidence}%</p>
                    `;
                } else {
                    throw new Error('Backend analysis failed');
                }
            } catch (error) {
                // Fallback to demo mode if backend is unavailable
                console.error('API call failed:', error);
                
                // Simulate analysis results
                setTimeout(() => {
                    const length = input.length;
                    const molecularWeight = (length * 110).toFixed(2);
                    const hydrophobicity = (Math.random() * 50).toFixed(2);
                    
                    resultDiv.innerHTML = `
                        <h3>Analysis Results (Demo Mode)</h3>
                        <p><strong>Sequence Length:</strong> ${length} amino acids</p>
                        <p><strong>Molecular Weight:</strong> ≈ ${molecularWeight} Da</p>
                        <p><strong>Hydrophobicity Index:</strong> ${hydrophobicity}</p>
                        <p><strong>Predicted Structure:</strong> Mainly alpha helices with some beta sheets</p>
                        <p><strong>Confidence:</strong> 92.7%</p>
                        <p><em>Note: These are demo results. Connect to backend for accurate analysis.</em></p>
                    `;
                }, 2000);
            }
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Check backend connection when page loads
        document.addEventListener('DOMContentLoaded', function() {
            checkBackendConnection();
        });
    </script>
</body>
</html>
