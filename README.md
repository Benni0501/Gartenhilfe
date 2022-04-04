# Gartenhilfe
## Backend_Website
Dies hier ist das Backend für unsere Website
- <a href="index.js">index.js</a> &rarr; Server
- <a href="index.html">index.html</a> &rarr; HTML für Sensor-Frontend
- <a href="js/index.js">js/index.js</a> &rarr; JS für Sensor-Frontend
- <a href="styles/index.css">styles/index.css</a> &rarr; CSS für Sensor-Frontend
- <a href="Weather.html">Weather.html</a> &rarr; HTML für Weather-Frontend
- <a href="js/Weather.js">js/Weather.js</a> &rarr; JS für Weather-Frontend
- <a href="styles/Weather.css">styles/Weather.css</a> &rarr; CSS für Weather-Frontend

## Erklärung
Frontend und Backend kommunizieren mithilfe eines Websockets

Um dies zu machen benutzen wir serverseitig Express.js.<br>
Die Daten werden auf einer MariaDB Datenbak gespeichert.<br>

Wenn möglich sollten wir dieses JSON-Format beim Senden/Empfangen einhalten:
```json
{
  "tipps":<gartentipps>,
  "sensors":<sensor-daten>
}
```
