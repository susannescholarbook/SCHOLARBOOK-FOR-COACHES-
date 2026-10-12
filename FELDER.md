# Feld-Mapping WordPress → Dummy-Seite

Abgleich der Profilfelder von **official.scholarbook.net/de/for-coaches/** (WordPress)
mit dem Datenmodell in `app.js`. Stand: 12.10.2026, ausgewertet wurden **alle 428 Live-Profile**
aus 12 Sportarten mit Profilen.

Die Labels in `app.js` (`SPORT_SCHEMAS`, `PERSONAL_FIELDS`, `ACADEMIC_FIELDS`) sind **wörtlich**
die WordPress-Labels. Leere Felder werden nicht angezeigt.

## Woher kommen die Daten auf WordPress?

- Liste je Sportart: `/de/for-coaches/<sport-slug>/` → `ul.profileList[data-id]`
- Profil (AJAX): `/de/for-coaches/?profileId=<id>&sport=<Sportname>` → HTML mit den 4 Tabs
- Öffentlicher Profil-Link: `/de/profile-page/?profile_id=<id>`
- Fotos: `api.scholarbook.net/preview/...` (Galerie), `content/uploads/profile_photo/...` (Profilbild)

## Allgemeine Felder (alle Sportarten)

| WordPress | `app.js` | Hinweis |
|---|---|---|
| Profil-Name („Justin G.“) | `name` | |
| Profilbild | `photo` | Pflicht – ohne Foto wird das Profil nicht angezeigt |
| Profil-Link | `profile_url` | |
| Liste: *Available* | `available_in` | z. B. „Fall 2027“, auch im Tab Academics („Available in“) |
| Liste: *Eligibility* | `eligibility` | z. B. „D1, D2, D3, NAIA, JUCO, Canada“ |
| Liste: *Age* | – (berechnet) | aus `personal.date_of_birth` |
| Liste: *Academic Status* | `academic_status` | Freshman / Transfer / Graduate |
| Liste: *Athletics* (Kurzinfo) | `list.summary[]` | `{label, value}` – z. B. Golf „HCP“ + „Stroke Average“, Rowing „2k erg test“, Swimming „Personal Bests“ |
| Liste Soccer: *Position* | `list.position`, `list.secondary_position` | Kürzel GK, CB, LB, RB, CM, AM, LM, RM, F |
| Liste Soccer: *Division* | `list.division` | z. B. „2nd U19“, „NJCAA D1“ |
| „erfolgreich vermittelt / committed“ | `committed` | Array der Schulen (Anzeige mit ✈). Committed-Profile zeigen **nur den Tab Athletics** und keinen Kontakt-Button |

### Tab „Personal“
| WordPress | `app.js` |
|---|---|
| Sex | `personal.sex` |
| Date of Birth | `personal.date_of_birth` (YYYY-MM-DD) |
| Nationality | `personal.nationality` |

### Tab „Academics“
| WordPress | `app.js` | Hinweis |
|---|---|---|
| Graduation | `academics.graduation` | |
| GPA | `academics.gpa` | Freitext („Expected GPA 4.0“, „3.0-3.3“) |
| Enrollment | `academics.enrollment` | |
| Potential Major | `academics.potential_major` | |
| Duolingo | `academics.duolingo` | optional; Score **oder** Testdatum |
| TOEFL | `academics.toefl` | optional |
| SAT: CR | `academics.sat_cr` | optional; Score oder Testdatum |
| SAT: M | `academics.sat_m` | optional; Score oder Testdatum |
| SAT Essay | `academics.sat_essay` | optional (selten) |
| ACT | `academics.act` | optional (selten) |
| Available in | `available_in` | |

### Tab „Multimedia“ + Promotion-Video
| WordPress | `app.js` |
|---|---|
| „Promotion video“ (oben im Tab Athletics) | `athletics.promotion_video` (YouTube-URL) |
| weitere Videos/Links im Tab Multimedia | `multimedia.videos[]` `{title, url}` |
| Fotos (`img.sportprofil-foto`) | `multimedia.photos[]` |

## Tab „Athletics“ je Sportart

Felder mit *(Text)* sind auf WordPress Rich-Text (fett, Listen, Zeilenumbrüche, Links).
`app.js` übernimmt dieses HTML direkt und filtert es auf sichere Tags.

### Soccer (147 Profile)
**Athletic information** (`athletics.info`): Main position · Secondary position · Height · Weight ·
Foot · Sprint-times *(Text)* · Club · Current league · Highest league played · Link of current club ·
Role in the team *(Text)* · Strengths *(Text)* · Miscellaneous information *(Text)*

**Season stats field player** (`athletics.seasons[]`, je Saison `season: "2024/2025"`):
League · Club · Position · Secondary Position · Games Played · Games Started · Goals · Assists ·
Link zum Verein — **Torwart zusätzlich:** Of which won · Of which drawn · Of which lost ·
Number of goals conceded · Number of games to nil · Penalties saved

**Greatest Successes** (`athletics.successes`): Local · National · International · Miscellaneous Successes

### Track and Field, Cross Country (129 Profile)
**Athletic information**: Height · Weight · Club · Disciplines · Further disciplines ·
Training Sessions per week · Training hours per week · Role in the team *(Text)* · Strengths *(Text)* ·
Miscellaneous information *(Text)* · Athletic Progression *(Text)* · Personal bests *(Text)*

**Greatest Achievements** (nicht „Successes“!): Local · National · International · Miscellaneous Achievements

### Swimming (50 Profile)
**Athletic information**: Height · Weight · Club · Disciplines · Further disciplines ·
Training units per week · Training hours per week · Role in the team *(Text)* · Strengths *(Text)* ·
Miscellaneous information *(Text)* · Personal bests *(Text, LCM/SCY)* · Performance Development *(Text)*

**Greatest Successes**: Local · National · International · Miscellaneous Successes

### Golf (15 Profile) — mit Turniertabelle
**Athletic information**: Club · Current league · Strength on the course · Weaknesses on the course ·
Mentality on the course · Development Potential · HCP · Carry distance 7 iron · Carry distance driver ·
Driver swing Speed · Average greens hit · Role in the team · (Miscellaneous information)

**Greatest Successes**: Local · National · International · Miscellaneous Successes

**Golf Results** (`athletics.golf_results[]`), Spalten:
Year · Placement · Tournament · CR · SLOPE · PAR · R1 · R2 · R3 · R4

> Auf WordPress uneinheitlich: teils „…on the court“ statt „…on the course“, ein Profil hat
> „Location“ statt „Placement“. In `app.js` vereinheitlicht auf *course* / *Placement*.

### Basketball (8)
**Athletic information**: Main position · Secondary position · Height · Weight · Club · Current league ·
Highest league played · Role in the team · Strengths · Miscellaneous information
**Season stats** (`seasons[]`): League · Club · Position · Secondary Position · G · MPG · PPG · FTP ·
3PP · RPG · APG · STL · TO · Internetlink
**Greatest Successes**

### Field hockey (9)
**Athletic information**: Main position · Secondary position · Regular player · Height · Weight · Club ·
Role in the team · Strengths · Miscellaneous information
**Season stats** (`seasons[]`): League · Club · Position · Secondary Position · Games Played ·
Games Started · Goals · Assists · Link zum Verein
**Greatest Successes**

### Volleyball (13)
**Athletic information**: Height · Weight · Exercised since · Training hours per week · Position ·
Dominant hand · Standing reach · Block jump touch · Hitting reach · League · Highest league played · Club
**Greatest Successes**

### Tennis (12)
**Athletic information**: Height · Weight · Club · Current league · Strength on the course ·
Weaknesses on the course · Mentality on the course · Development Potential
**Greatest Successes**
**Rankings** (`athletics.rankings[]` `{label, value}` – frei, z. B. UTR, German Ranking/LK, Swiss Ranking, WTN)
**Best Matches** (`athletics.best_matches`, Text)

### Rowing (10)
**Athletic information**: Height · Weight · Exercised since · Disciplines · Training hours per week ·
Personal best 2000m Ergo test · Role in the team · Strengths · Still to improve · Miscellaneous information
**Greatest Successes**

### Baseball (3)
**Athletic information**: Club · Training units per week · Training hours per week · Height · Weight ·
Position · Secondary positions · Bat/Throw · Highest league played · Exercised since · Role in the team ·
Miscellaneous information
**Greatest Successes**

### Cycling (3) und alle Sportarten ohne Live-Profile (Standard-Schema)
**Athletic information**: Club · Training units per week · Training hours per week · Height · Weight ·
Disciplines · Further disciplines · Role in the team · Strengths · Miscellaneous information
**Greatest Successes**

### Wrestling (1)
**Athletic information**: Club · Training units per week · Training hours per week · Height · Weight ·
Role in the team · Miscellaneous information
**Greatest Successes**

## Auffälligkeiten in den WordPress-Daten

- Labels sind teils frei getippt (Tippfehler wie „Strenghts“, Varianten „Role in the Team“, „Season Fall 2025“,
  „Link zum Verein“ deutsch). Bei der Übernahme auf die Schema-Labels oben normalisieren.
- Einzelne Profile haben Sonderzeilen (z. B. „School“, „Conference“, „Games Played JV“, „Clean Sheets“).
  `School` wird bei Committed-Profilen angezeigt; andere Einzelfälle beim Import prüfen.
- Duolingo/SAT enthalten entweder einen Score oder ein (geplantes) Testdatum.

## Filter auf der Live-Seite (noch nicht alle in der Dummy-Seite)

Alle Sportarten: Gender · Coaching Division · Academic Status · GPA-Bereich · TOEFL-Bereich ·
Duolingo-Bereich · SAT-Bereich · Start of studies.
Zusätzlich **Soccer:** Athlete Position · **Track & Field:** Disziplinen (Sprints, Hurdles, Middle/Long
distance, Relays, Jumps, Throws, Combined events).
Die Dummy-Seite hat bisher: Sport, Gender, Division, Academic Status, Start, Freitextsuche.
