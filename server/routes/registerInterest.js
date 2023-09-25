module.exports = function(db, app) {
    app.post('/api/registerInterest', async function(req, res) {
        const username = req.body.username;
        const group = req.body.group;
        
        try {
            const collection = db.collection('pendingRequest');
            
            // Check if the interest already exists
            const existingInterest = await collection.findOne({ username, group });
            if(existingInterest) {
                return res.status(400).json({ message: "Interest already registered." });
            }
            
            // Add the new interest
            await collection.insertOne({ username, group });
            
            // Respond with a confirmation message
            res.json({ message: "Interest registered." });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};
