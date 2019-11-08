
//The board variable will be filled with the pieces info, including a value. Victory will be achieved if the values of the array are sorted correctly.
var board = [[],[],[],[]];
var emptyRow = 3;
var emptyColumn = 3;

function createPieces() {
    var k = 0;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            var hor = -125 * j;
            var ver = -125 * i;
            var div = document.createElement("div");
            div.style.backgroundPosition = hor + "px " + ver + "px";
            div.className = "pieces";
            div.id = k;

            //Fill the board
            var pieceInfo = {
                value: k,
                row: i,
                column: j
            };
            board[i].push(pieceInfo);

            document.getElementById("puzzle").appendChild(div);
            createEventListener(div);
            k++;
        }
    }

    createBackground();

    document.getElementById("15").style.background = 'none';    
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
    var clickedPiece = findPiece(id);
    if(legalMove(clickedPiece.row, clickedPiece.column)){
        exchangePosition(clickedPiece.row, clickedPiece.column, emptyRow, emptyColumn);
        updateEmptyPiece(clickedPiece.row, clickedPiece.column);
    }
    var endGame = checkIfCompleted();
    if (endGame && !shuffling){
        showVictoryScreen();
    }
}

function findPiece(id){
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (board[i][j].value == id){
                var res = {
                    row: i,
                    column: j
                }
                return res;
            }
        }
    }
}

function legalMove(row, column) {
    var adjacentRow = row - emptyRow;
    var adjacentColumn = column - emptyColumn;
    if((((adjacentRow == 1) || (adjacentRow == -1)) && adjacentColumn == 0) || (((adjacentColumn == 1) || (adjacentColumn == -1)) && adjacentRow == 0)){
      return true;
    }
    return false;
}

function exchangePosition(row1, column1, row2, column2) {
    var piece1 = board[row1][column1].value;
    var piece2 = board[row2][column2].value;
  
    exchangeValuePosition(row1, column1, row2, column2);
    exchangeDOMPosition(piece1, piece2);
}

function exchangeValuePosition(rowPos1, columnPos1, rowPos2, columnPos2) {
    var prevVal = board[rowPos1][columnPos1].value;
    board[rowPos1][columnPos1].value = board[rowPos2][columnPos2].value;
    board[rowPos2][columnPos2].value = prevVal;
}

function exchangeDOMPosition(idPiece1, idPiece2) {
    var elementPiece1 = document.getElementById(idPiece1);
    var elementPiece2 = document.getElementById(idPiece2);
  
    var parentPiece = elementPiece1.parentNode;
  
    var cloneElement1 = elementPiece1.cloneNode(true);
    var cloneElement2 = elementPiece2.cloneNode(true);
  
    parentPiece.replaceChild(cloneElement1, elementPiece2);
    parentPiece.replaceChild(cloneElement2, elementPiece1);

    //The event listener gets deleted when we replace the nodes, so we create a new one.
    createEventListener(cloneElement1);
}

function updateEmptyPiece(newRow, newColumn) {
    emptyRow = newRow;
    emptyColumn = newColumn;
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

    var direction = Math.floor(Math.random()*16);
    movePiece(direction, true);
  
    shufflePieces(times - 1);
  }

function start() {
    createPieces();
    shufflePieces(500);
}

start();