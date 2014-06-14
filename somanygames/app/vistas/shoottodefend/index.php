<form method='post' name='<?php echo \core\Array_Datos::contenido("form_name", $datos); ?>' action="<?php echo \core\URL::generar($datos['controlador_clase'].'/jugar') ?>" >
	
        <?php echo \core\HTML_Tag::form_registrar($datos["form_name"], "post"); ?>
    
        <br />
	Vidas máximas:<br />
        <input type="radio" name="variable1" value="1">1 vida<br>
        <input type="radio" name="variable1" value="2">2 vidas<br>
        <input type="radio" name="variable1" value="3" checked >3 vidas<br>
        <input type="radio" name="variable1" value="5">5 vidas<br>
        <input type="radio" name="variable1" value="10">10 vidas<br>
        
        <br />
        Velocidad base de las bombas:<br />
        <input type="radio" name="variable2" value="50">Lenta<br>
        <input type="radio" name="variable2" value="100" checked >Normal<br>
        <input type="radio" name="variable2" value="150">Rapida<br>
        
        <br />
        Tamaño de explosiones:<br />
        <input type="radio" name="variable3" value="2">Muy pequeño<br>
        <input type="radio" name="variable3" value="3">Pequeño<br>
        <input type="radio" name="variable3" value="4" checked >Normal<br>
        <input type="radio" name="variable3" value="6">Grande<br>
        <input type="radio" name="variable3" value="8">Muy grande<br>
        
        
        
        <br />
	<input type='submit' value='Enviar' />
	<input type='reset' value='Por defecto' />
        
</form>