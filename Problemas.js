function generarProblemas() {
    var div = document.getElementById("niv");
    div.parentNode.removeChild(div);

    var formulario = '';
    formulario += '<div class="form-register">';
    formulario += '<div align="right"> <span id="minutos">0</span>:<span id="segundos">0</span> </div>';
    formulario += '<div><p id="problem"></p></div>';
    formulario += '<input class="controls" type="text" name="respuesta" id="respuesta" onkeydown="validarInput(event)" placeholder="Ingrese su respuesta" required autocomplete="off">';
    formulario += '<button class="botons" onclick="Comprobar()">Comprobar</button>';
    formulario += '<div><span id="numpregunta"></span> / <span id="totalpreguntas"></span> </div>';
    formulario += '</div>';
    document.getElementById("problemas").innerHTML = formulario;
    tiempo();
    PrimerProblema();
}


function generarPalabra() {
    var div = document.getElementById("problemas");
    div.parentNode.removeChild(div);
    var formularioHTML = '';
    formularioHTML += '<div class="form-register">';
    formularioHTML += '<div align="right"><span id="minutos">0</span>:<span id="segundos">0</span></div>';
    formularioHTML += '<div> <div align="center">Ordena la palabra</div> <p id="palabras"></p> </div>';
    formularioHTML += '<input class="controls" type="text" name="respuestaPal" id="respuestaPal" oninput="validarLetras(event)" placeholder="Ingrese su respuesta">';
    formularioHTML += '<button class="botons" onclick="comprobarPalabra()">Comprobar</button>';
    formularioHTML += '<div>Intentos <span id="prueba"></span> / 3</div>';
    formularioHTML += '<button class="botons" onclick="obtenerPistas()">Obtener Pistas</button>';
    formularioHTML += '<div id="pistas"></div></div>';
    document.getElementById("palabra").innerHTML = formularioHTML;
    tiempo();
    colocarpalabra();

}

function validarInput(event) {
    var tecla = event.keyCode || event.which;
    // Verificar si la tecla presionada es una letra
    if ((tecla >= 65 && tecla <= 90) || (tecla >= 97 && tecla <= 122)) {
        event.preventDefault(); // Cancelar el evento de la tecla
    }
}


function PrimerProblema() {
    $.ajax({
        url: 'problema.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#problem').html(data[0]);
            document.getElementById("totalpreguntas").innerHTML = data.length;
        },
        error: function () {
            $('#problem').text('Error al obtener los datos');
        }
    });
    document.getElementById("numpregunta").innerHTML = 1;
}

function Comprobar() {
    var respuesta = document.getElementById('respuesta').value;
    var idPregunta = document.getElementById('numpregunta').innerHTML;
    $.ajax({
        url: 'resultado.php',
        type: 'POST',
        data: { respuesta: respuesta, idPregunta: idPregunta },
        dataType: 'json',
        success: function (data) {
            if (data.coincide) {
                //alert('El dato coincide');
                palabra(idPregunta - 1);
                idPregunta++;
                document.getElementById("numpregunta").innerHTML = idPregunta;
                document.getElementById("respuesta").value = '';
                siguientePregunta();

            } else {
                alert('Respuesta incorrecta \n\nIngresa tu respuesta lo más simplificada posible (si contiene enteros colocala de forma mixta), separa con un espacio los enteros');
            }
        },
        error: function () {
            alert('Error al comparar los datos');
        }
    });
}

function siguientePregunta() {
    var idPregunta = document.getElementById('numpregunta').innerHTML;
    var total = document.getElementById('totalpreguntas').innerHTML;

    if (idPregunta <= total) {
        $.ajax({
            url: 'problema.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $('#problem').html(data[idPregunta - 1]);
            },
            error: function () {
                $('#problem').text('Error al obtener los datos');
            }
        });
    } else if (idPregunta > total) {
        generarPalabra();
    }

}

function tiempo() {
    contador_s = 00;
    contador_m = 00;
    s = document.getElementById("segundos");
    m = document.getElementById("minutos");

    window.setInterval(
        function () {
            if (contador_s == 60) {
                contador_s = 00;
                contador_m++;
                m.innerHTML = contador_m;
                if (contador_m == 00) {
                    contador_m = 00;
                }
            }

            s.innerHTML = contador_s;
            contador_s++;
        }, 1000);
}



function palabra(numletra) {
    $.ajax({
        url: 'palabras.php',
        method: 'GET',
        success: function (response) {
            var palabra = response;
            var caracteres = palabra.split('');
            alert(caracteres[numletra] + '\n\n Guarda esta letra que al terminar los problemas tendras que adivinar la palabra');
        },
        error: function () {
            alert('Error al obtener palabra');
        }
    });
}

function validarLetras(event) {
    var input = event.target;
    var valor = input.value;
    var regex = /^[a-zA-Z]+$/;

    if (!regex.test(valor)) {
        input.value = valor.replace(/[^a-zA-Z]/g, '');
    }
}

function colocarpalabra() {
    $.ajax({
        url: 'palabras.php',
        method: 'GET',
        success: function (response) {
            var palabra = response;
            var palabraDesordenada = desordenarPalabra(palabra);
            $('#palabras').html(palabraDesordenada);

        },
        error: function () {
            alert('Error al obtener palabra');
        }
    });
}

function desordenarPalabra(palabra) {
    var caracteres = palabra.split('');
    caracteres.sort(function () {
        return 0.5 - Math.random();
    });

    var palabraDesordenada = caracteres.join('');
    return palabraDesordenada;
}


contador = 0;
function comprobarPalabra() {
    var respuesta = document.getElementById('respuestaPal').value;
    if (contador < 3) {
        $.ajax({
            url: 'palabras.php',
            method: 'GET',
            success: function (response) {
                if (response == respuesta.toUpperCase()) {//GANADOR
                    alert('Revisa tu whatsapp');
                    //guardarPartida(1);
                    ejecutarPY(1);
                    window.location.href = "http://localhost/Fraccionados/niveles.html";

                } else {
                    alert('Respuesta incorrecta');
                    contador++;
                    document.getElementById("prueba").innerHTML = contador;
                    if (contador == 3) {//PERDEDOR
                       alert('Revisa tu whatsapp');
                        //guardarPartida(2);
                        ejecutarPY(2);
                        window.location.href = "http://localhost/Fraccionados/niveles.html";
                    }
                }
            },
            error: function () {
                alert('Error al comparar los datos');
            }
        });
    }
}

function ejecutarPY(opc) {
    //var numero_telefono = "9513305967";  
    var user = localStorage.getItem("nombreUsuario");
    var numero_telefono=localStorage.getItem("telefono");
    var mensaje = '';
        if (opc == 1) {
            mensaje = user + " GANASTE!!!!!! "; 
        } else if (opc == 2) {
            mensaje = user + " PERDISTE!!!!!! "
        }
        $.ajax({
            url: "menpy.php",
            type: "POST",
            data: { numero_telefono: numero_telefono, mensaje: mensaje },
            success: function (response) {
                // Maneja la respuesta del archivo PHP
                console.log(response);
            },
            error: function (xhr, status, error) {
                // Manejo de errores en caso de que la petición falle
                console.error(error);
            }
        });
}

var pistasArray = [];  
contadorpistas=0;
function obtenerPistas() {
    $.ajax({
        url: "pistas.php",
        type: "POST",
        data: { obtener_pistas: true },
        success: function(response) {
            // Almacena las pistas obtenidas en el array
            pistasArray = response.split("\n");

            // Muestra la primera pista
            mostrarPista(contadorpistas);
            contadorpistas++;
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

function mostrarPista(indice) {
    var pista = pistasArray[indice];

    if (pista) {
        $("#pistas").text(pista);
    } else {
        $("#pistas").text("No hay más pistas disponibles.");
    }
}

function guardarPartida(i) {
    var userID = localStorage.getItem("userID");
    var ganador;
    if(i==1){
        genador=1;
    }else if(i==2){
        ganador==2
    }
    $.ajax({
        url: 'partida.php',
        type: 'POST',
        data: { userID: userID, ganador: ganador },
        success: function(response) {
            // Manejar la respuesta del archivo PHP (por ejemplo, mostrar un mensaje de éxito)
            console.log(response);
            alert('Partida guardada correctamente');
        },
        error: function(xhr, status, error) {
            // Manejar errores en caso de que la solicitud falle
            console.error(error);
            alert('Error al guardar la partida');
        }
    });

}
