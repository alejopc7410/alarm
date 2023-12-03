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
const hourInput = select('.hour');
const minuteInput = select('.minutes');
const submitBtn = select('.submit-button');
const bell = select('.user-alarm i');
const restartBtn = select('.restart-button');
const divRestartBtn = select('form div')
let audio = select('.audio');
let alarm = '';

function setAlarm () {
    if (validation() === false) {
        userAlarm.textContent = "Please enter a valid time value";
        return false;
    }
    
    let hourValue = hourInput.value;
    let minuteValue = minuteInput.value;
    
    alarm = `${hourValue}:${minuteValue.padStart(2, '0')}`
    userAlarm.textContent = alarm;
    
    hourInput.value = "";
    minuteInput.value = "";
    bell.style.visibility = 'visible';
    divRestartBtn.style.display = 'block';
    if (clock.textContent === userAlarm.textContent) {
        userAlarm.innerText = 'Alarm will sound in 24 hours'
        setTimeout(() => {
            userAlarm.innerText = alarm
            setInterval(executeAlarm, 1000)
        }, 60000)
    } else {
        setInterval(executeAlarm, 1000)
    }

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
    userAlarm.innerText = ''
    bell.style.visibility = 'hidden';
    audio.pause();
}

function executeAlarm() {
    if (clock.textContent === userAlarm.textContent) {
        audio.play();
        clock.style.color = '#04d907';
        clock.style.animation = 'flash infinite';
        clock.style.animationDuration = '2s';
        userAlarm.textContent = '';
        bell.style.visibility = 'hidden';
        setTimeout(restart, 60000);
    }
}

setInterval(() => {
    let time = new Date();
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;
}, 1000)


onEvent(submitBtn, 'click', setAlarm);
onEvent(restartBtn, 'click', restart);
