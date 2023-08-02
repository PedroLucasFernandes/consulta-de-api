const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');

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

  if (!pesquisa) {
    return res.status(400).json({ error: 'O campo de pesquisa não pode estar vazio.' });
  }

  try {
    const apiKey = '2e9642f6';
    const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(pesquisa)}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    return res.render('buscar-filme', { movie: response.data['Search'] });
  } catch (error) {
    console.error('Erro ao buscar filmes na API do OMDB:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar filmes na API do OMDB.' });
  }
});

app.get('/details/:imdbID', async (req, res) => {
  const { imdbID } = req.params;

  try {
    const apiKey = '2e9642f6';
    const apiUrl = `http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${apiKey}`;
    const response = await axios.get(apiUrl);
    return res.render('details', { movie: response.data });
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme na API do OMDB:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar detalhes do filme na API do OMDB.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
