/* ==========================================================================
   作品集 — 渲染与交互
   这个文件负责把 js/site.js 里的数据画成页面。
   一般不需要改这里；要改内容请改 site.js，要改样式请改 style.css。
   ========================================================================== */

(function () {
  "use strict";

  var S = window.SITE || {};
  var page = document.body.dataset.page || "home";

  /* ---------------------------------------------------------- 小工具 */
  function $(s, r) { return (r || document).querySelector(s); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function hash(str) {
    var h = 0; for (var i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
    return h;
  }
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  /* ------------------------------------------------- 占位图（图片留空时） */
  function placeholder(p, w, h) {
    var seed = (p && (p.slug || p.title)) || "x";
    var H = hash(seed) % 360, H2 = (H + 38) % 360;
    var title = (p && p.title) || "作品";
    var no = (p && p.no) || "";
    var kind = (p && (p.category || p.kind)) || "";
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="hsl(' + H + ',38%,26%)"/>' +
      '<stop offset="1" stop-color="hsl(' + H2 + ',52%,9%)"/></linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#g)"/>' +
      '<g stroke="#ffffff" stroke-opacity="0.06" stroke-width="1">' +
      '<line x1="' + (w / 3) + '" y1="0" x2="' + (w / 3) + '" y2="' + h + '"/>' +
      '<line x1="' + (2 * w / 3) + '" y1="0" x2="' + (2 * w / 3) + '" y2="' + h + '"/>' +
      '<line x1="0" y1="' + (h / 3) + '" x2="' + w + '" y2="' + (h / 3) + '"/>' +
      '<line x1="0" y1="' + (2 * h / 3) + '" x2="' + w + '" y2="' + (2 * h / 3) + '"/>' +
      '</g>' +
      '<text x="56" y="' + (h * 0.2) + '" font-family="sans-serif" font-weight="700" font-size="' + (w * 0.13) + '" fill="#ffffff" fill-opacity="0.15">' + esc(no) + '</text>' +
      '<text x="56" y="' + (h - 96) + '" font-family="sans-serif" font-size="' + (w * 0.042) + '" fill="#ffffff" fill-opacity="0.66">' + esc(title) + '</text>' +
      '<text x="56" y="' + (h - 58) + '" font-family="sans-serif" font-size="' + (w * 0.026) + '" fill="#ffffff" fill-opacity="0.36">' + esc(kind) + '</text>' +
      '<text x="56" y="' + (h - 24) + '" font-family="sans-serif" font-size="' + (w * 0.022) + '" fill="#ffffff" fill-opacity="0.28">PLACEHOLDER · drop your image here</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function imgHTML(p, src, opts) {
    opts = opts || {};
    var w = opts.w || 1200, h = opts.h || 900;
    var ph = placeholder(p, w, h);
    var real = src && String(src).trim();
    return '<img src="' + (real ? esc(real) : ph) + '" alt="' + esc(opts.alt || p.title || "") + '"' +
      (real ? ' data-ph-src="' + esc(ph) + '"' : ' data-ph') + ' loading="lazy">';
  }

  function fixBrokenImages(root) {
    (root || document).querySelectorAll("img[data-ph-src]").forEach(function (img) {
      img.addEventListener("error", function () {
        if (img.dataset.fallbackDone) return;
        img.dataset.fallbackDone = "1";
        img.setAttribute("data-ph", "");
        img.src = img.dataset.phSrc;
      });
    });
  }

  /* ------------------------------------------- 视频：mp4 或 YouTube 嵌入 */
  function videoHTML(p) {
    var v = p.video; if (!v) return "";
    if (/youtu\.be|youtube\.com/i.test(v)) {
      var m = v.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
      if (m) {
        return '<div class="cover-video"><iframe src="https://www.youtube.com/embed/' + m[1] +
          '?rel=0" title="' + esc(p.title || "video") +
          '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>';
      }
    }
    if (/vimeo\.com/i.test(v)) {
      var vm = v.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (vm) return '<div class="cover-video"><iframe src="https://player.vimeo.com/video/' + vm[1] +
        '" title="' + esc(p.title || "video") + '" allow="autoplay; fullscreen" allowfullscreen></iframe></div>';
    }
    return '<video src="' + esc(v) + '" poster="' + esc(p.cover || "") + '" autoplay muted loop playsinline></video>';
  }

  /* ---------------------------------------------------------- 数据集合 */
  function collections() {
    return [
      { key: "games", label: "Game Design", items: S.games || [], anchor: "games" },
      { key: "media", label: "Moving Image & Space", items: S.media || [], anchor: "media" },
      { key: "paintings", label: "Painting", items: S.paintings || [], anchor: "paintings" }
    ];
  }
  function findProject(slug) {
    var found = null, col = null;
    collections().forEach(function (c) {
      c.items.forEach(function (p, i) { if (p.slug === slug) { found = p; col = c; found._index = i; } });
    });
    return found ? { project: found, col: col } : null;
  }

  /* ---------------------------------------------------------- 导航 */
  function renderNav() {
    var nav = $("#nav"); if (!nav) return;
    var links = [
      { href: "index.html#games", text: "Games" },
      { href: "index.html#media", text: "Art" },
      { href: "index.html#paintings", text: "Paintings" },
      { href: "bio.html", text: "About" },
      { href: "index.html#contact", text: "Contact" }
    ];
    nav.innerHTML =
      '<a class="nav-logo" href="index.html">' + esc(S.initials || S.name || "") + '</a>' +
      '<nav class="nav-links">' + links.map(function (l) {
        var cur = (page === "bio" && l.href === "bio.html") ? ' aria-current="page"' : "";
        return '<a href="' + l.href + '"' + cur + '>' + l.text + '</a>';
      }).join("") + '</nav>';
  }

  /* ---------------------------------------------------------- 首屏 */
  function renderHero() {
    var hero = $("#hero"); if (!hero) return;
    var chars = Array.from(S.name || "").map(function (c, i) {
      return '<span class="ch" style="--i:' + i + '">' + (c === " " ? "&nbsp;" : esc(c)) + '</span>';
    }).join("");
    var socials = (S.socials || []).map(function (s) {
      return '<a class="btn btn--sm" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
    }).join("");

    hero.innerHTML =
      '<div class="hero-orbs" aria-hidden="true"><i></i><i></i><i></i></div>' +
      '<div class="wrap hero-inner">' +
      '<p class="eyebrow" data-reveal>' + esc(S.role || "") + '</p>' +
      '<h1 class="hero-name" id="hero-name">' + chars + '</h1>' +
      '<div class="hero-sub" data-reveal style="--d:.5s">' +
      '<p>' + esc(S.tagline || "") + (S.taglineSerif ? ' <span class="serif">' + esc(S.taglineSerif) + '</span>' : '') + '</p>' +
      '<div class="hero-actions">' +
      '<a class="btn" href="#games">View work <span aria-hidden="true">&darr;</span></a>' +
      '<a class="btn btn--ghost" href="bio.html">About</a>' +
      (socials ? '<span style="width:100%;height:0"></span>' + socials : '') +
      '</div></div></div>' +
      '<div class="hero-scroll" aria-hidden="true">Scroll</div>';
  }

  /* -------------------------------------------- 01 游戏：横向粘性滚动 */
  function renderShowcase() {
    var sec = $("#games"); if (!sec) return;
    var items = S.games || [];
    sec.innerHTML =
      '<div class="showcase-sticky"><div class="wrap showcase-head">' +
      '<div><p class="eyebrow">01 — Selected work</p>' +
      '<h2 class="section-title">Game <span class="serif">design</span></h2></div>' +
      '<span class="showcase-count" aria-hidden="true">01 / ' + pad(items.length) + '</span>' +
      '</div>' +
      '<div class="showcase-track" id="showcase-track">' +
      items.map(function (p) {
        return '<article class="panel" data-slug="' + esc(p.slug) + '">' +
          '<div class="panel-media">' +
          '<span class="panel-no">' + esc(p.no) + '</span>' +
          imgHTML(p, p.homeCover || p.cover, { w: 1200, h: 900 }) +
          '</div>' +
          '<div class="panel-body">' +
          '<p class="panel-kind">' + esc(p.kind || "") + '</p>' +
          '<h3 class="panel-title">' + esc(p.title || "") + '</h3>' +
          '<p class="panel-tagline">' + esc(p.tagline || "") + '</p>' +
          '<ul class="panel-meta">' +
          [p.engine, p.date, p.context].filter(Boolean).map(function (m) { return '<li>' + esc(m) + '</li>'; }).join("") +
          '</ul>' +
          '<a class="btn" href="project.html?p=' + esc(p.slug) + '">View project <span aria-hidden="true">&rarr;</span></a>' +
          '</div></article>';
      }).join("") +
      '</div><div class="showcase-progress" aria-hidden="true"><i></i></div></div>';
  }

  /* --------------------------------------------------- 作品网格 */
  function renderCollection(secId, colKey, head) {
    var sec = $(secId); if (!sec) return;
    var items = S[colKey] || [];
    var cls = items.length >= 4 ? "grid--6" : "grid--3";
    sec.innerHTML =
      '<div class="wrap"><div class="section-head">' +
      '<div><p class="eyebrow">' + esc(head.eyebrow) + '</p>' +
      '<h2 class="section-title" data-reveal>' + esc(head.titlePrefix) +
      (head.titleSerif ? ' <span class="serif">' + esc(head.titleSerif) + '</span>' : '') + '</h2></div>' +
      '<p class="section-lede" data-reveal style="--d:.15s">' + esc(head.lede) + '</p>' +
      '</div><div class="grid ' + cls + '">' +
      items.map(function (p, i) {
        return '<a class="card" href="project.html?p=' + esc(p.slug) + '" data-reveal style="--d:' + (i * .07) + 's">' +
          '<div class="card-media">' +
          imgHTML(p, p.homeCover || p.cover, { w: 1000, h: 1250 }) +
          (p.category ? '<span class="card-cat">' + esc(p.category) + '</span>' : '') +
          '</div>' +
          '<h3 class="card-title">' + esc(p.title || "") + '<span>' + esc(p.no || "") + '</span></h3>' +
          '<p class="card-kind">' + esc(p.kind || "") + '</p>' +
          (p.tagline ? '<p class="card-tagline">' + esc(p.tagline) + '</p>' : '') +
          '</a>';
      }).join("") + '</div></div>';
  }

  /* ---------------------------------------------------------- 页脚 */
  function renderFooter() {
    var f = $("#contact"); if (!f) return;
    var socials = (S.socials || []).map(function (s) {
      return '<a class="btn btn--sm" href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
    }).join("");
    f.innerHTML =
      '<div class="wrap">' +
      '<p class="eyebrow">Let’s make something</p>' +
      '<a class="footer-mail" href="mailto:' + esc(S.email || "") + '">' + esc(S.email || "") + '</a>' +
      (socials ? '<div class="footer-socials">' + socials + '</div>' : '<div style="height:60px"></div>') +
      '<div class="footer-bottom"><span>&copy; <span data-year></span> ' + esc(S.name || "") + (S.location ? ' · ' + esc(S.location) : '') + '</span>' +
      '<span class="footer-links"><a href="bio.html">About</a>' +
      '<a href="#" onclick="scrollTo({top:0,behavior:\'smooth\'});return false">Back to top &uarr;</a></span>' +
      '</div></div>';
  }

  /* ---------------------------------------------------------- 项目详情页 */
  function renderProjectPage() {
    var mount = $("#project"); if (!mount) return;
    var slug = new URLSearchParams(location.search).get("p");
    var hit = findProject(slug);

    if (!hit) {
      mount.innerHTML = '<div class="wrap page-head"><a class="page-back" href="index.html">&larr; Back home</a>' +
        '<h1 class="page-title" style="margin-top:30px">Project not found</h1>' +
        '<p class="page-sub">The <code>p=' + esc(slug || "") + '</code> in the URL does not match any slug in site.js.</p></div>';
      return;
    }

    var p = hit.project, col = hit.col;
    document.title = (p.title || "作品") + " — " + (S.name || "");

    if (p.palette) {
      var r = document.documentElement.style;
      if (p.palette.bg) r.setProperty("--bg", p.palette.bg);
      if (p.palette.fg) r.setProperty("--fg", p.palette.fg);
      if (p.palette.accent) r.setProperty("--accent", p.palette.accent);
      if (p.palette.accent2) r.setProperty("--accent2", p.palette.accent2);
    }

    var facts = [
      ["Type", p.kind], ["Tools", p.engine], ["Date", p.date],
      ["Context", p.context], ["Role", p.position],
      ["Specs", (p.meta || []).join(" · ")]
    ].filter(function (f) { return f[1]; });

    var isPainting = col.key === "paintings";

    /* 顶部永远是封面图；绘画详情页不再重复展示封面 */
    var coverBlock = isPainting
      ? ""
      : '<div class="cover">' + imgHTML(p, p.cover, { w: 1600, h: 1000 }) + '</div>';

    var links = (p.links || []).map(function (l) {
      return '<a class="btn btn--sm" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' &nearr;</a>';
    }).join("");

    /* 内容图片：每行一张，竖排 */
    var gallery = (p.slides || []).length
      ? '<div class="gallery gallery--1">' +
      (p.slides || []).map(function (s) {
        return '<figure>' + imgHTML(p, s, { w: 1400, h: 1000, alt: (p.title || "") + " — image" }) + '</figure>';
      }).join("") + '</div>' : '';

    var list = col.items;
    var prev = list[p._index - 1] || list[list.length - 1];
    var next = list[p._index + 1] || list[0];

    mount.innerHTML =
      '<div class="wrap">' +
      '<div class="page-head">' +
      '<a class="page-back" href="index.html#' + esc(col.anchor) + '">&larr; Back to ' + esc(col.label) + '</a>' +
      '<p class="eyebrow" style="margin-top:26px">' + esc(p.no || "") + ' — ' + esc(col.label) + '</p>' +
      '<h1 class="page-title">' + esc(p.title || "") + '</h1>' +
      (p.tagline ? '<p class="page-sub">' + esc(p.tagline) + '</p>' : '') +
      '</div>' +
      coverBlock +
      (facts.length ? '<dl class="facts">' + facts.map(function (f) {
        return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>';
      }).join("") + '</dl>' : '') +
      '<div class="prose">' +
      (p.about || []).map(function (t) { return '<p>' + esc(t) + '</p>'; }).join("") +
      (links ? '<p style="margin-top:34px;display:flex;gap:10px;flex-wrap:wrap">' + links + '</p>' : '') +
      '</div>' +
      gallery +
      '<nav class="pager">' +
      '<a href="project.html?p=' + esc(prev.slug) + '"><small>&larr; Previous</small><strong>' + esc(prev.title) + '</strong></a>' +
      '<a class="next" href="project.html?p=' + esc(next.slug) + '"><small>Next &rarr;</small><strong>' + esc(next.title) + '</strong></a>' +
      '</nav>' +
      '<div style="height:clamp(70px,11vh,140px)"></div>' +
      '</div>';
  }

  /* ---------------------------------------------------------- 关于页 */
  function renderBioPage() {
    var mount = $("#bio"); if (!mount) return;
    var b = S.bio || {};

    mount.innerHTML =
      '<div class="wrap"><div class="page-head">' +
      '<a class="page-back" href="index.html">&larr; Back home</a>' +
      '<h1 class="page-title" style="margin-top:26px">' + esc(S.name || "") + '</h1>' +
      '<p class="page-sub">' + esc(S.role || "") + '</p></div>' +
      '<div style="max-width:760px;margin-top:clamp(44px,7vh,80px)">' +
      (b.intro || []).map(function (t) { return '<p style="font-size:18px">' + esc(t) + '</p>'; }).join("") +
      ((b.skills || []).length ? '<ul class="chips">' + b.skills.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ul>' : '') +
      '<p style="margin-top:30px"><a class="btn" href="mailto:' + esc(S.email || "") + '">' + esc(S.email || "") + '</a></p>' +
      '</div>' +
      '<div style="height:clamp(70px,11vh,140px)"></div></div>';
  }

  /* ==========================================================================
     交互效果
     ========================================================================== */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: .05 });
    els.forEach(function (e) { io.observe(e); });
  }

  function initShowcaseScroll() {
    var sec = $("#games"); if (!sec) return;
    var track = $("#showcase-track", sec); if (!track) return;
    var bar = $(".showcase-progress i", sec);
    var counter = $(".showcase-count", sec);
    var panels = function () { return Array.prototype.slice.call(track.children); };
    var maxX = 0, enabled = false, ticking = false;

    function measure() {
      var wide = window.matchMedia("(min-width: 901px)").matches &&
        window.matchMedia("(hover: hover)").matches;
      enabled = wide;
      sec.classList.toggle("is-h", wide);
      track.style.transform = "";
      if (!wide) { sec.style.height = ""; if (bar) bar.style.width = "0%"; return; }

      var cs = getComputedStyle(track);
      var gap = parseFloat(cs.columnGap || cs.gap) || 0;
      var gutter = parseFloat(cs.paddingLeft) || 0;
      var ps = panels();
      var total = ps.reduce(function (a, p) { return a + p.offsetWidth; }, 0) + gap * Math.max(0, ps.length - 1);
      maxX = Math.max(0, total - (window.innerWidth - gutter * 2));
      sec.style.height = (window.innerHeight + maxX) + "px";
      update();
    }

    function update() {
      if (!enabled) return;
      var rect = sec.getBoundingClientRect();
      var scrolled = Math.min(maxX, Math.max(0, -rect.top));
      track.style.transform = "translate3d(" + (-scrolled) + "px,0,0)";
      var pr = maxX ? scrolled / maxX : 0;
      if (bar) bar.style.width = (pr * 100).toFixed(2) + "%";
      if (counter) {
        var ps = panels();
        var idx = Math.min(ps.length - 1, Math.round(pr * (ps.length - 1)));
        counter.textContent = pad(idx + 1) + " / " + pad(ps.length);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    setTimeout(measure, 300);
  }

  function initCursor() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var c = $("#cursor"); if (!c) return;
    document.body.classList.add("has-cursor");
    var x = 0, y = 0;
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY; c.classList.add("on");
      c.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    });
    document.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("mouseenter", function () { c.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { c.classList.remove("is-hover"); });
    });
    document.addEventListener("mouseleave", function () { c.classList.remove("on"); });
  }

  function initHeroParallax() {
    var orbs = $(".hero-orbs"); if (!orbs) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("mousemove", function (e) {
      var cx = (e.clientX / window.innerWidth - .5), cy = (e.clientY / window.innerHeight - .5);
      orbs.style.transform = "translate3d(" + (cx * -34) + "px," + (cy * -26) + "px,0)";
    }, { passive: true });
  }

  function initTransitions() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a"); if (!a) return;
      var href = a.getAttribute("href") || "";
      if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || a.target === "_blank") return;
      if (/^https?:/i.test(href) && location.protocol !== "file:" && href.indexOf(location.host) === -1) return;
      // 同一页面内的锚点：直接平滑滚动，不放帘幕动画
      var hashIdx = href.indexOf("#");
      if (hashIdx > -1) {
        var path = href.slice(0, hashIdx);
        if (!path || path === location.pathname.split("/").pop()) {
          var target = document.querySelector(href.slice(hashIdx));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
          }
        }
      }
      e.preventDefault();
      document.body.classList.add("leaving");
      setTimeout(function () { location.href = href; }, 420);
    });
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ==========================================================================
     启动
     ========================================================================== */
  document.documentElement.classList.add("js");
  renderNav();
  renderFooter();

  if (page === "home") {
    renderHero();
    renderShowcase();
    renderCollection("#media", "media", {
      eyebrow: "02 — Studio", titlePrefix: "Moving image", titleSerif: "& space",
      lede: "Animation, interactive installation and sculpture — moving between image, space and material."
    });
    renderCollection("#paintings", "paintings", {
      eyebrow: "03 — Painting", titlePrefix: "Painting", titleSerif: "",
      lede: "Single works on canvas and paper."
    });
    initShowcaseScroll();
    initHeroParallax();
  } else if (page === "project") {
    renderProjectPage();
  } else if (page === "bio") {
    renderBioPage();
  }

  fixBrokenImages();
  initReveal();
  initCursor();
  initTransitions();
  initYear();

  requestAnimationFrame(function () {
    document.body.classList.add("ready");
    var hn = $("#hero-name"); if (hn) hn.classList.add("ready");
  });
})();
