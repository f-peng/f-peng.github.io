document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('hidden');
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
});
