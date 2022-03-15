# Gartenhilfe
## Backend_Website
Dies hier ist das Backend für unsere Website
- index.js &rarr; Hauptdatei
- index.html &rarr; Beispiel für Frontend

## Erklärung
Frontend und Backend kommunizieren mithilfe eines Websockets

Um dies zu machen benutzen wir serverseitig Express.js.<br>
Die Daten werden auf einer MariaDB Datenbak gespeichert.<br>

Wenn möglich sollten wir dieses JSON-Format beim Senden/Empfangen einhalten:
```json
{
  "value": <value>,
  "id": <id-des-auslösers>
}
```
<br>
Für näheres siehe <a href="https://github.com/Benni0501/Gartenhilfe/blob/backend_website/index.html">index.html</a>.
