module.exports = function(sequelize, DataTypes) {
  var Tweets = sequelize.define("Tweets", {
    name: { type: DataTypes.STRING, allowNull: false }
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
