const mongoose = require("mongoose")
const Schema  = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type:Boolean,
        default:false
    }

},{timestamps: true})

const chatSchema = new Schema({
    isGroupChat: {
        type: Boolean,
        default: false
    },
    chatName: {
        type:String,
        required: function(){
            return this.isGroupChat;
        }
    },
    participants: [
        {
            type: ObjectId,
            ref:"User"
        }
    ],
    latestMessage: {
        type:ObjectId,
        ref: "Message"
    }
},{timestamps:true})


const messageSchema = new Schema ({
    sender: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    chat: {
        type: ObjectId,
        ref:"Chat",
        required:true
    },
    content:{
        type:String,
        required: true
    }
},{timestamps: true})

User = module.model("User",userSchema);
Chat = module.model("Chat",chatSchema);
Message = module.model("Message",messageSchema);

module.exports = { User, Chat, Message };