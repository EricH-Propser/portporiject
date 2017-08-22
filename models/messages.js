var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
    link:{type:String,default:""},
    text:String,
    author:{
        id: {
           type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        createdDate: { type: Date, default: Date.now },
    },
        receiver:{
                id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }}
    
        })

module.exports = mongoose.model("message",messageSchema);
