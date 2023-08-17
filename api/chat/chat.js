const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();

module.exports = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const characterId = "WMuN5SZWllqYbM0SINMbIptC1zPrVzLYoc2Tn4x30OA"

    const chat = await characterAI.createOrContinueChat(characterId);
    const message = req.body.message;
    const response = await chat.sendAndAwaitResponse(message, true);
    console.log(message)
    res.json({ text: response.text });
  } catch (error) {
    console.error("Error sending message to Character AI:", error);
    res.status(500).json({ error: "Failed to send message to Character AI" });
  }
};
