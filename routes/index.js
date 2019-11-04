var express = require('express');
var router = express.Router();
var js = require('jservice-node');
//var popup = require('popups');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Jeopardy Question Search' });
  var options = {
    count: 100,
    offset: 25
  };
  js.categories(options, function(error, response, json){
      if(!error && response.statusCode == 200){
          console.dir(json);
          res.render('index', { title: 'Jeopardy Question Search', categories : json  })
      } else {
          console.log(`Error: ${response.statusCode}`);
      }
  });

});

router.post('/categories', function(req, res, next) {
  var options = {
    count: 100,
    offset: 0
  };
  js.categories(options, function(error, response, json){
      if(!error && response.statusCode == 200){
          console.dir(json);
          res.render('categories', { title: 'Jeopardy Question Search', categories : json  })
      } else {
          console.log(`Error: ${response.statusCode}`);
      }
  });
});

router.get('/categories', function(req, res, next){
  var options = {};
  options["offset"] = req.query.offset || 0;

    js.categories(options, function(error, response, json){
        if(!error && response.statusCode == 200){
            //console.dir(json);
            //console.log(response.id);
            json["offset"] = parseInt(options["offset"]);
            res.render('Categories', { title: 'Categories', categories : json })
        } else {
            console.log(`Error: ${response.statusCode}`);
        }
    });
});

router.post('/results', function(req, res, next) {

  const question_value = req.body.question_value;
  var options = {};
  if (req.body.category != 0) {
      options["category"] = req.body.category;
  }
  //console.log(req.query.category);

  if (question_value != 0) {
    options["value"] = parseInt(question_value);
    //console.log(question_value);
  }

  const min_date = req.body.start_date_field
  const max_date = req.body.end_date_field;

  if (min_date != undefined && max_date != undefined) {
    options["min_date"] = min_date;
    options["max_date"] = max_date;
  } else if (min_date != undefined) {
    options["min_date"] = min_date;
    options["max_date"] = new Date();
  } else if (max_date != undefined) {
    options["min_date"] = new Date(1964, 3, 30);
    options["max_date"] = max_date;
  }

  /*
  const min_month = req.body.min_month_field;
  const min_year = req.body.min_year_field;
  var min_day = req.body.min_day_field;
  var valid = new Boolean(true);

  if (min_day != 0 && min_day.length == 1) {
    min_day = "0" + min_day;
  }
  if (min_month != 0 && (min_year == 0 || min_day == 0)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (min_year != 0 && (min_month == 0 || min_day == 0)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (min_day != 0 && (min_month == 0 || min_year == 0)) {
    //popup.alert({content: "enter a valid date!"});
  } else if(min_day == 0 && min_month == 0 && min_year == 0) {
    valid = false;
  }

  const max_month = req.body.max_month_field;
  const max_year = req.body.max_year_field;
  var max_day = req.body.max_day_field;

  if (max_day.length == 1) {
    max_day = "0" + max_day;
  }
  if (max_month != 0 && (max_year == 0 || max_day == 0)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (max_year != 0 && (max_month == 0 || max_day == 0)) {
    //popup.alert({content: "enter a valid date!"});
  } else if (max_day != 0 && (max_month == 0 || max_year == 0)) {
    //popup.alert({content: "enter a valid date!"});
  } else if((valid && max_day == 0 && max_month == 0 && max_year == 0)
  || (!valid && max_day != 0 && max_month != 0 && max_year != 0)) {
    //popup.alert({content: "Please enter both a start and end date to search"});
  }

  if (min_day != 0 && min_month != 0 && min_year != 0 &&
    max_day != 0 && max_month != 0 && max_year != 0) {

      if ((min_year > max_year) || (min_year == max_year && min_month > max_month)
    || (min_year == max_year && min_month == max_month && min_day > max_day)) {
        //popup.alert({content: "start date must come before end date! please enter valid dates"});
      }

      var min_date = min_year + "-" + min_month + "-" + min_day;
      var max_date = max_year + "-" + max_month + "-" + max_day;
      options["min_date"] = min_date;
      options["max_date"] = max_date;
      console.log("min: " + min_date);
      console.log("max: " + max_date);
    }
    */

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
          json["fixedcategory"] = parseInt(options["category"]) || 0;
          res.render('results', { title: 'Search Results', results : json })
      } else {
          console.log(`Error: ${response.statusCode}`);
      }
  });
});

router.get('/results', function(req, res, next) {
  var options = {};
  options["category"] = req.query.category;
  options["offset"] = req.query.offset || 0;

  js.clues(options, function(error, response, json){
    if(!error && response.statusCode == 200){
      //console.dir(json);
      //console.log(response.id);
      json["offset"] = parseInt(options["offset"]);
      json["fixedcategory"] = parseInt(options["category"]) || 0;
      res.render('results', { title: 'Search Results', results : json })
    } else {
      console.log(`Error: ${response.statusCode}`);
    }
  });
});

module.exports = router;
