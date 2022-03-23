#define LARGE_JSON_BUFFERS 1
#include <Arduino.h>
#include <Thing.h>
#include "WebThingAdapter.h"
#include <EthernetWebThingAdapter.h>
#include <OneWire.h> 
#include <DallasTemperature.h>
#define ONE_WIRE_BUS 3 


OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

int maxInputValue = 4095;
const int AirValue = 3630;   //you need to replace this value with Value_1
const int WaterValue = 1360;  //you need to replace this value with Value_2
int lightSensValue = 0; 
int moistureSensValue = 0;
int soilmoisturepercent = 0;
const char *ssid = "Suba";
const char *password = "test2005";
const char* sensorTypes[] = {"Sensor", nullptr};
ThingDevice device("GartenSensor", "GartenSensor", sensorTypes); 
ThingProperty sensorLight("light", "LightLvlInput", NUMBER, "LightProperty");
ThingProperty sensorMoisture("Moisture", "MoistureLvlInput", NUMBER, "MoistureProperty");
ThingProperty sensorTemp("Temperature", "TempLvlInput", NUMBER, "TempProperty");
WebThingAdapter *adapter;


void setup(void) {
  makeConection();
  delay(3000);
  adapter = new WebThingAdapter("analog-sensor", WiFi.localIP());
  sensorLight.unit = "lux";
  sensorMoisture.unit = "percent";
  sensorTemp.unit = "degree";
  device.addProperty(&sensorLight);
  device.addProperty(&sensorTemp);
  device.addProperty(&sensorMoisture);
  adapter->addDevice(&device);
  Serial.println("Starting HTTP server");
  adapter->begin();
  Serial.print("http://");
  Serial.print("/things/");
  Serial.println(device.id);
  sensors.begin();//temp lib begin
}

void loop(void) {
  tempUpdate();
  lightUpdate();
  moisUpdate();
  adapter->update();
  delay(100);
}

void lightUpdate(){
  lightSensValue = toLux(analogRead(39));  
  ThingPropertyValue lightValue;
  lightValue.number = lightSensValue;
  sensorLight.setValue(lightValue);
  Serial.print ("Lichtwert: "); 
  Serial.println (lightSensValue); 
}

void moisUpdate(){
  moistureSensValue = analogRead(36);  
  soilmoisturepercent = map(moistureSensValue, AirValue, WaterValue, 0, 100);
  
    if(soilmoisturepercent >= 100)
  {
    soilmoisturepercent =100;
  }
  else if(soilmoisturepercent <=0)
  {
    soilmoisturepercent =0;
  }
  Serial.println(soilmoisturepercent);
  Serial.println("moisPercent");
  ThingPropertyValue moistureValue;
  moistureValue.number = soilmoisturepercent;
  sensorMoisture.setValue(moistureValue);
}

//for 10k reststor
double toLux(int input){
  double vout = input*((double) 5/4095);
  //double lux = (500*(5-vout))/(10*vout);
  //int lux=(2500/vout-500)/10;
  double lux =500/(10*((5-vout)/vout));
  Serial.println("LUX:");
  Serial.println(lux);
  return lux;
}
void makeConection(){
    Serial.begin(115200);
  Serial.println(__FUNCTION__);
  #if defined(ESP8266) || defined(ESP32)
  WiFi.mode(WIFI_STA);
  #endif
  WiFi.begin(ssid, password);
  Serial.println("");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("log: IP=");
}
void tempUpdate() 
{ 
 //call sensors.requestTemperatures() to issue a global temperature 
 //request to all devices on the bus 
/********************************************************************/
 Serial.print(" Requesting temperatures..."); 
 sensors.requestTemperatures(); // Send the command to get temperature readings 
 Serial.println("DONE"); 
/********************************************************************/
 Serial.print("Temperature is: "); 
 Serial.print(sensors.getTempCByIndex(0)); // Why "byIndex"?  
   // You can have more than one DS18B20 on the same bus.  
   // 0 refers to the first IC on the wire  
  ThingPropertyValue tempValue;
  tempValue.number = sensors.getTempCByIndex(0);
  sensorTemp.setValue(tempValue);
} 


////https://arduinodiy.wordpress.com/2013/11/03/measuring-light-with-an-arduino/
