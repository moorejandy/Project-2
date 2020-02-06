var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tweets", function(req, res) {
    db.Tweets.findAll({}).then(function(dbTweets) {
      res.json(dbTweets);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
