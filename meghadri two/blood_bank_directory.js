document.addEventListener('DOMContentLoaded', () => {
    const data = [
        { state: "State1", district: "District1", hospitalName: "Hospital A", availability: "Yes", lastUpdated: "2023-04-01" },
        { state: "State1", district: "District2", hospitalName: "Hospital B", availability: "No", lastUpdated: "2023-04-02" },
        // Add more dummy data as needed
    ];

    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');

    // Populate states
    const states = [...new Set(data.map(item => item.state))];
    states.forEach(state => {
        let option = new Option(state, state);
        stateSelect.add(option);
    });

    // Populate districts based on state selection
    stateSelect.addEventListener('change', () => {
        districtSelect.innerHTML = ''; // Clear previous options
        const selectedState = stateSelect.value;
        const districts = [...new Set(data.filter(item => item.state === selectedState).map(item => item.district))];
        districts.forEach(district => {
            let option = new Option(district, district);
            districtSelect.add(option);
        });
    });

    // Perform search on form submission
    document.getElementById('searchForm').addEventListener('submit', event => {
        event.preventDefault(); // Prevent form from submitting traditionally
        const state = stateSelect.value;
        const district = districtSelect.value;
        const hospitalNameInput = document.getElementById('hospitalName').value.toLowerCase();

        const results = data.filter(item => 
            item.state === state && 
            item.district === district && 
            item.hospitalName.toLowerCase().includes(hospitalNameInput)
        );

        displayResults(results);
    });

    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsDiv.innerHTML = 'No results found.';
            return;
        }

        const list = document.createElement('ul');
        results.forEach(item => {
            const li = document.createElement('li');
            li.textContent = 'Hospital Name: ${item.hospitalName}, Availability: ${item.availability}, Last Updated: ${item.lastUpdated}';
            list.appendChild(li);
        });

        resultsDiv.appendChild(list);
    }
});