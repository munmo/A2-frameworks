module.exports = function(db, app) {
    app.post('/api/confirmInterest', async function(req, res) {
        if(!req.body) return res.sendStatus(400);

        const { username, group } = req.body;
        const usersCollection = db.collection('users');
        const pendingCollection = db.collection('pendingRequest');

        try {
            const user = await usersCollection.findOne({ username });
            if(!user) return res.status(404).json({ message: "User not found" });

            // Remove the entry from pendingInterest
            await pendingCollection.deleteOne({ username, group });

            // Update user's groups
            if(!user.group) user.group = [];
            user.group.push(group);
            await usersCollection.updateOne({ username }, { $set: { group: user.group } });

            res.json({ message: "Interest confirmed and user updated." });
        } catch(err) {
            console.error('Error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
}
