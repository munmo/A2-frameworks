module.exports = function(db, app) {
    app.post('/api/login', async function(req, res) {
        // Retrieve email and password from request body
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ ok: false, message: 'Email and password are required' });

        // Access the users collection
        const collection = db.collection('users');
        try {
            // Find a user that matches the email and password
            const user = await collection.findOne({ email, pwd: password });
            if (!user) return res.json({ ok: false });
            
            // Update user as valid and send a response
            await collection.updateOne({ email }, { $set: { valid: true } });
            res.json({ ok: true, userData: user });
        } catch(err) {
            console.error('Error:', err);
            res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }
    });
}