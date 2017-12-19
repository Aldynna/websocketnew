//function authorize(cookieName,users) {
function authorize() {
    return function (req,res,next) {

        if(req.path=='/'){
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
        }
    }

}
module.exports=authorize;