# Gartenhilfe
## Backend_Website
Dies hier ist das Backend für unsere Website
- index.js &rarr; Server
- index.html &rarr; HTML für Sensor-Frontend
- js/index.js &rarr; JS für Sensor-Frontend
- styles/index.css &rarr; CSS für Sensor-Frontend
- Weather.html &rarr; HTML für Weather-Frontend
- js/Weather.js &rarr; JS für Weather-Frontend
- styles/Weather.css &rarr; CSS für Weather-Frontend

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
<br>
Für näheres siehe <a href="index.html">index.html</a>.
