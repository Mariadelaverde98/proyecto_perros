(function matriz() {
    var div;
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 4; j++) {
            div = document.getElementById("div" + j + i);
            div.style.border = "4px solid black";
            div.style.gridColumnStart = i;
            div.style.gridColumnEnd = i + 1;
            div.style.gridRowStart = j;
            div.style.gridRowEnd = j + 1;
        }
    }
    var fotos = JSON.parse(localStorage.getItem('fotos'));
    var fila;
    var col;
    if (fotos != undefined) {
        for (let i = 1; i < fotos.length + 1; i++) {
            fila = Math.ceil(i / 5);
            col = i % 5;
            if (col == 0) {
                var img = document.querySelector("#div" + fila + "5" + " img");
            } else {
                var img = document.querySelector("#div" + fila + col + " img");
            }
            img.setAttribute("src", fotos[i - 1]);
            img.style.width = "92px";
            img.style.height = "92px";
        }
        grafica();
    }
})();

function random() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => {
            var fotos = JSON.parse(localStorage.getItem('fotos'));
            if (fotos == undefined || fotos.length < 20) {
                muestraRandom(json.message);
                guardaFoto(json.message);
                grafica();
            } else {
                alert('se ha llenado el album.');
            }
        });
}

function muestraRandom(urlPerro) {
    console.log(urlPerro);
    document.getElementsByTagName('img')[0].setAttribute('src', urlPerro);
    document.getElementsByTagName('img')[0].style.width = "150px";
    document.getElementsByTagName('img')[0].style.height = "150px";
}

function pintaPerro(urlPerro) {
    var fotos = JSON.parse(localStorage.getItem('fotos'));
    var fila = Math.ceil(fotos.length / 5);
    var col = fotos.length % 5;
    if (col == 0) {
        var img = document.querySelector("#div" + fila + "5" + " img");
    } else {
        var img = document.querySelector("#div" + fila + col + " img");
    }
    img.setAttribute("src", urlPerro);
    img.style.width = "92px";
    img.style.height = "92px";
}

function guardaFoto(urlPerro) {
    var fotos = JSON.parse(localStorage.getItem('fotos'));
    if (guardarRaza(urlPerro)) {
        if (fotos == undefined) {
            fotos = [urlPerro];
        } else {
            fotos.push(urlPerro);
        }
        localStorage.setItem('fotos', JSON.stringify(fotos));
        pintaPerro(urlPerro);
    }
}

function guardarRaza(urlPerro) {
    var razas = JSON.parse(localStorage.getItem('razas'));
    var guardar = true;
    var indice;
    let i = 30;
    while (indice == undefined) {
        if (urlPerro[i] == '/') {
            indice = i;
        }
        i++;
    }
    var raza = urlPerro.substring(30, indice);

    if (razas != undefined) {
        let j = 0;
        while (guardar && j < razas.length) {
            if (razas[j][0] == raza) {
                razas[j][1]++;
                guardar = false;
            }
            j++;
        }
        if (guardar) {
            razas.push([raza, 1]);
        }
    } else {
        razas = [[raza,1]];
    }

    localStorage.setItem('razas', JSON.stringify(razas));
    return guardar;
}

//------------------------------------Grafica-------------------------

function grafica() {
    const $grafica = document.querySelector("#grafica");
    var razas = JSON.parse(localStorage.getItem('razas'));
    const etiquetas = [];
    const datos = [];
    for(let i = 0; i < razas.length; i++) {
        etiquetas.push(razas[i][0]);
        datos.push(razas[i][1]);
    }
    const datosPerros = {
        label: "razas",
        data: datos, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        backgroundColor: 'rgba(54, 162, 235)', // Color de fondo
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
        borderWidth: 1,// Ancho del borde
    };
    new Chart($grafica, {
        type: 'bar',// Tipo de gráfica
        data: {
            labels: etiquetas,
            datasets: [
                datosPerros,
                // Aquí más datos...
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            },
        }
    });
}
