# Gartenhilfe
## Backend_Website
Dies hier ist das Backend für unsere Website
- <a href="index.js">index.js</a> &rarr; Server

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
