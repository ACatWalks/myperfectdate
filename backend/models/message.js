require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true}, {toJSON: {virtuals: true}})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message