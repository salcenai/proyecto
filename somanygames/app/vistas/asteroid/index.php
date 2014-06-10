<form method='post' name='<?php echo \core\Array_Datos::contenido("form_name", $datos); ?>' action="<?php echo \core\URL::generar($datos['controlador_clase'].'/jugar') ?>" >
	
        <?php echo \core\HTML_Tag::form_registrar($datos["form_name"], "post"); ?>
    
        <br />
	Vidas máximas:<br />
        <input type="radio" name="vidas" value="1">1 vida<br>
        <input type="radio" name="vidas" value="2">2 vidas<br>
        <input type="radio" name="vidas" value="3" checked >3 vidas<br>
        <input type="radio" name="vidas" value="5">5 vidas<br>
        <input type="radio" name="vidas" value="10">10 vidas<br>
        
        <br />
        Alcance de disparo:<br />
        <input type="radio" name="distancia" value="10">Mínima distancia<br>
        <input type="radio" name="distancia" value="15">Poca distancia<br>
        <input type="radio" name="distancia" value="20" checked >Normal<br>
        <input type="radio" name="distancia" value="25">Larga distancio<br>
        <input type="radio" name="distancia" value="30">Máxima distancia<br>
        
        <br />
        Teclado:<br />
        <input type="radio" name="teclado" value="flechas" checked >Flechas<br>
        <input type="radio" name="teclado" value="wasd">WASD<br>
        
        
        <br />
	<input type='submit' value='Enviar' />
	<input type='reset' value='Por defecto' />
        
</form>