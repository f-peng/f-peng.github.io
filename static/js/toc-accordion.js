// Some posts' TOC is generated separately from the actual headings (by the
// content pipeline, not by Hugo), so the anchors don't always match the real
// heading ids (accents kept/stripped inconsistently, double hyphens from
// emoji/symbols). Rewrite mismatched links to the closest real heading id
// by comparing a normalized ("canonical") form of both sides.
function tocSlugCanon(s) {
  return s
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function tocFixAnchors() {
  var links = document.querySelectorAll('.toc-container a[href^="#"]');
  if (!links.length) return;

  var idByCanon = {};
  document.querySelectorAll('[id]').forEach(function (el) {
    idByCanon[tocSlugCanon(el.id)] = el.id;
  });

  links.forEach(function (a) {
    var targetId = a.getAttribute('href').slice(1);
    if (!targetId || document.getElementById(targetId)) return;
    var real = idByCanon[tocSlugCanon(targetId)];
    if (real) a.setAttribute('href', '#' + real);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  tocFixAnchors();

  document.querySelectorAll('aside.toc-container').forEach(function (el) {
    if (el.dataset.tocEnhanced === '1') return;
    el.dataset.tocEnhanced = '1';

    var titleEl = el.querySelector('.toc-title');
    if (!titleEl) return;

    el.classList.add('toc-collapsed');
    titleEl.setAttribute('role', 'button');
    titleEl.setAttribute('tabindex', '0');
    titleEl.setAttribute('aria-expanded', 'false');

    function toggle() {
      var collapsed = el.classList.toggle('toc-collapsed');
      titleEl.setAttribute('aria-expanded', String(!collapsed));
    }

    titleEl.addEventListener('click', toggle);
    titleEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
