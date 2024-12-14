document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton");
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    const waveCanvas = document.getElementById("waveCanvas"); //selects the canvas element for drawing the wave animation
    const waveCtx = waveCanvas.getContext("2d"); //Retrieves the 2D drawing context for the wave canvas
    waveCanvas.width = waveCanvas.clientWidth;
    waveCanvas.height = 300;

    const phCanvas = document.getElementById("phCanvas");//Selects another canvas for visualizing pH data (phCanvas) and sets its dimensions.
    const phCtx = phCanvas.getContext("2d");
    phCanvas.width = phCanvas.clientWidth;
    phCanvas.height = 300;

    const currentPHElement = document.getElementById("currentPH"); //Selects the element where the current pH value will be displayed.
    const waterClarityElement = document.getElementById("waterClarity"); //Selects the element where water clarity information will be displayed.


    let waveOffset = 0; //Tracks the phase shift of the wave animation, enabling smooth movement.

    const phData = [];
    let currentIndex = 0;

    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            const { frequency, amplitude, speed, pHLevels, clarity } = data;

            // Initialize pH data for visualization
            phData.push(...pHLevels);

            // Function to update pH values periodically
            function updatePHValues() {
                const currentPH = pHLevels[currentIndex];
                currentPHElement.textContent = currentPH.toFixed(2);
                waterClarityElement.textContent = clarity[currentIndex];

                currentIndex = (currentIndex + 1) % pHLevels.length;
            }

            // Function to draw the wave
            function drawWave() {
                waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

                waveCtx.beginPath();
                waveCtx.moveTo(0, waveCanvas.height / 2);

                for (let x = 0; x < waveCanvas.width; x++) {
                    const y =
                        waveCanvas.height / 2 +
                        amplitude * Math.sin((x + waveOffset) * frequency);
                    waveCtx.lineTo(x, y);
                }

                waveCtx.lineTo(waveCanvas.width, waveCanvas.height);
                waveCtx.lineTo(0, waveCanvas.height);
                waveCtx.closePath();

                waveCtx.fillStyle = "rgba(0, 212, 255, 0.3)";
                waveCtx.fill();

                waveCtx.strokeStyle = "#00d4ff";
                waveCtx.lineWidth = 2;
                waveCtx.stroke();

                waveOffset += speed;

                // Draw pH visualization
                visualizePH();

                requestAnimationFrame(drawWave);
            }

            // Function to visualize pH data
            function visualizePH() {
                phCtx.clearRect(0, 0, phCanvas.width, phCanvas.height);

                phCtx.beginPath();
                phCtx.moveTo(0, phCanvas.height);

                phData.forEach((ph, i) => {
                    const x = (i / phData.length) * phCanvas.width;
                    const y = phCanvas.height - ph * 30; // Scale pH value
                    phCtx.lineTo(x, y);
                });

                phCtx.strokeStyle = "#00d4ff";
                phCtx.lineWidth = 2;
                phCtx.stroke();
            }

            // Start updating pH values every 2 seconds
            setInterval(updatePHValues, 2000);

            // Start drawing the wave
            drawWave();
        })
        .catch((error) => {
            console.error("Error loading water data:", error);
        });
});
