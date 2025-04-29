import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
       console.log("Error in getting users for sidebar");
       res.status(500).json({message: "Internal server error"});
    }
};

export const getMessages = async (req,res) => {
    try {
        const { id:userToChatId } = req.parms;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        }) 

        res.status(200).json(messages)
    } catch (error) {
       console.log("Error in getmessages controller");
       res.status(500).json({message: "Internal server error"});
    }
};

export const sendMessage = async (req,res) => {
    try {
        const {text, image } = req.body;
        const {id: receiverId} = req.parms;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse = await cloudinary.uploader.upload("image");
            imageUrl = (await uploadedResponse).secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // todo socketio realtime thing

        res.status(201).json(newMessage)
    } catch (error) {
       console.log("Error in sendmessages controller");
       res.status(500).json({message: "Internal server error"});
    }
};