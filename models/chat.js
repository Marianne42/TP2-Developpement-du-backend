const mongoose = require("mongoose");
const cours = require("./cours");

const chatSchema = new mongoose.Schema({
    chat: {type: string, required: false},
   
    
});

module.exports = mongoose.model("chat", chatSchema);