<?php
declare(strict_types=1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What Should I Eat Today? | Random Food Selector</title>
    <link rel="stylesheet" href="assets/style.css">
    <script src="assets/script.js" defer></script>
</head>
<body>
    <main class="app">
        <!-- SCREEN 1: WELCOME PAGE -->
        <section id="welcome-screen" class="screen welcome-screen">
            <div class="welcome-content">
                <p class="eyebrow">YOUR PERSONAL FOOD DECIDER</p>
                <h1>What Should I Eat Today?</h1>
                <p class="subtitle">Random Food Selector</p>
                <p class="welcome-text">Can't decide what to eat? Let the wheel choose for you.</p>
                <button id="start-button" class="button primary-button" type="button">LET'S DECIDE <span aria-hidden="true">→</span></button>
            </div>
        </section>
 
        <!-- SCREEN 2: ENTER MEALS -->
        <section id="input-screen" class="screen hidden">
            <header class="page-heading">
                <p class="eyebrow">STEP 1 OF 2</p>
                <h1>What are your options?</h1>
                <p>Enter between 2 and 10 dishes you would like the wheel to choose from.</p>
            </header>
 
            <form id="meal-form" class="meal-form">
                <div id="meal-inputs" class="meal-inputs">
                    <label class="meal-field">
                        <span>Dish 1</span>
                        <input type="text" name="meal" maxlength="40" placeholder="e.g. Jollof Rice" required>
                    </label>
                    <label class="meal-field">
                        <span>Dish 2</span>
                        <input type="text" name="meal" maxlength="40" placeholder="e.g. Fried Rice" required>
                    </label>
                </div>
                <p id="input-message" class="message" role="status" aria-live="polite">You can add up to 10 dishes.</p>
                <div class="form-actions">
                    <button id="add-meal-button" class="button secondary-button" type="button">+ Add another dish</button>
                    <button class="button primary-button" type="submit">CREATE MY WHEEL <span aria-hidden="true">→</span></button>
                </div>
                <button id="back-home-button" class="text-button" type="button">← Back to home</button>
            </form>
        </section>
 
        <!-- SCREEN 3: SPINNING WHEEL -->
        <section id="wheel-screen" class="screen hidden">
            <header class="page-heading wheel-heading">
                <p class="eyebrow">STEP 2 OF 2</p>
                <h1>Let the wheel decide!</h1>
                <p>Take a deep breath and see what you're eating today.</p>
            </header>
 
            <div class="wheel-card">
                <div class="pointer" aria-hidden="true"></div>
                <div class="wheel-wrap">
                    <canvas id="food-wheel" width="600" height="600" aria-label="Wheel containing your meal choices">
                        Your browser does not support the spinning wheel.
                    </canvas>
                    <div class="wheel-center">SPIN!</div>
                </div>
                <button id="spin-button" class="button primary-button spin-button" type="button">⟳ SPIN THE WHEEL</button>
                <div class="result-box" aria-live="polite">
                    <p class="result-label">THE WHEEL CHOSE</p>
                    <h2 id="result-name">Your meal will appear here</h2>
                    <p id="result-message">Click the button above to spin.</p>
                </div>
                <div class="wheel-actions">
                    <button id="edit-meals-button" class="button secondary-button" type="button">Edit my dishes</button>
                    <button id="start-over-button" class="text-button" type="button">Start over</button>
                </div>
            </div>
        </section>
    </main>
 
    <footer class="footer">
        <p>What Should I Eat Today? <span>•</span> Random Food Selector</p>
    </footer>
</body>
</html>
