const express = require("express");
const app =  express();
const port = 8081;
const axios = require("axios");

require("dotenv").config();

const baseURL = `http://www.omdbapi.com/?`;
const APIKEY = `&apikey=${process.env.APIKEY}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/index.html");
})

app.post("/search-movies", async(req, res) => {
    res.sendFile(__dirname + "/html/search.html");
    const {search} = req.body;
    
    try{
        const searchString = `s=${search}`;
        const response = await axios.get(baseURL+searchString+APIKEY);
        const listSearch = response.data["Search"];
        
        console.log(listSearch);
        listSearch.forEach(movieobject => {
            let title = document.getElementById("title");
            title.appendChild(movieobject["Title"]);
        });
    } catch(error) {
        console.log(error);
    }
})

app.get("/details/:movieID", (req, res) => {
    res.sendFile(__dirname + "/html/details.html");
})


app.listen(port, () => {
    console.log(`Servidor rodando na URL http://localhost:${port}`);
})