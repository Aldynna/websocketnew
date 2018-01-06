//function authorize(cookieName,users) {
function authorize(javne) {
    return function (req,res,next) {



        var nasli=false;
      /*  for(let i=0;i<javne.length;i++) {
            if (req.path == javne[i]) {
                console.log('javne '+javne[i]);
                console.log('nasa '+req.path);
                next();
                nasli=true;
            }*/




       if(req.cookies.token!==undefined) { console.log('if'); next(); nasli=true;}
        else{
           if(req.path=='/register') next();
for(let i=0;i<javne.length;i++) {
    if (req.path == javne[i]) {
        console.log(javne[i]);
        console.log(req.path);
        next();
        nasli=true;
    }
}

      /*    if(req.cookies.token!=='undefined') { console.log('und token '+req.cookies.token); next(); nasli=true;}
      else if(!nasli) res.redirect('/');}
          /*  if(req.cookies.token===undefined||!nasli) { console.log('und token '+req.cookies.token); nasli=false;}
            else {next();}*/
            if(!nasli) res.redirect('/');
        }

     /*  if(req.path=='/'){
            next();
        } else if(req.path=='/chat'){
         var beginuser = req.cookies.user;
         var begintoken = req.cookies.token;
            console.log('cookie auth '+req.cookies.user+' token '+req.cookies.token);
         if(beginuser!== undefined||begintoken!== undefined){ console.log('provjera'); next();}
         else res.send('ne moze');
         }
        else {
            res.send('ne moze');
        }*/
    }

}
module.exports=authorize;