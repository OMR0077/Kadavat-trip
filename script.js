document.addEventListener("DOMContentLoaded", function() {
    const participants = [
        { name: 'Tinto', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320 },
        { name: 'Ginto', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320 },
        { name: 'Aby', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320 },
        { name: 'Raijo', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 0, percentageChange: 720 },
        { name: 'Vimal', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320 },
        { name: 'Jerin', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320 },
        { name: 'Jugal', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320 },
        { name: 'Ebin', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 0, percentageChange: 720 },
        { name: 'Tom', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672 },
        { name: 'Alet', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 0, percentageChange: 672 },
        { name: 'Jesto', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672 },
        { name: 'Jefin', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672 },
        { name: 'Melvin', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672 }
    ];

    const tableBody = document.getElementById('participants-table');
    const participantFilter = document.getElementById('participant-filter');

    participants.forEach((participant, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = participant.name;
        nameCell.classList.add('fixed-column');
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
        percentage.classList.add('hidden-column');

        const givenCell = document.createElement('td');
        givenCell.textContent = `$${updateGivenAmount(participant).toFixed(0)}`;

        const payNowCell = document.createElement('td');
        const payNowButton = document.createElement('button');
        payNowButton.textContent = "Pay Now";
        payNowButton.addEventListener('click', () => {
            const amount = updateGivenAmount(participant).toFixed(0);

            // Check if the amount exceeds the UPI transaction limit
            const upiTransactionLimit = 100000; // Example limit, can be adjusted
            if (amount > upiTransactionLimit) {
                alert('Amount exceeds the UPI transaction limit. Please contact the administrator.');
                return;
            }

            // Generate UPI link
            const upiLink = generateUPILink('raijopinhero007@okhdfcbank', participant.name, amount);
            
            // Check URL length
            if (upiLink.length > 512) {
                alert('UPI link exceeds the maximum length. Please contact the administrator.');
                return;
            }

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
        row.appendChild(payNowCell);

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
        checkbox.checked = false;
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

    function updateGivenAmount(participant) {
        let totalBudget = calculateTotalBudget(participant);
        let percentageChange = parseInt(participant['percentageChange']);
        let adjustedAmount = 0;

        if (participant.occup === 'Worker') {
            adjustedAmount = totalBudget + percentageChange;
        } else {
            adjustedAmount = totalBudget - percentageChange;
        }
        return parseInt(adjustedAmount);
    }

    function generateUPILink(upiId, payeeName, amount, currency = 'INR') {
        const formattedName = encodeURIComponent(payeeName.trim().replace(/\s+/g, '+'));
        return `upi://pay?pa=${upiId}&pn=${formattedName}&am=${amount}&cu=${currency}`;
    }

    function setSpecificCheckboxesForParticipant(name, checkboxesToSet) {
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const nameCell = row.querySelector('td');
            if (nameCell.textContent === name) {
                checkboxesToSet.forEach(type => {
                    const checkbox = row.querySelector(`.checkbox-container input[data-type="${type}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
            }
        });
    }


   
        setSpecificCheckboxesForParticipant( 'Jefin', ['transportation', 'alcohol','accommodation','food']);
        setSpecificCheckboxesForParticipant(  'Tinto', ['transportation', 'alcohol','accommodation','food']);
        setSpecificCheckboxesForParticipant( 'Alet', ['transportation', 'alcohol','accommodation','food']);

     
});
