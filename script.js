let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timerElement = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const lapButton = document.getElementById('lap-button');
const resetButton = document.getElementById('reset-button');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor(elapsedTime % 1000);

    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}

function resumeTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10 milliseconds
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerElement.textContent = "00:00:000";
    elapsedTime = 0;
    isRunning = false;
    lapsContainer.innerHTML = '';
}

function recordLap() {
    const lapTime = document.createElement('li');
    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor(elapsedTime % 1000);
    lapTime.textContent = `Lap: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
    lapsContainer.appendChild(lapTime);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);
lapButton.addEventListener('click', recordLap);
resetButton.addEventListener('click', resetTimer);
