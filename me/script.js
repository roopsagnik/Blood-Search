// Fetch data from data.json
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    populateStates(data.statesData);
    setupEventListeners(data);
  })
  .catch(error => console.error('Error loading the data:', error));

function populateStates(statesData) {
  const stateDropdown = document.getElementById('state');
  Object.keys(statesData).forEach(state => {
    const option = document.createElement('option');
    option.text = state;
    option.value = state;
    stateDropdown.add(option);
  });
  populateDistricts(Object.keys(statesData)[0], statesData); // Initialize districts for the first state
}

function setupEventListeners(data) {
  const stateDropdown = document.getElementById('state');
  stateDropdown.addEventListener('change', () => {
    populateDistricts(stateDropdown.value, data.statesData);
  });

  document.getElementById('frame-3').addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(data.bloodBankData);
  });
}

function populateDistricts(selectedState, statesData) {
  const districtDropdown = document.getElementById('district');
  districtDropdown.innerHTML = ''; // Clear current districts
  statesData[selectedState].forEach(district => {
    const option = document.createElement('option');
    option.text = district;
    option.value = district;
    districtDropdown.add(option);
  });
}

function performSearch(bloodBankData) {
  const state = document.getElementById('state').value;
  const district = document.getElementById('district').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const bloodComponent = document.getElementById('bloodComponent').value; // This example doesn't use bloodGroup and bloodComponent in filtering, but you can implement this based on your data structure.

  const filteredData = bloodBankData.filter(bank => bank.state === state && bank.district === district);

  displayResults(filteredData);
}

function displayResults(filteredData) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  if (filteredData.length === 0) {
    resultsDiv.innerHTML = 'No results found.';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `<tr>
    <th>Sl. No</th>
    <th>Name</th>
    <th>Category</th>
    <th>Availability</th>
    <th>Type</th>
    <th>Last Updated</th>
  </tr>`;
  filteredData.forEach(bank => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${bank.slNo}</td>
      <td>${bank.name}</td>
      <td>${bank.category}</td>
      <td>${bank.availability}</td>
      <td>${bank.type}</td>
      <td>${bank.lastUpdated}</td>`;
    table.appendChild(row);
  });
  resultsDiv.appendChild(table);
}