require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');
 const routes = require('./routes/mainRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./src/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
