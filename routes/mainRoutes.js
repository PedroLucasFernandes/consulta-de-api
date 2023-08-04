const express = require('express');
const router = express.Router();
const { getMovies, getMovieDetails } = require('../controllers/moviecontroller');


router.get('/', (req, res) => {
    res.render('initial-page');
});

router.post('/fetch-movie', async (req, res) => {
    const { search } = req.body;
    let movieList = await getMovies(search);
    

    return res.render('fetch-movie', { movie: movieList });

});

router.get('/movie-details/:movieId', async (req, res) => {
    const { movieId } = req.params;
    let movieDetails = await getMovieDetails(movieId);
    
    return res.render('movie-details', {movie: movieDetails} );
  });

module.exports = router;