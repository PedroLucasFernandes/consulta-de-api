const axios = require('axios');
const { Movie } = require('../models/movie');
const apiKey = process.env.OMDB_API_KEY;
const baseApiUrl = 'http://www.omdbapi.com/?';
const NoImageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

async function getMovies(movieName) {
    try {
            let apiUrl = `${baseApiUrl}s=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
            const response = await axios.get(apiUrl);
            const movieList = response.data['Search'].map((movie) => {
                let { Title, Poster, imdbID, } = movie;
                const IsThereImage = Poster === 'N/A';
                if (IsThereImage) {
                    Poster = NoImageURL;
                }
                return new Movie(Title, Poster, imdbID);
            });
            return movieList;

    } catch (error) {
        console.error('Error while getting the list of movies:', error.message);

    }
}

async function getMovieDetails(movieId) {
    try {
        let apiUrl = `${baseApiUrl}i=${encodeURIComponent(movieId)}&apikey=${apiKey}`;
        const response = await axios.get(apiUrl);
        let { Title, Poster, imdbID, Year, Plot, Genre, Director } = response.data;
        const IsThereImage = Poster === 'N/A';
        if (IsThereImage) {
            Poster = NoImageURL;
        }
        const movieWithDetails = new Movie(Title, Poster, imdbID, Year, Plot, Genre, Director);
        return movieWithDetails;

    } catch (error) {
        console.error('Error while getting movie details:', error.message);

    }
}
module.exports = { getMovies, getMovieDetails };