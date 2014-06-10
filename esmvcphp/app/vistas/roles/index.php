<div>
	<h1>Listado de roles</h1>
	
	<table border='1'>
		<thead>
			<tr>
				<th>rol</th>
				<th>descripcion</th>
				<th>acciones</th>
			</tr>
		</thead>
		<tbody>
			<?php
			foreach ($datos['filas'] as $fila)
			{
				echo "
					<tr>
						<td>{$fila['rol']}</td>
						<td>{$fila['descripcion']}</td>
						<td>
					".\core\HTML_Tag::a_boton("boton", array("roles", "form_modificar", $fila['id']), "modificar")." ".
//					<a class='boton' href='?menu={$datos['controlador_clase']}&submenu=form_modificar&id={$fila['id']}' >modificar</a>
					\core\HTML_Tag::a_boton("boton", array("roles", "form_borrar", $fila['id']), "borrar")." ".
					\core\HTML_Tag::a_boton("boton", array("roles_permisos", "index", $fila['rol']), "permisos asignados").
						"</td>
					</tr>
					";
			}
			echo "
				<tr>
					<td colspan='2'></td>
						<td>"
			.\core\HTML_Tag::a_boton("boton", array("roles", "form_insertar"), "insertar").
					"</td>
				</tr>
			";
			?>
		</tbody>
	</table>
</div>