const express = require('express');
const router = express.Router();
const { getMoviesListByTitle, getMovieDetailsById } = require('../controllers/moviecontroller');
const errorHandler = require('../utils/errorMiddleware');

router.get('/', (req, res) => {
    res.render('initial-page', {
        style: 'style.css'
    });
});

router.post('/fetch-movie', async (req, res) => {
    const { search } = req.body;
    let movieList = await getMoviesListByTitle(search);

    return res.render('fetch-movie', {
        movie: movieList,
        style: 'style.css'
    });

});

router.get('/movie-details/:movieId', async (req, res) => {
    const { movieId } = req.params;
    let movieDetails = await getMovieDetailsById(movieId);

    return res.render('movie-details', {
        movie: movieDetails,
        style: 'style.css'
    });
});

router.use(errorHandler);
module.exports = router;