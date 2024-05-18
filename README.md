# OpenAI API Integration and Usage

This project demonstrates how to integrate and use the OpenAI API with a Node.js application.

## Prerequisites

- Must have an `OPENAI_API_KEY` from [OpenAI](https://platform.openai.com/)
- Node.js v18+
- Create a `.env` file in the root directory of your project and set your API key:

    ```plaintext
    OPENAI_API_KEY=<ADD_YOUR_API_KEY>
    ```

- Download [Postman](https://www.postman.com/downloads/) for API testing.
- Import the JSON file `OpenAI - NodeJS.postman_collection.json` located at the root directory of this project into Postman.

## Getting Started

1. Install the necessary dependencies:

    ```bash
    npm install
    ```

2. Start the application:

    ```bash
    npm start
    ```

3. Open [http://localhost:3500](http://localhost:3500) in your browser to see the result.

## Testing with Postman

1. [Download Postman](https://www.postman.com/downloads/).
2. Open Postman and import the JSON file `OpenAI - NodeJS.postman_collection.json` located at the root directory of this project.
3. Use the imported collection to test the endpoints.

### API Endpoints

- **Generate Text:** `POST /openai/generate-text`
- **Generate Image:** `POST /openai/generate-image`
- **Vision:** `POST /openai/vision`
- **Text to Speech:** `POST /openai/text-to-speech`
- **Speech to Text:** `POST /openai/speech-to-text`
- **Index:** `GET /`