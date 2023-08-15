const CharacterAI = require('node_characterai');
const characterAI = new CharacterAI();
const userToken = process.env.USER_TOKEN;
let notPremium = true;

module.exports = async (req, res) => {
  try {
    notPremium = req.body.notPremium;
    console.log("Upgraded authentication to Premium for the user.");
    if (!notPremium) {
        characterAI.unauthenticate();
        await characterAI.authenticateWithToken(userToken);
        console.log("Character AI authenticated with token.");
    }

    res.status(200).send("Authentication upgraded to Premium successfully.");
  } catch (error) {
    console.error("Error upgrading authentication:", error);
    res.status(500).send("Error upgrading authentication.");
  }
};
