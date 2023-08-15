const axios = require('axios');
const { Movie } = require('../models/movie');
const { APIError } = require('../utils/apiError');
const { apiUrlFactory } = require('../utils/apiUrlFactory');
const apiKey = process.env.OMDB_API_KEY;
const omdbBaseApiUrl = 'http://www.omdbapi.com/';

const omdbApiKeyFactory = apiUrlFactory(omdbBaseApiUrl, apiKey);

async function fetchApiData(apiUrl) {
    try {
        const response = await axios.get(apiUrl);
        const hasNoData = response.data['Response'] === 'False';

        if (hasNoData) {
            throw new APIError(404, response['Error']);
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            throw new APIError(error.response.status, error.message);
        } else {
            throw error;
        }
    }
}

async function getMoviesListByTitle(movieName) {
    const apiUrl = omdbApiKeyFactory({ s: movieName });
    const response = await fetchApiData(apiUrl);
    let movieList = response['Search'].map(movieDetails => Movie.instanceMovieFromApiResponse(movieDetails));
   
    return movieList;
}

async function getMovieDetailsById(movieId) {
    const apiUrl = omdbApiKeyFactory({ i: movieId });
    const response = await fetchApiData(apiUrl);

    return Movie.instanceMovieFromApiResponse(response);
}

module.exports = { getMoviesListByTitle, getMovieDetailsById };
