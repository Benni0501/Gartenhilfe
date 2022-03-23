        var lightValue = 0;
        var lightMaxValue = 4095;
        var percentageLight;
        var lightDiagramData;
	
        var moistyValue = 0;
        var moistyMaxValue = 100;
        var percentageMoisty;
        var moistyDiagramData;
	var tempValue;
	    var temperatureValue = -10;
        var temperatureMaxValue = 50;
        var percentageTemperature;
        var temperatureDiagramData;
	//console.log("Test");        
        const socket = new WebSocket("wss://suppanschitz.com:3001");
	updateDiagram();        

        socket.onmessage = (event)=>{
            var res = JSON.parse(event.data);
	    //console.log(res);
            for (var i = 0; i < res.length; i++) {
                if (res[i].id == "lightSensor") {
                    lightValue = res[i].value;
                    document.getElementById("lightValueOut").innerHTML = lightValue;
                    //document.getElementById("lightUnit").innerHTML = res[i].unit;
                    updateDiagram();
                } else if(res[i].id == "moistureSensor"){
                    moistyValue = res[i].value;
		    //console.log("Moisty: " + moistyValue);
                    document.getElementById("moistyValueOut").innerHTML = moistyValue;
                    //document.getElementById("moistyUnit").innerHTML = res[i].unit;
                    updateDiagram();
                    //console.log("Moisty " + res[i].value); 
                } else if(res[i].id == "temperatureSensor"){
                    temperatureValue = res[i].value;
		    temperatureValue = Math.round(temperatureValue);
                    document.getElementById("tempvalueOut").innerHTML = temperatureValue;
                    //document.getElementById("temperatureUnit").innerHTML = res[i].unit;
                    updateDiagram();
                }
            }
        };

        function updateDiagram() {
            percentageLight = 100 * (lightValue / lightMaxValue);
            //console.log(lightMaxValue);
            //console.log(lightValue);

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
            Highcharts.chart('lightDiagram', {
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
            percentageMoisty = 100 * (moistyValue / moistyMaxValue);
            //percentageMoisty = 80;
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
            Highcharts.chart('moistyDiagram', {
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
            var percentageTemperature = 100 * (temperatureValue / temperatureMaxValue);

            tempDiagramData = [
                {
                    name: 'Lumen',
                    y: percentageTemperature,
                    color: "whitesmoke",
                    dataLabels: {
                        enabled: false
                    }
                },
                {
                    name: '',
                    y: 100 - percentageTemperature,
                    color: "transparent",
                    dataLabels: {
                        enabled: false
                    }
                }
            ];
            Highcharts.chart('tempDiagram', {
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
            console.log(lightValue);
            console.log(moistyValue);
            console.log(tempValue);
            if (lightValue == null) {

                document.getElementById("card1").remove();

            } if (moistyValue == null) {

                document.getElementById("card2").remove();

            } if (tempValue == null) {
                document.getElementById("card3").remove();

            }
        }

