<form method='post' name='<?php echo \core\Array_Datos::contenido("form_name", $datos); ?>' action="<?php echo \core\URL::generar($datos['controlador_clase'].'/jugar') ?>" >
	
        <?php echo \core\HTML_Tag::form_registrar($datos["form_name"], "post"); ?>
    
        <br />
	Velocidad:<br />
        <input type="radio" name="variable1" value="80">Muy lenta<br>
        <input type="radio" name="variable1" value="65">Lenta<br>
        <input type="radio" name="variable1" value="50" checked >Normal<br>
        <input type="radio" name="variable1" value="35">Rápida<br>
        <input type="radio" name="variable1" value="20">Muy rápida<br>
        
        <br />
        Teclado:<br />
        <input type="radio" name="variable2" value="flechas" checked >Flechas<br>
        <input type="radio" name="variable2" value="wasd">WASD<br>
        
        <br />
        Muros:<br />
        <input type="radio" name="variable3" value="si" checked >Si<br>
        <input type="radio" name="variable3" value="no">No<br>
        
        
        
        <br />
	<input type='submit' value='Enviar' />
	<input type='reset' value='Por defecto' />
        
</form>