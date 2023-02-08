require('dotenv').config();
const { response } = require('express');
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration)

const generatePrompt = (input) => {
  return `${input} \nthe time complexity of this function is`
}

app.post("/find-complexity", async (req, res) => {
  try {
    const input = generatePrompt(req.body.prompt)
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    })

    return res.status(200).json({
      prompt: input,
      success: true,
      data: response.data
    })

  } catch (error) {}
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server listening on port ${port}`))

const example = (arr) => arr.map((item) => { arr.map((item2) => console.log(item2))})