-- use daw2;

set names utf8;
set sql_mode = 'traditional';


insert into daw2_roles
  (rol			, descripcion) values
  ('administradores'	,'Administradores de la aplicacion')
, ('usuarios'		,'Todos los usuarios incluido anonimo')
, ('usuarios_logueados'	,'Todos los usuarios excluido anonimo')
;

insert into daw2_usuarios 
  (login, email, password, fecha_alta ,fecha_confirmacion_alta, clave_confirmacion) values
  ('admin', 'admin@email.com', md5('admin00'), default, now(), null)
, ('anonimo', 'anonimo@email.com', md5(''), default, now(), null)
, ('juan', 'juan@email.com', md5('juan00'), default, now(), null)
, ('anais', 'anais@email.com', md5('anais00'), default, now(), null)
;

insert into daw2_metodos
  (controlador,		metodo) values
  ('*'			,'*')
, ('inicio'		,'*')
, ('inicio'		,'index')
, ('inicio'		,'juegos')
, ('mensajes'		,'*')
, ('roles'		,'*')
, ('roles'		,'index')
, ('roles'		,'form_borrar')
, ('roles'		,'form_insertar')
, ('roles'		,'form_modificar')
, ('roles_permisos'	,'*')
, ('roles_permisos'	,'index')
, ('roles_permisos'	,'form_modificar')
, ('usuarios'		,'*')
, ('usuarios'		,'index')
, ('usuarios'		,'desconectar')
, ('usuarios'		,'form_login')
, ('usuarios'		,'form_login_validar')
, ('usuarios'		,'form_cambiar_password')
, ('usuarios'		,'form_login_email')
, ('usuarios'		,'form_login_email_validar')
, ('usuarios'		,'confirmar_alta')
, ('usuarios'		,'form_insertar_interno')
, ('usuarios'		,'form_insertar_externo')
, ('usuarios'		,'form_modificar')
, ('usuarios'		,'form_borrar')
, ('usuarios_permisos'	,'*')
, ('usuarios_permisos'	,'index')
, ('usuarios_permisos'	,'form_modificar')
, ('bombs'              ,'*')
, ('snake'              ,'*')
, ('asteroid'           ,'*')
, ('shoottodefend'	,'*')
;

insert into daw2_roles_permisos
  (rol			,controlador            ,metodo) values
  ('administradores'    ,'*'                    ,'*')
, ('usuarios'		,'inicio'               ,'*')
, ('usuarios'		,'mensajes'             ,'*')
, ('usuarios'		,'libros'               ,'index')
, ('usuarios_logueados'	,'inicio'               ,'*')
, ('usuarios_logueados'	,'libros'               ,'index')
, ('usuarios_logueados' ,'libros'               ,'form_insertar')
, ('usuarios_logueados' ,'usuarios'             ,'desconectar')
, ('usuarios_logueados' ,'usuarios'             ,'form_cambiar_password')
, ('usuarios_logueados' ,'bombs'                ,'*')
, ('usuarios_logueados' ,'snake'                ,'*')
, ('usuarios_logueados' ,'asteroid'             ,'*')
, ('usuarios_logueados' ,'shoottodefend'	,'*')

;

insert into daw2_usuarios_roles
    (login		,rol) values
    ('admin'		,'administradores')
,   ('juan'		,'usuarios')
,   ('juan'		,'usuarios_logueados')
,   ('anonimo'          ,'usuarios')
,   ('anais'            ,'usuarios')
,   ('anais'            ,'usuarios_logueados')
;

insert into daw2_usuarios_permisos
  (login		,controlador		,metodo) values
  ('anonimo'		,'usuarios'		,'form_login')
, ('anonimo'		,'usuarios'		,'form_login_email')
, ('anonimo'		,'usuarios'		,'form_insertar_externo')
, ('anonimo'		,'usuarios'		,'confirmar_alta')
;