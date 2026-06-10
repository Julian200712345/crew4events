// Layout QA checker — runs in headless Chrome, writes findings into #qa-report.
// Read results via: chrome --headless --dump-dom <file> | grep QA-REPORT
(function () {
  function run() {
    var screen = document.querySelector('.screen') || document.querySelector('.desktop') || document.body;
    var rect = screen.getBoundingClientRect();
    var issues = [];

    // Helper: is el inside a horizontally-scrollable container (chips, carousels)?
    function inScrollX(el) {
      var p = el.parentElement;
      while (p && p !== screen) {
        var ov = getComputedStyle(p).overflowX;
        if (ov === 'auto' || ov === 'scroll') return true;
        p = p.parentElement;
      }
      return false;
    }

    // Helper: is el clipped by an ancestor with overflow hidden/clip?
    function isClipped(el) {
      var p = el.parentElement;
      while (p && p !== screen) {
        var ov = getComputedStyle(p).overflow + getComputedStyle(p).overflowX;
        if (ov.indexOf('hidden') !== -1 || ov.indexOf('clip') !== -1) return true;
        p = p.parentElement;
      }
      return false;
    }

    // 1. Horizontal overflow within the screen (skip intentional scroll-x containers + clipped decor)
    var all = screen.querySelectorAll('*');
    all.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (inScrollX(el) || isClipped(el)) return;
      if (r.right > rect.right + 1.5) {
        issues.push('OVERFLOW-X: ' + descr(el) + ' right=' + Math.round(r.right) + ' max=' + Math.round(rect.right));
      }
      if (r.left < rect.left - 1.5) {
        issues.push('OVERFLOW-LEFT: ' + descr(el) + ' left=' + Math.round(r.left));
      }
    });

    // 2. Tap targets too small. Inline text links (feed "Bekijk alles") are exempt;
    //    real buttons / nav / icon-buttons must be >= 36px in the smaller dimension.
    screen.querySelectorAll('button, .chip, .nav-item, .icon-btn, .toggle, .btn-claim').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (r.height < 36 && r.width < 36) {
        issues.push('SMALL-TAP: ' + descr(el) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
      }
    });

    // 3. Content taller than screen (informational, for scroll screens it's fine)
    var sc = screen.scrollHeight, ch = screen.clientHeight;
    var overflowV = sc > ch + 2 ? (sc - ch) : 0;

    // 4. Empty elements that should have content
    screen.querySelectorAll('.ev-name, .h1, .card-title').forEach(function (el) {
      if (!el.textContent.trim()) issues.push('EMPTY: ' + descr(el));
    });

    // 5. Low contrast text check (approx) for body text on light backgrounds
    function lum(c) {
      var m = c.match(/\d+/g); if (!m) return 1;
      var r = m[0]/255, g = m[1]/255, b = m[2]/255;
      [r,g,b] = [r,g,b].map(function(v){ return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); });
      return 0.2126*r + 0.7152*g + 0.0722*b;
    }
    function contrast(fg, bg) {
      var L1 = lum(fg), L2 = lum(bg);
      return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
    }
    function effectiveBg(el) {
      var p = el;
      while (p && p !== document.documentElement) {
        var cs = getComputedStyle(p);
        // If any ancestor paints an image/gradient, we can't reliably judge contrast -> signal unknown
        if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
        var bg = cs.backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          // semi-transparent over unknown -> skip
          var a = bg.match(/rgba?\([^)]*\)/);
          if (bg.indexOf('rgba') !== -1) {
            var parts = bg.match(/[\d.]+/g);
            if (parts && parseFloat(parts[3]) < 0.95) return null;
          }
          return bg;
        }
        p = p.parentElement;
      }
      return 'rgb(255,255,255)';
    }
    screen.querySelectorAll('div, span, a, button, label').forEach(function (el) {
      if (!el.textContent.trim() || el.children.length > 0) return;
      var cs = getComputedStyle(el);
      var size = parseFloat(cs.fontSize);
      var fg = cs.color;
      var bg = effectiveBg(el);
      if (bg === null) return; // unknown background (image/gradient/translucent) -> skip
      var ratio = contrast(fg, bg);
      var bold = parseInt(cs.fontWeight) >= 700;
      var large = size >= 24 || (size >= 18.66 && bold);
      var min = large ? 3.0 : 4.5;
      if (ratio < min - 0.3) { // small tolerance
        issues.push('LOW-CONTRAST: ' + descr(el) + ' ratio=' + ratio.toFixed(2) + ' need=' + min);
      }
    });

    var report = {
      screen: document.title,
      issues: issues,
      issueCount: issues.length,
      verticalOverflowPx: Math.round(overflowV),
      clientH: Math.round(ch),
      scrollH: Math.round(sc)
    };

    var div = document.getElementById('qa-report');
    if (!div) {
      div = document.createElement('div');
      div.id = 'qa-report';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    div.textContent = 'QA-REPORT ' + JSON.stringify(report) + ' QA-END';
  }

  function descr(el) {
    var c = (el.className && typeof el.className === 'string') ? '.' + el.className.trim().split(/\s+/).join('.') : '';
    var t = el.textContent ? ' "' + el.textContent.trim().slice(0, 24) + '"' : '';
    return el.tagName.toLowerCase() + c.slice(0, 50) + t;
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(run, 300);
  } else {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 300); });
  }
})();
