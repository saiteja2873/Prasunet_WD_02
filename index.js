let timer;
let elapsedTime = 0;
let running = false;
let startTime = 0;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(timer);
        running = false;
        document.getElementById("startStopBtn").innerText = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 1000);
        running = true;
        document.getElementById("startStopBtn").innerText = "Stop";
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? "0" + number : number;
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    laps = [];
    document.getElementById("display").innerText = "00:00:00";
    document.getElementById("startStopBtn").innerText = "Start";
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (running) {
        laps.push(elapsedTime);
        displayLaps();
    }
}

function displayLaps() {
    let lapList = document.getElementById("laps");
    lapList.innerHTML = "";
    laps.forEach((lap, index) => {
        let lapElement = document.createElement("div");
        lapElement.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapList.appendChild(lapElement);
    });
}
