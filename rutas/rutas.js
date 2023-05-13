var express = require('express');
var router = express.Router();
var fusuarios = require('./rutas_usuarios.js');
var fmembresias = require('./rutas_membresias.js');
var fpagos = require('./rutas_pagos.js');

router.get('/',c_inicio);
router.get('/usuarios',c_usuarios);
router.get('/membresias',c_membresias);
router.get('/pagos',c_pagos);

//Opciones usuarios
router.get('/m_usuarios_listado', fusuarios.listado);
router.get('/m_usuarios_nuevo', fusuarios.nuevo);
router.post('/m_usuarios_grabar_nuevo',fusuarios.grabar_nuevo);
router.get('/m_usuarios_editar/:xid',fusuarios.editar);
router.post('/m_usuarios_grabar_editar',fusuarios.grabar_editar);
router.get('/m_usuarios_eliminar/:xid',fusuarios.eliminar);

//Opciones membresias
router.get('/m_membresias_listado', fmembresias.listado); 
router.get('/m_membresias_nuevo', fmembresias.nuevo);
router.post('/m_membresias_grabar_nuevo',fmembresias.grabar_nuevo);
router.get('/m_membresias_editar/:xid',fmembresias.editar);
router.post('/m_membresias_grabar_editar',fmembresias.grabar_editar);
router.get('/m_membresias_eliminar/:xid',fmembresias.eliminar);

//Opciones pagos
router.get('/m_pagos_listado', fpagos.listado); 
router.get('/m_pagos_nuevo', fpagos.nuevo);
router.post('/m_pagos_grabar_nuevo',fpagos.grabar_nuevo);
router.get('/m_pagos_editar/:xid',fpagos.editar);
router.post('/m_pagos_grabar_editar',fpagos.grabar_editar);
router.get('/m_pagos_eliminar/:xid',fpagos.eliminar);

function c_inicio(req,res){
    res.render('index',{});
}

function c_usuarios(req,res){
    res.render('usuarios',{});
}

function c_membresias(req,res){
    res.render('membresias',{});
}

function c_pagos(req,res){
    res.render('pagos',{});
}

module.exports=router;  