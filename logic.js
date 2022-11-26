let cube;
let dim = 3;
const size = 200;

function setup() {
    let canvas = createCanvas(500, 500, WEBGL);
    canvas.parent("canvasContainer");
    //Evita popup al pulsar right click
    for (let element of document.getElementsByClassName("p5Canvas")) {
        element.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    cube = new Cube();
}

let index = 0;
let seq = "";
let unshuffled = false;
function draw() {
    background(51);
    frameRate(120);
    cube.draw();
    if (index < seq.length) {
        frameRate(int(document.getElementById("speed").value));
        cube.follow(seq[index]);
        index++;
    } else if (unshuffled) {
        seq = "";
        index = 0;
        unshuffled = false;
    }

}

function keyPressed() {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
        if (Object.keys(m2).includes(key.toLowerCase())) {
            seq += key;
        }
    }
}

function mousePressed() {
    if (mouseButton == "center") { angle1 = 0; angle2 = 0; };
}

function mouseWheel(e) {
    if (mouseButton == "left") {
        angle1 += (e.delta / 150) * TWO_PI / 20;
    } else {
        angle2 += (e.delta / 150) * TWO_PI / 20;
    }
}

function randomSequence() {
    let n = int(random(10, 21));
    let seq = "";
    for (let i = 0; i < n; i++) {

        if (random(1) < 0.5) {
            seq += m[int(random(6))].toUpperCase();
        } else {
            seq += m[int(random(6))];
        }
    }
    return seq;
}

function suffle() {
    seq += randomSequence();
    console.log(seq);
}

function unsuffle() {
    let seq2 = "";
    for (let i = 0; i < seq.length; i++) {
        if (seq[seq.length - 1 - i] == seq[seq.length - 1 - i].toUpperCase()) {
            seq2 += seq[seq.length - 1 - i].toLowerCase();
        } else {
            seq2 += seq[seq.length - 1 - i].toUpperCase();
        }
    }
    seq = seq2;
    index = 0;
    unshuffled = true;
}

function reset() {
    dim = document.getElementById("dims").value;
    cube = new Cube();
    seq = "";
    index = 0;
    angle1 = 0;
    angle2 = 0
}

function submit() {
    let txt = document.getElementById("algo").value;
    let alg = txt.split(" ");
    console.log(alg);
    let valids = Object.keys(m2);
    for (let i = 0; i < alg.length; i++) {
        if (0 < alg[i].length < 3 && valids.includes(alg[i][0].toLowerCase())) {
            if (alg[i].length == 1) {
                seq += alg[i][0].toLowerCase();
            } else {
                if ("'" === alg[i][1]) {
                    seq += txt[i].toUpperCase();
                }
            }
        }
    }
}

function copyColors(colors) {
    let ncolors = [];
    for (let i = 0; i < 6; i++) {
        ncolors[i] = [];
        for (let j = 0; j < 3; j++) {
            ncolors[i][j] = [];
            for (let k = 0; k < 3; k++) {
                ncolors[i][j][k] = colors[i][j][k];
            }
        }
    }
    return ncolors;
}