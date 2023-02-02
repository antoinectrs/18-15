
const toggleButton = document.getElementById("toggle-tile-layer");
const toggleText = document.querySelector(".two");
const desc = document.querySelector(".fourth");
const intro = {
    el: document.querySelectorAll(".intro"),
    val: true,
};
let toolBand ;
const domMap = document.getElementById("map");
let filteredUsers;
let index = 0;
let tileLayerVisible = false;
let refreshIntervalId;
let runing = true;
let isClick= false;
// toggleButton.addEventListener("click", function () {
//     this.classList.toggle("onMap");
//     if (tileLayerVisible) {
//         map.removeLayer(myTileLayer);
//         tileLayerVisible = false;
//     } else {
//         map.addLayer(myTileLayer);
//         tileLayerVisible = true;
//     }
// });

toggleText.addEventListener("mouseover", function() {
    changeTxt.style.cursor = "pointer";
    desc.classList.remove("hide");
    runing = false;
    clearInterval(refreshIntervalId)
});
changeTxt.addEventListener("click", function () {
    intro.el.forEach(e => { e.classList.add("hide") });
    domMap.classList.remove("hide-o");
    console.log(toolBand);
    toolBand.forEach(e => { e.classList.remove("hide-o"); });
    // tooltips.classList.remove("hide-o");
    intro.val = false;
    runing = false;
    isClick=true;
    clearInterval(refreshIntervalId);
    // changeTxt.removeEventListener("click", arguments.callee);
    // toggleText.removeEventListener("mouseout", arguments.callee);
    // changeTxt.removeEventListener("mouseenter", arguments.callee);
    // const load = JSONload();
    // const smt = setSlider();
});
toggleText.addEventListener("mouseout", function () {
    if (runing == false && isClick==false) { textChange(); runing = true }
    desc.classList.add("hide");
});

// changeTxt.removeEventListener("mouseenter", handleMouseDown, false);     // Fails
// element.removeEventListener("mousedown", handleMouseDown, true);      // Succeeds

// function enterM() {
//     changeTxt.style.cursor = "pointer";
//     desc.classList.remove("hide");
//     runing = false;
//     clearInterval(refreshIntervalId)
// }

function textChange() {
    console.log(uniqueUsers);
    let data = uniqueUsers.filter(word => word != '' && word !== undefined);
    data = data.map(word => {
        return ("“" + word.replace(/\"/g, "") + "”");
    });
    refreshIntervalId = setInterval(function () {
        changeTxt.innerText = data[index];
        if (index < data.length - 1)
            index++
        else
            index = 0;

    }, 80);
};