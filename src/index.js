const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const {
  validateBotMention,
  validateGreeting,
  language_filter,
  hinglish_filter,
} = require("./utils");
const express = require("express");
const app = express();
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
const PREFIX = "$";

client.on("ready", () => {
  client.user.setActivity("with Jaga");
  console.log(client.user.username, "connected");
});

/////READ Messages & Respond
client.on("messageCreate", (message) => {
  //Validate
  if (message.author.bot) return;

  //Filter Strong Language
  const filterStrongLanguage = language_filter(message.content);
  if (filterStrongLanguage) {
    message.reply(
      `Hey ${message.author}, this text seems to contain inappropriate language. Please avoid this!`
    );
    message.react("⚠");
  }

  //Filter Hindi
  const filterHinglish = hinglish_filter(message.content);
  if (filterHinglish) {
    message.reply(
      `Hey ${message.author}, Hindi detected. Please chat in English!`
    );
    message.react("⚠");
  }

  //Check Bot Message
  const isBotMessage = validateBotMention(message.content);
  if (!isBotMessage) return;

  //Greet
  const greet = validateGreeting(isBotMessage);
  if (greet) {
    message.channel.send(`Hello ${message.author}`);
  }
});

client.login(process.env.KITTY_CHAN_TOKEN);
app.listen(process.env.PORT || 5000, () => {
  console.log("App Started");
});
