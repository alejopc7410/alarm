'use strict'

/*------------- Utility Functions ----------*/

function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

function onEvent(selector, event, callback) {
    return selector.addEventListener(event, callback);
}

/*------------------------------------------*/

const clock = select('.clock p');
const userAlarm = select('.user-alarm p');
const hourInput = select('.alarm-input input[type=text]:nth-child(1)');
const minuteInput = select('.alarm-input input[type=text]:nth-child(2)');
const submitBtn = select('.submit-button');
const bell = select('.user-alarm i');
const restartBtn = select('.restart-button');
const divRestartBtn = select('form div')
let audio = new Audio('./assets/audio/alarm.mp3');
audio.type = 'audio/mp3';

function setAlarm () {
    if (validation() === false) {
        userAlarm.textContent = "Please enter a valid time value";
        return false;
    }
    

    let hourValue = hourInput.value;
    let minuteValue = minuteInput.value;
    
    userAlarm.textContent = `${hourValue}:${minuteValue}`;

    hourInput.value = "";
    minuteInput.value = "";
    bell.style.visibility = 'visible';
    divRestartBtn.style.display = 'block';
}

function validation() {
    if (
        hourInput.value == "" || 
        minuteInput.value == "" ||
        isNaN(parseInt(hourInput.value)) ||
        isNaN(parseInt(minuteInput.value)) ||
        hourInput.value > 24 ||
        minuteInput.value > 60
        ) {
        return false;
    } else {
        return true;
    }
}

function restart () {
    clock.style.color = '';
    clock.style.animation = '';
    divRestartBtn.style.display = 'none';
    console.log('Hello world')
    audio.pause();
}

setInterval(() => {
    let time = new Date();
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;
}, 1000)

setInterval(() => {
    if (clock.textContent === userAlarm.textContent) {
        audio.play();
        clock.style.color = '#04d907';
        clock.style.animation = 'flash infinite';
        clock.style.animationDuration = '2s';
        userAlarm.textContent = '';
        bell.style.visibility = 'hidden';
    } 
}, 1000);

onEvent(submitBtn, 'click', setAlarm);
onEvent(restartBtn, 'click', restart);
