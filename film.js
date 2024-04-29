document.addEventListener('DOMContentLoaded', function() {
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
        movieList.innerHTML = '';

        for (let i = 0; i < numMovies; i++) {
          const movie = movies[(index + i) % numMovies];
          const listItem = document.createElement('li');
          listItem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movie.poster_path})`;
          listItem.classList.add('item');
          listItem.innerHTML = `
            <div class="content">
              <div class="name">${movie.original_title}</div>
              <div class="des">${movie.overview}</div>
              <button class="add-to-favorites-btn" data-movie='${encodeURIComponent(JSON.stringify(movie))}'>Ajouter aux favoris</button>
            </div>
          `;
          movieList.appendChild(listItem);
        }
        
        const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites-btn');
        addToFavoritesButtons.forEach(button => {
          button.addEventListener('click', onAddButtonClick);
        });
      }

      function showNextMovie() {
        currentIndex++;
        showMovie(currentIndex);
      }

      function showPrevMovie() {
        currentIndex--;
        showMovie(currentIndex);
      }

      showMovie(currentIndex);

      document.getElementById('next').addEventListener('click', showNextMovie);
      document.getElementById('prev').addEventListener('click', showPrevMovie);

      // Extract movie titles for autocomplete
      const movieTitles = movies.map(movie => movie.original_title);
      const searchInput = document.querySelector('.form-control');

      // Add autocomplete functionality to the search input
      searchInput.addEventListener('input', function(event) {
        const userInput = event.target.value.toLowerCase();
        const suggestions = movieTitles.filter(title => title.toLowerCase().includes(userInput));
        updateSuggestions(suggestions);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    function updateSuggestions(suggestions) {
      const datalist = document.getElementById('suggestions');
      datalist.innerHTML = ''; // Clear previous suggestions
      suggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        datalist.appendChild(option);
      });
    }
    

    


    function onAddButtonClick(event) {
      const movieData = event.target.dataset.movie;
      console.log('Encoded movie data:', movieData);
  
      try {
          const movie = JSON.parse(decodeURIComponent(movieData));
          console.log('Decoded movie:', movie);
  
          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          favorites.push(movie);
          localStorage.setItem('favorites', JSON.stringify(favorites));
          console.log('Added to favorites:', movie.original_title);
      } catch (error) {
          console.error('Error parsing movie data:', error);
      }
  }


  

const event = new Event('favoriteAdded');
document.dispatchEvent(event);

if (currentDomain === 'example.com') {
  // Both pages are in the same domain
  console.log('Pages are in the same domain.');
} else {
  // Pages are in different domains
  console.log('Pages are in different domains.');
}

  
});
