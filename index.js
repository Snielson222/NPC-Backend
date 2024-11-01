// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const { races, classes, getRandomElement } = require('./npcData');

const app = express(); // Initialize Express app
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Generate NPC endpoint
app.post('/api/generate-npc', async (req, res) => {
  try {
    // Generate random race and class
    const npcRace = getRandomElement(races);
    const npcClass = getRandomElement(classes);

    // Prepare messages for OpenAI's chat API
    const messages = [
      {
        role: "system",
        content: "You are a creative character generator for Dungeons & Dragons.",
      },
      {
        role: "user",
        content: `Generate a unique name and brief backstory for a ${npcRace} ${npcClass}.`,
      },
    ];

    // Send to OpenAI for name and backstory using the chat completion endpoint
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo", // or "gpt-4" if available in your project
        messages: messages,
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
      name: response.data.choices[0].message.content.split('\n')[0].trim(),
      backstory: response.data.choices[0].message.content.trim(),
    };

    res.json(npcData);
  } catch (error) {
    console.error("Error generating NPC:", error.response ? error.response.data : error.message);
    res.status(500).send("Error generating NPC");
  }
});

// Chat with NPC endpoint
app.post('/api/chat', async (req, res) => {
    try {
      const { npcDetails, userMessage } = req.body;
      const messages = [
        {
          role: "system",
          content: `You are a ${npcDetails.race} ${npcDetails.class} with the backstory: "${npcDetails.backstory}". Answer as if you are this character.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ];
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      res.json({ npcResponse: response.data.choices[0].message.content.trim() });
    } catch (error) {
      console.error("Error with NPC chat:", error.response ? error.response.data : error.message);
      res.status(500).send("Error with NPC chat");
    }
  });
  
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
