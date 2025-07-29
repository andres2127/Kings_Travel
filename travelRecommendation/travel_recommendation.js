let lastScrollTop = 0;
const nav = document.querySelector('nav');

// Ocultar nav al hacer scroll hacia abajo
window.addEventListener('scroll', function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    nav.style.top = "-70px";
  } else {
    nav.style.top = "0";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Mostrar mensaje de confirmación en el formulario
const contactForm = document.getElementById('formularioContacto');
if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const message = document.getElementById('confirmationMessage');
    message.textContent = 'Thank you for contacting us! We will get back to you soon.';
    message.style.display = 'block';

    this.reset();
  });
}

// Limpiar el campo de búsqueda y los resultados
document.getElementById('clearButton').addEventListener('click', function () {
  // Limpiar el campo de búsqueda
  document.getElementById('searchInput').value = '';

  // Limpiar los resultados anteriores
  const container = document.getElementById('travelRecommendations');
  if (container) {
    container.innerHTML = '';
  }
});


// Función para mostrar elementos que coincidan con el texto buscado
function matchAndRender(array, searchInput, container) {
  let foundSomething = false;

  array.forEach(item => {
    if (
      searchInput === '' || // Si el usuario no escribió nada, no mostrar nada
      item.name.toLowerCase().includes(searchInput) ||
      item.description.toLowerCase().includes(searchInput)
    ) {
      const div = document.createElement('div');
      div.classList.add('search-result');
      div.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" alt="${item.name}" width="300">
        <p>${item.description}</p>
        <hr>`;
      container.appendChild(div);
      foundSomething = true;
    }
  });

  return foundSomething;
}

document.getElementById('searchForm')?.addEventListener('submit', function (event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
  const container = document.getElementById('travelRecommendations');
  container.innerHTML = ''; // Limpiar resultados anteriores

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let found = false;

      // Buscar en ciudades
      data.countries.forEach(country => {
        found = matchAndRender(country.cities, searchInput, container) || found;
      });

      // Buscar en templos
      if (searchInput === 'temple' || searchInput.includes('temple')) {
        found = matchAndRender(data.temples, '', container) || found; // Mostrar todos los templos
      } else {
        found = matchAndRender(data.temples, searchInput, container) || found;
      }

      // Buscar en playas
      if (searchInput === 'beach' || searchInput.includes('beach')) {
        found = matchAndRender(data.beaches, '', container) || found; // Mostrar todas las playas
      } else {
        found = matchAndRender(data.beaches, searchInput, container) || found;
      }

      if (!found) {
        container.innerHTML = '<p style="color:red;">No results found. Try a different search.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      container.innerHTML = '<p style="color:red;">Error loading data. Please try again later.</p>';
    });
});
