document.addEventListener("DOMContentLoaded", function() {
    const participants = [
        { name: 'Tinto', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Ginto', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Aby', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Raijo', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 0, percentageChange: 720, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Vimal', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Jerin', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Jugal', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 320, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Ebin', occup: 'Worker', accommodation: 580, food: 350, transportation: 350, alcohol: 0, percentageChange: 720, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Tom', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Alet', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 0, percentageChange: 672, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Jesto', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Jefin', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672, morningFood: 200, eveningFood: 150, train: 200, road: 150 },
        { name: 'Melvin', occup: 'Student', accommodation: 580, food: 350, transportation: 350, alcohol: 400, percentageChange: 672, morningFood: 200, eveningFood: 150, train: 200, road: 150 }
    ];

    const ledgerContainer = document.getElementById('ledger-container');
    const participantSelect = document.getElementById('participant-select');

    participants.forEach(participant => {
        const flowChart = createFlowChart(participant);
        ledgerContainer.appendChild(flowChart);

        const option = document.createElement('option');
        option.value = participant.name;
        option.textContent = participant.name;
        participantSelect.appendChild(option);
    });

    participantSelect.addEventListener('change', function() {
        const selectedName = this.value;
        const flowCharts = ledgerContainer.querySelectorAll('.flow-chart');

        flowCharts.forEach(flowChart => {
            if (selectedName === 'all' || flowChart.dataset.name === selectedName) {
                flowChart.style.display = 'flex';
            } else {
                flowChart.style.display = 'none';
            }
        });
    });

    function createFlowChart(participant) {
        const flowChart = document.createElement('div');
        flowChart.classList.add('flow-chart');
        flowChart.dataset.name = participant.name;

        const participantDiv = document.createElement('div');
        participantDiv.classList.add('participant');
        participantDiv.innerHTML = `<strong>${participant.name}</strong> (${participant.occup})`;

        const accommodationDiv = createCategoryDiv('Accommodation', participant.accommodation);
        const foodDiv = createCategoryDiv('Food', participant.food);
        const transportationDiv = createCategoryDiv('Transportation', participant.transportation);
        const alcoholDiv = createCategoryDiv('Alcohol', participant.alcohol);

        const morningFoodDiv = createSubCategoryDiv('Morning Food', participant.morningFood);
        const eveningFoodDiv = createSubCategoryDiv('Evening Food', participant.eveningFood);
        foodDiv.appendChild(morningFoodDiv);
        foodDiv.appendChild(eveningFoodDiv);

        const trainDiv = createSubCategoryDiv('Train', participant.train);
        const roadDiv = createSubCategoryDiv('Road', participant.road);
        transportationDiv.appendChild(trainDiv);
        transportationDiv.appendChild(roadDiv);

        const percentageChangeDiv = createPercentageChangeDiv(participant);

        const totalBudgetDiv = document.createElement('div');
        totalBudgetDiv.classList.add('amount');
        totalBudgetDiv.textContent = `Total Budget: $${calculateTotalBudget(participant).toFixed(2)}`;

        const givenAmountDiv = document.createElement('div');
        givenAmountDiv.classList.add('amount');
        givenAmountDiv.textContent = `Given Amount: $${updateGivenAmount(participant).toFixed(0)}`;

        participantDiv.appendChild(accommodationDiv);
        participantDiv.appendChild(foodDiv);
        participantDiv.appendChild(transportationDiv);
        participantDiv.appendChild(alcoholDiv);
        participantDiv.appendChild(percentageChangeDiv);
        participantDiv.appendChild(totalBudgetDiv);
        participantDiv.appendChild(givenAmountDiv);

        flowChart.appendChild(participantDiv);
        return flowChart;
    }

    function createCategoryDiv(name, amount) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `<strong>${name}</strong>: $${amount}`;
        return categoryDiv;
    }

    function createSubCategoryDiv(name, amount) {
        const subCategoryDiv = document.createElement('div');
        subCategoryDiv.classList.add('subcategory');
        subCategoryDiv.innerHTML = `<strong>${name}</strong>: $${amount}`;
        return subCategoryDiv;
    }

    function createPercentageChangeDiv(participant) {
        const percentageChangeDiv = document.createElement('div');
        percentageChangeDiv.classList.add('amount');
        const changeType = participant.occup === 'Worker' ? 'added' : 'subtracted';
        percentageChangeDiv.innerHTML = `<strong>  Percentage Change</strong>: ${participant.percentageChange} (to be <strong>${changeType}</strong>)`;
        return percentageChangeDiv;
    }

    function calculateTotalBudget(participant) {
        const amountFields = ['accommodation', 'food', 'transportation', 'alcohol'];
        return amountFields.reduce((total, field) => {
            return total + (participant[field] > 0 ? participant[field] : 0);
        }, 0);
    }

    function updateGivenAmount(participant) {
        let totalBudget = calculateTotalBudget(participant);
        let percentageChange = parseInt(participant.percentageChange);
        let adjustedAmount = 0;

        if (participant.occup === 'Worker') {
            adjustedAmount = totalBudget + percentageChange;
        } else {
            adjustedAmount = totalBudget - percentageChange;
        }
        return parseInt(adjustedAmount);
    }
});
