  let lastScrollTop = 0;
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scrolling down
      nav.style.top = "-100px"; // Oculta el nav (ajusta según tu altura)
    } else {
      // Scrolling up
      nav.style.top = "0";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // evita valores negativos
  });