var express = require("express");

var router = express.Router();
// edit burger model to match sequelize
var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/users");
});

// get route, edited to match sequelize
router.get("/tweets", function(req, res) {
  // replace old function with sequelize function
  db.Tweets.findAll()
    // use promise method to pass the burgers...
    .then(function(dbTweets) {
      console.log(dbTweets);
      // into the main index, updating the page
      var hbsObject = { tweet: dbTweets };
      return res.render("index", hbsObject);
    });
});

// post route to create burgers
router.post("/users/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.Users.create({
    name: req.body.name
  })
    // pass the result of our call
    .then(function(dbUsers) {
      // log the result to our terminal/bash window
      console.log(dbUsers);
      // redirect
      res.redirect("/");
    });
});

// // put route to devour a burger
// router.put("/burgers/update/:id", function(req, res) {
//   // update one of the burgers
//   db.Burger.update({
//     devoured: true
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }
//   ).then(function(dbBurger) {
//     res.json("/");
//   });
// });

module.exports = router;
