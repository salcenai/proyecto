(function(){
    'use strict';
    
    window.addEventListener('load',init,false);
    
    
    $(document).ready(function() {
        if (getCookie("Puntuacion") != null && getCookie("Puntuacion") != "") {
            document.getElementById('div_puntuacion').innerHTML = "Mayor Puntuación: " + getCookie("Puntuacion");
        }
    });
    
    var KEY_ENTER=13;
    var KEY_SPACE=32;
    
    if (variable3 == "flechas") {
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
    
    var canvas=null,ctx=null;
    var lastPress=null;
    var pressing=[];
    var pause=true;
    var score=0;
    var lives=0;
    var wave=0;
    var waveTimer=0;
    var aTimer=0;
    var player=new Circle(150,75,5);
    var shots=[];
    var enemies=[];
    var explosion=[];
    
    //imagenes
    
    var imgEspacio=new Image();
    var imgAsteroide=new Image();
    var imgCorazon=new Image();
    var imgDisparo=new Image();
    var imgExplosion=new Image();
    var imgJugador=new Image();
    var imgJugadorAcelerando=new Image();
    
    imgEspacio.src='../../recursos/imagenes/asteroid/espacio.jpg';
    imgAsteroide.src='../../recursos/imagenes/asteroid/asteroide.png';
    imgCorazon.src='../../recursos/imagenes/asteroid/corazon.png';
    imgDisparo.src='../../recursos/imagenes/asteroid/disparo.png';
    imgExplosion.src='../../recursos/imagenes/asteroid/explosion.png';
    imgJugador.src='../../recursos/imagenes/asteroid/jugador.png';
    imgJugadorAcelerando.src='../../recursos/imagenes/asteroid/jugadorAcelerando.png';
    
    //sonidos
    var audioExplosionNave = new Audio();
    var audioDisparo = new Audio();
    audioExplosionNave.src='../../recursos/sound/asteroid/explosionNave.mp3';    
    
    

    function random(max){
        return ~~(Math.random()*max);
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=600;
        canvas.height=400;
        
        run();
        repaint();
    }

    function run(){
        setTimeout(run,50);
        act();
    }

    function repaint(){
        requestAnimationFrame(repaint);
        paint(ctx);
    }

    function playerReset(){
        player.x=canvas.width/2;
        player.y=canvas.height/2;
        player.rotation=0;
        player.speed=0;
    }

    function reset(){
        playerReset();
        player.timer=0;
        shots.length=0;
        enemies.length=0;
        explosion.length=0;
        waveTimer=40;
        wave=1;
        score=0;
        lives=variable1; //vidas al empezar
    }

    function act(){
        if(!pause){
            //Si el usuario se queda sin vidas
            if(lives<1){
                reset();
            }
            
            // Posible rotacion de la nave
            if(pressing[KEY_RIGHT]){
                player.rotation+=10;
            }
            if(pressing[KEY_LEFT]){
                player.rotation-=10;
            }
            // Posible aceleracion o deceleracion de la nave
            if(pressing[KEY_UP]){
                if(player.speed<5)
                    player.speed++;
            }
            if(pressing[KEY_DOWN]){
                if(player.speed>-5)
                    player.speed--;
            }
            
            // movimiento del jugador
            player.move((player.rotation-90)*Math.PI/180,player.speed);
            
            // Crear un nuevo disparo
            if(lastPress==KEY_SPACE&&player.timer<21){
                
                audioDisparo = new Audio('../../recursos/sound/asteroid/disparo.mp3');
                audioDisparo.play();
                
                var s=new Circle(player.x,player.y,2.5);
                s.rotation=player.rotation;
                s.speed=player.speed+10; //velocidad de proyectil
                s.timer=variable2; //tiempo de proyectil
                shots.push(s);
            }
            
            // Movimiento de todos los disparos
            for(var i=0,l=shots.length;i<l;i++){
                shots[i].timer--;
                if(shots[i].timer<0){
                    shots.splice(i--,1);
                    l--;
                    continue;
                }
                
                shots[i].move((shots[i].rotation-90)*Math.PI/180,shots[i].speed);
            }
            
            // Generar nuevos asteroides
            if(waveTimer>0)
                waveTimer--;
            else if(enemies.length<1){
                for(var i=0,l=2+wave;i<l;i++){
                    var e=new Circle(-20,-20,20);
                    e.rotation=random(360);
                    enemies.push(e);
                }
            }
            
            // Movimiento de los asteroides
            for(var i=0,l=enemies.length;i<l;i++){
                enemies[i].move((enemies[i].rotation-90)*Math.PI/180,2);
                
                // colision entre nave y asteroide
                if(player.timer<1&&enemies[i].distance(player)<0){
                    audioExplosionNave.play();
                    lives--;
                    player.timer=60;
                    for(var j=0;j<8;j++){
                        var e=new Circle(player.x,player.y,2.5);
                        e.rotation=45*j;
                        e.timer=40;
                        explosion.push(e);
                    }
                }
                
                // colision entre enemigo y disparo
                for(var j=0,ll=shots.length;j<ll;j++){
                    if(enemies[i].distance(shots[j])<0){
                        if(enemies[i].radius>5){
                            for(var k=0;k<3;k++){
                                var e=new Circle(enemies[i].x,enemies[i].y,enemies[i].radius/2);
                                e.rotation=shots[j].rotation+120*k;
                                enemies.push(e);
                            }
                        }
                        score++;
                        enemies.splice(i--,1);
                        l--;
                        shots.splice(j--,1);
                        ll--;
                        if(enemies.length<1){
                            waveTimer=40;
                            wave++;
                        }
                    }
                }
            }
            
            // Move Explosion
            for(var i=0,l=explosion.length;i<l;i++){
                explosion[i].move((explosion[i].rotation-90)*Math.PI/180,1);
                explosion[i].timer--;
                if(explosion[i].timer<1){
                    explosion.splice(i--,1);
                    l--;
                }
            }
            
            // Damaged
            if(player.timer>0){
                player.timer--;
                if(player.timer==20){
                    playerReset();
                }
            }
            
            // GameOver
            if(lives<1){
                establecerPuntuacion();
                pause=true;
            }
            
            // Animation Cicle
            aTimer++;
            if(aTimer>360)
                aTimer-=360;
        }
        if(lastPress==KEY_ENTER)
            pause=!pause;
        
        lastPress=null;
    }

    function paint(ctx){
        ctx.fillStyle='#000';
        if(imgEspacio.width)
            ctx.drawImage(imgEspacio,0,0);
        else
            ctx.fillRect(0,0,canvas.width,canvas.height);
        
        ctx.strokeStyle='#00f';
        for(var i=0,l=enemies.length;i<l;i++)
            enemies[i].drawImageArea(ctx,imgAsteroide, 0,0,40,40);
        
        ctx.strokeStyle='#f00';
        for(var i=0,l=shots.length;i<l;i++)
            shots[i].drawImageArea(ctx,imgDisparo, 0,0,5,5);
        
        if(player.timer<21&&player.timer%2==0){
            ctx.strokeStyle='#0f0';
            if(pressing[KEY_UP])
                player.drawImageArea(ctx,imgJugadorAcelerando, 0,0,10,10);
            else
                player.drawImageArea(ctx,imgJugador, 0,0,10,10);
        }
        
        ctx.strokeStyle='#ff0';
        for(var i=0,l=explosion.length;i<l;i++)
            explosion[i].drawImageArea(ctx,imgExplosion, 0,0,5,5);
        
        ctx.fillStyle='#fff';
        if(imgCorazon.width)
            for(var i=0;i<lives;i++)
                ctx.drawImage(imgCorazon, 0,0,10,10, canvas.width-20-20*i,10,10,10);
        else
            ctx.fillText('Vidas: '+lives,canvas.width-50,20);
        
        //ctx.fillText('Rotation: '+player.rotation,0,20);
        ctx.fillText('Oleada: '+wave,0,10);
        ctx.fillText('Puntuacion: '+score,0,20);
        
        if(pause){
            ctx.textAlign='center';
            if(lives<1)
                ctx.fillText('Pulsa ENTER para comenzar',canvas.width/2,canvas.height/2);
            else
                ctx.fillText('Pausa',canvas.width/2,canvas.height/2);
            ctx.textAlign='left';
        }
        else if(waveTimer>0){
            ctx.textAlign='center';
            ctx.fillText('Oleada '+wave,canvas.width/2,canvas.height/2);
            ctx.textAlign='left';
        }
    }

    document.addEventListener('keydown',function(evt){
        lastPress=evt.keyCode;
        pressing[evt.keyCode]=true;
    },false);

    document.addEventListener('keyup',function(evt){
        pressing[evt.keyCode]=false;
    },false);

    function Circle(x,y,radius){
        this.x=(x==null)?0:x;
        this.y=(y==null)?0:y;
        this.radius=(radius==null)?0:radius;
        //this.scale=1;
        this.rotation=0;
        this.speed=0;
        this.timer=0;
    }
        
    Circle.prototype.distance=function(circle){
        if(circle!=null){
            var dx=this.x-circle.x;
            var dy=this.y-circle.y;
            return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
        }
    }

    Circle.prototype.move=function(angle,speed){
        if(speed!=null){
            this.x+=Math.cos(angle)*speed;
            this.y+=Math.sin(angle)*speed;

            // Out Screen
            if(this.x>canvas.width)
                this.x=0;
            if(this.x<0)
                this.x=canvas.width;
            if(this.y>canvas.height)
                this.y=0;
            if(this.y<0)
                this.y=canvas.height;
        }
    }

    Circle.prototype.stroke=function(ctx){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        ctx.stroke();
    }

    Circle.prototype.drawImageArea=function(ctx,img,sx,sy,sw,sh){
        if(img.width){
            ctx.save();
            ctx.translate(this.x,this.y);
            //ctx.scale(this.scale,this.scale);
            ctx.rotate(this.rotation*Math.PI/180);
            ctx.drawImage(img,sx,sy,sw,sh,-this.radius,-this.radius,this.radius*2,this.radius*2);
            ctx.restore();
        }
        else
            this.stroke(ctx);
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