module.exports = function(sequelize, DataTypes) {
  var Tweets = sequelize.define("Tweets", {
    tweet: { type: DataTypes.STRING },
    question: { type: DataTypes.STRING },
    ansOne: { type: DataTypes.STRING },
    anstwo: { type: DataTypes.STRING },
    ansThree: { type: DataTypes.STRING },
    ansFour: { type: DataTypes.STRING },
    correct: { type: DataTypes.STRING }
  });
  return Tweets;
};
