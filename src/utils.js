const { greetings } = require("./data/greetings");
const { bad_words } = require("./data/bad_words");
const { hinglish_words } = require("./data/hinglish");
require("dotenv").config();
const KITTY_CHAN_ID = process.env.KITTY_CHAN_ID;

////Check if kitty chan i mentioned
const validateBotMention = (message) => {
  message = message.toString();

  ///Validate
  const args = message.substring(2, 21);
  if (!args || args !== KITTY_CHAN_ID) return false;

  return {
    message: message.substring(22).trim(),
  };
};

////Greeting
const validateGreeting = (payload) => {
  let { message } = payload;
  message = message.toLowerCase().trim();
  if (greetings.includes(message)) return true;
};

///Strong Language Filter
const language_filter = (message) => {
  message = message.toLowerCase().trim();
  message = message.split(" ");
  let isStrongLanguage = false;

  message.map((e) => {
    if (bad_words.includes(e)) isStrongLanguage = true;
  });

  return isStrongLanguage;
};

///Detect Hindi
const hinglish_filter = (message) => {
      message = message.toLowerCase().trim();
      message = message.split(" ");
      let isHinglish = false;
    
      message.map((e) => {
        if (hinglish_words.includes(e)) isHinglish = true;
      });

      return isHinglish;
}

module.exports = {
  validateBotMention,
  validateGreeting,
    language_filter,
  hinglish_filter
};
