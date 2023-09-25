module.exports = function(db, app) {
    app.get('/api/getGroups', async function(req, res) {
        try {
            const groupsCollection = db.collection('groups');
            const groups = await groupsCollection.find({}).toArray();
            res.json(groups.map(group => group.group));
        } catch(err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
