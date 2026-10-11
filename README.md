# YouTube Data Quality Pipeline (Premium Edition)

A high-craft, production-grade data quality and metadata integrity pipeline designed for serious YouTube creators, video operations teams, and media studios. It audits video datasets to catch silent discoverability traps — unedited camera filenames, missing high-resolution custom thumbnails, missing video chapters on long-form content, keyword-sparse tag lists, and engagement metric anomalies.

---

## Why This Tool Matters for Creators

Publishing consistently is demanding. In the crunch to meet upload deadlines, subtle data quality errors slip through into YouTube Studio:
- **Raw filenames**: A video titled `vlog 14 final_edit_v2.mp4` gets published by mistake.
- **Auto-generated thumbnails**: A 40-minute video defaults to a blurry mid-sentence frame capture rather than dedicated 1280x720 artwork, causing Click-Through Rate (CTR) to plummet by 60%+.
- **Missing chapters**: A 72-minute coding tutorial has no timestamps, disqualifying it from Google Search "Key Moments" and tanking viewer retention.
- **Engagement anomalies**: Delayed view caching or botted spikes produce impossible ratios (`likes > views`), distorting internal channel analytics.

This pipeline acts as an automated quality gate, detecting these flaws with concrete creator action steps before or immediately after videos go live.

---

## Visual & Aesthetic Architecture

The dashboard is built to feel like an authentic internal tool engineered for YouTube creators:
- **Strict YouTube Brand Language**:
  - Deep Black Background: `#0f0f0f`
  - Elevated Card Surfaces: `#1a1a1a` and `#242424`
  - Primary Accent: Official YouTube Red `#FF0000`
  - Status Indicators: Studio Green (`#2ba640`) for passed, Studio Amber (`#f0b232`) for warnings.
- **Live Ambient Motion Canvas**:
  - Live red particles slowly drift across the background.
  - Proximity lines smoothly connect nearby particles when within 110px.
  - Particles subtly gather and orbit around a faint, almost invisible play-button triangle in the center of the viewport, creating a continuous, calm celestial motion without distraction.
- **System Typography**: Fast, crisp rendering using native OS system fonts (`system-ui`, `-apple-system`, Roboto, Segoe UI). No external Google Fonts or webfont network requests.

---

## Technical Constraints (Zero Bloat)

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript (ES2022). Zero UI frameworks, zero CDNs, zero third-party dependencies.
- **Pipeline Backend**: 100% Python 3 standard library (`json`, `sys`, `pathlib`, `re`, `datetime`). No `pandas`, no `requests`, no external packages.

---

## Project Structure

```
youtube-data-quality-pipeline/
├── frontend/
│   ├── index.html          # Clean dashboard markup
│   ├── styles.css          # YouTube dark-mode design system & animations
│   └── app.js              # Particle canvas + audit rules engine + simulator
├── pipeline/
│   ├── quality_rules.py    # Modular Python validation rules
│   ├── run_checks.py       # Terminal CLI runner with colored diagnostics
│   └── sample_data.json    # 12 realistic creator video entries
├── assets/
│   └── youtube-play-icon.svg
└── README.md
```

---

## 1. Data Quality Rules (`pipeline/quality_rules.py`)

The pipeline implements modular, transparent checks categorized by domain:

### Metadata Completeness
1. **Title Structure (`check_title`)**:
   - Flags missing or empty titles.
   - Detects unedited camera/NLE filenames (`.mp4`, `.mov`, `img_`, `dsc_`, `vlog_*_edit`, `untitled`, etc.).
   - Enforces length guidelines: warns if `< 15` characters (too vague) or `> 100` characters (truncated on mobile feeds).
   - Detects excessive all-caps clickbait shouting (>85% uppercase letters).
2. **Description & Chapters (`check_description`)**:
   - Flags empty descriptions and warns if `< 80` characters.
   - For long-form videos (`duration >= 300s` / 5 minutes), enforces at least 2 timestamp chapters (`0:00 Intro`, `02:15 Topic`).
3. **Tag Coverage (`check_tags`)**:
   - Checks for missing tags or `< 3` tags.
   - Warns if tag count exceeds 40 (preventing keyword stuffing).

### Thumbnail Validation
4. **Custom Thumbnail Artwork (`check_thumbnail`)**:
   - Verifies thumbnail URL presence.
   - Flags videos relying on auto-generated frame captures (`has_custom_thumbnail == false`).

### Engagement Sanity
5. **Metric Integrity (`check_engagement_sanity`)**:
   - Catches impossible anomalies: `likes > views` or `comments > views` (indicates caching lag or bot traffic).
   - Flags negative metric values.
   - Identifies suppressed interaction rates (`< 0.10%` interaction on videos with `> 1,000` views).

---

## 2. Running the Terminal CLI (`pipeline/run_checks.py`)

You can execute the pipeline directly in your terminal:

```bash
# Standard terminal report with colored status badges
python3 pipeline/run_checks.py

# Automatically batch fix all warning videos and re-audit
python3 pipeline/run_checks.py --fix-warnings

# Raw JSON output for CI/CD or automation scripts
python3 pipeline/run_checks.py --json

# Export audit summary to a custom JSON file
python3 pipeline/run_checks.py --export audit_report.json

# Run against your own exported YouTube channel dataset
python3 pipeline/run_checks.py path/to/channel_videos.json
```

Example terminal output:
```text
▶ YouTube Data Quality Pipeline — Creator Health & Metadata Audit
────────────────────────────────────────────────────────────────────────────
Batch Overview: Audited 12 videos from sample_data.json

  Passed:    3 / 12 (25.0%)
  Warnings:  5 / 12
  Failed:    4 / 12
────────────────────────────────────────────────────────────────────────────

01. [✓ PASS] Complete Guide to Clean Code in Python (2026 Edition)
    ID: v_py_clean_01 | Views: 52,400 | Likes: 3,480
    ✓ All quality rules passed cleanly.

02. [✖ FAIL] vlog 14 final_edit_v2.mp4
    ID: v_vlog_raw_02 | Views: 320 | Likes: 14
    ✖ Metadata Completeness → Title Structure: Title looks like an unedited raw export file ('vlog 14 final_edit_v2.mp4').
      Action: Replace raw file names with a clear, keyword-friendly title before publishing.
...
```

---

## 3. Web Dashboard Features (`frontend/`)

- **Interactive Metric Cards**: Real-time counts for *Videos Checked*, *Passed*, *Warnings*, and *Failed*.
- **Channel Health Score & Historical Trend Indicator**:
  - Visual channel grade (`Grade A+`, `Grade B+`, `Grade C`, `Grade D`) and stacked linear distribution bar.
  - **Historical Change Badge**: Real-time delta indicator (`▲ +8% vs last audit`, `▼ -4%`, or `― 0%`) tracking channel quality improvements or regressions across audit cycles.
  - **Micro Sparkline**: Embedded SVG trendline displaying score trajectory across historical audits.
- **Quality Report**:
  - Filter tabs: `All`, `Issues Only`, `Failed`, `Warnings`, `Passed`.
  - Search input with `/` shortcut.
  - Video cards with 16:9 thumbnail previews, duration chips, view/like counters, and engagement health pills.
  - Accordion drawer with diagnostic findings and concrete Creator Action recommendations.
  - **Simulate Creator Fix** button: Click to fix an individual issue live and watch channel health metrics recompute.
  - **Batch Apply Recommended Fixes**: One-click action in the toolbar to automatically apply standardized metadata corrections (title case standardizing, context summaries with chapters, tag population, and high-res custom thumbnails) to all videos marked with warnings simultaneously.
- **Recent Issues Drawer**: Chronological feed of anomalies with one-click navigation to the affected video.
- **Simulated Execution**: Click **"Run Checks"** or press `R` to simulate an end-to-end audit with step-by-step progress tracking.
- **Export & Terminal Tools**:
  - One-click JSON report export for sharing with editing teams.
  - Built-in terminal CLI viewer with a copy-to-clipboard button.

---

## Realistic Sample Dataset

The included `pipeline/sample_data.json` contains 12 realistic creator scenarios:
1. `Complete Guide to Clean Code`: Model upload passing all checks.
2. `vlog 14 final_edit_v2.mp4`: Raw exported filename with no description or tags.
3. `How to Build a Custom Mechanical Keyboard`: Short description with minimal tags.
4. `10 CSS Tricks You Probably Never Knew Existed`: Metric anomaly (`8,900 likes` on `42 views`).
5. `Minimalist Desk Setup Tour`: Solid metadata, but missing a dedicated custom thumbnail.
6. `DO NOT LEARN TO CODE IN 2026`: All-caps title and minimal description.
7. `Building a High-Performance Web Service with Rust`: 72-minute tutorial missing video chapters.
8. `mic test`: 14-second draft upload with missing thumbnail and description.
9. `Why SQLite is Replacing Postgres`: High-performing clean upload.
10. `Apple Studio Display Pro`: 85,000 views with suppressed engagement (<0.02%).
11. `My Honest Thoughts After 6 Months of Daily Driving Linux`: Clean upload with chapters and tags.
12. `Quick Update`: Vague title, minimal description, missing thumbnail.

---

## License

Apache 2.0. Built with care for YouTube creators and video operations engineers.
