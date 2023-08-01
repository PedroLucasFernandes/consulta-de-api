function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;

    // Making the API request
    fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => displayResults(data.Search))
        .catch(error => console.error('Error:', error));
}

function displayResults(movies) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const movieTitle = movie.Title;
            const movieYear = movie.Year;
            
            const moviePoster = movie.Poster;

            const movieElement = document.createElement('div');
            movieElement.innerHTML = `
                <h2>${movieTitle} (${movieYear})</h2>
                <img src="${moviePoster}" alt="${movieTitle}" width="200">
            `;

            searchResults.appendChild(movieElement);
        });
    } else {
        searchResults.innerHTML = '<p>No results found.</p>';
    }
}
