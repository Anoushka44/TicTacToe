const cells = Array.from(document.querySelectorAll('.js-cell'));
let board = new Array(9).fill(null);
let player = "X";
const $winner = document.querySelector('.js-winner');
const $nextPlayer = document.querySelector('.js-next-player');
const $reset = document.querySelector('.js-reset');
let gameOver = false;
const winnerCombos = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

function checkForWinner(){
    
    for (let [i1, i2, i3] of winnerCombos) {
        
        if (board[i1] !== null && board[i1] === board[i2] && board[i1] === board[i3]) {
            
            return true;
        }
    };

    return false;

};

function isBoardFull(){

    return board.every(element => element !== null);

};

function isMoveValid(index){

    return board[index] === null;

};

function makeAMove(cell, index) {

    if (gameOver || !isMoveValid(index)) {

        return;        
    };

    cell.innerText = player;
    board[index] = player;

    if (checkForWinner()) {

        $winner.innerText = `Player ${player}, you won the game! Congratulations!`;
        $nextPlayer.innerText = `Game over!`;
        gameOver = true;
    }
    
    else if (isBoardFull()) {
        
        $winner.innerText = `It's a draw! Try again!`;
        $nextPlayer.innerText = `Game over!`;
        gameOver = true;

    } else {
    
        player = player == "X" ? "O" : "X";
        $nextPlayer.innerText = `Player ${player}, make your move.`;
    }    

};

function resetTheBoard () {

    cells.forEach((cell) => cell.innerText = '-');
    board = new Array(9).fill(null);
    player = "X";
    $nextPlayer.innerText = `Player ${player}, make your move.`;
    $winner.innerText = ``;
    gameOver = false;
    
};

$nextPlayer.innerText = `Player ${player}, make your move.`;
$reset.addEventListener('click', () => resetTheBoard());
cells.forEach((cell,index) => {cell.addEventListener('click', () => makeAMove(cell, index))});