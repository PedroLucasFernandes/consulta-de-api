const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000; // Ou qualquer outra porta que desejar

const apiKey = process.env.OMDB_API_KEY; // A chave de API será obtida de uma variável de ambiente

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/search', (req, res) => {
    const searchTerm = req.query.term;

    if (!searchTerm) {
        return res.status(400).json({ error: 'Missing search term' });
    }

    // Fazendo a solicitação para a API do OMDB
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Error) {
                res.status(404).json({ error: 'Movie not found' });
            } else {
                res.json(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
