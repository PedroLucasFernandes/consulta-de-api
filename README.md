# Avaliação Sprint 2 - Programa de Bolsas Compass UOL / AWS e FATEC
Avaliação da segunda sprint do programa de bolsas Compass UOL para formação em machine learning para AWS.

***

## Sistema de consumo de API

### Proposta
A proposta do programa é fazer o usuário consumir a API OMBDb para verificar filmes conforme sua pesquisa. Esta consulta será feita através de uma aplicação WEB.



### API OMDb The Open Movie Database

A API utilizada na atividade foi a OMDb  (Open Movie Database) que se trata de um serviço para obter informações sobre filmes, sendo ainda que todo o conteúdo e imagens são fornecidas por usuários.
Utilizando dessa API o sistema é capaz de obter informações como nome do filme, id, ano de lançamento, diretor, gênero, descrição e poster.



### Como foi desenvolvido

Inicialmente, todos os membros do grupo instalaram algumas dependências no Node.JS (via ``npm``) para configurar o ambiente de desenvolvimento.
```json
{
  "dependencies": {
    "axios": "^1.4.0",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-handlebars": "^7.1.0"
  },
  "devDependencies": {
    "eslint": "^8.46.0",
    "nodemon": "^3.0.1"
  },
}
```
Utilizamos o Javascript como linguagem principal para o desenvolvimento, juntamente de arquivos ``.handlebars`` para a visualização da página WEB.
A ferramenta escolhida para o desenvolvimento foi o Visual Studio Code, respeitando o padrão MVC para a estrutura de pastas e arquivos:
```bash
controllers/
├─ moviecontroller.js
models/
├─ movie.js
node_modules/
routes/
├─ mainRoutes.js
views/
├─  layouts/
    ├─  main.handlebars
├─ fetch-movie.handlebars
├─ initial-page.handlebars
├─ movie-details.handlebars
.env.exemple
.eslintrc.js
index.js
package-lock.json
package.json
.gitignore
README.md
```


### Construção

*Models*: É o layer responsável pela definição das entidades do projeto, que neste caso é a classe ``Movie``. Pode-se observar que foi definido na classe que alguns atributos são opcionais, isso ocorre devido à logica desenvolvida na para o programa, uma vez que é utilizado duas formas de consulta à API, uma que retorna uma lista de filmes com cada filme tendo apenas alguns atributos básicos e outra que retorna um filme individualmente mas com muito mais detalhes.

*controllers*: É o layer responsável pelo gerenciamento da lógica do programa, onde encontra-se as funções de consulta à API escolhida, fazendo a desserialização da resposta obtida (Json). Há duas funções no controller, a ``getMovies`` responsável pela obtenção da lista de filmes com base no nome informado pelo usuário e a função ``getMovieDetails`` responsável por buscar os detalhes de um filme específico por meio do ID do mesmo.

*Views*: É o layer responsável pela interface do usuário, onde encontra-se as páginas da aplicação web.

*Routes*: è o layer onde se define as rotas da aplicação.

*.env.exemple*: Arquivo responsável pela representação das informações sensíveis da aplicação, como a chave da API utilizada.



### Como utilizar o sistema

1. Faça o download de todos os arquivos do repositório em um diretório local;
2. Realize o cadastro no endereço: https://www.omdbapi.com/apikey.aspx afim de obter a API key;
3. Informe a API key no arquivo `.env`, adicionando na variável OMDB_API_KEY;

3. Iniciar o servidor utilizando o comando ``npm run dev`` no terminal, o link http://localhost:3000 será disponibilizado;
4.  Acesse a WEB via link: http://localhost:3000;
5. Na página, terá uma caixa de busca, digite um termo e clique no botão "Search"; 
6. Uma lista de filmes aparecerá na tela, com imagens e nomes de longa metragens referentes o termo pesquisado;
7. É possível clicar em um dos pôsteres para mostrar detalhes do filme em específico, como Ano de Lançamento, Diretor, Gênero e Descrição.