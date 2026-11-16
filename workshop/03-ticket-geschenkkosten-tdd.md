# 03 – TDD-Ticket: Geschenkkosten fair aufteilen

## User Story

> Als Benutzer möchte ich die Kosten eines Geschenks möglichst fair auf mehrere Personen aufteilen können. Die Einzelbeträge müssen **zusammen exakt dem Geschenkpreis entsprechen**.

## Funktionsvertrag

```typescript
splitGiftCost(totalCents: number, participants: number): number[]
```

- `totalCents`: Gesamtpreis als **ganze Zahl von Rappen** (100 CHF = 10000 Rappen).
- `participants`: Anzahl Personen als **positive ganze Zahl**.
- Ergebnis: Liste der Anteile in **ganzen Rappen**, in Reihenfolge der Personen.