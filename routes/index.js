var express = require('express');
var router = express.Router();
var js = require('jservice-node');
//var popup = require('popups');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jeopardy Question Search' });
});

router.post('/results', function(req, res, next) {

  const question_value = req.body.question_value;
  var options = {};
  options["category"] = req.query.category;

  if (question_value != 0) {
    options["value"] = parseInt(question_value);
    console.log(question_value);
  }

  const min_month = req.body.min_month_field;
  const min_year = req.body.min_year_field;
  var min_day = req.body.min_day_field;
  if (min_day.length == 1) {
    min_day = "0" + min_day;
  }
  if (min_month != undefined && (min_year == undefined || min_day == undefined)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (min_year != undefined && (min_month == undefined || min_day == undefined)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (min_day != undefined && (min_month == undefined || min_year == undefined)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (min_day != undefined && min_month != undefined && min_year != undefined) {
    var min_date = min_year + "-" + min_month + "-" + min_day + "T00:00:00.000Z";
    options["min_date"] = min_date;
    console.log(min_date);
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
