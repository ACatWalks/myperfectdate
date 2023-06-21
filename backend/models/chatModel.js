require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const chatSchema = new Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }],
        required: true
    }
}, 
{toJSON: {virtuals: true}}
);

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat