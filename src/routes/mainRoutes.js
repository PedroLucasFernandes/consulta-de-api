const express = require('express');
const router = express.Router();
const { getMoviesListByTitle, getMovieDetailsById } = require('../controllers/moviecontroller');
const { errorMiddleware } = require('../utils/errorMiddleware');



router.get('/', (req, res) => {
    res.render('initial-page', {
        style: 'style.css'
    });
});

router.post('/fetch-movie', async (req, res, next) => {
 try{   
    
    const { search } = req.body;
    let movieList = await getMoviesListByTitle(search);
    console.log('deu bom');
    return res.render('fetch-movie', {
        movie: movieList,
        style: 'style.css'
    });}
    catch(error){
       next(error);
    }

});

router.get('/movie-details/:movieId', async (req, res, next) => {
   try{ const { movieId } = req.params;
    let movieDetails = await getMovieDetailsById(movieId);

    return res.render('movie-details', {
        movie: movieDetails,
        style: 'style.css'
    });}
    catch(error){
        next(error);
    }
});

router.use(errorMiddleware);

module.exports = router;