// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { races, classes, getRandomElement } = require('./npcData');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Generate NPC endpoint
app.post('/api/generate-npc', async (req, res) => {
  try {
    // Generate random race and class
    const npcRace = getRandomElement(races);
    const npcClass = getRandomElement(classes);

    // Prepare prompt for OpenAI to get name and backstory
    const prompt = `Generate a unique name and brief backstory for a ${npcRace} ${npcClass}.`;

    // Send to OpenAI for name and backstory
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const npcData = {
      race: npcRace,
      class: npcClass,
      name: response.data.choices[0].text.split('\n')[0].trim(),
      backstory: response.data.choices[0].text.trim(),
    };

    res.json(npcData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating NPC");
  }
});

// Chat with NPC endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { npcDetails, userMessage } = req.body;

    // Prompt for OpenAI to respond in the style of the NPC
    const prompt = `As a ${npcDetails.race} ${npcDetails.class} with the backstory: "${npcDetails.backstory}", respond to the following message: "${userMessage}"`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ npcResponse: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error with NPC chat");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
