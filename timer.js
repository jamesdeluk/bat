// Function to update tab title only when a timer starts
// function updateTabTitle(minutes, seconds, label) {
//   document.title = `${label} - ${minutes}:${seconds < 10 ? '0' + seconds : seconds} remaining`;
// }
function updateTabTitle(minutes, seconds) {
    document.title = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const defaultTitle = "Blocks and Timers";
let workMinutes = 25;
let breakMinutes = 5;

function playSound() {
    const audio = new Audio('public-domain-beep-sound-100267-3.mp3');
    audio.play();
}

// Work Timer
let workTimer;
let isWorkPaused = false;
let isWorkRunning = false;

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

    document.getElementById('timer').style.fontSize = '96px';
    document.getElementById('pomodoro-container').style.backgroundColor = 'green';

    workTimer = setInterval(() => {
        if (!isWorkPaused) {
            if (currentWorkSeconds === 0) {
                if (currentWorkMinutes === 0) {
                    playSound();
                    clearInterval(workTimer);
                    document.title = "‼️‼️ TIME UP ‼️‼️";
                    alert("Work time's up! Time for a break.");
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
    pauseButton.textContent = isWorkPaused ? 'Resume' : 'Pause'; // Update button text
}

function resetWorkTimer() {
    clearInterval(workTimer);
    isWorkRunning = false;
    isWorkPaused = false;
    document.getElementById('timer').style.fontSize = '48px';
    document.getElementById('pomodoro-container').style.backgroundColor = '';
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
                    alert("Break time's up! Back to work.");
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