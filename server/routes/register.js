module.exports = function(db, app) {
    app.post('/api/register', async function(req, res) {
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            pwd: req.body.password,
            valid: false
        };

        try {
            const collection = db.collection('users');
            
            // Check if the username or email already exists
            const isUsernameExists = await collection.findOne({ username: newUser.username });
            const isEmailExists = await collection.findOne({ email: newUser.email });
            
            if (isUsernameExists && isEmailExists) {
                return res.send({ ok: false, error: 'Both email and username are already registered' });
            }

            if (isUsernameExists) {
                return res.send({ ok: false, error: 'Username already registered' });
            }

            if (isEmailExists) {
                return res.send({ ok: false, error: 'Email already registered' });
            }

            // Insert the new user into the MongoDB collection
            await collection.insertOne(newUser);
            console.log("New user:", newUser);
            return res.send({ ok: true, message: 'User registered successfully' });
            
        } catch (error) {
            console.error('Error:', error);
            return res.send({ ok: false, error: 'Internal server error' });
        }
    });
};
