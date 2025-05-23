const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;


const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

];

// let create the function to initilize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // hume yaha pr UI Me bhi update karna padega
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all ";
        box.classList = `box box${index+1}`
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;


}

initGame();



function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all three value are non empty and extactly same value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if wiinner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";

            //  disable pointer event

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //  now we know the winnwr how the funking winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    // hume pata hai winner game win kar gya
    if (answer !== "") {
        gameInfo.innerText = `Winner Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let check draw condition
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Draw!"
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        checkGameOver();
    }

}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);