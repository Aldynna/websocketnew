/**
 * Created by korisnik on 23.11.2017..
 */
var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cookie=require('cookie');
var alert=require('alert-node');
var auth=require('./helpers/authorize');
var path  = require('path');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//midlwear izvrsava se redom,

function authorize() {
    return function (req,res,next) {

        if(req.path=='/'){
            /* var fullUrl = req.protocol + '://' + req.get('host');*/

          //  console.log();
            //console.log(url);

            next();
        } else if(req.path=='/chat'){
         var beginuser = req.cookies.user;
         var begintoken = req.cookies.token;
         if(beginuser!== undefined&&begintoken!== undefined) next();
         }
        else {
            res.send('ne moze');
        }
    }

}

//app.use(auth('user',['Aldina']));
app.use(auth());

var korisnici=require('./korisnici.json');
app.get('/', function(req, res){
    console.log(req.cookies.user+req.cookies.token);
    res.sendFile(__dirname + '/prva.html');
});

app.get('/provjera',function(req,res){
    let crypto=require('crypto');
    let Buffer=require('buffer').Buffer;
    let SECRET_KEY="nekikey";
    let ENCODING='hex';
    let pass=req.param('pass');
    let user=req.param('user');

console.log(user+pass);


    function encrypt(text){
        // var cipher = crypto.createCipher(algorithm,password)
        let cipher = crypto.createCipher('des-ede3-cbc',SECRET_KEY);
        let crypted = cipher.update(text,'utf8',ENCODING);
        crypted += cipher.final(ENCODING);
        return crypted;
    }

    function decrypt(text){
        // var decipher = crypto.createDecipher(algorithm,password)
        let decipher = crypto.createDecipher('des-ede3-cbc',SECRET_KEY);
        let dec = decipher.update(text,ENCODING,'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    var pronasao=false;
    var ima_korisnik=false;
    var poruka;
    var token=' ';
    poruka="Korisnik ne postoji";
    for(let i=0;i<4;i++)
    {
        //console.log('korisnici[i].name '+korisnici[i].name)
        if(user===korisnici[i].name) {
            //  res.cookie('user', user, {expire: new Date() + 9999});
        poruka="Pogresan password";
            //let ps=decrypt(korisnici[i].pass);
            //console.log(ps);
            if(pass===decrypt(korisnici[i].pass)) {
                console.log("dekripcija "+korisnici[i].pass+" u "+decrypt(korisnici[i].pass));
              // res.cookie('user', user, {expire: 360000 + Date.now()});
                // res.cookie('user', user).send('cookie set');
                //console.log('user: ', req.cookies.user);
                poruka="Pronasli korisnika";
            token=encrypt(user);
            console.log('token '+token);
                pronasao = true;

            }
            ima_korisnik=true;

            break;
            //  console.log(res);

        }


    };
    /*if(ima_korisnik) {
        //else res.send('Pogresni podaci');
        //res.sendFile(__dirname + '/prva.html');
        if(!pronasao)
        {alert ("Pogresan password!");}}
    else
        alert("Pogresni podaci!");*/

    res.send({poruka:poruka,token:token});


});
app.get('/reg', function(req, res){
    var nick=req.query.nick;
    var ps=req.query.pass;
    var psc=req.query.pass2;
    if (nick == '' || ps == '' || psc == '') {
        alert("Please fill all fields...!!!!!!");
    } else if ((ps.length) < 4) {
        alert("Password should atleast 4 character in length...!!!!!!");
    } else if (!(ps).match(psc)) {
        alert("Your passwords don't match. Try again?");
    } else{
        var novi={
            "id": "1",
            "name" : "Aldina"


        };
        korisnici.
        res.cookie('user', user, {expire: 360000 + Date.now()});
        console.log('user: ', req.cookies.user);
        res.sendFile(__dirname + '/index.html');
    };
});

/*app.get('/login', function(req, res){

    var user=req.query.user;
    var pass=req.query.pass;
    var sha512 = require('js-sha512');

    var nn=sha512(pass).toString('hex');
    let crypto=require('crypto');
    let Buffer=require('buffer').Buffer;
    let SECRET_KEY="nekikey";
    let ENCODING='hex';
   /* var crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        password = 'd6F3Efeq';*/

  /*  function encrypt(text){
       // var cipher = crypto.createCipher(algorithm,password)
        let cipher = crypto.createCipher('des-ede3-cbc',SECRET_KEY);
        let crypted = cipher.update(text,'utf8',ENCODING);
        crypted += cipher.final(ENCODING);
        return crypted;
    }

    function decrypt(text){
       // var decipher = crypto.createDecipher(algorithm,password)
        let decipher = crypto.createDecipher('des-ede3-cbc',SECRET_KEY);
       let dec = decipher.update(text,ENCODING,'utf8')
        dec += decipher.final('utf8');
        return dec;
    }

    console.log("nn ");
    console.log(nn);

    var pronasao=false;
    var ima_korisnik=false;
    console.log("crypto: "+pass+" u "+encrypt(pass));
    for(let i=0;i<4;i++)
    {
       // console.log('korisnici[i].name '+korisnici[i].name)
    if(user===korisnici[i].name) {
      //  res.cookie('user', user, {expire: new Date() + 9999});

        //let ps=decrypt(korisnici[i].pass);
        //console.log(ps);
        if(pass===decrypt(korisnici[i].pass)) {
            console.log("dekripcija "+korisnici[i].pass+" u "+decrypt(korisnici[i].pass));
            res.cookie('user', user, {expire: 360000 + Date.now()});
            console.log();
            // res.cookie('user', user).send('cookie set');
            console.log('user: ', req.cookies.user);
            res.sendFile(__dirname + '/index.html');
            pronasao = true;

        }
        ima_korisnik=true;
        break;
      //  console.log(res);

    }

        };
    if(ima_korisnik) {
        //else res.send('Pogresni podaci');
        //res.sendFile(__dirname + '/prva.html');
        if(!pronasao)
        {alert ("Pogresan password!");}}
        else
        alert("Pogresni podaci!");

});*/

app.get('/register', function(req, res, next) {
    res.sendFile(__dirname +'/register.html');
});
app.get('/chat', function(req, res, next) {
   var beginuser = req.cookies.user;
    var begintoken = req.cookies.token;
    console.log(req.cookies);
    console.log('cookie '+req.cookies.user+' token '+req.cookies.token);
   if(beginuser!== undefined&&begintoken!== undefined)
        res.sendFile(__dirname +'/index.html');
    else {alert('Ne mozete pristupiti stranii, prvo se prijavite!'); res.redirect('/');}
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
    var nick;
   let n=socket.request.headers.cookie;
   let a=n.split(';');
        var name = 'user' + "=";
        //var decodedCookie = decodeURIComponent(document.cookie);
        //var ca = decodedCookie.split(';');
    var ca = n.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
               nick= c.substring(name.length, c.length);
            }

        }

    io.emit('chat message', nick+' se pridruzio!');
    io.emit('konekcija', nick+' se pridruzio!');

// v.substring(v.indexOf('='));
//console.log(socket.request.headers.cookie);
console.log('nick:'+nick);

    socket.on('disconnect', function(){
        //console.log(socket.headers);
      //  socket.headers.cookie('user',' ', {expire:Date.now()-360000});
socket.emit('delete','user');

        io.emit('chat message', nick+' se diskonetovao!');

      //  io.emit('diskonenekt', nick+' se diskonetovao!');
        console.log(nick+ ' disconnected');
    });
    socket.on('chat message', function(msg){
    //  console.log(socket.cookie.user);

        io.emit('chat message', nick+':'+msg);

      //  console.log(user);
//console.log(req.cookie.user);

        console.log('message: ',nick+':'+msg);
    });
});
/*
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});*/


http.listen(5000, function(){
    console.log('listening on *:4000');
});
