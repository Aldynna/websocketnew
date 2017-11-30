/**
 * Created by korisnik on 23.11.2017..
 */
function check() {


    let us=$("#user").val();
    let ps=$("#pass").val();

    $.ajax({
        method:"get",
        url: "/login",
        data:{user:us,pass:ps}
    }).done(function(msg){

            //  alert("Data saved:"+msg);
        }

    )



}

function getnick() {
    $.ajax({
    url: "/nick",

        success: function( result ) {
        $( "#history" ).html( "<p>" + result + "</p>" );
        console.log(result);
    }
});

}

