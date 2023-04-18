const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chat: {type: String, required: true},
   
    
});

module.exports = mongoose.model("chat", chatSchema);