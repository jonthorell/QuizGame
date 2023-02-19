//"use strict";

//start with defining some constants

const welcomePhrase = "Another visitor!\nStay a while, stay forever!";
const gameTitle = "the music quiz master";
const maxQuestions = 10; //number of questions to be asked
const professor = "Professor Elvin Atombender thinks you won't escape.\nBonuspoint if you know where the quote comes from!";
const myQuestionsArray = []; // empty array at first. Will contain all questions
const message = "Welcome to the game! Please click an answer to proceed."; //start message
const scores = []; // array that will hold four values: 0=current number of rights, 1=current number of wrongs, 2=current question on display. 3=value of where in loop. WIll be updated by scoring functions
const myPath = "assets/questions/"; //base url for files used for the questions
scores.push(0, 0, 1, 1); // make sure default values are there
//const questionsArray = []; // empty array at first. Will contain all questions. Teemporary
const myStartModal = `<span class="close">&times;</span>
<h1 class="center-text"><i class="fa-brands fa-quora"></i>uiz Master <i class="fa-solid fa-registered fa-2xs"></i></h1>
<h2 class="center-text">Rules of the Game</h2>
<p class="center-text">You will answer 10 randomly chosen questions regarding music.</p>
<p class="center-text">The game is scored as follows:</p>
<p class="center-text">1. Every question answered correctly will give you an added score of
    50.</p>
<p class="center-text">2. Every question answered incorrectly will deduct 70 points to discourage from just guessing.</p>
`; //start-value of the modal. Gets re-written into the innerHTML at appropiate times

createEvtListeners(); // create event listeners for user interactivity
createQuestionsFromFiles(); // create array with quiz questions. WIll only run once

// initialize display
document.getElementById('welcome').innerText = welcomePhrase;
document.getElementById('game-title').innerText = gameTitle;
document.getElementById('dbase').innerText = "The game consists of " + myQuestionsArray.length + " questions.";
document.getElementById('dbase').style.color = "white"; //no title
document.getElementsByClassName('modal-content')[0].innerHTML = myStartModal; //populate modal with rules-html

// all functions starts here. No code should be outside functions from this point on

/**
 * Creates an array with all the questions and their properties using files saved under assets/questions
 */
function createQuestionsFromFiles() {
    //this function creates the necessary array of questions to be asked from 6 textfiles located under assets/questions.
    //questions.txt contains the question itself. option1-4 contains the different answers that will be used to populate the answer buttons
    //right.txt contain the value of which option is correct.
    //The directory also contain a questions.xlsx file to use as a template. You basically add, remove rows and/or change values in it
    //and then cut-and-paste the column into the corresponding text-file

    let request;
    let textfileContent;

    //Every 'grab' part grabs a textfile from within the assets folder and adds every line to a new row to an array

    //grab questions
    request = new XMLHttpRequest();
    request.open('GET', myPath + "questions.txt", false);
    request.send();
    textfileContent = request.responseText;

    const qTempArray = textfileContent.split("\n");

    //grab option1
    request = new XMLHttpRequest();
    request.open('GET', myPath + "option1.txt", false);
    request.send();
    textfileContent = request.responseText;

    const Opt1TempArray = textfileContent.split("\n");


    //grab option2

    request = new XMLHttpRequest();
    request.open('GET', myPath + "option2.txt", false);
    request.send();
    textfileContent = request.responseText;

    const Opt2TempArray = textfileContent.split("\n");

    //grab option3

    request = new XMLHttpRequest();
    request.open('GET', myPath + "option3.txt", false);
    request.send();
    textfileContent = request.responseText;

    const Opt3TempArray = textfileContent.split("\n");

    //grab option4

    request = new XMLHttpRequest();
    request.open('GET', myPath + "option4.txt", false);
    request.send();
    textfileContent = request.responseText;

    const Opt4TempArray = textfileContent.split("\n");

    //grab correct

    request = new XMLHttpRequest();
    request.open('GET', myPath + "right.txt", false);
    request.send();
    textfileContent = request.responseText;

    const RightTempArray = textfileContent.split("\n");

    //combine arrays and add named property

    let nr_Q = qTempArray.length;
    let o1, q, o2, o3, o4, r, tmp;

    for (let i = 0; i < qTempArray.length; i++) {
        tmp = Opt1TempArray[i];
        o1 = tmp.trim();
        tmp = Opt2TempArray[i];
        o2 = tmp.trim();
        tmp = Opt3TempArray[i];
        o3 = tmp.trim();
        tmp = Opt4TempArray[i];
        o4 = tmp.trim();
        tmp = qTempArray[i];
        q = tmp.trim();
        tmp = RightTempArray[i];
        r = tmp.trim();
        //the above in the for-loop strips away any leading and trailing spaces. Essentially to make sure there are no \n or similar in the source text-files
        //that can screw things up.
        let myQuestion = {
            Question: q,
            Option1: o1,
            Option2: o2,
            Option3: o3,
            Option4: o4,
            Correct: r,
            Answered: false
        };
        myQuestionsArray.push(myQuestion);
    }
}


/**
 * Initialize all event listeners
 */
function createEvtListeners() {

    // Get the modal
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("myBtnRules");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        document.getElementsByClassName('modal-content')[0].innerHTML = myStartModal; //populate modal with rules-html
        //that is necessary since the modal used to display the score at the end of the game.
        //this makes sure the modal has the rules applied to it when the user actively clicks the button
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        let startEvent = document.getElementById('myBtnStart');
        startEvent.addEventListener('click', runGame);
        let welcomeEvent = document.getElementById('welcome');
        welcomeEvent.addEventListener('mouseover', function () {
            document.getElementById('welcome').innerText = professor;
        });
        welcomeEvent.addEventListener('mouseout', function () {
            document.getElementById('welcome').innerText = welcomePhrase;
        });

        let btn2Event = document.getElementById('myBtnAbout');
        btn2Event.addEventListener('click', function () {
            alert("The game is written by:\nJonas Thorell\nAKA \"The Mad Monkey\"");
        });

        let buttons = document.getElementsByClassName("answers");

        for (let button of buttons) {
            button.addEventListener("click", function () {
                // loop thru all answer buttons and add a click-eventlistener to them
                checkAnswer(this.getAttribute("data-type"));
            });
            button.addEventListener('mouseover', function () {
                // change background color to blue on mouseover
                if (this.style.backgroundColor === "red") {
                    //dont really do anything if the question has been answered wrong. The color should remain
                    this.style.backgroundColor = "red";
                } else if (this.style.backgroundColor == "lime") {
                    //dont really do anything if the question has been answered correctly. The color should remain
                    this.style.backgroundColor = "lime";
                } else {
                    this.style.backgroundColor = "aqua";
                }
            });
            button.addEventListener('mouseout', function () {
                // change background color back to gold on mouseout
                if (this.style.backgroundColor === "red") {
                    //dont really do anything if the question has been answered wrong. The color should remain
                    this.style.backgroundColor = "red";
                } else if (this.style.backgroundColor === "lime") {
                    //dont really do anything if the question has been answered correctly. The color should remain
                    this.style.backgroundColor = "lime";
                } else {
                    this.style.backgroundColor = "gold";
                }
            });
        }
    });
}


/**
 * The main game "loop", called when the user has clicked startbutton
 */

function runGame() {

    scores[0] = 0;
    scores[1] = 0;
    scores[2] = 1;
    scores[3] = 1; //reset the scores array to default values at game start so player starts at a clean slate

    let startEvent = document.getElementById('myBtnStart');
    startEvent.removeEventListener('click', runGame); //disable the start-button

    printScore(scores[0], scores[1], scores[2]); // initial score display. 

    setAllQuestionsToGold(); // set all boxes to green
    printStatusMessage(message); //print initial statusmessage
    emptyArrayAtStart(); // set all questions to unanswered
    turnOnHidden(); //show the hidden elements. And remove the picture

    getQuestion(); // get a random question to display

}

/**
 * Set all questions to not answered at game start
 */

function emptyArrayAtStart() {
    let numberQuestions = myQuestionsArray.length;
    for (let i = 0; i < numberQuestions; i++) {
        myQuestionsArray[i].Answered = false; //set the named property answered to false for every row in the array
    }
}



/**
 * Checks if the clicked answer corresponds with the correct answer using the Correct: property.
 * Update the answered: property to true so the question can not be selected again.
 */

function checkAnswer(buttonClicked) {
    let currentQuestion = scores[2];
    let myCurr = myQuestionsArray[currentQuestion].Answered;
    if (myCurr === false) { // don't allow answer if already answered
        buttonClicked = buttonClicked.toLowerCase(); //which button was clicked? Converted to lowercase for easy comparison
        let correct = myQuestionsArray[currentQuestion].Correct; //what is the correct answer?
        correct = correct.toLowerCase(); //Converted to lowercase for easy comparison
        let myAnswerText = document.getElementById(buttonClicked).innerHTML; //get the text of the button clicked in clear-text rather than option1, option2. That is, the answer in English.
        let statusMess = "You answered: \"";
        statusMess = statusMess + myAnswerText + "\". "; //set the statusMess variable to 'You answered: "Wings".
        if (buttonClicked === correct) {
            let errorMess = getRightAnswerMessage(); //errorMess is misnomer, but same variable is used in both places in the if/else clause. Gets a random answer message into the errorMess variable
            statusMess = statusMess + errorMess; //add the retrieved error-message to the statusmess
            updateColorGreen(buttonClicked); // mark box green
            updateScore(); //updates the score. Further details inside the function
            printStatusMessage(statusMess); //print new statusmessage
        } else {
            let errorMess = getWrongAnswerMessage(); //Get random wrong answer message into the errorMess variable
            statusMess = statusMess + errorMess; //add the retrieved error-message to the statusmess
            updateColorRed(buttonClicked); //mark the box with red
            updateWrong(); //updates the score. Further details inside the function
            printStatusMessage(statusMess); //print new statusmessage
        }
        printNextQ(); //start countdown timer
    }
}

/**
 * Print "Next coming up timer..."
 */

function printNextQ() {
    let nextQ = document.getElementById('next-question'); //the DOM element where the countdown will be printed

    let myInterval = setInterval(function () {
        let timer = document.getElementById('timer'); //hidden element. An easy way of just grabbing/printing the time. It will be displayd in next-question
        currentTime = timer.innerHTML; //grab current time. Default value is 11
        currentTime--; //decrease the timer by 1
        if (currentTime === 0) { //when timer has reaced zero,
            clearInterval(myInterval); //disable the countdown
            clearQuestionField(); //clear the area where the countdown was printed
            timer.innerHTML = "11"; // reset the timer
            printStatusMessage(message); //reset the statusmessage to default texy
            let currentQ = scores[3]; //where in the loop are we?
            if (currentQ === maxQuestions + 1) { //check if the user has answered the maxquestions. If so, exit the game

                turnOffHidden(); //disable the game-field and show the picture
                displayScore(); //show the score in a modal
                let startEvent = document.getElementById('myBtnStart');
                startEvent.addEventListener('click', runGame); //re-enable the start-button
            } else {
                getQuestion(); // get a random question to display
            }
        } else { // timer is still counting down
            let currentQ = scores[3]; //where in the loop are we?
            timer.innerHTML = currentTime; //update the DOM with the timer (hidden field)
            nextQ.innerHTML = "<h1>Next question coming up in..." + currentTime + "</h1>"; //update the display with the countdown
            if (currentQ === maxQuestions + 1) {
                nextQ.innerHTML = "<h1>Exiting in..." + currentTime + "</h1>"; //if max number of questions has been asked, change the text in the timer
            }
        }

    }, 1000); // 1000=once a second
}


/**
 * Clear the next-question field when timer reaches zero
 */

function clearQuestionField() {
    let cleared = document.getElementById('next-question');
    cleared.innerHTML = " "; //clear the element of content
    setAllQuestionsToGold(); //function that re-sets the answer buttons to a background of green
}

/**
 * If the clicked answer is incorrect, set the box to red
 */

function updateColorRed(clickedOption) {
    let selectedAnswer = document.getElementById(clickedOption);
    selectedAnswer.style.backgroundColor = "red"; //set the backround to red on the clicked button. Function is called from checkanswer when answer is wrong
}

/**
 * If the clicked answer is correct, set the box to green
 */

function updateColorGreen(clickedOption) {
    let selectedAnswer = document.getElementById(clickedOption);
    selectedAnswer.style.backgroundColor = "lime"; //set the backround to green on the clicked button. Function is called from checkanswer when answer is correct
}

/**
 * get and return a random message to display when the user answers wrong
 */

function getWrongAnswerMessage() {
    let myError = randomIntFromInterval(1, 10); //get a random integer between 1 and 10
    let myErrMsg = ""; //set the inital value of myErrMsg to empty
    switch (myError) { //depending on the random number generated, create different error messages
        case 1:
            myErrMsg = "Music is not really your thing, is it?";
            break;
        case 2:
            myErrMsg = "Absolutely brimming over with wrongability!";
            break;
        case 3:
            myErrMsg = "You could not be more wrong even if you tried!";
            break;
        case 4:
            myErrMsg = "Getting wronger all the time!";
            break;
        case 5:
            myErrMsg = "It must suck to be you! In other words, you are wrong!";
            break;
        case 6:
            myErrMsg = "There is a picture of you in the dictionary under the heading \"wrong\".";
            break;
        case 7:
            myErrMsg = "Wrong does not cease to be wrong because the majority share in it.";
            break;
        case 8:
            myErrMsg = "Everybody is wrong about everything, just about all the time. This time it is you.";
            break;
        case 10:
            myErrMsg = "It is nobler to declare oneself wrong than to insist on being right --especially when one is right. So I suppose you think you are noble?";
            break;
        default:
            //this should never be displayed. Is here as a fail-safe.
            myErrMsg = "Wrong yet again";
    }
    return myErrMsg; //return the value back to the calling function for display
}

/**
 * get and return a random message to display when the user answers correctly
 */

function getRightAnswerMessage() {
    let myRight = randomIntFromInterval(1, 10); //get a random integer between 1 and 10
    let myRightMsg = ""; //set the inital value of myErrMsg to empty
    switch (myRight) { //depending on the random number generated, create different error messages
        case 1:
            myRightMsg = "Of course it is. Way too easy.";
            break;
        case 2:
            myRightMsg = "In the words of Homer Simpson: \"Duh!\"";
            break;
        case 3:
            myRightMsg = "That is as blatant as it can get, don't you agree?";
            break;
        case 4:
            myRightMsg = "Lister to Red Dwarf. We have in our midst a complete smeg pot. Brains in the anal region. Chin absent, presumed missing. Genitalia small and inoffensive. Of no value or interest. Or in other words: don't be so smegging right!";
            break;
        case 5:
            myRightMsg = "That is right (from a certain point of view).";
            break;
        case 6:
            myRightMsg = "Captain Obvious strikes again!";
            break;
        case 7:
            myRightMsg = "You're right (as always).";
            break;
        case 8:
            myRightMsg = "When you're hot, you're hot!";
            break;
        case 9:
            myRightMsg = "Indeed it is, smeg for brains!";
            break;
        case 10:
            myRightMsg = "You used google for that, right?";
            break;
        default:
            //this should never be displayed. Is here as a fail-safe.
            myRightMsg = "Duh!";
    }
    return myRightMsg; //return the value back to the calling function for display
}

/**
 * Updates the correct answer point
 */

function updateScore() {
    //updates when the user answered correctly
    let currentQuestion = scores[2]; //used to update which question has been answered already
    let currentLoop = scores[3]; //where in the loop are we?
    let oldScore = scores[0]; //oldScore will be the value of how many questions had previously been answered correctly
    let wrong = scores[1]; //how many questions has been answered incorrectly?
    scores[0] = oldScore + 1;
    currentLoop++;
    scores[3] = currentLoop; //update the array with new values for how many correctly answered values as well as where in the loop we are
    printScore(oldScore + 1, wrong, currentLoop); //print new score
    myQuestionsArray[currentQuestion].Answered = true; //mark the question as answered
}

/**
 * Updates the wrong answer point
 */

function updateWrong() {
    //updates when the user answered incorrectly
    let currentQuestion = scores[2]; //used to update which question has been answered already
    let currentLoop = scores[3]; //where in the loop are we?
    let oldWrong = scores[1]; //oldWrong will be the value of how many questions had previously been answered incorrectly
    let score = scores[0]; //how many questions has been answered correctly?
    scores[1] = oldWrong + 1;
    currentLoop++;
    scores[3] = currentLoop; //update the array with new values for how many incorrectly answered values as well as where in the loop we are
    printScore(score, oldWrong + 1, currentLoop); //print new score
    myQuestionsArray[currentQuestion].Answered = true; //mark the question as answered
}

/**
 * Prints a status message below the answer-boxes 
 */

function printStatusMessage(newMessage) {
    document.getElementById('message').innerHTML = newMessage; //update statusmessage
}

/**
 * Gets the question to be answered. Makes sure questions can not be selected twice by using the answered: property
 */

function getQuestion() {
    let currentQuestion = 0; //which question should be answered?
    let questionAnswered = 0; //has the question been answered?
    let numberQuestions = myQuestionsArray.length; //how many items are in the array?
    let finished = false; //when to break out of the do-while loop
    do {
        currentQuestion = randomIntFromInterval(0, numberQuestions - 1); //get random question
        questionAnswered = myQuestionsArray[currentQuestion].Answered; //get the answered-property value of the random question
        if (questionAnswered === false) {
            //if the question has not been asked in current game, populate the display with the question and the four possible answers
            document.getElementById('question').innerText = myQuestionsArray[currentQuestion].Question;
            document.getElementById('option1').innerText = myQuestionsArray[currentQuestion].Option1;
            document.getElementById('option2').innerText = myQuestionsArray[currentQuestion].Option2;
            document.getElementById('option3').innerText = myQuestionsArray[currentQuestion].Option3;
            document.getElementById('option4').innerText = myQuestionsArray[currentQuestion].Option4;
            finished = true; //make sure to break out of the loop
            scores[2] = currentQuestion; //update the scores array with the question to be answered
        } else {
            //if the question has been asked, do nothing. Makes sure the do-loop starts over and selects a new random question
        }
    } while (finished === false); //when finished=true (when an unanswered random question has been chosen, break out of the loop)
}

/**
 * Random number between max and min, to get a random question
 */

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min); //formula to get a random integer between min and max
}

/**
 * Update the score display
 */
function printScore(correct, incorrect, currentQ) {
    let myScore = "Current question:";

    myScore = myScore + currentQ; //what is the loop number of the question asked?
    myScore = myScore + " (out of " + maxQuestions + ")"; //add the max number of questions to the string
    myScore = myScore + "\nCorrect Answers: " + correct; //add how many of those are correct
    myScore = myScore + ", Incorrect Answers: " + incorrect; //add how many of those are incorrect
    myScore = myScore + "\nAccumulated score:"; //and the accumulated score

    let myAccumulatedScore = (correct * 50) - (incorrect * 70); //calculate new score. 1 correct answer=50 points, 1 incorrect answer=-70 points

    document.getElementById('score').innerText = myScore + myAccumulatedScore; //update the display with new accumulated score
}

/**
 * Turns on the hidden fields at game start and hide picture as well as title and buttons
 */
function turnOnHidden() {
    // turn off start image
    let picElement = document.getElementById('quizImage');
    picElement.style.display = "none"; //display=none equals hidden
    //turn of buttons and title to save screen estate
    let gameTitle = document.getElementById('game-title');
    gameTitle.style.display = "none"; //no title
    let welcomeText = document.getElementById('welcome');
    welcomeText.style.display = "none"; //no welcome-text
    document.getElementById('dbase').style.display = "none"; //no nr of questions in game displayed
    let button1 = document.getElementById('myBtnAbout');
    let button2 = document.getElementById('myBtnRules');
    let button3 = document.getElementById('myBtnStart');
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "none"; //no buttons

    // turns on the hidden elements. All of the below are hidden by default in the css file. This function enables the elements by altering the display property
    let questionElement = document.getElementById("question");
    questionElement.style.display = "block";
    let scoreElement = document.getElementById('score');
    scoreElement.style.display = "block";
    let messageElement = document.getElementById('message');
    messageElement.style.display = "block";
    let answerButtons = document.getElementsByClassName('answers');
    answerButtons[0].style.display = "block";
    answerButtons[1].style.display = "block";
    answerButtons[2].style.display = "block";
    answerButtons[3].style.display = "block";
}

/**
 * Turns off the hidden fields at game end
 */

function turnOffHidden() {
    // turn on start image
    let picElement = document.getElementById('quizImage');
    picElement.style.display = "block"; //turns on the image again when the game is over
    //turn on buttons and title again
    let gameTitle = document.getElementById('game-title');
    gameTitle.style.display = "block"; //title is back
    let welcomeText = document.getElementById('welcome');
    welcomeText.style.display = "block"; //welcome-text is back
    document.getElementById('dbase').style.display = "block"; //nr of questions in game displayed is back
    let button1 = document.getElementById('myBtnAbout');
    let button2 = document.getElementById('myBtnRules');
    let button3 = document.getElementById('myBtnStart');
    button1.style.display = "initial";
    button2.style.display = "initial";
    button3.style.display = "initial"; //buttons are back

    //All of the below are hidden by default in the css file, but enabled when the game starts. This function reverts that and goes back to hidden
    let questionElement = document.getElementById("question");
    questionElement.style.display = "none";
    let scoreElement = document.getElementById('score');
    scoreElement.style.display = "none";
    let messageElement = document.getElementById('message');
    messageElement.style.display = "none";
    let answerButtons = document.getElementsByClassName('answers');
    answerButtons[0].style.display = "none";
    answerButtons[1].style.display = "none";
    answerButtons[2].style.display = "none";
    answerButtons[3].style.display = "none";
}

/**
 * Mark all boxes as gold on start of each turn.
 */

function setAllQuestionsToGold() {
    //make sure all answer boxes are gold when new question is started
    let box1 = document.getElementById('option1');
    box1.style.backgroundColor = "gold";
    let box2 = document.getElementById('option2');
    box2.style.backgroundColor = "gold";
    let box3 = document.getElementById('option3');
    box3.style.backgroundColor = "gold";
    let box4 = document.getElementById('option4');
    box4.style.backgroundColor = "gold";
}

/**
 * Display the score in the modal
 */
function displayScore() {
    let myRight = scores[0];
    let myWrong = scores[1];
    let myScoreMess;
    let myAccumulated = (myRight * 50) - (myWrong * 70);

    let myScore = '<span class="close">&times;</span><h1 class="center-text"><i class="fa-brands fa-quora"></i>uiz Master <i class="fa-solid fa-registered fa-2xs"></i></h1>';
    myScore = myScore + '<h1 class="center-text">Game Over</h1>';
    myScore = myScore + '<h2 class="center-text">';
    myScore = myScore + '<i class="fa-solid fa-trophy"></i>';
    myScore = myScore + '<h2 class="center-text">';
    myScore = myScore + 'You scored:' + myAccumulated + ' out of 500</h2>';
    if (myAccumulated < 0) {
        myScoreMess = "Oh dear. A negative score. That is great for covid-tests, but not otherwise.";
    } else if (myAccumulated < 150 && myAccumulated >=0) {
        //is displayed when score is between 0 and 149
        myScoreMess = "Really not a good score. You can do a lot better.";
    } else if (myAccumulated < 210 && myAccumulated >=150) {
        //is displayed when score is between 150 and 209
        myScoreMess = "Okay, decent enough. But you did guess on some?";
    } else if (myAccumulated < 260 && myAccumulated >=210) {
        //is displayed when score is between 210 and 260
        myScoreMess = "Impressive. Most impressive.";
    } else if (myAccumulated === 260) {
        //due to how scoring works, only when 2 questions are answered wrong
        myScoreMess = "WOW! I'm in awe!";
    } else if (myAccumulated === 380) {
        //due to how scoring works, only when 1 question is answered wrong
        myScoreMess = "Great balls of fire!!";
    } else if (myAccumulated === 500) {
        myScoreMess = "You answered everything correctly! I bow to the master!";
    } else {
        myScoreMess = "I guess that counts as a score. Somehow.";
        //should never happen. Here as a fail-safe
    }

    myScore = myScore + '<p class="center-text">' + myScoreMess + '</p>';

    //score html for the modal

    document.getElementsByClassName('modal-content')[0].innerHTML = myScore; //populate modal with score
    document.getElementById('myModal').style.display = "block"; //display it
}