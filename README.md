# Scholarbook — For Coaches

Statische Landingpage, auf der Trainer verifizierte internationale
Student-Athleten durchsuchen, filtern und kontaktieren können.

Kein Build, keine Abhängigkeiten — reines HTML/CSS/JS.

## Seite ansehen

**Variante 1 — Doppelklick (am einfachsten):**
Im Ordner `index.html` doppelklicken. Öffnet sich im Standard-Browser.

**Variante 2 — lokaler Server:**
Einen beliebigen statischen Server im Projektordner starten und
`http://localhost:<port>` öffnen. Beispiel mit Node:

```bash
npx serve .
```

## Im Web veröffentlichen (GitHub Pages, kostenlos)

1. Auf GitHub ins Repo → **Settings** → **Pages**
2. Bei „Source": **Deploy from a branch**, Branch **master**, Ordner **/(root)**, **Save**
3. Nach wenigen Minuten erreichbar unter:
   `https://susannescholarbook.github.io/SCHOLARBOOK-FOR-COACHES-/`

## Inhalte bearbeiten

Die Athletendaten und die gesamte Anzeige-Logik stecken in **`app.js`**
(Array `athletes`). Das Aussehen liegt in **`styles.css`**, die
Seitenstruktur in **`index.html`**.

Mehr Kontext und offene Aufgaben: siehe [`CLAUDE.md`](CLAUDE.md).
