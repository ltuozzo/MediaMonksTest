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

            document.getElementById("puzzle").appendChild(div);
            k++;
        }
    }

    document.getElementById("15").style.background = 'none';    
}

function start() {
    createPieces();
}

start();