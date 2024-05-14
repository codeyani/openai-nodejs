const fs = require("fs");
const path =  require("path");
const OpenAI = require("openai");
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const speechFile = path.resolve("./speech.mp3");

const generateText = async (req, res) => {
  const { prompt, model } = req.body;
  try {
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        model: model,
      });
    return res.json({ result: completion.choices[0] });
  } catch (error) {
    console.log(error)
  }
};

const generateImage = async (req, res) => {
  const { prompt, model } = req.body;
  try {
    const response = await openai.images.generate({
        model: model,
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });

    return res.json({ result: response.data[0].url });
  } catch (error) {
    console.log(error)
  }
};

const vision = async (req, res) => {
  const { prompt, model } = req.body;
  const image = req.file;
  // Convert the image file to base64
  const imageBase64 = image.buffer.toString('base64');

  // Construct the image data URL
  const imageDataURL = `data:${image.mimetype};base64,${imageBase64}`;
  
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                "url": imageDataURL,
              },
            },
          ],
        },
      ],
    });

    return res.json({ result: response.choices[0] });
  } catch (error) {
    console.log(error)
  }
};

const textToSpeech = async (req, res) => {
  const { model, voice, input } = req.body;

  try {
    const mp3 = await openai.audio.speech.create({
      model: model,
      voice: voice,
      input: input
    });
    console.log(speechFile);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    return res.json({ result: "success" });
  } catch (error) {
    console.log(error)
  }
}

const speechToText = async (req, res) => {
  const { model } = req.body;


  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("./speech.mp3"),
      model: model,
    });
  
    // Return the transcription result
    res.json({ transcription });
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  generateText,
  generateImage,
  vision, 
  textToSpeech,
  speechToText
};