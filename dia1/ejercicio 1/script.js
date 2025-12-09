// 1. Seleccionamos los elementos del DOM que vamos a manipular
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsGrid = document.getElementById('resultsGrid');

// La URL base de la API
const API_URL = 'https://rickandmortyapi.com/api/character';

// 2. Función asíncrona para pedir los datos
// Usamos 'async' porque pedir datos a internet toma tiempo y no queremos congelar la página
async function fetchCharacters(name = '') {
    try {
        // Construimos la URL. Si hay nombre, filtramos. Si no, trae los por defecto.
        // La API de Rick and Morty permite filtrar así: /?name=nombre
        const response = await fetch(`${API_URL}/?name=${name}`);
        
        // Verificamos si la respuesta fue exitosa (código 200)
        if (!response.ok) {
            resultsGrid.innerHTML = '<p>No se encontraron personajes :(</p>';
            return;
        }

        // Convertimos la respuesta cruda a formato JSON (que JS entiende)
        const data = await response.json();

        // La API devuelve los personajes dentro de una propiedad llamada 'results'
        displayCharacters(data.results);

    } catch (error) {
        console.error('Error obteniendo personajes:', error);
        resultsGrid.innerHTML = '<p>Hubo un error al conectar con la API.</p>';
    }
}

// 3. Función para pintar (renderizar) las tarjetas en el HTML
function displayCharacters(characters) {
    // Limpiamos el contenido previo
    resultsGrid.innerHTML = '';

    // Recorremos cada personaje recibido
    characters.forEach(character => {
        // Creamos el div de la tarjeta
        const card = document.createElement('div');
        card.className = 'card';

        // Insertamos el HTML interno de la tarjeta usando Template Strings (``)
        // Fíjate cómo inyectamos las variables ${character.name}, ${character.image}, etc.
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <div class="card-info">
                <h3>${character.name}</h3>
                <p>Estado: ${character.status}</p>
            </div>
        `;

        // Agregamos la tarjeta al contenedor principal
        resultsGrid.appendChild(card);
    });
}

// 4. Event Listeners (Escuchadores de eventos)

// Cuando hacen click en el botón "Buscar"
searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value.trim(); // .trim() quita espacios vacíos
    fetchCharacters(searchValue);
});

// Opcional: Permitir buscar presionando "Enter" en el input
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchValue = searchInput.value.trim();
        fetchCharacters(searchValue);
    }
});

// 5. Carga inicial: Mostrar algunos personajes al abrir la página
fetchCharacters();