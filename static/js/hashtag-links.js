document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a').forEach(function(a){
    if(a.textContent.trim().startsWith('#')){
      a.classList.add('hashtag-link');
    }
  });
});
