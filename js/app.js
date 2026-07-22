const mainContainer = document.querySelector('.main-container');
const randomBtn = document.querySelector('.btn');

document.addEventListener('DOMContentLoaded', obtenerDatos);
randomBtn.addEventListener('click', obtenerDatos);

function generarNumAleatorio() {
    const min = 1, max = 826;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function obtenerDatos() {
    const cardExist = document.querySelector('.card');
    const error = document.querySelector('.error')
    cardExist?.remove();
    error?.remove();
    crearSpinner();

    const url = `https://rickandmortyapi.com/api/character/${generarNumAleatorio()}`
    fetch(url)
        .then(respuesta => {
            const { ok } = respuesta;

            if (ok) {
                return respuesta.json();
            } else {
                throw new Error('Hubo un problema al contactar la base de datos');
            }

        })
        .then(resultado => obtenerDatosPersonaje(resultado))
        .catch(error => {
            const spinner = document.querySelector('.sk-circle');
            spinner?.remove();

            crearAlerta(error.message);
        });
}

function obtenerDatosPersonaje(personaje) {
    const { name, status, species, gender, image, episode } = personaje;

    return fetch(episode[0])
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarDatos({ character: name, status, species, gender, image }, resultado))
}

function mostrarDatos(datosPersonaje, episodio) {
    const spinner = document.querySelector('.sk-circle');

    const { character, status, species, gender, image } = datosPersonaje;
    const { name, episode } = episodio;

    let statusIndicator = status.toLowerCase();

    const card = document.createElement('DIV');
    card.classList.add('card');

    card.innerHTML = `
            <h2 class="name">${character}</h2>
            <p class="status icon-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#57ff57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-heart-icon lucide-heart">
                    <path
                        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
                Status: <span class="enfasis ${statusIndicator}">${status}</span>
            </p>
            <p class="species icon-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#57ff57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-user-round-search-icon lucide-user-round-search">
                    <circle cx="10" cy="8" r="5" />
                    <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                    <circle cx="18" cy="18" r="3" />
                    <path d="m22 22-1.9-1.9" />
                </svg>
                Species: <span class="enfasis">${species}</span>
            </p>
            <p class="gender icon-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#57ff57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-transgender-icon lucide-transgender">
                    <path d="M12 16v6" />
                    <path d="M14 20h-4" />
                    <path d="M18 2h4v4" />
                    <path d="m2 2 7.17 7.17" />
                    <path d="M2 5.355V2h3.357" />
                    <path d="m22 2-7.17 7.17" />
                    <path d="M8 5 5 8" />
                    <circle cx="12" cy="12" r="4" />
                </svg>
                Gender: <span class="enfasis">${gender}</span>
            </p>
            <p class="episode icon-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="#57ff57" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-tv-minimal-play-icon lucide-tv-minimal-play">
                    <path
                        d="M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z" />
                    <path d="M7 21h10" />
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                </svg>
                First Appearance:
            </p>

            <p class="enfasis-episode">${name} (${episode})</p>
    `

    const img = document.createElement('IMG');
    img.classList.add('img-character');
    img.src = image;
    img.alt = character;

    img.addEventListener('load', () => {
        spinner?.remove();
        card.prepend(img);
        mainContainer.prepend(card);
    });

    img.addEventListener('error', () => {
        const fallbackImage = '../img/unknown_character.png';

        if (img.src.includes('unknown_character.png')) {
            img.src = fallbackImage;
        } else {
            spinner?.remove();
            crearAlerta('No se pudo cargar la imagen')
        }
    });
}

function crearSpinner() {
    const spinner = document.createElement('DIV');
    spinner.classList.add('sk-circle');

    spinner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `

    mainContainer.prepend(spinner);
}

function crearAlerta(mensaje) {
    const divError = document.createElement('DIV');
    divError.classList.add('error');
    divError.textContent = mensaje;
    mainContainer.prepend(divError);
}