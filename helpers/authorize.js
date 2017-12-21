//function authorize(cookieName,users) {
function authorize(javne) {
    return function (req,res,next) {
        var nasli=false;
        if(req.cookies.token!==undefined) { console.log('if'); next();}
        else{
for(let i=0;i<javne.length;i++) {
    if (req.path == javne[i]) {
        console.log(javne[i]);
        console.log(req.path);
        next();
        nasli=true;
    }
}
     if(!nasli) res.redirect('/');}
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