require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.DATABASE_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const userSchema = new Schema(
    {
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: true
    },
    userRace: {
        type: String,
        enum: ['Asian', 'White', 'Hispanic', 'Native American', 'Black', 'Mixed Race/Other']
    },
    userSex: {
        type: String,
        enum: ['Man', 'Woman']
    },
    preferredSex: {
        type: String,
        enum: ['Man', 'Woman']
    },
    chats: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        }],
    }
}, {toJSON:{virtuals: true}})

const User = mongoose.model("User", userSchema);
module.exports = User