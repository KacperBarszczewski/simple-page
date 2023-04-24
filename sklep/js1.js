function openNav() {
    document.getElementById("mySidenav").style.width = "30%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var ilosc;
var rozmiar;
var kolor2;
var stankoszyka;

var idrzeczy=0;

function pobierzWartościzkoszulka(kolor2) {
    ilosc = "" + document.getElementById("ilosckoszulkaB").value;
    rozmiar = "" + document.getElementById("TabRozkoszulkaB").value;
    kolor = "" + kolor2;
    dodaniedokoszyka();
}

function dodaniedokoszyka() {
    if (ilosc > 0) {
        idrzeczy=idrzeczy+1;
        var text1 = document.getElementById("mySidenav").innerHTML;
        document.getElementById("mySidenav").innerHTML = "" + text1 + " " + '<div id="idrzeczy'+idrzeczy+'"><div class="zakup"><img src="zdjecia/koszulka' + kolor + '.jpg" alt=""><div class="RozIlo"><p>Rozmiar:' + rozmiar + '</p><p>Ilość: ' + ilosc + '</p><a onclick="usunzkoszyka('+idrzeczy+')" href="javascript:void(0)" class="usun">&times;</a></div></div></div>';
    }

}

function usunzkoszyka(idrzeczy){
    var id= "idrzeczy"+idrzeczy;
    document.getElementById(id).innerHTML="";

}