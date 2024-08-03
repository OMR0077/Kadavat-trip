document.addEventListener("DOMContentLoaded", function() {
    const participants = [
        { name: 'John Doe', accommodation: 30, food: 20, transportation: 20, activities: 25, alcohol: 25 },
        { name: 'Jane Smith', accommodation: 40, food: 30, transportation: 20, activities: 35, alcohol: 25 },
        { name: 'Alice Johnson', accommodation: 50, food: 25, transportation: 30, activities: 40, alcohol: 35 },
        { name: 'Bob Brown', accommodation: 30, food: 20, transportation: 15, activities: 20, alcohol: 15 },
        { name: 'Charlie Black', accommodation: 35, food: 25, transportation: 20, activities: 25, alcohol: 20 },
        { name: 'Daisy White', accommodation: 40, food: 30, transportation: 20, activities: 30, alcohol: 20 },
        { name: 'Ella Green', accommodation: 45, food: 25, transportation: 25, activities: 35, alcohol: 20 },
        { name: 'Frank Blue', accommodation: 50, food: 30, transportation: 20, activities: 40, alcohol: 20 },
        { name: 'Grace Yellow', accommodation: 35, food: 20, transportation: 15, activities: 25, alcohol: 15 },
        { name: 'Hank Orange', accommodation: 50, food: 40, transportation: 30, activities: 35, alcohol: 35 },
        { name: 'Ivy Pink', accommodation: 30, food: 20, transportation: 20, activities: 25, alcohol: 20 },
        { name: 'Jack Purple', accommodation: 40, food: 25, transportation: 25, activities: 30, alcohol: 20 },
        { name: 'Kate Red', accommodation: 45, food: 30, transportation: 20, activities: 35, alcohol: 25 }
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
