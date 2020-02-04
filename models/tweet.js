var Sequelize = require("sequelize");
var config = require("../config/config.json");

var env = process.env.NODE_ENV || "development";

var activeConfig = config[env];

var connection = new Sequelize(
  activeConfig.database,
  activeConfig.username,
  activeConfig.password,
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = function(sequelize, DataTypes) {
  var Tweets = sequelize.define("Tweets", {
    tweet: { type: DataTypes.STRING }
  });

  connection
    .sync({
      force: true
    })
    .then(function() {
      Tweets.create({
        tweet:
          "______ are the greatest threat in the US to both bald eagles and golden eagles. Media claims fictional 'global warming is worse."
      });
      // eslint-disable-next-line no-empty-function
    });
  Tweets.associate = function(models) {
    // Associating User with Games
    // When a User is deleted, also delete any associated games
    Tweets.hasMany(models.Qanswers, {
      onDelete: "cascade"
    });
  };
  return Tweets;
};
