 function Gameboard(){
    const board = Array.from(Array(3), () => Array(3).fill("E"));

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

    const checkForWin = () => {
        let win = "false"
        for (let i = 0; i < 3; i++) {
            const rowSymbols = board[i].filter((value, index, arr) => arr.indexOf(value) === index);
            const colSymbols = board.map(x => x[i]).filter((value, index, arr) => arr.indexOf(value) === index);
            console.log(rowSymbols + " row" + i);
            console.log(colSymbols + " col" + i);
            if (
                (rowSymbols.length === 1 && !(rowSymbols.includes("E"))) ||
                (colSymbols.length === 1 && !(colSymbols.includes("E")))
            ) {
                win = "true";
                console.log("rc-win");
            };
        }
        const diagonals = [[board[0][0], board[1][1], board[2][2]],
                           [board[0][2], board[1][1], board[2][0]]];
        const diagonal1 = diagonals[0].filter((value, index, arr) => arr.indexOf(value) === index);
        const diagonal2 = diagonals[1].filter((value, index, arr) => arr.indexOf(value) === index);
        if (
            (diagonal1.length === 1 && !(diagonal1.includes("E"))) ||
            (diagonal2.length === 1 && !(diagonal2.includes("E")))
        ) {
            win = "true"
            console.log("diag-win")
        };
        console.log(win + " win");
        return win;
    }

    // Functions are only accessible once Gameboard() is assigned to a variable
    return { getBoard, checkForWin, addPlayerChoice };
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
        const choice = gameboard.addPlayerChoice(chooseX, chooseY, activePlayer.symbol);
        if (choice === "invalid") {
            console.log(`${activePlayer.name}'s turn`)
            return;
        } else {
        if (gameboard.checkForWin() === "true") {
            console.log(`${activePlayer.name} wins!`)
            //reset game here
        }
        switchPlayer();
        printNewRound();
        };
    }

    printNewRound();
    return { playRound, getActivePlayer }
}

const game = GameController();





