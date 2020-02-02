var Sequelize = require("sequelize");

var connection = new Sequelize("Trump_db", "root", "", {
  host: "localhost",
  dialect: "mysql"
});
module.exports = function(sequelize, DataTypes) {
  var Qanswers = sequelize.define("Qanswers", {
    question: { type: DataTypes.STRING },
    ansOne: { type: DataTypes.STRING },
    anstwo: { type: DataTypes.STRING },
    ansThree: { type: DataTypes.STRING },
    ansFour: { type: DataTypes.STRING },
    correct: { type: DataTypes.STRING }
  });
  connection
    .sync({
      force: true
    })
    .then(function() {
      Tweets.create({
        question: "Fill in the blank",
        ansOne: "Hillary Clinton",
        anstwo: "Bette Midler",
        ansThree: "Megyn Kelly",
        ansFour: "Betty White",
        correct: "Bette Midler"
      });
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
