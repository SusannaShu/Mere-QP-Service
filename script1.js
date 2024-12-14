document.getElementById('play-sound').addEventListener('click', () => {
    const audio = new Audio('sound.mp3');
    audio.play();
});

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = "index.html";
});
