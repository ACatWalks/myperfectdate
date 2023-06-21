const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "authenticating..."
    })
})

router.post('/:email', async(req, res) => {
    try{
        const foundUser = await User.findOne({ email: req.params.email})
        if(!foundUser || !await bcrypt.compare(req.body.pass, foundUser.pass)){
            res.status(404).json({
                message: 'wrong email or password'
            })
        } else{
            res.status(200).json(foundUser)
        }
    }
    catch(err){
        res.status(404).json({
            message: `${err} occurred`
        })
    }
})

module.exports = router