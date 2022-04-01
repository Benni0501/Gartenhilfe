
var lightValue = [];
var lightMaxValue = 4100;
var percentageLight;
var lightDiagramData;

var moistyValue = [];
var moistyMaxValue = 100;
var percentageMoisty;
var moistyDiagramData;


var tempValue = [];
var tempMinValue = -50
var tempMaxValue = 50;
var percentageTemp = 80;
var tempDiagramData;
const socket = new WebSocket("wss://suppanschitz.com:3001");

//updateDiagram();

socket.onmessage = (event) => {
    var res = JSON.parse(event.data);
    var differentSensors = [];
    lightValue = [];
    moistyValue = [];
    tempValue = [];
    differentSensors.push(res.sensors[0].webthings_id)
    for (var i = 0; i < res.sensors.length - 1; i++) {
        if (res.sensors[i].webthings_id != res.sensors[i + 1].webthings_id) {
            differentSensors.push(res.sensors[i + 1].webthings_id)

        }

    }
    for (var y = 0; y < differentSensors.length; y++) {

        addDevices(y + 1);

    }






    for (var i = 0; i < res.sensors.length; i++) {

        if (res.sensors[i].id == "lightSensor") {


            lightValue.push(res.sensors[i].value);
            for (var x = 0; x < differentSensors.length; x++) {
                if (res.sensors[i].webthings_id == differentSensors[x]) {
                    document.getElementById("lightValueOut" + (x + 1)).innerHTML = lightValue[x];
                }
            }
            for (var y = 1; y < differentSensors.length + 1; y++) {
                document.getElementById("lightUnit" + y).innerHTML = res.sensors[i].unit;

            }
        } else if (res.sensors[i].id == "moistureSensor") {


            moistyValue.push(res.sensors[i].value);
            for (var x = 0; x < differentSensors.length; x++) {
                if (res.sensors[i].webthings_id == differentSensors[x]) {
                    document.getElementById("moistyValueOut" + (x + 1)).innerHTML = moistyValue[x];
                }
            }
            for (var y = 1; y < differentSensors.length + 1; y++) {
                document.getElementById("moistyUnit" + y).innerHTML = res.sensors[i].unit;

            }
        } else if (res.sensors[i].id == "temperatureSensor") {
            tempValue.push(Number(res.sensors[i].value).toFixed(1));


            for (var x = 0; x < differentSensors.length; x++) {
                if (res.sensors[i].webthings_id == differentSensors[x]) {
                    document.getElementById("tempvalueOut" + (x + 1)).innerHTML = tempValue[x];
                }
            }
            for (var y = 1; y < differentSensors.length + 1; y++) {
                document.getElementById("temperatureUnit" + y).innerHTML = res.sensors[i].unit;

            }
        }
    }
    y = 0;
    for (var y = 0; y < differentSensors.length; y++) {
        updateDiagram(y);
    }



    /*   for (var i = 0; i < res.sensors.length; i++) {
           if (res.sensors[i].id == "lightSensor") {
               lightValue = res.sensors[i].value;
               //console.log(res.sensors);
               document.getElementById("lightValueOut").innerHTML = lightValue;
               //document.getElementById("lightUnit").innerHTML = res[i].unit;
               updateDiagram();
           } else if (res.sensors[i].id == "moistureSensor") {
               moistyValue = res.sensors[i].value;
               console.log("Moisty: " + moistyValue);
               document.getElementById("moistyValueOut").innerHTML = moistyValue;
               //document.getElementById("moistyUnit").innerHTML = res[i].unit;
               updateDiagram();
               //console.log("Moisty " + res[i].value); 
           } else if (res.sensors[i].id == "temperatureSensor") {
               temperatureValue = res.sensors[i].value;
               temperatureValue = Number(temperatureValue).toFixed(1);
               document.getElementById("tempvalueOut").innerHTML = temperatureValue;
               //document.getElementById("temperatureUnit").innerHTML = res[i].unit;
               updateDiagram();
           }
       }*/
};

function addDevices(i) {


    const main = document.getElementById("sensorsDiv");

    main.innerHTML += `   <div class="col-div-12" style=" padding-top: 50px; text-align: center; ">
    <span
        style="    margin-right: 100px; font-size:40px;cursor:pointer; text-align: center; color: white;">Device `+ i + `</span>
</div>  <div class="container">
    <div class="card" id="card1">
        <div class="content">
            <div class="diagram" id="lightDiagram`+ i + `">
                sadd
            </div>
            <div id="infoText" class="contentBx">
                <h3>Helligkeit<br><span id="lightUnit`+ i + `">test</span></h3>
                <h3 id="lightValueOut`+ i + `">-</h3>
            </div>

        </div>

    </div>
    <div class="card" id="card2">
        <div class="content">
            <div class="diagram" id="moistyDiagram`+ i + `">
                sadd
            </div>
            <div id="infoText" class="contentBx">
                <h3>Feuchtigkeit<br><span id="moistyUnit`+ i + `">test</span></h3>
                <h3 id="moistyValueOut`+ i + `">-</h3>
            </div>

        </div>

    </div>
    <div class="card" id="card3">
        <div class="content">
            <div class="diagram" id="tempDiagram`+ i + `">
                sadd
            </div>
            <div id="infoText" class="contentBx">
                <h3>Temperatur<br><span id="temperatureUnit`+ i + `">test</span></h3>
                <h3 id="tempvalueOut`+ i + `">-</h3>
            </div>

        </div>

    </div>
</div>`;

}

function updateDiagram(i) {

    percentageLight = 100 * (lightValue[i] / lightMaxValue);

    //Diagramm Licht
    lightDiagramData = [
        {
            name: 'Lumen',
            y: percentageLight,
            color: "whitesmoke",
            dataLabels: {
                enabled: false
            }
        },
        {
            name: '',
            y: 100 - percentageLight,
            color: "transparent",
            dataLabels: {
                enabled: false
            }
        }
    ];
    Highcharts.chart('lightDiagram' + (i + 1), {
        chart: {
            backgroundColor: 'transparent',
            enableMouseTracking: false,
            plotBorderWidth: 0,
            height: "180px"
        },
        tooltip: {
            enabled: false,
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        title: { text: null },
        plotOptions: {
            series: {
                animation: false
            },
            pie: {
                allowPointSelect: false,
                enableMouseTracking: false,
                dataLabels: {
                    allowPointSelect: false,
                    enabled: false,

                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '70%'],
                size: "150%"
            }
        },
        series: [{ type: 'pie', name: 'Value', innerSize: '70%', data: lightDiagramData }]
    });


    //Diagram moisty mire

    percentageMoisty = 100 * (moistyValue[i] / moistyMaxValue);
    // percentageMoisty = 80;
    moistyDiagramData = [
        {
            name: 'Lumen',
            y: percentageMoisty,
            color: "whitesmoke",
            dataLabels: {
                enabled: false
            }
        },
        {
            name: '',
            y: 100 - percentageMoisty,
            color: "transparent",
            dataLabels: {
                enabled: false
            }
        }
    ];
    Highcharts.chart('moistyDiagram' + (i + 1), {
        chart: {
            backgroundColor: 'transparent',
            enableMouseTracking: false,
            plotBorderWidth: 0,
            height: "180px"
        },
        tooltip: {
            enabled: false,
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        title: { text: null },
        plotOptions: {
            series: {
                animation: false
            },
            pie: {
                allowPointSelect: false,
                enableMouseTracking: false,
                dataLabels: {
                    allowPointSelect: false,
                    enabled: false,

                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '70%'],
                size: "150%"
            }
        },
        series: [{ type: 'pie', name: 'Value', innerSize: '70%', data: moistyDiagramData }]
    });

    //Diagramm Temperatur
    percentageTemp = (100 * (tempValue[i] / (tempMaxValue))) / 2 + 50;







    tempDiagramData = [
        {
            name: 'Lumen',
            y: percentageTemp,
            color: "whitesmoke",
            dataLabels: {
                enabled: false
            }
        },
        {
            name: '',
            y: 100 - percentageTemp,
            color: "transparent",
            dataLabels: {
                enabled: false
            }
        }
    ];
    Highcharts.chart('tempDiagram' + (i + 1), {
        chart: {
            backgroundColor: 'transparent',
            enableMouseTracking: false,
            plotBorderWidth: 0,
            height: "180px"
        },
        tooltip: {
            enabled: false,
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        title: { text: null },
        plotOptions: {
            series: {
                animation: false
            },
            pie: {
                allowPointSelect: false,
                enableMouseTracking: false,
                dataLabels: {
                    allowPointSelect: false,
                    enabled: false,

                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '70%'],
                size: "150%"
            }
        },
        series: [{ type: 'pie', name: 'Value', innerSize: '70%', data: tempDiagramData }]
    });


}
function deleteEmtyCards() {
    if (lightValue == null) {

        document.getElementById("card1").remove();

    } if (moistyValue == null) {

        document.getElementById("card2").remove();

    } if (tempValue == null) {
        document.getElementById("card3").remove();

    }
}