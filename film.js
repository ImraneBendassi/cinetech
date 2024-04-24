const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=en-US`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network error!');
    }
    return response.json();
  })
  .then(data => {
    const movieList = document.getElementById('movieList');
    const movies = data.results;
    const numMovies = movies.length;
    let currentIndex = 0;

    function showMovie(index) {
      const movie = movies[index];
      const listItem = document.createElement('li');
      listItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
      listItem.classList.add('item');
      listItem.innerHTML = `
        <div class="content">
          <div class="name">${movie.original_title}</div>
          <div class="des">${movie.overview}</div>
          <button>Button</button>
        </div>
      `;
      movieList.appendChild(listItem);
    }

    function showNextMovie() {
      if (currentIndex < numMovies - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      showMovie(currentIndex);
    }

    function showPrevMovie() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = numMovies - 1;
      }
      showMovie(currentIndex);
    }

    // Show initial movie
    showMovie(currentIndex);

    // Button event listeners
    document.getElementById('next').addEventListener('click', showNextMovie);
    document.getElementById('prev').addEventListener('click', showPrevMovie);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
