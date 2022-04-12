
let canvasWidth = 640;
let canvasHeight = 640;

let unitWidth = 72;

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

onload = function() {
    init();
    drawCanvas();
};

function init() {

}

function calculateXY(x, y, z) {
    let drawX = x * unitWidth + 18 - canvasHeight * 1.3;
    let drawY = canvasHeight - (y * unitWidth + 18) + canvasHeight * 0.3;
    drawX += z * 24;
    drawY -= z * 24;
    return {x: drawX, y: drawY};
}

function getNoteName(index) {
    return notes[index % 12];
}

function drawCanvas() {
    var boardCanvas = document.getElementById('canvas');
    var boardContext = boardCanvas.getContext('2d');
    boardContext.clearRect(0, 0, canvasWidth, canvasHeight);

    boardContext.fillStyle = "#FFFFFF";
    boardContext.fillRect(0, 0, canvasWidth, canvasHeight);

    let drawXY;
    for (let z = 10; z >= 6; z--) {
        for (let x = 10; x <= 14; x++) {
            for (let y = 2; y <= 6; y++) {
                let chordType = getChordType(x, y, z);
                if (chordType == 1) {
                    boardContext.fillStyle = "#FF0000FF";
                    boardContext.strokeStyle = "#00000066";
                } else if (chordType == 2) {
                    boardContext.fillStyle = "#0000FFFF";
                    boardContext.strokeStyle = "#00000066";
                } else if (chordType == 3) {
                    boardContext.fillStyle = "#880088FF";
                    boardContext.strokeStyle = "#00000066";
                // } else if (chordType == 4) {
                //     boardContext.fillStyle = "#CCCC00FF";
                //     boardContext.strokeStyle = "#00000066";
                } else {
                    boardContext.fillStyle = "#00000000";
                }

                if (chordType == 1 || chordType == 2 || chordType == 3) {
                    boardContext.strokeWidth = 2;
                    boardContext.beginPath();

                    drawXY = calculateXY(x - 0.5, y, z);
                    boardContext.moveTo(drawXY.x, drawXY.y);

                    drawXY = calculateXY(x + 0.5, y, z);
                    boardContext.lineTo(drawXY.x, drawXY.y);
                    boardContext.stroke();

                    drawXY = calculateXY(x, y - 0.5, z);
                    boardContext.moveTo(drawXY.x, drawXY.y);

                    drawXY = calculateXY(x, y + 0.5, z);
                    boardContext.lineTo(drawXY.x, drawXY.y);
                    boardContext.stroke();

                    drawXY = calculateXY(x, y, z - 0.5);
                    boardContext.moveTo(drawXY.x, drawXY.y);

                    drawXY = calculateXY(x, y, z + 0.5);
                    boardContext.lineTo(drawXY.x, drawXY.y);
                    boardContext.stroke();
                }

                if (chordType != 0) {
                    drawXY = calculateXY(x, y, z);

                    boardContext.beginPath();
                    boardContext.arc(drawXY.x,
                        drawXY.y,
                        6, 0,
                        Math.PI * 2, false);
                    boardContext.fill();

                    boardContext.fillText("(" + getNoteName(x) + "," + getNoteName(y) + "," + getNoteName(z) + ")",
                        drawXY.x + 6, 
                        drawXY.y + 12);
                }

            }
        }
    }
}

function getChordTypeCore(x, y, z) {
    if (getMod(x, y) == 4 && getMod(y, z) == 3) {
        return 1;
    }
    if (getMod(x, y) == 3 && getMod(y, z) == 4) {
        return 2;
    }
    if (getMod(x, y) == 4 && getMod(y, z) == 4) {
        return 3;
    }
    if (getMod(x, y) == 3 && getMod(y, z) == 3) {
        return 4;
    }

    return 0;
}

function getChordType(x, y, z) {
    let result;
    result = getChordTypeCore(x, y, z);
    if (result != 0) {
        return result;
    }
    result = getChordTypeCore(y, z, x);
    if (result != 0) {
        return result;
    }
    result = getChordTypeCore(z, x, y);
    if (result != 0) {
        return result;
    }
    result = getChordTypeCore(z, y, x);
    if (result != 0) {
        return result;
    }
    result = getChordTypeCore(y, x, z);
    if (result != 0) {
        return result;
    }
    result = getChordTypeCore(x, z, y);
    if (result != 0) {
        return result;
    }
    return 0;
}

function getMod(a, b) {
    while (a < 0) {
        a += 12;
    }
    while (b < 0) {
        b += 12;
    }
    while (a >= 12) {
        a -= 12;
    }
    while (b >= 12) {
        b -= 12;
    }
    if (a > b) {
        return (b + 12) - a;
    } else {
        return b - a;
    }
}
