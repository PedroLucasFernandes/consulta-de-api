const express = require('express');
const app = express();
const axios = require('axios');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const OMDB_API_KEY = 'f5368ccf';

app.get('/api/movie/:title', async (req, res) => {
    try {
        const { title } = req.params;
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao acessar a API do OMDB' });
    }
});


