//start with defining some constants

const welcomePhrase = "Another visitor!\nStay a while, stay forever!";
const gameTitle = "the music quiz master";
const maxQuestions = 10; //number of questions to be asked
const professor = "Professor Elvin Atombender thinks you won't escape.\nBonuspoint if you know where the quote comes from!";
const myQuestionsArray = []; // empty array at first. Will contain all questions
const scores=[];    // array that will hold three values: 0=current score, 1=current number of wrongs, 2=current question. WIll be updated by scoring functions
scores.push(0,0,1); // make sure default values are there

createEvtListeners(); // create event listeners for user interactivity
createQuestions(); // create array with quiz questions. WIll only run once

// initialize display
document.getElementById('welcome').innerText = welcomePhrase;
document.getElementById('game-title').innerText = gameTitle;

printScore(scores[0], scores[1], scores[2]); // initial score display. Will not be necessary when game is in final state with splash screen

runGame(); // will not be here when finished. Will be called from start-button



// all functions starts here. No code should be outside from this point on

/**
 * Initialize all event listeners
 */
function createEvtListeners() {

    // Get the modal - rules
    let modal = document.getElementById("myModal");

    // Get the button that opens the modal
    let btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    document.addEventListener("DOMContentLoaded", function () {
        let startEvent = document.getElementById('myStart');
        startEvent.addEventListener('click', function () {
            //turnOnHidden(); //show the hidden elements. Turn on when everything else is ready
            //runGame();
            //emptyArrayAtStart();
        });
        let welcomeEvent = document.getElementById('welcome');
        welcomeEvent.addEventListener('mouseover', function () {
            document.getElementById('welcome').innerText = professor;
        });
        welcomeEvent.addEventListener('mouseout', function () {
            document.getElementById('welcome').innerText = welcomePhrase;
        });

        let btn2Event = document.getElementById('myBtn2');
        btn2Event.addEventListener('click', function () {
            alert("The game is written by:\nJonas Thorell");
        });

        let buttons = document.getElementsByClassName("answers");

        for (let button of buttons) {
            button.addEventListener("click", function answerFunction(myQuestionsArray) {
                let answerButton = this.getAttribute("data-type");
                checkAnswer(answerButton);
            });
            button.addEventListener('mouseover', function () {
                // change background color to blue on mouseover
                if (this.style.backgroundColor === "red") {
                    //dont really do anything if the question has been answered wrong. The color should remain
                    this.style.backgroundColor = "red";
                } else if (this.style.backgroundColor == "yellow") {
                    //dont really do anything if the question has been answered correctly. The color should remain
                    this.style.backgroundColor = "yellow";
                } else {
                    this.style.backgroundColor = "#009DC4";
                }
            });
            button.addEventListener('mouseout', function () {
                // change background color back to green on mouseout
                if (this.style.backgroundColor === "red") {
                    //dont really do anything if the question has been answered wrong. The color should remain
                    this.style.backgroundColor = "red";
                } else if (this.style.backgroundColor == "yellow") {
                    //dont really do anything if the question has been answered correctly. The color should remain
                    this.style.backgroundColor = "yellow";
                } else {
                    this.style.backgroundColor = "#00FF00";
                }
            });
        }
    });
}

/**
 * Creates an array with all the questions and their properties.
 */

function createQuestions() {
    // only called once!
    let qArrText = "Ultravox released an album named after which european capital?;The title of the first album of Depeche Mode is?;Relax was a major hit for?;Who did a duet with Dancing in the streets together with David Bowie?;Sisters are doin it for themselves was a hit for?;The title song of the movie Karate Kid 2 was performed by?;The song 1984 was recorded by Eurythmics. Who wrote the book?;The charity project Band Aid was inititiated by who?;A-ha is from what country?;Which band got a hit with Just cant get enough?;Who is the singer of the cure?;Derek K Dick is better known as?;Vince Clarke of Erasure was earlier a member of?;Nitzer Ebb makes what kind of music?;What year was live Aid?;Who sang 1984 hit All Cried Out?;Which popular AC/DC album was the first to feature new vocalist Brian Johnson?;Who sang the title track of 80s Bond film The Living Daylights?;In which iconic music video do Queen parody Coronation Street?;Now associated with rickrolling, which 1987 Rick Astley song became number one in 25 countries?;Which single gave Whitney Houston her first UK number one in 1985?;What was the best-selling single of the decade in the UK?;Which band was awaiting a Letter From America?;Who went straight to number one in 1981 with Stand and Deliver?;Who was Christmas Number One in 1988 with Mistletoe and Wine?;Which famous actor was waiting for Bananarama in 1984?;Who is the lead singer of the band Frankie Goes To Hollywood?;Bobby G, Cheryl Baker, Mike Nolan and Jay Aston are members of which band?;How old were George Michael and Andrew Ridgely when they wrote Careless Whisper?;Which U2 album became the fastest-selling album in British history at the time, once released in 1987?;Which iconic Simple Minds song plays during the opening and closing credits of The Breakfast Club?;Which 1981 Journey song failed to crack the UK Top 40 on release, then reached number 6 in 2009?;Which singer-songwriter's real name is Michael Barratt?;Which band recorded the theme song to Friends?;What was The Rolling Stones' second album called?;What’s the name of Britney Spears’ first single, released in 1998?;Right Said Fred had a No.1 Hit with 'I’m Too….'?;In which year of the nineties did Nirvana frontman Kurt Cobain die?;Which pop group named themselves after a London postcode?;Who had a hit with 'U Can't Touch This' in 1990?;In which year did Culture Club have a UK number one single with Karma Chameleon?;Sinead O'Connor had a hit in 1990 with Nothing Compares 2 U, but who wrote it?;Who is the lead singer of the Pet Shop Boys?;Which American rock band had a hit in the eighties with the 'Eye of the Tiger'?;Who shot John Lennon outside his apartment in New York City on December 8 1980?;What musician was deported from Japan in the 1980’s for possession of marijuana?;Which Irish rock band sang The Boys Are Back In Town?;Whose first hit was Wuthering Heights?;Which singer has the most UK Number One singles ever?;What was the name of Eminem's first UK single release in 1999?";
    const questionArray = qArrText.split(";"); // array with the questions
    let option1 = "Stockholm;Speak and spell;Mike and the mechanics;Mick Jagger;Aretha Franklin and Annie Lennox;Peter Cetera;George Orwell;Bono;Sweden;Depeche Mode;Dave Gahan;Morrisey;Depeche Mode;Rockabilly;1984;Annie Lennox;Highway to hell;Duran Duran;Radio Ga-Ga;Never gonna give you up;Saving all my love for you;Thriller;The Proclaimers;Adam and the ants;Rick James;Robert de Niro;Holly Johnson;Bucks Fizz;19;The Joshua Tree;Alive and kicking;Separate ways;Leonard Cohen;Rolling Stones;Exile on main st.;Oops I did it again;Hot;1994;East 17;M.C Hammer;1982;Prince;Neil Tennant;Red Hot Chilli Peppers;Mark Chapel;George Michael;The Pogues;Cyndi Lauper;Tom Jones;The real Slim Shady";
    const option1Array = option1.split(";"); // array with answer 1
    let option2 = "Berlin;Black Celebration;Roxette;Tina Turner;Bananarama;Billy Idol;William Golding;Bob Geldof;Norway;Yazoo;Robert Smith;Fish;Marillion;EBM;1987;Bonnie Taylor;Back in black;A-ha;I want to break free;Whenever you need somebody;I will always love you;Like a virgin;Joy Division;Sting;Cliff Richard;Roger Moore;Steven Tyler;Eagles;20;War;Belfast child;Dont stop belivin;Shakin Stevens;Bee Gees;The Rolling Stones No. 2;Toxic;Sexy;1992;ZipCode 193;LL Cool J;1983;Michael Jackson;Chris Lowe;Survivor;Mark Chapman;Freddie Mercury;The Cranberries;Grace Jones;Elvis Presley;Cleanin out my closet";
    const option2Array = option2.split(";"); // array with answer 2
    let option3 = "Vienna;Violator;Frankie goes to Hollywood;Phil Collins;Olivia Newton-John;Bruce Springsteen;Joseph Conrad;Midge Ure;Finland;The Assembly;Johnny Marr;Meatloaf;Yes;Heavy Metal;1985;Aretha Franklin;Stiff upper lip;Wings;Im going slightly mad;My arms keep missing you;I wanna dance with somebody;Do they know its christmas?;The Police;Sade;Cyndi Lauper;Jack Nicholson;Peter Gabriel;Status Quo;16;The unforgettable fire;Dont you forget about me;When you love a woman;Jeff Buckley;Crowded House;Sticky fingers;.. Baby One More Time;Handsome;1996;10cc;Eminem;1984;Billy Joel;Andy Bell;Van Halen;Mark Hamill;Madonna;Thin Lizzy;Melissa Etheridge;Bruce Springsteen;Stan";
    const option3Array = option3.split(";"); // array with answer 3
    let option4 = "London;Music for the masses;Pet Shop Boys;Aretha Franklin;Paul McCartney;Billy Joel;J.D. Salinger;George Harrison;Denmark;Erasure;Ian Curtis;Ripper;The Smiths;Soul;1986;Alison Moyet;Fly on the wall;Tina Turner;We will rock you;Together forever;Greatest love of all;Sexual healing;Tears for fears;Lionel Richie;Salt-n-Pepa;Harrison Ford;Don Henley;Genesis;17;Boy;Let there be love;Faithfully;Bob Dylan;The Rembrandts;Let it bleed;Womanizer;Awsome;1995;Blink 182;Heavy D;1985;George Harrison;Dave Stewart;Guns n roses;Mark Owen;Paul McCartney;Boomtown Rats;Kate Bush;Elton John;My name is";
    const option4Array = option4.split(";"); // array with answer 4
    let rightAnswer = "Option3;Option1;Option4;Option1;Option1;Option1;Option1;Option2;Option2;Option1;Option2;Option2;Option1;Option2;Option3;Option4;Option2;Option2;Option2;Option1;Option1;Option3;Option1;Option1;Option2;Option1;Option1;Option1;Option4;Option1;Option3;Option2;Option2;Option4;Option2;Option3;Option2;Option1;Option1;Option1;Option2;Option1;Option1;Option2;Option2;Option4;Option3;Option4;Option2;Option4";
    // right answer will be compared to the same object value later on to determine if the user clicked on the right answer
    const rightArray = rightAnswer.split(";"); // array with the correct answer
    let numberQuestions = questionArray.length;

    //lets combine the arrays into one array with object properties

    for (let i = 0; i < numberQuestions; i++) {
        let myQuestion = {
            Question: questionArray[i],
            Option1: option1Array[i],
            Option2: option2Array[i],
            Option3: option3Array[i],
            Option4: option4Array[i],
            Correct: rightArray[i],
            Answered: false
        };
        myQuestionsArray.push(myQuestion);
    }
    
}

/**
 * The main game "loop", called when the user has clicked startbutton
 */

function runGame() {
    
    scores[0]=0;
    scores[1]=0;
    scores[2]=1; //reset the scores array to default values at game start so player starts at a clean slate

    let message = "Welcome to the game! Please click an answer to proceed." //start message
    let score = scores[0];
    let wrong = scores[1];
    

    setAllQuestionsToGreen() // set all boxes to green
    printStatusMessage(message);
    emptyArrayAtStart() // set all questions to unanswered
    getQuestion(); // get a random question to display
}

/**
 * Set all questions to not answered at game start
 */

function emptyArrayAtStart() {
    let numberQuestions = myQuestionsArray.length;
    for (let i = 0; i < numberQuestions; i++) {
        myQuestionsArray[i].Answered = false;
    }
}



/**
 * Checks if the clicked answer corresponds with the correct answer using the Correct: property.
 * Update the answered: property to true so the question can not be selected again.
 */

function checkAnswer(buttonClicked) {
    let currentQuestion=scores[2];
    let myCurr = myQuestionsArray[currentQuestion].Answered;
    if (myCurr === false) { // don't allow answer if already answered
        buttonClicked = buttonClicked.toLowerCase(); //provides the option from the button clicked. Converted to lowercase for easy comparison
        let correct = myQuestionsArray[currentQuestion].Correct;
        correct = correct.toLowerCase();//Converted to lowercase for easy comparison
        let myAnswerText = document.getElementById(buttonClicked).innerHTML;
        let statusMess = "You answered: \"";
        statusMess = statusMess + myAnswerText + "\". ";

        if (buttonClicked === correct) {
            let errorMess = getRightAnswerMessage();
            statusMess = statusMess + errorMess;
            updateColorYellow(buttonClicked); // mark box yellow
            updateScore();
        } else {
            let errorMess = getWrongAnswerMessage();
            statusMess = statusMess + errorMess;
            updateColorRed(buttonClicked); //mark the box with red
            updateWrong();
        }
        printNextQ();
        printStatusMessage(statusMess);
    }
}

/**
 * Print "Next coming up timer..."
 */

function printNextQ() {
    let startTime = document.getElementById('timer');
    let nextQ = document.getElementById('next-question');

    myInterval = setInterval(function () {
        let timer = document.getElementById('timer');
        let currentTime = timer.innerHTML;
        currentTime--;
        if (currentTime === 0) {
            clearQuestionField();
            clearInterval(myInterval);
        } else {
            timer.innerHTML = currentTime;
            nextQ.innerHTML = "<h1>Next question coming up in..." + currentTime + "</h1>";
        }
    }, 1000);
}

/**
 * Clear the next-question field when timer reaches zero
 */

function clearQuestionField() {
    let cleared = document.getElementById('next-question');
    cleared.innerHTML = " ";
}

/**
 * If the clicked answer is incorrect, set the box to red
 */

function updateColorRed(clickedOption) {
    let selectedAnswer = document.getElementById(clickedOption);
    selectedAnswer.style.backgroundColor = "red";
}

/**
 * If the clicked answer is correct, set the box to yellow
 */

function updateColorYellow(clickedOption) {
    let selectedAnswer = document.getElementById(clickedOption);
    selectedAnswer.style.backgroundColor = "yellow";
}

/**
 * get and return a random message to display when the user answers wrong
 */

function getWrongAnswerMessage() {
    let myError = randomIntFromInterval(1, 6);
    let myErrMsg = "";
    switch (myError) {
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
        default:
            myErrMsg = "Wrong yet again";
    }
    return myErrMsg;
}

/**
 * get and return a random message to display when the user answers correctly
 */

function getRightAnswerMessage() {
    let myRight = randomIntFromInterval(1, 6);
    let myRightMsg = "";
    switch (myRight) {
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
        default:
            myRightMsg = "When you're hot, you're hot!";
    }
    return myRightMsg;
}

/**
 * Updates the correct answer point
 */

function updateScore() {
    let currentQuestion=scores[2];
    let oldScore=scores[0];
    let score=oldScore+1;
    let wrong=scores[1];
    printScore(score, wrong, 1);
    myQuestionsArray[currentQuestion].Answered = true;
}

/**
 * Updates the wrong answer point
 */

function updateWrong() {
    let currentQuestion=scores[2];
    let oldWrong=scores[1];
    let score=scores[0];
    let wrong=oldWrong+1;
    printScore(score, wrong, 1);
    myQuestionsArray[currentQuestion].Answered = true;
}

/**
 * Prints a status message below the answer-boxes 
 */

function printStatusMessage(newMessage) {
    document.getElementById('message').innerHTML = newMessage;
}

/**
 * Gets the question to be answered. Makes sure questions can not be selected twice by using the answered: property
 */

function getQuestion() {

    let numberQuestions = myQuestionsArray.length;
    let finished = false;
    do {
        currentQuestion = randomIntFromInterval(0, numberQuestions - 1);
        questionAnswered = myQuestionsArray[currentQuestion].Answered;
        if (questionAnswered === false) {
            document.getElementById('question').innerText = myQuestionsArray[currentQuestion].Question;
            document.getElementById('option1').innerText = myQuestionsArray[currentQuestion].Option1;
            document.getElementById('option2').innerText = myQuestionsArray[currentQuestion].Option2;
            document.getElementById('option3').innerText = myQuestionsArray[currentQuestion].Option3;
            document.getElementById('option4').innerText = myQuestionsArray[currentQuestion].Option4;
            finished = true;
            scores[2]=currentQuestion;
        } else {
            // make sure to do nothing when true
        }
    } while (finished === false);
}

/**
 * Random number between max and min, to get a random question
 */

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Update the score display
 */
function printScore(correct, incorrect, currentQ) {
    let myScore = "Current question:" + currentQ;
    myScore = myScore + "(out of " + maxQuestions + ")";
    myScore = myScore + "\nCorrect Answers: " + correct;
    myScore = myScore + ", Incorrect Answers: " + incorrect;
    myScore = myScore + "\nAccumulated score:"

    let scoreRight = correct * 50;
    let scoreWrong = incorrect * 70;
    let myAccumulatedScore = scoreRight - scoreWrong;
    myScore = myScore + myAccumulatedScore;
    document.getElementById('score').innerText = myScore;
}

/**
 * Turns on the hidden fields at game start
 */
function turnOnHidden() {
    // turn off start image
    let picElement = document.getElementById('quizImage');
    picElement.style.display = "none";

    // turns on the hidden elements
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
 * Mark all boxes as green on start of each turn
 */

function setAllQuestionsToGreen() {
    //make sure all answer boxes are green when new question is started
    let option1 = document.getElementById('option1');
    option1.style.backgroundColor = "#00FF00"
    let option2 = document.getElementById('option2');
    option1.style.backgroundColor = "#00FF00"
    let option3 = document.getElementById('option3');
    option1.style.backgroundColor = "#00FF00"
    let option4 = document.getElementById('option4');
    option1.style.backgroundColor = "#00FF00"
}