const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`;

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau !');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Affiche les données de la réponse dans la console
    const listeFilms = document.getElementById('listeFilms');

    // Fonction pour créer et ajouter un élément de liste avec les détails d'un film
    function ajouterFilm(film) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>Titre:</strong> ${film.original_title}<br>
        <strong>Adulte:</strong> ${film.adult}<br>
        <strong>Date de sortie:</strong> ${film.release_date}<br>
        <strong>Popularité:</strong> ${film.popularity}<br>
        <strong>Vote moyen:</strong> ${film.vote_average}<br>
        <strong>Nombre de votes:</strong> ${film.vote_count}<br>
        <strong>Genres:</strong> ${film.genre_ids.join(", ")}<br>
        <strong>Aperçu:</strong> ${film.overview}
      `;
      listeFilms.appendChild(listItem);
    }

    // Afficher les détails de chaque film
    data.results.forEach(film => {
      ajouterFilm(film);
    });
  })
  .catch(error => {
    console.error('Il y a eu un problème avec votre requête Fetch:', error);
  });