module.exports = function(sequelize, DataTypes) {
  var Qanswers = sequelize.define("Qanswers", {
    question: DataTypes.STRING,
    ansOne: DataTypes.STRING,
    anstwo: DataTypes.STRING,
    ansThree: DataTypes.STRING,
    ansFour: DataTypes.STRING,
    correct: DataTypes.STRING
  });

  Qanswers.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Qanswers.belongsTo(models.Tweets, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Qanswers;
};
