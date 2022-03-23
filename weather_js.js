var apikey = "<api-key>";
        var userlongitude;
        var userlatitude;
        var daten;
        var currentdata;
        var locationName;
        var avgTempArray = [];
        var popArray = [];
        var minTempArray = [];
        var maxTempArray = [];
        var today = new Date();
        var todayTest = new Date();
        getLocation();



        function Sleep(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
            userlatitude = position.coords.latitude;
            userlongitude = position.coords.longitude;
            getLocName();
            Sleep(100);
            getStatus();

        }


        function getLocName() {
            //json objekt
            $.get(" https://api.openweathermap.org/data/2.5/weather?lat=" + userlatitude + "&lon=" + userlongitude + "&appid=" + apikey + "&units=metric&lang=de", function (data) {
                try {
                    currentdata = data;
                    console.log(currentdata);
                } catch (err) {
                    console.log("Error currentdata");
                }
            }).fail(function (data, xhr) {
                console.log("Fail: " + xhr);
            }).done(function () {
                console.log("done");
            })
        }

        function getStatus() {
            $.get(" https://api.openweathermap.org/data/2.5/onecall?lat=" + userlatitude + "&lon=" + userlongitude + "&exclude=alerts,minutely,hourly&appid=" + apikey + "&units=metric&lang=de", function (data) {
                try {

                    daten = data;
                    console.log(daten);
                } catch (err) {
                    console.log("Error");
                }
                setValuesinHTML();
            }).fail(function (data, xhr) {
                console.log("Fail: " + xhr);
            }).done(function () {
                console.log("forecastdone");
            })


        }

        function setValuesinHTML() {

            //wetter diskription changer
            document.getElementById("weatherDes").innerHTML = currentdata.weather[0].description;
            //ort changer
            document.getElementById("headWetter").innerHTML = "Wetter in " + currentdata.name;
            //min temp
            document.getElementById("minTempDisplay").innerHTML = currentdata.main.temp_min;
            //max temp
            document.getElementById("maxTempDisplay").innerHTML = currentdata.main.temp_max;
            //current temp
            document.getElementById("tempDisplay").innerHTML = currentdata.main.temp;
            //humidity

            document.getElementById("humidity").innerHTML = currentdata.main.humidity;

            //wetter icon changer today

            document.getElementById("changeWeatherIcon").className = getIconFromCode(currentdata.weather[0].icon) + " box-icon";
            // console.log(daten.weather[0].icon);

            // forecast set days

            //icons changer forecast
            var todayoutput = new Date();
            console.log(todayoutput);
            for (var i = 0; i < 7; i++) {
                var ihelp = i + 1;
                todayoutput.setDate(todayoutput.getDate() + 1);

                console.log(todayoutput);
                console.log(daten.daily[0].weather[0].icon);
                if (today.getMonth != todayoutput.getMonth) {
                    todayoutput.setMonth(todayoutput.getMonth + 1);
                    todayoutput.setDate(1);
                }

                document.getElementById("day" + ihelp + "icon").className = getIconFromCode(daten.daily[i].weather[0].icon);
                document.getElementById("day" + ihelp).innerHTML = "" + todayoutput.getDate() + "." + 0 + (todayoutput.getMonth() + 1);
                console.log("HEUTE: " + todayoutput);

            }

            //set values for diagramm
            for (var i = 0; i < 7; i++) {
                var ihelp = i + 1;
                var avgCalc = (daten.daily[i].temp.day + daten.daily[i].temp.night + daten.daily[i].temp.eve + daten.daily[i].temp.morn) / 4;
                avgCalc = parseFloat(avgCalc.toFixed(2));
                console.log(avgCalc);
                avgTempArray.push(avgCalc);
            }
            console.log(avgTempArray);

            for (var i = 0; i < 7; i++) {
                var ihelp = i + 1;

                console.log(daten.daily[i].temp.max);
                maxTempArray.push(daten.daily[i].temp.max);
            }
            console.log(maxTempArray);

            for (var i = 0; i < 7; i++) {
                var ihelp = i + 1;
                console.log(daten.daily[i].temp.min);
                minTempArray.push(daten.daily[i].temp.min);
            }
            console.log(minTempArray);

            for (var i = 0; i < 7; i++) {
                var ihelp = i + 1;
                console.log(daten.daily[i].pop);
                popArray.push(daten.daily[i].pop * 100);
            }
            console.log(popArray);
            updateDiagramm();
        }

        function getIconFromCode(code) {
            var returnValue;


            //wetter icon changer

            var iconValueFromApi = code;
            iconValueFromApi = iconValueFromApi.replace("d", "");
            iconValueFromApi = iconValueFromApi.replace("n", "");
            console.log(iconValueFromApi);
            returnValue = "fa-solid fa-cloud";

            switch (iconValueFromApi) {
                case "01":
                    returnValue = "fa-solid fa-sun";
                    break;

                case "02":
                    returnValue = "fa-solid fa-cloud-sun";
                    break;

                case "03":
                    returnValue = "fa-solid fa-cloud";
                    break;

                case "04":
                    returnValue = "fa-solid fa-cloud";
                    break;

                case "09":
                    returnValue = "fa-solid fa-cloud-rain";
                    break;

                case "10":
                    returnValue = "fa-solid fa-cloud-showers-heavy";
                    break;

                case "11":
                    returnValue = "fa-solid fa-bolt-lightning";
                    break;

                case "13":
                    returnValue = "fa-solid fa-snowflake";
                    break;

                case "50":
                    returnValue = "fa-solid fa-smog";
                    break;

                default:
                    console.log("icon error");
                    returnValue = "fa-solid fa-xmark";
                    break;

            }




            return returnValue;
        }
        var retval = [null, null, 7988, 12169, 15112, 22452, 34400];
        retval.push(30000);

        function updateDiagramm() {
            Highcharts.chart('diagrammOutput', {

                title: {
                    text: ''
                },

                chart: {
                    backgroundColor: 'transparent',
                },
                yAxis: {
                    max: 100,
                    min: -5,
                    title: {
                        text: ''
                    },
                    style: {
                        color: '#FFFFF'

                    }
                },

                xAxis: {
                    accessibility: {
                        rangeDescription: 'INFo'
                    },
                    style: {
                        color: '#FFFFF'

                    }
                },
                credits: {

                    enabled: false
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',

                    itemStyle: {
                        //fontSize: '35px',
                        font: 'Roboto',

                        color: 'whitesmoke'
                    },
                    itemHoverStyle: {
                        color: '#818181'
                    }

                },

                plotOptions: {
                    series: {
                        animation: false,
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: today.getDate() + 1,
                        style: {
                            color: '#FFFFF'

                        }
                    },

                    style: {
                        color: '#FFFFF'

                    }
                },

                series: [{
                    name: 'Regenwahrscheinlichkeit',
                    data: popArray,
                    color: '#1eb0e6'
                }, {
                    name: 'MaximalTemperatur',
                    //  var retval=     [null, null, 7988, 12169, 15112, 22452, 34400];
                    //  retval.push(200000);
                    data: maxTempArray,
                    color: '#ff0000'
                }, {
                    name: 'Durchschnttstemperatur',
                    data: avgTempArray,
                    color: '#22e34f'
                }, {
                    name: 'Minimaltemperatur',

                    data: minTempArray,
                    color: '#ebe534'
                }],

                responsive: {
                    rules: [{
                        condition: {

                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',

                            }
                        }
                    }]
                }

            });
        }