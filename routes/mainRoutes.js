const express = require('express');
const router = express.Router();
const { getMovies, getMovieDetails } = require('../controllers/moviecontroller');


router.get('/', (req, res) => {
    res.render('initial');
});

router.post('/buscar-filme', async (req, res) => {
    const { pesquisa } = req.body;
    let movieList = await getMovies(pesquisa);
    

    return res.render('buscar-filme', { movie: movieList });

});

router.get('/details/:movieId', async (req, res) => {
    const { movieId } = req.params;
    console.log(movieId);
    let movieDetails = await getMovieDetails(movieId);
    
    return res.render('details', {movie: movieDetails} );
  });

module.exports = router;