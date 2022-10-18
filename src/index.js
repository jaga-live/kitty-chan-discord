const { Client, GatewayIntentBits } = require("discord.js");
const { validateBotMention, validateGreeting, language_filter } = require("./utils");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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
  const validateMessage = validateBotMention(message.content);
  if (!validateMessage) return;

  //Greet
  const greet = validateGreeting(validateMessage);
  if (greet) {
    message.channel.send(`Hello ${message.author}`);
  }
});

client.login(process.env.KITTY_CHAN_TOKEN);
