const axios = require('axios');
const { Movie } = require('../models/movie');
const { apiUrlFactory } = require('../utils/apiUrlFactory');
const { APIError } = require('../utils/apiError');
const apiKey = process.env.OMDB_API_KEY;
const NoImageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
const omdbBaseApiUrl = 'http://www.omdbapi.com/';

const omdbApiKeyFactory = apiUrlFactory(omdbBaseApiUrl, apiKey);

async function getMoviesListByTitle(movieName) {
    try {
        const apiUrl = omdbApiKeyFactory({ s: movieName });
        const response = await axios.get(apiUrl);
      
        if (response.data['Response'] != 'False') {
            const movieList = response.data['Search'].map((movie) => {
                let { Title, Poster, imdbID, } = movie;
                const IsThereImage = Poster === 'N/A';

                if (IsThereImage) {
                    Poster = NoImageURL;

                }
                return new Movie(Title, Poster, imdbID);

            });
            return movieList;

        } else {
            throw new APIError(404, 'data not found');
            
        }

    } catch (error) {
        throw new APIError(error.response.status, error.message);

    }
}

async function getMovieDetailsById(movieId) {
    try {
        let apiUrl = omdbApiKeyFactory({ i: movieId });
        const response = await axios.get(apiUrl);
        let { Title, Poster, imdbID, Year, Plot, Genre, Director } = response.data;
        const IsThereImage = Poster === 'N/A';
        
        if (IsThereImage) {
            Poster = NoImageURL;
        }
        const movieWithDetails = new Movie(Title, Poster, imdbID, Year, Plot, Genre, Director);
        return movieWithDetails;

    } catch (error) {
        throw new APIError(error.response.status, error.message);

    }
}
module.exports = { getMoviesListByTitle, getMovieDetailsById };
