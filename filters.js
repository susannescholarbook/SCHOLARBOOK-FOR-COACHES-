/**
 * Filters as on the live WordPress page (official.scholarbook.net/de/for-coaches/<sport>/).
 * Each option has a `test(athlete)`; `live` is the matching WordPress query string (used to
 * compare results with the live page). Within a group options are OR-combined.
 */
(function () {
  const stripTags = (s) => String(s || "").replace(/<[^>]+>/g, " ");

  /** "Expected GPA 3.9" → [3.9, 3.9]; "approximately 3.6-3.9" → [3.6, 3.9] */
  function gpaRange(a) {
    const nums = (String(a.academics?.gpa || "").match(/\d(?:[.,]\d+)?/g) || [])
      .map((x) => parseFloat(x.replace(",", ".")))
      .filter((n) => n > 0 && n <= 5);
    return nums.length ? [Math.min(...nums), Math.max(...nums)] : null;
  }

  /** Highest GPA value, used for sorting */
  function gpaOf(a) {
    const r = gpaRange(a);
    return r ? r[1] : NaN;
  }

  /** As on the live page: the athlete's GPA range overlaps the filter range (boundaries included) */
  const gpaOverlaps = (lo, hi) => (a) => {
    const r = gpaRange(a);
    return Boolean(r) && r[0] <= hi && r[1] >= lo;
  };

  /** Score fields may hold a planned test date instead of a score ("November 2026", "2026-07-20") */
  function scoreOf(value, min, max) {
    const s = stripTags(value).trim();
    if (!s || /\b(19|20)\d{2}\b/.test(s) || /[a-z]{3,}/i.test(s.replace(/score|points?|pts/gi, ""))) return NaN;
    const m = s.match(/\d+/);
    const n = m ? parseInt(m[0], 10) : NaN;
    return n >= min && n <= max ? n : NaN;
  }

  function satOf(a) {
    const cr = scoreOf(a.academics?.sat_cr, 200, 800);
    const m = scoreOf(a.academics?.sat_m, 200, 800);
    return Number.isNaN(cr) || Number.isNaN(m) ? NaN : cr + m;
  }

  const between = (lo, hi) => (n) => n >= lo && n <= hi;
  const below = (hi) => (n) => n < hi;

  /**
   * "Disciplines" + "Further disciplines" as shown in the profile. The live page uses an internal
   * discipline field that is not public, so results can differ slightly (see FELDER.md).
   * Normalised: "4 × 100 m relay" → "4x100m relay", "5.000 m" → "5000m"
   */
  function tfText(a) {
    const i = a.athletics?.info || {};
    return stripTags([i.disciplines, i.further_disciplines].filter(Boolean).join(" | "))
      .toLowerCase()
      .replace(/×/g, "x")
      .replace(/\b(\d{1,2})[.,](\d{3})(?=\s?(m|km)\b)/g, "$1$2")
      .replace(/\s*(metres?|meters?)\b/g, "m")
      .replace(/(\d)\s+(m|km)\b/g, "$1$2")
      .replace(/\s+/g, " ");
  }

  const distance = (n) => new RegExp(`(?<![\\d.,x]\\s?)${n}m\\b(?!\\s*(h\\b|hurdles?|sc\\b|steeple))`);
  const hurdles = (n) => new RegExp(`(?<![\\d.,])${n}(m\\s?h\\b|hm\\b|mh\\b|m\\s?hurdles?|\\s?hurdles?|h\\b)`);
  const tf = (re) => (a) => re.test(tfText(a));

  const listPos = (code) => (a) => [a.list?.position, a.list?.secondary_position]
    .some((p) => String(p || "").toUpperCase() === code);

  const TF = "Track and Field, Cross Country";

  window.SB_FILTERS = {
    gpaOf,
    groups: [
      {
        key: "position", label: "Athlete Position", sport: "Soccer",
        options: [
          ["Goal Keeper", "GK", "Goal Keeper"], ["Center Back", "CB", "Centre Back"],
          ["Left Back", "LB", "Left Back"], ["Right Back", "RB", "Right Back"],
          ["Central Midfield", "CM", "Central Midfield"], ["Left Midfield", "LM", "Left Midfield"],
          ["Right Midfield", "RM", "Right Midfield"], ["Attacking Midfield", "AM", "Attacking Midfield"],
          ["Forward", "F", "Forward"],
        ].map(([label, code, live]) => ({ label, test: listPos(code), live: `position=${encodeURIComponent(live)}` })),
      },
      {
        key: "gpa", label: "GPA", field: "gpa",
        options: [[4.0, 3.7], [3.7, 3.3], [3.3, 3.0], [3.0, 2.7], [2.7, 2.4], [2.4, 2.0]].map(([hi, lo]) => ({
          label: `${hi.toFixed(1)}-${lo.toFixed(1)}`,
          test: gpaOverlaps(lo, hi),
          live: `gpa=${hi.toFixed(1)}-${lo.toFixed(1)}`,
        })),
      },
      {
        key: "toefl", label: "TOEFL score", field: "toefl",
        options: [
          { label: "120-100", test: (a) => between(100, 120)(scoreOf(a.academics?.toefl, 0, 120)), live: "toefl-score=120-100" },
          { label: "100-80", test: (a) => between(80, 100)(scoreOf(a.academics?.toefl, 0, 120)), live: "toefl-score=100-80" },
          { label: "80-60", test: (a) => between(60, 80)(scoreOf(a.academics?.toefl, 0, 120)), live: "toefl-score=80-60" },
          { label: "lower than 60", test: (a) => below(60)(scoreOf(a.academics?.toefl, 0, 120)), live: "toefl-score=lower-than-60" },
        ],
      },
      {
        // The live page sends the TOEFL parameter for Duolingo (bug) → no `live` comparison
        key: "duolingo", label: "Duolingo score", field: "duolingo",
        options: [
          { label: "140-100", test: (a) => between(100, 160)(scoreOf(a.academics?.duolingo, 10, 160)) },
          { label: "100-80", test: (a) => between(80, 100)(scoreOf(a.academics?.duolingo, 10, 160)) },
          { label: "80-60", test: (a) => between(60, 80)(scoreOf(a.academics?.duolingo, 10, 160)) },
          { label: "lower than 60", test: (a) => below(60)(scoreOf(a.academics?.duolingo, 10, 160)) },
        ],
      },
      {
        key: "sat", label: "SAT score", field: "sat_cr",
        options: [[1600, 1300], [1300, 1000], [1000, 700], [700, 400]].map(([hi, lo]) => ({
          label: `${lo}-${hi}`,
          test: (a) => between(lo, hi)(satOf(a)),
          live: `sat-score=${lo}-${hi}`,
        })),
      },
      {
        key: "start", label: "Start of studies",
        options: [2026, 2027, 2028, 2029].map((year) => ({
          label: String(year),
          test: (a) => String(a.available_in || "").includes(String(year)),
          live: `start-year=${year}`,
        })),
      },
      {
        key: "sprints", label: "Sprints", sport: TF,
        options: ["60", "100", "200", "400"].map((n) => ({ label: `${n}m`, test: tf(distance(n)), live: `sprints=${n}m` })),
      },
      {
        key: "hurdles", label: "Hurdles", sport: TF,
        options: ["60", "100", "110", "400"].map((n) => ({ label: `${n}hm`, test: tf(hurdles(n)), live: `hurdles=${n}hm` })),
      },
      {
        key: "middle", label: "Middle distance", sport: TF,
        options: ["800", "1500"].map((n) => ({ label: `${n}m`, test: tf(distance(n)), live: `middle-distance=${n}m` })),
      },
      {
        key: "long", label: "Long distance", sport: TF,
        options: [
          { label: "3000m", test: tf(distance("3000")), live: "long-distance=3000m" },
          { label: "3000 m steeplechase", test: tf(/steeple|3000m?\s?sc\b/), live: "long-distance=3000m_SC" },
          { label: "5000m", test: tf(distance("5000")), live: "long-distance=5000m" },
          { label: "10000m", test: tf(distance("10000")), live: "long-distance=10000m" },
        ],
      },
      {
        key: "relays", label: "Relays", sport: TF,
        options: [
          { label: "4 × 100 m relay", test: tf(/4\s?x\s?100/), live: "relays=4x100m" },
          { label: "4 × 400 m relay", test: tf(/4\s?x\s?400/), live: "relays=4x400m" },
        ],
      },
      {
        key: "jumps", label: "Jumps", sport: TF,
        options: [
          { label: "Long jump", test: tf(/long\s?jump/), live: "jumps=long_jump" },
          { label: "Triple jump", test: tf(/triple\s?jump/), live: "jumps=triple_jump" },
          { label: "High jump", test: tf(/high\s?jump/), live: "jumps=high_jump" },
          { label: "Pole vault", test: tf(/pole\s?vault/), live: "jumps=pole_vault" },
        ],
      },
      {
        key: "throws", label: "Throws", sport: TF,
        options: [
          { label: "Shot put", test: tf(/shot\s?put/), live: "throws=shot_put" },
          { label: "Discus throw", test: tf(/discus/), live: "throws=discus_throw" },
          { label: "Hammer throw", test: tf(/hammer/), live: "throws=hammer_throw" },
          { label: "Javelin throw", test: tf(/javelin/), live: "throws=javelin_throw" },
        ],
      },
      {
        key: "combined", label: "Combined events", sport: TF,
        options: [
          { label: "Pentathlon", test: tf(/pentathlon/), live: "combine=Pentathlon" },
          { label: "Heptathlon", test: tf(/heptathlon/), live: "combine=Heptathlon" },
          { label: "Decathlon", test: tf(/decathlon/), live: "combine=Decathlon" },
        ],
      },
    ],
  };
})();
