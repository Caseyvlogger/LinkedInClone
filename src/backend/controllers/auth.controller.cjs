const userService = require('../services/user.service.cjs'); // Adjust path if needed

const register = async (req, res) => {
    try {
        console.log('IN controller, calling service.');
        const user = await userService.createUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register };