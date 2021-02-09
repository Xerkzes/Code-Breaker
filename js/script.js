// Variables
var numbersUp = document.getElementById("amountOfNumberbersUp");
var numbersDown = document.getElementById("amountOfNumberbersDown");
var trysUp = document.getElementById("amountOfTryssUp");
var trysDown = document.getElementById("amountOfTryssDown");
var startGameButton = document.getElementById("startGameButton");
var guessButton = document.getElementById("guess");
var resetButton = document.getElementById("reset");
var numbersOfLock, trys;
var attempt;
var widthOfScreen;
var numberToGuess;
var counterArray = [7];
var numbersOverall;
var gameIsAlreadyOn;
var won;
var confirmentationIsOnScreen;

// ------------------------------------------------------------------------
// Events
window.onload = setupVariablesOnLoad;
window.onresize = updateVariablesOnResize;
numbersUp.addEventListener("click", numberGoUp);
numbersDown.addEventListener("click", numberGoDown);
trysUp.addEventListener("click", trysGoUp);
trysDown.addEventListener("click", trysGoDown);
startGameButton.addEventListener("click", startGame);
guessButton.addEventListener("click", guess);
resetButton.addEventListener("click", reset);


// ------------------------------------------------------------------------
// Setup of Variables
function setupVariablesOnLoad() {
    numbersOfLock = Number(document.getElementById("number").innerHTML);
    trys = Number(document.getElementById("trys").innerHTML);
    widthOfScreen = document.getElementsByClassName("options")[0].clientWidth;
    gameIsAlreadyOn = false;
    confirmentationIsOnScreen = false;
    numberToGuess = "";
    // disables guess and reset button before the game even started
    $(".guess").prop("disabled", true);
    $(".guess").removeClass("active");
    $(".reset").prop("disabled", true);
    $(".reset").removeClass("active");

    // gives startButton the active css
    $("#startGameButton").addClass("active");
    // gives numbers a css to show the user he has to start the game
    $(".numbers").addClass("lock");

    // removes hide from the button on options
    $(".amountUp").removeClass("hide");
    $(".amountDown").removeClass("hide");

    numbersOverall = document.getElementById("number").innerHTML;
    // visual of numbers to choice from
    for (i = 0; i < numbersOverall; i++) {
        counterArray[i] = new Count(i);
    }

    visualUpdateOfNumbers();
}
function updateVariablesOnResize() {
    widthOfScreen = document.getElementsByClassName("options")[0].clientWidth;

    // incase there are more numbers than it is allowed when switching to moblie
    if (widthOfScreen < 700 && numbersOverall > 3) {
        while (numbersOverall > 3) {
            numberGoDown();
        }
        resetGame();
    }
}

// ------------------------------------------------------------------------
// Number of Locks
function numberGoUp() {
    // wide-screen, tablet
    if (widthOfScreen >= 700 &&  numbersOfLock < 6) {
        document.getElementById("number").innerHTML = ++numbersOfLock;
        lockGoUp();
    }
    // smartphone
    else {
        if(numbersOfLock < 3) {
            document.getElementById("number").innerHTML = ++numbersOfLock;
            lockGoUp();
        }
    }

}

function numberGoDown() {
    if (numbersOfLock > 1) {
        document.getElementById("number").innerHTML = --numbersOfLock;
        lockGoDown();
    }  
}

function lockGoUp() {
    // add number
    counterArray[numbersOverall] = new Count(numbersOverall);
    // ++ must be after a new Count is created
    numbersOverall++;
    visualUpdateOfNumbers();
}

function lockGoDown() {
    numbersOverall--;
    // remove number
    document.getElementById("numbers").removeChild(document.getElementById("numbers").lastChild);
    visualUpdateOfNumbers();
}

function visualUpdateOfNumbers() {
    // disables input of counts
    $(".numbers button").prop("disabled", true);
    $("input").prop("disabled", true);

    // center visual of numbers
    // let offset = (-1 * Number(document.getElementById("number").clientWidth)) + "px";
    let offset = (-1 * (19.6 * (numbersOverall / 1.65))) + "px";
    document.getElementById("numbers").style.marginLeft = offset;
}

// ------------------------------------------------------------------------
// Number of Trys
function trysGoUp() {
    // wide-screen, tablet
    if (widthOfScreen >= 700 &&  trys < 20) {
        document.getElementById("trys").innerHTML = ++trys;
    }
    // smartphone
    else {
        if(trys < 15) {
            document.getElementById("trys").innerHTML = ++trys;
        }
    }
}
function trysGoDown() {
    if (trys > 1) {
        document.getElementById("trys").innerHTML = --trys;
    } 
}
// ------------------------------------------------------------------------
// Increase
function increaseByOne(index) {
    let text = "findObject" + index;
    let number = Number(document.getElementById(text).value);

    if (number < 9) { document.getElementById(text).value = number + 1; }
    else { document.getElementById(text).value = 0; }   
}
// Decrease
function decreaseByOne(index) {
    let text = "findObject" + index;
    let number = Number(document.getElementById(text).value);

    if (number > 0) { document.getElementById(text).value = number - 1; }
    else { document.getElementById(text).value = 9 }
}

// ------------------------------------------------------------------------
// Start Game
function startGame() {
    if (!gameIsAlreadyOn) {
        // generate random number to guess
        for (i = 0; i < numbersOverall; i++) {
            numberToGuess += Math.floor(Math.random() * 10);
        }

        gameIsAlreadyOn = true;
        attempt = 1;
        won = false;

        // disables input of the number directly
        $(".numbers button").prop("disabled", false);
        // disables start button
        $(".startGameButton").prop("disabled", true);
        $(".startGameButton").removeClass("active");
        // disable up and down arrows from options
        $(".amountUp").prop("disabled", true);
        $(".amountDown").prop("disabled", true);
        // activates guess and reset button
        $(".guess").prop("disabled", false);
        $(".guess").addClass("active");
        $(".reset").prop("disabled", false);
        $(".reset").addClass("active");
        // removes lock from numbers
        $(".numbers").removeClass("lock");
        // hides button from option
        $(".amountUp").addClass("hide");
        $(".amountDown").addClass("hide");
    }
}

// ------------------------------------------------------------------------
// Check guess of the player
function guess() {
    if (attempt <= trys && !won) {
        let numbersAreInRightSpot = 0;

        // create Div for storing the elements
        let divTag = document.createElement("div");
        divTag.outerHTML = '<div></div>';
        result.appendChild(divTag);
        // create Attempt Element
        let text = "Attempt " + attempt + ": ";
        let pTag = document.createElement("p");
        pTag.innerHTML = text;
        let myObj = result.lastChild;
        myObj.appendChild(pTag);

        // loop for guess
        for (let i = 0; i < numbersOverall; i++) {
            let color = "black"; // default color
            // get number in code
            let text = "findObject" + i;
            let numberGuess = document.getElementById(text).value;

            // loop for code
            for (let j = 0; j < numberToGuess.length; j++) {
                // get the number in object
                let numberCode = numberToGuess.charAt(j);

                // number is on the right spot
                if (numberGuess == numberCode && i == j) {
                    color = "green";
                    numbersAreInRightSpot++;
                    break;
                }
                // number is in Code somewhere
                else if (numberGuess == numberCode) {
                    color = "orange";
                }
            }

            printResultNumber(numberGuess, color);
        }


        won = (numbersAreInRightSpot === numbersOfLock) ? true : false;

        // Game is won
        if (won) {
            let text = "Congratulation you guessed the right number combination!";
            let pTag = document.createElement("p");
            pTag.innerHTML = text;
            result.appendChild(pTag);
        }

        // debug
        // console.log("number to guess: " + numberToGuess);
        // console.log("Round: " + attempt);
        // console.log("numbersAreInRightSpot: " + numbersAreInRightSpot);
        // console.log("won: " + won);
        // console.log("-------------------");

        attempt++;
    }
    else if (won) {
        let text = "You already won the game. Try to reset game.";
        let pTag = document.createElement("p");
        pTag.innerHTML = text;
        result.appendChild(pTag);

        // debug
        // console.log("You already won the game. Try to reset game.");
    }
    else {
        let text = "You don't have a try left.";
        let pTag = document.createElement("p");
        pTag.innerHTML = text;
        result.appendChild(pTag);

        // debug
        // console.log("You don't have a try left.");
    }
}

function printResultNumber(number, color) {
    let pTag = document.createElement("p");
    let myObj = result.lastChild;
    myObj.appendChild(pTag);

    // on the right spot
    if (color == "green") {
        pTag.outerHTML = '<p class="right"">' + number + '</p>';
    }
    // somewhere in the code
    else if (color == "orange") {
        pTag.outerHTML = '<p class="inNumbers"">' + number + '</p>';
    }
    // just wrong
    else {
        pTag.outerHTML = '<p class="wrong"">' + number + '</p>';
    }

}
// ------------------------------------------------------------------------
// opens menu for confitmentation of reset
function reset() {
    if (!confirmentationIsOnScreen) {
        // under the game-buttons
        let divOfButtons = document.createElement("div");
        let confirmentationText= document.createElement("p");
        let resetButtonYes = document.createElement("button");
        let resetButtonNo = document.createElement("button"); 

        divOfButtons.appendChild(resetButtonYes);
        divOfButtons.appendChild(resetButtonNo);

        resetSection.appendChild(confirmentationText);
        resetSection.appendChild(divOfButtons);

        confirmentationText.innerHTML = "Are you sure?";
        resetButtonYes.outerHTML = '<button type="button" onclick="resetGame()">Yes</button>';
        resetButtonNo.outerHTML = '<button type="button" onclick="closeConfirmentationOfReset()">No</button>';
        resetSection.style.height = "3rem"; 
    }
}

// reset game
function resetGame() {
    // activate the option buttons
    $(".amountUp").prop("disabled", false);
    $(".startGameButton").prop("disabled", false);
    $(".amountDown").prop("disabled", false);
    
    // deletes all the locks on the chest
    let myObj = document.getElementById("numbers");
    while(myObj.firstChild) {
        myObj.removeChild(myObj.lastChild);
    }
    // delete the section of Result
    let section = document.getElementById("result");
    let child = section.lastElementChild;
    while (child.tagName != "H2") {
        section.removeChild(child);
        child = section.lastElementChild;
    }

    setupVariablesOnLoad();

    // close window
    closeConfirmentationOfReset();
}

// close display
function closeConfirmentationOfReset() {
    confirmentationIsOnScreen = false;
    // delete the section of confirmentationOfReset
    let section = document.getElementById("resetSection");
    section.style.height = "0";
    while (section.firstChild) {
        section.removeChild(section.lastChild);
    }

}
