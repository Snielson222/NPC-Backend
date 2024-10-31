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
  