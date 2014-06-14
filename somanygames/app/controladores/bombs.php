<?php
namespace controladores;

class bombs extends \core\Controlador {
	
	public function index(array $datos = array()) {

		$datos["form_name"] = __FUNCTION__;
                
		$datos['view_content'] = \core\Vista::generar(__FUNCTION__, $datos);
		$http_body = \core\Vista_Plantilla::generar('plantilla_juego', $datos);
		\core\HTTP_Respuesta::enviar($http_body);
		
	}
	
        public function jugar(array $datos=array()) {
		
		$datos['view_content'] = \core\Vista::generar(__FUNCTION__, $datos);
		$http_body = \core\Vista_Plantilla::generar('plantilla_juego', $datos);
		\core\HTTP_Respuesta::enviar($http_body);
		
	}
        
        
        
} // Fin de la clase