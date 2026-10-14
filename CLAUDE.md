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
- Schriften **lokal** in `fonts/` (Barlow Condensed, Montserrat, Yellowtail) – keine Anfragen an Google.
- Demo-Athletenfotos: externe Unsplash-URLs (alle geprüft, 14.10.2026).

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Seitenstruktur (Header, Hero, Filter, Grid, Trust-Sektionen, Footer, Modals) |
| `styles.css` | Komplettes Design-System (Farben, Schriften, Karten, Footer, Profil-Modal) |
| `app.js` | **Inhalt + Logik**: Feld-Schema je Sportart (`SPORT_SCHEMAS`), Athletendaten-Array, Filter, Sortierung, Karten-/Profil-Rendering, Kontakt-Formular (mailto) |
| `filters.js` | Filterlogik wie auf der Live-Seite (GPA, TOEFL, Duolingo, SAT, Start, Soccer-Position, T&F-Disziplinen) |
| `fonts/` | Selbst gehostete Schriften + `fonts.css` |
| `FELDER.md` | **Feld-Mapping WordPress → `app.js`** (alle Sportarten, Grundlage für die Datenübernahme) |
| `real-profiles.local.js` | *Nur lokal, git-ignoriert:* 3 echte Profile für Design-Vergleiche (nie pushen) |
| `Images/` | Scholarbook-Logos (JPEG). Genutzt: `Scholarbook_Logo_Farbe breit 4c.jpg` in Header + Footer |
| `favicon (1).ico` | Favicon |
| `Scholarbook_ForCoaches (1) (2).html` | **Design-Referenz** vom Head of Marketing — Quelle des angewandten Designs. Nicht Teil der Live-Seite, nur Vorlage. |

**Athletendaten:** Gepflegt werden die echten Profile in **WordPress**
(official.scholarbook.net, Plugin `scholarbook-profile-master`, keine REST-API).
**Geplanter Zielweg (Okt. 2026): Variante C – ein eigenes WordPress-Plugin** zeigt das
neue Design abgekapselt auf einer neuen Seite und liest die öffentlichen For-Coaches-Seiten
per WP-Cron aus (Auswertungslogik liegt lokal, nicht im Repo, als Vorlage für den PHP-Port). Der
Entwickler übernimmt Code-Review, Staging, Server-Cron, Wordfence/Cache, Borlabs und
Go-live. Nächster Schritt: Server-Infos aus WordPress (PHP-Version, Plugins, Permalinks).
`app.js` kann Daten von `ATHLETES_API_URL` laden (oder `?api=<url>` zum Testen);
leer oder nicht erreichbar → Demo-Profile aus dem `athletes`-Array.

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
- **Okt. 2026:** Profilfelder 1:1 an die WordPress-Profile angeglichen (alle 400
  Live-Profile ausgewertet). Dabei ersetzt: strukturierte „Personal Bests/Season
  Stats“-Kacheln und die „Performance Development“-Tabelle durch die WordPress-Felder
  (Rich-Text bzw. Saisonblöcke). Kontakt-Button heißt wie live „I am interested“.
  Division-Filter arbeitet mit den WordPress-Kürzeln (D1, D2, NAIA, JUCO).
- **Okt. 2026 — Datenweg:** WordPress bleibt Pflege- und Veröffentlichungssystem.
  Weg „öffentliche Seiten auslesen“ gewählt (keine Änderung an `scholarbook-profile-master` nötig).
  Echte Profildaten nie als Datei ins öffentliche Repo.
- **Okt. 2026 — Zielplattform:** GitHub Pages ist nur Testumgebung. Webflow (Hauptseite)
  geprüft: US-Anbieter, Nachbau + API-Sync aufwendig. EU-Static-Hoster möglich.
  Gewählt wegen Kosten: **Variante C, direkt in WordPress** per Plugin. Ein n8n-Ansatz wurde
  verworfen (kein n8n vorhanden) und ist nicht Teil des Repos.
- **Okt. 2026 — Datenschutz-Basics:** Schriften lokal; YouTube erst nach Klick-Zustimmung
  (`sb-youtube-consent` in localStorage bei „Always load“); Footer-/Social-Links auf die
  echten Ziele der Hauptseite (/en/imprint, /en/privacy, /en/vertrag-kundigen, facebook.com/sportstipendium).
- **Okt. 2026 — Filter & Formular:** Live-Filter nachgebaut und gegen die Live-Seite abgeglichen
  (Details in `FELDER.md`); Filtergruppen aufklappbar. Kontaktformular mit den Live-Feldern
  (mailto; Anhang erst mit dem Plugin, Hinweis im Formular).
- **Echte Profildaten nie ins Repo** (Repo ist öffentlich): `*.local.js` und lokale
  Arbeitsordner (`n8n/`) sind git-ignoriert. Kein Link zum WordPress-Originalprofil auf der Seite.

## Offene Aufgaben (TODO)

1. **WordPress-Plugin (Variante C)** bauen – nach Eingang der Server-Infos; danach
   Übergabe-Paket (ZIP, Briefing, Test-Checkliste) an den Entwickler.
2. **Kontaktformular im Plugin** serverseitig versenden (inkl. Anhang), statt mailto.
3. Optional: Live-Daten-Anbindung (`ATHLETES_API_URL`) an die Plugin-Datenquelle anschließen.

GitHub Pages ist aktiv: https://susannescholarbook.github.io/SCHOLARBOOK-FOR-COACHES-/

## Lokale Vorschau

Am einfachsten: `index.html` doppelklicken. Alternativ ein beliebiger
statischer Server im Projektordner (kein Build nötig).
