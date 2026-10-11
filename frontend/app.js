/**
 * YouTube Data Quality Pipeline (Premium Edition)
 * Pure Vanilla JavaScript (No frameworks, No external CDNs)
 */

(function () {
  'use strict';

  // =========================================================================
  // Realistic Dataset of 12 YouTube Videos (Matching pipeline/sample_data.json)
  // =========================================================================
  const INITIAL_VIDEOS = [
    {
      video_id: "v_py_clean_01",
      title: "Complete Guide to Clean Code in Python (2026 Edition)",
      description: "Master clean code, PEP 8 standards, and type hints in modern Python.\n\nTimestamps:\n0:00 - Introduction & Setup\n02:30 - Meaningful Variable Names\n07:15 - Function Single Responsibility\n14:40 - Type Hinting & Dataclasses\n22:10 - Testing & Refactoring\n\nGitHub repo: https://github.com/example/python-clean-code\nSubscribe for more practical software engineering tutorials!",
      published_at: "2026-02-10T14:00:00Z",
      category_id: 28,
      tags: ["python", "clean code", "software engineering", "programming", "python tutorial", "refactoring", "best practices"],
      thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 1680,
      view_count: 52400,
      like_count: 3480,
      comment_count: 294,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_vlog_raw_02",
      title: "vlog 14 final_edit_v2.mp4",
      description: "",
      published_at: "2026-03-01T18:22:00Z",
      category_id: 22,
      tags: [],
      thumbnail_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=640&q=80",
      has_custom_thumbnail: false,
      duration_seconds: 492,
      view_count: 320,
      like_count: 14,
      comment_count: 2,
      definition: "hd",
      caption_available: false
    },
    {
      video_id: "v_mech_keyb_03",
      title: "How to Build a Custom Mechanical Keyboard From Scratch",
      description: "Here is how I assembled my custom 65% board.",
      published_at: "2026-02-28T12:00:00Z",
      category_id: 28,
      tags: ["keyboards"],
      thumbnail_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 780,
      view_count: 8900,
      like_count: 610,
      comment_count: 48,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_css_glitch_04",
      title: "10 CSS Tricks You Probably Never Knew Existed",
      description: "Modern CSS features that will replace your JavaScript libraries.\n\n0:00 - Intro\n01:10 - Subgrid\n04:00 - Container Queries\n08:20 - Scroll-driven animations\n\nFull cheat sheet on my website.",
      published_at: "2026-03-12T16:00:00Z",
      category_id: 28,
      tags: ["css", "web development", "frontend", "html css", "responsive web design"],
      thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 640,
      view_count: 42,
      like_count: 8900,
      comment_count: 420,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_desk_setup_05",
      title: "Minimalist Desk Setup Tour for Maximum Focus (2026)",
      description: "An intentional workspace setup optimized for deep work, coding, and writing.\n\nAll gear list:\n- Monitor: Studio Display 27\"\n- Chair: Ergonomic Mesh Chair\n- Lighting: Warm Desk Bar 3000K\n\nTimestamps:\n0:00 - Workspace Philosophy\n02:45 - Cable Management\n06:10 - Audio & Video Gear",
      published_at: "2026-01-20T11:15:00Z",
      category_id: 26,
      tags: ["desk setup", "productivity", "workspace", "minimalism", "office tour", "tech setup"],
      thumbnail_url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=640&q=80",
      has_custom_thumbnail: false,
      duration_seconds: 540,
      view_count: 31200,
      like_count: 1840,
      comment_count: 125,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_clickbait_06",
      title: "DO NOT LEARN TO CODE IN 2026 AI IS TAKING OVER EVERYTHING",
      description: "Subscribe now or miss out.",
      published_at: "2026-03-05T09:00:00Z",
      category_id: 27,
      tags: [],
      thumbnail_url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 410,
      view_count: 14200,
      like_count: 380,
      comment_count: 92,
      definition: "hd",
      caption_available: false
    },
    {
      video_id: "v_rust_full_07",
      title: "Building a High-Performance Web Service with Rust & Axum",
      description: "In this technical deep dive, we build an asynchronous REST API from scratch using Axum, SQLx, and Tokio. We cover connection pooling, JWT authentication middleware, and Docker deployment.",
      published_at: "2026-02-14T19:00:00Z",
      category_id: 28,
      tags: ["rust", "axum", "backend", "web development"],
      thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 4320,
      view_count: 19500,
      like_count: 1410,
      comment_count: 118,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_mic_test_08",
      title: "mic test",
      description: "",
      published_at: "2026-03-08T03:12:00Z",
      category_id: 22,
      tags: [],
      thumbnail_url: "",
      has_custom_thumbnail: false,
      duration_seconds: 14,
      view_count: 6,
      like_count: 0,
      comment_count: 0,
      definition: "sd",
      caption_available: false
    },
    {
      video_id: "v_sqlite_2026_09",
      title: "Why SQLite is Replacing Postgres for Modern Web Apps",
      description: "SQLite with WAL mode and litestream replication is often 10x faster and cheaper than hosted relational databases.\n\nChapters:\n0:00 - The Monolith Revival\n03:10 - Write-Ahead Logging Explained\n08:45 - Benchmark Comparisons\n14:20 - When NOT to use SQLite\n\nCode samples and benchmarking scripts available in the description link.",
      published_at: "2026-02-25T15:30:00Z",
      category_id: 28,
      tags: ["sqlite", "databases", "system design", "backend", "sql", "architecture", "web dev"],
      thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 1120,
      view_count: 48900,
      like_count: 3120,
      comment_count: 340,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_unboxing_10",
      title: "Apple Studio Display Pro (2026): What They Didn't Tell You",
      description: "An objective hands-on look at the new 5K display panel after two weeks of real studio production work.\n\nTimestamps:\n0:00 - Unboxing & Hardware Specs\n04:12 - Color Accuracy & Peak Brightness\n09:30 - Who is this actually for?",
      published_at: "2026-01-15T17:00:00Z",
      category_id: 28,
      tags: ["apple", "studio display", "tech review", "hardware", "monitors"],
      thumbnail_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 720,
      view_count: 85000,
      like_count: 12,
      comment_count: 1,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_linux_6mo_11",
      title: "My Honest Thoughts After 6 Months of Daily Driving Linux",
      description: "Switching away from macOS to Fedora Linux for daily programming and audio editing. Here is what broke, what was surprisingly painless, and whether I will stick with it.\n\nTimestamps:\n0:00 - The Switch\n03:20 - Battery Life & Hardware Drivers\n08:40 - App Compatibility & Gaming\n13:10 - Final Verdict",
      published_at: "2026-02-02T13:00:00Z",
      category_id: 28,
      tags: ["linux", "fedora", "open source", "tech review", "operating systems", "developer setup"],
      thumbnail_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=640&q=80",
      has_custom_thumbnail: true,
      duration_seconds: 980,
      view_count: 67300,
      like_count: 4890,
      comment_count: 512,
      definition: "hd",
      caption_available: true
    },
    {
      video_id: "v_update_quick_12",
      title: "Quick Update",
      description: "thanks for watching",
      published_at: "2026-03-02T21:00:00Z",
      category_id: 22,
      tags: ["update"],
      thumbnail_url: "",
      has_custom_thumbnail: false,
      duration_seconds: 45,
      view_count: 450,
      like_count: 28,
      comment_count: 0,
      definition: "sd",
      caption_available: false
    }
  ];

  let currentVideos = JSON.parse(JSON.stringify(INITIAL_VIDEOS));
  let evaluatedResults = [];
  let currentFilter = 'all';
  let searchQuery = '';

  // Historical audit trend tracking
  const DEFAULT_HISTORY = [
    { date: "Feb 15", score: 33 },
    { date: "Feb 22", score: 38 },
    { date: "Mar 01", score: 42 },
    { date: "Mar 08", score: 50 },
  ];
  let auditHistory = [...DEFAULT_HISTORY];

  // =========================================================================
  // Data Quality Rules Engine (Client mirror of pipeline/quality_rules.py)
  // =========================================================================
  const RAW_FILENAME_REGEXES = [
    /\.mp4$/i,
    /\.mov$/i,
    /\.avi$/i,
    /\.mkv$/i,
    /^img_\d+/i,
    /^dsc_\d+/i,
    /^vlog_\d+.*edit/i,
    /^video_\d+/i,
    /^untitled/i,
    /^final_render/i,
    /^export_\d+/i,
  ];

  function checkTitle(video) {
    const title = (video.title || "").trim();
    if (!title) {
      return {
        status: "FAILED",
        category: "Metadata Completeness",
        rule: "Title Structure",
        message: "Title is missing or completely empty.",
        suggestion: "Add a descriptive title (aim for 40-70 characters for best mobile visibility)."
      };
    }

    for (const rx of RAW_FILENAME_REGEXES) {
      if (rx.test(title)) {
        return {
          status: "FAILED",
          category: "Metadata Completeness",
          rule: "Title Structure",
          message: `Title looks like an unedited raw export file ('${title}').`,
          suggestion: "Replace raw file names with a clear, keyword-friendly title before publishing."
        };
      }
    }

    if (title.length < 15) {
      return {
        status: "WARNING",
        category: "Metadata Completeness",
        rule: "Title Structure",
        message: `Title is very short (${title.length} characters).`,
        suggestion: "Expand title to explain what viewers will gain from this video."
      };
    }

    if (title.length > 100) {
      return {
        status: "WARNING",
        category: "Metadata Completeness",
        rule: "Title Structure",
        message: `Title exceeds 100 characters (${title.length} chars) and may get truncated in feeds.`,
        suggestion: "Shorten to under 70 characters so the core hook stays visible on mobile."
      };
    }

    const letters = title.split('').filter(c => /[a-zA-Z]/.test(c));
    if (letters.length >= 10) {
      const caps = letters.filter(c => c === c.toUpperCase()).length;
      if (caps / letters.length > 0.85) {
        return {
          status: "WARNING",
          category: "Metadata Completeness",
          rule: "Title Structure",
          message: "Title uses mostly capital letters (shouting/clickbait style).",
          suggestion: "Use Title Case or sentence case to maintain professional brand credibility."
        };
      }
    }

    return {
      status: "PASSED",
      category: "Metadata Completeness",
      rule: "Title Structure",
      message: `Title length and structure are optimal (${title.length} chars).`,
      suggestion: ""
    };
  }

  function checkDescription(video) {
    const desc = (video.description || "").trim();
    const duration = video.duration_seconds || 0;

    if (!desc) {
      return {
        status: "FAILED",
        category: "Metadata Completeness",
        rule: "Description & Chapters",
        message: "Video has no description.",
        suggestion: "Write at least 2-3 paragraphs describing the content, links, and key takeaways."
      };
    }

    if (desc.length < 80) {
      return {
        status: "WARNING",
        category: "Metadata Completeness",
        rule: "Description & Chapters",
        message: `Description is very sparse (${desc.length} characters).`,
        suggestion: "YouTube search uses descriptions heavily for discovery. Add context, timestamps, and resource links."
      };
    }

    if (duration >= 300) {
      const timestamps = desc.match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g) || [];
      if (timestamps.length < 2) {
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        return {
          status: "WARNING",
          category: "Metadata Completeness",
          rule: "Description & Chapters",
          message: `Video duration is ${mins}m ${secs}s but description has no video chapters.`,
          suggestion: "Add timestamp chapters (e.g., 0:00 Intro, 2:15 Topic) to boost viewer retention and Google Search key moments."
        };
      }
    }

    return {
      status: "PASSED",
      category: "Metadata Completeness",
      rule: "Description & Chapters",
      message: `Description is thorough (${desc.length} characters).`,
      suggestion: ""
    };
  }

  function checkTags(video) {
    const tags = video.tags;
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return {
        status: "WARNING",
        category: "Metadata Completeness",
        rule: "Tag Coverage",
        message: "Video has zero tags defined.",
        suggestion: "Add 5 to 15 focused tags covering channel brand, core topic, and common misspellings."
      };
    }

    if (tags.length < 3) {
      return {
        status: "WARNING",
        category: "Metadata Completeness",
        rule: "Tag Coverage",
        message: `Only ${tags.length} tag(s) provided. Tag coverage is minimal.`,
        suggestion: "Add a few more targeted topical tags to help YouTube categorize older or niche queries."
      };
    }

    if (tags.length > 40) {
      return {
        status: "WARNING",
        category: "Metadata Completeness",
        rule: "Tag Coverage",
        message: `Video has ${tags.length} tags. Excess tags dilute indexing signals.`,
        suggestion: "Trim to 8-15 high-intent tags directly relevant to the video content."
      };
    }

    return {
      status: "PASSED",
      category: "Metadata Completeness",
      rule: "Tag Coverage",
      message: `Tag count is balanced (${tags.length} tags).`,
      suggestion: ""
    };
  }

  function checkThumbnail(video) {
    const thumbUrl = (video.thumbnail_url || "").trim();
    const hasCustom = Boolean(video.has_custom_thumbnail);

    if (!thumbUrl) {
      return {
        status: "FAILED",
        category: "Thumbnail Presence",
        rule: "Custom Thumbnail",
        message: "Thumbnail URL is missing.",
        suggestion: "Upload an appealing 1280x720 16:9 thumbnail before publishing."
      };
    }

    if (!hasCustom) {
      return {
        status: "WARNING",
        category: "Thumbnail Presence",
        rule: "Custom Thumbnail",
        message: "Video relies on an auto-generated frame capture instead of a custom thumbnail.",
        suggestion: "Custom thumbnails dramatically lift click-through rate (CTR). Upload a dedicated thumbnail design."
      };
    }

    return {
      status: "PASSED",
      category: "Thumbnail Presence",
      rule: "Custom Thumbnail",
      message: "Custom thumbnail is present and configured.",
      suggestion: ""
    };
  }

  function checkEngagementSanity(video) {
    const views = Number(video.view_count) || 0;
    const likes = Number(video.like_count) || 0;
    const comments = Number(video.comment_count) || 0;

    if (views < 0 || likes < 0 || comments < 0) {
      return {
        status: "FAILED",
        category: "Engagement Sanity",
        rule: "Metric Integrity",
        message: `Negative metric detected (views: ${views}, likes: ${likes}, comments: ${comments}).`,
        suggestion: "Check analytics pipeline sync or API ingestion logic."
      };
    }

    if (views > 0 && likes > views) {
      return {
        status: "FAILED",
        category: "Engagement Sanity",
        rule: "Metric Integrity",
        message: `Impossible anomaly: like count (${likes.toLocaleString()}) is higher than view count (${views.toLocaleString()}).`,
        suggestion: "This indicates delayed YouTube view-counter caching, bot activity, or an ingestion sync race."
      };
    }

    if (views > 0 && comments > views) {
      return {
        status: "FAILED",
        category: "Engagement Sanity",
        rule: "Metric Integrity",
        message: `Impossible anomaly: comment count (${comments.toLocaleString()}) exceeds total view count (${views.toLocaleString()}).`,
        suggestion: "Verify data pipeline ingestion source."
      };
    }

    if (views >= 1000) {
      const interactionRate = ((likes + comments) / views) * 100;
      if (interactionRate < 0.1) {
        return {
          status: "WARNING",
          category: "Engagement Sanity",
          rule: "Metric Integrity",
          message: `Engagement rate is unusually low (${interactionRate.toFixed(2)}% with ${views.toLocaleString()} views).`,
          suggestion: "Review viewer retention graph in YouTube Studio and check if comments are disabled."
        };
      }
    }

    return {
      status: "PASSED",
      category: "Engagement Sanity",
      rule: "Metric Integrity",
      message: `Engagement metrics are within expected ranges (${views.toLocaleString()} views, ${likes.toLocaleString()} likes).`,
      suggestion: ""
    };
  }

  function evaluateVideo(video) {
    const checks = [
      checkTitle(video),
      checkDescription(video),
      checkTags(video),
      checkThumbnail(video),
      checkEngagementSanity(video)
    ];

    let hasFailed = false;
    let hasWarning = false;

    for (const c of checks) {
      if (c.status === "FAILED") hasFailed = true;
      if (c.status === "WARNING") hasWarning = true;
    }

    const overallStatus = hasFailed ? "FAILED" : (hasWarning ? "WARNING" : "PASSED");

    return {
      video_id: video.video_id,
      title: video.title,
      description: video.description,
      thumbnail_url: video.thumbnail_url,
      has_custom_thumbnail: video.has_custom_thumbnail,
      duration_seconds: video.duration_seconds,
      view_count: video.view_count,
      like_count: video.like_count,
      comment_count: video.comment_count,
      published_at: video.published_at,
      overall_status: overallStatus,
      checks: checks
    };
  }

  function runAuditPipeline() {
    evaluatedResults = currentVideos.map(v => evaluateVideo(v));
    updateDashboardUI();
  }

  // =========================================================================
  // Live Elegant Particle Motion Canvas
  // (Soft red particles gently drifting, connecting, gathering and orbiting
  //  around a faint, almost invisible play-button shape in the center)
  // =========================================================================
  function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const mouse = { x: -1000, y: -1000, active: false };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    const PARTICLE_COUNT = 76;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.35,
        pulseOffset: Math.random() * Math.PI * 2,
        orbitRadius: 130 + Math.random() * 210,
        orbitSpeed: (0.00028 + Math.random() * 0.00035) * (Math.random() > 0.05 ? 1 : -1)
      });
    }

    let time = 0;

    function renderParticles() {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 1. Render soft, almost invisible play-button shape in the center
      const playSize = 75;
      ctx.save();
      // Gentle radial glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      radialGlow.addColorStop(0, 'rgba(255, 0, 0, 0.022)');
      radialGlow.addColorStop(0.6, 'rgba(255, 0, 0, 0.008)');
      radialGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.fill();

      // Delicate triangle silhouette
      ctx.beginPath();
      ctx.moveTo(centerX - playSize * 0.6, centerY - playSize * 0.7);
      ctx.lineTo(centerX + playSize * 0.75, centerY);
      ctx.lineTo(centerX - playSize * 0.6, centerY + playSize * 0.7);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 0, 0, 0.018)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.04)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 2. Physics & Particle updates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Celestial attraction & orbital drift around the central play button
        const dx = centerX - p.x;
        const dy = centerY - p.y;
        const distToCenter = Math.hypot(dx, dy);

        if (distToCenter > 1) {
          // Radial gentle spring toward target orbital shell
          const radialErr = distToCenter - p.orbitRadius;
          p.vx += (dx / distToCenter) * (radialErr * 0.00007);
          p.vy += (dy / distToCenter) * (radialErr * 0.00007);

          // Tangential orbital velocity
          const tangentX = -dy / distToCenter;
          const tangentY = dx / distToCenter;
          p.vx += tangentX * p.orbitSpeed;
          p.vy += tangentY * p.orbitSpeed;
        }

        // Subtle mouse repulsion when hovering nearby
        if (mouse.active) {
          const mDx = p.x - mouse.x;
          const mDy = p.y - mouse.y;
          const mDist = Math.hypot(mDx, mDy);
          if (mDist < 120 && mDist > 0) {
            const push = (1 - mDist / 120) * 0.06;
            p.vx += (mDx / mDist) * push;
            p.vy += (mDy / mDist) * push;
          }
        }

        // Velocity clamp and smooth damping for calm, continuous movement
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 0.75) {
          p.vx = (p.vx / speed) * 0.75;
          p.vy = (p.vy / speed) * 0.75;
        }
        p.vx *= 0.995;
        p.vy *= 0.995;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport boundaries
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        // Render particle with organic breathing alpha
        const currentAlpha = p.baseAlpha + Math.sin(time * 1.5 + p.pulseOffset) * 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.max(0.12, currentAlpha)})`;
        ctx.fill();

        // 3. Connect close particles with thin, delicate lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const lineAlpha = (1 - (dist / 110)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 0, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderParticles);
    }

    requestAnimationFrame(renderParticles);
  }

  // =========================================================================
  // Dashboard UI Updates & State Management
  // =========================================================================
  function updateDashboardUI() {
    const totalCount = evaluatedResults.length;
    const passedCount = evaluatedResults.filter(r => r.overall_status === "PASSED").length;
    const warningCount = evaluatedResults.filter(r => r.overall_status === "WARNING").length;
    const failedCount = evaluatedResults.filter(r => r.overall_status === "FAILED").length;

    // 1. Metric Cards with smooth count-up
    animateValue(document.getElementById('card-val-total'), totalCount);
    animateValue(document.getElementById('card-val-passed'), passedCount);
    animateValue(document.getElementById('card-val-warnings'), warningCount);
    animateValue(document.getElementById('card-val-failed'), failedCount);

    const passRate = totalCount ? Math.round((passedCount / totalCount) * 100) : 0;
    const passRateEl = document.getElementById('passed-rate-text');
    if (passRateEl) passRateEl.textContent = `${passRate}% pass rate`;

    // 2. Channel Health Score & Grade
    const healthScore = totalCount ? Math.round(((passedCount * 1.0 + warningCount * 0.5) / totalCount) * 100) : 0;
    const scoreValEl = document.getElementById('health-score-val');
    if (scoreValEl) scoreValEl.textContent = `${healthScore}%`;

    const scoreGradeEl = document.getElementById('health-score-grade');
    if (scoreGradeEl) {
      let grade = 'A';
      let gradeColor = 'var(--yt-green)';
      if (healthScore >= 90) { grade = 'Grade A+'; gradeColor = 'var(--yt-green)'; }
      else if (healthScore >= 75) { grade = 'Grade B+'; gradeColor = 'var(--yt-green)'; }
      else if (healthScore >= 60) { grade = 'Grade C'; gradeColor = 'var(--yt-amber)'; }
      else { grade = 'Grade D (Needs Action)'; gradeColor = 'var(--yt-red)'; }
      scoreGradeEl.textContent = grade;
      scoreGradeEl.style.color = gradeColor;
    }

    // Historical Trend Badge & Sparkline Update
    const previousSnapshot = auditHistory[auditHistory.length - 1];
    const previousScore = previousSnapshot ? previousSnapshot.score : 50;
    const delta = healthScore - previousScore;
    const trendBadge = document.getElementById('health-trend-badge');
    if (trendBadge) {
      if (delta > 0) {
        trendBadge.className = 'health-trend-badge positive';
        trendBadge.innerHTML = `<span class="trend-arrow">▲</span> <span id="health-trend-val">+${delta}%</span> <span class="trend-period">vs last audit</span>`;
        trendBadge.title = `Improved from ${previousScore}% to ${healthScore}% (+${delta}%)`;
      } else if (delta < 0) {
        trendBadge.className = 'health-trend-badge negative';
        trendBadge.innerHTML = `<span class="trend-arrow">▼</span> <span id="health-trend-val">${delta}%</span> <span class="trend-period">vs last audit</span>`;
        trendBadge.title = `Decreased from ${previousScore}% to ${healthScore}% (${delta}%)`;
      } else {
        trendBadge.className = 'health-trend-badge neutral';
        trendBadge.innerHTML = `<span class="trend-arrow">―</span> <span id="health-trend-val">0%</span> <span class="trend-period">vs last audit</span>`;
        trendBadge.title = `Stable at ${healthScore}% compared to previous audit`;
      }
    }

    renderHealthSparkline([...auditHistory.map(h => h.score), healthScore]);

    const segPassed = document.getElementById('seg-passed');
    const segWarn = document.getElementById('seg-warn');
    const segFail = document.getElementById('seg-fail');
    if (segPassed && segWarn && segFail && totalCount) {
      segPassed.style.width = `${(passedCount / totalCount) * 100}%`;
      segWarn.style.width = `${(warningCount / totalCount) * 100}%`;
      segFail.style.width = `${(failedCount / totalCount) * 100}%`;
    }

    // 3. Update Batch Fix Warnings Button
    const batchFixBtn = document.getElementById('batch-fix-btn');
    if (batchFixBtn) {
      if (warningCount === 0) {
        batchFixBtn.disabled = true;
        batchFixBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>All Warnings Resolved</span>
        `;
        batchFixBtn.title = "No videos currently flagged with warnings.";
      } else {
        batchFixBtn.disabled = false;
        batchFixBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          <span>Batch Fix Warnings (<span id="batch-fix-count">${warningCount}</span>)</span>
        `;
        batchFixBtn.title = `Automatically apply recommended fixes to ${warningCount} warning video(s).`;
      }
    }

    // 4. Render Component Panels
    renderRecentIssues();
    renderVideoList();
    renderTerminalOutput();
  }

  function renderHealthSparkline(scores) {
    const svg = document.getElementById('health-sparkline');
    if (!svg || !scores || scores.length < 2) return;

    const width = 90;
    const height = 22;
    const padding = 3;
    const minScore = 0;
    const maxScore = 100;

    const stepX = (width - padding * 2) / (scores.length - 1);
    const points = scores.map((val, idx) => {
      const x = padding + idx * stepX;
      const y = height - padding - ((val - minScore) / (maxScore - minScore)) * (height - padding * 2);
      return { x, y, val };
    });

    const pathData = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const lastPoint = points[points.length - 1];
    const isUp = scores[scores.length - 1] >= scores[scores.length - 2];
    const strokeColor = isUp ? 'var(--yt-green)' : 'var(--yt-red)';

    const areaData = `${pathData} L ${lastPoint.x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;

    svg.innerHTML = `
      <defs>
        <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaData}" fill="url(#sparklineGrad)"/>
      <path d="${pathData}" fill="none" stroke="${strokeColor}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${lastPoint.x.toFixed(1)}" cy="${lastPoint.y.toFixed(1)}" r="2.2" fill="${strokeColor}"/>
    `;
  }

  function animateValue(el, target) {
    if (!el) return;
    const current = parseInt(el.textContent, 10) || 0;
    if (current === target) {
      el.textContent = target;
      return;
    }
    const duration = 380;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.round(current + (target - current) * progress);
      el.textContent = val;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  function renderRecentIssues() {
    const issuesContainer = document.getElementById('recent-issues-list');
    const countBadge = document.getElementById('issues-count-badge');
    if (!issuesContainer) return;

    const issues = [];
    for (const v of evaluatedResults) {
      for (const c of v.checks) {
        if (c.status !== "PASSED") {
          issues.push({
            video_id: v.video_id,
            title: v.title,
            rule: c.rule,
            category: c.category,
            status: c.status,
            message: c.message
          });
        }
      }
    }

    if (countBadge) countBadge.textContent = issues.length;
    issuesContainer.innerHTML = '';

    if (issues.length === 0) {
      issuesContainer.innerHTML = `
        <div style="padding: 28px 16px; text-align: center; color: var(--yt-green); font-size: 0.85rem;">
          ✓ All video data meets professional YouTube quality standards.
        </div>
      `;
      return;
    }

    // Sort: Critical failures first
    issues.sort((a, b) => (a.status === 'FAILED' ? -1 : 1));

    issues.forEach(item => {
      const card = document.createElement('div');
      card.className = 'issue-card';
      const isFailed = item.status === 'FAILED';

      card.innerHTML = `
        <div class="issue-severity-bar ${isFailed ? 'failed' : 'warning'}"></div>
        <div class="issue-details">
          <div class="issue-video-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</div>
          <div class="issue-desc">${escapeHtml(item.message)}</div>
          <div class="issue-meta">
            <span>${escapeHtml(item.category)} • ${escapeHtml(item.rule)}</span>
            <span style="color: ${isFailed ? 'var(--yt-red)' : 'var(--yt-amber)'}; font-weight: 600;">
              ${isFailed ? 'CRITICAL' : 'OPTIMIZATION'}
            </span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        focusVideo(item.video_id);
      });

      issuesContainer.appendChild(card);
    });
  }

  function focusVideo(videoId) {
    currentFilter = 'all';
    searchQuery = '';
    const searchInput = document.getElementById('video-search-input');
    if (searchInput) searchInput.value = '';
    updateFilterButtons();
    renderVideoList();

    const targetEl = document.getElementById(`video-item-${videoId}`);
    if (targetEl) {
      targetEl.classList.add('expanded');
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetEl.style.boxShadow = '0 0 0 2px var(--yt-red)';
      setTimeout(() => {
        targetEl.style.boxShadow = 'none';
      }, 1800);
    }
  }

  function renderVideoList() {
    const listContainer = document.getElementById('video-audit-list');
    if (!listContainer) return;

    let filtered = evaluatedResults.filter(item => {
      if (currentFilter === 'passed' && item.overall_status !== 'PASSED') return false;
      if (currentFilter === 'warnings' && item.overall_status !== 'WARNING') return false;
      if (currentFilter === 'failed' && item.overall_status !== 'FAILED') return false;
      if (currentFilter === 'issues' && item.overall_status === 'PASSED') return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesId = item.video_id.toLowerCase().includes(q);
        if (!matchesTitle && !matchesId) return false;
      }
      return true;
    });

    listContainer.innerHTML = '';

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="padding: 44px 20px; text-align: center; color: var(--yt-text-secondary);">
          No videos match the active filter or search query.
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const videoEl = document.createElement('div');
      videoEl.className = 'video-item';
      videoEl.id = `video-item-${item.video_id}`;

      const issueCount = item.checks.filter(c => c.status !== 'PASSED').length;
      const statusPillClass = item.overall_status.toLowerCase();
      const statusLabel = item.overall_status === 'PASSED' ? 'PASS' : (item.overall_status === 'WARNING' ? 'WARN' : 'FAIL');
      const durationStr = formatDuration(item.duration_seconds);

      // Compute engagement interaction badge
      let engagementTag = '';
      if (item.view_count > 0 && item.like_count > item.view_count) {
        engagementTag = `<span class="engagement-tag anomalous">Anomaly: Likes &gt; Views</span>`;
      } else if (item.view_count >= 1000) {
        const rate = (((item.like_count + item.comment_count) / item.view_count) * 100).toFixed(1);
        if (rate < 0.1) {
          engagementTag = `<span class="engagement-tag warning">Suppressed ${rate}%</span>`;
        } else {
          engagementTag = `<span class="engagement-tag healthy">Interaction ${rate}%</span>`;
        }
      }

      videoEl.innerHTML = `
        <div class="video-row-header">
          <div class="video-thumb-container">
            ${item.thumbnail_url ? `
              <img src="${escapeHtml(item.thumbnail_url)}" alt="thumbnail" class="video-thumb-img" onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'video-thumb-placeholder\\'>INVALID IMAGE</div>';" />
            ` : `
              <div class="video-thumb-placeholder">NO THUMBNAIL</div>
            `}
            <span class="video-thumb-badge">${durationStr}</span>
          </div>

          <div class="video-info">
            <div class="video-title-line">
              <span class="video-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</span>
            </div>
            <div class="video-meta-line">
              <span class="meta-metric">👁 ${(item.view_count || 0).toLocaleString()} views</span>
              <span class="meta-metric">👍 ${(item.like_count || 0).toLocaleString()}</span>
              <span class="meta-metric">💬 ${(item.comment_count || 0).toLocaleString()}</span>
              ${engagementTag}
              <span class="meta-metric" style="color: var(--yt-text-muted); font-family: var(--font-mono); font-size: 0.72rem;">${item.video_id}</span>
            </div>
          </div>

          <div class="video-status-cell">
            <span class="status-pill ${statusPillClass}">
              ${statusLabel === 'PASS' ? '✓' : (statusLabel === 'WARN' ? '▲' : '✖')} ${statusLabel}
            </span>
            <span class="issue-count-label">
              ${issueCount === 0 ? 'All 5 checks clean' : `${issueCount} issue${issueCount > 1 ? 's' : ''} detected`}
            </span>
          </div>

          <svg class="expand-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <div class="video-details-panel">
          <div class="details-grid">
            ${item.checks.map(check => `
              <div class="rule-check-row">
                <div class="rule-status-icon ${check.status.toLowerCase()}">
                  ${check.status === 'PASSED' ? '✓' : (check.status === 'WARNING' ? '▲' : '✖')}
                </div>
                <div class="rule-content">
                  <div class="rule-heading">
                    <span>${escapeHtml(check.rule)}</span>
                    <span class="rule-category-tag">${escapeHtml(check.category)}</span>
                  </div>
                  <div class="rule-message">${escapeHtml(check.message)}</div>
                  ${check.suggestion ? `
                    <div class="rule-suggestion">
                      <strong>Creator Action:</strong> ${escapeHtml(check.suggestion)}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}

            <div class="action-bar-row">
              <span style="font-size: 0.76rem; color: var(--yt-text-muted);">
                Published: ${item.published_at ? new Date(item.published_at).toLocaleDateString() : 'Draft'}
              </span>
              ${item.overall_status !== 'PASSED' ? `
                <button class="simulate-fix-btn" data-video-id="${item.video_id}">
                  Simulate Creator Fix
                </button>
              ` : `
                <span style="font-size: 0.76rem; color: var(--yt-green); font-weight: 500;">
                  ✓ Ready for distribution
                </span>
              `}
            </div>
          </div>
        </div>
      `;

      const rowHeader = videoEl.querySelector('.video-row-header');
      rowHeader.addEventListener('click', () => {
        videoEl.classList.toggle('expanded');
      });

      const fixBtn = videoEl.querySelector('.simulate-fix-btn');
      if (fixBtn) {
        fixBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          simulateCreatorFix(item.video_id);
        });
      }

      listContainer.appendChild(videoEl);
    });
  }

  function simulateCreatorFix(videoId) {
    const video = currentVideos.find(v => v.video_id === videoId);
    if (!video) return;

    if (video.title.endsWith('.mp4') || video.title.toLowerCase().includes('vlog 14')) {
      video.title = "Tokyo Street Photography: 24 Hours in Shinjuku";
      video.description = "Documenting day-to-night street photography in Tokyo.\n\nTimestamps:\n0:00 Morning Stroll\n03:15 Lens Setup\n06:40 Night Neon\n\nShot on Sony A7IV with 35mm f/1.4 GM.";
      video.tags = ["photography", "tokyo", "japan", "camera", "street photography", "travel vlog"];
      video.has_custom_thumbnail = true;
    } else if (video.video_id === 'v_css_glitch_04') {
      video.view_count = 145000;
    } else if (video.video_id === 'v_mic_test_08' || video.video_id === 'v_update_quick_12') {
      video.title = video.video_id === 'v_mic_test_08' 
        ? "Shure SM7B vs PodMic: Real Studio Audio Comparison" 
        : "Channel Direction & Complete Summer Production Schedule";
      video.description = "Detailed breakdown of acoustic treatments, preamps, and recording setup.\n\nTimestamps:\n0:00 Intro & Signal Chain\n02:15 Side-by-side shootout\n05:40 Recommendation";
      video.tags = ["audio", "microphone", "creator gear", "youtube studio", "tech review"];
      video.thumbnail_url = "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=640&q=80";
      video.has_custom_thumbnail = true;
    } else {
      video.has_custom_thumbnail = true;
      if (!video.thumbnail_url) {
        video.thumbnail_url = "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=640&q=80";
      }
      if (video.title === video.title.toUpperCase()) {
        video.title = "How Artificial Intelligence is Changing Software Engineering in 2026";
      }
      if (video.description.length < 80) {
        video.description = `${video.description}\n\nIn this video we break down all specs and workflows.\nTimestamps:\n0:00 Intro\n03:10 Breakdown\n08:00 Conclusion`;
      }
      if (!video.tags || video.tags.length < 3) {
        video.tags = ["technology", "tutorial", "software", "development", "guide"];
      }
      if (video.view_count >= 1000 && video.like_count < 100) {
        video.like_count = Math.round(video.view_count * 0.048);
      }
    }

    runAuditPipeline();
    showToast(`✓ Resolved metadata issues for '${video.title}'`);

    setTimeout(() => {
      const updatedEl = document.getElementById(`video-item-${videoId}`);
      if (updatedEl) updatedEl.classList.add('expanded');
    }, 60);
  }

  function renderTerminalOutput() {
    const termEl = document.getElementById('terminal-content');
    if (!termEl) return;

    const total = evaluatedResults.length;
    const passed = evaluatedResults.filter(r => r.overall_status === 'PASSED').length;
    const warnings = evaluatedResults.filter(r => r.overall_status === 'WARNING').length;
    const failed = evaluatedResults.filter(r => r.overall_status === 'FAILED').length;
    const passRate = total ? ((passed / total) * 100).toFixed(1) : "0.0";

    let text = `▶ YouTube Data Quality Pipeline — Creator Health & Metadata Audit\n`;
    text += `────────────────────────────────────────────────────────────────────────────\n`;
    text += `Batch Overview: Audited ${total} videos from channel feed\n\n`;
    text += `  Passed:   ${passed.toString().padStart(2, ' ')} / ${total} (${passRate}%)\n`;
    text += `  Warnings: ${warnings.toString().padStart(2, ' ')} / ${total}\n`;
    text += `  Failed:   ${failed.toString().padStart(2, ' ')} / ${total}\n`;
    text += `────────────────────────────────────────────────────────────────────────────\n\n`;
    text += `DETAILED VIDEO AUDIT BREAKDOWN:\n\n`;

    evaluatedResults.forEach((item, idx) => {
      const numStr = (idx + 1).toString().padStart(2, '0');
      let statusTag = item.overall_status === 'PASSED' ? '[✓ PASS]' : (item.overall_status === 'WARNING' ? '[▲ WARN]' : '[✖ FAIL]');
      let displayTitle = item.title.length > 52 ? item.title.substring(0, 49) + '...' : item.title;

      text += `${numStr}. ${statusTag} ${displayTitle}\n`;
      text += `    ID: ${item.video_id} | Views: ${item.view_count.toLocaleString()} | Likes: ${item.like_count.toLocaleString()}\n`;

      const flagged = item.checks.filter(c => c.status !== 'PASSED');
      if (flagged.length) {
        flagged.forEach(c => {
          const sym = c.status === 'FAILED' ? '✖' : '▲';
          text += `    ${sym} ${c.category} → ${c.rule}: ${c.message}\n`;
          if (c.suggestion) {
            text += `      Action: ${c.suggestion}\n`;
          }
        });
      } else {
        text += `    ✓ All quality rules passed cleanly.\n`;
      }
      text += `\n`;
    });

    text += `────────────────────────────────────────────────────────────────────────────\n`;
    if (failed > 0) {
      text += `Pipeline Status: FAILED — ${failed} video(s) require immediate creator fixes.\n`;
    } else if (warnings > 0) {
      text += `Pipeline Status: OPTIMIZATION NEEDED — ${warnings} video(s) have non-blocking warnings.\n`;
    } else {
      text += `Pipeline Status: PRISTINE — Channel data quality meets highest YouTube standards!\n`;
    }

    termEl.textContent = text;
  }

  function formatDuration(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      if (btn.dataset.filter === currentFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function exportAuditReport() {
    const reportData = {
      timestamp: new Date().toISOString(),
      channel: "TechCraft Studio",
      total_videos: evaluatedResults.length,
      passed: evaluatedResults.filter(r => r.overall_status === 'PASSED').length,
      warnings: evaluatedResults.filter(r => r.overall_status === 'WARNING').length,
      failed: evaluatedResults.filter(r => r.overall_status === 'FAILED').length,
      results: evaluatedResults
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youtube_data_quality_report_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("✓ Exported quality audit report (JSON)");
  }

  // =========================================================================
  // Pipeline Simulation Execution & Event Listeners
  // =========================================================================
  function triggerPipelineRun() {
    const runBtn = document.getElementById('run-pipeline-btn');
    const banner = document.getElementById('pipeline-progress-banner');
    const progressFill = document.getElementById('progress-fill');
    const stepText = document.getElementById('progress-step-text');
    const stepCount = document.getElementById('progress-step-count');

    if (runBtn && runBtn.disabled) return;
    if (runBtn) runBtn.disabled = true;
    if (banner) banner.classList.remove('hidden');

    const steps = [
      { pct: 20, text: "Ingesting YouTube channel catalog (12 videos)...", step: "1/4" },
      { pct: 45, text: "Auditing titles, descriptions, and chapters...", step: "2/4" },
      { pct: 75, text: "Verifying 1280x720 custom thumbnail artwork...", step: "3/4" },
      { pct: 90, text: "Running engagement sanity & anomaly detection...", step: "4/4" },
      { pct: 100, text: "Channel data audit complete!", step: "Done" }
    ];

    let stepIndex = 0;

    function step() {
      if (stepIndex < steps.length) {
        const s = steps[stepIndex];
        if (progressFill) progressFill.style.width = `${s.pct}%`;
        if (stepText) stepText.textContent = s.text;
        if (stepCount) stepCount.textContent = s.step;
        stepIndex++;
        setTimeout(step, 360);
      } else {
        runAuditPipeline();
        showToast("✓ Pipeline check completed successfully");
        setTimeout(() => {
          if (banner) banner.classList.add('hidden');
          if (runBtn) runBtn.disabled = false;
        }, 500);
      }
    }

    step();
  }

  function batchApplyRecommendedFixes() {
    let fixCount = 0;
    const fixedVideoIds = [];

    currentVideos.forEach(video => {
      const evaluation = evaluateVideo(video);
      if (evaluation.overall_status === 'WARNING') {
        fixCount++;
        fixedVideoIds.push(video.video_id);

        // 1. Standardize Title (fix all-caps shouting)
        const letters = video.title.split('').filter(c => /[a-zA-Z]/.test(c));
        if (letters.length >= 10) {
          const caps = letters.filter(c => c === c.toUpperCase()).length;
          if (caps / letters.length > 0.85) {
            video.title = video.title.toLowerCase().replace(/(?:^|\s|-)\S/g, (a) => a.toUpperCase());
          }
        }

        // 2. Expand Description & Chapters
        if (video.description.length < 80) {
          video.description = (video.description ? video.description + "\n\n" : "") +
            "In this video we break down all specifications, real-world benchmarks, and workflows.\n\n" +
            "Chapters:\n0:00 - Introduction & Context\n02:15 - Detailed Walkthrough\n06:30 - Key Takeaways & Recommendations";
        } else if (video.duration_seconds >= 300) {
          const timestamps = video.description.match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g) || [];
          if (timestamps.length < 2) {
            video.description += "\n\nVideo Chapters:\n0:00 - Architecture Overview\n08:45 - Async Runtime Setup\n22:30 - Core Implementation\n45:10 - Production Benchmarking";
          }
        }

        // 3. Tag Coverage
        if (!video.tags || video.tags.length < 3) {
          const recTags = ["tech", "tutorial", "guide", "creator", "deep dive", "software"];
          const existing = new Set(video.tags || []);
          recTags.forEach(t => existing.add(t));
          video.tags = Array.from(existing).slice(0, 6);
        }

        // 4. Custom Thumbnail Artwork
        if (!video.has_custom_thumbnail) {
          video.has_custom_thumbnail = true;
          if (!video.thumbnail_url) {
            video.thumbnail_url = "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=640&q=80";
          }
        }

        // 5. Engagement calibration for suppressed ratios
        if (video.view_count >= 1000) {
          const rate = ((video.like_count + video.comment_count) / video.view_count) * 100;
          if (rate < 0.1) {
            video.like_count = Math.max(video.like_count, Math.round(video.view_count * 0.045));
            video.comment_count = Math.max(video.comment_count, Math.round(video.view_count * 0.004));
          }
        }
      }
    });

    if (fixCount === 0) {
      showToast("No warning videos to batch fix.");
      return;
    }

    runAuditPipeline();
    showToast(`✓ Batch applied recommended fixes to ${fixCount} warning video(s)!`);

    // Flash-highlight the updated videos
    setTimeout(() => {
      fixedVideoIds.forEach(id => {
        const el = document.getElementById(`video-item-${id}`);
        if (el) {
          el.style.backgroundColor = 'rgba(240, 178, 50, 0.14)';
          setTimeout(() => {
            el.style.backgroundColor = '';
          }, 1400);
        }
      });
    }, 60);
  }

  function setupEventHandlers() {
    const runBtn = document.getElementById('run-pipeline-btn');
    if (runBtn) {
      runBtn.addEventListener('click', triggerPipelineRun);
    }

    const batchFixBtn = document.getElementById('batch-fix-btn');
    if (batchFixBtn) {
      batchFixBtn.addEventListener('click', batchApplyRecommendedFixes);
    }

    // Keyboard shortcut: Press 'R' to run checks
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        triggerPipelineRun();
      }
      if (e.key === '/') {
        const searchInput = document.getElementById('video-search-input');
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }
    });

    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentVideos = JSON.parse(JSON.stringify(INITIAL_VIDEOS));
        auditHistory = [...DEFAULT_HISTORY];
        runAuditPipeline();
        showToast("✓ Reset sample dataset and audit history");
      });
    }

    const exportBtn = document.getElementById('export-report-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportAuditReport);
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter || 'all';
        updateFilterButtons();
        renderVideoList();
      });
    });

    const searchInput = document.getElementById('video-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = (e.target.value || '').trim();
        renderVideoList();
      });
    }

    const termHeader = document.getElementById('terminal-header-toggle');
    const termBody = document.getElementById('terminal-body');
    if (termHeader && termBody) {
      termHeader.addEventListener('click', () => {
        const isHidden = termBody.style.display === 'none';
        termBody.style.display = isHidden ? 'block' : 'none';
      });
    }

    const copyTermBtn = document.getElementById('copy-terminal-btn');
    if (copyTermBtn) {
      copyTermBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const termEl = document.getElementById('terminal-content');
        if (termEl) {
          navigator.clipboard.writeText(termEl.textContent).then(() => {
            showToast("✓ Copied terminal report to clipboard");
          });
        }
      });
    }
  }

  // =========================================================================
  // Bootstrap Application
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    setupEventHandlers();
    runAuditPipeline();
  });

})();
