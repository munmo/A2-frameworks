var fs = require('fs');

module.exports = function(req, res)
{
    var customer = {}; //Create a new customer object that can be sent back as a response
    customer.email = req.body.email; //Assign the email object of customer to the email from response
    customer.password = req.body.password; //Assign the password object of customer to the password from response

    console.log(customer.password);

    fs.readFile("./data/users.json", "utf8", function(err,data)
    {
        if(err) throw err;
        let userArray = JSON.parse(data);
        userArray = Object.values(userArray.users);
        let i = userArray.findIndex(user => 
            ((user.email == customer.email) && (user.pwd == customer.password)));
        if(i == -1)
        {
            res.send({"ok": false});
        }
        else
        {
            userArray[i].valid = true;
            res.send({
                "ok": true,
                "userData": userArray[i]});
        }
    })
}