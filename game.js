var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startedGame = false;
var level = 0;

$(document).keypress(function () {
  if (!startedGame) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startedGame = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  console.log(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];

  animatePress(randomChosenColor);

  playSound(randomChosenColor);

  console.log(randomChosenColor);

  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
}

$(".btn").click(function () {

  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  animatePress(userChosenColor);

  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);

  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press any key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  startedGame = false;
  level = 0;
}