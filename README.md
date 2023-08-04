# Avaliação Sprint 2 - Programa de Bolsas Compass UOL / AWS e FATEC
Avaliação da segunda sprint do programa de bolsas Compass UOL para formação em machine learning para AWS.

***

## Sistema de consumo de API

### Proposta
A proposta do programa é fazer o usuário consumir a API OMBDb para verificar filmes conforme sua pesquisa. Esta consulta será feita através de uma aplicação WEB.
### Como foi desenvolvido
Inicialmente, todos os membros do grupo instalaram algumas dependências no Node.JS (via ``npm``) para configurar o ambiente de desenvolvimento.
```json
{
  "dependencies": {
    "axios": "^1.4.0",
    "dotenv": "^16.3.1",
    "env": "^0.0.2",
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
Ao iniciar o servidor utilizando o comando ``npm run dev`` no terminal, o link http://localhost:3000 será disponibilizado, clique para acessar a WEB.
Na página, temos uma pequena caixa de busca, digite um termo e clique no botão "Pesquisar". Após isso, uma lista de filmes aparecerá na tela, com imagens e nomes de longametragens que coincidem com o termo pesquisado.
Também será possível clicar em algum dos pôsteres para mostrar detalhes do filme em específico, como Ano de Lançamento, Diretor, Gênero e Descrição.