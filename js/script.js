var board = [[],[],[],[]];
var emptyPiece = {
    row : 3,
    column : 3
}

class Piece {
    constructor(pieceValue, pieceRow, pieceColumn) {
        this.value = pieceValue;

        if (pieceRow != 3 || pieceColumn != 3) {
            this.createPieceHtml(pieceValue, pieceRow, pieceColumn);
        }
    }

    createPieceHtml(pieceValue, pieceRow, pieceColumn) {
        let hor = -125 * pieceColumn;
        let ver = -125 * pieceRow;
        let div = document.createElement("div");

        div.style.backgroundPosition = hor + "px " + ver + "px";
        div.style.transition = 'left 0.5s, top 0.5s';
        div.style.position = 'absolute';
        div.style.left = -(hor) + "px";
        div.style.top = -(ver) + "px";
        div.className = "pieces";
        div.id = pieceValue;
        div.addEventListener("click", function() {
            movePiece(this.id, false)
        });

        document.getElementById("puzzle").appendChild(div);
    }
}

function createPieces() {
    let k = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let piece = new Piece(k, i, j);
            board[i].push(piece);
            k++;
        }
    }    
}

function createEventListener(div) {
    div.addEventListener("click", function() {
        movePiece(this.id, false)
    });
}

function createBackground(){
    var div = document.createElement("div");
    div.id = "gray-background";
    document.getElementById("puzzle").appendChild(div);
}

function movePiece(id, shuffling){
    const clickedPiece = findPiece(id);
    if(legalMove(clickedPiece.row, clickedPiece.column)){
        movePiecePosition(id);
        updateEmptyPiece(clickedPiece.row, clickedPiece.column);
    }
    const endGame = checkIfCompleted();
    if (endGame && !shuffling){
        showVictoryScreen();
    }
}

function findPiece(id){
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (board[i][j].value == id){
                const res = {
                    row: i,
                    column: j
                }
                return res;
            }
        }
    }
}

function legalMove(row, column) {
    const adjacentRow = row - emptyPiece.row;
    const adjacentColumn = column - emptyPiece.column;
    if((((adjacentRow == 1) || (adjacentRow == -1)) && adjacentColumn == 0) || (((adjacentColumn == 1) || (adjacentColumn == -1)) && adjacentRow == 0)){
      return true;
    }
    return false;
}

function movePiecePosition(id) {
    board[emptyPiece.row][emptyPiece.column].value = id;

    const movePiece = document.getElementById(id);
    const newLeftDist = 125 * emptyPiece.column;
    const newTopDist = 125 * emptyPiece.row;
    
    movePiece.style.left = newLeftDist + 'px';
    movePiece.style.top = newTopDist + 'px';
}

function updateEmptyPiece(newRow, newColumn) {
    emptyPiece.row = newRow;
    emptyPiece.column = newColumn;

    board[newRow][newColumn].value = 15;
}

function checkIfCompleted() {
    var pieceScore = 0;
  
    for(var i = 0; i < board.length ; i++){
      for(var j = 0; j < board[i].length ; j++){
        if(pieceScore != board[i][j].value){
          return false;
        } else {
          pieceScore++;
        }
      }
    }
  
    return true;
}

function showVictoryScreen() {

    var modal = document.getElementById("winScreen");
    var footer = document.getElementById("footer");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    footer.style.display = "none";

    span.onclick = function() {
        modal.style.display = "none";
        footer.style.display = "block";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
          footer.style.display = "block";
        }
      }
}

function shufflePieces(times) {
    if (times <= 0) {
      return;
    }

    var direction = Math.floor(Math.random()*15);
    movePiece(direction, true);
  
    shufflePieces(times - 1);
  }

function start() {
    createPieces();
    createBackground();
    shufflePieces(500);
}

start();