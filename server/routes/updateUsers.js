module.exports = function(app,db){
    //Route to manage image file uploads
    
    app.post('/api/updateuser', async (req, res) => {
        let data = req.body;
        //console.log('data', data);
        //make sure a user of that ID exists.
        let user = await db.collection("users").findOne({id:data.user.id});
        if (user){
          let updatedvalues = {$set:{avatar:data.user.avatar}}
          let result = await db.collection("users").updateOne({id:data.user.id},updatedvalues)
          res.send({ok:true});
          return true;
        }
    })
       
}