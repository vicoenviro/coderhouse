var express = require('express');
var router = express.Router();

const personas = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { personas, isEmpty: !personas.length });
});

router.post('/personas', function(req, res, next) {
  console.log('add:',req.body)
  personas.push(req.body)
  res.redirect('/');
});

module.exports = router;
