# CLAUDE.md — Projektkontext

Diese Datei gibt jeder Claude-Sitzung den nötigen Kontext, um nahtlos an
diesem Projekt weiterzuarbeiten (z. B. aus einem anderen Account / Rechner
nach einem `git clone`).

## Was ist das?

**Scholarbook — For Coaches**: eine statische Landingpage, auf der Trainer
(Coaches) verifizierte internationale Student-Athleten durchsuchen und
kontaktieren können. Keine Datenbank, kein Backend — reines HTML/CSS/JS,
das direkt im Browser läuft.

Live-Quelle (Wahrheit): GitHub-Repo
`https://github.com/susannescholarbook/SCHOLARBOOK-FOR-COACHES-`

## Technik-Stack

- Reines **statisches HTML/CSS/JS**, **kein Build-Schritt**, keine
  Abhängigkeiten/npm. Einfach `index.html` im Browser öffnen.
- Schriften über Google Fonts (Barlow Condensed, Yellowtail, Montserrat).
- Athletenfotos: aktuell externe Unsplash-URLs (siehe offene Aufgaben).

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Seitenstruktur (Header, Hero, Filter, Grid, Trust-Sektionen, Footer, Modals) |
| `styles.css` | Komplettes Design-System (Farben, Schriften, Karten, Footer, Profil-Modal) |
| `app.js` | **Inhalt + Logik**: Athletendaten-Array, Filter, Sortierung, Karten-/Profil-Rendering, Kontakt-Formular (mailto) |
| `Images/` | Scholarbook-Logos (JPEG). Genutzt: `Scholarbook_Logo_Farbe breit 4c.jpg` in Header + Footer |
| `favicon (1).ico` | Favicon |
| `Scholarbook_ForCoaches (1) (2).html` | **Design-Referenz** vom Head of Marketing — Quelle des angewandten Designs. Nicht Teil der Live-Seite, nur Vorlage. |

**Athletendaten ändern** = das `athletes`-Array in `app.js` bearbeiten.

## Design-System (Kurzreferenz)

- Schriften: `Barlow Condensed` (Display/Headlines, kursiv-uppercase),
  `Yellowtail` (Script, z. B. „one team. one goal."), `Montserrat` (Fließtext).
- Farben (CSS-Variablen in `styles.css`): `--sb-blue-ink #050f2d`,
  `--sb-blue-deep #081c4e`, `--sb-blue #123a9e`, `--sb-royal #1e57d6`,
  `--sb-gold #e1c165`, `--sb-pink #e40b49`, `--sb-sky #5ec6e8`,
  `--sb-off-white #f6fcff`.
- Hero: `--campaign-gradient` (Blauverlauf) mit schräger clip-path-Kante.
- Karten: Blauverlauf, goldenes Sport-Badge, weiß-kursiver Name mit
  Unterlinie, goldene Fußleiste. Profil-Modal: Foto mit Goldrahmen, Tabs.

## Getroffene Entscheidungen

- Das Marketing-Design aus `Scholarbook_ForCoaches (1) (2).html` wurde auf
  `index.html` + `styles.css` übertragen.
- **Alle bestehenden Funktionen wurden bewusst behalten** (Suche,
  Sortierung, Video-Highlight-Reels, Foto-Galerien, Performance-Charts,
  Trust-Sektionen, voller Filtersatz). `app.js` blieb dabei unverändert.
- Hero und die frühere separate „Get to know / Our Athletes"-Intro wurden
  zu **einem Hero zusammengeführt** (so wie im Marketing-Design).
- Das Logo wird als **Datei aus `Images/`** verlinkt (Header + Footer),
  nicht mehr als Inline-Base64 → `index.html` bleibt schlank (~15 KB).

## Offene Aufgaben (TODO)

1. **Vier kaputte Athletenfotos**: tote externe Unsplash-Links in `app.js`
   für **Finn W., Sarah L., Lena B., Lukas M.** → durch funktionierende
   Bild-URLs oder lokale Fotos (z. B. in `Images/`) ersetzen.
2. **Footer-Rechtslinks** (Legal Notice, Data Protection, Contract
   Termination) zeigen auf Platzhalter-URLs → echte Ziele setzen.
3. **Social-Media-Links** im Footer sind vermutete Handles → verifizieren.
4. Optional: Veröffentlichung über **GitHub Pages** einrichten (siehe README).

## Lokale Vorschau

Am einfachsten: `index.html` doppelklicken. Alternativ ein beliebiger
statischer Server im Projektordner (kein Build nötig).
