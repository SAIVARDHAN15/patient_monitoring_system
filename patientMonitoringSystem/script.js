document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login');
    const dashboard = document.getElementById('dashboard');
    const diseaseForm = document.getElementById('diseaseForm');
    const diseaseElement = document.getElementById('disease');
    const prescriptionList = document.getElementById('prescriptionList');
    const historyList = document.getElementById('historyList');
    const currentMeds = document.getElementById('currentMeds');
    const patientNameElement = document.getElementById('patientName');
    const patientAgeElement = document.getElementById('patientAge');

    // Login form handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const age = document.getElementById('age').value;

        if (username && password && age) {
            patientNameElement.textContent = username;
            patientAgeElement.textContent = age;
            loginForm.parentElement.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Please enter valid credentials.');
        }
    });

    // Disease form handler
    diseaseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newDisease = document.getElementById('diseaseInput').value;
        diseaseElement.textContent = newDisease;

        // Call Auto recommendation
        const recommendedMeds = await getRecommendedMedication(newDisease);
        currentMeds.textContent = recommendedMeds;

        // Update history
        const newHistoryItem = document.createElement('li');
        newHistoryItem.textContent = `${new Date().toLocaleDateString()}: ${newDisease} - Medication: ${recommendedMeds}`;
        historyList.appendChild(newHistoryItem);

        // Update prescriptions
        const prescriptionItem = document.createElement('p');
        prescriptionItem.textContent = recommendedMeds;
        prescriptionList.appendChild(prescriptionItem);
    });

    // Simulated AI recommendation function
    async function getRecommendedMedication(disease) {
        const recommendations = {
            Hypertension: 'Amlodipine, Lisinopril',
            Diabetes: 'Metformin, Insulin',
            'Common Cold': 'Paracetamol, Antihistamines',
            Flu: 'Oseltamivir, Rest',
            Asthma: 'Albuterol, Inhaled Corticosteroids',
            'Headache': 'Migrane',
            'High Cholesterol': 'Atorvastatin, Simvastatin',
            'Migraine': 'Sumatriptan, Propranolol',
            'cold' : 'citrizene',
            'fever'  : 'paracetomol',
            'Anxiety': 'Sertraline, Diazepam',
            'Depression': 'Fluoxetine, Escitalopram',
            'Arthritis': 'Ibuprofen, Naproxen',
            'Back Pain': 'Acetaminophen, Muscle Relaxants',
            'Allergies': 'Loratadine, Cetirizine',
            'Sinusitis': 'Amoxicillin, Decongestants',
            'Bronchitis': 'Azithromycin, Cough Suppressants',
            'Conjunctivitis': 'Antibiotic Eye Drops, Antihistamines',
            'Eczema': 'Hydrocortisone Cream, Moisturizers',
            'Gout': 'Allopurinol, Colchicine',
            'Psoriasis': 'Topical Corticosteroids, Methotrexate',
            'Hyperthyroidism': 'Methimazole, Propylthiouracil',
            'Hypothyroidism': 'Levothyroxine',
            'Irritable Bowel Syndrome': 'Loperamide, Fiber Supplements',
            'Peptic Ulcer': 'Omeprazole, Clarithromycin',
            'Urinary Tract Infection': 'Ciprofloxacin, Nitrofurantoin',
            'Menstrual Cramps': 'Ibuprofen, Naproxen',
            'Insomnia': 'Zolpidem, Melatonin',
            'Obesity': 'Orlistat, Phentermine',
            'Osteoporosis': 'Alendronate, Calcium Supplements',
            'Parkinson\'s Disease': 'Levodopa, Dopamine Agonists',
            'Rheumatoid Arthritis': 'Methotrexate, Hydroxychloroquine',
            'Sciatica': 'Ibuprofen, Physical Therapy',
            'Shingles': 'Acyclovir, Pain Relievers',
            'Strep Throat': 'Penicillin, Amoxicillin',
            'Tension Headache': 'Aspirin, Acetaminophen',
            'Tonsillitis': 'Penicillin, Pain Relievers',
            'Varicose Veins': 'Compression Stockings, Sclerotherapy',
            'Vertigo': 'Meclizine, Vestibular Rehabilitation',
            'Vitamin D Deficiency': 'Vitamin D Supplements',
            'Acne': 'Benzoyl Peroxide, Retinoids',
            'ADHD': 'Methylphenidate, Amphetamine',
            'Alzheimer\'s Disease': 'Donepezil, Memantine',
            'Anemia': 'Iron Supplements, Vitamin B12',
            'Bipolar Disorder': 'Lithium, Valproate',
            'Chronic Fatigue Syndrome': 'Antidepressants, Cognitive Behavioral Therapy',
            'COPD': 'Tiotropium, Salbutamol',
            'Crohn\'s Disease': 'Infliximab, Mesalamine',
            'Cystic Fibrosis': 'Ivacaftor, Pancreatic Enzymes',
            'Epilepsy': 'Carbamazepine, Lamotrigine',
            'Glaucoma': 'Latanoprost, Timolol',
            'Hepatitis C': 'Sofosbuvir, Ribavirin',
            'HIV/AIDS': 'Antiretroviral Therapy',
            'Multiple Sclerosis': 'Interferon beta, Glatiramer Acetate'
        };
    
        return recommendations[disease] || 'Consult your doctor';
    }
    

    // Simulated real-time data update
    setInterval(() => {
        const bp = `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 10)} mmHg`;
        const temp = `${(97 + Math.random() * 3).toFixed(1)}°F`;
        const pulse = `${Math.floor(60 + Math.random() * 20)} bpm`;

        document.getElementById('bp').textContent = bp;
        document.getElementById('temp').textContent = temp;
        document.getElementById('pulse').textContent = pulse;

        checkAlerts(bp, temp, pulse);
        updateChart(bp, temp, pulse);
    }, 3000);

    function checkAlerts(bp, temp, pulse) {
        const [systolic, diastolic] = bp.split('/').map(Number);
        const temperature = parseFloat(temp);
        const pulseRate = parseInt(pulse);
        const alertList = document.getElementById('alertList');

        let alerts = [];

        if (systolic > 130 || diastolic > 90) {
            alerts.push(`High blood pressure detected: ${bp}`);
        }
        if (temperature > 100.4) {
            alerts.push(`Fever detected: ${temp}`);
        }
        if (pulseRate < 60 || pulseRate > 85) {
            alerts.push(`Abnormal pulse rate detected: ${pulse}`);
        }

        alertList.innerHTML = alerts.map(alert => `<li>${alert}</li>`).join('');
    }

    // Initialize chart
    const ctx = document.getElementById('vitalChart').getContext('2d');
    const vitalChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Blood Pressure (systolic)',
                    borderColor: '#ff6384',
                    data: [],
                    fill: false,
                },
                {
                    label: 'Temperature (°F)',
                    borderColor: '#36a2eb',
                    data: [],
                    fill: false,
                },
                {
                    label: 'Pulse (bpm)',
                    borderColor: '#ffcd56',
                    data: [],
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Values'
                    }
                }
            }
        }
    });

    let time = 0;

    function updateChart(bp, temp, pulse) {
        const [systolic] = bp.split('/').map(Number);
        const temperature = parseFloat(temp);
        const pulseRate = parseInt(pulse);

        vitalChart.data.labels.push(time++);
        vitalChart.data.datasets[0].data.push(systolic);
        vitalChart.data.datasets[1].data.push(temperature);
        vitalChart.data.datasets[2].data.push(pulseRate);

        if (vitalChart.data.labels.length > 20) {
            vitalChart.data.labels.shift();
            vitalChart.data.datasets.forEach(dataset => dataset.data.shift());
        }

        vitalChart.update();
    }
});
