var express = require('express');
var router = express.Router();
var js = require('jservice-node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jeopardy Question Search' });
});

router.get('/results', function(req, res, next) {
  res.render('results', { title: 'Search Results' });
  var options = {
      min_date: '2014-02-14T01:53:20.027Z',
      max_date: '2018-05-14T01:53:20.027Z',
  };
  js.clues(options, function(error, response, json){
      if(!error && response.statusCode == 200){
          console.dir(json);
          console.log(response.id)
      } else {
          console.log(`Error: ${response.statusCode}`);
      }
  });
});

module.exports = router;
