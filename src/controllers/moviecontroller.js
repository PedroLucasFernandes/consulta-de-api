const axios = require('axios');
const { Movie } = require('../models/movie');
const { APIError } = require('../utils/apiError');
const { apiUrlFactory } = require('../utils/apiUrlFactory');
const apiKey = process.env.OMDB_API_KEY;
const NoImagePath = '/images/No-Image.jpg';
const omdbBaseApiUrl = 'http://www.omdbapi.com/';

const omdbApiKeyFactory = apiUrlFactory(omdbBaseApiUrl, apiKey);

async function getMoviesListByTitle(movieName) {
    try {
        const apiUrl = omdbApiKeyFactory({ s: movieName });
        const response = await axios.get(apiUrl);
        let hasData = response.data['Response'] === 'True';

        if (hasData) {
            const movieList = response.data['Search'].map((movie) => {
                let { Title, Poster, imdbID, } = movie;
                const IsThereImage = Poster === 'N/A';

                if (IsThereImage) {
                    Poster = NoImagePath;
                }
                return new Movie(Title, Poster, imdbID);

            });
            return movieList;

        } else {
            throw new APIError(404, response.data['Error']);

        }

    } catch (error) {
        throw new APIError(error.response.status, error.message);

    }
}

async function getMovieDetailsById(movieId) {
    try {
        let apiUrl = omdbApiKeyFactory({ i: movieId });
        const response = await axios.get(apiUrl);
        let hasData = response.data['Response'] === 'True';

        if (hasData) {
            let { Title, Poster, imdbID, Year, Plot, Genre, Director } = response.data;
            const IsThereImage = Poster === 'N/A';

            if (IsThereImage) {
                Poster = NoImagePath;
            }
            const movieWithDetails = new Movie(Title, Poster, imdbID, Year, Plot, Genre, Director);

            return movieWithDetails;
        } else {
            throw new APIError(404, response.data['Error'] );

        }

    } catch (error) {
        throw new APIError(error.response.status, error.message);

    }
}
module.exports = { getMoviesListByTitle, getMovieDetailsById };
