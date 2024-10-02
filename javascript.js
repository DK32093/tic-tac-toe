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
        console.log(board);
    };

    // Functions are only accessible once Gameboard() is assigned to a variable
    return { getBoard, addPlayerChoice };
}





function addSymbol(player) {
   const symbol = player
   return symbol;
}