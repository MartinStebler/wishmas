# 02 – Feature-Ticket: Wunschliste teilen

## User Story

> Als Besitzer meiner Weihnachtswunschliste möchte ich einen Link kopieren können, damit Freunde und Familie die Liste **ansehen** können. Mit einem 4-stelligen Zahlencode soll die Wunschliste geschützt werden können.

## Was genau gebaut werden soll

Die App erhält einen **Ansichtsmodus** über den URL-Query-Parameter `shared=1`.

- Normal: `http://localhost:4200/`
- Geteilt: `http://localhost:4200/?shared=1`

Der Button **„Wunschliste teilen“** kopiert den Link zur geteilten Ansicht. In der geteilten Ansicht werden Wünsche angezeigt sowie der erledigt-markieren-Button, aber keine Buttons zum **Hinzufügen, Bearbeiten oder Löschen**. Ein deutlicher Hinweis nennt den Modus **„Geteilte Wunschliste – nur ansehen“**.