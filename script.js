'use strict';
 
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const inputScreen = document.getElementById('input-screen');
    const wheelScreen = document.getElementById('wheel-screen');
 
    const startButton = document.getElementById('start-button');
    const mealForm = document.getElementById('meal-form');
    const mealInputs = document.getElementById('meal-inputs');
    const addMealButton = document.getElementById('add-meal-button');
    const inputMessage = document.getElementById('input-message');
    const backHomeButton = document.getElementById('back-home-button');
    const editMealsButton = document.getElementById('edit-meals-button');
    const startOverButton = document.getElementById('start-over-button');
    const spinButton = document.getElementById('spin-button');
    const canvas = document.getElementById('food-wheel');
    const resultName = document.getElementById('result-name');
    const resultMessage = document.getElementById('result-message');
 
    const ctx = canvas.getContext('2d');
    const colors = ['#efbd4c', '#e87959', '#8dbb91', '#f2cf70', '#e98968',
                    '#79ad91', '#f0b44b', '#df7658', '#a7c99d', '#f3d783'];
 
    let meals = [];
    let rotation = 0;
    let spinning = false;
 
    function showScreen(screenToShow) {
        [welcomeScreen, inputScreen, wheelScreen].forEach((screen) => {
            screen.classList.add('hidden');
        });
        screenToShow.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
 
    function updateMealLabels() {
        const fields = mealInputs.querySelectorAll('input[name="meal"]');
        fields.forEach((field, index) => {
            field.parentElement.querySelector('span').textContent = `Dish ${index + 1}`;
            field.required = index < 2;
        });
        addMealButton.disabled = fields.length >= 10;
        addMealButton.textContent = fields.length >= 10 ? '10 dishes added' : '+ Add another dish';
        inputMessage.textContent = `${fields.length} of 10 dishes added. Enter at least 2 different dishes.`;
        inputMessage.classList.remove('error');
    }
 
    function addMealField() {
        const fields = mealInputs.querySelectorAll('input[name="meal"]');
        if (fields.length >= 10) {
            return;
        }
 
        const label = document.createElement('label');
        label.className = 'meal-field';
 
        const caption = document.createElement('span');
        caption.textContent = `Dish ${fields.length + 1}`;
 
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'meal';
        input.maxLength = 40;
        input.placeholder = 'Enter a dish';
        input.autocomplete = 'off';
 
        label.append(caption, input);
        mealInputs.appendChild(label);
        updateMealLabels();
        input.focus();
    }
 
    function drawWheel() {
        const size = canvas.width;
        const center = size / 2;
        const radius = center - 10;
        ctx.clearRect(0, 0, size, size);
 
        if (meals.length < 2) {
            return;
        }
 
        const slice = (Math.PI * 2) / meals.length;
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(rotation);
 
        meals.forEach((meal, index) => {
            const start = -Math.PI / 2 + index * slice;
            const end = start + slice;
 
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, start, end);
            ctx.closePath();
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            ctx.strokeStyle = '#fffdf8';
            ctx.lineWidth = 5;
            ctx.stroke();
 
            ctx.save();
            ctx.rotate(start + slice / 2);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#26382d';
            ctx.font = meals.length > 7 ? 'bold 17px Arial' : 'bold 20px Arial';
 
            let label = meal;
            if (label.length > 19) {
                label = label.slice(0, 18) + '…';
            }
            ctx.fillText(label, radius - 26, 0);
            ctx.restore();
        });
 
        ctx.restore();
 
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#20583f';
        ctx.lineWidth = 9;
        ctx.stroke();
    }
 
    function resizeAndDrawWheel() {
        // The canvas uses a fixed 600x600 drawing surface and CSS scales it responsively.
        drawWheel();
    }
 
    function spinWheel() {
        if (spinning || meals.length < 2) {
            return;
        }
 
        spinning = true;
        spinButton.disabled = true;
        resultName.textContent = 'The wheel is spinning...';
        resultMessage.textContent = 'Let’s see what you will be eating!';
        const selectedIndex = Math.floor(Math.random() * meals.length);
        const slice = (Math.PI * 2) / meals.length;
 
        // The pointer is at the top (-90 degrees). Rotate the selected slice to the pointer.
        const targetSliceCenter = selectedIndex * slice + slice / 2;
        const desiredRotation = -targetSliceCenter;
        const currentNormalized = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const desiredNormalized = ((desiredRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        let extraRotation = desiredNormalized - currentNormalized;
        if (extraRotation < 0) {
            extraRotation += Math.PI * 2;
        }
        const fullTurns = (5 + Math.floor(Math.random() * 3)) * Math.PI * 2;
        const startRotation = rotation;
        const finalRotation = rotation + fullTurns + extraRotation;
        const duration = 4200;
        const startTime = performance.now();
 
        function animate(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            rotation = startRotation + (finalRotation - startRotation) * eased;
            drawWheel();
 
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                rotation = finalRotation;
                drawWheel();
                resultName.textContent = meals[selectedIndex];
                resultMessage.textContent = 'Decision made. Time to eat!';
                spinning = false;
                spinButton.disabled = false;
            }
        }
 
        requestAnimationFrame(animate);
    }
 
    startButton.addEventListener('click', () => showScreen(inputScreen));
    backHomeButton.addEventListener('click', () => showScreen(welcomeScreen));
    addMealButton.addEventListener('click', addMealField);
    spinButton.addEventListener('click', spinWheel);
 
    mealForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fields = Array.from(mealInputs.querySelectorAll('input[name="meal"]'));
        const values = fields.map((field) => field.value.trim()).filter((value) => value !== '');
 
        const uniqueMeals = [];
        const seen = new Set();
        values.forEach((meal) => {
            const key = meal.toLocaleLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                uniqueMeals.push(meal);
            }
        });
 
        if (uniqueMeals.length < 2) {
            inputMessage.textContent = 'Please enter at least 2 different dishes.';
            inputMessage.classList.add('error');
            return;
        }
 
        if (uniqueMeals.length !== values.length) {
            inputMessage.textContent = 'Duplicate dishes were removed. Your wheel is ready!';
        }
 
        meals = uniqueMeals.slice(0, 10);
        rotation = 0;
        resultName.textContent = 'Your meal will appear here';
        resultMessage.textContent = 'Click the button above to spin.';
        drawWheel();
        showScreen(wheelScreen);
    });
 
    editMealsButton.addEventListener('click', () => {
        showScreen(inputScreen);
    });
 
    startOverButton.addEventListener('click', () => {
        meals = [];
        rotation = 0;
        mealInputs.innerHTML = '';
        for (let i = 1; i <= 2; i++) {
            const label = document.createElement('label');
            label.className = 'meal-field';
            const caption = document.createElement('span');
            caption.textContent = `Dish ${i}`;
            const input = document.createElement('input');
            input.type = 'text';
            input.name = 'meal';
            input.maxLength = 40;
            input.placeholder = i === 1 ? 'e.g. Jollof Rice' : 'e.g. Fried Rice';
            input.required = true;
            label.append(caption, input);
            mealInputs.appendChild(label);
        }
        updateMealLabels();
        resultName.textContent = 'Your meal will appear here';
        resultMessage.textContent = 'Click the button above to spin.';
        showScreen(welcomeScreen);
    });
 
    // Set up the first two input fields and the initial wheel.
    updateMealLabels();
    resizeAndDrawWheel();
});
