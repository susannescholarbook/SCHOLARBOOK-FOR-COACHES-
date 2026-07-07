/**
 * Scholarbook For Coaches — athlete directory
 */

const SPORTS = [
  "American Football", "Baseball", "Basketball", "Bowling", "Cross country skiing",
  "Cycling", "Fencing", "Field hockey", "Golf", "Gymnastics", "Diving", "Ice hockey",
  "Rowing", "Shooting", "Ski Alpin", "Soccer", "Swimming", "Tennis",
  "Track and Field, Cross Country", "Volleyball", "Waterpolo", "Wrestling", "Other sports",
];

const MEASURABLE_SPORTS = new Set([
  "Track and Field, Cross Country",
  "Swimming",
  "Rowing",
  "Cross country skiing",
]);

/** Sport-specific athletic field keys (Personal & Academic stays universal) */
const SPORT_ATHLETIC_KEYS = {
  Soccer: ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "current_league", "highest_league", "training_hours", "team_role", "personal_strengths"],
  Basketball: ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "current_league", "highest_league", "training_hours", "team_role", "personal_strengths"],
  "Track and Field, Cross Country": ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "highest_league", "training_hours", "personal_strengths"],
  Swimming: ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "highest_league", "training_hours", "personal_strengths"],
  Rowing: ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "highest_league", "training_hours", "team_role", "personal_strengths"],
  Tennis: ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "current_league", "highest_league", "training_hours", "team_role", "personal_strengths"],
  "Field hockey": ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "current_league", "highest_league", "training_hours", "team_role", "personal_strengths"],
};

const ATHLETIC_LABELS = {
  position: "Position",
  height: "Height",
  weight: "Weight",
  personal_bests: "Personal Bests",
  season_stats: "Season Stats",
  achievements: "Greatest Successes",
  club: "Club Name",
  current_league: "Current League",
  highest_league: "Highest League Played",
  training_hours: "Training Hours per Week",
  team_role: "Role in the Team",
  personal_strengths: "Personal Strengths",
};

const PERSONAL_FIELDS = [
  ["First Name", "firstname"],
  ["Surname Initial", "lastname_initial"],
  ["Age", "age"],
  ["Status", "enrollment_status"],
  ["Eligibility", "eligibility"],
  ["Expected Start of Studies", "start_term"],
  ["Class", "class_of"],
  ["Expected GPA", "gpa"],
  ["Potential Major", "potential_major"],
];

function hasTestScore(value) {
  if (value === undefined || value === null) return false;
  const s = String(value).trim();
  return s.length > 0 && s !== "—" && s !== "-";
}

/** Show test date only when no score exists; otherwise show score only */
function personalTestFields(athlete) {
  const fields = [];
  if (hasTestScore(athlete.duolingo_score)) {
    fields.push(["Duolingo Score", "duolingo_score"]);
  } else if (athlete.duolingo_date) {
    fields.push(["Duolingo Test Date", "duolingo_date"]);
  }
  if (hasTestScore(athlete.sat_act_score)) {
    fields.push(["SAT/ACT Score", "sat_act_score"]);
  } else if (athlete.sat_act_date) {
    fields.push(["SAT/ACT Test Date", "sat_act_date"]);
  }
  return fields;
}

function getPersonalFields(athlete) {
  return [...PERSONAL_FIELDS, ...personalTestFields(athlete)];
}

const athletes = [
  {
    firstname: "Emma",
    lastname_initial: "S.",
    age: 18,
    gender: "Female",
    region: "Hesse, Germany",
    enrollment_status: "Freshman",
    eligibility: "NCAA Div 1, NCAA Div 2, NAIA",
    start_term: "Fall 2026",
    start_year: 2026,
    class_of: 2026,
    graduation_year: 2025,
    gpa: "3.95 (Unweighted)",
    gpa_numeric: 3.95,
    potential_major: "Exercise Science",
    duolingo_date: "Oct 2025",
    duolingo_score: "135",
    sat_act_date: "Nov 2025",
    sat_act_score: "SAT 1420",
    sport: "Soccer",
    position: "Central Midfielder",
    height: "5'8\" (173 cm)",
    weight: "145 lbs (66 kg)",
    personal_bests: [
      { value: "13.4", unit: "level", label: "Beep Test" },
      { value: "4.88", unit: "sec", label: "40-Yard Dash" },
    ],
    season_stats: [
      { value: "24", unit: "matches", label: "Matches" },
      { value: "12", unit: "goals", label: "Goals" },
      { value: "18", unit: "assists", label: "Assists" },
    ],
    achievements: ["German Youth National League Champion (U17)"],
    club: "1. FFV Frankfurt Youth Academy",
    current_league: "U19 Bundesliga",
    highest_league: "U19 Bundesliga",
    training_hours: "18 hrs/week",
    team_role: "Team Captain & Primary Playmaker",
    personal_strengths: ["Tactical awareness", "Two-footed passing", "Endurance"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    last_updated: "2026-06-15",
    teaser: "Elite midfielder seeking NCAA Division I programs for Fall 2026.",
  },
  {
    firstname: "Niklas",
    lastname_initial: "H.",
    age: 19,
    gender: "Male",
    region: "Berlin, Germany",
    enrollment_status: "Freshman",
    eligibility: "NCAA Div 1, NCAA Div 2, NAIA, JUCO",
    start_term: "Fall 2026",
    start_year: 2026,
    class_of: 2026,
    graduation_year: 2025,
    gpa: "3.10",
    gpa_numeric: 3.1,
    potential_major: "Communications",
    duolingo_date: "Sep 2025",
    duolingo_score: "110",
    sat_act_date: "Oct 2025",
    sat_act_score: "ACT 22",
    sport: "Basketball",
    position: "Combo Guard",
    height: "6'3\" (190 cm)",
    weight: "182 lbs (82 kg)",
    personal_bests: [
      { value: "34", unit: "in", label: "Vertical" },
      { value: "10.8", unit: "sec", label: "Lane Agility" },
    ],
    season_stats: [
      { value: "16.4", unit: "PPG", label: "Points" },
      { value: "6.2", unit: "APG", label: "Assists" },
      { value: "41", unit: "%", label: "3PT" },
    ],
    achievements: ["NBBL All-Star", "State Championship MVP"],
    club: "ALBA Berlin Academy",
    current_league: "NBBL & Regionalliga",
    highest_league: "NBBL U19",
    training_hours: "20 hrs/week",
    team_role: "On-court general, vocal leader",
    personal_strengths: ["High IQ", "Pick-and-roll decisions", "Defensive footwork"],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519861537509-b785668017ad?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    last_updated: "2026-06-28",
    teaser: "Dynamic guard from Germany's top youth league pipeline.",
  },
  {
    firstname: "Sarah",
    lastname_initial: "L.",
    age: 20,
    gender: "Female",
    region: "North Rhine-Westphalia, Germany",
    enrollment_status: "Transfer",
    eligibility: "NCAA Div 1",
    start_term: "Fall 2027",
    start_year: 2027,
    class_of: 2024,
    graduation_year: 2024,
    gpa: "3.72",
    gpa_numeric: 3.72,
    potential_major: "Psychology",
    duolingo_date: "Jun 2024",
    duolingo_score: "140",
    sat_act_date: "Oct 2023",
    sat_act_score: "ACT 29",
    sport: "Track and Field, Cross Country",
    position: "800m / 1500m",
    height: "5'6\" (168 cm)",
    weight: "128 lbs (58 kg)",
    personal_bests: [
      { value: "2:05.42", unit: "min", label: "800m" },
      { value: "4:18.15", unit: "min", label: "1500m" },
    ],
    season_stats: [
      { value: "6", unit: "wins", label: "Invitational Wins" },
      { value: "1", unit: "", label: "National Collegiate Finalist" },
    ],
    achievements: ["European U20 800m semifinalist"],
    club: "LG Olympia Dortmund",
    highest_league: "European U20 Championships",
    training_hours: "20 hrs/week",
    personal_strengths: ["Tactical racing", "Explosive kick", "Aerobic base"],
    performance_seasons: [
      { season: "2023–24", metric: "800m PR", value: "2:08.60" },
      { season: "2024–25", metric: "800m PR", value: "2:05.42" },
      { season: "2024–25", metric: "1500m PR", value: "4:18.15" },
    ],
    image: "https://images.unsplash.com/photo-1552675811-a8d68084c895?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1461896836934-ffe607c9380e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571008887538-b36bbaf4fe83?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1452626038306-9bf093d8b957?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    last_updated: "2026-06-20",
    teaser: "Transfer-ready middle-distance talent with international experience.",
  },
  {
    firstname: "Lukas",
    lastname_initial: "M.",
    age: 19,
    gender: "Male",
    region: "North Rhine-Westphalia, Germany",
    enrollment_status: "Freshman",
    eligibility: "NCAA Div 1, NCAA Div 2",
    start_term: "Fall 2026",
    start_year: 2026,
    class_of: 2026,
    graduation_year: 2025,
    gpa: "3.80",
    gpa_numeric: 3.8,
    potential_major: "Business Administration",
    duolingo_date: "Sep 2025",
    duolingo_score: "125",
    sat_act_date: "Dec 2025",
    sat_act_score: "SAT 1340",
    sport: "Tennis",
    position: "Singles / Doubles",
    height: "6'2\" (188 cm)",
    weight: "175 lbs (79 kg)",
    personal_bests: [
      { value: "12.4", unit: "UTR", label: "Universal Tennis Rating" },
      { value: "122", unit: "mph", label: "Serve Speed" },
    ],
    season_stats: [
      { value: "32-6", unit: "", label: "Singles Record" },
      { value: "18-4", unit: "", label: "Doubles Record" },
    ],
    achievements: ["National U18 Singles Runner-Up (Germany)"],
    club: "TC Rot-Weiß Düsseldorf",
    current_league: "Regionalliga West",
    highest_league: "Regionalliga West",
    training_hours: "22 hrs/week",
    team_role: "Lead singles competitor",
    personal_strengths: ["Serve-forehand combo", "Lateral movement", "Mental resilience"],
    image: "https://images.unsplash.com/photo-1622279457126-a79205ffae38?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1554068865-24cecd4e1b11?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    last_updated: "2026-05-30",
    teaser: "High-UTR prospect with ITF junior experience.",
  },
  {
    firstname: "Chantal",
    lastname_initial: "V.",
    age: 17,
    gender: "Female",
    region: "North Brabant, Netherlands",
    enrollment_status: "Freshman",
    eligibility: "NAIA, NCAA Div 2",
    start_term: "Fall 2028",
    start_year: 2028,
    class_of: 2028,
    graduation_year: 2027,
    gpa: "3.45 (estimated)",
    gpa_numeric: 3.45,
    potential_major: "Biological Sciences",
    duolingo_date: "Planned Sep 2026",
    duolingo_score: "—",
    sat_act_date: "Planned Oct 2026",
    sat_act_score: "—",
    sport: "Swimming",
    position: "Freestyle / Butterfly",
    height: "5'10\" (178 cm)",
    weight: "148 lbs (67 kg)",
    personal_bests: [
      { value: "56.40", unit: "sec", label: "100m Free (LCM)" },
      { value: "1:02.15", unit: "sec", label: "100m Fly (LCM)" },
    ],
    season_stats: [
      { value: "8", unit: "medals", label: "U18 National Meets" },
    ],
    achievements: ["Dutch Junior Nationals finalist"],
    club: "PSV Eindhoven Swim Club",
    highest_league: "Dutch National Championships",
    training_hours: "24 hrs/week",
    personal_strengths: ["Start reaction", "Dolphin kick", "Hydrodynamics"],
    performance_seasons: [
      { season: "2023–24", metric: "100m Free", value: "57.30s" },
      { season: "2024–25", metric: "100m Free", value: "56.40s" },
      { season: "2024–25", metric: "100m Fly", value: "1:02.15" },
    ],
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519315901247-f9ef1c2df5a0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    last_updated: "2026-06-10",
    teaser: "Rising sprint specialist targeting 2028 enrollment.",
  },
  {
    firstname: "Finn",
    lastname_initial: "W.",
    age: 22,
    gender: "Male",
    region: "North Rhine-Westphalia, Germany",
    enrollment_status: "Graduate",
    eligibility: "NCAA Div 1",
    start_term: "Fall 2026",
    start_year: 2026,
    class_of: 2022,
    graduation_year: 2022,
    gpa: "3.88",
    gpa_numeric: 3.88,
    potential_major: "Aerospace Engineering (M.S.)",
    duolingo_date: "Jan 2026",
    duolingo_score: "145",
    sat_act_date: "Feb 2026",
    sat_act_score: "GRE 322",
    sport: "Rowing",
    position: "Port Rower (8+)",
    height: "6'6\" (198 cm)",
    weight: "205 lbs (93 kg)",
    personal_bests: [
      { value: "5:58.2", unit: "min", label: "2k Erg" },
    ],
    season_stats: [
      { value: "Undefeated", unit: "", label: "Senior Head Regattas" },
    ],
    achievements: ["Henley Temple Cup semifinalist"],
    club: "Crefelder Ruder-Club 1883",
    highest_league: "U23 International Championships",
    training_hours: "26 hrs/week",
    team_role: "Boat leader, cadence setter",
    personal_strengths: ["Leverage", "VO2 max", "Catch mechanics"],
    performance_seasons: [
      { season: "2023–24", metric: "2k Erg", value: "6:04.8" },
      { season: "2024–25", metric: "2k Erg", value: "5:59.1" },
      { season: "2025–26", metric: "2k Erg", value: "5:58.2" },
    ],
    image: "https://images.unsplash.com/photo-1517649763962-0c62306601b7?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1544551763-77efdedddd72?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    last_updated: "2026-06-25",
    teaser: "Graduate transfer with Henley-level experience.",
  },
  {
    firstname: "Matteo",
    lastname_initial: "K.",
    age: 18,
    gender: "Male",
    region: "Baden-Württemberg, Germany",
    enrollment_status: "Freshman",
    eligibility: "NCAA Div 2, NAIA, JUCO",
    start_term: "Fall 2026",
    start_year: 2026,
    class_of: 2026,
    graduation_year: 2025,
    gpa: "3.25",
    gpa_numeric: 3.25,
    potential_major: "Sports Management",
    duolingo_date: "Nov 2025",
    duolingo_score: "115",
    sat_act_date: "Jan 2026",
    sat_act_score: "SAT 1180",
    sport: "Soccer",
    position: "Center Back",
    height: "6'4\" (193 cm)",
    weight: "190 lbs (86 kg)",
    personal_bests: [
      { value: "31", unit: "in", label: "Vertical" },
      { value: "82", unit: "%", label: "Aerial Duel Success" },
    ],
    season_stats: [
      { value: "26", unit: "starts", label: "Starts" },
      { value: "164", unit: "", label: "Interceptions" },
    ],
    achievements: ["State selection team", "Defensive POTY 2025"],
    club: "VfB Stuttgart U19",
    current_league: "A-Junioren Regionalliga",
    highest_league: "A-Junioren Regionalliga",
    training_hours: "16 hrs/week",
    team_role: "Defensive commander",
    personal_strengths: ["Aerial dominance", "1v1 tackling", "Organization"],
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1508098682722-e89c9a5890d5?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    last_updated: "2026-06-18",
    teaser: "Physical center back from Stuttgart youth academy.",
  },
  {
    firstname: "Lena",
    lastname_initial: "B.",
    age: 18,
    gender: "Female",
    region: "North Rhine-Westphalia, Germany",
    enrollment_status: "Freshman",
    eligibility: "NCAA Div 2, NAIA",
    start_term: "Fall 2027",
    start_year: 2027,
    class_of: 2027,
    graduation_year: 2026,
    gpa: "3.60",
    gpa_numeric: 3.6,
    potential_major: "Environmental Studies",
    duolingo_date: "Dec 2025",
    duolingo_score: "120",
    sat_act_date: "Nov 2025",
    sat_act_score: "SAT 1210",
    sport: "Field hockey",
    position: "Forward / Striker",
    height: "5'5\" (165 cm)",
    weight: "135 lbs (61 kg)",
    personal_bests: [
      { value: "4.12", unit: "sec", label: "30m Sprint" },
    ],
    season_stats: [
      { value: "15", unit: "goals", label: "Goals" },
      { value: "9", unit: "assists", label: "Assists" },
    ],
    achievements: ["State junior select forward"],
    club: "Kölner THC Stadion Rot-Weiß",
    current_league: "1. Bundesliga Jugend",
    highest_league: "2. Regionalliga (adult)",
    training_hours: "15 hrs/week",
    team_role: "High-pressing attacker",
    personal_strengths: ["Stick skills in tight spaces", "Clinical finishing"],
    image: "https://images.unsplash.com/photo-1599586120424-d291457962e6?w=600&h=750&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1577223625816-7544f4d80882?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551958214-2d59cc7460a8?w=400&h=300&fit=crop",
    ],
    highlight_reel: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    last_updated: "2026-06-05",
    teaser: "Prolific forward from Germany's premier youth hockey league.",
  },
];

/** Only athletes with photos are shown (photos mandatory) */
const visibleAthletes = athletes.filter((a) => a.image);

const state = {
  sport: "",
  gender: "",
  divisions: [],
  statuses: [],
  starts: [],
  search: "",
  sort: "updated",
};

let selectedAthlete = null;

const els = {};

function cacheElements() {
  els.grid = document.getElementById("athletes-grid");
  els.count = document.getElementById("results-count");
  els.sport = document.getElementById("filter-sport");
  els.search = document.getElementById("filter-search");
  els.sort = document.getElementById("sort-by");
  els.clear = document.getElementById("filter-clear");
  els.profileModal = document.getElementById("profile-modal");
  els.profileContent = document.getElementById("profile-content");
  els.profileClose = document.getElementById("profile-close");
  els.recruitModal = document.getElementById("recruit-modal");
  els.recruitClose = document.getElementById("recruit-close");
  els.recruitForm = document.getElementById("recruit-form");
  els.recruitLabel = document.getElementById("recruit-athlete-label");
  els.recruitTitle = document.getElementById("recruit-modal-title");
  els.videoModal = document.getElementById("video-modal");
  els.videoEmbed = document.getElementById("video-embed");
  els.videoClose = document.getElementById("video-close");
}

function init() {
  cacheElements();
  populateSportSelect();
  bindFilters();
  render(getSorted(filtered()));
}

function populateSportSelect() {
  SPORTS.forEach((sport) => {
    const opt = document.createElement("option");
    opt.value = sport;
    opt.textContent = sport;
    els.sport.appendChild(opt);
  });
}

function bindFilters() {
  els.sport.addEventListener("change", () => {
    state.sport = els.sport.value;
    render(getSorted(filtered()));
  });

  els.search.addEventListener("input", () => {
    state.search = els.search.value.trim().toLowerCase();
    render(getSorted(filtered()));
  });

  els.sort.addEventListener("change", () => {
    state.sort = els.sort.value;
    render(getSorted(filtered()));
  });

  document.querySelectorAll('[data-filter="gender"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.value;
      if (btn.classList.contains("active")) {
        btn.classList.remove("active");
        state.gender = "";
      } else {
        document.querySelectorAll('[data-filter="gender"]').forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.gender = val;
      }
      render(getSorted(filtered()));
    });
  });

  document.querySelectorAll("#filter-division .pill").forEach((pill) => {
    pill.addEventListener("click", () => togglePill(pill, state.divisions, () => render(getSorted(filtered()))));
  });

  document.querySelectorAll("#filter-status .pill").forEach((pill) => {
    pill.addEventListener("click", () => togglePill(pill, state.statuses, () => render(getSorted(filtered()))));
  });

  document.querySelectorAll("#filter-start .pill").forEach((pill) => {
    pill.addEventListener("click", () => togglePill(pill, state.starts, () => render(getSorted(filtered()))));
  });

  els.clear.addEventListener("click", resetFilters);

  els.profileClose.addEventListener("click", () => els.profileModal.close());
  els.recruitClose.addEventListener("click", () => els.recruitModal.close());
  els.videoClose.addEventListener("click", closeVideo);

  els.profileModal.addEventListener("click", (e) => {
    if (e.target === els.profileModal) els.profileModal.close();
  });
  els.recruitModal.addEventListener("click", (e) => {
    if (e.target === els.recruitModal) els.recruitModal.close();
  });
  els.videoModal.addEventListener("click", (e) => {
    if (e.target === els.videoModal) closeVideo();
  });

  els.recruitForm.addEventListener("submit", onRecruitSubmit);
}

function togglePill(pill, arr, callback) {
  const val = pill.dataset.value;
  if (pill.classList.contains("active")) {
    pill.classList.remove("active");
    const idx = arr.indexOf(val);
    if (idx >= 0) arr.splice(idx, 1);
  } else {
    pill.classList.add("active");
    arr.push(val);
  }
  callback();
}

function resetFilters() {
  state.sport = "";
  state.gender = "";
  state.divisions = [];
  state.statuses = [];
  state.starts = [];
  state.search = "";
  els.sport.value = "";
  els.search.value = "";
  document.querySelectorAll(".toggle-btn.active, .pill.active").forEach((el) => el.classList.remove("active"));
  render(getSorted(visibleAthletes));
}

function matchDivision(eligibility, divisions) {
  if (!divisions.length) return true;
  const e = eligibility.toLowerCase();
  return divisions.some((d) => e.includes(d.toLowerCase()));
}

function filtered() {
  return visibleAthletes.filter((a) => {
    if (state.sport && a.sport !== state.sport) return false;
    if (state.gender && a.gender !== state.gender) return false;
    if (!matchDivision(a.eligibility, state.divisions)) return false;
    if (state.statuses.length && !state.statuses.includes(a.enrollment_status)) return false;
    if (state.starts.length && !state.starts.includes(a.start_term)) return false;
    if (state.search) {
      const haystack = [a.position, a.region, a.club].join(" ").toLowerCase();
      if (!haystack.includes(state.search)) return false;
    }
    return true;
  });
}

function getSorted(list) {
  const sorted = [...list];
  if (state.sort === "gpa") {
    sorted.sort((a, b) => (b.gpa_numeric || 0) - (a.gpa_numeric || 0));
  } else if (state.sort === "start") {
    sorted.sort((a, b) => (a.start_year || 0) - (b.start_year || 0));
  } else {
    sorted.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));
  }
  return sorted;
}

function displayName(a) {
  return `${a.firstname} ${a.lastname_initial}`;
}

function classOf(a) {
  return `Class of ${a.class_of || a.graduation_year + 1}`;
}

function youtubeId(url) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return match ? match[1] : "";
}

function playIconSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
}

function highlightReelThumbHtml(a, contextClass) {
  if (!a.highlight_reel) return "";
  return `
    <button type="button" class="card-video-thumb ${contextClass || ""}" data-video="${escapeAttr(a.highlight_reel)}" aria-label="Play highlight reel for ${escapeAttr(displayName(a))}">
      <span class="card-reel-label">Highlight Reel</span>
      <span class="card-play-btn">${playIconSvg()}</span>
    </button>`;
}

function render(list) {
  els.count.textContent = list.length;
  els.grid.innerHTML = "";

  if (!list.length) {
    els.grid.innerHTML = `
      <div class="empty-state">
        <h3>No athletes found</h3>
        <p>Adjust your filters or clear search to see more profiles.</p>
      </div>`;
    return;
  }

  list.forEach((a) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "athlete-card";
    card.setAttribute("aria-label", `View profile: ${displayName(a)}`);

    const divisions = (a.eligibility || "").split(",").slice(0, 2).map((s) => s.trim());

    card.innerHTML = `
      <div class="card-media">
        <img src="${escapeAttr(a.image)}" alt="${escapeAttr(displayName(a))}" loading="lazy">
        <span class="card-sport-badge">${escapeHtml(a.sport)}</span>
        ${highlightReelThumbHtml(a)}
      </div>
      <div class="card-body">
        <h3 class="card-name">${escapeHtml(displayName(a))}</h3>
        <div class="card-meta-line">
          <span class="card-position">${escapeHtml(a.position)}</span>
          <span class="card-class">${escapeHtml(classOf(a))}</span>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-meta-pills">
          ${divisions.map((d) => `<span>${escapeHtml(d)}</span>`).join("")}
        </div>
        <span class="btn-card-view">View profile →</span>
      </div>
    `;

    const videoBtn = card.querySelector(".card-video-thumb");
    if (videoBtn) {
      videoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openVideo(a.highlight_reel, displayName(a));
      });
    }

    card.addEventListener("click", () => openProfile(a));
    els.grid.appendChild(card);
  });
}

function dataPointsHtml(items) {
  if (!items || !items.length) return "—";
  return `<div class="data-points">${items
    .map(
      (item) => `
      <span class="data-point">
        <span class="data-point-value">${escapeHtml(item.value)}</span>
        ${item.unit ? `<span class="data-point-unit">${escapeHtml(item.unit)}</span>` : ""}
        <span class="data-point-label">${escapeHtml(item.label)}</span>
      </span>`
    )
    .join("")}</div>`;
}

function listHtml(items) {
  if (!items || !items.length) return "—";
  if (Array.isArray(items)) {
    return `<ul class="detail-list">${items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
  }
  return escapeHtml(String(items));
}

function getAthleticKeys(sport) {
  if (SPORT_ATHLETIC_KEYS[sport]) return SPORT_ATHLETIC_KEYS[sport];
  const base = ["position", "height", "weight", "personal_bests", "season_stats", "achievements", "club", "training_hours", "personal_strengths"];
  const teamSports = new Set([
    "American Football", "Baseball", "Basketball", "Field hockey", "Ice hockey",
    "Soccer", "Volleyball", "Waterpolo", "Wrestling",
  ]);
  if (teamSports.has(sport)) {
    return [...base, "current_league", "highest_league", "team_role"];
  }
  return [...base, "highest_league"];
}

function getAthleticFields(a) {
  const keys = getAthleticKeys(a.sport);
  return keys.map((key) => {
    const label = ATHLETIC_LABELS[key];
    if (key === "personal_bests" || key === "season_stats") {
      return { label, key, structured: true, wide: true };
    }
    if (key === "personal_strengths" || key === "achievements") {
      return { label, key, list: true, wide: true };
    }
    return { label, key };
  });
}

function fieldRows(fields, athlete) {
  return fields
    .map(([label, key]) => {
      const val = athlete[key];
      return `
      <div class="detail-row">
        <dt>${escapeHtml(label)}</dt>
        <dd data-field="contact.${key}">${escapeHtml(formatValue(val))}</dd>
      </div>`;
    })
    .join("");
}

function athleticRows(a) {
  return getAthleticFields(a)
    .map((field) => {
      const val = a[field.key];
      let content;
      if (field.structured) {
        content = dataPointsHtml(val);
      } else if (field.list) {
        content = listHtml(val);
      } else {
        content = escapeHtml(formatValue(val));
      }
      return `
      <div class="detail-row${field.wide ? " detail-row--wide" : ""}">
        <dt>${escapeHtml(field.label)}</dt>
        <dd data-field="contact.${field.key}">${content}</dd>
      </div>`;
    })
    .join("");
}

function performanceChartHtml(a) {
  if (!MEASURABLE_SPORTS.has(a.sport) || !a.performance_seasons?.length) return "";
  const rows = a.performance_seasons
    .map(
      (s) => `
      <tr>
        <td>${escapeHtml(s.season)}</td>
        <td>${escapeHtml(s.metric)}</td>
        <td class="metric-value">${escapeHtml(s.value)}</td>
      </tr>`
    )
    .join("");
  return `
    <div class="performance-chart">
      <h4>Performance Development</h4>
      <table class="season-table">
        <thead>
          <tr><th>Season</th><th>Metric</th><th>Result</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function galleryHtml(a) {
  if (!a.gallery?.length) return "";
  return `
    <div class="profile-gallery">
      <h3>Action Photos</h3>
      <div class="gallery-grid">
        ${a.gallery.map((src) => `<img src="${escapeAttr(src)}" alt="${escapeAttr(displayName(a))} in action" loading="lazy">`).join("")}
      </div>
    </div>`;
}

function profileReelHtml(a) {
  if (!a.highlight_reel) return "";
  return `
    <div>
      <span class="profile-reel-label">Highlight Reel</span>
      <button type="button" class="profile-reel-thumb" data-video="${escapeAttr(a.highlight_reel)}" aria-label="Play highlight reel">
        <img src="${escapeAttr(a.image)}" alt="">
        <span class="card-play-btn">${playIconSvg()}</span>
      </button>
    </div>`;
}

function formatValue(v) {
  if (v === undefined || v === null || v === "") return "—";
  return String(v);
}

function openProfile(a) {
  selectedAthlete = a;
  els.profileContent.innerHTML = `
    <div class="profile-hero">
      <img class="profile-hero-photo" src="${escapeAttr(a.image)}" alt="${escapeAttr(displayName(a))}">
      <div class="profile-hero-main">
        <div class="profile-name-row">
          <h2 id="profile-modal-title">${escapeHtml(displayName(a))}</h2>
        </div>
        <p class="profile-hero-meta">${escapeHtml(a.sport)} · ${escapeHtml(a.position)} · ${escapeHtml(classOf(a))}</p>
        <div class="profile-actions">
          <button type="button" class="btn-primary" id="btn-recruit-open">Contact about ${escapeHtml(a.firstname)}</button>
        </div>
      </div>
      ${profileReelHtml(a)}
    </div>
    ${galleryHtml(a)}
    <div class="profile-body">
      <nav class="profile-tabs" role="tablist">
        <button type="button" class="profile-tab active" data-tab="personal" role="tab">Personal & Academic</button>
        <button type="button" class="profile-tab" data-tab="athletic" role="tab">Athletic</button>
      </nav>
      <section class="profile-panel active" id="panel-personal" role="tabpanel">
        <dl class="detail-grid">${fieldRows(getPersonalFields(a), a)}</dl>
      </section>
      <section class="profile-panel" id="panel-athletic" role="tabpanel">
        <dl class="detail-grid">${athleticRows(a)}</dl>
        ${performanceChartHtml(a)}
      </section>
    </div>
  `;

  els.profileContent.querySelectorAll(".profile-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      els.profileContent.querySelectorAll(".profile-tab").forEach((t) => t.classList.remove("active"));
      els.profileContent.querySelectorAll(".profile-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`panel-${tab.dataset.tab}`).classList.add("active");
    });
  });

  const reelBtn = els.profileContent.querySelector(".profile-reel-thumb");
  if (reelBtn) {
    reelBtn.addEventListener("click", () => openVideo(a.highlight_reel, displayName(a)));
  }

  document.getElementById("btn-recruit-open").addEventListener("click", () => openRecruit(a));
  els.profileModal.showModal();
}

function openRecruit(a) {
  selectedAthlete = a;
  els.recruitTitle.textContent = `Contact about ${a.firstname}`;
  els.recruitLabel.textContent = `${displayName(a)} · ${a.sport} · ${a.position}`;
  els.recruitForm.reset();
  els.recruitModal.showModal();
}

function openVideo(url, title) {
  const id = youtubeId(url);
  if (!id) return;
  els.videoEmbed.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="Highlight reel: ${escapeAttr(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  els.videoModal.showModal();
}

function closeVideo() {
  els.videoEmbed.innerHTML = "";
  els.videoModal.close();
}

function onRecruitSubmit(e) {
  e.preventDefault();
  if (!selectedAthlete) return;

  const university = document.getElementById("coach-university").value.trim();
  const email = document.getElementById("coach-email").value.trim();
  const phone = document.getElementById("coach-phone").value.trim();
  const message = document.getElementById("coach-message").value.trim();
  const a = selectedAthlete;

  const subject = encodeURIComponent(
    `Recruit inquiry: ${a.firstname} ${a.lastname_initial} (${a.sport})`
  );
  const body = encodeURIComponent(
    `Recruitment inquiry from For Coaches page\n\n` +
      `Athlete: ${displayName(a)}\n` +
      `Sport: ${a.sport}\n` +
      `Position: ${a.position}\n` +
      `Expected start: ${a.start_term}\n` +
      `Eligibility: ${a.eligibility}\n\n` +
      `University: ${university}\n` +
      `Coach email: ${email}\n` +
      `Phone/WhatsApp: ${phone || "(not provided)"}\n` +
      `Message: ${message || "(not provided)"}\n\n` +
      `---\n` +
      `Sent via Scholarbook For Coaches directory`
  );

  window.location.href = `mailto:team@scholarbook.net?subject=${subject}&body=${body}`;
  els.recruitModal.close();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", init);
