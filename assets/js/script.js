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
    title: "How does the original creator of the digital frontier refer to his computer creation?",
    options:["the Penguin", "the Waffle","the Grid","the Matrix"],
    answer:"the Grid"
},
{
    title: "Jeff Bridges is an iconic actor. Which character does he play in this film?",
    options:["Neuromancer", "Kevin Flynn","Justabeeper","El Grande Burrito"],
    answer:"Kevin Flynn"
},
{
    title: "What is the name of ENCOM's largest shareholder?",
    options:["Skip", "Sylvester","Sam","Sue"],
    answer:"Sam"
},
{
    title: "Where is the entrance to the digital world found?",
    options:["in an arcade", "at a library","in a zoo","a rabbit festival"],
    answer:"in an arcade"
}
,
{
    title: "Upon entering the digital world, the son of the creator is engaged in battle. He suffers some injuries during the battle. He is thereafter given a particular designation. What is it?",
    options:["loser", "snoozer","boozer","user"],
    answer:"user"
}
,
{
    title: "In the digital frontier, the son of the creator has enemies and friends. One nemesis happens to go by the acronym of CLU. What does CLU represent?",
    options:["Created Like Unicorns", "Could Like Users","Codified Likeness Utility","Cold Lake Underground"],
    answer:"Codified Likeness Utility"
}
,
{
    title: "The son of the creator has an ally in the quest. What is her name?",
    options:["Quidbot", "Quorra","QuequeQ","Quickness"],
    answer:"Quorra"
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
        
        var audio = new Audio('./assets/SFX/negative.aac');
        audio.play();
        timeLimit-=10;
        qCount++;
        
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
      //Easter EGG
      if (score === 0)
      {
          questionEl.textContent = "You got Derezzed";
          pEl.textContent = "Your knowledge about Tron is as good as a stormstropper aim.You should try again :)";
          startBtn.style.display = "";
          document.getElementById("easter-egg").style.display="block";

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
            lastScore = {...lastScore, ...localJson}
            
            console.log(lastScore);
            
            localStorage.setItem("quizScore", JSON.stringify(lastScore));
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

checkA(time);
}
startBtn.addEventListener("click",startQuiz)