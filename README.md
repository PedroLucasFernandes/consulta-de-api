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
.env
.env.exemple
.eslintrc.js
index.js
package-lock.json
package.json
.gitignore
README.md
```
### Explicando as funções

### Como utilizar o sistema
Ao iniciar o servidor utilizando o comando ``npm run dev`` no terminal, o link http://localhost:3000 será disponibilizado, clique para acessar a WEB.
Na página, temos uma pequena caixa de busca, digite um termo e clique no botão "Pesquisar". Após isso, uma lista de filmes aparecerá na tela, com imagens e nomes de longametragens que coincidem com o termo pesquisado.
Também será possível clicar em algum dos pôsteres para mostrar detalhes do filme em específico, como Ano de Lançamento, Diretor, Gênero e Descrição.