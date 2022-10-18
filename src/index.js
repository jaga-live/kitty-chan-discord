const { Client, GatewayIntentBits } = require("discord.js");
const { validateBotMention, validateGreeting, language_filter, hinglish_filter } = require("./utils");
const express = require('express')
const app = express()
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});
const PREFIX = "$";

client.on("ready", () => {
  console.log(client.user.username, "connected");
});


/////READ Messages & Respond
client.on("messageCreate", (message) => {
  //Validate
  if (message.author.bot) return;

  //Filter Strong Language
  const filterStrongLanguage = language_filter(message.content)
  if (filterStrongLanguage) {
    message.channel.send(`Hey ${message.author}, this text seems to contain inappropriate language. Please avoid this!`);
  }
  
  //Filter Hindi
  const filterHinglish = hinglish_filter(message.content);
  if (filterHinglish) {
    message.channel.send(
      `Hey ${message.author}, Hindi detected. Please chat in English!`
      );
      message.delete()
    }
    
    //Check Bot Message
    const isBotMessage = validateBotMention(message.content);
    if (!isBotMessage) return;
    

  //Greet
  const greet = validateGreeting(validateMessage);
  if (greet) {
    message.channel.send(`Hello ${message.author}`);
  }
});

client.login(process.env.KITTY_CHAN_TOKEN);
app.listen(process.env.PORT || 5000, () => {
  console.log('App Started')
})