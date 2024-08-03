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
        const accommodationCell = document.createElement('td');
        const foodCell = document.createElement('td');
        const transportationCell = document.createElement('td');
        const activitiesCell = document.createElement('td');
        const alcoholCell = document.createElement('td');
        const totalBudgetCell = document.createElement('td');

        nameCell.textContent = participant.name;
        accommodationCell.textContent = participant.accommodation;
        foodCell.textContent = participant.food;
        transportationCell.textContent = participant.transportation;
        activitiesCell.textContent = participant.activities;
        alcoholCell.textContent = participant.alcohol;
        totalBudgetCell.textContent = participant.accommodation + participant.food + participant.transportation + participant.activities + participant.alcohol;

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
});
