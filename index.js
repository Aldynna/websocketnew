/**
 * Created by korisnik on 23.11.2017..
 */
var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cookie=require('cookie');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/prva.html');
});


app.get('/login', function(req, res){
    var user=req.query.user;
    var pass=req.query.pass;
    if(user=='aldy'&&pass=='nesto') {
      //  res.cookie('user', user, {expire: new Date() + 9999});
        res.cookie('user', user, {expire: 360000 + Date.now()});
        // res.cookie('user', user).send('cookie set');
        console.log('user: ', req.cookies.user);
        res.sendFile(__dirname + '/index.html');
      //  console.log(res);

    }
    //else res.send('Pogresni podaci');
    else res.sendFile(__dirname +'/prva.html');
});


app.get('/ref', function(req, res){
    var user=req.cookie.user;
    if(user='aldy'&&pass=='nesto')
        res.sendFile(__dirname + '/index.html');
    else res.send('Pogresni podaci');
    //else res.sendFile(_dirname)
});

io.on('connection', function(socket){
 console.log('a user connected');
   // var user = socket.id;
 //  console.log(socket.request.headers);

    socket.on('disconnect', function(){

        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
    //  console.log(socket.cookie.user);

        io.emit('chat message', msg);
      //  console.log(user);
//console.log(req.cookie.user);

        console.log('message: ',msg);
    });
});



http.listen(4000, function(){
    console.log('listening on *:4000');
});
