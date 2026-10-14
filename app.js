/**
 * Scholarbook For Coaches — athlete directory
 *
 * The data model mirrors the WordPress profiles on
 * https://official.scholarbook.net/de/for-coaches/ (tabs Athletics, Multimedia,
 * Personal, Academics; athletic fields differ per sport). See FELDER.md for the
 * full WordPress → app.js field mapping.
 */

const SPORTS = [
  "American Football", "Baseball", "Basketball", "Bowling", "Cross country skiing",
  "Cycling", "Fencing", "Field hockey", "Golf", "Gymnastics", "Diving", "Ice hockey",
  "Rowing", "Shooting", "Ski Alpin", "Soccer", "Swimming", "Tennis",
  "Track and Field, Cross Country", "Volleyball", "Waterpolo", "Wrestling", "Other sports",
];

/* ---------- Field schema (labels exactly as on the WordPress profiles) ---------- */

/** f(label, key, type): type "text" (default), "long" (rich text, full width), "link" */
const f = (label, key, type = "text") => ({ label, key, type });

const COMMON = {
  height: f("Height", "height"),
  weight: f("Weight", "weight"),
  club: f("Club", "club"),
  current_league: f("Current league", "current_league"),
  highest_league: f("Highest league played", "highest_league"),
  main_position: f("Main position", "main_position"),
  secondary_position: f("Secondary position", "secondary_position"),
  disciplines: f("Disciplines", "disciplines"),
  further_disciplines: f("Further disciplines", "further_disciplines"),
  training_units: f("Training units per week", "training_units_per_week"),
  training_hours: f("Training hours per week", "training_hours_per_week"),
  exercised_since: f("Exercised since", "exercised_since"),
  role: f("Role in the team", "role_in_team", "long"),
  strengths: f("Strengths", "strengths", "long"),
  misc: f("Miscellaneous information", "misc_info", "long"),
  personal_bests: f("Personal bests", "personal_bests", "long"),
};

const SUCCESSES = {
  title: "Greatest Successes",
  fields: [
    f("Local Successes", "local", "long"),
    f("National Successes", "national", "long"),
    f("International Successes", "international", "long"),
    f("Miscellaneous Successes", "miscellaneous", "long"),
  ],
};

const ACHIEVEMENTS = {
  title: "Greatest Achievements",
  fields: [
    f("Local Achievements", "local", "long"),
    f("National Achievements", "national", "long"),
    f("International Achievements", "international", "long"),
    f("Miscellaneous Achievements", "miscellaneous", "long"),
  ],
};

const SEASON_BASE = [
  f("League", "league"),
  f("Club", "club"),
  f("Position", "position"),
  f("Secondary Position", "secondary_position"),
];

const GOLF_RESULT_COLUMNS = [
  ["Year", "year"], ["Placement", "placement"], ["Tournament", "tournament"],
  ["CR", "cr"], ["SLOPE", "slope"], ["PAR", "par"],
  ["R1", "r1"], ["R2", "r2"], ["R3", "r3"], ["R4", "r4"],
];

const DEFAULT_SCHEMA = {
  info: [
    COMMON.club, COMMON.training_units, COMMON.training_hours, COMMON.height, COMMON.weight,
    COMMON.disciplines, COMMON.further_disciplines, COMMON.role, COMMON.strengths, COMMON.misc,
  ],
  successes: SUCCESSES,
};

/** Athletic fields per sport, in the order WordPress renders them */
const SPORT_SCHEMAS = {
  Soccer: {
    info: [
      COMMON.main_position, COMMON.secondary_position, COMMON.height, COMMON.weight,
      f("Foot", "foot"), f("Sprint-times", "sprint_times", "long"), COMMON.club,
      COMMON.current_league, COMMON.highest_league, f("Link of current club", "club_link", "link"),
      COMMON.role, COMMON.strengths, COMMON.misc,
    ],
    seasons: {
      title: "Season stats field player",
      fields: [
        ...SEASON_BASE,
        f("Games Played", "games_played"),
        f("Games Started", "games_started"),
        f("Goals", "goals"),
        f("Assists", "assists"),
        // Goalkeeper season fields
        f("Of which won", "won"),
        f("Of which drawn", "drawn"),
        f("Of which lost", "lost"),
        f("Number of goals conceded", "goals_conceded"),
        f("Number of games to nil", "games_to_nil"),
        f("Penalties saved", "penalties_saved"),
        f("Link zum Verein", "club_link", "link"),
      ],
    },
    successes: SUCCESSES,
  },

  "Track and Field, Cross Country": {
    info: [
      COMMON.height, COMMON.weight, COMMON.club, COMMON.disciplines, COMMON.further_disciplines,
      f("Training Sessions per week", "training_units_per_week"), COMMON.training_hours,
      COMMON.role, COMMON.strengths, COMMON.misc,
      f("Athletic Progression", "athletic_progression", "long"), COMMON.personal_bests,
    ],
    successes: ACHIEVEMENTS,
  },

  Swimming: {
    info: [
      COMMON.height, COMMON.weight, COMMON.club, COMMON.disciplines, COMMON.further_disciplines,
      COMMON.training_units, COMMON.training_hours, COMMON.role, COMMON.strengths, COMMON.misc,
      COMMON.personal_bests, f("Performance Development", "performance_development", "long"),
    ],
    successes: SUCCESSES,
  },

  Golf: {
    info: [
      COMMON.club, COMMON.current_league,
      f("Strength on the course", "strength_on_course", "long"),
      f("Weaknesses on the course", "weaknesses_on_course", "long"),
      f("Mentality on the course", "mentality_on_course", "long"),
      f("Development Potential", "development_potential", "long"),
      f("HCP", "hcp"),
      f("Carry distance 7 iron", "carry_7_iron"),
      f("Carry distance driver", "carry_driver"),
      f("Driver swing Speed", "driver_swing_speed"),
      f("Average greens hit", "average_greens_hit"),
      COMMON.role, COMMON.misc,
    ],
    successes: SUCCESSES,
    golfResults: true,
  },

  Basketball: {
    info: [
      COMMON.main_position, COMMON.secondary_position, COMMON.height, COMMON.weight, COMMON.club,
      COMMON.current_league, COMMON.highest_league, COMMON.role, COMMON.strengths, COMMON.misc,
    ],
    seasons: {
      title: "Season stats field player",
      fields: [
        ...SEASON_BASE,
        f("G", "g"), f("MPG", "mpg"), f("PPG", "ppg"), f("FTP", "ftp"), f("3PP", "three_pp"),
        f("RPG", "rpg"), f("APG", "apg"), f("STL", "stl"), f("TO", "to"),
        f("Internetlink", "link", "link"),
      ],
    },
    successes: SUCCESSES,
  },

  "Field hockey": {
    info: [
      COMMON.main_position, COMMON.secondary_position, f("Regular player", "regular_player"),
      COMMON.height, COMMON.weight, COMMON.club, COMMON.role, COMMON.strengths, COMMON.misc,
    ],
    seasons: {
      title: "Season stats field player",
      fields: [
        ...SEASON_BASE,
        f("Games Played", "games_played"), f("Games Started", "games_started"),
        f("Goals", "goals"), f("Assists", "assists"),
        f("Link zum Verein", "club_link", "link"),
      ],
    },
    successes: SUCCESSES,
  },

  Volleyball: {
    info: [
      COMMON.height, COMMON.weight, COMMON.exercised_since, COMMON.training_hours,
      f("Position", "position"), f("Dominant hand", "dominant_hand"),
      f("Standing reach", "standing_reach"), f("Block jump touch", "block_jump_touch"),
      f("Hitting reach", "hitting_reach"), f("League", "league"), COMMON.highest_league, COMMON.club,
    ],
    successes: SUCCESSES,
  },

  Tennis: {
    info: [
      COMMON.height, COMMON.weight, COMMON.club, COMMON.current_league,
      f("Strength on the course", "strength_on_course", "long"),
      f("Weaknesses on the course", "weaknesses_on_course", "long"),
      f("Mentality on the course", "mentality_on_course", "long"),
      f("Development Potential", "development_potential", "long"),
    ],
    successes: SUCCESSES,
    rankings: true,
    bestMatches: true,
  },

  Rowing: {
    info: [
      COMMON.height, COMMON.weight, COMMON.exercised_since, COMMON.disciplines, COMMON.training_hours,
      f("Personal best 2000m Ergo test", "erg_2000m"), COMMON.role, COMMON.strengths,
      f("Still to improve", "still_to_improve", "long"), COMMON.misc,
    ],
    successes: SUCCESSES,
  },

  Baseball: {
    info: [
      COMMON.club, COMMON.training_units, COMMON.training_hours, COMMON.height, COMMON.weight,
      f("Position", "position"), f("Secondary positions", "secondary_positions"),
      f("Bat/Throw", "bat_throw"), COMMON.highest_league, COMMON.exercised_since,
      COMMON.role, COMMON.misc,
    ],
    successes: SUCCESSES,
  },

  Cycling: DEFAULT_SCHEMA,

  Wrestling: {
    info: [
      COMMON.club, COMMON.training_units, COMMON.training_hours, COMMON.height, COMMON.weight,
      COMMON.role, COMMON.misc,
    ],
    successes: SUCCESSES,
  },
};

function getSchema(sport) {
  return SPORT_SCHEMAS[sport] || DEFAULT_SCHEMA;
}

const PERSONAL_FIELDS = [
  f("Sex", "sex"),
  f("Date of Birth", "date_of_birth"),
  f("Nationality", "nationality"),
];

/** Fields marked optional are hidden when empty (as on WordPress) */
const ACADEMIC_FIELDS = [
  f("Graduation", "graduation"),
  f("GPA", "gpa"),
  f("Enrollment", "enrollment"),
  f("Potential Major", "potential_major"),
  { ...f("Duolingo", "duolingo"), optional: true },
  { ...f("TOEFL", "toefl"), optional: true },
  { ...f("SAT: CR", "sat_cr"), optional: true },
  { ...f("SAT: M", "sat_m"), optional: true },
  { ...f("SAT Essay", "sat_essay"), optional: true },
  { ...f("ACT", "act"), optional: true },
];

/* ---------- Demo data (fictional athletes, WordPress structure) ---------- */

const athletes = [
  {
    id: "demo-emma-s",
    sport: "Soccer",
    name: "Emma S.",
    photo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-15",
    committed: null,
    available_in: "Fall 2026",
    eligibility: "D1, D2, NAIA",
    academic_status: "Freshman",
    list: { position: "CM", secondary_position: "AM", division: "U19 Bundesliga" },
    personal: { sex: "Female", date_of_birth: "2008-03-14", nationality: "German" },
    academics: {
      graduation: "2026",
      gpa: "Expected GPA 3.9",
      enrollment: "Not yet enrolled",
      potential_major: "Exercise Science",
      duolingo: "135",
      sat_cr: "710",
      sat_m: "690",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      info: {
        main_position: "Central Midfielder",
        secondary_position: "Offensive Midfielder",
        height: "173 cm / 5.8 feet",
        weight: "66.0 kg / 145 pounds",
        foot: "Right foot",
        sprint_times: "20m: 3.15 sec\n40m: 5.62 sec",
        club: "1. FFC Frankfurt U20",
        current_league: "U20 Bundesliga",
        highest_league: "U20 Bundesliga",
        club_link: "https://www.example.com/club",
        role_in_team: "Captain and playmaker. I organise our build-up play and set the tempo in midfield.",
        strengths: "Tactical awareness, two-footed passing and endurance over 90 minutes.",
        misc_info: "Regular member of the state selection team since U15.",
      },
      seasons: [
        { season: "2024/2025", league: "U17 Bundesliga", club: "1. FFC Frankfurt", position: "Central Midfielder", secondary_position: "Offensive Midfielder", games_played: "22", games_started: "20", goals: "9", assists: "14" },
        { season: "2025/2026", league: "U20 Bundesliga", club: "1. FFC Frankfurt U20", position: "Central Midfielder", secondary_position: "Offensive Midfielder", games_played: "24", games_started: "24", goals: "12", assists: "18", club_link: "https://www.example.com/club" },
      ],
      successes: {
        local: "Hessian Cup Winner 2025",
        national: "German U17 Champion 2024",
        international: "UEFA Youth Tournament participation 2025",
      },
    },
    multimedia: {
      videos: [{ title: "Full game vs. Turbine Potsdam U20", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" }],
      photos: [
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-matteo-k",
    sport: "Soccer",
    name: "Matteo K.",
    photo: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-18",
    committed: null,
    available_in: "Spring 2027",
    eligibility: "D2, D3, NAIA, JUCO",
    academic_status: "Freshman",
    list: { position: "GK", secondary_position: "", division: "3rd U19" },
    personal: { sex: "Male", date_of_birth: "2007-11-02", nationality: "German" },
    academics: {
      graduation: "2026",
      gpa: "Expected: 3.0-3.3",
      enrollment: "Not yet enrolled",
      potential_major: "Sports Management",
      duolingo: "November 2026",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      info: {
        main_position: "Goalkeeper",
        height: "193 cm / 6.4 feet",
        weight: "86.0 kg / 190 pounds",
        foot: "Right foot",
        club: "VfB Stuttgart U19",
        current_league: "A-Junioren Regionalliga",
        highest_league: "A-Junioren Regionalliga",
        role_in_team: "Vocal organiser of the back line and one of the leaders in the dressing room.",
        strengths: "Reflexes, 1v1 situations and long distribution.",
      },
      seasons: [
        { season: "2024/2025", league: "B-Junioren Oberliga", club: "VfB Stuttgart U17", position: "Goalkeeper", games_played: "20", won: "12", drawn: "4", lost: "4", goals_conceded: "18", games_to_nil: "8", penalties_saved: "3" },
        { season: "2025/2026", league: "A-Junioren Regionalliga", club: "VfB Stuttgart U19", position: "Goalkeeper", games_played: "24", won: "13", drawn: "3", lost: "8", goals_conceded: "24", games_to_nil: "5", penalties_saved: "2" },
      ],
      successes: {
        local: "Württemberg Cup Winner 2025",
        miscellaneous: "Selected for the regional goalkeeper camp 2025",
      },
    },
    multimedia: {
      videos: [{ title: "GK session", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" }],
      photos: [
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581978711930-045f3f8af12e?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-jonas-t",
    sport: "Soccer",
    name: "Jonas T.",
    photo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-05-02",
    // Committed athletes: list shows only the stamp + schools, profile only the Athletics tab
    committed: ["Morningside University", "Iowa Western Community College"],
    available_in: "Fall 2025",
    eligibility: "D1, D2, NAIA",
    academic_status: "Transfer",
    list: { position: "AM", secondary_position: "CM", division: "NAIA" },
    personal: { sex: "Male", date_of_birth: "2005-04-21", nationality: "German" },
    academics: {},
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      info: {
        main_position: "Offensive Midfielder",
        secondary_position: "Central Midfielder",
        height: "176 cm / 5.8 feet",
        weight: "64.0 kg / 140 pounds",
        foot: "Right",
        school: "Morningside University / NAIA",
      },
      seasons: [
        { season: "2023/2024", league: "4th Amateur", games_played: "20", games_started: "17", goals: "3", assists: "9" },
        { season: "2024/2025", league: "Morningside University / NAIA", games_played: "5", goals: "1" },
      ],
      successes: {},
    },
    multimedia: { videos: [], photos: [] },
  },
  {
    id: "demo-sarah-l",
    sport: "Track and Field, Cross Country",
    name: "Sarah L.",
    photo: "https://images.unsplash.com/photo-1552209841-d2dc5fd68a30?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-20",
    committed: null,
    available_in: "Fall 2027",
    eligibility: "D1, D2, D3, NAIA",
    academic_status: "Transfer",
    list: { summary: [{ label: "Personal Bests", value: "800m: 2:05.42 min | 1500m: 4:18.15 min" }] },
    personal: { sex: "Female", date_of_birth: "2006-02-11", nationality: "German" },
    academics: {
      graduation: "2024",
      gpa: "3.7",
      enrollment: "Enrolled (2 semesters)",
      potential_major: "Psychology",
      duolingo: "140",
      sat_cr: "650",
      sat_m: "620",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      info: {
        height: "168 cm / 5.6 feet",
        weight: "58.0 kg / 128 pounds",
        club: "LG Olympia Dortmund",
        disciplines: "800m",
        further_disciplines: "1500m, Cross Country",
        training_units_per_week: "8",
        training_hours_per_week: "14",
        role_in_team: "I lead our warm-ups and help the younger middle-distance group with pacing.",
        strengths: "Tactical racing and a strong finishing kick.",
        athletic_progression: "<strong>2024</strong><ul><li>800m: 2:08.60 min</li></ul><strong>2025</strong><ul><li>800m: 2:05.42 min</li><li>1500m: 4:18.15 min</li></ul>",
        personal_bests: "<strong>800m: 2:05.42 min</strong><br><strong>1500m: 4:18.15 min</strong>",
      },
      successes: {
        local: "Westphalian Champion 800m 2025",
        national: "German U20 Championships 2025 – 4th Place 800m",
        international: "European U20 Championships 2025 – Semifinal 800m",
      },
    },
    multimedia: {
      videos: [],
      photos: [
        "https://images.unsplash.com/photo-1526676537331-7747bf8278fc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1728060560980-e39712526b7a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1698671823406-035c77ff6fcd?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-jana-k",
    sport: "Track and Field, Cross Country",
    name: "Jana K.",
    photo: "https://images.unsplash.com/photo-1532444458054-01a7dd3e9fca?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-07-01",
    committed: null,
    available_in: "Fall 2027",
    eligibility: "D1, D2, NAIA, JUCO",
    academic_status: "Freshman",
    list: { summary: [{ label: "Personal Bests", value: "100m: 12.07 sec | 200m: 24.81 sec" }] },
    personal: { sex: "Female", date_of_birth: "2008-05-09", nationality: "German" },
    academics: {
      graduation: "Summer 2027",
      gpa: "Expected: 3.3-3.7",
      enrollment: "Not yet enrolled",
      potential_major: "Pre Med",
      sat_cr: "2026-10-03",
      sat_m: "2026-10-03",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      info: {
        height: "170 cm / 5.7 feet",
        weight: "57.0 kg / 126 pounds",
        club: "TV Wattenscheid 01",
        disciplines: "100m",
        further_disciplines: "200m, 4 × 100 m relay",
        training_units_per_week: "6",
        training_hours_per_week: "12",
        role_in_team: "Start runner of our 4 × 100 m relay.",
        strengths: "Explosive start and acceleration.",
        athletic_progression: "<strong>2025</strong><ul><li>100m: 12.31 sec</li></ul><strong>2026</strong><ul><li>100m: 12.07 sec</li><li>200m: 24.81 sec</li></ul>",
        personal_bests: "<strong>100m: 12.07 sec</strong><br><strong>200m: 24.81 sec</strong>",
      },
      successes: {
        local: "North Rhine Champion 100m 2026",
        national: "German Youth Championships 2026 – 6th Place 4 × 100 m relay",
      },
    },
    multimedia: { videos: [], photos: [] },
  },
  {
    id: "demo-chantal-v",
    sport: "Swimming",
    name: "Chantal V.",
    photo: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-10",
    committed: null,
    available_in: "Fall 2028",
    eligibility: "D2, NAIA",
    academic_status: "Freshman",
    list: {
      summary: [
        { label: "Personal Bests", value: "100m freestyle: LCM/SCY: 56.40 | LCM/SCY: 49.60" },
        { label: "", value: "100m butterfly: LCM/SCY: 1:02.15 | LCM/SCY: 54.90" },
      ],
    },
    personal: { sex: "Female", date_of_birth: "2009-01-27", nationality: "Dutch" },
    academics: {
      graduation: "2028",
      gpa: "3.3-3.7",
      enrollment: "Not yet enrolled",
      potential_major: "Biological Sciences",
      duolingo: "2026-09-12",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      info: {
        height: "178 cm / 5.10 feet",
        weight: "67.0 kg / 148 pounds",
        club: "PSV Eindhoven",
        disciplines: "Freestyle",
        further_disciplines: "Butterfly",
        training_units_per_week: "9",
        training_hours_per_week: "20",
        role_in_team: "Anchor of our 4 × 100 free relay.",
        strengths: "Fast starts and strong underwater dolphin kick.",
        personal_bests: "<p><strong>LCM</strong></p><p>100 free 56.40 → <strong>49.60 SCY</strong><br>100 fly 1:02.15 → <strong>54.90 SCY</strong></p>",
        performance_development: "<strong>100 free (LCM)</strong><p>2024: 57.30<br>2025: 56.40</p><strong>100 fly (LCM)</strong><p>2024: 1:03.02<br>2025: 1:02.15</p>",
      },
      successes: {
        local: "Brabant Champion 100 free 2025",
        national: "Dutch Junior Nationals 2025 – Final 100 free",
      },
    },
    multimedia: {
      videos: [],
      photos: [
        "https://images.unsplash.com/photo-1560090995-01632a28895b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-felix-b",
    sport: "Swimming",
    name: "Felix B.",
    photo: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-07-05",
    committed: null,
    available_in: "Fall 2027",
    eligibility: "D1, D2, NAIA",
    academic_status: "Freshman",
    list: {
      summary: [
        { label: "Personal Bests", value: "50m freestyle: LCM/SCY: 24.10 | LCM/SCY: 20.95" },
        { label: "", value: "100m backstroke: LCM/SCY: 59.80 | LCM/SCY: 51.70" },
      ],
    },
    personal: { sex: "Male", date_of_birth: "2007-06-24", nationality: "German" },
    academics: {
      graduation: "2027",
      gpa: "3.0-3.3",
      enrollment: "Not yet enrolled",
      potential_major: "Physics",
      duolingo: "2026-07-20",
      sat_cr: "540",
      sat_m: "600",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      info: {
        height: "186 cm / 6.1 feet",
        weight: "78.0 kg / 172 pounds",
        club: "SG Neukölln Berlin",
        disciplines: "Freestyle",
        further_disciplines: "Backstroke",
        training_units_per_week: "8",
        training_hours_per_week: "16",
        role_in_team: "Quiet but committed; I lead by example in training.",
        strengths: "Goal-oriented, strong turns and finishing speed.",
        personal_bests: "<p><strong>LCM</strong></p><p>50 free 24.10 → <strong>20.95 SCY</strong><br>100 back 59.80 → <strong>51.70 SCY</strong></p>",
        performance_development: "<strong>50 free (LCM)</strong><p>2024: 24.92<br>2025: 24.41<br>2026: 24.10</p>",
      },
      successes: {
        local: "3x Berlin State Champion",
        national: "German Junior Championships 2026 – Final 50 free",
      },
    },
    multimedia: { videos: [], photos: [] },
  },
  {
    id: "demo-moritz-a",
    sport: "Golf",
    name: "Moritz A.",
    photo: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-07-10",
    committed: null,
    available_in: "Fall 2027",
    eligibility: "D1, D2, D3, NAIA",
    academic_status: "Freshman",
    list: { summary: [{ label: "HCP", value: "-1.6" }, { label: "Stroke Average", value: "73.2" }] },
    personal: { sex: "Male", date_of_birth: "2008-02-03", nationality: "German" },
    academics: {
      graduation: "2027",
      gpa: "Expected 3.5",
      enrollment: "Not yet enrolled",
      potential_major: "Economics",
      duolingo: "May 2026",
      sat_cr: "560",
      sat_m: "610",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      info: {
        club: "GC St. Leon-Rot",
        current_league: "1. Bundesliga (1st German League)",
        strength_on_course: "Putting & Driving",
        weaknesses_on_course: "Long irons",
        mentality_on_course: "Calm under pressure; I stick to my game plan.",
        development_potential: "Approach shots from 150–180 yards",
        hcp: "-1.6",
        carry_7_iron: "170 / 186 yards",
        carry_driver: "270 / 295 yards",
        driver_swing_speed: "118",
        average_greens_hit: "12",
        role_in_team: "Regular starter in the Bundesliga team.",
      },
      golf_results: [
        { year: "2025", placement: "13th", tournament: "German Boys Championship", cr: "73", slope: "127", par: "72", r1: "79", r2: "74", r3: "77", r4: "" },
        { year: "2026", placement: "T10", tournament: "Bavarian Championship U18", cr: "72.5", slope: "136", par: "72", r1: "76", r2: "76", r3: "82", r4: "" },
        { year: "2026", placement: "1", tournament: "Kick-off Open", cr: "72.4", slope: "126", par: "72", r1: "70", r2: "", r3: "", r4: "" },
      ],
      successes: {
        local: "2/2 wins Ranking tournaments BWGV Boys",
        national: "German Team Championship 2025 – 1st Place",
        international: "GJGT French Classic 2025 – 3rd Place",
        miscellaneous: "WAGR 1600",
      },
    },
    multimedia: { videos: [], photos: [] },
  },
  {
    id: "demo-niklas-h",
    sport: "Basketball",
    name: "Niklas H.",
    photo: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-28",
    committed: null,
    available_in: "Fall 2026",
    eligibility: "D1, D2, NAIA, JUCO",
    academic_status: "Freshman",
    list: { summary: [{ label: "Position", value: "Point guard, Shooting guard | Height: 6'3''" }, { label: "Highest league played", value: "NBBL" }] },
    personal: { sex: "Male", date_of_birth: "2007-01-19", nationality: "German" },
    academics: {
      graduation: "2025",
      gpa: "3.1",
      enrollment: "Not yet enrolled",
      potential_major: "Communications",
      duolingo: "110",
      act: "22",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
      info: {
        main_position: "Point Guard",
        secondary_position: "Shooting Guard",
        height: "190 cm / 6.3 feet",
        weight: "82.0 kg / 181 pounds",
        club: "ALBA Berlin",
        current_league: "NBBL / 2. Regionalliga",
        highest_league: "NBBL",
        role_in_team: "On-court general and vocal leader.",
        strengths: "Pick-and-roll decisions and defensive footwork.",
      },
      seasons: [
        { season: "2024/2025", league: "NBBL", club: "ALBA Berlin", position: "Point Guard", secondary_position: "Shooting Guard", g: "18", mpg: "24", ppg: "12.1", ftp: "78", three_pp: "36", rpg: "3.2", apg: "5.4", stl: "1.6", to: "2.1", link: "https://www.example.com/stats" },
        { season: "2025/2026", league: "NBBL", club: "ALBA Berlin", position: "Point Guard", secondary_position: "Shooting Guard", g: "20", mpg: "29", ppg: "16.4", ftp: "81", three_pp: "41", rpg: "3.9", apg: "6.2", stl: "1.9", to: "2.4" },
      ],
      successes: {
        local: "Berlin State Champion U18 2025",
        national: "NBBL All-Star 2026",
      },
    },
    multimedia: {
      videos: [],
      photos: [
        "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-lukas-m",
    sport: "Tennis",
    name: "Lukas M.",
    photo: "https://images.unsplash.com/photo-1714840961998-8d6c02ace00b?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-05-30",
    committed: null,
    available_in: "Fall 2026",
    eligibility: "D1, D2",
    academic_status: "Freshman",
    list: { summary: [] },
    personal: { sex: "Male", date_of_birth: "2007-08-30", nationality: "German" },
    academics: {
      graduation: "2025",
      gpa: "3.8",
      enrollment: "Not yet enrolled",
      potential_major: "Business Administration",
      duolingo: "125",
      sat_cr: "660",
      sat_m: "680",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      info: {
        height: "188 cm / 6.2 feet",
        weight: "79.0 kg / 174 pounds",
        club: "TC Rot-Weiß Düsseldorf",
        current_league: "Regionalliga West",
        strength_on_course: "Serve-forehand combination.",
        mentality_on_course: "I stay calm no matter the score.",
      },
      successes: {
        national: "German U18 Singles Runner-Up 2025",
      },
      rankings: [
        { label: "UTR", value: "Singles 12.4" },
        { label: "German Ranking", value: "LK 3.6" },
      ],
      best_matches: "Win vs. ITF Top-300 junior (6:4, 7:5)",
    },
    multimedia: {
      videos: [],
      photos: [
        "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-finn-w",
    sport: "Rowing",
    name: "Finn W.",
    photo: "https://images.unsplash.com/photo-1569406125624-98ee19b01d4a?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-25",
    committed: null,
    available_in: "Fall 2026",
    eligibility: "D1",
    academic_status: "Graduate",
    list: { summary: [{ label: "2k erg test", value: "5:58.2 min" }] },
    personal: { sex: "Male", date_of_birth: "2004-03-08", nationality: "German" },
    academics: {
      graduation: "2022",
      gpa: "3.9",
      enrollment: "Bachelor completed",
      potential_major: "Aerospace Engineering (M.S.)",
      duolingo: "145",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      info: {
        height: "198 cm / 6.6 feet",
        weight: "93.0 kg / 205 pounds",
        exercised_since: "2016",
        disciplines: "8+ ; 4- ; 2-",
        training_hours_per_week: "20",
        erg_2000m: "2026 5:58.2 min",
        role_in_team: "Stroke seat; I set the rhythm for the crew.",
        strengths: "Leverage, endurance and catch mechanics.",
        still_to_improve: "Sculling technique in small boats.",
      },
      successes: {
        national: "German U23 Champion 8+ 2024",
        international: "Henley Royal Regatta 2025 – Semifinal Temple Cup",
      },
    },
    multimedia: {
      videos: [],
      photos: [
        "https://images.unsplash.com/photo-1601670463842-210f77e864e0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1491911923017-19f90d8d7f83?w=400&h=300&fit=crop",
      ],
    },
  },
  {
    id: "demo-lena-b",
    sport: "Field hockey",
    name: "Lena B.",
    photo: "https://images.unsplash.com/photo-1541983663620-7571a820610c?w=600&h=750&fit=crop",
    profile_url: "",
    last_updated: "2026-06-05",
    committed: null,
    available_in: "Fall 2027",
    eligibility: "D1, D2, NAIA",
    academic_status: "Freshman",
    list: { summary: [{ label: "Position", value: "Forward" }, { label: "Highest league played", value: "2. Regionalliga (adult)" }] },
    personal: { sex: "Female", date_of_birth: "2008-04-17", nationality: "German" },
    academics: {
      graduation: "2026",
      gpa: "3.6",
      enrollment: "Not yet enrolled",
      potential_major: "Environmental Studies",
      duolingo: "120",
      sat_cr: "600",
      sat_m: "610",
    },
    athletics: {
      promotion_video: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      info: {
        main_position: "Forward",
        secondary_position: "Midfielder",
        regular_player: "Yes",
        height: "165 cm / 5.5 feet",
        weight: "61.0 kg / 134 pounds",
        club: "Kölner THC Stadion Rot-Weiß",
        role_in_team: "High-pressing attacker and penalty corner specialist.",
        strengths: "Stick skills in tight spaces and clinical finishing.",
      },
      seasons: [
        { season: "2025/2026", league: "1. Bundesliga Jugend", club: "Kölner THC Stadion Rot-Weiß", position: "Forward", secondary_position: "Midfielder", games_played: "16", games_started: "14", goals: "15", assists: "9" },
      ],
      successes: {
        national: "German Youth Indoor Championships 2025 – 3rd Place",
      },
    },
    multimedia: {
      videos: [],
      photos: [
        "https://images.unsplash.com/photo-1734159319354-b9ead78dd441?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1573459635481-85e9012c05c6?w=400&h=300&fit=crop",
      ],
    },
  },
];

/* ---------- State & filters ---------- */

/**
 * Optional local-only profiles (e.g. real WordPress profiles for design comparison),
 * loaded from real-profiles.local.js — git-ignored, never pushed.
 */
if (Array.isArray(window.LOCAL_ATHLETES)) athletes.push(...window.LOCAL_ATHLETES);

/**
 * Optional live data source: URL returning { athletes: [...] } in the FELDER.md format
 * (planned: endpoint of the WordPress plugin).
 * Empty → demo data only. For tests without editing: index.html?api=<webhook URL>
 */
const ATHLETES_API_URL = "";

function apiUrl() {
  try {
    const override = new URLSearchParams(window.location.search).get("api");
    if (override && /^(https:\/\/|http:\/\/localhost[:/])/i.test(override)) return override;
  } catch (e) {
    /* ignore */
  }
  return ATHLETES_API_URL;
}

/** Only athletes with photos are shown (photos mandatory) */
let visibleAthletes = [];

function setAthletes(list) {
  visibleAthletes = list.filter((a) => a.photo);
}

async function loadLiveAthletes(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.athletes) || !data.athletes.length) throw new Error("no athletes in response");
    return data.athletes;
  } finally {
    clearTimeout(timer);
  }
}

function showDataNotice(message) {
  let el = document.getElementById("data-notice");
  if (!el) {
    el = document.createElement("p");
    el.id = "data-notice";
    el.className = "data-notice";
    els.grid.before(el);
  }
  el.textContent = message;
}

const state = {
  sport: "",
  gender: "",
  divisions: [],
  statuses: [],
  /** filters.js groups: group key → selected option labels */
  extra: {},
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

async function init() {
  cacheElements();
  populateSportSelect();
  bindFilters();
  renderExtraFilters();

  const url = apiUrl();
  if (!url) {
    setAthletes(athletes);
    render(getSorted(filtered()));
    return;
  }

  els.grid.innerHTML = `<div class="empty-state"><h3>Loading athletes…</h3></div>`;
  try {
    setAthletes(await loadLiveAthletes(url));
  } catch (e) {
    console.warn("Live athlete data unavailable, showing demo profiles:", e);
    setAthletes(athletes);
    showDataNotice("Live data is currently unavailable – showing demo profiles.");
  }
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
    renderExtraFilters();
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
  state.extra = {};
  state.search = "";
  els.sport.value = "";
  els.search.value = "";
  document.querySelectorAll(".toggle-btn.active, .pill.active").forEach((el) => el.classList.remove("active"));
  renderExtraFilters();
  render(getSorted(visibleAthletes));
}

/** Filter groups from filters.js; sport-specific groups only while that sport is selected */
function extraGroups() {
  return (window.SB_FILTERS?.groups || []).filter((g) => !g.sport || g.sport === state.sport);
}

function renderExtraFilters() {
  const container = document.getElementById("filter-extra");
  if (!container) return;
  const visible = extraGroups();
  // Drop selections of groups that are no longer shown (e.g. Soccer position after switching sport)
  Object.keys(state.extra).forEach((key) => {
    if (!visible.some((g) => g.key === key)) delete state.extra[key];
  });
  // Collapsible to keep the sidebar short (important on phones, where filters sit above the results)
  container.innerHTML = visible
    .map((g) => {
      const selected = state.extra[g.key] || [];
      const open = g.key === "position" || selected.length || openFilterGroups.has(g.key);
      return `
      <details class="filter-group filter-group--collapsible" data-group="${escapeAttr(g.key)}"${open ? " open" : ""}>
        <summary class="filter-label">${escapeHtml(g.label)}<span class="filter-count">${selected.length || ""}</span></summary>
        <div class="pill-group" role="group" aria-label="${escapeAttr(g.label)}">
          ${g.options
            .map((o) => `<button type="button" class="pill${selected.includes(o.label) ? " active" : ""}" data-group="${escapeAttr(g.key)}" data-value="${escapeAttr(o.label)}">${escapeHtml(o.label)}</button>`)
            .join("")}
        </div>
      </details>`;
    })
    .join("");
  container.querySelectorAll("details").forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) openFilterGroups.add(d.dataset.group);
      else openFilterGroups.delete(d.dataset.group);
    });
  });
  container.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const list = (state.extra[pill.dataset.group] = state.extra[pill.dataset.group] || []);
      togglePill(pill, list, () => render(getSorted(filtered())));
      pill.closest("details").querySelector(".filter-count").textContent = list.length || "";
    });
  });
}

/** Filter groups the visitor has expanded (kept when the sport changes) */
const openFilterGroups = new Set();

function matchExtraFilters(a) {
  return extraGroups().every((g) => {
    const selected = state.extra[g.key] || [];
    if (!selected.length) return true;
    return g.options.some((o) => selected.includes(o.label) && o.test(a));
  });
}

/** Eligibility as on WordPress: "D1, D2, D3, NAIA, JUCO, Canada" */
function eligibilityTokens(a) {
  return (a.eligibility || "").split(",").map((s) => s.trim()).filter(Boolean);
}

function matchDivision(a, divisions) {
  if (!divisions.length) return true;
  const tokens = eligibilityTokens(a);
  return divisions.some((d) => tokens.includes(d));
}

function filtered() {
  return visibleAthletes.filter((a) => {
    if (state.sport && a.sport !== state.sport) return false;
    if (state.gender && a.personal?.sex !== state.gender) return false;
    if (!matchDivision(a, state.divisions)) return false;
    if (state.statuses.length && !state.statuses.includes(a.academic_status)) return false;
    if (!matchExtraFilters(a)) return false;
    if (state.search) {
      const info = a.athletics?.info || {};
      const haystack = [
        a.name, info.main_position, info.secondary_position, info.position, info.disciplines,
        info.further_disciplines, info.club, a.personal?.nationality,
      ].join(" ").toLowerCase();
      if (!haystack.includes(state.search)) return false;
    }
    return true;
  });
}

/** GPA on WordPress is free text ("Expected GPA 3.9", "3.0-3.3") — sort by the highest value */
function gpaNumber(a) {
  const n = window.SB_FILTERS ? window.SB_FILTERS.gpaOf(a) : NaN;
  return Number.isNaN(n) ? 0 : n;
}

/** "Spring 2027" < "Fall 2027" */
function startValue(a) {
  const match = String(a.available_in || "").match(/(Spring|Fall)?\s*(\d{4})/i);
  if (!match) return Infinity;
  return Number(match[2]) + (/fall/i.test(match[1] || "") ? 0.5 : 0);
}

function getSorted(list) {
  const sorted = [...list];
  if (state.sort === "gpa") {
    sorted.sort((a, b) => gpaNumber(b) - gpaNumber(a));
  } else if (state.sort === "start") {
    sorted.sort((a, b) => startValue(a) - startValue(b));
  } else {
    // WordPress profiles have no date → stable sort keeps the WordPress order
    sorted.sort((a, b) => (Date.parse(b.last_updated) || 0) - (Date.parse(a.last_updated) || 0));
  }
  return sorted;
}

/* ---------- Helpers ---------- */

function isEmpty(v) {
  return v === undefined || v === null || String(v).trim() === "";
}

/** Age in years from date_of_birth (WordPress shows "23 years" in the list) */
function ageOf(a) {
  const dob = a.personal?.date_of_birth;
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

/** Short athletic line for card + profile header */
function headline(a) {
  const info = a.athletics?.info || {};
  if (a.sport === "Soccer" && a.list?.position) {
    return a.list.secondary_position ? `${a.list.position} (${a.list.secondary_position})` : a.list.position;
  }
  return info.main_position || info.position || info.disciplines || summaryText(a) || info.club || "";
}

function summaryText(a) {
  const first = a.list?.summary?.[0];
  if (!first) return "";
  return first.label ? `${first.label}: ${first.value}` : first.value;
}

function youtubeId(url) {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
  return match ? match[1] : "";
}

function playIconSvg() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`;
}

/**
 * WordPress values are often rich text (strong, br, p, ul/li, links).
 * Plain strings keep their line breaks; HTML is reduced to a safe tag whitelist.
 */
const RICH_TAGS = new Set(["B", "STRONG", "I", "EM", "U", "BR", "P", "UL", "OL", "LI", "A", "SPAN"]);
const DROP_TAGS = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED"]);

function sanitizeNode(node) {
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === Node.COMMENT_NODE) {
      child.remove();
      return;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) return;
    if (DROP_TAGS.has(child.tagName)) {
      child.remove();
      return;
    }
    sanitizeNode(child);
    if (!RICH_TAGS.has(child.tagName)) {
      child.replaceWith(...child.childNodes);
      return;
    }
    const href = child.getAttribute("href");
    [...child.attributes].forEach((attr) => child.removeAttribute(attr.name));
    if (child.tagName === "A") {
      if (href && /^(https?:|mailto:)/i.test(href)) {
        child.setAttribute("href", href);
        child.setAttribute("target", "_blank");
        child.setAttribute("rel", "noopener");
      }
    }
  });
}

function richText(value) {
  if (isEmpty(value)) return "—";
  const s = String(value);
  if (!/<[a-z][\s\S]*>/i.test(s)) return escapeHtml(s).replace(/\n/g, "<br>");
  const tpl = document.createElement("template");
  tpl.innerHTML = s;
  sanitizeNode(tpl.content);
  return tpl.innerHTML;
}

function linkHtml(value) {
  if (isEmpty(value)) return "—";
  const s = String(value).trim();
  if (!/^https?:\/\//i.test(s)) return escapeHtml(s);
  return `<a href="${escapeAttr(s)}" target="_blank" rel="noopener">${escapeHtml(s)}</a>`;
}

function fieldValueHtml(field, value) {
  if (field.type === "long") return richText(value);
  if (field.type === "link") return linkHtml(value);
  return escapeHtml(formatValue(value));
}

function formatValue(v) {
  if (isEmpty(v)) return "—";
  return String(v);
}

/** Renders schema fields that have a value (empty template rows are skipped) */
function detailRows(fields, data) {
  return fields
    .filter((field) => data && !isEmpty(data[field.key]))
    .map((field) => `
      <div class="detail-row${field.type === "long" ? " detail-row--wide" : ""}">
        <dt>${escapeHtml(field.label)}</dt>
        <dd data-field="${escapeAttr(field.key)}">${fieldValueHtml(field, data[field.key])}</dd>
      </div>`)
    .join("");
}

function sectionHtml(title, body) {
  if (!body) return "";
  return `
    <section class="profile-section">
      <h4 class="profile-section-title">${escapeHtml(title)}</h4>
      ${body}
    </section>`;
}

/* ---------- Cards ---------- */

function highlightReelThumbHtml(a) {
  const url = a.athletics?.promotion_video;
  if (!url) return "";
  return `
    <button type="button" class="card-video-thumb" data-video="${escapeAttr(url)}" aria-label="Play promotion video for ${escapeAttr(a.name)}">
      <span class="card-reel-label">Promotion Video</span>
      <span class="card-play-btn">${playIconSvg()}</span>
    </button>`;
}

function committedHtml(a, contextClass) {
  if (!a.committed?.length) return "";
  return `
    <div class="committed ${contextClass || ""}">
      <span class="committed-stamp">Committed</span>
      <span class="committed-text">${a.committed.map(escapeHtml).join(' <span class="committed-plane" aria-hidden="true">✈</span> ')}</span>
    </div>`;
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
    card.setAttribute("aria-label", `View profile: ${a.name}`);

    const age = ageOf(a);
    const metaParts = [a.committed ? "" : a.available_in, age ? `${age} years` : "", a.committed ? "" : a.academic_status].filter(Boolean);

    card.innerHTML = `
      <div class="card-media">
        <img src="${escapeAttr(a.photo)}" alt="${escapeAttr(a.name)}" loading="lazy">
        <span class="card-sport-badge">${escapeHtml(a.sport)}</span>
        ${highlightReelThumbHtml(a)}
      </div>
      <div class="card-body">
        <h3 class="card-name">${escapeHtml(a.name)}</h3>
        <div class="card-meta-line">
          <span class="card-position">${escapeHtml(headline(a))}</span>
          <span class="card-class">${escapeHtml(metaParts.join(" · "))}</span>
        </div>
        ${committedHtml(a, "committed--card")}
      </div>
      <div class="card-footer">
        <div class="card-meta-pills">
          ${eligibilityTokens(a).map((d) => `<span>${escapeHtml(d)}</span>`).join("")}
        </div>
        <span class="btn-card-view">View profile →</span>
      </div>
    `;

    const videoBtn = card.querySelector(".card-video-thumb");
    if (videoBtn) {
      videoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openVideo(a.athletics.promotion_video, a.name);
      });
    }

    card.addEventListener("click", () => openProfile(a));
    els.grid.appendChild(card);
  });
}

/* ---------- Profile tabs ---------- */

function seasonsHtml(a, schema) {
  const seasons = a.athletics?.seasons;
  if (!schema.seasons || !seasons?.length) return "";
  const blocks = seasons
    .map((s) => `
      <div class="season-block">
        <h5 class="season-block-title">Season ${escapeHtml(s.season || "")}</h5>
        <dl class="detail-grid">${detailRows(schema.seasons.fields, s)}</dl>
      </div>`)
    .join("");
  return sectionHtml(schema.seasons.title, blocks);
}

function golfResultsHtml(a, schema) {
  const rows = a.athletics?.golf_results;
  if (!schema.golfResults || !rows?.length) return "";
  const table = `
    <div class="table-scroll">
      <table class="season-table golf-table">
        <thead><tr>${GOLF_RESULT_COLUMNS.map(([label]) => `<th>${escapeHtml(label)}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((r) => `<tr>${GOLF_RESULT_COLUMNS.map(([, key]) => `<td>${escapeHtml(r[key] || "")}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>`;
  return sectionHtml("Golf Results", table);
}

function rankingsHtml(a, schema) {
  const ath = a.athletics || {};
  let out = "";
  if (schema.rankings && ath.rankings?.length) {
    const rows = ath.rankings
      .map((r) => `
        <div class="detail-row">
          <dt>${escapeHtml(r.label)}</dt>
          <dd>${richText(r.value)}</dd>
        </div>`)
      .join("");
    out += sectionHtml("Rankings", `<dl class="detail-grid">${rows}</dl>`);
  }
  if (schema.bestMatches && !isEmpty(ath.best_matches)) {
    out += sectionHtml("Best Matches", `<div class="rich-text">${richText(ath.best_matches)}</div>`);
  }
  return out;
}

function athleticsPanelHtml(a) {
  const schema = getSchema(a.sport);
  const ath = a.athletics || {};
  // Committed profiles on WordPress also carry a "School" row
  const infoFields = ath.info?.school ? [...schema.info, f("School", "school")] : schema.info;
  const info = detailRows(infoFields, ath.info);
  const successes = detailRows(schema.successes.fields, ath.successes);
  return [
    sectionHtml("Athletic information", info && `<dl class="detail-grid">${info}</dl>`),
    seasonsHtml(a, schema),
    sectionHtml(schema.successes.title, successes && `<dl class="detail-grid">${successes}</dl>`),
    golfResultsHtml(a, schema),
    rankingsHtml(a, schema),
  ].join("");
}

function multimediaPanelHtml(a) {
  const mm = a.multimedia || {};
  const videos = [
    ...(a.athletics?.promotion_video ? [{ title: "Promotion video", url: a.athletics.promotion_video }] : []),
    ...(mm.videos || []),
  ];
  const videoList = videos.length
    ? `<ul class="video-list">${videos
        .map((v) => `
          <li>
            <button type="button" class="video-link" data-video="${escapeAttr(v.url)}">
              <span class="video-link-icon">${playIconSvg()}</span>
              <span>${escapeHtml(v.title || v.url)}</span>
            </button>
          </li>`)
        .join("")}</ul>`
    : "";
  const photos = mm.photos?.length
    ? `<div class="gallery-grid">${mm.photos
        .map((src) => `<img src="${escapeAttr(src)}" alt="${escapeAttr(a.name)} in action" loading="lazy">`)
        .join("")}</div>`
    : "";
  const body = sectionHtml("Videos", videoList) + sectionHtml("Photos", photos);
  return body || `<p class="panel-empty">No multimedia available yet.</p>`;
}

function personalPanelHtml(a) {
  return `<dl class="detail-grid">${detailRows(PERSONAL_FIELDS, a.personal)}</dl>`;
}

function academicsPanelHtml(a) {
  const data = a.academics || {};
  const fields = ACADEMIC_FIELDS.filter((fld) => !fld.optional || !isEmpty(data[fld.key]));
  const rows = fields
    .map((fld) => `
      <div class="detail-row">
        <dt>${escapeHtml(fld.label)}</dt>
        <dd data-field="${escapeAttr(fld.key)}">${escapeHtml(formatValue(data[fld.key]))}</dd>
      </div>`)
    .join("");
  const available = `
      <div class="detail-row">
        <dt>Available in</dt>
        <dd data-field="available_in">${escapeHtml(formatValue(a.available_in))}</dd>
      </div>`;
  return `<dl class="detail-grid">${rows}${available}</dl>`;
}

function profileReelHtml(a) {
  const url = a.athletics?.promotion_video;
  if (!url) return "";
  return `
    <div>
      <span class="profile-reel-label">Promotion Video</span>
      <button type="button" class="profile-reel-thumb" data-video="${escapeAttr(url)}" aria-label="Play promotion video">
        <img src="${escapeAttr(a.photo)}" alt="">
        <span class="card-play-btn">${playIconSvg()}</span>
      </button>
    </div>`;
}

function openProfile(a) {
  selectedAthlete = a;
  const committed = Boolean(a.committed?.length);
  // Committed profiles on WordPress only show the Athletics tab and no contact button
  const tabs = committed
    ? [["athletics", "Athletics"]]
    : [["athletics", "Athletics"], ["multimedia", "Multimedia"], ["personal", "Personal"], ["academics", "Academics"]];
  const panels = {
    athletics: athleticsPanelHtml,
    multimedia: multimediaPanelHtml,
    personal: personalPanelHtml,
    academics: academicsPanelHtml,
  };
  const meta = [a.sport, headline(a), committed ? "" : `Available ${a.available_in}`].filter(Boolean).join(" · ");

  els.profileContent.innerHTML = `
    <div class="profile-hero">
      <img class="profile-hero-photo" src="${escapeAttr(a.photo)}" alt="${escapeAttr(a.name)}">
      <div class="profile-hero-main">
        <div class="profile-name-row">
          <h2 id="profile-modal-title">${escapeHtml(a.name)}</h2>
        </div>
        <p class="profile-hero-meta">${escapeHtml(meta)}</p>
        ${committedHtml(a, "committed--hero")}
        ${committed ? "" : `
        <div class="profile-actions">
          <button type="button" class="btn-primary" id="btn-recruit-open">I am interested</button>
        </div>`}
      </div>
      ${profileReelHtml(a)}
    </div>
    <div class="profile-body">
      <nav class="profile-tabs" role="tablist">
        ${tabs.map(([key, label], i) => `<button type="button" class="profile-tab${i === 0 ? " active" : ""}" data-tab="${key}" role="tab">${label}</button>`).join("")}
      </nav>
      ${tabs.map(([key], i) => `
      <section class="profile-panel${i === 0 ? " active" : ""}" id="panel-${key}" role="tabpanel">
        ${panels[key](a)}
      </section>`).join("")}
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

  els.profileContent.querySelectorAll("[data-video]").forEach((btn) => {
    btn.addEventListener("click", () => openVideo(btn.dataset.video, a.name));
  });

  const recruitBtn = document.getElementById("btn-recruit-open");
  if (recruitBtn) recruitBtn.addEventListener("click", () => openRecruit(a));
  els.profileModal.showModal();
}

/* ---------- Contact & video ---------- */

function openRecruit(a) {
  selectedAthlete = a;
  els.recruitTitle.textContent = `I am interested in ${a.name}`;
  els.recruitLabel.textContent = `${a.name} · ${a.sport} · ${headline(a)}`;
  els.recruitForm.reset();
  els.recruitModal.showModal();
}

/**
 * YouTube is only contacted after the visitor's consent (two-click solution).
 * "Always load" is remembered per browser; in WordPress this can be replaced by the Borlabs content blocker.
 */
const YOUTUBE_CONSENT_KEY = "sb-youtube-consent";
const PRIVACY_URL = "https://www.scholarbook.net/en/privacy";

function hasYoutubeConsent() {
  try {
    return localStorage.getItem(YOUTUBE_CONSENT_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function rememberYoutubeConsent() {
  try {
    localStorage.setItem(YOUTUBE_CONSENT_KEY, "1");
  } catch (e) {
    /* storage unavailable: consent applies to this video only */
  }
}

/**
 * YouTube requires the embedding page's origin as referrer (otherwise "Error 153").
 * Opening index.html as a local file (file://) has no origin → videos only play on a real web address.
 */
function embedYoutube(id, title) {
  if (window.location.protocol === "file:") {
    els.videoEmbed.innerHTML = `
      <div class="video-consent">
        <p class="video-consent-title">Video not available offline</p>
        <p>YouTube videos only play when this page is opened from a web address, not as a local file.</p>
        <a class="btn-primary" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">Watch on YouTube</a>
      </div>`;
    return;
  }
  els.videoEmbed.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="Video: ${escapeAttr(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}

function openVideo(url, title) {
  const id = youtubeId(url);
  if (!id) {
    if (url) window.open(url, "_blank", "noopener");
    return;
  }
  if (hasYoutubeConsent()) {
    embedYoutube(id, title);
  } else {
    els.videoEmbed.innerHTML = `
      <div class="video-consent">
        <p class="video-consent-title">YouTube video</p>
        <p>This video is hosted on YouTube. When you load it, data such as your IP address is transferred to YouTube (Google).
          More in our <a href="${PRIVACY_URL}" target="_blank" rel="noopener">privacy policy</a>.</p>
        <button type="button" class="btn-primary" id="video-consent-load">Load video</button>
        <label class="video-consent-always"><input type="checkbox" id="video-consent-always"> Always load YouTube videos</label>
      </div>`;
    document.getElementById("video-consent-load").addEventListener("click", () => {
      if (document.getElementById("video-consent-always").checked) rememberYoutubeConsent();
      embedYoutube(id, title);
    });
  }
  els.videoModal.showModal();
}

function closeVideo() {
  els.videoEmbed.innerHTML = "";
  els.videoModal.close();
}

function onRecruitSubmit(e) {
  e.preventDefault();
  if (!selectedAthlete) return;

  const value = (id) => document.getElementById(id).value.trim() || "(not provided)";
  const a = selectedAthlete;

  const subject = encodeURIComponent(`Recruit inquiry: ${a.name} (${a.sport})`);
  const body = encodeURIComponent(
    `Recruitment inquiry from For Coaches page\n\n` +
      `Athlete: ${a.name}\n` +
      `Sport: ${a.sport}\n` +
      `Position / Discipline: ${headline(a) || "—"}\n` +
      `Available in: ${a.available_in}\n` +
      `Eligibility: ${a.eligibility}\n\n` +
      `Contact type: ${value("contact-type")}\n` +
      `Name: ${value("coach-name")}\n` +
      `University: ${value("coach-university")}\n` +
      `Location: ${value("coach-location")}\n` +
      `Team website: ${value("coach-website")}\n` +
      `Email: ${value("coach-email")}\n` +
      `Cell phone: ${value("coach-phone")}\n` +
      `Estimated scholarship per year: ${value("coach-scholarship")}\n` +
      `Message: ${value("coach-message")}\n\n` +
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
