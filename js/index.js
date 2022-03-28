
        var lightValue=0;
        var lightMaxValue = 4100;
        var percentageLight;
        var lightDiagramData;

        var moistyValue=0;
        var moistyMaxValue = 4100;
        var percentageMoisty;
        var moistyDiagramData;


        var tempValue = 0;
        var tempMinValue = -50
        var tempMaxValue = 50;
        var percentageTemp = 80;
        var tempDiagramData;

        updateDiagram();
        setInterval(function () {
            getStatus();
        }, 100);
        //deleteEmtyCards();
        function getStatus() {

            $.get("http://gateway.local:3001/getButtons", function (data) {
                try {
                    var res = JSON.parse(data);
                } catch (err) {
                    console.log("Error");
                }
                for (var i = 0; i < res.length; i++) {
                    var object = document.getElementById(res[i].id);

                    if (res[i].id == "lightSensor") {
                        lightValue = res[i].value;
                        document.getElementById("lightValueOut").innerHTML = lightValue;
                        updateDiagram();
                    }
                }
            }).fail(function (data, xhr) {
                console.log("Fail: " + xhr);
            }).done(function () {
                console.log("done");
            })
        }

        function updateDiagram() {
            percentageLight = 100 * (lightValue / lightMaxValue);
            console.log(lightMaxValue);
            console.log(lightValue);

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
            percentageMoisty = 80;
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
                percentageTemp = (100 * (tempValue / (tempMaxValue)))/2 +50;


          


            

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