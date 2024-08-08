const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body; 

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (password.length >= 3 && username.length >= 3) {
        const user = new User({
            username,
            name,
            passwordHash,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    }

    else {
        return res.status(400).json({ error: 'username or password is under 3 charachters' })
    };
});

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 });
    res.json(users);
});

module.exports = userRouter;