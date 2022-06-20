document.querySelector('.main').addEventListener('wheel', preventScroll);

var onWithPages = 0
var $window = $(window);
var divs = ["pageOne", "pageTwo", "pageThree", "pageFour"]
var lockEvent = 0; // 0 = unlocked 1= locked
$window.on("mousewheel DOMMouseScroll", onMouseWheel);
async function onMouseWheel(event) {
    if (lockEvent == 0) {
        //Normalize event wheel delta
        var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

        //If the user scrolled up, it goes to previous slide, otherwise - to next slide
        if (delta < -1 && onWithPages != 4) {


            console.log("down");
            console.log(onWithPages);
            window.location.href = "#" + divs[onWithPages];


        }
        else if (delta > 1 && onWithPages != 1) {
            console.log("up");
            console.log(onWithPages);

            window.location.href = "#" + divs[onWithPages - 2];

        }
        lockEvent = 1;
        //await Sleep(300);
        lockEvent = 0;
    }
}
function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
function scrollToDiv(pages) {
    onWithPages = pages;

}
function preventScroll(e) {
    e.preventDefault();
    //e.stopPropagation();

    return false;
}
function sdtest() {
    window.location.href = "#" + divs[onWithPages - 2];

}