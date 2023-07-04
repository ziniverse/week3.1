document.addEventListener("DOMContentLoaded", function () {
  console.log("Document is ready!");

  const municipalityTable = document.querySelector("#municipality-table tbody");

  cy.intercept(
    "GET",
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065",
    (req) => {
      req.continue((res) => {
        const employmentData = res.body.dataset.value;

        // Loop through the employment data and populate the table
        employmentData.forEach((item) => {
          const municipality = item.key[0];
          const population = item.key[1];
          const employmentAmount = item.values[0];
          const employmentPercentage = (employmentAmount / population) * 100;
          const roundedPercentage = employmentPercentage.toFixed(2);

          const newRow = municipalityTable.insertRow();
          const cell1 = newRow.insertCell();
          const cell2 = newRow.insertCell();
          const cell3 = newRow.insertCell();
          const cell4 = newRow.insertCell();

          cell1.textContent = municipality;
          cell2.textContent = population;
          cell3.textContent = employmentAmount;
          cell4.textContent = roundedPercentage;

          // Apply conditional styling based on employment percentage
          if (employmentPercentage > 45) {
            newRow.style.backgroundColor = "#abffbd";
          } else if (employmentPercentage < 25) {
            newRow.style.backgroundColor = "#ff9e9e";
          }
        });
      });
    }
  );
});
