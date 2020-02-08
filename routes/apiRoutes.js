var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/games", function(req, res) {
    db.Games.findAll({}).then(function(dbGames) {
      res.json(dbGames);
    });
  });

  // Create a new user
  app.post("/users/create", function(req, res) {
    db.Users.create({
      name: req.body.name
    }).then(function(dbUsers) {
      console.log(dbUsers);
      res.redirect("/game");
    });
  });

  app.post("/game/create", function(req, res) {
    db.Games.create({
      score: score
    }).then(function(dbGames) {
      console.log(dbGames);
      res.redirect("/");
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
};
