var mongojs = require('mongojs');
var uri = 'mongodb://127.0.0.1:27017/proyectofithub';
var db = mongojs(uri,["membresias"]);

function membresias_listado(req, res){
    db.membresias.find().sort({nombre:1}, function( err,records ){
        if (err) {
            console.log('Error al acceder a la base de datos.');
            return;
        }
        res.render('m_membresias_listado',{records: records});
    });
}

module.exports = {
    listado: function (req,res){
        membresias_listado(req,res);
    },
    nuevo: function (req,res){
        res.render('m_membresias_nuevo',{});
    },
    grabar_nuevo: function (req,res) {
        var xnom = req.body['xnom'];
        var xpr = req.body['xpr'];
        db.membresias.find().sort({_id:-1}, function ( err,records ){
            if(err){
                console.log('Error al acceder a la base de datos.');
                res.end();
                return;
            }
            var xid = records[0]._id +1;
            db.membresias.insert( {_id:xid, nombre:xnom, precio:parseInt(xpr)}, function(){
                membresias_listado(req,res);
            });
        });
    },
    editar: function (req,res) {
        var xid = req.params.xid*1;
        console.log(xid);
        db.membresias.find({_id:xid}, function(err, records) {
            if (err) {
                console.log('Error a acceder a la base de datos.');
                res.end();
                return;
            }
            res.render('m_membresias_editar',{membresia: records[0]});
        });
    },
    grabar_editar: function (req, res){
        var xid = req.body['xid' ]*1;
        var xnom = req.body['xnom'];
        var xpr = req.body['xpr'];
        db.membresias.update( {_id:xid}, { $set: {nombre:xnom, precio:parseInt(xpr)}}, function() {
            membresias_listado( req, res );
        });
    },
    eliminar: function (req, res){
        var xid=req.params.xid*1;
        db.membresias.remove({_id:xid}, function(){
            membresias_listado(req, res);
        });
    },
}