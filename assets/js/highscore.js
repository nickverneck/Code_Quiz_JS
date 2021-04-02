var divScore = document.getElementById("score");

var lastGrade = JSON.parse(localStorage.getItem("quizScore"));
for (i = 0 ; i < Object.keys(lastGrade).length; i++)
{
    var h3 = document.createElement("h3");
    h3.textContent ="user: "+Object.keys(lastGrade)[i]+" score:"+Object.values(lastGrade)[i];
    divScore.append(h3);
}
