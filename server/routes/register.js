const fs = require('fs').promises;

module.exports = async function (req, res) {
    const newUser = {
        username: req.body.username,
        birthdate: req.body.birthdate,
        age: req.body.age,
        email: req.body.email,
        pwd: req.body.password,
        valid: false
    };

    try {
        const data = await fs.readFile('./data/users.json', 'utf8');
        const usersData = JSON.parse(data);

        if (usersData.users.some(user => user.email === newUser.email)) {
            return res.send({ ok: false, error: 'Email already registered' });
        }

        usersData.users.push(newUser);

        await fs.writeFile('./data/users.json', JSON.stringify(usersData, null, 2), 'utf8');

        return res.send({ ok: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.send({ ok: false, error: 'Internal server error' });
    }
};
