require("dotenv").config()
const apiKey = process.env.API
const OpenAI = require("openai")
const chat = require("./messages")

const openai = new OpenAI({
    apiKey: apiKey, 
});

module.exports = async (msg, from,name) => {
  console.log(name)
    if(chat[from]){
      console.log("Si existe")
      chat[from].push({
        "role":"user",
        "content":msg
      })
    }else{
      console.log("No existe")
      chat[from] = [{
          "role": "system",
          "content": "Tu nombre es David eres vendendor, Siempre debes saludar cordialmente a " + name + " es tu cliente. Vendes yogures de mora, fresa y piña, eres amable, el precio es de 2500 por unidad y el domicilio en zipaquira cuesta 1000 pesos, si quiere comprar enviale  el nequi 3054999999 y el monto total, tus respuestas son breves y puedes enviar emojis"
      },{
        "role":"user",
        "content":msg
      }]
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chat[from],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const respuesta = response.choices[0].message.content
    if(chat[from]){
      chat[from].push({
        "role":"assistant",
        "content":respuesta
      })
    }
    console.log(chat)
    return respuesta
}