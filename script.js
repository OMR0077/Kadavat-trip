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
        const accommodationCell = createCheckboxCell(participant.accommodation);
        const foodCell = createCheckboxCell(participant.food);
        const transportationCell = createCheckboxCell(participant.transportation);
        const activitiesCell = createCheckboxCell(participant.activities);
        const alcoholCell = createCheckboxCell(participant.alcohol);
        const totalBudgetCell = document.createElement('td');
        
        nameCell.textContent = participant.name;
        totalBudgetCell.textContent = calculateTotalBudget(participant);

        row.appendChild(nameCell);
        row.appendChild(accommodationCell);
        row.appendChild(foodCell);
        row.appendChild(transportationCell);
        row.appendChild(activitiesCell);
        row.appendChild(alcoholCell);
        row.appendChild(totalBudgetCell);

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

    function createCheckboxCell(amount) {
        const cell = document.createElement('td');
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = amount > 0;
        checkbox.addEventListener('change', updateTotalBudget);
        
        const span = document.createElement('span');
        span.textContent = `$${amount}`;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(span);
        cell.appendChild(checkboxContainer);

        return cell;
    }

    function calculateTotalBudget(participant) {
        return (
            (participant.accommodation > 0 ? participant.accommodation : 0) +
            (participant.food > 0 ? participant.food : 0) +
            (participant.transportation > 0 ? participant.transportation : 0) +
            (participant.activities > 0 ? participant.activities : 0) +
            (participant.alcohol > 0 ? participant.alcohol : 0)
        );
    }

    function updateTotalBudget(event) {
        const row = event.target.closest('tr');
        const cells = row.querySelectorAll('td');
        
        const participant = {
            accommodation: cells[1].querySelector('span').textContent.slice(1),
            food: cells[2].querySelector('span').textContent.slice(1),
            transportation: cells[3].querySelector('span').textContent.slice(1),
            activities: cells[4].querySelector('span').textContent.slice(1),
            alcohol: cells[5].querySelector('span').textContent.slice(1)
        };

        const checkboxStates = [
            cells[1].querySelector('input').checked,
            cells[2].querySelector('input').checked,
            cells[3].querySelector('input').checked,
            cells[4].querySelector('input').checked,
            cells[5].querySelector('input').checked
        ];

        let totalBudget = 0;
        if (checkboxStates[0]) totalBudget += parseInt(participant.accommodation);
        if (checkboxStates[1]) totalBudget += parseInt(participant.food);
        if (checkboxStates[2]) totalBudget += parseInt(participant.transportation);
        if (checkboxStates[3]) totalBudget += parseInt(participant.activities);
        if (checkboxStates[4]) totalBudget += parseInt(participant.alcohol);

        cells[6].textContent = totalBudget;
    }
});
