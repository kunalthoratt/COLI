document.getElementById('salaryForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get inputs for both cities
  const salary1 = parseFloat(document.getElementById('salary1').value);
  const coli1 = parseFloat(document.getElementById('coli1').value);
  const rate1 = parseFloat(document.getElementById('rate1').value);
  const currency1 = document.getElementById('currency1').value.trim().toUpperCase() || "USD";

  const salary2 = parseFloat(document.getElementById('salary2').value);
  const coli2 = parseFloat(document.getElementById('coli2').value);
  const rate2 = parseFloat(document.getElementById('rate2').value);
  const currency2 = document.getElementById('currency2').value.trim().toUpperCase() || "USD";

  // Calculate purchasing power
  const pp1 = (salary1 * rate1) / coli1;
  const pp2 = (salary2 * rate2) / coli2;

  let better, color;
  if (pp1 > pp2) {
    better = "City 1 offers greater purchasing power.";
    color = "#2574a9";
  } else if (pp2 > pp1) {
    better = "City 2 offers greater purchasing power.";
    color = "#2574a9";
  } else {
    better = "Both cities offer equal purchasing power.";
    color = "#234";
  }

  // Show results
  document.getElementById('result').innerHTML =
    `<p>
      <b>City 1:</b> Salary = ${salary1.toLocaleString()} ${currency1}, COL Index = ${coli1}, Exchange Rate = ${rate1}<br>
      Adjusted Purchasing Power: <b>${pp1.toLocaleString(undefined, {maximumFractionDigits:2})}</b>
    </p>
    <p>
      <b>City 2:</b> Salary = ${salary2.toLocaleString()} ${currency2}, COL Index = ${coli2}, Exchange Rate = ${rate2}<br>
      Adjusted Purchasing Power: <b>${pp2.toLocaleString(undefined, {maximumFractionDigits:2})}</b>
    </p>
    <p style="color:${color}; font-weight:bold;">${better}</p>
    <small>Purchasing power is calculated as: <code>(Salary × Exchange Rate to USD) ÷ Cost of Living Index</code></small>`;
});
