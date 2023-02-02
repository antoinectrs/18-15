const parent = document.getElementById("time-slide");
const draggable = document.getElementById("draggable");
const time = document.getElementById("time");
const changeTxt = document.getElementById('change');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let readyWeb = false;

window.addEventListener("load", function () {
  time.style.transform = "translate(" + (parent.offsetWidth - time.offsetWidth) + "px, 0)";
  waitJSON();
  // const smt = setSlider();
});
window.addEventListener('resize', () => {
  currentX = parent.offsetWidth;
  if (intro.val) { time.style.transform = "translate(" + (parent.offsetWidth - time.offsetWidth) + "px, 0)" }
});

function setSlider() {
  // Set the initial position of the time element to the right side of the screen

  // time.style.transform = "translate(" + (parent.offsetWidth - draggable.offsetWidth) + "px, 0)";

  // Wait for the transition to start
  // setTimeout(() => {
  // Update the position of the time element to the left side of the scree
  time.classList.add("slide-in");
  setTranslate(0, 0, time);

  // Set the initial time value to 18:15
  let hours = 19;
  let minutes = 15;

  // Create a timer ID variable
  let timerID;

  // Update the time value every second
  timerID = setInterval(() => {
    // Increment the minutes value
    minutes--;

    // If the minutes value reaches 60, reset it to 0 and increment the hours value
    if (minutes == 0) {
      minutes = 60;
      hours--;
    }

    // If the hours value reaches 19 and the minutes value reaches 15, exit the interval function
    if (hours == 18 && minutes == 15) {
      time.classList.remove("slide-in");
      readyWeb = true;
      //  const load =JSONload();

      clearInterval(timerID);
    }
    // Pad the minutes value with a leading zero if necessary
    minutes = minutes.toString().padStart(2, "0");

    // Update the HTML value of the time element
    time.innerHTML = `${hours}:${minutes}`;
  }, 25);
  // }, 1000);
}
// draggable.addEventListener("touchstart", dragStart);
// draggable.addEventListener("touchend", dragEnd);
// parent.addEventListener("touchmove", drag);

draggable.addEventListener("mousedown", dragStart);
draggable.addEventListener("mouseup", dragEnd);
parent.addEventListener("mousemove", drag);
// draggable.addEventListener("mouseleave", dragEnd);
// parent.addEventListener("mouseleave", dragEnd);
// draggable.addEventListener("mouseenter", dragStart);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  if (e.currentTarget === draggable) {
    isDragging = true;
  }
}

function dragEnd(e) { isDragging = false }

function drag(e) {
  if (isDragging && readyWeb) {
    console.log("inside");
    e.preventDefault();
    currentX = e.clientX - initialX;
    if (currentX < 0) {
      currentX = 0;
    } else if (currentX >= parent.offsetWidth - draggable.offsetWidth) {
      currentX = parent.offsetWidth - draggable.offsetWidth;
    }
    let percent = xOffset / (parent.offsetWidth - draggable.offsetWidth);
    // Map the value to the range between 18:15 and 19:15
    let value = Math.round((percent) * 60) + (18 * 60) + 15;
    let minutes = value % 60;
    let hours = (value - minutes) / 60;
    // Pad the minutes value with a leading zero if necessary
    minutes = minutes.toString().padStart(2, "0");
    // Update the text inside the time element
    time.innerHTML = `${hours}:${minutes}`;
    updateMarkerVisibility(hours, minutes);
    // Calculate the position of the draggable element relative to the parent element
    xOffset = currentX;
    setTranslate(xOffset, 0, draggable);
  }
}
function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
