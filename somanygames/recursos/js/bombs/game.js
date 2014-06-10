(function(){
    'use strict';
    window.addEventListener('load',init,false);

    $(document).ready(function() {
        if (getCookie("Puntuacion") != null && getCookie("Puntuacion") != "") {
            document.getElementById('div_puntuacion').innerHTML = "Mayor Puntuación: " + getCookie("Puntuacion");
        }
    });
    
    var canvas=null,ctx=null;
    var mousex = 0,mousey = 0;
    var lastUpdate = 0;
    var pause = true;
    var gameover = true;
    var score = 0;
    var eTimer = 0;
    var player = new Circle(0,0,Number(tamano)); //Tercer parametro igual al radio en pixeles del circulo del jugador
    var bombs=[];
    
    // asignacion de imagenes de las bombas
    
    var bombState1 = new Image(), bombState2 = new Image();
    bombState1.src = '../../recursos/imagenes/bombs/1.png';
    bombState2.src = '../../recursos/imagenes/bombs/2.png';
    
    // asignacion de imagenes de player
    
    var player5 = new Image(), player10 = new Image(), player20 = new Image();
    player5.src = '../../recursos/imagenes/bombs/player5.png';
    player10.src = '../../recursos/imagenes/bombs/player10.png';
    player20.src = '../../recursos/imagenes/bombs/player20.png';
    
    //asignacion de imagen de fondo
    
    var background=new Image();
    background.src='../../recursos/imagenes/bombs/fondo.jpg';

    //sonidos
    var audioExplosion = new Audio();

    function random(max){
        return ~~(Math.random()*max);
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=600;
        canvas.height=400;
        
        enableInputs();
        run();
    }

    function run(){
        requestAnimationFrame(run);
            
        var now=Date.now();
        var deltaTime=(now-lastUpdate)/1000;
        if(deltaTime>1)deltaTime=0;
        lastUpdate=now;
        
        act(deltaTime);
        paint(ctx);
    }

    function reset(){
        score=0;
        eTimer=0;
        bombs.length=0;
        gameover=false;
    }

    function act(deltaTime){
        if(!pause){
            
            // cuando debe reiniciarse la partida
            if(gameover){
                reset();
            }
			
			
            // Guarda la nueva posición del jugador
            player.x=mousex;
            player.y=mousey;
            
            // Impide salir del objeto canvas
            if(player.x<0)
                player.x=0;
            if(player.x>canvas.width)
                player.x=canvas.width;
            if(player.y<0)
                player.y=0;
            if(player.y>canvas.height)
                player.y=canvas.height;
            
            // Genera una nueva bomba
            eTimer-=deltaTime;
            if(eTimer<0){
                var bomb=new Circle(random(2)*canvas.width,random(2)*canvas.height,10);
                bomb.timer=1.5+random(2.5);
                bomb.speed=Number(velocidad)+((random(score))*10);
                bombs.push(bomb);
                eTimer=0.5+random(2.5);
            }
            
            // Bomba
            for(var i=0,l=bombs.length;i<l;i++){
                if(bombs[i].timer<0){
                    score++;
                    bombs.splice(i--,1);
                    l--;
                    continue;
                }
                
                bombs[i].timer-=deltaTime;
                var angle=player.getAngle(bombs[i]);
                bombs[i].move(angle,bombs[i].speed*deltaTime);
                
                if(bombs[i].timer<0){
                    audioExplosion = new Audio('../../recursos/sound/bombs/explosion.mp3');
                    audioExplosion.play();
                    bombs[i].radius*=Number(explosiones); // Aumenta el radio de la explosion de la bomba
                    if(bombs[i].distance(player)<0){
						// Partida perdida
                        
                        gameover=true;
                        pause=true;
                        establecerPuntuacion(); //ejecuta el metodo de guardado de mejor puntuacion
						
                    }
                }
            }
        }
    }

    function paint(ctx){
        // fondo negro antiguo
//        ctx.fillStyle='#000';
//        ctx.fillRect(0,0,canvas.width,canvas.height);
        
        if(background.width){
            ctx.drawImage(background,0,0);
        }
        else{
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        
        
        for(var i=0,l=bombs.length;i<l;i++){
            if(bombs[i].timer<0){
                
                ctx.fillStyle="#f80"; //color de explosiones
                bombs[i].fill(ctx);
            }
            else{
                if(bombs[i].timer<1&&~~(bombs[i].timer*10)%2==0){
//                  ctx.strokeStyle='#ff0'; //color de modo peligro 1
                    ctx.drawImage(bombState1, bombs[i].x-bombs[i].radius, bombs[i].y-bombs[i].radius);
                }
                else{
//                  ctx.strokeStyle='#f00'; //color de modo peligro 2
                    ctx.drawImage(bombState2, bombs[i].x-bombs[i].radius, bombs[i].y-bombs[i].radius);
                }
                
                
                bombs[i].stroke(ctx);
            }
        }
//      ctx.strokeStyle='#fff'; // pinta el borde las imagenes
        player.stroke(ctx);
        
        // carga una imagen u otra dependiendo de el tamaño seleccionado
        
        switch(player.radius) {
            case 5:
                ctx.drawImage(player5, player.x - player.radius, player.y-player.radius); // pinta el jugador
                break;
            case 10:
                ctx.drawImage(player10, player.x - player.radius, player.y-player.radius); // pinta el jugador
                break;
            case 20:
                ctx.drawImage(player20, player.x - player.radius, player.y-player.radius); // pinta el jugador
                break;
            default:
                ctx.drawImage(player10, player.x - player.radius, player.y-player.radius); // pinta el jugador
                break;
        }
        
        
        ctx.fillStyle='#f00';
		
        ctx.fillText('Puntuacion: '+score,20,20);
        if(pause){
            ctx.textAlign='center';
            if(gameover)
                ctx.fillText('Pulsa CLICK IZQUIERDO para comenzar',300,200);
            else
                ctx.fillText('Pausa',300,200);
            ctx.textAlign='left';
        }
    }

    function enableInputs(){
        document.addEventListener('mousemove',function(evt){
            mousex=evt.pageX-canvas.offsetLeft;
            mousey=evt.pageY-canvas.offsetTop;
        },false);
        canvas.addEventListener('mousedown',function(evt){
            pause=!pause;
        },false);
    }

    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
        this.timer=0;
        this.speed=0;
    }

    Circle.prototype.distance=function(circle){
        if(circle!=null){
            var dx=this.x-circle.x;
            var dy=this.y-circle.y;
            return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
        }
    }

    Circle.prototype.getAngle=function(circle){
        if(circle!=null)
            return (Math.atan2(this.y-circle.y,this.x-circle.x));
    }

    Circle.prototype.move=function(angle,speed){
        if(speed!=null){
            this.x+=Math.cos(angle)*speed;
            this.y+=Math.sin(angle)*speed;
        }
    }

    Circle.prototype.stroke=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.stroke();
    }

    Circle.prototype.fill=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.fill();
    }
    
    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback){window.setTimeout(callback,17);};
    })();
    
    
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
    
})();