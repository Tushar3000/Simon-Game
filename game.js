userClickedPattern=[];
gamePattern=[];
buttonColours = ["red", "blue", "green", "yellow"]
var started=false;
var level=0
var randomChosenColour;
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        
        console.log("success");
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(() => {
                nextSequence();
                
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
            
        }, 200);
        $("h1").html("Game Over, Press Any Key to Restart")
        startOver();
    }

}
function nextSequence(){
    userClickedPattern=[];
    level++;
    
    var randomNumber = Math.floor(Math.random()*4);
   
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
   
   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("h1").html("level "+level);
  
}

function playSound(name)
{
    var audio = new Audio("./sounds/"+name+".mp3");
   audio.play();
}
$(".btn").click(function(event){
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length-1)
})
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
   
}
$(document).keyup(function(){
    if(!started)
    {
    $("h1").html("level "+level);
     started=true;
    nextSequence();
    }
    
})
function startOver()
{
    started=false;
    gamePattern=[];
   level=0;
}
