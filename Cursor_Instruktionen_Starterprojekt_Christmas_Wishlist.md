# Cursor-Auftrag: Starterprojekt für den Workshop „AI Christmas Challenge“

> **Verwendung:** Öffne in Cursor ein neues, leeres Arbeitsverzeichnis und füge den gesamten Abschnitt **„Auftrag an Cursor“** in den Agent-Modus ein. Cursor soll das Projekt **tatsächlich anlegen, installieren, starten und prüfen** – nicht bloss Code vorschlagen.
>
> **Zielgruppe:** 16-jährige Informatik-Lernende, die Angular bereits kennen. **Workshopdauer:** 2 Stunden.

---

## Auftrag an Cursor (direkt einfügen)

Du bist Senior-Full-Stack-Engineer und bereitest ein **minimales, reproduzierbares Starterprojekt** für einen zweistündigen AI-Coding-Workshop vor.

### 1. Ziel und didaktische Grenze

Erstelle ein **technisch lauffähiges Monorepo mit Angular-Frontend und Express-Backend**, damit die Lernenden sofort mit Claude Code eine Weihnachtswunschliste entwickeln können.

**Wichtig:** Erstelle **noch keine** Weihnachtswunschlisten-Geschäftsfunktionen. Die Lernenden sollen später mit KI selbst über Komponenten, API-Routen, Datenmodell, Eingabevalidierung und Persistenz entscheiden. Es ist eine *Vibe-Coding-Challenge*, kein fertiges Beispielprojekt.

Das Starterprojekt soll ausschliesslich Infrastruktur und einen minimalen Verbindungsnachweis zwischen Frontend und Backend bereitstellen.

**Auf keinen Fall implementieren:**

- Wunschliste, Wunsch-Cards, CRUD-API, Geschenkpreise, Shop-Links oder „Erledigt“-Status
- Datenbanktabellen oder Wunschlisten-Datenmodell
- Login, PIN, Session-Verwaltung oder Rate Limiting
- Teilen-Funktion, Kostenaufteilung oder Tests für diese Features
- `CLAUDE.md`, `REQUIREMENTS.md`, ADRs oder einen Code-Review-Skill
- Externe API-Keys, API-Anbieter, MCP-Server oder Deployment

Die Teams erarbeiten `CLAUDE.md` später selbst als Lernübung. Die fachlichen Tickets werden von der Lehrperson separat verteilt.

### 2. Technischer Stack

- **Angular**: aktuelle stabile Angular-CLI-Version, die zur installierten Node-LTS-Version passt; Standalone Components, TypeScript, Angular-Routing, einfaches CSS
- **Express 5** mit TypeScript und ESM-Modulen
- **npm Workspaces** für `frontend/` und `backend/`
- **Node.js LTS** in einer zu Angular kompatiblen Version; dokumentiere die tatsächlich eingesetzte Version
- **Vitest** für neue Unit-Tests (im Angular-Projekt den von der tatsächlichen Angular-Version unterstützten Standard-Test-Runner verwenden; keine zusätzliche, konkurrierende Testkonfiguration erzwingen)
- **Git** mit einem einzigen Initial-Commit
- Keine Docker-, Cloud-, Datenbank- oder sonstigen Accounts nötig
- Keine unnötigen UI-Bibliotheken, Auth-Bibliotheken oder ORM-Pakete

Nutze offizielle CLI-Generatoren, soweit möglich, statt Angular-Konfigurationsdateien frei zu erfinden. Prüfe verfügbare CLI-Optionen und passe Kommandos an die installierte Version an.

### 3. Gewünschte Verzeichnisstruktur

```text
christmas-wishlist/
├── frontend/                # Minimale Angular-Anwendung
│   ├── src/
│   ├── package.json
│   ├── angular.json
│   └── ...                   # Vom Angular CLI generierte Dateien
├── backend/
│   ├── src/
│   │   ├── app.ts            # Express-App ohne listen()
│   │   └── server.ts         # Startet HTTP-Server
│   ├── tests/
│   │   └── health.test.ts
│   ├── package.json
│   └── tsconfig.json
├── package.json             # npm-Workspaces und zentrale Scripts
├── package-lock.json
├── .gitignore
├── .nvmrc                  # Passende Node-LTS-Hauptversion
└── README.md               # Nur Projektstart und technische Hinweise
```

Falls das Workspace-Verzeichnis bereits der Projektordner ist, erstelle die Struktur direkt dort und nicht doppelt verschachtelt. Erhalte bereits vorhandene Benutzerdateien und überschreibe sie nicht blind.

### 4. Express-Backend: nur Health-Endpoint

Implementiere genau eine technische Route:

`GET /api/health`

Beispielantwort:

```json
{
  "status": "ok",
  "service": "christmas-wishlist-api"
}
```

Anforderungen:

- Port standardmässig `3000`, optional per `PORT` aus der Backend-Umgebung konfigurierbar
- Backend liest Konfiguration serverseitig; keine echten Geheimnisse erforderlich
- `app.ts` exportiert die Express-App für Tests; `server.ts` startet sie
- Unbekannte `/api/...`-Routen liefern verständlich `404`
- Sinnvolle Fehlerbehandlung für die bestehende Health-Route
- Backend läuft lokal; keine externe Netzwerkverbindung im Betrieb notwendig
- Keine Wunschlisten-Routen anlegen

### 5. Angular-Frontend: minimaler Startbildschirm

Die Startseite darf bewusst sehr schlicht sein. Zeige nur:

- Titel: **AI Christmas Challenge**
- Hinweis: **„Das Projekt ist bereit. Die Weihnachtswunschliste wird im Workshop entwickelt.“**
- Einen kleinen Backend-Status, der via HTTP `GET /api/health` abgerufen wird: **„API verbunden“** oder eine verständliche Fehlermeldung

Stelle die HTTP-Anbindung mit Angulars aktueller empfohlener API bereit. Vermeide unnötiges State Management und zusätzliche UI-Komponenten.

Das Frontend soll die Express-API während der lokalen Entwicklung über einen **Angular-Dev-Proxy für `/api`** erreichen. Verwende keine hartcodierte externe Server-URL in der Komponente und kein unnötiges CORS-Setup.

Die UI soll ausdrücklich **nicht** wie eine fertige Wunschlisten-Anwendung aussehen: keine Cards, Warenkorbansichten, Eingabeformulare oder Weihnachtsgeschenke.

### 6. Zentrale npm-Scripts

Stelle im Root möglichst diese Befehle bereit (und dokumentiere tatsächlich funktionierende Varianten):

```bash
npm install
npm run dev
npm run build
npm run test
```

- `npm run dev`: Startet Angular auf `http://localhost:4200` und Express auf `http://localhost:3000` **gleichzeitig** (z. B. mit `concurrently`)
- `npm run build`: Baut bzw. typecheckt beide Teilprojekte
- `npm run test`: Führt **nicht-interaktiv** alle vorhandenen Tests aus und beendet sich danach (kein Watch-Modus)
- Optional separate Scripts `dev:frontend` und `dev:backend`
- Vorzugsweise `tsx` für den Backend-Entwicklungsmodus und `tsc` für dessen Build

Achte darauf, dass npm-Workspaces und Angular CLI zusammen korrekt arbeiten. Erstelle ein konsistentes `package-lock.json`.

### 7. Minimale Tests

Erstelle ausschliesslich Infrastrukturtests:

1. **Express:** Ein automatisierter Test prüft `GET /api/health` auf HTTP `200` und die erwartete JSON-Antwort (z. B. mit Vitest + Supertest).
2. **Angular:** Ein kleiner Test prüft, dass die Startkomponente grundsätzlich gerendert wird, **ohne** einen echten Backend-Server starten zu müssen. Mocke gegebenenfalls den Health-Aufruf.

Alle Tests müssen über `npm run test` im Root ausführbar sein. Nutze keinen separaten E2E-Browser-Test-Runner, der für den Starter noch Installationsaufwand verursacht.

### 8. Git, README und Sicherheitsgrundlagen

Erstelle eine `.gitignore`, die mindestens Folgendes berücksichtigt:

- `node_modules/`, `dist/`, `.angular/`, Coverage-Artefakte
- `.env` und lokale `.env.*`-Varianten, **aber nicht** `.env.example`
- lokale SQLite-/JSON-Datendateien, falls später solche entstehen
- Betriebssystem- und Editor-Temporärdateien

Eine `backend/.env.example` darf **nur** nicht-sensitive Konfiguration enthalten, z. B. `PORT=3000`. Erstelle **keine echten Secrets** und keine `.env` mit erfundenem „Produktiv-Passwort“.

Die `README.md` soll nur enthalten:

- Projektziel in zwei Sätzen
- Voraussetzungen und geprüfte Node-Version
- Installation, Start, Build, Tests
- Frontend- und Backend-URLs
- Hinweis, dass die Wunschlistenfunktion **absichtlich noch nicht vorhanden** ist
- Hinweis, dass `CLAUDE.md` und Feature-Anforderungen erst im Workshop erstellt werden

README-Befehle müssen zu den tatsächlich definierten npm-Scripts passen.

Initialisiere Git, falls nötig, und lege **einen Initial-Commit** an, nachdem Build und Tests erfolgreich waren. Falls Git-Benutzername/E-Mail in der Umgebung nicht konfiguriert sind, überspringe nur den Commit und dokumentiere den nötigen manuellen Befehl. Erfinde keine Identität.

### 9. Umsetzung und Verifikation – verbindlich

Arbeite selbstständig in der folgenden Reihenfolge:

1. Prüfe das vorhandene Verzeichnis, die Node-/npm-Version und die unterstützten Angular-CLI-Optionen.
2. Generiere Angular und richte Express und npm-Workspaces ein.
3. Implementiere den minimalen Health-Endpoint und die Anzeige des API-Status.
4. Richte Test- und Build-Scripts ein.
5. Führe `npm install`, `npm run build` und `npm run test` wirklich aus; behebe auftretende Fehler.
6. Starte, soweit die Laufzeitumgebung es erlaubt, `npm run dev` und prüfe `GET /api/health` **sowie** die Darstellung des Angular-Frontends.
7. Prüfe abschliessend, dass noch **keine Wunschlisten-Geschäftsfunktionen** vorhanden sind.
8. Erstelle den Initial-Commit, sofern möglich.

**Akzeptanzkriterien („Definition of Done“):**

- [ ] `npm install` funktioniert vom Root aus.
- [ ] `npm run dev` startet Angular und Express parallel.
- [ ] `http://localhost:4200` zeigt den schlichten Starterbildschirm.
- [ ] Das Angular-Frontend zeigt den echten Backend-Health-Status über `/api` an.
- [ ] `http://localhost:3000/api/health` liefert HTTP 200 und JSON.
- [ ] `npm run build` ist erfolgreich.
- [ ] `npm run test` ist erfolgreich und endet selbstständig.
- [ ] Es gibt **keine** fertigen Wunschlistenfunktionen, keine `CLAUDE.md` und keine fachlichen Tickets.
- [ ] `.gitignore`, `README.md` und ggf. `.env.example` sind sinnvoll und korrekt.
- [ ] Ein sauberer Initial-Git-Stand ist vorhanden.

Gib zum Schluss eine kurze Zusammenfassung mit:

- tatsächlich verwendeten Versionen
- Projektstruktur
- geprüften Start-, Build- und Testbefehlen
- Ergebnissen der Verifikation (erfolgreich / nicht durchführbar / fehlgeschlagen)
- allen offenen Punkten, falls die Umgebung etwas nicht erlaubte

**Behaupte keinen erfolgreichen Build, Test oder Start, wenn du den jeweiligen Schritt nicht ausgeführt und überprüft hast.**

---

## Hinweise für die Lehrperson (nicht als zusätzliche Features implementieren lassen)

### Was die Lernenden im Workshop selbst erarbeiten

1. **Vibe Coding:** Weihnachtswunschliste mit CRUD, Preis, Shop-Link, Status und Persistenz aus dem leeren fachlichen Starter entwickeln.
2. **Code Review:** Eigene Lösung prüfen und Findings verifizieren.
3. **Context Engineering:** Erst jetzt eine `CLAUDE.md` erstellen.
4. **Plan → Review → Build → Review:** Eine vereinfachte geteilte Ansicht, z. B. `?shared=1`, hinzufügen. Diese Ansicht ist nur ein **UI-Modus**, **kein sicherer Freigabelink**.
5. **Security:** Zeigen, warum versteckte Buttons keine Zugriffsrechte sind; vierstelligen PIN, Backend-Prüfung, `.env`, Session und Rate Limiting an einer **vorbereiteten Sicherheitsübung** untersuchen.
6. **TDD:** `splitGiftCost(totalCents, numberOfPeople)` mit Tests vor der Implementierung entwickeln; alle Summen exakt in Rappen.

### Wichtige organisatorische Entscheidung

**Kein ständiger Branch-Wechsel:** Die Teams arbeiten vom ersten Commit aus fortlaufend im selben Projekt. Halte **einen einzigen funktionsfähigen Referenzstand** als Notfalllösung bereit, falls die Vibe-Coding-Runde nicht genügend Code produziert.

Die PIN-Security-Übung braucht bereits funktionierende serverseitige Zugangskontrolle, damit in 14–22 Minuten die **fehlende Rate-Limiting-Schicht** ergänzt und überprüft werden kann. Erstelle diese Übung **separat als Lehrpersonenmaterial**, nicht im oben genannten Starter. Andernfalls würde sie die erste unstrukturierte Coding-Runde beeinflussen und den Zeitplan unnötig belasten.

### Warum das Projekt absichtlich klein ist

Die ersten 15 Minuten sollen nicht durch Paketinstallation, Angular-Initialisierung, TypeScript- oder Proxy-Probleme aufgebraucht werden. Der Starter nimmt diesen reinen Infrastrukturaufwand ab, ohne den Lernenden Architektur- und Implementierungsentscheidungen zur Wunschliste vorwegzunehmen.

### Offizielle technische Referenzen

- Angular CLI: https://angular.dev/tools/cli/setup-local
- Express 5: https://expressjs.com/en/5x/starter/installing/
