<?php
namespace controladores;

class libros extends \core\Controlador {

	
	
	/**
	 * Presenta una <table> con las filas de la tabla con igual nombre que la clase.
	 * @param array $datos
	 */
	public function index(array $datos=array()) {
		
		$clausulas['order_by'] = 'titulo';
		$datos["filas"] = \modelos\Datos_SQL::table("libros")->select( $clausulas ); // Recupera todas las filas ordenadas
		$datos['view_content'] = \core\Vista::generar(__FUNCTION__, $datos);
		$http_body = \core\Vista_Plantilla::generar('plantilla_libros', $datos);
		\core\HTTP_Respuesta::enviar($http_body);
		
	}
	
	
	public function form_insertar(array $datos=array()) {
		
                $datos["form_name"] = __FUNCTION__;
            
		$clausulas['order_by'] = " titulo ";
		$datos['libros'] = \modelos\Datos_SQL::table("libros")->select($clausulas);
		
		$datos['view_content'] = \core\Vista::generar(__FUNCTION__, $datos);
		$http_body = \core\Vista_Plantilla::generar('plantilla_libros', $datos);
		\core\HTTP_Respuesta::enviar($http_body);
		
	}

	public function validar_form_insertar(array $datos=array()){	
		$validaciones = array(
			"titulo" => "errores_requerido && errores_texto && errores_prohibido_punto_y_coma && errores_unicidad_insertar:titulo/libros/titulo",
			"autor" => "errores_requerido && errores_texto && errores_prohibido_punto_y_coma",
			"comentario" => "errores_texto && errores_prohibido_punto_y_coma",
                        "precio" => "errores_precio",
                        "fecha_publicacion" => "errores_prohibido_punto_y_coma",
		);
                
		if ( ! $validacion = ! \core\Validaciones::errores_validacion_request($validaciones, $datos))
                        $datos["errores"]["errores_validacion"]="Corrige los errores.";
		else {
                        $datos['values']['fecha_publicacion'] = \core\Conversiones::fecha_es_a_mysql($datos['values']['fecha_publicacion']);
                        $datos['values']['precio'] = \core\Conversiones::decimal_coma_a_punto($datos['values']['precio']);
			if ( ! $validacion = \modelos\Datos_SQL::table("libros")->insert($datos["values"])) // Devuelve true o false
				$datos["errores"]["errores_validacion"]="No se han podido grabar los datos en la bd.";
		}
		if ( ! $validacion) //Devolvemos el formulario para que lo intente corregir de nuevo
			$this->cargar_controlador('libros', 'form_insertar',$datos);
		else
		{
			// Se ha grabado la modificación. Devolvemos el control al la situacion anterior a la petición del form_modificar
			$datos = array("alerta" => "Se han grabado correctamente los detalles");
			// Definir el controlador que responderá después de la inserción
			
			\core\HTTP_Respuesta::set_header_line("location", \core\URL::generar("libros/index"));
			\core\HTTP_Respuesta::enviar();
			$this->cargar_controlador('libros', 'index',$datos);
            
		}
	}

	
        public function form_modificar(array $datos = array()) {

                $datos["form_name"] = __FUNCTION__;
                
                    if ( ! isset($datos["errores"])) { // Si no es un reenvío desde una validación fallida
                    $validaciones=array(
                        "id" => "errores_requerido && errores_numero_entero_positivo && errores_referencia:id/libros/id"
                        );
                    if ( ! $validacion = ! \core\Validaciones::errores_validacion_request($validaciones, $datos)) {
                        $datos['mensaje'] = 'Datos erróneos para identificar el libro a modificar';
                        $this->cargar_controlador('mensajes', 'mensaje', $datos);
                        return;
                    }else{
                        $clausulas['where'] = " id = {$datos['values']['id']} ";
                        if ( ! $filas = \modelos\Datos_SQL::table("libros")->select($clausulas)) {
                            $datos['mensaje'] = 'Error al recuperar la fila de la base de datos';
                            \core\Distribuidor::cargar_controlador('mensajes', 'mensaje', $datos);
                            return;
                        }
                        else {
                            $datos['values'] = $filas[0];
                            
                            $clausulas = array('order_by' => " titulo ");
                            $datos['libros'] = \modelos\Datos_SQL::table("libros")->select( $clausulas);
                            $datos['values']['precio'] = \core\Conversiones::decimal_punto_a_coma_y_miles($datos['values']['precio']);
                            $datos['values']['fecha_publicacion'] = \core\Conversiones::fecha_mysql_a_es($datos['values']['fecha_publicacion']);
                        }
                    }
                }

                $datos['view_content'] = \core\Vista::generar(__FUNCTION__, $datos);
                $http_body = \core\Vista_Plantilla::generar('plantilla_libros', $datos);
                \core\HTTP_Respuesta::enviar($http_body);
            }

	public function validar_form_modificar(array $datos=array()) {	
		
		$validaciones = array(
                        "id" => "errores_requerido && errores_numero_entero_positivo && errores_referencia:id/libros/id",
			"titulo" => "errores_requerido && errores_texto && errores_prohibido_punto_y_coma && errores_unicidad_modificar:id,titulo/libros/titulo,id",
			"autor" => "errores_requerido && errores_texto && errores_prohibido_punto_y_coma",
			"comentario" => "errores_texto && errores_prohibido_punto_y_coma",
                        "precio" => "errores_precio",
                        "fecha_publicacion" => "errores_prohibido_punto_y_coma",
		);
                
		if ( ! $validacion = ! \core\Validaciones::errores_validacion_request($validaciones, $datos)) {
			
                        $datos["errores"]["errores_validacion"] = "Corrige los errores.";
		}
		else {
                        $datos['values']['fecha_publicacion'] = \core\Conversiones::fecha_es_a_mysql($datos['values']['fecha_publicacion']);
                        $datos['values']['precio'] = \core\Conversiones::decimal_coma_a_punto($datos['values']['precio']);
			if ( ! $validacion = \modelos\Datos_SQL::table("libros")->update($datos["values"])) // Devuelve true o false
				$datos["errores"]["errores_validacion"]="No se han podido grabar los datos en la bd.";
		}
		if ( ! $validacion) //Devolvemos el formulario para que lo intente corregir de nuevo
			$this->cargar_controlador('libros', 'form_modificar',$datos);
		else{
			$datos = array("alerta" => "Se han modificado correctamente.");
			// Definir el controlador que responderá después de la inserción
			
			\core\HTTP_Respuesta::set_header_line("location", \core\URL::generar("libros/index"));
			\core\HTTP_Respuesta::enviar();
			$this->cargar_controlador('libros', 'index',$datos);
            
		}
	}

	
	
	public function form_borrar(array $datos=array()) {
		
                $datos["form_name"] = __FUNCTION__;
                
		$validaciones=array(
			"id" => "errores_requerido && errores_numero_entero_positivo"
		);
		if ( ! $validacion = ! \core\Validaciones::errores_validacion_request($validaciones, $datos)) {
			$datos['mensaje'] = 'Datos erróneos para identificar el libro a borrar';
			$datos['url_continuar'] = \core\URL::generar("libros");
			$this->cargar_controlador('mensajes', 'mensaje', $datos);
			return;
		}
		else {
			$clausulas['where'] = " id = {$datos['values']['id']} ";
			if ( ! $filas = \modelos\Datos_SQL::table("libros")->select( $clausulas)) {
				$datos['mensaje'] = 'Error al recuperar la fila de la base de datos';
				$this->cargar_controlador('mensajes', 'mensaje', $datos);
				return;
			}
			else {
				$datos['values'] = $filas[0];
                                
				$clausulas = array('order_by' => " titulo ");
				$datos['libros'] = \modelos\Datos_SQL::select( $clausulas, 'libros');
			}
		}
		$datos['view_content'] = \core\Vista::generar(__FUNCTION__, $datos);
		$http_body = \core\Vista_Plantilla::generar('plantilla_libros', $datos);
		\core\HTTP_Respuesta::enviar($http_body);
	}

        
        
	public function validar_form_borrar(array $datos=array()) {	
		$validaciones=array(
			 "id" => "errores_requerido && errores_numero_entero_positivo"
		);
		if ( ! $validacion = ! \core\Validaciones::errores_validacion_request($validaciones, $datos)) {
			$datos['mensaje'] = 'Datos erróneos para identificar el artículo a borrar';
			$datos['url_continuar'] = \core\URL::generar("libros");
			$this->cargar_controlador('mensajes', 'mensaje', $datos);
			return;
		}
		else
		{
			if ( ! $validacion = \modelos\Datos_SQL::delete($datos["values"], 'libros')) {// Devuelve true o false
				$datos['mensaje'] = 'Error al borrar en la bd';
				$datos['url_continuar'] = \core\URL::generar("libros");
				$this->cargar_controlador('mensajes', 'mensaje', $datos);
				return;
			}
			else{
                                $datos = array("alerta" => "Se ha borrado correctamente.");
                                //$this->cargar_controlador('libros', 'index',$datos);	
                                \core\HTTP_Respuesta::set_header_line("location", \core\URL::generar("libros/index"));
                                \core\HTTP_Respuesta::enviar();
			}
		}
	}
	
} // Fin de la clase