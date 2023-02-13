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

The source is hosted at github and deployed using git-pages and the commands:

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

Works. However, if the game is already in progress the button does not do anything. Works, but hard to get a screenshot of.

### Game in progress







