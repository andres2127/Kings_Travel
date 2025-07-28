let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      // Scrolling down
      nav.style.top = "-70px"; // Oculta el nav (ajusta según tu altura)
    } else {
      // Scrolling up
      nav.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault(); // evita recargar la página

    const message = document.getElementById('confirmationMessage');
    message.textContent = 'Thank you for contacting us! We will get back to you soon.';
    message.style.display = 'block';

    this.reset(); // limpia el formulario
});
