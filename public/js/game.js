var card = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [
  {
    tweet:
      "______ are the greatest threat in the US to both bald eagles and golden eagles. Media claims fictional 'global warming is worse.'",
    question: "Fill in the blank",
    answers: ["Avian flu", "Windmills", "Hunting", "Coronavirus"],
    correctAnswer: "Windmills",
    image: "assets/images/toystory.gif"
  },
  {
    tweet:
      "So ridiculous. Greta must work on her Anger Management problem, then go to a good old fashioned movie with a friend! Chill Greta, Chill!",
    question: "How old was Greta when this tweet was sent?",
    answers: ["45", "67", "27", "16"],
    correctAnswer: "16",
    image: "assets/images/spicegirls.gif"
  },
  {
    tweet:
      "While _______ is an extremely unattractive woman, I refuse to say that because I always insist on being politically correct.",
    question: "Fill in the blank",
    answers: ["Hillary Clinton", "Megyn Kelly", "Bette Midler", "Betty White"],
    correctAnswer: "Bette Midler",
    image: "assets/images/spicegirls.gif"
  },
  {
    tweet:
      "________ is unattractive both inside and out. I fully understand why her former husband left her for a man - he made a good decision.",
    question: "Fill in the blank",
    answers: ["Arianna Huffington", "Nancy Pelosi", "Cher", "Betty White"],
    correctAnswer: "Arianna Huffinton",
    image: "assets/images/spicegirls.gif"
  },
  {
    tweet:
      "Great meeting with KimKardashian today, talked about prison reform and sentencing.",
    question: "True or False - This is a real tweet.",
    answers: ["True", "False"],
    correctAnswer: "True",
    image: "assets/images/spicegirls.gif"
  }
];

// Variable to hold our setInterval
var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append(
        "<button class='answer-button' id='button' data-name='" +
          questions[this.currentQuestion].answers[i] +
          "'>" +
          questions[this.currentQuestion].answers[i] +
          "</button>"
      );
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {
    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer
    );
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    } else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(window.timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append(
      "<h3>Unanswered: " +
        (questions.length - (this.incorrect + this.correct)) +
        "</h3>"
    );
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if (
      $(e.target).attr("data-name") ===
      questions[this.currentQuestion].correctAnswer
    ) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer +
        "</h3>"
    );
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend(
    "<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>"
  );
  game.loadQuestion.bind(game)();
});
