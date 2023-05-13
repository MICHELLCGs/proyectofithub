var mongojs = require('mongojs');
var uri = 'mongodb://127.0.0.1:27017/proyectofithub';
var db = mongojs(uri,["pagos"]);

function pagos_listado(req, res){
    db.pagos.find().sort({usuario_id:1}, function( err,records ){
        if (err) {
            console.log('Error al acceder a la base de datos.');
            return;
        }
        res.render('m_pagos_listado',{records: records});
    });
}

module.exports = {
    listado: function (req,res){
        pagos_listado(req,res);
    },
    nuevo: function (req,res){
        res.render('m_pagos_nuevo',{});
    },
    grabar_nuevo: function (req,res) {
        var xus = req.body['xus'];
        var xmo = req.body['xmo'];
        var xfe = req.body['xfe'];
        db.pagos.find().sort({_id:-1}, function ( err,records ){
            if(err){
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            var xid = records[0]._id +1;
            db.pagos.insert( {_id:xid, usuario_id:xus,monto:xmo,fecha:xfe}, function(){
                pagos_listado(req,res);
            });
        });
    },
    editar: function (req,res) {
        var xid = req.params.xid*1;
        console.log(xid);
        db.pagos.find({_id:xid}, function(err, records) {
            if (err) {
                console.log('Error a acceder a la base de datos.');
                res.end();
                return;
            }
            res.render('m_pagos_editar',{pago: records[0]});
        });
    },
    grabar_editar: function (req, res){
        var xid = req.body['xid' ]*1;
        var xus = req.body['xus'];
        var xmo = req.body['xmo'];
        var xfe = req.body['xfe'];
        db.pagos.update( {_id:xid}, { $set: {usuario_id:xus,monto:xmo,fecha:xfe}}, function() {
            pagos_listado( req, res );
        });
    },
    eliminar: function (req, res){
        var xid=req.params.xid*1;
        db.pagos.remove({_id:xid}, function(){
            pagos_listado(req, res);
        });
    },
}