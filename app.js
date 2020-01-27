const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
var qString   = require('querystring');
//----------------------------------------Database-------------------------------------------
//koneksi database
var connection=mysql.createConnection({
    host:"localhost",
    port:3306,
    database:"website_crud",
    user:"root",
    password:""
});

// parse application/json
app.use(bodyParser.json());

app.get('/buku',(req, res) => {
    connection.query("select * from buku",function(err,results){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": false, "response": results}));
    });
})

app.get('/buku/:id',(req, res) => {
    connection.query("select * from buku where ?",{ id : req.params.id },function(err,results){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});
   

app.post('/buku',(req, res) => {
    var data_post={penulis: req.body.penulis, judul: req.body.judul, kota: req.body.kota, penerbit: req.body.penerbit, tahun: req.body.tahun};
    connection.query("insert into buku set ?", data_post,function(err,results){
        if(err) throw err;
        res.send(JSON.stringify({"status": 201, "error": false, "response": results}));
    });
})

app.put('/buku/:id',(req, res) => {
    var data_post={penulis: req.body.penulis, judul: req.body.judul, kota: req.body.kota, penerbit: req.body.penerbit, tahun: req.body.tahun};
    connection.query("update buku set ? where ?",[ data_post, {id : req.params.id } ], function(err,results){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.delete('/buku/:id',(req, res) => {
    connection.query("delete from buku where ?",{id : req.params.id },function(err,results){
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.listen(8000,() =>{
    console.log('Server started on port 8000...');
  });