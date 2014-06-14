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
    var KEY_ENTER = 13;
    var lastUpdate = 0;
    var lastPress = null;
    var pause = true;
    var disparo = false;
    var gameover = true;
    var score = 0;
    var lives = 0;
    var eTimer = 0;
    var player = new Circle(0,0,4); //Tercer parametro igual al radio en pixeles del circulo del arma
    var house = new Circle(300,300,10);
    var bombs=[];
    
    
    //imagenes
    var fondo = new Image();
    var mira = new Image()
    fondo.src = '../../recursos/imagenes/shoottodefend/fondo.jpg';
    mira.src = '../../recursos/imagenes/shoottodefend/mira.png';
    
    var bombState1 = new Image(), bombState2 = new Image();
    bombState1.src = '../../recursos/imagenes/shoottodefend/1.png';
    bombState2.src = '../../recursos/imagenes/shoottodefend/2.png';
    
    var imgCorazon = new Image(), imgCaracol = new Image();
    imgCorazon.src='../../recursos/imagenes/shoottodefend/corazon.png';
    imgCaracol.src='../../recursos/imagenes/shoottodefend/caracol.png';
    
    //sonidos
    
    var audioExplosion = new Audio(), audioDisparo = new Audio();


    function random(max){
        return ~~(Math.random()*max);
    }

    function init(){
        canvas=document.getElementById('canvas');
        ctx=canvas.getContext('2d');
        canvas.width=600;
        canvas.height=600;
        
	canvas.style.cursor = "none";
		
        enableInputs();
		
        run();
    }

    function run(){
        requestAnimationFrame(run);
            
        var now=Date.now();
        var deltaTime=(now-lastUpdate)/1000;
        if(deltaTime>1)deltaTime=0;
        lastUpdate=now;
        
	ejecutarDisparo();
        act(deltaTime);
        paint(ctx);
    }

    function reset(){
        score=0;
        eTimer=0;
        lives=variable1;
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
                
                var ejeX = random(3)*(canvas.width/2);
                var ejeY = random(3)*(canvas.height/2);

                if(ejeX == canvas.width/2 && ejeY == canvas.height/2){
                        ejeX = 0;
                        ejeY = 0;
                        var bomb = new Circle(ejeX,ejeY,10);

                }
                else{
                        var bomb = new Circle(ejeX,ejeY,10);
                }
				
                bomb.timer=2+random(2);
                bomb.speed=Number(variable2)+(random(score))*5;
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
                var angle=house.getAngle(bombs[i]);
                bombs[i].move(angle,bombs[i].speed*deltaTime);
                
                if(disparo == true){
                    audioDisparo = new Audio('../../recursos/sound/shoottodefend/disparo.mp3');
                    audioDisparo.play();
                }
                
                if(disparo == true && bombs[i].distance(player)<0){
                    disparo = false;
                    bombs[i].timer = -1;
                }
				
                if(bombs[i].timer<0){
                    bombs[i].radius*=Number(variable3); // Aumenta el radio de la explosion de la bomba
                    
                    audioExplosion = new Audio('../../recursos/sound/shoottodefend/explosion.mp3');
                    audioExplosion.play();
                    
                    if(bombs[i].distance(house)<0){
			// perdida de vida
                        lives--;
						
                    }
                }
				
            }
            if(disparo == true){
                disparo = false;
            }

            // GameOver
            if(lives<1){
                establecerPuntuacion();
                pause=true;
                gameover=true;
            }
            
            if(lastPress==KEY_ENTER){
                pause=!pause;
            }
            
            lastPress=null;
        }
    }

    function paint(ctx){
        //ctx.fillStyle='#000';
        //ctx.fillRect(0,0,canvas.width,canvas.height);
        
        if(fondo.width){
            ctx.drawImage(fondo,0,0);
        }
        else{
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
        
        for(var i=0,l=bombs.length;i<l;i++){
            if(bombs[i].timer<0){
                ctx.fillStyle='#f80';
                bombs[i].fill(ctx);
            }
            else{
                if(bombs[i].timer<1&&~~(bombs[i].timer*10)%2==0){
                    //ctx.strokeStyle='#fff';
                    ctx.drawImage(bombState1, bombs[i].x-bombs[i].radius, bombs[i].y-bombs[i].radius);
                }
                else{
                    //ctx.strokeStyle='#f00';
                    ctx.drawImage(bombState2, bombs[i].x-bombs[i].radius, bombs[i].y-bombs[i].radius);
                }
//                bombs[i].stroke(ctx);
            }
        }
        
        //ctx.strokeStyle='#0f0';
        //house.stroke(ctx);
        
        ctx.drawImage(imgCaracol, house.x - house.radius,house.y-house.radius);
        
        
//        ctx.strokeStyle='#0f0';
//        player.stroke(ctx);
        ctx.drawImage(mira, player.x - player.radius, player.y-player.radius); // pinta el jugador
		
	
        ctx.fillStyle='#fff';
        if(imgCorazon.width)
            for(var i=0;i<lives;i++)
                ctx.drawImage(imgCorazon, 0,0,10,10, canvas.width-20-20*i,10,10,10);
        else
            ctx.fillText('Vidas: '+lives,canvas.width-50,20);
        
        
        ctx.fillStyle='#f00';
        ctx.fillText('Puntuacion: '+score,20,20);
        if(pause){
            ctx.textAlign='center';
            if(gameover)
                ctx.fillText('Pulsa CLICK IZQUIERDO para comenzar',300,300);
            else
                ctx.fillText('Pausa',300,300);
            ctx.textAlign='left';
        }
        
        document.addEventListener('keydown',function(evt){
            lastPress=evt.keyCode;
            pressing[evt.keyCode]=true;
        },false);
    }

	function ejecutarDisparo(){
		canvas.addEventListener('mousedown',function(evt){
			if(disparo == false)
				disparo = true;
			
        },false);
		
	}
	
    function enableInputs(){
        document.addEventListener('mousemove',function(evt){
            mousex=evt.pageX-canvas.offsetLeft;
            mousey=evt.pageY-canvas.offsetTop;
        },false);
        canvas.addEventListener('mousedown',function(evt){
			if(pause == true)
				pause = false;
			
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