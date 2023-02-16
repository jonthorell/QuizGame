# QuizMaster

The aim of this project is to create a miniature musical quiz game. The game is written in html, css, and javascript only.

The game is live 
[here](https://jonthorell.github.io/QuizGame/)

![mockup-picture](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/mockup.PNG?raw=true)

# Background and use-case

Apart from some image-files, the app only consists of 2 html-files, one css-file, and one javascript-file. One of the html-files is only used when the browser detects that javascript has been disabled. The index.html is the primary one and the only one that the javascript targets elements in. It might have been easier to use a game.html file for the game-proper, but since the focus is on javascript I decided against it. It was more worthwhile to use just one since it provided more of a challenge.

Basically, you will only ever see two different views.

This first one is just your basic startpage with a row of buttons and a "logotype".

![startpage](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/startscreen.PNG?raw=true)

The second one is when a game is in progress.

![game-in-progress](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/game-in-progress.PNG?raw=true)

# Design considerations (visual)

1. White whenever there is text straight on the background. The title and a countdown timer only really.
2. Everything with a green background is something the user can interact with.
3. Everything with a goldish background is either a question to the user or feedback.

The site is fully responsive so can easily be used on any device. 

# Design considerations (code)

1. Apart from some initializations (defining constants), everything is contained within single-use functions.
2. All game-logic takes place in the javascript file.
3. All variables are local (that is, no var X=10 or similar)
4. Everything when it comes to user interaction is event-driven. There is no onmouseover= or similar in the html-file in other words.
5. The code is heavily commented so it should be easy to follow the logic for an experienced programmer.

# Technologies used

* HTML
* CSS
* Javascript
* Gitpod as IDE, with aid of notepad++
* Git from inside gitpod and github

# Deployment

All code entered into its respective file from within gitpod.

The source is hosted at github and deployed using the publicly availabe git-hube page of https://github.com/jonthorell/QuizGame

That is done regularily using:

* git add .
* git commit -m "commit message"
* git push

# Testing
## Responsiveness
Layout has been checked on built-in screen of laptop 1920x1080, on the external display (2560x1440) in Chrome and Edge as well as some "simulated" sizes using devtools. On top of that, it was checked using Safari on an iPhone 8. Where responsiveness at first were an issue, it was resolved using media queries and changing font-size. The responsiveness
scales well down to about 200px wide. Lower than that and the responsiveness tend to suffer a little due to restricted screen estate. It still works, but not optimal. In reality I do not think that will prove to be a major problem though since I doubt you can find devices in use today with such low a resolution. There is a limit to how far you can go in accomodating everything.

## Functional testing

### Start page

Expected look:

![startpage](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/startscreen.PNG?raw=true)

Works. 

The message below the buttons (marked in blue below) should change on mouseover, which it does.

![buttons](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/buttons.PNG?raw=true)

If you hover over the three green buttons, the mouse pointer should change into a hand to indicate it is clickable. Works (but next to impossible to get a screenshot of)

If you click the about button, you should get a requstor with information about the programmer.

![about](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/about-req.PNG?raw=true)

Works. 

If you click rules, you should get a semi-transparant overlay on how scoring works.

![rules](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/rules-overlay.PNG?raw=true)

Also works. If you click on the "x" button or outside of the overlay, it should close. That works too.

Finally, the start-button.

If you click it on the start-screen, the game should start like this:

![startgame](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/game-in-progress.PNG?raw=true)

Works. 

### Game in progress

When the game is first launched, you should get an image like this:

![question-1](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/in-progress1.PNG?raw=true)

The top row as well as the four green buttons are pulled from an array of questions, and added dynamically to the correct dom-element.
The "welcome to the game" row is populated by a constant variable at start. 
The "current question" part is partially pulled from another array, and partially calculated (the accumulated score part).

As long as the users has not answered this particular question, all answer buttons are green. When the mouse hovers over it, the background color
changes to blue.

When an answer has been submitted, the color changes to either red (wrong) or yellow (right). At that point, the onhover part is disabled until the next
question has been revealed. Again, hard to get a screenshot of but works.

When an answer has been submitted, it should look like this:

![submitted-answer](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/in-progress2.PNG?raw=true)

As can be seen, the clicked answer has been marked red (wrong). And a timer has started to count downwards before revealing the next question. The "answer box" has
also been updated with a randomly chosen phrase.

The score has also been updated:

![submitted-answer](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/in-progress3.PNG?raw=true)

When the count-down timer reaches zero, it will reveal the next question.

Unless it is the last question. If it is, the countdown timer will change to this:

![last-question](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/in-progress4.PNG?raw=true)

When it reaches zero, in that case, the game exits and the user is back to the startpage.

This part has been tested in several ways, or in several stages might be a better way of putting it.

1. Did not use a "loop" or condition at first. It was hardcoded which question to use so you can see exactly what values would be assigned to which variable.
2. Make conditions as easily compared as possible (like convert both parts of the equation into lowercase)
3. Variable values were displayed at the bottom of the screen. The variable I was working on at the time was further showcased using alert(variableName). Other important aspects were logged using console.log.
4. Make sure condions in 1 and 2 evaluates to correct values for the hardcoded question so the game-logic works.
5. When 4 works, add loop so the game consists of more than one question. 
6. Repeat step 4 for the loop.

Everything works as expected.

1. Upon start, the top button row and the text-fields are removed. Partially to save screen-estate and partially to make it impossible for the user to start a new game when one is already in progress.
2. The game asks the user ten questions, randomly chosen.
3. For each question, the question field (top yellow) is populated with the correct question. The green answer buttons are populated with the correct answer options.
4. When hovering over unanswered questions, the background color changes to blue.
5. When answering a question, the score is updated and the user gets a random answer message to provide some variety. The answer-button is updated to either red (wrong) or yellow (right). The hover effect is disabled for that answer.
6. A countdown from 10 to 0 starts.
7. When the countdown reaches 0, a new question is shown and numbers 3-6 repeats.
8. When 10 questions has been asked, the user is re-directed to the start page with the buttons shown again.

# File names and hierarchy

All filenames are consistently in lower case with the appropriate extension (html, css, or js).
The html-files are in the root-folder.

The folder hierarchy looks like this:

![folders](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/folder-hieararchy.PNG?raw=true)

The css and javascript folders contain one file each. The readme-file folders only contain screenshots used for this documentation.

# Bugs encountered and fixed

1. The countdown timer initially only ran once, for the first question. Had forgotten to reset the timer to the initial value of ten. Once that was fixed, it runs for every question.
2. The text in the answer-buttons and the buttons in the top-row could sometimes spill over in lower resolutions. Fixed with some media-queries.
3. Got some odd values in the function that retrieves the question values from the array. Turns out it was a mistake regarding variable scope. I refactored the entire code to remove all global variables.
4. The functons that were present when the re-factoring took place are:
    - createEvtListeners 		works, no globals
    - createQuestions			works, no globals
    - rungame					works, no globals
    - emptyArrayAtStart		works, no globals
    - checkAnswer				works, no globals
    - printNextQ				works, no globals
    - clearQuestionField		works, no globals
    - updateColorRed			works, no globals
    - updateColorYellow		works, no globals
    - getWrongAnserMessage	works, no globals
    - getRightAnswerMessage	works, no globals
    - updateScore				been updated to NOT use globals. Works, no globals. 
    - updateWrong				been updated to NOT use globals. Works, no globals. 
    - printStatusMessage		works, no globals
    - getQuestion				works, no globals
    - RandomIntIntervall		works, no globals
    - printScore				works, no globals
    - turnOnHidden			works, no globals
    - setAllQuestionstogreen	works, no globals

5. The refactoring led to a problem in the if-statements regarding the answer-buttons, meaning that they did not react as they should. The if/else logic needed to be redone slightly to compensate for that, but works again as it should.
6. Some cases of missed semi-colons and spaces in the wrong places led to the display showing the placeholder values rather than the correct content. I.e. option1 in the button instead of the question. It was hard to see where the problem was at first but found the problem eventually.
7. Not a bug strictly speaking, but an unwanted sideffect really. If the user has javascript disabled the site looks odd. The game will of course not work without javascript, but it should at least look decent anyway even if no user interaction can take place.

    It looks better now when some elements are hidden by default (display:none in the css file), but still.

    ![no-javascript](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/strange-look-w-no-javascript.PNG?raw=true)

    The 0 are altered by javascript so without javascript enabled, it looks ugly. Fixed by doing a redirect to no-javascript.html when the browser detects javascript is not available.

# Remaining bugs

None known

# To note

The WAVE tool complains about "very low contrast" for one element. That can safely be ignored since that element always has the diplay property set to none. The element is only used for the game-logic and is never displayed to the user.

# Validation

Everything has been validated using the official tools.

## HTML

The two files were validated using [v3 validator](https://validator.w3.org/)

![index](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/validate-index.PNG?raw=true)

![no-javascript](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/validate-no-javascript.PNG?raw=true)

## CSS

The css-file was validated using:

[jigsaw](https://jigsaw.w3.org/css-validator/)

![css](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/validate-css.PNG?raw=true)

## Javascript

It may not count as validating really, but JSHint was used to detect hard-to-see mistakes such as missing semi-colons and variables that were never used (leftovers from earlier stages in the code). Of course, JSHint can only detect if the code follows the syntax. It can not detect logical errors such as comparing the wrong variables and things of that nature. Use strict enabled after checking everything with JSHint. It should have been enabled from the start really, but the code works perfectly fine in strict mode.

The result from JSHint is:

![jshint](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/validate-js.PNG?raw=true)

One warning present, but not a show-stopper. The keyword is may. I do not think it leads to confusing semantics and I think it is quite clear what the line of code does.

The code it complains about is the following.

```javascript
for (let button of buttons) {
            button.addEventListener("click", function () {
                // loop thru all answer buttons and add a click-eventlistener to them
                checkAnswer(this.getAttribute("data-type"));
            });
```
I opted to keep that, since the other option is clumsier in my opinion.

That would be something like this:

```javascript
let btn1 = document.getElementById('option1');
let btn2 = document.getElementById('option2');
let btn3 = document.getElementById('option3');
let btn4 = document.getElementById('option4');

btn1.addEventListener("click", function () {
     checkAnswer(btn1.getAttribute("data-type"));
});

btn2.addEventListener("click", function () {
     checkAnswer(btn2.getAttribute("data-type"));
});

btn3.addEventListener("click", function () {
       checkAnswer(btn3.getAttribute("data-type"));
 });

btn4.addEventListener("click", function () {
      checkAnswer(btn4.getAttribute("data-type"));
});

```

The end-result is the same, but the loop is neater.

# Lighthouse

Lighthouse score for main-page:

![lighthouse-mainpage](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/lighthouse-mainpage.PNG?raw=true)

The result may be slightly misleading. Misleading since the start-page and the main-game uses the same html-file, and I have not found a way to get lighthouse to
create a report from when the game is in progress. It starts there, but reverts to default values after a while.

Lighthouse score for the no-javascript page:

![lighthouse-no-javascript](https://github.com/jonthorell/QuizGame/blob/main/assets/images/readme-files/lighthouse-no-javascript.PNG?raw=true)

# To-Do

Remake the createQuestions function. It is hard to read as it is and difficult to maintain. My current idea is to create the array in question from a csv-file. I have postponed that since I wanted the game to work as-is first.

# Credits

The image on the start page was found using google image-search. If necessary, more precise location(s) where it is hosted can be provided although I can not vouch for its authorative status.

Some icono-graphy provided by 
[fontawsome](https://fontawesome.com/)

The modal used for the rules-button was "stolen" from:

[How to make a modal box](https://www.w3schools.com/howto/howto_css_modals.asp)

and adapted for my use.

















