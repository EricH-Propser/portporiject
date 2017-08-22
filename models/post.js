var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    name:String,
    image:String,
    type:String,
    info:String,
    tags: [],
    orginneed:{ type: Number, default: 0 },
    editneed:{ type: Number, default: 0 },
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },username:String},
      members:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
    }]
    
})


var Post = mongoose.model("Post",postSchema);


module.exports = Post;