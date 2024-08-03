document.addEventListener("DOMContentLoaded", function() {
    const participants = [
        { name: 'Tinto', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 },
        { name: 'Ginto', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 },
        { name: 'Aby', accommodation: 0, food: 0, transportation: 30, activities: 0, alcohol: 400 },
        { name: 'Raijo', accommodation: 0, food: 0, transportation: 15, activities: 0, alcohol: 400 },
        { name: 'Vimal', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 },
        { name: 'Melvin', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 },
        { name: 'Jugal', accommodation: 0, food: 0, transportation: 25, activities: 0, alcohol: 400 },
        { name: 'Jesto', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 },
        { name: 'Tom', accommodation: 0, food: 0, transportation: 15, activities: 0, alcohol: 400 },
        { name: 'Alet', accommodation: 0, food: 0, transportation: 30, activities: 0, alcohol: 400 },
        { name: 'Ebin', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 },
        { name: 'Jefin', accommodation: 0, food: 0, transportation: 25, activities: 0, alcohol: 400 },
        { name: 'Jerin', accommodation: 0, food: 0, transportation: 20, activities: 0, alcohol: 400 }
    ];

    const tableBody = document.getElementById('participants-table');
    const participantFilter = document.getElementById('participant-filter');

    participants.forEach(participant => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        const accommodationCell = createCheckboxCell(participant.accommodation, 'accommodation');
        const foodCell = createCheckboxCell(participant.food, 'food');
        const transportationCell = createCheckboxCell(participant.transportation, 'transportation');
        const activitiesCell = createCheckboxCell(participant.activities, 'activities');
        const alcoholCell = createCheckboxCell(participant.alcohol, 'alcohol');
        const totalBudgetCell = document.createElement('td');
        const givenCell = document.createElement('td');
        
        nameCell.textContent = participant.name;
        totalBudgetCell.textContent = calculateTotalBudget(participant);
        givenCell.textContent = '$0'; // Initialize the "Given" cell with $0

        row.appendChild(nameCell);
        row.appendChild(accommodationCell);
        row.appendChild(foodCell);
        row.appendChild(transportationCell);
        row.appendChild(activitiesCell);
        row.appendChild(alcoholCell);
        row.appendChild(totalBudgetCell);
        row.appendChild(givenCell);

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

    function createCheckboxCell(amount, type) {
        const cell = document.createElement('td');
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;  // Unchecked by default
        checkbox.dataset.amount = amount;
        checkbox.dataset.type = type;
        checkbox.addEventListener('change', updateGivenAmount);
        
        const icon = document.createElement('div');
        icon.classList.add('icon');

        const span = document.createElement('span');
        span.textContent = `$${amount}`;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(icon);
        checkboxContainer.appendChild(span);
        cell.appendChild(checkboxContainer);

        return cell;
    }

    function calculateTotalBudget(participant) {
        const amountFields = ['accommodation', 'food', 'transportation', 'activities', 'alcohol'];
        return amountFields.reduce((total, field) => {
            return total + (participant[field] > 0 ? participant[field] : 0);
        }, 0);
    }

    function updateGivenAmount(event) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');
        const checkbox = event.target;
        
        const amount = parseInt(checkbox.dataset.amount);
        const givenCell = cells[7]; // Given cell is at index 7

        let currentGivenAmount = parseInt(givenCell.textContent.replace('$', '')) || 0;
        if (checkbox.checked) {
            givenCell.textContent = `$${currentGivenAmount + amount}`;
        } else {
            givenCell.textContent = `$${Math.max(0, currentGivenAmount - amount)}`;
        }
    }
});
