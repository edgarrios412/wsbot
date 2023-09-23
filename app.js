const qrcode = require('qrcode-terminal');
const gpt = require("./gpt")
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const axios = require('axios');
const { handlerAI } = require("./utils/utils");
const { textToVoice } = require("./services/eventlab");

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    console.log("hola")
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!')
});


client.on("message", async (message) => {
    if(message.hasMedia){
        const text = await handlerAI(message)
        console.log(text)
        client.sendMessage(message.from, text)
    }
    if(message.body[0] == "-"){
        gpt(message.body, message.from.split("@")[0], message._data.notifyName).then((data) => {
          textToVoice(data).then((path) => {
              const media = MessageMedia.fromFilePath(path);
              return client.sendMessage(message.from,media)
          })
        if(data.length == 0) return client.sendMessage(message.from,"No hemos conseguido la respuesta")
      })}
});

client.initialize();
