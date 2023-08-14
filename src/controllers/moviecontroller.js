const axios = require('axios');
const { Movie } = require('../models/movie');
const apiKey = process.env.OMDB_API_KEY;
const omdbBaseApiUrl = 'http://www.omdbapi.com/';
const NoImageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
const { apiUrlFactory } = require('../utils/apiUrlFactory');

const omdbApiKeyFactory = apiUrlFactory(omdbBaseApiUrl, apiKey);


async function getMoviesListByTitle(movieName) {
    try {
        const apiUrl = omdbApiKeyFactory({ s: movieName });

        const response = await axios.get(apiUrl);
        if (!response.data['Search']) {
            throw new Error('No movies found for the given title.');//Se não encontrar nenhum filme, retorna erro específico
        }

        const movieList = response.data['Search'].map((movie) => {
            let { Title, Poster, imdbID, } = movie;
            const IsThereImage = Poster === 'N/A';
            if (IsThereImage) {
                Poster = NoImageURL;
            }
            return new Movie(Title, Poster, imdbID);

        });
        return movieList;

    }  catch (error) {
        console.error('Error while getting the list of movies:', error.message);
        throw error;
    }
}

async function getMovieDetailsById(movieId) {
    try {
        let apiUrl = omdbApiKeyFactory({ i: movieId });
        const response = await axios.get(apiUrl);

        if (!response.data.Title) {
            throw new Error('No movie details found for the given ID.');//Se não encontrar nenhum filme, retorna erro específicando que foi por causa da ID 
        }

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
module.exports = { getMoviesListByTitle,  getMovieDetailsById };