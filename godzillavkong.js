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

    const title = document.createElement('h2');
    title.textContent = movie.title;

    // Ajoutez un événement de clic à chaque carte
    card.addEventListener('click', () => {
        displayMovieDetails(movie);
    });

    card.appendChild(title);
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
