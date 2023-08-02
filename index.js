const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
const { getMovies, getMovieDetails } = require('./controllers/moviecontroller');

app.get('/', (req, res) => {
  res.render('initial');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.post('/buscar-filme', async (req, res) => {
  const { pesquisa } = req.body;
  let movieList = await getMovies(pesquisa);
  console.log(movieList);

  return res.render('buscar-filme', { movie: movieList });



});

app.get('/details/:imdbID', async (req, res) => {
  const { imdbID } = req.params;


});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
