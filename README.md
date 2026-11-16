# AI Christmas Challenge – Starter

Minimales Monorepo mit Angular-Frontend und Express-Backend für den Workshop «AI Christmas Challenge». Es stellt nur Infrastruktur und einen Health-Check bereit – **keine** Wunschlistenfunktionen.

## Voraussetzungen

- **Node.js** LTS `24` (geprüft mit **v24.15.0**)
- **npm** 11.x (mitgeliefert mit Node 24)

Optional mit [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

## Installation

```bash
npm install
```

## Entwicklung starten

```bash
npm run dev
```

Startet Frontend und Backend gleichzeitig:

| Dienst   | URL                         |
|----------|-----------------------------|
| Frontend | http://localhost:4200       |
| Backend  | http://localhost:3000       |
| Health   | http://localhost:3000/api/health |

Während der Entwicklung leitet der Angular-Dev-Proxy `/api` an das Backend weiter.

Einzelne Dienste:

```bash
npm run dev:frontend
npm run dev:backend
```

## Build

```bash
npm run build
```

## Tests

```bash
npm run test
```

Führt Backend- (Vitest) und Frontend-Tests (Angular/Vitest) nicht-interaktiv aus.
