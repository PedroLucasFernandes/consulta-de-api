
function errorMiddleware(err, req, res, next) { // eslint-disable-line
  console.error(err.status);
  
  switch(err.status){
    case 401 :
      res.status(401).json({ error: 'Not authorized' });
    break;

    case 404 :
      res.status(404).json({ error: 'Data not found'});
    break;

    case 503 :
      res.status(503).json({ error: 'Service unavailable'});
    break;

      case 500 :
        res.status(500).json({ error: 'Internal server error'});
      break;
  }
 // res.status(400).json({ error: 'Something went wrong' });

}
module.exports = { errorMiddleware };