const express = require('express');
const router = express.Router()
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'route for users'
    })
})

//creates new user accounts
router.post('/', async(req, res) => {
    if(req.body === false) return;
    let { pass, ...rest} = req.body
    if(await User.findOne({email: req.body.email})){
        res.status(400).json({
            message: 'User already has account'
        });
        return;
    }
    try{
        const newUser = await User.create({
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        })
        res.status(200).json({
            message: `${newUser} was created`
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occurred`
        })
    }
})

//allows user to delete their accounts
router.delete(':/email', async(req, res) => {
    if(req.params.email === false) return;
    try{
        const deletedUser = await User.findById(req.params.email)
        deletedUser.delete()
        res.status(200).json({
            message: `${deletedUser} deleted`
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: `${err} occurred`
        })
    }
})

//allows user to change his/her email
router.put('/:email', async(req, res) => {
    let { pass, ...rest} = req.body
    try{
        await User.updateOne({ email: req.params.email }, {$set: {
            ...rest,
            pass: await bcrypt.hash(pass, 10)
        }})
        res.status(200).json({
            message: `account for ${req.params.email} was updated`
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occurred`
        })
    }
})

module.exports = router