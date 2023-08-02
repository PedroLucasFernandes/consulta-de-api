const axios = require('axios');
const Movie = require('../models/movie');

async function getMovies(movieName) {

    if (!movieName) {
    
    
        const apiKey = '2e9642f6';
        const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        const movieList = response.data.map((movie) => {
            const { title,posterUrl, movieId, movieDetails } = movie;
            return new Movie( title,posterUrl, movieId, movieDetails );
        });
        console.log(movieList);
        return movieList;
      }

}

module.exports = getMovies;

// async function getBreedData(breed) {
//     let apiUrl = baseApiUrl + 'search?q=' + breed
//     let response = await axios.get(apiUrl)
//     const breeds = response.data.map((breedData) => {
//         const { id, name, temperament, origin, weight, height, life_span, reference_image_id } = breedData
//         return new Breed(id, name, temperament, origin, weight, height, life_span, reference_image_id)
//     })
//     return breeds
// }