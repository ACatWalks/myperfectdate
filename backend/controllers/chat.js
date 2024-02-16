const express = require('express')
const router = express.Router()
const Chat = require('../models/chatModel')
const Message = require('../models/message')
const User = require('../models/User')
const { response } = require('express')

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the chat route"
    })
})

//creating a new chat and adding it to the user's chats field
router.post('/', async(req, res) => {
    if(req.body === false) return;
    try{
        const newChat = await Chat.create(req.body)
        newChat.save(function(err, success){
            if(err){
                console.log(err, 'chat failed to save')
            } else{
                res.status(200).json(success.id)
            }
        })

        User.updateOne({_id: newChat.users}, {$push: {chats: newChat.id}},
                function(error, success){
                    if(error){
                        console.log(error, 'chat controller failed to add chat to user')
                    } else{
                        console.log('a new chat has been created')
                    }
                }
            )
    } catch(err){
        res.status(400).json({
            message: `${err} occurred in chat controller creation route`
        })
    }
})

//finding chat by id
router.get('/:chatId', async(req, res) => {
    if(req.params.chatId === false) return;
    try{
        Chat.findOne({
            _id: req.params.chatId
        }).
        populate('content').
        exec(async function(err, data){
            if(err){
                console.log(err, '')
            } else{
                let messages = []
                data.content.map(i => messages.push({text: i.text, author: i.user}))
                res.json(messages)
            }
        })
    } catch(err){
        res.status(400).json({
            message: `${err} occurred`
        })
    }
})

//adding new messages to chat
router.post('/messages/:chatId', async (req, res) => {
    try{
        const newMessage = await Message.create(req.body)
        const foundChat = Chat.findOneAndUpdate({_id: req.params.chatId}, {$push: {content: newMessage.id}}, 
            function(error, success) {
                if(error){
                    console.log(error)
                } else{
                    res.status(200).json(success)
                }
        })

    } catch(err) {
        res.status(400).json({
            message: `${err} occurred`
        })
    }
})

//getting all of a user's chats
router.get('/userChats/:id', (req, res) => {
    Chat.find({user: req.params.id}, function(error, data){
        if(error){
            console.log(error, 'cannot find chats')
            res.json(error, 'cannot find chats')
        } else{
            try{
                let response = []
                data.map(i => response.push(i._id))
                console.log(response)
                res.status(200).json({
                    message: 'array of chats',
                    data: response
                })
            } catch(err){
                console.log(err)
            }
        }
    })
})

module.exports = router