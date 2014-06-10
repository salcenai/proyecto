<div id="libros">
	<h1>Listado de libros</h1>
        <p>La siguiente tabla muestra los libros disponibles</p>
	
	<table border='1'>
		<thead>
			<tr>
				<th>Titulo</th>
				<th>Autor</th>
				<th>Comentario</th>
				<th>Precio</th>
                                <th>Fecha de Publicacion</th>
				<th>Acciones</th>
			</tr>
		</thead>
		<tbody>
			<?php
                                echo "
                                <tr>
					<td colspan='5'></td>
					<td>".\core\HTML_Tag::a_boton_onclick("boton", array("libros", "form_insertar", null), "Insertar")."</td>
				
                                </tr>
                                ";
                                
			foreach ($datos['filas'] as $fila){
				echo "
					<tr>
						<td>{$fila['titulo']}</td>
						<td>{$fila['autor']}</td>
						<td>{$fila['comentario']}</td>
						<td>".\core\Conversiones::decimal_punto_a_coma_y_miles($fila['precio'])."</td>
                                                <td>".\core\Conversiones::fecha_mysql_a_es($fila['fecha_publicacion'])."</td>  
						<td>
						".\core\HTML_Tag::a_boton_onclick("boton", array("libros", "form_modificar", $fila['id']), "Modificar")." ".
                                                 \core\HTML_Tag::a_boton_onclick("boton", array("libros", "form_borrar", $fila['id']), "Borrar")."
						</td>
					</tr>
					";
			}
			echo "
				<tr>
					<td colspan='5'></td>
					<td>".\core\HTML_Tag::a_boton_onclick("boton", array("libros", "form_insertar", null), "Insertar")."</td>
				
                                </tr>
			";
			?>
		</tbody>
	</table>
</div>