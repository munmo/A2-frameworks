module.exports = function(db, app) {
    app.post('/api/getChannels', async (req, res) => {
        if (!req.body || !req.body.group || !req.body.username) {
            return res.status(400).json({ message: 'Bad request. group and username are required.' });
        }

        const { group, username } = req.body;
        const usersCollection = db.collection('users');
        const groupsCollection = db.collection('groups');

        try {
            const user = await usersCollection.findOne({ username });
            if(!user) return res.status(404).json({ message: 'User not found' });
        
            const hasAccess = user.roles?.includes("Super") || user.roles?.includes("Group") || user.groups?.includes(group);
            if (!hasAccess) return res.status(403).json({ message: 'You do not have permission to view these channels.' });
        
            const groupDoc = await groupsCollection.findOne({ group });
            if (!groupDoc) return res.status(404).json({ message: 'Group not found' });
            
            res.status(200).json(groupDoc.channels);
        } catch(err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
