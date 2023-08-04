const axios = require('axios');
const { Movie } = require('../models/movie');
const apiKey = process.env.OMDB_API_KEY;
const baseApiUrl = 'http://www.omdbapi.com/?';


async function getMovies(movieName) {

    if (movieName) {
        let apiUrl = `${baseApiUrl}s=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        const movieList = response.data['Search'].map((movie) => {
            const { Title, Poster, imdbID, } = movie;
            return new Movie(Title, Poster, imdbID);
        });
        return movieList;
    }
}

async function getMovieDetails(movieId) {
    let apiUrl = `${baseApiUrl}i=${encodeURIComponent(movieId)}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);

    const {
        Title, Poster, imdbID, Year, Plot, Genre, Director
    } = response.data;

    const movieWithDetails = new Movie(Title, Poster, imdbID, Year, Plot, Genre, Director);
    return movieWithDetails;
}

module.exports = { getMovies, getMovieDetails };
