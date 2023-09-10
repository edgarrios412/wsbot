const qrcode = require('qrcode-terminal');
// const gpt = require("./gpt")
const { Client, LocalAuth, List } = require('whatsapp-web.js');
// const { Message, ClientInfo, Buttons } = require('whatsapp-web.js/src/structures');
const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    console.log("Probando")
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Bot en linea!');
});

client.on("message", (message) => {
  console.log(message)
    client.sendMessage(message.from,"Generando una respuesta...")
      // gpt(message.body, message.from.split("@")[0], message._data.notifyName).then((data) => {
      //   if(data.length == 0) return client.sendMessage(message.from,"No hemos conseguido la respuesta")
      //   return client.sendMessage(message.from,data)
      // })
  });

client.initialize();
