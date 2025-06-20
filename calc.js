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
];

// ==== City COLI Search Logic ====
window.addEventListener('DOMContentLoaded', function() {
    const citySearch = document.getElementById('citySearch');
    const cityResults = document.getElementById('cityResults');
    const city1 = document.getElementById('city1');
    const city2 = document.getElementById('city2');
    const coli1 = document.getElementById('coli1');
    const coli2 = document.getElementById('coli2');

    if (citySearch && cityResults) {
        citySearch.addEventListener('input', function() {
            const query = citySearch.value.trim().toLowerCase();
            cityResults.innerHTML = '';
            if (query.length === 0) return;
            const matches = cityCOLIs.filter(c => c.name.toLowerCase().includes(query));
            matches.forEach(c => {
                const li = document.createElement('li');
                li.textContent = `${c.name} (COLI: ${c.coli})`;
                li.onclick = () => {
                    let panel = "1";
                    if (city1.value.length > 0 && coli1.value) {
                        panel = "2";
                    }
                    if ((panel === "1" && coli1.value.length > 0) || (panel === "2" && coli2.value.length > 0)) {
                        panel = prompt("Copy COLI to City 1 or 2? Enter 1 or 2:", panel) || panel;
                    }
                    if (panel === "1") {
                        city1.value = c.name;
                        coli1.value = c.coli;
                    } else if (panel === "2") {
                        city2.value = c.name;
                        coli2.value = c.coli;
                    }
                };
                cityResults.appendChild(li);
            });
        });
    }

    // ==== Calculator Logic ====
    const form = document.getElementById('calcForm');
    const resultDiv = document.getElementById('result');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const coli1Val = parseFloat(coli1.value);
            const coli2Val = parseFloat(coli2.value);
            const salaryVal = parseFloat(document.getElementById('currentSalary').value);

            if (isNaN(coli1Val) || isNaN(coli2Val) || isNaN(salaryVal) || coli1Val <= 0 || coli2Val <= 0 || salaryVal <= 0) {
                resultDiv.style.display = 'block';
                resultDiv.textContent = "Please enter valid, positive numbers for all fields.";
                return;
            }

            const equivalentSalary = Math.round((salaryVal * coli2Val / coli1Val) * 100) / 100;

            resultDiv.style.display = 'block';
            resultDiv.innerHTML = 
                `To maintain the same standard of living, you would need a salary of <strong>${equivalentSalary}</strong> in <strong>${city2.value || 'your target city'}</strong>.`;
        });
    }
});
