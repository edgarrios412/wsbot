// const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
// const ffmpeg = require("fluent-ffmpeg");
// ffmpeg.setFfmpegPath(ffmpegPath);

var ffmpeg = require('fluent-ffmpeg');

//make sure you set the correct path to your video file

// var proc = new ffmpeg({ source: 'C:/Users/Jay/Documents/movie/drop.avi', nolog: true });
//Set the path to where FFmpeg is installed
// proc.setFfmpegPath("C:\\Users\\Jay\\Documents\\FFMPEG\\bin");

// console.log(ffmpegPath);
/**
 *
 * @param {*} inputStream
 * @param {*} outStream
 * @returns
 */
const convertOggMp3 = async (inputStream, outStream) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputStream)
      .setFfmpegPath(`${process.cwd()}/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe`)
      .audioQuality(96)
      .toFormat("mp3")
      .save(outStream)
      .on("progress", (p) => null)
      .on("end", () => {
        resolve(true);
      })
      .on('error', (err) => {
        console.error('Error durante la conversión:', err);
        reject(err); // Puedes rechazar la promesa y manejar el error según tus necesidades.
      });
  });
};

module.exports = { convertOggMp3 };