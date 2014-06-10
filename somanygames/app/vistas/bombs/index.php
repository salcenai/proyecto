<form method='post' name='<?php echo \core\Array_Datos::contenido("form_name", $datos); ?>' action="<?php echo \core\URL::generar($datos['controlador_clase'].'/jugar') ?>" >
	
        <?php echo \core\HTML_Tag::form_registrar($datos["form_name"], "post"); ?>
    
        <br />
	Tamaño del jugador:<br />
        <input type="radio" name="tamano" value="5">Pequeño<br>
        <input type="radio" name="tamano" value="10" checked >Normal<br>
        <input type="radio" name="tamano" value="20">Grande<br>
        
        <br />
        Tamaño de explosiones:<br />
        <input type="radio" name="explosiones" value="2">Muy pequeño<br>
        <input type="radio" name="explosiones" value="3">Pequeño<br>
        <input type="radio" name="explosiones" value="4" checked >Normal<br>
        <input type="radio" name="explosiones" value="6">Grande<br>
        <input type="radio" name="explosiones" value="8">Muy grande<br>
        
        <br />
        Velocidad de bombas:<br />
        <input type="radio" name="velocidad" value="100">Muy lenta<br>
        <input type="radio" name="velocidad" value="125">Lenta<br>
        <input type="radio" name="velocidad" value="150" checked >Normal<br>
        <input type="radio" name="velocidad" value="200">Rápida<br>
        <input type="radio" name="velocidad" value="250">Muy rápida<br>
        
        
        
        <br />
	<input type='submit' value='Enviar' />
	<input type='reset' value='Por defecto' />
        
</form>