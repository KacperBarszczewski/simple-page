const canvas = document.getElementById("canvas");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const rozmiarEl = document.getElementById("rozmiar");
const kolorEl = document.getElementById("kolor");
const koszEl = document.getElementById("kosz");
const ctx = canvas.getContext("2d");

let rozmiar = 5;
let wcisniete = false;
let kolor = "black";
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
    wcisniete= true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    wcisniete = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (wcisniete) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        kolo(x2, y2);
        linia(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

function kolo(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, rozmiar, 0, Math.PI * 2);
    ctx.fillStyle = kolor;
    ctx.fill();
}

function linia(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = kolor;
    ctx.lineWidth = rozmiar * 2;
    ctx.stroke();
}

plusBtn.addEventListener("click", () => {
    rozmiar += 2;

    if (rozmiar > 50) {
        rozmiar = 50;
    }

    updateSizeOnScreen();
});

minusBtn.addEventListener("click", () => {
    rozmiar -= 2;

    if (rozmiar < 1) {
        rozmiar = 1;
    }

    updateSizeOnScreen();
});

kolorEl.addEventListener("change", (e) => {
    kolor = e.target.value;
});

koszEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
    rozmiarEl.innerText = rozmiar;
}