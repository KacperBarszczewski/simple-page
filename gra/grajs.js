var gracz = document.getElementById("gracz");
var gracz2 = document.getElementById("gracz2");
var koniec = document.getElementById("koniec");
var licznik = 0;

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
        wLewo();
    }
    if (event.key === "ArrowRight") {
        wPrawo();
    }
});

function wLewo() {
    let lewo = parseInt(window.getComputedStyle(gracz).getPropertyValue("left"));
    lewo -= 100;
    if (lewo >= 0) {
        gracz.style.left = lewo + "px";
    }
}

function wPrawo() {
    let lewo = parseInt(window.getComputedStyle(gracz).getPropertyValue("left"));
    lewo += 100;
    if (lewo < 300) {
        gracz.style.left = lewo + "px";
    }
}

gracz2.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * 3);
    let lewo = random * 100;
    gracz2.style.left = lewo + "px";
    licznik++;

    if (licznik == 2) {
        gracz2.style.animation = "slide 1s infinite linear";
    }
    if (licznik == 5) {
        gracz2.style.animation = "slide 0.5s infinite linear";
    }

    koniec.innerText = licznik;
});

setInterval(function () {
    var graczLewo = parseInt(window.getComputedStyle(gracz).getPropertyValue("left"));
    var gracz2Lewo = parseInt(window.getComputedStyle(gracz2).getPropertyValue("left"));
    var gracz2Gora = parseInt(window.getComputedStyle(gracz2).getPropertyValue("top"));
    if (graczLewo == gracz2Lewo && gracz2Gora < 500 && gracz2Gora > 300) {
        gracz.style.top = "200px";
        gracz.style.height = "200px";
        gracz.style.backgroundImage = "url(zdjecia/samochod3.png)";
        gracz2.style.animation = "none";

        document.getElementById("menu").style.visibility = "visible";
        //
        dodanieDane();
    }
}, 1);

function nowagra() {
    document.getElementById("menu").style.visibility = "hidden";
    licznik = 0;
    koniec.innerText = licznik;

    gracz.style.top = "300px";
    gracz.style.height = "100px";
    gracz.style.backgroundImage = "url(zdjecia/samochod1.png)";
    gracz2.style.animation = "slide 2s infinite linear";
}

/////  JSON
const url = 'tab.json'
let tabelka2 = document.getElementById("tabelka2");
var res2 = [];

function pobieranieDanych() {
    let res;
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if ((this.status == 200)) {
    
                res = JSON.parse(this.responseText);
                //console.log(res);
            }
        }
        xhttp.open('GET', 'tab.json', false);
        xhttp.send();
    
        res2 = res;
        
    } catch (error) {
        res=[];
    }
    
    wyswietlDane(res);
}


function wyswietlDane(res) {

    while (tabelka2.rows.length >= 2) {
        tabelka2.deleteRow(1);
    }

    let i = 0;
    res.forEach(user => {
        let row = tabelka2.insertRow();
        row.id = i;

        row.onclick = function () {
            res2.splice(this.id, 1);
            wyswietlDane(res2);
        };

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = user.imie;
        cell2.innerHTML = user.wynik;
        i++;
    });

    //var data = new FormData();
}


function dodanieDane() {
    let imie = document.getElementById("imie").value;

    res2.push({ "imie": imie, "wynik": licznik })
    wyswietlDane(res2);

}

async function zapiszDane() {

    let myBlob = new Blob(
        [JSON.stringify(res2, null, 2)],
        { type: "application/json" }
    );

    // let url2 = window.URL.createObjectURL(myBlob);
    // var anchor = document.createElement("a");
    // anchor.href=url2;
    // anchor.download="tab.json";

    // anchor.click();
    // window.URL.revokeObjectURL(url2);
    // document.removeChild(anchor);

    const opts = {
        suggestedName: 'tab.json',
        types: [{
            accept: { 'application/json': ['.json'] },
        }],
    };

    const fileHandle = await window.showSaveFilePicker(opts);
    const fileStrem = await fileHandle.createWritable();

    await fileStrem.write(myBlob);
    await fileStrem.close();

}
//zegar
function odliczanie() {
    var dzisiaj = new Date();

    var godzina = dzisiaj.getHours();
    if (godzina < 10) godzina = "0" + godzina;

    var minuta = dzisiaj.getMinutes();
    if (minuta < 10) minuta = "0" + minuta;

    var sekunda = dzisiaj.getSeconds();
    if (sekunda < 10) sekunda = "0" + sekunda;

    document.getElementById("zegar").innerHTML = godzina + ":" + minuta + ":" + sekunda;

    setTimeout("odliczanie()", 1000);
}
///
pobieranieDanych();
odliczanie();
