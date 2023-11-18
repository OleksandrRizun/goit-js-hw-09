import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    button: document.querySelector ("button"),
    counters: document.getElementsByClassName ("value")
}

refs.button.disabled = true;

let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onChange () {
        refs.button.disabled = false;
    },
    onClose(selectedDates) {
        if (selectedDates [0].getTime() < new Date ()) {
            return Notify.failure('Please choose a date in the future');
        }
        showTimeDifference (selectedDates [0].getTime() - new Date ());
        timerId = setInterval (() => showTimeDifference (selectedDates [0].getTime() - new Date ()), 1000)
    },
};

flatpickr("#datetime-picker", options);

function showTimeDifference (e) {
    refs.button.disabled = true;
    let totalSec = Math.round (e / 1000);
    let days = Math.floor (totalSec / 86400);
    let hours = Math.floor ((totalSec - days * 86400) / 3600);
    let minutes = Math.floor ((totalSec - days * 86400 - hours * 3600) / 60);
    let seconds = totalSec % 60;

    const timeLine = [days, hours, minutes, seconds];
    const timeValue = timeLine.map ((elem) => elem.toString().padStart (2, "0"));
    timeValue.forEach ((elem, index) => refs.counters [index].textContent = elem);
    if (totalSec <= 0) clearInterval(timerId);
}