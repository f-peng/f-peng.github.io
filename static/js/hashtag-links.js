document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.blog-content a').forEach(function(a){
    a.classList.add('anews-link');
    if (a.textContent.trim().startsWith('#')) {
      a.classList.add('hashtag-link');
    }
  });
});
