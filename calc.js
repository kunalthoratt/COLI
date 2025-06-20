// ==== City COLI Database ====
const cityCOLIs = [
    { name: "New York, NY, USA", coli: 100 },
    { name: "San Francisco, CA, USA", coli: 92 },
    { name: "London, UK", coli: 85 },
    { name: "Berlin, Germany", coli: 65 },
    { name: "Mumbai, India", coli: 30 },
    { name: "Delhi, India", coli: 28 },
    { name: "Sydney, Australia", coli: 78 },
    { name: "Tokyo, Japan", coli: 81 },
    { name: "Paris, France", coli: 73 },
    { name: "Toronto, Canada", coli: 63 },
    { name: "Singapore", coli: 83 },
    { name: "Dubai, UAE", coli: 71 },
    { name: "Los Angeles, CA, USA", coli: 82 },
    { name: "Chicago, IL, USA", coli: 73 },
    { name: "Boston, MA, USA", coli: 80 },
    { name: "Zurich, Switzerland", coli: 120 },
    { name: "Geneva, Switzerland", coli: 118 },
    { name: "Hong Kong", coli: 91 },
    { name: "Barcelona, Spain", coli: 62 },
    { name: "Amsterdam, Netherlands", coli: 77 },
    { name: "Rome, Italy", coli: 60 },
    { name: "Istanbul, Turkey", coli: 40 },
    { name: "Bangkok, Thailand", coli: 52 },
    { name: "Cape Town, South Africa", coli: 42 },
    { name: "Mexico City, Mexico", coli: 35 },
    { name: "Moscow, Russia", coli: 49 },
    { name: "Vienna, Austria", coli: 70 },
    { name: "Copenhagen, Denmark", coli: 95 },
    { name: "Oslo, Norway", coli: 87 },
    { name: "Stockholm, Sweden", coli: 81 },
    { name: "Helsinki, Finland", coli: 73 },
    { name: "Seoul, South Korea", coli: 75 },
    { name: "Beijing, China", coli: 53 },
    { name: "Shenzhen, China", coli: 58 },
    { name: "Jakarta, Indonesia", coli: 34 },
    { name: "Kuala Lumpur, Malaysia", coli: 32 },
    { name: "Lisbon, Portugal", coli: 56 },
    { name: "Brussels, Belgium", coli: 67 },
    { name: "Madrid, Spain", coli: 64 },
    { name: "Budapest, Hungary", coli: 46 },
    { name: "Warsaw, Poland", coli: 45 }
    // ... add more as you wish
];

// ==== City COLI Search Logic ====
const citySearch = document.getElementById('citySearch');
const cityResults = document.getElementById('cityResults');

citySearch.addEventListener('input', function() {
    const query = citySearch.value.trim().toLowerCase();
    cityResults.innerHTML = '';
    if (query.length === 0) return;
    const matches = cityCOLIs.filter(c => c.name.toLowerCase().includes(query));
    matches.forEach(c => {
        const li = document.createElement('li');
        li.textContent = `${c.name} (COLI: ${c.coli})`;
        li.onclick = () => {
            // Ask user which city panel to fill (1 or 2)
            let panel = "1";
            if (document.getElementById('city1').value.length > 0 && document.getElementById('coli1').value) {
                // If City 1 is already filled, suggest City 2
                panel = "2";
            }
            // Confirm with user
            if (panel === "1" && document.getElementById('coli1').value.length > 0) {
                panel = prompt("Copy COLI to City 1 or 2? Enter 1 or 2:", "1") || "1";
            } else if (panel === "2" && document.getElementById('coli2').value.length > 0) {
                panel = prompt("Copy COLI to City 1 or 2? Enter 1 or 2:", "2") || "2";
            }
            if (panel === "1") {
                document.getElementById('city1').value = c.name;
                document.getElementById('coli1').value = c.coli;
            } else if (panel === "2") {
                document.getElementById('city2').value = c.name;
                document.getElementById('coli2').value = c.coli;
            }
        };
        cityResults.appendChild(li);
    });
});

// ==== Calculator Logic ====
document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const coli1 = parseFloat(document.getElementById('coli1').value);
    const coli2 = parseFloat(document.getElementById('coli2').value);
    const salary = parseFloat(document.getElementById('currentSalary').value);

    if (isNaN(coli1) || isNaN(coli2) || isNaN(salary) || coli1 <= 0 || coli2 <= 0 || salary <= 0) {
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').textContent = "Please enter valid, positive numbers for all fields.";
        return;
    }

    const equivalentSalary = Math.round((salary * coli2 / coli1) * 100) / 100;

    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerHTML = 
        `To maintain the same standard of living, you would need a salary of <strong>${equivalentSalary}</strong> in <strong>${document.getElementById('city2').value || 'your target city'}</strong>.`;
});
