require("dotenv").config()
const OpenAI = require("openai")
const chat = require("./messages")

const openai = new OpenAI({
    apiKey: process.env.API, 
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
          "content": "Eres vendedor de tacos, burritos y quesadillas en el negocio Casa Azteca Express te llamas Santiago, Siempre debes saludar cordialmente a " + name + " es tu cliente. tus respuestas son breves sin emojis"
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