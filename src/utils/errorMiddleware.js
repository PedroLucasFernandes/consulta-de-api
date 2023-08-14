function errorHandler(err, req, res, next) {
    console.error(err);
  
    // Tratar diferentes tipos de erros, se necessário
    if (err.response) {
      // Erro de resposta da API
      return res.status(err.response.status).json({
        error: 'Erro na API',
        message: err.response.data.message
      });
    } else if (err.request) {
      // Erro de requisição
      return res.status(500).json({
        error: 'Erro na requisição à API',
        message: 'Não foi possível se conectar à API'
      });
    } else {
      // Outros tipos de erro
      return res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Ocorreu um erro interno no servidor'
      });
    }
  }
  module.exports = errorHandler;