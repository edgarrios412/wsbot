const { downloadMediaMessage } = require('@adiwajshing/baileys');
const fs = require('node:fs/promises');
const { convertOggMp3 } = require('../services/convert');
const { voiceToText } = require('../services/whisper');

const handlerAI = async (media) => {
  /**
   * OMITIR
   */
  const buffer = media.data
  console.log(buffer)
  const pathTmpOgg = `${process.cwd()}/tmp/voice-note-${Date.now()}.ogg`;
  const pathTmpMp3 = `${process.cwd()}/tmp/voice-note-${Date.now()}.mp3`;
  await fs.writeFile(pathTmpOgg, buffer, "base64");
  await convertOggMp3(pathTmpOgg, pathTmpMp3);
  const text = await voiceToText(pathTmpOgg);
  return text; //el habla1!!
  /**
   * OMITIR
   */
};

module.exports = { handlerAI };