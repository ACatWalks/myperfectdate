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
    id: {
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
    preferredRace: {
        type: Array[String]
    },
    preferredSex: {
        type: String,
        enum: ['Man', 'Woman', 'No preference']
    },
    goals: {
        type: String,
        enum: ['Relationship', 'Marriage', 'Casual Sex', 'Other']
    },
    values: {
        type: String,
        enum: ['save/invest', 'spend', 'donate', 'return']
    },
    desires1: {
        type: Number,
    },
    desires2: {
        type: Number,
    },
    desires3: {
        type: Number,
    },
    desires4: {
        type: Number,
    },
    desires5: {
        type: Number,
    },
    desires6: {
        type: Number,
    },
    attributes1: {
        type: Number,
    },
    attributes2: {
        type: Number,
    },
    attributes3: {
        type: Number
    },
    attributes4: {
        type: Number,
    },
    attributes5: {
        type: Number,
    },
    attributes6: {
        type: Number
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