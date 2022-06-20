
var lightValue = [];
var lightMaxValue = 4100;
var percentageLight;
var lightDiagramData;

var moistyValue = [];
var moistyMaxValue = 100;
var percentageMoisty;
var moistyDiagramData;
document.getElementById("popUp").style.display = "none";
var ress;
var tempValue = [];
var tempMinValue = -50
var tempMaxValue = 50;
var percentageTemp = 80;
var tempDiagramData;
const socket = new WebSocket("wss://suppanschitz.com:3001");
created = false;

//updateDiagram();

socket.onmessage = (event) => {

    var res = JSON.parse(event.data);
    var differentSensors = [];
    lightValue = [];
    moistyValue = [];
    tempValue = [];
    ress = res;
    console.log(res);
    console.log(res.tipps);
    console.log(res.tipps.length);

    //addTipps(1, 1, 1);
    for (var i = 0; i < res.tipps.length - 1; i++) {
        addTipps(i);


    }




}

function getName(index) {

    return ress.tipps[index].name;
}

function getClaim(index) {

    return ress.tipps[index].anspruch;
}
function getSpecialClaim(index) {

    return ress.tipps[index].besAnspruch;
}
function getSoilType(index) {

    return ress.tipps[index].bodenart;
}
function getLink(index) {
    return ress.tipps[index].bild;
}

function addTipps(i) {

    const main = document.getElementById("container");




    main.innerHTML += `      <div class="card" id="card` + i + `" onclick="openBig(` + i + `)">        <div class="content">            <div class="pic" style=" background-image: url(` + getLink(i) + `);">                            </div>            <div id="infoText" class="contentBx">                <h3 style="margin-top: 40px;">` + getName(i) + `</h3>      </div>        </div>    </div>`;

}

function openBig(i) {

    console.log("s");
    document.getElementById("outputName").innerHTML = getName(i);
    document.getElementById("outputAnspruch").innerHTML = getClaim(i);
    document.getElementById("outputBesAnspruch").innerHTML = getSpecialClaim(i);
    document.getElementById("outputboden").innerHTML = getSoilType(i);
    document.getElementById("headerPic").style.backgroundImage = "url(" + getLink(i) + ")";
    //document.body.style.backgroundImage = getLink(i); 
    document.getElementById("popUp").style.display = "block";

    closeCards();

    document.getElementById("head").style.display = "none";
}
function shutpopup() {

    console.log("s");
    document.getElementById("head").style.display = "block";
    document.getElementById("container").style.display = "flex";
    document.getElementById("popUp").style.display = "none";
    openCards();

}
function searchFor(input) {
    if (input.value == "#türkei") {
        console.log("#türkei activated ");
        location.replace("./nvs1.html")

    } else if(input.value =="#bong"){
        location.replace("./pongGame/index.html")
    }else {

        var value = input.value;
        console.log(ress.tipps.length);
        console.log(value);
        console.log(ress.tipps[0].name.toLowerCase().includes(value.toLowerCase()))
        //document.getElementById("container").style.display = "none";
        // closeCards();

        for (var i = 0; i < ress.tipps.length - 1; i++) {
            console.log(i);

            if (ress.tipps[i].name.toLowerCase().includes(value.toLowerCase())) {
                console.log("anzeigen");
                document.getElementById("card" + i).style.display = "flex";

            } else {
                console.log("nichtanzeigen");
                document.getElementById("card" + i).style.display = "none";
            }
        }
    }
}

function openCards() {
    for (var i = 0; i < ress.tipps.length - 1; i++) {

        document.getElementById("card" + i).style.display = "flex";

    }




}

function closeCards() {
    for (var i = 0; i < ress.tipps.length - 1; i++) {

        document.getElementById("card" + i).style.display = "none";

    }




}