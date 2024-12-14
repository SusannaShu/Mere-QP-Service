const data = [
    { dish: "Tacos", origin: "Mexico" },
    { dish: "Sushi", origin: "Japan" },
    { dish: "Croissant", origin: "France" },
    { dish: "Biryani", origin: "India" },
    { dish: "Pizza", origin: "Italy" },
    { dish: "Shawarma", origin: "Middle East" },
];

let currentLevel = 0;
let correctMatches = 0;

// Timer
let timeLeft = 60;
const timerElement = document.getElementById("timer");
function startTimer() {
    const timer = setInterval(() => {  //Executes the arrow function every 1000 milliseconds (1 second).
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.innerText = `Time Left: ${timeLeft}s`;
        } else {
            clearInterval(timer);
            document.getElementById("game-feedback").innerText =
                "Time's up! Restart to try again.";
        }
    }, 1000);
}

// Load Game
function loadGame() {
    const gameContainer = document.getElementById("game-container");
    const feedback = document.getElementById("game-feedback");
    const mealVisualization = document.getElementById("meal-visualization");
    feedback.innerText = "Match dishes to their origins!";

    const currentDish = data[currentLevel];
    gameContainer.innerHTML = "";
    mealVisualization.innerHTML = `Community Meal: ${correctMatches} dishes`;

    const dishCard = document.createElement("div");
    dishCard.className = "game-card";
    dishCard.innerText = currentDish.dish;

    const originOptions = data.map((item) => item.origin);
    originOptions.sort(() => Math.random() - 0.5);

    originOptions.forEach((origin) => {
        const originCard = document.createElement("div");
        originCard.className = "game-card";
        originCard.innerText = origin;

        originCard.addEventListener("click", () => {
            if (origin === currentDish.origin) {
                correctMatches++;
                feedback.innerText = "Correct! Building your community meal...";
                currentLevel++;

                if (currentLevel < data.length) {
                    loadGame();
                } else {
                    document.getElementById("game-result").innerText =
                        "Congratulations! You’ve completed the community meal!";
                }
            } else {
                feedback.innerText = "Try again!";
            }
        });

        gameContainer.appendChild(originCard);
    });

    gameContainer.appendChild(dishCard);
}

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = "index.html";
});

// Start Game
startTimer();
loadGame();
