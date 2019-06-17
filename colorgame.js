var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")

init();

function init() {
    //mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            //sets which difficulty selected
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            //sets number of squares depending on difficulty
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }

    for (var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function () {
            //grab colour of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare colour to pickedColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
    reset();
}

function reset() {
    //generate all new colours
    colors = generateRandomColors(numSquares);
    //pick a new random colour from array
    pickedColor = pickColor();
    //change colourDisplay text to match picked colour
    colorDisplay.textContent = pickedColor
    //changing text
    resetButton.textContent = "New Colours"
    messageDisplay.textContent = "";
    //change colours of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            //makes sure they show if we give them a background colour
            squares[i].style.display = "block";
            //on easy the first three this will show
            squares[i].style.background = colors[i];
        } else {
            //but on the last three it won't
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}


resetButton.addEventListener("click", function () {
    reset();
})

function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < squares.length; i++) {
        //change each colour to match given colour
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random colour and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}