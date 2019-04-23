var currentQuestion;
var questions = [];
var randQuestions = [];
var grade = 0;
var skipedQ = [];
var finalphase = false ; 
var checkedAns = false;
var isSkip = false;
var finished = false;// This means that the exam questions reached the end
var next ;
var rightSection = document.getElementById("right");
var labels = document.getElementsByTagName("label");
var choices = document.getElementsByClassName("choice");
var skipButton = document.getElementById("skip");
class Question {
    constructor(questionHeader, ans1, ans2, ans3, ans4, correctAns) {
        this.questionHeader = questionHeader;
        this.ans1 = ans1;
        this.ans2 = ans2;
        this.ans3 = ans3;
        this.ans4 = ans4;
        this.correctAns = correctAns;
    }
}
function startExam() {
    init();
    getRandomQuestions();
    currentQuestion = 0;
    document.getElementById("question").textContent = randQuestions[currentQuestion].questionHeader;
    for (var i = 0; i < choices.length; ++i) {
        choices[i].checked = false;
    }
    labels[0].childNodes[2].textContent = randQuestions[currentQuestion].ans1;
    labels[1].childNodes[2].textContent = randQuestions[currentQuestion].ans2;
    labels[2].childNodes[2].textContent = randQuestions[currentQuestion].ans3;
    labels[3].childNodes[2].textContent = randQuestions[currentQuestion].ans4;
}
function SubmitExam() {
    document.getElementById("left").style.display = "none";
    document.getElementById("right").style.display = "none";
    document.getElementById("page").style.justifyContent = "center";
    document.getElementById("resultPage").style.display = "flex";
    document.getElementById("grade").innerText = grade;
}
function generateNewQ() {
    if (currentQuestion == 4 && skipedQ.length == 0 || finished) {
        SubmitExam();//To submit exam and show result
    }
    else if(currentQuestion < 4 && !finalphase){
        if(!isSkip){
            ++currentQuestion;
        }
        else if(isSkip){// in case of on a skipped question
            currentQuestion = next;
            isSkip = false;
        }
    }
    else{//Show all skipped question in the end of the exam
        finalphase = true;
        skipButton.style.display = "none";
        currentQuestion = skipedQ[0].skipedNum;
        skipedQ.splice(0,1);
        if(skipedQ.length == 0)
        {
            finished = true;//the last question to answer
        }
        rightSection.innerHTML = '';
    }
    for (var i = 0; i < choices.length; ++i) {
        choices[i].checked = false;// initializing all choices unchicked
    }
    document.getElementById("question").textContent = randQuestions[currentQuestion].questionHeader;
    labels[0].childNodes[2].textContent = randQuestions[currentQuestion].ans1;
    labels[1].childNodes[2].textContent = randQuestions[currentQuestion].ans2;
    labels[2].childNodes[2].textContent = randQuestions[currentQuestion].ans3;
    labels[3].childNodes[2].textContent = randQuestions[currentQuestion].ans4;
    if (currentQuestion == 4 && skipedQ.length == 0 || finished) {//Final question to answer
        document.getElementById("next").innerHTML = "Submit";
        skipButton.style.display = "none";
    }
}
function GetNext() {
    for (var i = 0; i < 4; ++i) {
        if (choices[i].checked) {
            IsCorrect(i);
            checkedAns = true;
        }
    }
    var sure;
    if (!checkedAns) {
        sure = confirm("Are you sure you'll not answer this question");
        if (sure) {
            generateNewQ();
        }
    }
    else {
        generateNewQ();
    }

}
function init() {
    questions.push(new Question("Jenny ___________ tired.", "be", "is", "has", "have", "is"))
    questions.push(new Question(
        ' ___________ is she? She is my friend from London', "Who", "Why"
        , "Which", "What", "Who"));
    questions.push(new Question("Today is Wednesday. Yesterday it ___________ Tuesday.",
        "were", "is", "be", "was", "was"));

    questions.push(new Question("It's Thursday today. Tomorrow it ___________ Friday.",
        "be", "was", "will be", "will", "will be"));
    questions.push(new Question(" ___________ lots of animals in the zoo.", "There"
        , "There is", "There are", "There aren't", "is"));
    questions.push(new Question("How many people ___________ in your family?",
        "are there", "is there", "there are", "there", "are there"));
    questions.push(new Question(
        'Has Steve got a sister? No, he ___________, but he has got 2 brothers.'
        , "has", "hasn't", "haven't", "not", "hasn't"));
    questions.push(new Question("Where ___________ Sarah live?", "are", "is",
        "do", "does", "does"));
    questions.push(new Question(
        " ___________ to London on the train yesterday?", "Did Mary went"
        , "Did Mary go", "Mary go", "Mary goes", "Did Mary go"));

    questions.push(new Question(
        "Jack ___________ English, Spanish and a bit of French."
        , "speaks", "speak", "speaking", "is speaking"
        , "speaks"));

}
function getRandomQuestions() {
    for (let i = 0; i < 5; ++i) {
        let randIdx = Math.floor(Math.random() * questions.length);
        randQuestions.push(questions[randIdx]);
        questions.splice(randIdx, 1);
    }
}
function skiQuestion() {
    skipedQ.push({
        skipedNum: currentQuestion, 
        next: 0 // To get the next of this skipped quesion in case clicked on it
    });
    var newQDiv = document.createElement("div");
    newQDiv.style.textAlign = "center"
    newQDiv.style.backgroundColor = "maroon";
    newQDiv.style.marginBottom = "5px";
    var newQA = document.createElement("a");
    var newSpan = document.createElement("span");
    rightSection.appendChild(newQDiv).appendChild(newQA);
    rightSection.appendChild(newQDiv).appendChild(newSpan);
    newQA.setAttribute("href", skipedQ.length-1);
    newQA.innerHTML = "Question ";
    newQA.style.textAlign = "center";
    newQA.style.padding = "5px"
    newSpan.innerHTML = (currentQuestion + 1);
    generateNewQ();
    newQA.addEventListener("click", function (event) {
        event.preventDefault();
        var questionIdx = Number(this.getAttribute("href"));
        var skippedQNumber = Number(document.getElementsByTagName("span")[questionIdx].innerHTML);
        skipedQ[questionIdx].next = currentQuestion;
        next = currentQuestion;
        currentQuestion = (skippedQNumber - 2);
        //next = skipedQ[questionIdx].next;
        generateNewQ();
        for(var r = questionIdx+2 ; r < rightSection.childNodes.length ; ++r){
            var element = rightSection.childNodes[r].getElementsByTagName("a")[0];
            element.setAttribute("href",Number(element.getAttribute("href"))-1);
        }
        rightSection.removeChild(rightSection.childNodes[questionIdx+1]);
        skipedQ.splice(questionIdx, 1);
        isSkip = true;
    });
}
function IsCorrect(selected) {
    if (labels[selected].childNodes[2].textContent == randQuestions[currentQuestion].correctAns) {
        grade++;
    }
}
document.getElementById("next").addEventListener("click", GetNext);
document.getElementById("skip").addEventListener("click", skiQuestion);
startExam();
