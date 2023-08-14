const express = require('express');
const router = express.Router();
const { getMoviesListByTitle, getMovieDetailsById } = require('../controllers/moviecontroller');


router.get('/', (req, res) => {
    res.render('initial-page', {
        style: 'style.css'
    });
});

router.post('/fetch-movie', async (req, res) => {
    const { search } = req.body;

    try {
        if (!search) {
            throw new Error('Please enter a movie title.'); // Lança um erro se o campo de pesquisa estiver vazio
        }

        let movieList = await getMoviesListByTitle(search);

        return res.render('fetch-movie', {
            movie: movieList,
            style: 'style.css'
        });
    } catch (error) {
        return res.render('fetch-movie', {
            errorMessage: error.message, // Passa a mensagem de erro para a página
            style: 'style.css'
        });
    }
});

router.get('/movie-details/:movieId', async (req, res) => {
    const { movieId } = req.params;
    let movieDetails = await getMovieDetailsById(movieId);

    return res.render('movie-details', {
        movie: movieDetails,
        style: 'style.css'
    });
});

router.use((req, res) => {
    res.status(404).render('error', {
        errorMessage: 'Oops! The page you requested was not found.',
        style: 'style.css'
    });
});

module.exports = router;