function Gameboard() {
    let board = Array.from(Array(3), () => Array(3).fill(""));

    const getBoard = () => board;

    const addPlayerChoice = (xCoord, yCoord, playerSymbol) => {
        let choice = "valid"
        let boardCheck = checkForWin();
        if (board[xCoord][yCoord] !== "" || 
            boardCheck === "true" || boardCheck === "tie") {
            choice = "invalid";
        } else {
            board[xCoord][yCoord] = playerSymbol;
        };
        return choice;
    };

    const checkForWin = () => {
        let win = "false"
        // check rows and columns
        for (let i = 0; i < 3; i++) {
            const rowSymbols = board[i].filter((value, index, arr) => arr.indexOf(value) === index);
            const colSymbols = board.map(x => x[i]).filter((value, index, arr) => arr.indexOf(value) === index);
            if (
                (rowSymbols.length === 1 && !(rowSymbols.includes(""))) ||
                (colSymbols.length === 1 && !(colSymbols.includes("")))
            ) {
                win = "true";
            };
        }
        // check diagonals
        const diagonals = [[board[0][0], board[1][1], board[2][2]],
                           [board[0][2], board[1][1], board[2][0]]];
        const diagonal1 = diagonals[0].filter((value, index, arr) => arr.indexOf(value) === index);
        const diagonal2 = diagonals[1].filter((value, index, arr) => arr.indexOf(value) === index);
        if (
            (diagonal1.length === 1 && !(diagonal1.includes(""))) ||
            (diagonal2.length === 1 && !(diagonal2.includes("")))
        ) {
            win = "true"
        };
        // check for tie after checking for win
        if (win === "false") {
            if (board.every(row => row.every(cell => cell !== ""))) {win = "tie"};
        };
        return win;
    }

    return { getBoard, checkForWin, addPlayerChoice };
}


function GameController() {
    playerOneName = document.querySelector("#player-one").value;
    playerTwoName = document.querySelector("#player-two").value;
    if (playerOneName === "") playerOneName = "Player One";
    if (playerTwoName === "") playerTwoName = "Player Two";
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

    const textDiv = document.querySelector(".text-display");
    const playRound = (chooseX, chooseY) => {
        let choice = gameboard.addPlayerChoice(chooseX, chooseY, activePlayer.symbol);
        if (choice === "invalid") {
            return;
        } else {
            let winCheck = gameboard.checkForWin();
            if (winCheck === "true") {
                textDiv.textContent = (`${activePlayer.name} wins!`);
            } else if (winCheck === "tie") {
                textDiv.textContent = (`Game over: it's a tie!`);
            } else {
                switchPlayer();
                textDiv.textContent = (`${activePlayer.name}'s turn`);
            } 
        };
    }

    const boardDisplay = document.querySelector(".board");
    const renderBoard = () => {
        boardDisplay.textContent = "";
        const screenBoard = gameboard.getBoard();
        screenBoard.forEach((row, x) => row.forEach((cell, y) => {
            const boardCell = document.createElement("button");
            boardCell.setAttribute("class", "cell");
            boardCell.x = x;
            boardCell.y = y;
            boardCell.textContent = cell;
            boardDisplay.appendChild(boardCell);
        }));
    };

    renderBoard();
    textDiv.textContent = (`${activePlayer.name}'s turn`);
    return { playRound, boardDisplay, renderBoard }
}

const ScreenController = () => {
    let game = GameController();
    const resetButton = document.querySelector(".reset");

    function handleResetClick() {
        return game = GameController();
    }

    function handleBoardClick(e) {
        const targetCell = e.target.closest(".cell");
        if (targetCell) {
            const chosenX = targetCell.x
            const chosenY = targetCell.y
            game.playRound(chosenX, chosenY);
            game.renderBoard();
        }
    }

    game.boardDisplay.addEventListener("click", handleBoardClick);
    resetButton.addEventListener("click", handleResetClick)
}

ScreenController();