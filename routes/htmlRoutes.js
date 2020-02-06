var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/all-tweets", function(req, res) {
    db.Tweets.findAll({ raw: true }).then(function(foundTweets) {
      // Before { raw: true } => data looked like this [{ dataValues: { id: 1, tweet: 'someTweet' } }],
      // After { raw: true } => data looks like this [{ id: 1, tweet: 'someTweet' }]
      console.log("FOUND TWEETS!, ", foundTweets);
      // You want to send an array of the tweet strings back rather than an array of objects
      res.render("index", {
        msg: "Welcome!",
        examples: foundTweets
      });
    });
  });

  // Load example page and pass in an example by id
  // Change Example to Tweets so you're getting data from Tweets table
  // Make sure you are getting JS objects by using { raw: true }
  // rename the variables to reference tweet instead of example so dbExample => dbTweet // this is just a convention thing, it will still work without renaming
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/createQuestions/:id", function(req) {
    db.Tweets.findOne({ where: { id: req.params.id } }).then(function(
      foundTweet
    ) {
      if (foundTweet) {
        db.Qanswers.create({
          TweetId: foundTweet.id,
          question: "Fill in the blank",
          ansOne: "Hillary Clinton",
          anstwo: "Bette Midler",
          ansThree: "Megyn Kelly",
          ansFour: "Betty White",
          correct: "Bette Midler"
        });
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
