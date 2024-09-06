// Function to update tab title only when a timer starts
// function updateTabTitle(minutes, seconds, label) {
//   document.title = `${label} - ${minutes}:${seconds < 10 ? '0' + seconds : seconds} remaining`;
// }
function updateTabTitle(minutes, seconds) {
    document.title = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const defaultTitle = "Blocks and Timers";

// Work Timer
let workTimer;
let isWorkPaused = false;
let isWorkRunning = false;

let workMinutes = 25;
let currentWorkMinutes = workMinutes;
let currentWorkSeconds = 0;

const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const workMinutesDisplay = document.getElementById('minutes');
const workSecondsDisplay = document.getElementById('seconds');

function updateWorkDisplay() {
    workMinutesDisplay.textContent = currentWorkMinutes < 10 ? '0' + currentWorkMinutes : currentWorkMinutes;
    workSecondsDisplay.textContent = currentWorkSeconds < 10 ? '0' + currentWorkSeconds : currentWorkSeconds;
}

function startWorkTimer() {
    if (isWorkRunning) return;
    isWorkRunning = true;

    workTimer = setInterval(() => {
        if (!isWorkPaused) {
            if (currentWorkSeconds === 0) {
                if (currentWorkMinutes === 0) {
                    clearInterval(workTimer);
                    alert("Work time's up! Time for a break.");
                    document.title = defaultTitle;
                    return;
                } else {
                    currentWorkMinutes--;
                    currentWorkSeconds = 59;
                }
            } else {
                currentWorkSeconds--;
            }
            updateWorkDisplay();
            //   updateTabTitle(currentWorkMinutes, currentWorkSeconds, 'Work');
            updateTabTitle(currentWorkMinutes, currentWorkSeconds);
        }
    }, 1000);
}

function pauseWorkTimer() {
    isWorkPaused = !isWorkPaused;
}

function resetWorkTimer() {
    clearInterval(workTimer);
    isWorkRunning = false;
    isWorkPaused = false;
    currentWorkMinutes = workMinutes;
    currentWorkSeconds = 0;
    updateWorkDisplay();
    document.title = defaultTitle;
}

startButton.addEventListener('click', startWorkTimer);
pauseButton.addEventListener('click', pauseWorkTimer);
resetButton.addEventListener('click', resetWorkTimer);

updateWorkDisplay();

// Break Timer
let breakTimer;
let isBreakPaused = false;
let isBreakRunning = false;

let breakMinutes = 5;
let currentBreakMinutes = breakMinutes;
let currentBreakSeconds = 0;

const breakStartButton = document.getElementById('break-start-btn');
const breakPauseButton = document.getElementById('break-pause-btn');
const breakResetButton = document.getElementById('break-reset-btn');
const breakMinutesDisplay = document.getElementById('break-minutes');
const breakSecondsDisplay = document.getElementById('break-seconds');

function updateBreakDisplay() {
    breakMinutesDisplay.textContent = currentBreakMinutes < 10 ? '0' + currentBreakMinutes : currentBreakMinutes;
    breakSecondsDisplay.textContent = currentBreakSeconds < 10 ? '0' + currentBreakSeconds : currentBreakSeconds;
}

function startBreakTimer() {
    if (isBreakRunning) return;
    isBreakRunning = true;

    breakTimer = setInterval(() => {
        if (!isBreakPaused) {
            if (currentBreakSeconds === 0) {
                if (currentBreakMinutes === 0) {
                    clearInterval(breakTimer);
                    alert("Break time's up! Back to work.");
                    document.title = defaultTitle;
                    return;
                } else {
                    currentBreakMinutes--;
                    currentBreakSeconds = 59;
                }
            } else {
                currentBreakSeconds--;
            }
            updateBreakDisplay();
            //   updateTabTitle(currentBreakMinutes, currentBreakSeconds, 'Break');
            updateTabTitle(currentBreakMinutes, currentBreakSeconds);
        }
    }, 1000);
}

function pauseBreakTimer() {
    isBreakPaused = !isBreakPaused;
}

function resetBreakTimer() {
    clearInterval(breakTimer);
    isBreakRunning = false;
    isBreakPaused = false;
    currentBreakMinutes = breakMinutes;
    currentBreakSeconds = 0;
    updateBreakDisplay();
    document.title = defaultTitle;
}

breakStartButton.addEventListener('click', startBreakTimer);
breakPauseButton.addEventListener('click', pauseBreakTimer);
breakResetButton.addEventListener('click', resetBreakTimer);

updateBreakDisplay();