module.exports = function(sequelize, DataTypes) {
  var HighScores = sequelize.define("HighScores", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    score: DataTypes.INTEGER
  });
  return HighScores;
};
