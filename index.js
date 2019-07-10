var express = require('express')
var five = require('johnny-five')
var dateformat = require('dateformat')
var fs = require('fs')
var arduino  = new five.Board()
var now = new Date();
var mydate = dateformat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
var app = express()
app.get('/', function(req, res){
	res.end('Home');
});
app.get('/led/:ledPin?/:state?', function(req, res){
	var ledPin = req.params.ledPin;
	var state = req.params.state;
	var led = new five.Led(ledPin);
	data = "|pin: "+ledPin + "|" + state + " " + mydate + "\r\n";
    fs.appendFile('temp.txt',data, function(err,data){
	if(err)console.log(err);
});
	if(state ==='off'){
             led.off();
             res.send('<b>LedPin </b>' + ledPin + ' ' + state + '<br>');
             res.send(state);
	}
	if(state ==='on'){
             led.on();
             res.send('<b>LedPin </b>' + ledPin + ' ' + state );
	}
	
});
app.get('*', function(req, res){
	res.end('Error');
});
app.listen(3000,function(){
	console.log('listenning on localhost:3000');
});