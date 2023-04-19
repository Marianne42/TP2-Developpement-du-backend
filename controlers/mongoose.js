
const Chat = require("../models/chat")





const creerChat = async (requete, reponse, next) =>{
    const nouveauChat = new Chat({
        chat: requete.body.chat
    });

    const resultat = await nouveauChat.save();

    reponse.json(resultat);
}


const getChat= async (requete, reponse, next) =>{

    const chats = await Chat.find().exec();

    reponse.json(chats);
}

exports.creerChat = creerChat;
exports.getChat = getChat;
