module.exports = function(sequelize, DataTypes) {
  var Games = sequelize.define("Games", {
    score: DataTypes.INTEGER
  });

  Games.associate = function(models) {
    // We're saying that a Game should belong to a User
    // A game can't be created without a user due to the foreign key constraint
    Games.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Games;
};
