
function errorMiddleware(err, req, res, next) { // eslint-disable-line
  switch (err.status) {
    case 401:
      res.status(401).render('error', { error: `${err.message} (Not authorized)` });
      break;

    case 404:
      res.status(404).render('error', { error: `${err.message} (Data not found)` });
      break;

    case 503:
      res.status(503).render('error', { error: `${err.message} (Service unavailable)` });
      break;

    case 502:
      res.status(502).render('error', { error: `${err.message} (Bad gateway)` });
      break;

    default:
      res.status(500).render('error', { error: `${err.message} (Unexpected Error)` });
      break;
  }

}
module.exports = { errorMiddleware };