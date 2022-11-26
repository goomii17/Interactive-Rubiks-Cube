let m = { 0: "u", 1: "r", 2: "l", 3: "d", 4: "f", 5: "b" };
let m2 = { u: "0", r: "1", l: "2", d: "3", f: "4", b: "5" };
let angle1 = 0, angle2 = 0;

class Cube {
    constructor() {
        this.faces = {
            u: new Face("u", "yellow"),
            r: new Face("r", "red"),
            l: new Face("l", "orange"),
            d: new Face("d", "white"),
            f: new Face("f", "blue"),
            b: new Face("b", "green")
        }
        this.colors = [];
        let t = ["yellow", "red", "orange", "white", "blue", "green"];
        for (let i = 0; i < 6; i++) {
            this.colors[i] = [];
            for (let y = 0; y < dim; y++) {
                this.colors[i][y] = [];
                for (let x = 0; x < dim; x++) {
                    this.colors[i][y][x] = t[i];
                }
            }
        }
        this.updateColors(this.colors);
    }
    draw() {
        translate(0, 25, 0);
        push();
        rotateX(-PI / 8);
        rotateY(-PI / 4);
        rotate((angle1), [1, 0, -1]);
        rotateY((angle2));
        for (let i = 0; i < 6; i++) {
            this.faces[m[i]].draw(this.colors);
        }
        pop();
        this.drawFaces();
    }
    drawFaces() {
        translate(-width / 2, -350, -size);
        let s = 40 / dim;
        let xmargin = width / 2 - (s * dim);
        let ymargin = 40;
        for (let y = 0; y < dim; y++) {
            for (let x = 0; x < dim; x++) {
                fill(this.colors[2][y][x]);
                rect(xmargin + (x * s) + (-1 * (s * dim + 0.5)), y * s + ymargin, s);
            }
        }
        for (let y = 0; y < dim; y++) {
            for (let x = 0; x < dim; x++) {
                fill(this.colors[4][y][x]);
                rect(xmargin + (x * s), y * s + ymargin, s);
            }
        }
        for (let y = 0; y < dim; y++) {
            for (let x = 0; x < dim; x++) {
                fill(this.colors[1][y][x]);
                rect(xmargin + (x * s) + s * dim + 0.5, y * s + ymargin, s);
            }
        }
        for (let y = 0; y < dim; y++) {
            for (let x = 0; x < dim; x++) {
                fill(this.colors[5][y][x]);
                rect(xmargin + (x * s) + (2 * (s * dim + 0.5)), y * s + ymargin, s);
            }
        }
        for (let y = 0; y < dim; y++) {
            for (let x = 0; x < dim; x++) {
                fill(this.colors[0][y][x]);
                rect(xmargin + (x * s), (y * s + ymargin) - s * dim, s);
            }
        }
        for (let y = 0; y < dim; y++) {
            for (let x = 0; x < dim; x++) {
                fill(this.colors[3][y][x]);
                rect(xmargin + (x * s), (y * s + ymargin) + s * dim, s);
            }
        }
    }
    updateColors(colors) {
        for (let i = 0; i < colors.length; i++) {
            for (let y = 0; y < dim; y++) {
                for (let x = 0; x < dim; x++) {
                    this.faces[m[i]].boxes[y][x].color = colors[i][y][x];
                    this.colors[i][y][x] = colors[i][y][x];
                }
            }
        }
    }
    follow(move) {
        let dir = " ";
        if (move.toUpperCase() == move) {
            dir = "'";
        }
        this.faces[move.toLowerCase()].rotate(dir, this.colors);
        this.updateColors(this.colors);
    }
}

class Face {
    constructor(orientation) {
        this.boxes = [];
        this.orientation = orientation;
        for (let i = 0; i < dim; i++) {
            this.boxes[i] = [];
            for (let j = 0; j < dim; j++) {
                this.boxes[i][j] = new Box(j, i, orientation, round(size / dim, 1));
            }
        }
    }
    draw(colors) {
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                this.boxes[i][j].draw(colors);
            }
        }
    }

    rotate(dir, colors) {
        let array2d = colors[m2[this.orientation]];
        let copy = [];
        for (let i = 0; i < dim; i++) {
            copy.push(array2d[i].slice());
        }
        if (dir == " ") {
            for (let i = 0; i < dim; i++) {
                for (let j = 0; j < dim; j++) {
                    array2d[i][j] = copy[dim - j - 1][i];
                }
            }
            if (this.orientation == "u") {
                let temp = colors[m2["f"]][0].slice();
                colors[m2["f"]][0] = colors[m2["r"]][0].slice();
                colors[m2["r"]][0] = colors[m2["b"]][0].slice();
                colors[m2["b"]][0] = colors[m2["l"]][0].slice();
                colors[m2["l"]][0] = temp;
            }
            if (this.orientation == "d") {
                let temp = colors[m2["f"]][dim - 1].slice();
                colors[m2["f"]][dim - 1] = colors[m2["l"]][dim - 1].slice();
                colors[m2["l"]][dim - 1] = colors[m2["b"]][dim - 1].slice();
                colors[m2["b"]][dim - 1] = colors[m2["r"]][dim - 1].slice();
                colors[m2["r"]][dim - 1] = temp;
            }
            if (this.orientation == "f") {
                let temp = colors[m2["u"]][dim - 1].slice();
                let lCol = [];
                for (let i = 0; i < dim; i++) {
                    lCol.push(colors[m2["l"]][dim - 1 - i][dim - 1]);
                }
                colors[m2["u"]][dim - 1] = lCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["l"]][i][dim - 1] = colors[m2["d"]][0][i];
                }
                let rCol = [];
                for (let i = 0; i < dim; i++) {
                    rCol.push(colors[m2["r"]][dim - 1 - i][0]);
                }
                colors[m2["d"]][0] = rCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["r"]][i][0] = temp[i];
                }
            }
            if (this.orientation == "b") {
                let temp = colors[m2["u"]][0].slice();
                let rCol = [];
                for (let i = 0; i < dim; i++) {
                    rCol.push(colors[m2["r"]][i][dim - 1]);
                }
                colors[m2["u"]][0] = rCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["r"]][i][dim - 1] = colors[m2["d"]][dim - 1][dim - 1 - i];
                }
                let lCol = [];
                for (let i = 0; i < dim; i++) {
                    lCol.push(colors[m2["l"]][i][0]);
                }
                colors[m2["d"]][dim - 1] = lCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["l"]][i][0] = temp[dim - 1 - i];
                }
            }
            if (this.orientation == "r") {
                let temp = [];
                for (let i = 0; i < dim; i++) {
                    temp.push(colors[m2["u"]][dim - 1 - i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["u"]][i][dim - 1] = colors[m2["f"]][i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["f"]][i][dim - 1] = colors[m2["d"]][i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["d"]][i][dim - 1] = colors[m2["b"]][dim - 1 - i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["b"]][i][0] = temp[i]);
                }
            }
            if (this.orientation == "l") {
                let temp = [];
                for (let i = 0; i < dim; i++) {
                    temp.push(colors[m2["u"]][i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["u"]][i][0] = colors[m2["b"]][dim - 1 - i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["b"]][i][dim - 1] = colors[m2["d"]][dim - 1 - i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["d"]][i][0] = colors[m2["f"]][i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["f"]][i][0] = temp[i]);
                }
            }
        } else {
            for (let i = 0; i < dim; i++) {
                for (let j = 0; j < dim; j++) {
                    array2d[i][j] = copy[j][dim - 1 - i];
                }
            }
            if (this.orientation == "u") {
                let temp = colors[m2["f"]][0].slice();
                colors[m2["f"]][0] = colors[m2["l"]][0].slice();
                colors[m2["l"]][0] = colors[m2["b"]][0].slice();
                colors[m2["b"]][0] = colors[m2["r"]][0].slice();
                colors[m2["r"]][0] = temp;
            }
            if (this.orientation == "d") {
                let temp = colors[m2["f"]][dim - 1].slice();
                colors[m2["f"]][dim - 1] = colors[m2["r"]][dim - 1].slice();
                colors[m2["r"]][dim - 1] = colors[m2["b"]][dim - 1].slice();
                colors[m2["b"]][dim - 1] = colors[m2["l"]][dim - 1].slice();
                colors[m2["l"]][dim - 1] = temp;
            }
            if (this.orientation == "f") {
                let temp = colors[m2["u"]][dim - 1].slice();
                let rCol = [];
                for (let i = 0; i < dim; i++) {
                    rCol.push(colors[m2["r"]][i][0]);
                }
                colors[m2["u"]][dim - 1] = rCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["r"]][i][0] = colors[m2["d"]][0][dim - 1 - i];
                }
                let lCol = [];
                for (let i = 0; i < dim; i++) {
                    lCol.push(colors[m2["l"]][i][dim - 1]);
                }
                colors[m2["d"]][0] = lCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["l"]][i][dim - 1] = temp[dim - 1 - i];
                }
            }
            if (this.orientation == "b") {
                let temp = colors[m2["u"]][0].slice();
                let lCol = [];
                for (let i = 0; i < dim; i++) {
                    lCol.push(colors[m2["l"]][dim - 1 - i][0]);
                }
                colors[m2["u"]][0] = lCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["l"]][i][0] = colors[m2["d"]][dim - 1][i];
                }
                let rCol = [];
                for (let i = 0; i < dim; i++) {
                    rCol.push(colors[m2["r"]][dim - 1 - i][dim - 1]);
                }
                colors[m2["d"]][dim - 1] = rCol;
                for (let i = 0; i < dim; i++) {
                    colors[m2["r"]][i][dim - 1] = temp[i];
                }
            }
            if (this.orientation == "r") {
                let temp = [];
                for (let i = 0; i < dim; i++) {
                    temp.push(colors[m2["u"]][i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["u"]][i][dim - 1] = colors[m2["b"]][dim - 1 - i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["b"]][i][0] = colors[m2["d"]][dim - 1 - i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["d"]][i][dim - 1] = colors[m2["f"]][i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["f"]][i][dim - 1] = temp[i]);
                }
            }
            if (this.orientation == "l") {
                let temp = [];
                for (let i = 0; i < dim; i++) {
                    temp.push(colors[m2["u"]][dim - 1 - i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["u"]][i][0] = colors[m2["f"]][i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["f"]][i][0] = colors[m2["d"]][i][0]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["d"]][i][0] = colors[m2["b"]][dim - 1 - i][dim - 1]);
                }
                for (let i = 0; i < dim; i++) {
                    (colors[m2["b"]][i][dim - 1] = temp[i]);
                }
            }
        }
    }
}

class Box {
    constructor(x, y, or, s) {
        this.x = x;
        this.y = y;
        this.orientation = or;
        this.color = "black";
        this.s = s;
    }
    draw() {
        if (this.orientation == "f") {
            let x = this.x * this.s - size / 2;
            let y = this.y * this.s - size / 2;
            let s = this.s;
            fill(this.color);
            beginShape();
            vertex(x, y, size / 2);
            vertex(x, y + s, size / 2);
            vertex(x + s, y + s, size / 2);
            vertex(x + s, y, size / 2);
            endShape();
        }
        if (this.orientation == "b") {
            let x = this.x * this.s - size / 2;
            let y = this.y * this.s - size / 2;
            let s = this.s;
            fill(this.color);
            //fill(map(this.y, 0, 2, 0, 255), map(this.x, 0, 2, 0, 255));
            beginShape();
            vertex(-x, y, -size / 2);
            vertex(-x, y + s, -size / 2);
            vertex(-x - s, y + s, -size / 2);
            vertex(-x - s, y, -size / 2);
            endShape();
        }
        if (this.orientation == "u") {
            let x = this.x * this.s - size / 2;
            let z = this.y * this.s - size / 2;
            let s = this.s;
            fill(this.color);
            beginShape();
            vertex(x, -size / 2, z);
            vertex(x, -size / 2, z + s);
            vertex(x + s, -size / 2, z + s);
            vertex(x + s, -size / 2, z);
            endShape();
        }
        if (this.orientation == "d") {
            let x = this.x * this.s - size / 2;
            let z = this.y * this.s - size / 2;
            let s = this.s;
            fill(this.color);
            beginShape();
            vertex(x, size / 2, -z);
            vertex(x, size / 2, -z - s);
            vertex(x + s, size / 2, -z - s);
            vertex(x + s, size / 2, -z);
            endShape();
        }
        if (this.orientation == "r") {
            let z = this.x * this.s - size / 2;
            let y = this.y * this.s - size / 2;
            let s = this.s;
            fill(this.color);
            beginShape();
            vertex(size / 2, y, -z);
            vertex(size / 2, y, -z - s);
            vertex(size / 2, y + s, -z - s);
            vertex(size / 2, y + s, -z);
            endShape();
        }
        if (this.orientation == "l") {
            let z = this.x * this.s - size / 2;
            let y = this.y * this.s - size / 2;
            let s = this.s;
            fill(this.color);
            beginShape();
            vertex(-size / 2, y, z);
            vertex(-size / 2, y, z + s);
            vertex(-size / 2, y + s, z + s);
            vertex(-size / 2, y + s, z);
            endShape();
        }
    }
}