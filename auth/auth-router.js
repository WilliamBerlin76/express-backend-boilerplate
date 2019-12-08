const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require('../models/users-model');
const generateToken = require('./generateToken');

// REGISTER A NEW USER
router.post('/register', (req, res) => {
    const user = req.body;
    
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashedPassword;

    Users.add(user)
    .then(newUser => {
        const token = generateToken(newUser);
        res.status(201).json({ newUser, token })
    })
    .catch(err => {
        console.log('REGISTRATION ERROR', err)
        res.status(500).json({ error: 'the server could not add the user' })
    })
});

module.exports = router;