const router = require('express').Router();
const user = require('../models/user');

rounter.post('/signUp', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        
    }catch(err){
        res.status(400).send(err);
    }

});

module.exports = router;