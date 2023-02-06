//this javascript file is generic and will be used by all three pages. Routines used for the game proper is in game.js and is only linkd into the game.html file

const welcomePhrase="Stay a while, stay forever!"; 
const gameTitle="the quiz master";


document.getElementById('welcome').innerText=welcomePhrase;
document.getElementById('header-text').innerText=gameTitle;