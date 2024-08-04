document.addEventListener("DOMContentLoaded", function() {
    const participants = [
        { name: 'Tinto', occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Ginto', occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Aby',   occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Raijo', occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 0, percentageChange: 0 },
        { name: 'Vimal', occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Jerin', occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Jugal', occup: 'Worker', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Jesto', occup: 'Student', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Tom',   occup: 'Student', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Alet',  occup: 'Student', accommodation: 580,food: 350, transportation: 350, alcohol: 0, percentageChange: 0 },
        { name: 'Ebin',  occup: 'Student', accommodation: 580,food: 350, transportation: 350, alcohol: 0, percentageChange: 0 },
        { name: 'Jefin', occup: 'Student', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 },
        { name: 'Melvin',occup: 'Student', accommodation: 580,food: 350, transportation: 350, alcohol: 400, percentageChange: 0 }
    ];

    const tableBody = document.getElementById('participants-table');
    const participantFilter = document.getElementById('participant-filter');

    participants.forEach((participant, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = participant.name;
        const occupCell = document.createElement('td');
        occupCell.textContent = participant.occup;

        const accommodationCell = createCheckboxCell(participant.accommodation, 'accommodation', index);
        const foodCell = createCheckboxCell(participant.food, 'food', index);
        const transportationCell = createCheckboxCell(participant.transportation, 'transportation', index);
        const alcoholCell = createCheckboxCell(participant.alcohol, 'alcohol', index);

        const totalBudgetCell = document.createElement('td');
        totalBudgetCell.textContent = `$${calculateTotalBudget(participant).toFixed(2)}`;

        const percentage = document.createElement('td');
        percentage.textContent = participant['percentageChange'];

        const givenCell = document.createElement('td');
        givenCell.dataset.index = index;
        updateGivenAmount(participant, givenCell);

        // Create "Pay Now" button cell
        const payNowCell = document.createElement('td');
        const payNowButton = document.createElement('button');
        payNowButton.textContent = "Pay Now";
        payNowButton.addEventListener('click', () => {
            const amount = calculateTotalBudget(participant).toFixed(2);
            const upiLink = `upi://pay?pa=raijopinhero007@okhdfcbank&pn=${participant.name}&am=${amount}&cu=INR`;
            window.location.href = upiLink;
        });
        payNowCell.appendChild(payNowButton);

        row.appendChild(nameCell);
        row.appendChild(occupCell);
        row.appendChild(accommodationCell);
        row.appendChild(foodCell);
        row.appendChild(transportationCell);
        row.appendChild(alcoholCell);
        row.appendChild(totalBudgetCell);
        row.appendChild(percentage);
        row.appendChild(givenCell);
        row.appendChild(payNowCell);  // Append the "Pay Now" button cell

        tableBody.appendChild(row);

        const option = document.createElement('option');
        option.value = participant.name;
        option.textContent = participant.name;
        participantFilter.appendChild(option);
    });

    participantFilter.addEventListener('change', function() {
        const selectedName = this.value;
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const nameCell = row.querySelector('td');
            if (selectedName === 'all' || nameCell.textContent === selectedName) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    function createCheckboxCell(amount, type, participantIndex) {
        const cell = document.createElement('td');
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;  // Unchecked by default
        checkbox.dataset.amount = amount;
        checkbox.dataset.type = type;
        checkbox.dataset.index = participantIndex;

        const icon = document.createElement('div');
        icon.classList.add('icon');

        const span = document.createElement('span');
        span.innerHTML = `${amount}`;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(icon);
        checkboxContainer.appendChild(span);
        cell.appendChild(checkboxContainer);

        return cell;
    }

    function calculateTotalBudget(participant) {
        const amountFields = ['accommodation', 'food', 'transportation', 'alcohol'];
        return amountFields.reduce((total, field) => {
            return total + (participant[field] > 0 ? participant[field] : 0);
        }, 0);
    }

    function updateGivenAmount(participants, givenCell) {
        let totalBudget = calculateTotalBudget(participants);
        let percentageChange = participants['percentageChange'];
        let adjustedAmount = totalBudget + (totalBudget * percentageChange / 100);
        givenCell.innerHTML = `$${adjustedAmount.toFixed(2)}`;
    }

    function setSpecificCheckboxesForParticipant(name, checkboxesToSet) {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const nameCell = row.querySelector('td');
            if (nameCell.textContent === name) {
                checkboxesToSet.forEach(type => {
                    const checkbox = row.querySelector(`.checkbox-container input[data-type="${type}"]`);
                    if (checkbox) {
                        checkbox.checked = true; // Check the specific checkboxes
                    }
                });
            }
        });
    }

    setSpecificCheckboxesForParticipant('Jerin', ['transportation', 'alcohol']);
});
