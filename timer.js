// Function to update tab title only when a timer starts
// function updateTabTitle(minutes, seconds, label) {
//   document.title = `${label} - ${minutes}:${seconds < 10 ? '0' + seconds : seconds} remaining`;
// }
function updateTabTitle(minutes, seconds) {
    document.title = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const defaultTitle = "Blocks and Timers";
let focusMinutes = 25;
let breakMinutes = 5;

function playSound() {
    const audio = new Audio('public-domain-beep-sound-100267-3.mp3');
    audio.play();
}

// Focus Timer
let focusTimer;
let isFocusPaused = false;
let isFocusRunning = false;

let currentFocusMinutes = focusMinutes;
let currentFocusSeconds = 0;

const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const focusMinutesDisplay = document.getElementById('minutes');
const focusSecondsDisplay = document.getElementById('seconds');

function updateFocusDisplay() {
    focusMinutesDisplay.textContent = currentFocusMinutes < 10 ? '0' + currentFocusMinutes : currentFocusMinutes;
    focusSecondsDisplay.textContent = currentFocusSeconds < 10 ? '0' + currentFocusSeconds : currentFocusSeconds;
}

function startFocusTimer() {
    if (isFocusRunning) return;
    isFocusRunning = true;

    document.getElementById('timer').style.fontSize = '96px';
    document.getElementById('pomodoro-container').style.backgroundColor = 'green';

    focusTimer = setInterval(() => {
        if (!isFocusPaused) {
            if (currentFocusSeconds === 0) {
                if (currentFocusMinutes === 0) {
                    playSound();
                    clearInterval(focusTimer);
                    document.title = "‼️‼️ TIME UP ‼️‼️";
                    alert("Focus time's up! Time for a break.");
                    return;
                } else {
                    currentFocusMinutes--;
                    currentFocusSeconds = 59;
                }
            } else {
                currentFocusSeconds--;
            }
            updateFocusDisplay();
            //   updateTabTitle(currentFocusMinutes, currentFocusSeconds, 'Focus');
            updateTabTitle(currentFocusMinutes, currentFocusSeconds);
        }
    }, 1000);
}

function pauseFocusTimer() {
    isFocusPaused = !isFocusPaused;
    pauseButton.textContent = isFocusPaused ? 'Resume' : 'Pause'; // Update button text
}

function resetFocusTimer() {
    clearInterval(focusTimer);
    isFocusRunning = false;
    isFocusPaused = false;
    document.getElementById('timer').style.fontSize = '48px';
    document.getElementById('pomodoro-container').style.backgroundColor = '';
    currentFocusMinutes = focusMinutes;
    currentFocusSeconds = 0;
    updateFocusDisplay();
    document.title = defaultTitle;
}

startButton.addEventListener('click', startFocusTimer);
pauseButton.addEventListener('click', pauseFocusTimer);
resetButton.addEventListener('click', resetFocusTimer);

updateFocusDisplay();

// Break Timer
let breakTimer;
let isBreakPaused = false;
let isBreakRunning = false;

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

    document.getElementById('break-timer').style.fontSize = '96px';
    document.getElementById('pomodoro-container').style.backgroundColor = 'red';

    breakTimer = setInterval(() => {
        if (!isBreakPaused) {
            if (currentBreakSeconds === 0) {
                if (currentBreakMinutes === 0) {
                    playSound();
                    clearInterval(breakTimer);
                    document.title = "‼️‼️ BREAK OVER ‼️‼️";
                    alert("Break time's up! Back to focussing.");
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
    breakPauseButton.textContent = isBreakPaused ? 'Resume' : 'Pause'; // Update button text
}

function resetBreakTimer() {
    clearInterval(breakTimer);
    isBreakRunning = false;
    isBreakPaused = false;
    document.getElementById('break-timer').style.fontSize = '48px';
    document.getElementById('pomodoro-container').style.backgroundColor = '';
    currentBreakMinutes = breakMinutes;
    currentBreakSeconds = 0;
    updateBreakDisplay();
    document.title = defaultTitle;
}

breakStartButton.addEventListener('click', startBreakTimer);
breakPauseButton.addEventListener('click', pauseBreakTimer);
breakResetButton.addEventListener('click', resetBreakTimer);

updateBreakDisplay();