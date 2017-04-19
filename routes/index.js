var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Talk = mongoose.model('Talk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home.html', { title: 'Express' });
});

router.get('/talks', function(req, res, next) {
  Talk.find(function(err, talks){
    if(err){ return next(err); }
    res.json(talks);
  });
});

router.param('talk', function(req, res, next, id) {
  var query = Talk.findById(id);
  query.exec(function (err, talk){
    if (err) { return next(err); }
    if (!talk) { return next(new Error("can't find talk")); }
    req.talk = talk;
    return next();
  });
});

router.get('/talks/:talk', function(req, res) {
  res.json(req.talk);
});

router.post('/talks', function(req, res, next) {
  var talk = new Talk(req.body);
  talk.save(function(err, talk){
    if(err){ return next(err); }
    res.json(talk);
  });
});

router.put('/talks/:talk/upvote', function(req, res, next) {
  req.talk.upvote(function(err, talk){
    if (err) { return next(err); }
    res.json(talk);
  });
});

router.put('/talks/:talk/downvote', function(req, res, next) {
  req.talk.downvote(function(err, talk){
    if (err) { return next(err); }
    res.json(talk);
  });
});

router.delete('/talks/:talk', function(req, res) {
  console.log("in Delete");
  req.talk.remove();
  res.json(req.talk);
});

module.exports = router;
