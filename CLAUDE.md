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
| `app.js` | **Inhalt + Logik**: Feld-Schema je Sportart (`SPORT_SCHEMAS`), Athletendaten-Array, Filter, Sortierung, Karten-/Profil-Rendering, Kontakt-Formular (mailto) |
| `FELDER.md` | **Feld-Mapping WordPress → `app.js`** (alle Sportarten, Grundlage für die Datenübernahme) |
| `Images/` | Scholarbook-Logos (JPEG). Genutzt: `Scholarbook_Logo_Farbe breit 4c.jpg` in Header + Footer |
| `favicon (1).ico` | Favicon |
| `Scholarbook_ForCoaches (1) (2).html` | **Design-Referenz** vom Head of Marketing — Quelle des angewandten Designs. Nicht Teil der Live-Seite, nur Vorlage. |

**Athletendaten ändern** = das `athletes`-Array in `app.js` bearbeiten.

### Datenmodell (entspricht den WordPress-Profilen)

Jedes Profil hat die Tabs **Athletics, Multimedia, Personal, Academics** wie auf
official.scholarbook.net/for-coaches. Die Athletics-Felder unterscheiden sich je
Sportart und sind in `SPORT_SCHEMAS` definiert (Labels wörtlich aus WordPress).
Sonderfälle: **Golf** hat eine Turniertabelle (`golf_results`), Soccer/Basketball/
Field hockey haben Saison-Statistiken (`seasons`), Tennis hat Rankings + Best Matches,
Track & Field heißt „Greatest Achievements“ statt „Successes“. Viele Felder sind
Rich-Text (HTML aus WordPress) → werden über `richText()` mit Tag-Whitelist gerendert.
Committed-Athleten (`committed`) zeigen nur den Athletics-Tab, ohne Kontakt-Button.
Details: `FELDER.md`.

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
- **Okt. 2026:** Profilfelder 1:1 an die WordPress-Profile angeglichen (alle 428
  Live-Profile ausgewertet). Dabei ersetzt: strukturierte „Personal Bests/Season
  Stats“-Kacheln und die „Performance Development“-Tabelle durch die WordPress-Felder
  (Rich-Text bzw. Saisonblöcke). Kontakt-Button heißt wie live „I am interested“.
  Division-Filter arbeitet mit den WordPress-Kürzeln (D1, D2, NAIA, JUCO).

## Offene Aufgaben (TODO)

1. **Kaputte Athletenfotos**: tote externe Unsplash-Links in `app.js` —
   Profilbilder von **Finn W., Sarah L., Lena B., Lukas M.** sowie mehrere
   Galeriebilder (Sarah L., Matteo K., Chantal V., Niklas H., Lukas M., Finn W.,
   Lena B.) → durch funktionierende Bild-URLs oder lokale Fotos ersetzen.
5. **Fehlende Live-Filter** nachbauen (siehe Ende von `FELDER.md`): GPA-, TOEFL-,
   Duolingo-, SAT-Bereiche, Soccer-Position, Track-&-Field-Disziplinen.
6. **Kontaktformular** an live angleichen (Contact Type, Name, Location, Team-Website,
   Scholarship amount, Attachment).
2. **Footer-Rechtslinks** (Legal Notice, Data Protection, Contract
   Termination) zeigen auf Platzhalter-URLs → echte Ziele setzen.
3. **Social-Media-Links** im Footer sind vermutete Handles → verifizieren.
4. Optional: Veröffentlichung über **GitHub Pages** einrichten (siehe README).

## Lokale Vorschau

Am einfachsten: `index.html` doppelklicken. Alternativ ein beliebiger
statischer Server im Projektordner (kein Build nötig).
