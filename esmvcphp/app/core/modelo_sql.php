<?php
namespace core;

class Modelo_SQL extends \core\sgbd\bd {
	
	
	// Las siguientes variables deben definirse en la clase que se implemente a partir de Modelo_SQL
	public static $validaciones_insert = array(
		"prueba" => "prueba"
		// Se definen en el modelo de una tabla o vista
	);
	
	public static $validaciones_update = array(
		// Se definen en el modelo de una tabla o vista 
	);
	
	public static $validaciones_delete = array(
		// Se definen en el modelo de una tabla o vista
	);
	
	
	
	/**
	 * Define la tabla que se usará por defecto en los métodos de manipulación y recuperación
	 * que se vayan a utilizar a continuación para manejar modelos.
	 * El nombre de tabla aportado puede ser un nombre de una clase del namespace modelos
	 * 
	 * @param string $table_name Ejemplo: "usuarios"    "articulos"
	 * @return \core\sgbd\bd
	 * @override
	 */
	public static function table($table_name) {
				
		$path_application = PATH_APPLICATION_APP."modelos".DS.strtolower($table_name).".php";
		$path_framework = PATH_ESMVCPHP."app".DS."modelos".DS.strtolower($table_name).".php";
		parent::set_table_name($table_name);
		
		if (is_file($path_application) or is_file($path_framework)) {
			$modelos_clase = "\\modelos\\".strtolower($table_name);
			return new $modelos_clase();
		}
		else {
			return new self;
		}
		
	}
	
	
	
	public static function tabla($table_name) {
		
		return self::table($table_name);
		
	}
	
	
}