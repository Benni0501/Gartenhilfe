# Gartenhilfe
## Backend_Website
Dies hier ist das Backend für unsere Website
- index.js &rarr; Hauptdatei
- index.html &rarr; Beispiel für Frontend

## Erklärung
Frontend und Backend kommunizieren mithilfe der <a href="https://www.cloudcomputing-insider.de/was-ist-eine-rest-api-a-611116/">REST-API</a><br>
Wir verwenden derzeitig zwei HTTP-Requests:
- GET:
  - wird verwendet um Daten vom Backend zu holen
- POST:
  - wird verwendet um Daten zum Backend zu senden

Da das Backend von sich aus keine Daten zum Frontend schicken kann muss das Frontend die Daten anfordern.<br>
Deswegen sendet das Frontend alle 100 Millisekunden eine GET-Request an das Backend.<br>
Da das Backend von sich aus keine Daten zum Frontend schicken kann muss das Frontend die Daten anfordern.<br><br>
Deswegen sendet das Frontend alle 100 Millisekunden eine GET-Request an das Backend.<br><br>
Wenn möglich sollten wir dieses JSON-Format beim Senden/Empfangen einhalten:
```json
{
  "value": <value>,
  "id": <id-des-auslösers>
}
```
<br>
Für näheres siehe <a href="https://github.com/Benni0501/Gartenhilfe/blob/backend_website/index.html">index.html</a>.
