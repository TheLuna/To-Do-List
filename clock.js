const clock = document.querySelector(".js-clock");

function getTime(){
    const date = new Date();
    const min = date.getMinutes();
    const hours = date.getHours();
    const ampmhour = hours > 12 ? hours - 12 : hours;
    const ampm = hours > 12 ? "PM" : "AM";

    clock.innerText = `${ampmhour < 10 ? `0${ampmhour}` : ampmhour}:${min < 10 ? `0${min}` : min} ${ampm}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();