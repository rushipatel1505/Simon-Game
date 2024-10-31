var userClickedPattern = [];

var gamePattern = [];

var buttonColor = ["red","blue","green","yellow"];

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
      
}

$(".btn").click(function(){
    //alert("it got clicked !");
    
    var userChosenColour  = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //console.log(userClickedPattern);
    //alert("done");
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");}, 100);
}
var started = false;
var level = 0;
$(document).keypress(function (){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;   
    }   
});

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        //console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout( function(){
                nextSequence();}, 1000);
        }
    }else{
        var audio = new Audio("sounds/wrong"+ ".mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");}, 200);
        //console.log("wrong");
        $("#level-title").text("Game over, Press any key to restart.");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}