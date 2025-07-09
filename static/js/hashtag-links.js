var path = window.location.pathname;
var addAnews = path.indexOf('/cyber/') === 0 || path === '/privacy/';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a').forEach(function(a){
    if (addAnews) {
      a.classList.add('anews-link');
    }
    if (a.textContent.trim().startsWith('#')) {
      a.classList.add('hashtag-link');
    }
  });
});
