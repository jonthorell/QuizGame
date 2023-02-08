const welcomePhrase = "Another visitor!\nStay a while, stay forever!";
const gameTitle = "the music quiz master";
const maxQuestions = 10;
const professor = "Professor Elvin Atombender thinks you won't escape.\nBonuspoint if you know where the quote comes from!";
const myQuestionsArray = []; // empty combined array moved to const
var currentQuestion=0;      // should be converted to local

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
        // turnOnHidden(); //show the hidden elements. Turn on when everything else is ready
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

    let buttons = document.getElementsByTagName("td");

    for (let button of buttons) {
        button.addEventListener("click", function (myQuestionsArray) {
            let answerButton = this.getAttribute("data-type");
            checkAnswer(answerButton);
        });
        button.addEventListener('mouseover', function () {
            // change background color to blue on mouseover
            this.style.backgroundColor="#009DC4";
        });
        button.addEventListener('mouseout', function () {
            // change background color back to green on mouseout
            this.style.backgroundColor="#00FF00";
        });
    }
});

document.getElementById('welcome').innerText = welcomePhrase;
document.getElementById('game-title').innerText = gameTitle;

printScore(0, 0,maxQuestions); // initial score display

runGame();

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */

function runGame() {
    let runQuestions = createQuestions();
    let questions = 1; //countdown to keep track of how many questions has been answered. Max = 10
    let message = "Welcome to the game! Please click an answer to proceed." //start message
    let score = 0;
    let wrong = 0;
    setAllQuestionsToGreen()    // set all boxes to green

    printStatusMessage(message);

    let qrow = getQuestion(runQuestions); // get a random question to display
}

/**
 * Creates an array with all the questions and their properties.
 */

function createQuestions() {

    let questions = "Ultravox released an album named after which european capital?;The title of the first album of Depeche Mode is?;Relax was a major hit for?;Who did a duet with Dancing in the streets together with David Bowie?;Sisters are doin it for themselves was a hit for?;The title song of the movie Karate Kid 2 was performed by?;The song 1984 was recorded by Eurythmics. Who wrote the book?;The charity project Band Aid was inititiated by who?;A-ha is from what country?;Which band got a hit with Just cant get enough?;Who is the singer of the cure?;Derek K Dick is better known as?;Vince Clarke of Erasure was earlier a member of?;Nitzer Ebb makes what kind of music?;What year was live Aid?;Who sang 1984 hit All Cried Out?;Which popular AC/DC album was the first to feature new vocalist Brian Johnson?;Who sang the title track of 80s Bond film The Living Daylights?;In which iconic music video do Queen parody Coronation Street?;Now associated with rickrolling, which 1987 Rick Astley song became number one in 25 countries?;Which single gave Whitney Houston her first UK number one in 1985?;What was the best-selling single of the decade in the UK?;Which band was awaiting a Letter From America?;Who went straight to number one in 1981 with Stand and Deliver?;Who was Christmas Number One in 1988 with Mistletoe and Wine?;Which famous actor was waiting for Bananarama in 1984?;Who is the lead singer of the band Frankie Goes To Hollywood?;Bobby G, Cheryl Baker, Mike Nolan and Jay Aston are members of which band?;How old were George Michael and Andrew Ridgely when they wrote Careless Whisper?;Which U2 album became the fastest-selling album in British history at the time, once released in 1987?;Which iconic Simple Minds song plays during the opening and closing credits of The Breakfast Club?;Which 1981 Journey song failed to crack the UK Top 40 on release, then reached number 6 in 2009?;Which singer-songwriter's real name is Michael Barratt?;Which band recorded the theme song to Friends?;What was The Rolling Stones' second album called?;What’s the name of Britney Spears’ first single, released in 1998?;Right Said Fred had a No.1 Hit with 'I’m Too….'?;In which year of the nineties did Nirvana frontman Kurt Cobain die?;Which pop group named themselves after a London postcode?;Who had a hit with 'U Can't Touch This' in 1990?;In which year did Culture Club have a UK number one single with Karma Chameleon?;Sinead O'Connor had a hit in 1990 with Nothing Compares 2 U, but who wrote it?;Who is the lead singer of the Pet Shop Boys?;Which American rock band had a hit in the eighties with the 'Eye of the Tiger'?;Who shot John Lennon outside his apartment in New York City on December 8 1980?;What musician was deported from Japan in the 1980’s for possession of marijuana?;Which Irish rock band sang The Boys Are Back In Town?;Whose first hit was Wuthering Heights?;Which singer has the most UK Number One singles ever?;What was the name of Eminem's first UK single release in 1999?";
    const questionArray = questions.split(";"); // array with the questions
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

    //const myQuestionsArray = []; // empty combined array moved to global

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
    return myQuestionsArray
}

/**
 * Checks if the clicked answer corresponds with the correct answer using the Correct: property.
 * Update the answered: property to true so the question can not be selected again.
 */

function checkAnswer(buttonClicked) {
    buttonClicked=buttonClicked.toLowerCase(); //provides the optionNR from the button clicked. Converted to lowercase for easy comparison
    let correct=myQuestionsArray[currentQuestion].Correct;
    correct=correct.toLowerCase();

    let newMess="";
    console.log(buttonClicked);
    console.log(correct);
    
    if (buttonClicked === correct) {
        newMess="That is correct. Great job!";
    } else {
        newMess="Sorry, you got that wrong.";
    }
    alert(newMess);
    //checkAnswer(answerButton,answer,correct,current);
}

/**
 * Updates the correct answer point
 */

function updateScore() {

}

/**
 * Updates the wrong answer point
 */

function updateWrong() {

}

/**
 * Prints a status message below the answer-boxes 
 */

function printStatusMessage(newMessage) {
    document.getElementById('message').innerText = newMessage;
}

/**
 * Gets the question to be answered. Makes sure questions can not be selected twice by using the answered: property
 */

function getQuestion(runQuestions) {

    let numberQuestions = runQuestions.length;
    //let currentQuestion = 0; //declare the variables beforehand to empty values
    let questionRow = "";
    let questionAnswered = "";
    let finished = false;
    do {
        currentQuestion = randomIntFromInterval(0, numberQuestions - 1);
        questionAnswered = runQuestions[currentQuestion].Answered;
        questionRow = runQuestions[currentQuestion];
        if (questionAnswered === false) {
            console.log('The question has not been answered');
            document.getElementById('question').innerText = runQuestions[currentQuestion].Question;
            document.getElementById('option1').innerText = runQuestions[currentQuestion].Option1;
            document.getElementById('option2').innerText = runQuestions[currentQuestion].Option2;
            document.getElementById('option3').innerText = runQuestions[currentQuestion].Option3;
            document.getElementById('option4').innerText = runQuestions[currentQuestion].Option4;
            //runQuestions[currentQuestion].Answered=true;
            finished = true;

            //let statusMess = "Question number: " + questions;
            let statusMess = "\nNumber of questions:" + numberQuestions;
            statusMess = statusMess + "\nCurrent Question:" + currentQuestion;
            statusMess = statusMess + "\nCorrect answer:" + runQuestions[currentQuestion].Correct;
            statusMess = statusMess + "\nBeen answered: " + runQuestions[currentQuestion].Answered;

            //temporary text that outputs variable name/values to the browser

            document.getElementById('status').innerText = statusMess;
        } else {
            console.log('The question has been answered');
        }
    } while (finished === false);
    return questionRow;
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
function printScore(correct, incorrect,currentQ) {
    let myScore="Current question:"+currentQ;
    myScore=myScore+("out of ")+maxQuestions;
    myScore = "Correct Answers: " + correct;
    myScore = myScore + ", Incorrect Answers: " + incorrect;
    document.getElementById('score').innerText = myScore;
}


function turnOnHidden() {
    // turn off start image
    let picElement=document.getElementById('quizImage');
    picElement.style.display="none";
    let picElementDiv=document.getElementById('quizImageDiv');
    picElement.style.display="none";
    

    // turns on the hidden elements
    let questionElement = document.getElementById("question");
    questionElement.style.display ="block";
    let scoreElement = document.getElementById('score');
    scoreElement.style.display = "block";
    let messageElement = document.getElementById('message');
    messageElement.style.display = "block";
    let tableElement=document.getElementById('gameTable');
    tableElement.style.display="block";
}

function setAllQuestionsToGreen() {
    //make sure all answer boxes are green when new question is started
   let option1=document.getElementById('option1');
   option1.style.backgroundColor="#00FF00"
   let option2=document.getElementById('option2');
   option1.style.backgroundColor="#00FF00"
   let option3=document.getElementById('option3');
   option1.style.backgroundColor="#00FF00"
   let option4=document.getElementById('option4');
   option1.style.backgroundColor="#00FF00"
}