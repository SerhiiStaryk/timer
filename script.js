'use strict';

let getS = sel => document.querySelector(sel);
let formStopwatch = document.forms['formStopwatch'];
let formSetTime = document.forms['setTime'];
let formControlTimer = document.forms['controlTimer'];

/*function add zero */

function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

/*clock & date*/

function goClock() {

    let date = new Date();

    let day = date.getDate();
    /*corect value day*/
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth();
    /*corect value month*/
    month += 1;
    if (month < 10) {
        month = '0' + month;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    getS('.style_date').textContent = `${day}.${month}.${date.getFullYear()}`;
    getS('.style_hour').textContent = `${addZero(hours, 2)}:${addZero(minutes, 2)}:${addZero(seconds, 2)}`;
}
goClock();
setInterval(goClock, 1000);

/*stopwatch*/
/*stopwatch value*/
let h = 0;
let m = 0;
let s = 0;
let ms = 0;
let loops = [];
let loop;
let goStopwatch;
let checkLoop = 0;

function StartStopwatch() {
    ms++;
    if (ms === 99) {
        ms = 0
        s++;
        if (s == 59) {
            s = 0;
            m++
            if (m == 59) {
                m = 0;
                h++
            }
        }
    }
    getS('.style_stopwatch').textContent = `${addZero(h, 2)}:${addZero(m, 2)}:${addZero(s, 2)}.${addZero(ms, 2)}`;
}
formStopwatch.btnStopwatchStart.onclick = function () {
    goStopwatch = setInterval(StartStopwatch, 10);
    formStopwatch.btnStopwatchStart.disabled = true;
    formStopwatch.btnStopwatchLoop.disabled = false;
    formStopwatch.btnStopwatchStop.disabled = false;
    formStopwatch.btnStopwatchReset.disabled = false;
    formStopwatch.btnStopwatchStart.classList.add('btn_disabled');
    if (formStopwatch.btnStopwatchLoop.classList.contains('btn_disabled')) {
        formStopwatch.btnStopwatchLoop.classList.remove('btn_disabled')
    }
    if (formStopwatch.btnStopwatchStop.classList.contains('btn_disabled')) {
        formStopwatch.btnStopwatchStop.classList.remove('btn_disabled')
    }
}
formStopwatch.btnStopwatchLoop.onclick = function () {
    loop = getS('.style_stopwatch').textContent;
    loops.push(loop);
    let li = document.createElement('li');
    for (let i = 0; i < loops.length; i++) {
        li.textContent = `${loops[i]}`;
    }
    getS('.list_loop').appendChild(li);
    checkLoop++;

    if (checkLoop === 10) {
        getS('.list_loop').innerHTML = '';
    }
}
formStopwatch.btnStopwatchStop.onclick = function () {
    clearInterval(goStopwatch);
    formStopwatch.btnStopwatchStart.disabled = false;
    formStopwatch.btnStopwatchLoop.disabled = true;
    formStopwatch.btnStopwatchStop.classList.add('btn_disabled');
    formStopwatch.btnStopwatchLoop.classList.add('btn_disabled');
    if (formStopwatch.btnStopwatchStart.classList.contains('btn_disabled')) {
        formStopwatch.btnStopwatchStart.classList.remove('btn_disabled')
    }
}
formStopwatch.btnStopwatchReset.onclick = function () {
    clearInterval(goStopwatch);
    getS('.list_loop').innerHTML = '';
    getS('.style_stopwatch').textContent = "00:00:00.00"
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
    formStopwatch.btnStopwatchStart.disabled = false;
    formStopwatch.btnStopwatchLoop.disabled = true;
    formStopwatch.btnStopwatchStop.disabled = true;
    formStopwatch.btnStopwatchReset.disabled = true;
    if (formStopwatch.btnStopwatchStart.classList.contains('btn_disabled')) {
        formStopwatch.btnStopwatchStart.classList.remove('btn_disabled')
    }
    if (formStopwatch.btnStopwatchLoop.classList.contains('btn_disabled')) {
        formStopwatch.btnStopwatchLoop.classList.remove('btn_disabled')
    }
    if (formStopwatch.btnStopwatchStop.classList.contains('btn_disabled')) {
        formStopwatch.btnStopwatchStop.classList.remove('btn_disabled')
    }
}
/*Timer*/
/*set timer*/
let timerNum = 0;
let timerSec;
let goTimer;

function startTimer() {
    timerSec--;
    let m = Math.floor(timerSec / 60);
    let s = Math.floor(((timerSec / 60) - m) * 60);
    getS('.style_timer').textContent = `${addZero(m, 2)}:${addZero(s, 2)}`;
    if (timerSec == 0) {
        clearTimeout(goTimer);
        getS('.style_set_minute').textContent = '00';
        formSetTime.plus.disabled = false;
        timerNum = 0;
        checkBtnPlus();
        checkBtnTimerStart();
        formControlTimer.btnTimerStop.disabled = true;
        formControlTimer.btnTimerReset.disabled = true;
    }
}

function checkBtnPlus() {
    if (formSetTime.plus.classList.contains('btn_disabled')) {
        formSetTime.plus.classList.remove('btn_disabled')
    }
}

function checkBtnSubtract() {
    if (formSetTime.subtract.classList.contains('btn_disabled')) {
        formSetTime.subtract.classList.remove('btn_disabled')
    }
}

function checkBtnTimerStart() {
    if (formControlTimer.btnTimerStart.classList.contains('btn_disabled')) {
        formControlTimer.btnTimerStart.classList.remove('btn_disabled')
    }
}

function checkBtnTimerStop() {
    if (formControlTimer.btnTimerStop.classList.contains('btn_disabled')) {
        formControlTimer.btnTimerStop.classList.remove('btn_disabled')
    }
}

formSetTime.plus.onclick = function () {
    timerNum++;
    formSetTime.subtract.disabled = false;
    formControlTimer.btnTimerStart.disabled = false;
    if (timerNum == 8) {
        formSetTime.plus.disabled = true;
        setTime.plus.classList.add('btn_disabled');
    }
    checkBtnSubtract();
    timerSec = timerNum * 60;
    getS('.style_set_minute').textContent = addZero(timerNum, 2);
}

formSetTime.subtract.onclick = function () {
    timerNum--;
    formSetTime.plus.disabled = false;
    if (timerNum == 0) {
        setTime.subtract.classList.add('btn_disabled');
        formControlTimer.btnTimerStart.disabled = true;
        formSetTime.subtract.disabled = true;
    }
    timerSec = timerNum * 60;
    checkBtnPlus();
    getS('.style_set_minute').textContent = addZero(timerNum, 2);
}

formControlTimer.btnTimerStart.onclick = function () {
    formControlTimer.btnTimerStart.classList.add('btn_disabled');
    formControlTimer.btnTimerStart.disabled = true;
    formControlTimer.btnTimerStop.disabled = false;
    formControlTimer.btnTimerReset.disabled = false;
    formSetTime.plus.disabled = true;
    formSetTime.subtract.disabled = true;
    startTimer();
    checkBtnTimerStop();
    goTimer = setInterval(startTimer, 1000)
}

formControlTimer.btnTimerStop.onclick = function () {
    clearTimeout(goTimer);
    formControlTimer.btnTimerStart.disabled = false;
    formControlTimer.btnTimerStop.classList.add('btn_disabled');
    checkBtnTimerStart();
}

formControlTimer.btnTimerReset.onclick = function () {
    clearTimeout(goTimer);
    getS('.style_set_minute').textContent = '00';
    getS('.style_timer').textContent = '00:00';
    timerNum = 0;
    formSetTime.plus.disabled = false;
    formSetTime.subtract.disabled = true;
    formControlTimer.btnTimerStart.disabled = true;
    formControlTimer.btnTimerStop.disabled = true;
    formControlTimer.btnTimerReset.disabled = true;
    checkBtnTimerStart();
    checkBtnTimerStop();
}