//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var app = express();
var fs = require('fs');

//Configures the Template engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

//routes
app.get('/', function(req, res) { 
    res.render('index') 
    });
app.post('/upload', function(req,res) {
    //error checking
    if (req.body.rpFile == null) {
    res.redirect('/');
    } else {
    var p1fn = req.body.p1fn ? req.body.p1fn : "NOP1FN";
    var p1ln = req.body.p1ln ? req.body.p1ln : "NOP1LN";
    var p2fn = req.body.p2fn ? req.body.p2fn : "NOP2FN";
    var p2ln = req.body.p2ln ? req.body.p2ln : "NOP2LN";
    var assv = req.body.assv ? req.body.assv : "NOASSV";

    var assignmentName = p1fn + "_" + p1ln + "_" + p2fn + "_" + p2ln + "_" + assv;
    if (assv === "a") {
    var extension = ".rp";
    } else {
    var extension = ".bmml";
    }
    var assignmentName = assignmentName + extension;
    console.log(assignmentName);
    res.render('index');
    fs.readFile(req.body.rpFile, function(err, data) {
      var path = __dirname + '/uploads/'+ assignmentName;
      fs.writeFile(path, data, function(err) {
        if (err) {
          console.log(err);
        } 
        res.render('index');
      });
    });
  }
});
//set environment ports and start application
app.set('port', process.env.PORT || 3000);
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
    });