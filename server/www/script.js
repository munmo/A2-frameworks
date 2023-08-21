
$(document).ready(function()
{
    $("#loginForm").submit(function(event){
        event.preventDefault();
        ajaxPost();
    });
});

function ajaxPost(){

    var formData = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    console.log(JSON.stringify(formData));

    $.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "api/login",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(customer) {
            if(customer.valid == true)
            {
                $("#errormsg").removeClass("showmessage");
                $("#errormsg").addClass("hidemessage");
                $("#loginForm").removeClass("fail");
                $("#loginForm").addClass("success");


            }
            else {
                $("#errormsg").removeClass("hidemessage");
                $("#errormsg").addClass("showmessage");
                $("#loginForm").removeClass("success");
                $("#loginForm").addClass("fail");
                alert("User Credentials Do Not Match!");
            }
            $("#resultSection").html("<h3>" + "Results" + "</h3>" + "<br>" + "<p>" + "Email Address: " + customer.email + "</br>" + "Password: " 
            + customer.password + "</br>" + "Valid User: " + customer.valid + "</p>");

        },
        error : function(err) {
            alert("Error!")
            console.log("Error", err);
        }
    });

    resetData();

    function resetData()
    {
        $("#email").val("");
        $("#password").val("");
    }
}