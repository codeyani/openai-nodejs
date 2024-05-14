const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// Configure the app to use bodyParser() for JSON and form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

const AiController = require('../controllers/AiController');

// Define routes
app.post('/generate-text', upload.array(), AiController.generateText);
app.post('/generate-image', upload.array(), AiController.generateImage);

// Define a route for vision with file upload
app.post('/vision', upload.single('image'), AiController.vision);

app.post('/text-to-speech', upload.array(), AiController.textToSpeech);
app.post('/speech-to-text', upload.single('audio'), AiController.speechToText);

module.exports = app;