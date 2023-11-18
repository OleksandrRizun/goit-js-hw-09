const refs = {
    buttons: document.getElementsByTagName ("button")
}
refs.buttons[0].addEventListener("click", handleStartClick);
refs.buttons[1].addEventListener("click", handleStopClick);

let timerId = null;

function handleStartClick () {
    refs.buttons[0].disabled = true;
    refs.buttons[1].disabled = false;
    changeBodyColor ();
    timerId = setInterval (() => changeBodyColor (), 1000)
};

function handleStopClick () {
    refs.buttons[0].disabled = false;
    refs.buttons[1].disabled = true;
    stopChangingColor ();
};

function changeBodyColor () {
    document.body.style.backgroundColor = getRandomHexColor()
}

function stopChangingColor () {
    clearInterval(timerId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


