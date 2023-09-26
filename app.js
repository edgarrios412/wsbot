// const qrcode = require('qrcode-terminal');
const qrc = require("qr-image")
const gpt = require("./gpt")
const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
// const axios = require('axios');
const fs = require("fs")
const { handlerAI } = require("./utils/utils");
const { textToVoice } = require("./services/eventlab");

const clients = [
    {
        id:1,
        role:"Eres vendedor de zapatos nike y adidas, eres breve con tus respuestas y muy amable"
    },{
        id:2,
        role:"Eres asesor de bienes y raices, eres breve con tus respuestas y muy amable"
    }
]

clients.map((clientInfo) => {
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: clientInfo.id
        }),
        puppeteer: {
            executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
            headless: true, 
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']
        }
    });

    client.on('qr', qr => {
        // qrcode.generate(qr, {small: true});
        var qrPng = qrc.image(qr, { type: 'png' });
        qrPng.pipe(require('fs').createWriteStream(`qr/qr${clientInfo.id}.png`));
        console.log(`Codigo QR${clientInfo.id} generado exitosamente`)
      });

    client.on('ready', () => {
        fs.unlink(`qr/qr${clientInfo.id}.png`,(err) => null)
        console.log(`Client(${clientInfo.id}) is ready!`)
    });
    
    client.on("message", async (message) => {
        if(message.hasMedia){
            const media = await message.downloadMedia()
            const text = await handlerAI(media)
            gpt(clientInfo.id, text, message.from.split("@")[0], message._data.notifyName, clientInfo.role).then((data) => {
                textToVoice(data).then((path) => {
                    const media = MessageMedia.fromFilePath(path);
                    client.sendMessage(message.from,media)
                })
            })
        }
        if(message.body[0] == "-"){
            gpt(clientInfo.id, message.body, message.from.split("@")[0], message._data.notifyName, clientInfo.role).then((data) => {
                  client.sendMessage(message.from,data)
          })}
    });


    client.initialize()
})
















/////////////////////
//// CODIGO BASE ////
////////////////////


// const client = new Client({
//     authStrategy: new LocalAuth({
//         clientId: "client-one"
//     }),
//     puppeteer: {
//         executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
//         headless: true, 
//         args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions']
//     }
// });

// client.on('qr', qr => {
//     // qrcode.generate(qr, {small: true});
//     var qrPng = qrc.image(qr, { type: 'png' });
//     qrPng.pipe(require('fs').createWriteStream('qr/qr.png'));
//     console.log("Codigo QR generado exitosamente")
//   });

// client.on('ready', () => {
//     console.log('Client is ready!')
// });

// client.on("message", async (message) => {
//     if(message.hasMedia){
//         const media = await message.downloadMedia()
//         const text = await handlerAI(media)
//         gpt(text, message.from.split("@")[0], message._data.notifyName).then((data) => {
//             textToVoice(data).then((path) => {
//                 const media = MessageMedia.fromFilePath(path);
//                 client.sendMessage(message.from,media)
//             })
//         })
//     }
//     if(message.body[0] == "-"){
//         gpt(message.body, message.from.split("@")[0], message._data.notifyName).then((data) => {
//               client.sendMessage(message.from,data)
//       })}
// });

// client.initialize();

/////////////////////
//// CODIGO BASE ////
////////////////////
