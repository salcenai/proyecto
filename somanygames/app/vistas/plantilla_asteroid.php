<!DOCTYPE HTML>
<html lang='es'>
    <head>
        <title><?php echo TITULO; ?></title>
        <meta name="Description" content="Web de minijuegos programados en canvas" /> 
        <meta name="Keywords" content="minijuegos, juegos, canvas" /> 
        <meta name="Generator" content="esmvcphp framewrok" /> 
        <meta name="Origen" content="salcenai" /> 
        <meta name="Author" content="Aitor Salas" /> 
        <meta name="Locality" content="Madrid, España" /> 
        <meta name="Lang" content="es" /> 
        <meta name="Viewport" content="maximum-scale=10.0" /> 
        <meta name="revisit-after" content="1 days" /> 
        <meta name="robots" content="INDEX,FOLLOW,NOODP" /> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
        <meta http-equiv="Content-Language" content="es"/>

        <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="favicon.ico" rel="icon" type="image/x-icon" /> 

        <?php if (!isset($_GET["administrator"])): ?>
            <link rel="stylesheet" type="text/css" href="<?php echo URL_ROOT; ?>recursos/css/principal.css" />
        <?php endif; ?>
        <?php if (isset($_GET["administrator"])): ?>
            <link rel="stylesheet" type="text/css" href="<?php echo URL_ROOT; ?>recursos/css/administrator.css" />
        <?php endif; ?>

        <script type='text/javascript' src="<?php echo URL_ROOT . "recursos" . DS . "js" . DS . "jquery" . DS . "jquery-1.10.2.min.js"; ?>" ></script>
        <script type='text/javascript' src="<?php echo URL_ROOT . "recursos" . DS . "js" . DS . "general.js"; ?>" ></script>

        <script type="text/javascript">
            phpVars = new Array();

<?php
echo 'phpVars.push("' . $_POST['vidas'] . '");';
echo 'phpVars.push("' . $_POST['distancia'] . '");';
echo 'phpVars.push("' . $_POST['teclado'] . '");';
?>

            var vidas = phpVars[0];
            var distancia = phpVars[1];
            var teclado = phpVars[2];

//          alert("php"+phpVars);

        </script>
        
        <script type='text/javascript' src="<?php echo URL_ROOT . "recursos/js/asteroid/game.js"; ?>" ></script>
        
        <!--
        <script type='text/javascript' src="<?php echo "http://localhost/proyecto/descargas/download" . DS . "js" .  DS . "game.js"; ?>"></script>
        -->
    </head>

    <body id="body">
        
        <div id="div_login">
            <?php
            echo "<b>" . \core\Usuario::$login . "</b>";
            if (\core\Usuario::$login != 'anonimo') {
                echo " <a href='" . \core\URL::generar("usuarios/desconectar") . "'>Desconectar</a>";
            } else {
                if ((\core\Usuario::$login == "anonimo") && !(\core\Distribuidor::get_controlador_instanciado() == "usuarios" && \core\Distribuidor::get_metodo_invocado() == "form_login")) {
                    echo " <a href='" . \core\URL::generar("usuarios/form_login") . "'>Conectar</a>";
                }
                if ((\core\Usuario::$login == "anonimo") && !(\core\Distribuidor::get_controlador_instanciado() == "usuarios" && \core\Distribuidor::get_metodo_invocado() == "form_insertar_externo")) {
                    echo " <a href='" . \core\URL::generar("usuarios/form_insertar_externo") . "'>Regístrate</a>";
                }
            }
            
//            echo ", Tiempo desde conexión: <span id='tiempo_desde_conexion'>" . gmdate('H:i:s', \core\Usuario::$sesion_segundos_duracion) . "</span>";
//            echo ", Tiempo inactivo: <span id='tiempo_inactivo'>" . gmdate('H:i:s', \core\Usuario::$sesion_segundos_inactividad) . "</span>";
            ?>
        </div>
        
        <div id="encabezado">
            <img src="<?php echo URL_ROOT; ?>recursos/imagenes/pad1.png" width="100px" height="75px" alt="logoPad" title="Logo" />
            <h1 id="titulo">
                So Many Games
            </h1>
        </div>

        <div id="div_menu" >
            <ul id="menu" class="menu">
                <?php echo \core\HTML_Tag::li_menu("item", array("inicio"), "Inicio"); ?>
                <?php echo \core\HTML_Tag::li_menu("item", array("inicio","juegos"), "Juegos"); ?>
                
                <?php // echo \core\HTML_Tag::li_menu("item", array("libros"), "Libros"); ?>
                <?php echo \core\HTML_Tag::li_menu("item", array("usuarios"), "Usuarios"); ?>
                <?php echo \core\HTML_Tag::li_menu("item", array("roles"), "Roles"); ?>
                 <?php echo \core\HTML_Tag::li_menu("juego", array("snake"), "Snake"); ?>
                <?php echo \core\HTML_Tag::li_menu("juego", array("bombs"), "Bombs"); ?>
                <?php echo \core\HTML_Tag::li_menu("juego", array("asteroid"), "Asteroid"); ?>
            </ul>
        </div>

        <div id="view_content">

            <?php
            echo $datos['view_content'];
            ?>

        </div>

        <div id="pie">
            Página WEB actualizada por Aitor Salas. <a href="a@a.com">Contactar</a><br />
            Fecha última actualización: 01 de Junio de 2014.
        </div>

        <?php echo \core\HTML_Tag::post_request_form(); ?>


        <script type="text/javascript" />
        var alerta;
        function onload() {
        visualizar_alerta();
        }

        function visualizar_alerta() {
        if (alerta != undefined) {
        $("body").css("opacity","0.3").css("filter", "alpha(opacity=30)");
        alert(alerta);
        alerta = undefined;
        $("body").css("opacity","1.0").css("filter", "alpha(opacity=100)");
        }
        }

    </script>


    <?php
    if (isset($_SESSION["alerta"])) {
        echo <<<heredoc
<script type="text/javascript" />
        // alert("{$_SESSION["alerta"]}");
        var alerta = '{$_SESSION["alerta"]}';
</script>
heredoc;
        unset($_SESSION["alerta"]);
    } elseif (isset($datos["alerta"])) {
        echo <<<heredoc
<script type="text/javascript" />
        // alert("{$datos["alerta"]}");
        var alerta = '{$datos["alerta"]}';
</script>
heredoc;
    }
    ?>

    <div id='globals'>
        <?php
        /*
          print "<pre>";
          //print_r($GLOBALS);
          print("\$_GET "); print_r($_GET);
          print("\$_POST ");print_r($_POST);
          print("\$_COOKIE ");print_r($_COOKIE);
          print("\$_REQUEST ");print_r($_REQUEST);
          print("\$_SESSION ");print_r($_SESSION);
          print("\$_SERVER ");print_r($_SERVER);
          print "</pre>";
          print("xdebug_get_code_coverage() ");
          var_dump(xdebug_get_code_coverage());
         */
        ?>
    </div>



</body>

</html>