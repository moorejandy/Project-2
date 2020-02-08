var card = $("#quiz-area");
var countStartNumber = 20;

// Question set
var questions = [
  {
    tweet:
      "______ are the greatest threat in the US to both bald eagles and golden eagles. Media claims fictional 'global warming is worse.'",
    question: "Fill in the blank",
    answers: ["Avian flu", "Windmills", "Hunting", "Coronavirus"],
    correctAnswer: "Windmills",
    imageC: "../images/Tright1.webp",
    imageW: "../images/Twrong1.webp"
  },
  {
    tweet:
      "So ridiculous. Greta must work on her Anger Management problem, then go to a good old fashioned movie with a friend! Chill Greta, Chill!",
    question: "How old was Greta when this tweet was sent?",
    answers: ["45", "67", "27", "16"],
    correctAnswer: "16",
    image: "assets/images/spicegirls.gif",
    imageC: "../images/Tright2.webp",
    imageW: "../images/Twrong2.webp"
  },
  {
    tweet:
      "While _______ is an extremely unattractive woman, I refuse to say that because I always insist on being politically correct.",
    question: "Fill in the blank",
    answers: ["Hillary Clinton", "Megyn Kelly", "Bette Midler", "Betty White"],
    correctAnswer: "Bette Midler",
    imageC: "../images/Tright3.webp",
    imageW: "../images/Twrong3.webp"
  },
  {
    tweet:
      "________ is unattractive both inside and out. I fully understand why her former husband left her for a man - he made a good decision.",
    question: "Fill in the blank",
    answers: ["Arianna Huffington", "Nancy Pelosi", "Cher", "Betty White"],
    correctAnswer: "Arianna Huffington",
    imageC: "../images/Tright1.webp",
    imageW: "../images/Twrong1.webp"
  },
  {
    tweet:
      "Great meeting with KimKardashian today, talked about prison reform and sentencing.",
    question: "True or False - This is a real tweet.",
    answers: ["True", "False"],
    correctAnswer: "True",
    imageC: "../images/Tright2.webp",
    imageW: "../images/Twrong2.webp"
  }
];

// Variable to hold our setInterval
// var timer;

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

    // card.html("<h2>" + questions[this.currentQuestion].tweet + "</h2>");

    card.html(
      "<h1>" +
        questions[this.currentQuestion].tweet +
        "</h1>" +
        "<br>" +
        "<h2>" +
        questions[this.currentQuestion].question +
        "</h2>"
    );

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
    card.append("<img src='" + questions[this.currentQuestion].imageW + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    } else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
    card.append("<br><button id='start-over'>Exit Game?</button>");
    this.results();
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
    card.append("<br><button id='start-over'>Exit-Game</button>");
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
    card.append("<img src='" + questions[this.currentQuestion].imageW + "' />");

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
    card.append("<img src='" + questions[this.currentQuestion].imageC + "' />");

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

// $(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", "#start-over", function() {
  event.preventDefault();

  var score = game.correct;

  $.ajax("/game/create", {
    method: "POST",
    data: score
    // eslint-disable-next-line no-unused-vars
  }).then(function(data) {
    console.log(score);
  });
  window.location.href = "/";
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#quiz-area").show();
  $("#sub-wrapper").prepend(
    "<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>"
  );
  game.loadQuestion.bind(game)();
});

$("#start-button").on("submit", function(event) {
  event.preventDefault();

  var name = $(this)
    .children("#start-button")
    .val();

  var name = $("#textbox").val();

  $.ajax("/users/create", {
    method: "POST",
    data: name
    // eslint-disable-next-line no-unused-vars
  }).then(function(data) {
    console.log("++++++++++++++");
    console.log(data.dataValues.id);
    console.log("++++++++++++++");
    game.userID = data.dataValues.id;
  });
});

$("#start-over").on("submit", function(event) {
  event.preventDefault();

  var score = game.correct;

  $.ajax("/game/create", {
    method: "POST",
    data: {
      UserId: game.userID,
      score: score
    }
    // eslint-disable-next-line no-unused-vars
  }).then(function(data) {
    console.log(score);
  });
});
