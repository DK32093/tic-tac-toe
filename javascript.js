 function Gameboard(){
    const board = Array.from(Array(3), () => Array(3).fill("E"));
    console.log(board);

    const getBoard = () => board;

    const addPlayerChoice = (xCoord, yCoord, playerSymbol) => {
        let choice = "valid"
        // check that cell is available
        if (board[xCoord][yCoord] !== "E") {
            console.log("That spot is taken!");
            choice = "invalid";
        } else {
        board[xCoord][yCoord] = playerSymbol;
        };
        return choice;
    };

    // Functions are only accessible once Gameboard() is assigned to a variable
    return { getBoard, addPlayerChoice };
}


function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const gameboard = Gameboard();
    const players = [
        {name: playerOneName, symbol: "X"}, 
        {name: playerTwoName, symbol: "O"}
    ];

    let activePlayer = players[0]
    const switchPlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        };
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(gameboard.getBoard());
        console.log(`${activePlayer.name}'s turn`)
    };

    const playRound = (chooseX, chooseY) => {
        let choice = gameboard.addPlayerChoice(chooseX, chooseY, activePlayer.symbol);
        if (choice === "invalid") {
            console.log(`${activePlayer.name}'s turn`)
            return;
        } else {
        switchPlayer();
        printNewRound();
        };
    }

    printNewRound();
    return { playRound, getActivePlayer }
}

const game = GameController();