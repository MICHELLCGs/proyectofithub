var mongojs = require('mongojs');
var uri = 'mongodb://127.0.0.1:27017/proyectofithub';
var db = mongojs(uri,["usuarios"]);

function usuarios_listado(req, res){
    db.usuarios.find().sort({nombre:1}, function( err,records ){
        if (err) {
            console.log('Error al acceder a la base de datos.');
            return;
        }
        res.render('m_usuarios_listado',{records: records});
    });
}

module.exports = {
    listado: function (req,res){
        usuarios_listado(req,res);
    },
    nuevo: function (req,res){
        res.render('m_usuarios_nuevo',{});
    },
    grabar_nuevo: function (req,res) {
        var xnom = req.body['xnom'];
        var xem = req.body['xem'];
        db.usuarios.find().sort({_id:-1}, function ( err,records ){
            if(err){
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            var xid = records[0]._id +1;
            db.usuarios.insert( {_id:xid, nombre:xnom,email:xem}, function(){
                usuarios_listado(req,res);
            });
        });
    },
    editar: function (req,res) {
        var xid = req.params.xid*1;
        console.log(xid);
        db.usuarios.find({_id:xid}, function(err, records) {
            if (err) {
                console.log('Error a acceder a la base de datos.');
                res.end();
                return;
            }
            res.render('m_usuarios_editar',{usuario: records[0]});
        });
    },
    grabar_editar: function (req, res){
        var xid = req.body['xid' ]*1;
        var xnom = req.body['xnom'];
        var xem = req.body['xem'];
        db.usuarios.update( {_id:xid}, { $set: {nombre:xnom,email:xem}}, function() {
            usuarios_listado( req, res );
        });
    },
    eliminar: function (req, res){
        var xid=req.params.xid*1;
        db.usuarios.remove({_id:xid}, function(){
            usuarios_listado(req, res);
        });
    },
}