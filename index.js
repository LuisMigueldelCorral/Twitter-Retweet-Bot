const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var text = 'var Text'
var name = 'Var Name'

var Twitter = require('twitter');
var config = require('./config.js');
var Twitter = new Twitter(config);

// Set up your search parameters
// https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08
// https://www.codewall.co.uk/twitter-bot-tutorial-retweet-nodejs/
// https://codeburst.io/build-a-simple-twitter-bot-with-node-js-part-2-do-more-2ef1e039715d
// https://github.com/bmorelli25/Twitter-Favorite-Bot
// https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078
// https://github.com/bmorelli25/Twitter-Follow-Bot/blob/master/follow.js

// RETWEET BOT ==========================
// find latest tweet according the query 'q' in params
var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        result_type: 'recent',
        count: 1,
        lang: 'en'
    }
    // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets

    Twitter.get('search/tweets', params, function(err, data) {
      console.log("Dentro!");
      // if there no errors
        if (!err) {          
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            console.log("retweetId = " + retweetId);
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
        name = data.statuses[0].user.name;  
        text = data.statuses[0].text;              
        if(name != "lmcDevloper"){
          if(text.indexOf("https") != -1){
            console.log(data.statuses[0].text)            
            var link = text.split("https")[1].split(" ")[0];
            text = data.statuses[0].text + " > Enlace: " + link;
            postTweet(data.statuses[0].text + "\n\n" + "via @" + data.statuses[0].user.name)
          } 
          else{
              text = "Vaya estas intentando hacer retweet de un post que no tiene URL: <a href='https" + text + "'>Enlace</a>"
              console.log(data.statuses[0].text)
          }
        }               
        else{
          text = "Vaya estas intentando hacer retweet de un post propio"
          console.log(text)
        }
    });
}
retweet();
// grab & retweet as soon as program is running...
//retweet();
// retweet in every 50 minutes
// setInterval(retweet, 3000000);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function(){
  var params = {
      q: '#nodejs, #Nodejs',  // REQUIRED
      result_type: 'recent',
      lang: 'es'
  }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
    console.log(data)
  });
}
// grab & 'favorite' as soon as program is running...
// favoriteTweet();
// 'favorite' a tweet in every 60 minutes
// setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

var postTweet = function(txt){
  var params = {
      q: '#nodejs, #Nodejs',  // REQUIRED
      result_type: 'recent',
      lang: 'es'
  }
  Twitter.post('statuses/update', { status: txt }, function(err, data, response) {
    console.log(data)
  });
}
// postTweet('Hello World, Of Course by Nodejs!\nSalto de Línea');

function buttonAction1(res){
    res.send('ok');
}
router.get("/test1", function (req, res) {
    buttonAction1(res);
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', {text:text, name:name}))
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`))


