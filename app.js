require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const axios = require('axios');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000; // 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Configuração do handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/search', (req, res) => {
    const searchTerm = req.body.title;

    if (!searchTerm) {
        return res.status(400).send('Missing search term');
    }

    axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(searchTerm)}`)
        .then(response => {
            const movies = response.data.Search;
            res.render('results', { movies });
        })
        .catch(error => {
            console.error('Error:', error);
            res.render('error');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
