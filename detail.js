// Constante contenant la clé d'API
const maConst = '8c4b867188ee47a1d4e40854b27391ec';
// URL de l'API avec la clé d'API et la langue spécifiée
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`;

// Fonction asynchrone pour récupérer les films depuis l'API
async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

// Fonction pour créer une carte de film
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = `Poster de ${movie.title}`;
    
    // Ajout d'un événement de clic pour afficher les détails du film
    image.addEventListener('click', () => {
        displayMovieDetails(movie);
    });

    card.appendChild(image);
    return card;
}

// Fonction pour afficher les détails d'un film
function displayMovieDetails(movie) {
    console.log(movie); // Vérifier les données récupérées

    // Sélection des éléments HTML pour les détails du film
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieOverview = document.getElementById('movie-overview');
    const movieLanguage = document.getElementById('movie-language');
    const movieReleaseDate = document.getElementById('movie-release-date');
    const overlay = document.querySelector('.overlay');

    // Remplissage des éléments avec les données du film
    movieTitle.textContent = `${movie.title}`;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieLanguage.textContent = `Langue originale : ${movie.original_language.toUpperCase()}`;
    movieReleaseDate.textContent = `Date de sortie : ${movie.release_date}`;
    movieOverview.textContent = movie.overview;

    // Affichage des détails du film et du fond noir semi-transparent
    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.style.display = 'block';
    overlay.style.display = 'block';

    // Ajout d'un gestionnaire d'événement pour fermer les détails du film
    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', () => {
        detailsContainer.style.display = 'none';
        overlay.style.display = 'none';
    });

    console.log(`Titre du film : ${movie.title}, Langue originale : ${movie.original_language.toUpperCase()}, Date de sortie : ${movie.release_date}`);
}

// Fonction asynchrone pour afficher les films sur la page
async function displayMovies() {
    const movies = await fetchMovies();
    const container = document.getElementById('movie-container');

    // Création et ajout des cartes de films dans le conteneur
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

// Exécution de la fonction d'affichage des films lorsque la page est chargée
window.onload = displayMovies;

// Fonction pour afficher les détails d'un film
async function displayMovieDetails(movie) {
    console.log(movie); // Vérifier les données récupérées

    // Sélection des éléments HTML pour les détails du film
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieOverview = document.getElementById('movie-overview');
    const movieLanguage = document.getElementById('movie-language');
    const movieReleaseDate = document.getElementById('movie-release-date');
    const overlay = document.querySelector('.overlay');

    // Remplissage des éléments avec les données du film
    movieTitle.textContent = `${movie.title}`;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieLanguage.textContent = `Langue originale : ${movie.original_language.toUpperCase()}`;
    movieReleaseDate.textContent = `Date de sortie : ${movie.release_date}`;
    movieOverview.textContent = movie.overview;

    // Affichage des détails du film avec une animation
    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.classList.add('show'); // Ajoutez la classe pour afficher les détails
    overlay.style.display = 'block';

    // Ajout d'un gestionnaire d'événement pour fermer les détails du film
    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', () => {
        detailsContainer.classList.remove('show'); // Retirez la classe pour masquer les détails
        overlay.style.display = 'none';
    });

    // Ajout d'un gestionnaire d'événement pour fermer les détails du film en cliquant sur le fond
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            detailsContainer.classList.remove('show');
            overlay.style.display = 'none';
        }
    });

    console.log(`Titre du film : ${movie.title}, Langue originale : ${movie.original_language.toUpperCase()}, Date de sortie : ${movie.release_date}`);
}
