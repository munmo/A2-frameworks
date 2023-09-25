module.exports = function(db, app) {
    app.get('/api/pendingInterest', async function(req, res) {
        try {
            // Access the pendingInterests collection
            const collection = db.collection('pendingRequest');
            
            // Retrieve all documents from the pendingInterests collection
            const pendingInterests = await collection.find({}).toArray();
            
            // Send the retrieved documents as a response
            res.json(pendingInterests);
        } catch (err) {
            console.error('Error retrieving pending interests:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};
