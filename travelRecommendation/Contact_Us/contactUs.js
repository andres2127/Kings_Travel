document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault(); // evita recargar la página

    const message = document.getElementById('confirmationMessage');
    message.textContent = 'Thank you for contacting us! We will get back to you soon.';
    message.style.display = 'block';

    this.reset(); // limpia el formulario
});
