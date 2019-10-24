var express = require('express');
var router = express.Router();
var js = require('jservice-node');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jeopardy Question Search' });
});

router.post('/results', function(req, res, next) {
  const question_value = req.body.question_value;
  var options = {};
  if (question_value != 0) {
    options["value"] = parseInt(question_value);
    console.log(question_value);
  }
  //var options = {
      //value: parseInt(question_value),
      //min_date: '2014-02-14T01:53:20.027Z',
      //max_date: '2018-05-14T01:53:20.027Z',
  //};
  const search = req.body.name_field;
  js.clues(options, function(error, response, json){
      if(!error && response.statusCode == 200){
          //console.dir(json);
          //console.log(response.id);
          res.render('results', { title: 'Search Results', results : json })
      } else {
          console.log(`Error: ${response.statusCode}`);
      }
  });
});

module.exports = router;
