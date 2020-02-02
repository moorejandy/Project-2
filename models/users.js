module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: { type: DataTypes.STRING, allowNull: false }
  });
  Users.associate = function(models) {
    // Associating User with Games
    // When a User is deleted, also delete any associated games
    Users.hasMany(models.Games, {
      onDelete: "cascade"
    });
  };

  return Users;
};
