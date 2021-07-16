var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColors = [];
var curIndex = 0;
var gameStarted = false;
var gameEnded = false;
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Button Press function
$("button").click(function (event) {
    if (gameStarted && !gameEnded) {
        userChosenColors.push(event.target.id);
        playSound(event.target.id);
        $(event.target).addClass("pressed");
        setTimeout(function () {
            $(event.target).removeClass("pressed");
        }, 100);
        checkAnswer();
    }
});


// Starting the game
$(document).keypress(function () {
    if (!gameStarted) {
        gameStarted = true;
        if (!gameEnded) nextSequence();
    }

    if (gameStarted && gameEnded) restart();
})

//generates some random colour to continue the sequence
function nextSequence() {
    gameStarted = true;
    level++;
    userChosenColors = [];
    curIndex = 0;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(300).fadeIn(300);
    playSound(randomChosenColor);
}

// wrong answer
function gameOver() {
    gameEnded = true;
    $("h1").text("-_- GAME OVER (Press any key to RESTART) -_-");
    playSound("wrong");

    $(document.body).addClass("game-over-body");
    $("h1").addClass("game-over-h1");

    setTimeout(function () {
        $(document.body).removeClass("game-over-body");
        $("h1").removeClass("game-over-h1");

        setTimeout(function () {
            $(document.body).addClass("game-over-body");
            $("h1").addClass("game-over-h1");

        }, 400);
    }, 300);
}

//compares expected and given answer
function checkAnswer() {
    if (gamePattern.length < userChosenColors.length) {
        gameOver();
    } else if (gamePattern[curIndex] !== userChosenColors[curIndex]) {
        gameOver();
    } else if (curIndex === level - 1) {
        gameStarted = false;
        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else {
        curIndex++;
    }
}

function restart() {
    buttonColors = ["red", "blue", "green", "yellow"];
    gamePattern = [];
    userChosenColors = [];
    curIndex = 0;
    gameStarted = true;
    gameEnded = false;
    level = 0;

    $(document.body).removeClass("game-over-body");
    $("h1").removeClass("game-over-h1");
    nextSequence();

    console.log(gameStarted);
    console.log(gameEnded);
}