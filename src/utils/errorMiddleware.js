
function errorMiddleware(err, req, res, next) { // eslint-disable-line
  console.error(err.status);
  
  res.status(400).json({ error: 'Something went wrong' });

}
module.exports = { errorMiddleware };