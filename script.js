// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const movieInput = document.getElementById('movieInput');
    const movieDetails = document.getElementById('movieDetails');
  
    searchButton.addEventListener('click', () => {
        const title = movieInput.value;
        fetch(`/api/movie/${encodeURIComponent(title)}`)
            .then(response => response.json())
            .then(data => {
                if (data.Error) {
                    movieDetails.innerHTML = `<p class="error">Filme não encontrado!</p>`;
                } else {
                    const { Title, Year, Plot, Poster } = data;
                    movieDetails.innerHTML = `
              <div class="movie-card">
                <img src="${Poster}" alt="${Title}">
                <div class="movie-info">
                  <h2>${Title}</h2>
                  <p><strong>Ano:</strong> ${Year}</p>
                  <p><strong>Descrição:</strong> ${Plot}</p>
                </div>
              </div>
            `;
                }
            })
            .catch(error => {
                movieDetails.innerHTML = `<p class="error">Erro ao buscar o filme.</p>`;
                console.error('Erro ao buscar o filme:', error);
            });
    });
});
  