function errorMiddleware(err, req, res, next) { // eslint-disable-line
 
  res.status(400).json({ error: 'Something went wrong' });
}
module.exports = { errorMiddleware };