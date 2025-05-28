const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:
    {
        type:String,
        required:true,
    },
    lastName:
    {
        type:String,
    },
    email:
    {
        type:String,
        required:true,
        unique:true,
    },

    password:
    {
        type:String,
        required:true,
    },
    gender:
    {
        type:String,
        required:true,
    },
    dob:
    {
        type:String,
        required:true,
    },
    location:
    {
        type:String,
        required:true,
    },
    religion:
    {
        type:String,
        required:true,
    },
    preferredLanguage:
    {
        type:String,
        required:true,
    },
    course:
    {
        type:String,
        required:true,
    },
    year:
    {
        type:String,
        required:true,
    },
    imageUrls:
    {
        type:String,
    },
    interests:
    {
        type:[String],
        required:true
    },
    habits:
    {
        type:[String],
        required:true
    },
    icebreakers:
    {
        type:String,
        required:true,
    },
    dealbreakers:
    {
        type:String,
        required:true,
    },
    likedProfiles:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    ],
    receivedLikes: [
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
            },
            image:{
                required : true,
            },
            comment:
            {
                type:String,
            },
        },
    ],
    matches:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    blockedUsers: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],

});

const User = mongoose.model('User',userSchema);
module.exports = User;