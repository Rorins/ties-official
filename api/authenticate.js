const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();
const userToken = process.env.USER_TOKEN;
let notPremium = true;

async function authenticateCharacterAI() {
    try {
        if (notPremium) {
          await characterAI.authenticateAsGuest();
          console.log("Character AI authenticated as guest.");
        } else {
          await characterAI.authenticateWithToken(userToken);
          console.log("Character AI authenticated with token.");
        }
      } catch (error) {
        console.error("Error authenticating Character AI:", error);
        process.exit(1); // Exit the server if authentication fails
      }
}

module.exports = async (req, res) => {
  try {
    await authenticateCharacterAI();
    res.status(200).send("Authentication successful.");
  } catch (error) {
    console.error("Error authenticating:", error);
    res.status(500).send("Authentication failed.");
  }
};
