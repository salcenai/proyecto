window.addEventListener('load', init, false);
var canvas = null, ctx = null;

//Asignar el valor de las opciones

//if(phpVars[0] == null)var velocidad = 50;
//else var velocidad = phpVars[0];

$(document).ready(function() {
    if (getCookie("Puntuacion") != null && getCookie("Puntuacion") != "") {
        document.getElementById('div_puntuacion').innerHTML = "Mayor Puntuación: " + getCookie("Puntuacion");
    }
});

//var body[0]=new Rectangle(40,40,10,10);
var body = new Array();

var lastPress = null;
var pause = true; //variable que identificara si el juego esta en pausa
var dir = 0; //variable que contendra la direcci�n
var food = new Rectangle(80, 80, 10, 10);
var score = 0; //puntuacion

var wall = new Array();
if (muros == "si") {
    /* Posicion de los muros
     (posicion ancho,posicio alto,ancho de muro,altura de muro)
     */
    wall.push(new Rectangle(260, 20, 10, 10));
    wall.push(new Rectangle(100, 50, 10, 10));
    wall.push(new Rectangle(110, 110, 10, 10));
    wall.push(new Rectangle(210, 60, 10, 10));
    wall.push(new Rectangle(200, 100, 10, 10));
    
    wall.push(new Rectangle(510, 60, 10, 10));
    wall.push(new Rectangle(520, 60, 10, 10));
    wall.push(new Rectangle(510, 70, 10, 10));
    wall.push(new Rectangle(520, 70, 10, 10));
    
    wall.push(new Rectangle(140, 220, 10, 10));
    wall.push(new Rectangle(320, 130, 10, 10));
    wall.push(new Rectangle(130, 240, 10, 10));
    wall.push(new Rectangle(510, 250, 10, 10));
    wall.push(new Rectangle(550, 100, 10, 10));
    
    wall.push(new Rectangle(450, 360, 10, 10));
    wall.push(new Rectangle(350, 280, 10, 10));
    wall.push(new Rectangle(550, 220, 10, 10));
    wall.push(new Rectangle(410, 380, 10, 10));
    wall.push(new Rectangle(400, 350, 10, 10));
    
    wall.push(new Rectangle(100, 360, 10, 10));
    wall.push(new Rectangle(260, 370, 10, 10));
    wall.push(new Rectangle(250, 280, 10, 10));
    wall.push(new Rectangle(140, 370, 10, 10));
    wall.push(new Rectangle(280, 320, 10, 10));
    
    /*
     Nota: para las imagenes mejor no modificar los valores de ancho y alto del muro
     */
}

var gameover = true; //variable para saber si el jugador ha perdido

var KEY_ENTER = 13;
if (teclado == "flechas") {
    var KEY_LEFT = 37; //variable "constante" que contiene el valor numerico de la tecla izquierda
    var KEY_UP = 38; //variable "constante" que contiene el valor numerico de la tecla arriba
    var KEY_RIGHT = 39; //variable "constante" que contiene el valor numerico de la tecla derecha
    var KEY_DOWN = 40; //variable "constante" que contiene el valor numerico de la tecla abajo
} else {
    var KEY_LEFT = 65; //variable "constante" que contiene el valor numerico de la tecla izquierda
    var KEY_UP = 87; //variable "constante" que contiene el valor numerico de la tecla arriba
    var KEY_RIGHT = 68; //variable "constante" que contiene el valor numerico de la tecla derecha
    var KEY_DOWN = 83; //variable "constante" que contiene el valor numerico de la tecla abajo  
}

//Asignar las imagenes al cuerpo de la serpiente, la manzana y los muros

var iBody = new Image(), iFood = new Image(), iMuro = new Image();

iBody.src = '../../recursos/imagenes/snake/cuerpo.png';
iFood.src = '../../recursos/imagenes/snake/fruit.png';
iMuro.src = '../../recursos/imagenes/snake/muro.png';

var background=new Image();
background.src='../../recursos/imagenes/snake/fondo.jpg';

//Asignar los sonidos de muerte y comida de manzana

var aEat = new Audio(), aDie = new Audio();

aEat.src = '../../recursos/sound/snake/chomp.m4a';
aDie.src = '../../recursos/sound/snake/WilhelmScream.mp3';


function init() {
    canvas = document.getElementById('canvas');
    canvas.style.background = '#000';
    ctx = canvas.getContext('2d');
    run();
    repaint();
}

function run() {
    setTimeout(run, velocidad);

    act();
}

function repaint() {
    requestAnimationFrame(repaint);
    paint(ctx);
}

function act() {
    if (!pause) {

        //Para ejecutar la funcion reset si el jugador ha perdido
        if (gameover) {
            reset();
        }
        ;

        //Mover el cuerpo de la serpiente
        for (var i = body.length - 1; i > 0; i--) {
            body[i].x = body[i - 1].x;
            body[i].y = body[i - 1].y;
        }

        //Cambiar direccion
        if (lastPress == KEY_UP && dir != 2) {
            dir = 0;
        }
        ;
        if (lastPress == KEY_RIGHT && dir != 3) {
            dir = 1;
        }
        ;
        if (lastPress == KEY_DOWN && dir != 0) {
            dir = 2;
        }
        ;
        if (lastPress == KEY_LEFT && dir != 1) {
            dir = 3;
        }
        ;

        //Mover la cabeza
        if (dir == 0) {
            body[0].y -= 10;
        }
        ;
        if (dir == 1) {
            body[0].x += 10;
        }
        ;
        if (dir == 2) {
            body[0].y += 10;
        }
        ;
        if (dir == 3) {
            body[0].x -= 10;
        }
        ;

        //Comprobar si el rectangulo salio de la pantalla
        if (body[0].x > canvas.width - 10) {
            body[0].x = 0;
        }
        ;
        if (body[0].y > canvas.height - 10) {
            body[0].y = 0;
        }
        ;
        if (body[0].x < 0) {
            body[0].x = canvas.width - 10;
        }
        ;
        if (body[0].y < 0) {
            body[0].y = canvas.height - 10;
        }
        ;

        //Comprobar si el muro esta encima del jugador o comida
        for (var i = 0, l = wall.length; i < l; i++) {
            if (food.intersects(wall[i])) {
                food.x = random(canvas.width / 10 - 1) * 10;
                food.y = random(canvas.height / 10 - 1) * 10;
            }

            if (body[0].intersects(wall[i])) {
                gameover = true;

                aDie.play(); //reproducir el sonido de la muerte

                establecerPuntuacion();

                pause = true;
            }
        }

        //Comprobar si la cabeza interfiere con el cuerpo
        for (var i = 2, l = body.length; i < l; i++) {
            if (body[0].intersects(body[i])) {
                gameover = true;

                aDie.play(); // reproducir el sonido de la muerte

                establecerPuntuacion();

                pause = true;
            }
        }

        //Comprobar si la comida esta encima
        if (body[0].intersects(food)) {
            aEat.play(); // reproducir el sonido de comer la manzana
            body.push(new Rectangle(food.x, food.y, 10, 10));
            score++;
            food.x = random(canvas.width / 10 - 1) * 10;//seleccionar un lugar al azar en horizontal para la nueva comida
            food.y = random(canvas.height / 10 - 1) * 10;//seleccionar un lugar al azar en vertical para la nueva comida
        }

    }
    ;
    //Cambiar la pausa al valor contrario
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }
    ;
}

function paint(ctx) {
    
//    ctx.clearRect(0, 0, canvas.width, canvas.height);
//    ctx.fillStyle = '#0f0';
    
    if(background.width){
        ctx.drawImage(background,0,0);
    }
    else{
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }

    for (var i = 0, l = body.length; i < l; i++) { //Pinta todo el cuerpo de la serpiente
        //body[i].fill(ctx); //antes de que tuviese imagen
        ctx.drawImage(iBody, body[i].x, body[i].y);
    }
    ctx.fillStyle = '#999';

    for (var i = 0, l = wall.length; i < l; i++) {
        //wall[i].fill(ctx);
        ctx.drawImage(iMuro, wall[i].x, wall[i].y);
    }
    ;

    ctx.fillStyle = '#f00';

//    food.fill(ctx); //antes de que tuviera imagen
    ctx.drawImage(iFood, food.x, food.y);

    ctx.fillText('Puntuacion: ' + score, 0, 10);

    //Para que se muestrre el texto "PAUSA" o "GAME OVER" en caso de que este activada la pausa
    if (pause) {
        ctx.textAlign = 'center';
        if (gameover) {
            ctx.fillText('Pulsa ENTER para comenzar', 300, 200)
        } else {
            ctx.fillText('Pausa', 300, 200);
        }
        ctx.textAlign = 'left';
    }
    ;
}

document.addEventListener('keydown', function(evt) {
    lastPress = evt.keyCode;
}, false);

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 17);
            };
})();

function Rectangle(x, y, width, height) {
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.width = (width == null) ? 0 : width;
    this.height = (height == null) ? this.width : height;

    this.intersects = function(rect) {
        if (rect != null) {
            return(this.x < rect.x + rect.width &&
                    this.x + this.width > rect.x &&
                    this.y < rect.y + rect.height &&
                    this.y + this.height > rect.y);
        }
    }

    this.fill = function(ctx) {
        if (ctx != null) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function reset() {

    score = 0;
    dir = 1;

    /*
     body[0].x=40;
     body[0].y=40;
     */

    body.length = 0;
    body.push(new Rectangle(40, 40, 10, 10));
    body.push(new Rectangle(0, 0, 10, 10));
    body.push(new Rectangle(0, 0, 10, 10));

    food.x = random(canvas.width / 10 - 1) * 10;
    food.y = random(canvas.height / 10 - 1) * 10;

    gameover = false;
}

function establecerPuntuacion() {

    if (getCookie("Puntuacion") == null || getCookie("Puntuacion") == "") {
        setCookie("Puntuacion", 0, 30);
    }

    var mayorPuntuacion = parseInt(getCookie("Puntuacion"));

    if (score > mayorPuntuacion) {

        setCookie("Puntuacion", score, 30); //crea la cookie con la puntuación
        document.getElementById('div_puntuacion').innerHTML = "Mayor Puntuación: " + score;
    }


}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;

}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}