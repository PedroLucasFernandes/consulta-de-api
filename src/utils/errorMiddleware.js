function errorMiddleware(err, req, res, next) {
 
  console.log('test');

  res.status(500).json({ error: 'Something went wrong' });
}
module.exports = { errorMiddleware };