
<form method='post' name='<?php echo \core\Array_Datos::contenido("form_name", $datos); ?>' action="<?php echo \core\URL::generar($datos['controlador_clase'].'/validar_'.$datos['controlador_metodo']) ?>" >
	
        <?php echo \core\HTML_Tag::form_registrar($datos["form_name"], "post"); ?>
    
	<input id='id' name='id' type='hidden' value='<?php echo \core\Array_Datos::values('id', $datos); ?>' />
        
	Titulo: <input id='tituloLibro' name='titulo' type='text' size='50'  maxlength='50' value='<?php echo \core\Array_Datos::values('titulo', $datos); ?>'/>
	<?php echo \core\HTML_Tag::span_error('titulo', $datos); ?>
	<br />
        
        Autor: <input id='autor' name='autor' type='text' size='50'  maxlength='50' value='<?php echo \core\Array_Datos::values('autor', $datos); ?>'/>
	<?php echo \core\HTML_Tag::span_error('autor', $datos); ?>
	<br />
        
	Comentario:<br />
	<textarea id='comentario' name='comentario' type='textarea' cols='80'  rows='10' ><?php echo \core\Array_Datos::values('comentario', $datos); ?></textarea>
	<?php echo \core\HTML_Tag::span_error('comentario', $datos); ?>
        <br />
        
        Precio: <input id='precio' name='precio' type='text' size='12'  maxlength='12' value='<?php echo \core\Array_Datos::values('precio', $datos); ?>'/>
	<?php echo \core\HTML_Tag::span_error('precio', $datos); ?>
	<br />
        
        Fecha de Publicacion: <input id='fecha_publicacion' name='fecha_publicacion' type='text' size='12'  maxlength='10' value='<?php echo \core\Array_Datos::values('fecha_publicacion', $datos); ?>'/>
	<?php echo \core\HTML_Tag::span_error('fecha_publicacion', $datos); ?>
	<br />
        
	<br />
	<?php echo \core\HTML_Tag::span_error('errores_validacion', $datos); ?>
	
	<input type='submit' value='Enviar' />
	<input type='reset' value='Limpiar' />
        
        <input type='button' value='Cancelar' onclick="location.assign('<?php echo \core\URL::generar($datos['controlador_clase'].'/index') ?>')" />
        
</form>

