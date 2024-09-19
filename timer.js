// Function to update tab title only when a timer starts
// function updateTabTitle(minutes, seconds, label) {
//   document.title = `${label} - ${minutes}:${seconds < 10 ? '0' + seconds : seconds} remaining`;
// }
function updateTabTitle(minutes, seconds) {
    document.title = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

const defaultTitle = "Blocks and Timers";

function playBuzzerSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz
    gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Set volume to 50%

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 2);
}

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

    document.getElementById('timer').style.fontSize = '96px';
    document.getElementById('pomodoro-container').style.backgroundColor = 'green';

    workTimer = setInterval(() => {
        if (!isWorkPaused) {
            if (currentWorkSeconds === 0) {
                if (currentWorkMinutes === 0) {
                    playBuzzerSound();
                    clearInterval(workTimer);
                    document.title = defaultTitle;
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

    document.getElementById('break-timer').style.fontSize = '96px';
    document.getElementById('pomodoro-container').style.backgroundColor = 'red';

    breakTimer = setInterval(() => {
        if (!isBreakPaused) {
            if (currentBreakSeconds === 0) {
                if (currentBreakMinutes === 0) {
                    playBuzzerSound();
                    clearInterval(breakTimer);
                    document.title = defaultTitle;
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