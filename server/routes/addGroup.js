module.exports = function(db, app) {
    app.post('/api/addGroup', async function(req, res) {
        if(!req.body) return res.sendStatus(400);
        
        const collection = db.collection('groups');
        try {
            const document = await collection.findOne({ group: req.body.group });
            if(document) return res.send({num: 0, err: "duplicate item"});
            
            await collection.insertOne(req.body);
            res.send({ group: req.body.group });
            
        } catch(err) {
            console.error('Error:', err);
            res.status(500).send({'err': err});
        }
    });
};
