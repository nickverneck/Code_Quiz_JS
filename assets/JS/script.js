//setting variables from all the html components that will be used in the code

var startBtn= document.getElementById("start");
var answerList = document.querySelector(".list-group");
var liEl = document.querySelectorAll(".list-group-item");
var questionEl = document.getElementById("question");
var timerEl = document.getElementById("timer");
var pEl = document.querySelector("p");
var btnScore = document.getElementById("btn-add-score");
var initialsEl = document.getElementById("initials");
//setting var to hold time limit 
var timeLimit = 75;
//setting array with all the questions
var questions = [{
    title: "question one?!",
    options:["option one", "option two","numba 3","hey its faur"],
    answer:"numba 3"
},
{
    title: "question two?!",
    options:["option a", "option b","its c","hey its D"],
    answer:"its c"
},
{
    title: "question 3?!",
    options:["option a", "option b","its c","hey its D"],
    answer:"option a"
}
];
//Lets create a function to grab the questions array and populate the options elements with the array values

function fillQuestion(i)
{

    questionEl.textContent= questions[i].title;
    for (j= 0; j < liEl.length ; j++)
    {
        liEl[j].textContent = questions[i].options[j];
    }
  

}
//Lets check which option the user has clicked then compare with the answer
// If the user picked the wrong answer he loses time
// if there is more question and the limit still bigger than zero we display the next question
//otherwise we just call it game over!

function checkA(time)
{
   var qCount = 0;
   var score = 0;
 answerList.addEventListener('click', event =>{
     if (event.target.classList.contains('list-group-item'))
     {
        var answer = questions[qCount].answer;
         
        if (answer == event.target.textContent)
        {
            var audio = new Audio('./assets/SFX/positive.aac');
            audio.play();
            qCount++;
            score+=5;
        
          if (qCount < questions.length && timeLimit > 0)
          {
            
            fillQuestion(qCount)
          
          }
          else
          {
              qCount= 0;
              gameover(time,score)
              return
              
          }
        }
    else
    {
        console.log(qCount)
        var audio = new Audio('./assets/SFX/negative.aac');
        audio.play();
        timeLimit-=10;
        qCount++;
        
        if (qCount < questions.length && timeLimit > 0)
        {
        fillQuestion(qCount)
        console.log("wrong" + event.target.textContent)
    }
    else
    {
        qCount= 0;
        gameover(time,score)
        return
    }
    }
        
     }
 })
}

//This function takes care of the countdown in seconds and display to the user. 

function countDown() {
    
  
    
    var timeInterval = setInterval(function () {
     timeLimit--
     timerEl.textContent ="Time: " + timeLimit + " seconds";
     //Game Over!
     if (timeLimit<=0)
     {
       clearInterval(timeInterval);
     
     }
     
    },1000);
    return timeInterval
  }

  //this function deals with the game over aspect of the quiz
  // it will stop the timer and hide the quiz elements
  // then it will show the user it's score which is a sum of the time left and the points for each right question
  // if user didnt get any question right he is asked to try again.
  //if user got some score he is shown elements to add his score to the scoreboard.

  function gameover(timeInterval,score)
  {
     
      clearInterval(timeInterval);
      
      answerList.style.display = "none";
      pEl.style.display = "block";
      if (score === 0)
      {
          questionEl.textContent = "You got Derezzed";
          pEl.textContent = "Your knowledge about Tron is as good as a stormstropper aim.You should try again :)";
          startBtn.style.display = "block";
      }
      else
      {
        score+= timeLimit;
        document.querySelector(".add-score").style.display = "block";
        questionEl.textContent = "Congratulations!";
        pEl.textContent = "Your total score is: "+score;
        btnScore.addEventListener("click",event =>{
            var lastScore = JSON.parse(localStorage.getItem("quizScore"));
            var userVal = initialsEl.value.trim() ;
            var localJson = {[userVal] :score}
            
            lastScore.userVal = score;
            console.log(lastScore);
            
            localStorage.setItem("quizScore", JSON.stringify(localJson));
            pEl.textContent = "Hey,"+userVal +" your score of: "+score+" has been saved to the score list" ;
            document.querySelector(".add-score").style.display = "none";
        })
          

      }



  }

  // this function will start the quiz once the startBtn has been clicked
  // It will take away the initial screen , start the timer and load the first question with it's options
function startQuiz(event)
{
timeLimit = 75;
answerList.style.visibility = "visible";
answerList.style.display = "block";
pEl.style.display = "none";
startBtn.style.display = "none";
timerEl.textContent ="Time: " + timeLimit + " seconds";
// fill up the first index of question and start the function to check if user clicked on the option
var time = countDown();
fillQuestion(0);
console.log(questions)
checkA(time);
}
startBtn.addEventListener("click",startQuiz)