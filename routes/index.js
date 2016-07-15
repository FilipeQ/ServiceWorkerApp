var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Service Worker example' });
});

/**
 * Simulate one notice json
 * */
router.get('/getSimulateNotice', function(req, res, next) {

  var content = {
    title:'Portugal welcomes home its conquering heroes',
    img:'http://img.uefa.com/MultimediaFiles/Photo/competitions/Comp_Matches/02/39/08/43/2390843_w1.jpg',
    description:"The day after winning UEFA EURO 2016, Portugal received a rapturous reception in Lisbon, with the nation's president Marcelo Rebelo de Sousa leading the tributes to Fernando Santos's side. Escorted by two F-16 jets from the national air force, Portugal's plane touched down at Lisbon's Humberto Delgado Airport at 12:40, and was immediately bombarded by two water cannons, pumping out jets of spray in the national-team colours, red and green. Captain Cristiano Ronaldo and coach Fernando Santos were first off the flight, the rest of the team following them on to the tarmac with A Minha Casinha (my modest little house – the song that has been this team's anthem in France) blaring out from the airport speakers."+
    "Two open-topped buses then took the team on to meet the president the Palácio de Belém, with Ronaldo wearing a flag from his native Madeira round his neck and a Portuguese flag round his waist. With thousands of cheering fans watching on, Marcelo Rebelo de Sousa said of the team: 'You are an example. You won with courage, determination, fighting spirit and humility. Thanks to you, we all have one more reason to believe in Portugal.'"
  };
  res.json(content);
});

module.exports = router;
