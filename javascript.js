 function Gameboard(){
    const board = Array.from(Array(3), () => Array(3).fill("E"));
    console.log(board);

    const getBoard = () => board;

    const addPlayerChoice = (xCoord, yCoord, playerSymbol) => {
        // check that cell is available
        if (board[xCoord][yCoord] !== "E") {
            console.log("That spot is taken!");
            return;
        }
        board[xCoord][yCoord] = playerSymbol;
        
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
        console.log(`${getActivePlayer().name}'s turn`)
    };

    const playRound = (chooseX, chooseY) => {
        gameboard.addPlayerChoice(chooseX, chooseY, activePlayer.symbol);
        switchPlayer();
        printNewRound();
    }

    printNewRound();
    return { playRound, getActivePlayer }
}

const game = GameController();