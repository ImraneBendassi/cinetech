const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`;

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    image.alt = `Poster de ${movie.title}`;
    
    // Ajoutez un événement de clic à chaque image
    image.addEventListener('click', () => {
        displayMovieDetails(movie);
    });

    card.appendChild(image);
    return card;
}

function displayMovieDetails(movie) {
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieOverview = document.getElementById('movie-overview');

    movieTitle.textContent = movie.title;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieOverview.textContent = movie.overview;

    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.style.display = 'block';

    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', () => {
        detailsContainer.style.display = 'none';
    });
}

async function displayMovies() {
    const movies = await fetchMovies();
    const container = document.getElementById('movie-container');

    movies.forEach(movie => {
        const card = createMovieCard(movie);
        container.appendChild(card);
    });
}

window.onload = displayMovies;


function displayMovieDetails(movie) {
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieOverview = document.getElementById('movie-overview');
    const overlay = document.querySelector('.overlay'); // Sélectionne la superposition

    movieTitle.textContent = movie.title;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieOverview.textContent = movie.overview;

    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.style.display = 'block';
    overlay.style.display = 'block'; // Affiche la superposition lorsque les détails du film sont affichés

    const closeButton = document.getElementById('close-btn');
    closeButton.addEventListener('click', () => {
        detailsContainer.style.display = 'none';
        overlay.style.display = 'none'; // Cache la superposition lorsque les détails du film sont cachés
    });
}






