// Déclaration de la clé API et de l'URL de l'API themoviedb.org
const maConst = '8c4b867188ee47a1d4e40854b27391ec'; // Remplacez par votre clé API si nécessaire
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${maConst}&language=fr-FR`; // URL pour découvrir les films

// Effectue une requête Fetch pour récupérer les données de l'API
fetch(apiUrl)
  .then(response => {
    // Vérifie si la réponse est valide (code de statut HTTP 200-299)
    if (!response.ok) {
      throw new Error('Erreur de réseau !'); // Lève une erreur en cas de problème de réseau
    }
    // Convertit la réponse en format JSON
    return response.json();
  })
  .then(data => {
    // Récupère les éléments de la liste des films et des suggestions dans le document
    const listeFilms = document.getElementById('listeFilms');
    const suggestions = document.getElementById('suggestions');

    // Fonction pour ajouter des suggestions à l'élément datalist
    function ajouterSuggestions(films) {
        films.forEach(film => {
            // Crée un élément option pour chaque film
            const option = document.createElement('option');
            option.value = film.original_title; // Définit la valeur de l'option au titre original du film
            suggestions.appendChild(option); // Ajoute l'option à la liste des suggestions
        });
    }

    // Fonction pour créer et ajouter un élément de liste avec les détails d'un film
    function ajouterFilm(film) {
        // Crée un élément de liste
        const listItem = document.createElement('li');
        // Définit le contenu HTML de l'élément de liste avec les détails du film
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
        // Ajoute l'élément de liste à la liste des films
        listeFilms.appendChild(listItem);
    }

    // Ajoute les suggestions et les détails des films
    data.results.forEach(film => {
        // Ajoute les suggestions pour tous les films
        ajouterSuggestions(data.results);
        // Ajoute les détails de chaque film à la liste
        ajouterFilm(film);
    });
  })
  // Gère les erreurs de la requête Fetch
  .catch(error => {
    console.error('Il y a eu un problème avec votre requête Fetch:', error); // Affiche l'erreur dans la console
  });
