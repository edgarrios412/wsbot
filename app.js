const qrcode = require('qrcode-terminal');
const gpt = require("./gpt")
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
    console.log('Client is ready!');
});

client.on("message", (message) => {
    // client.sendMessage(message.from,"Generando una respuesta...")
    if(message.body == "list"){
      const lista = new List(
        "Here's our list of products at 50% off",
        "View all products",
        [
          {
            title: "Products list",
            rows: [
              { id: "apple", title: "Apple" },
              { id: "mango", title: "Mango" },
              { id: "banana", title: "Banana" },
            ],
          },
        ],
        "Please select a product"
      );
        console.log(message)
      return client.sendMessage(messsage.from, lista);
    }
    console.log(message.notifyName)
      gpt(message.body, message.from.split("@")[0], message._data.notifyName).then((data) => {
        if(data.length == 0) return client.sendMessage(message.from,"No hemos conseguido la respuesta")
        return client.sendMessage(message.from,data)
      })
  });

client.initialize();
