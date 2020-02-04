var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tweets.findAll({}).then(function(foundTweets) {
      console.log("FOUND TWEETS!, ", foundTweets);
      // You want to send an array of the tweet strings back rather than an array of objects
      res.render("index", {
        msg: "Welcome!",
        examples: foundTweets
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/createQuestions/:id", function(req, res) {
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
