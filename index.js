require("dotenv").config();
const { Client, GatewayIntentBits, Collection, REST, Routes, Events, Partials } = require('discord.js');
const fs = require('fs');
const sql = require('mysql');

const bot = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

bot.commands = new Collection();
const commands = [];

const { HandleReaction } = require("./Commons/Services/Reaction");

// const Database = require("./Commons/Data/Database");
// const server = Database(process.env)

/* ===============
   * File Import *
   =============== */
const commandFiles = fs.readdirSync("./Commands/").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    console.log(command.CommandCreator())
    bot.commands.set(command.name, command);
    commands.push(command.CommandCreator());
}

console.log(commands)
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);  
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.APPID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

bot.on(Events.InteractionCreate, async interaction => {
    // TODO: Adde Rolebased Permission Tracking rather then relying on discord permission system
    if (!interaction.isChatInputCommand()) return;
    let commandfile = bot.commands.get(interaction.commandName);
    if (commandfile) commandfile.run(bot, interaction);
})

// Handles Reactions
bot.on(Events.MessageReactionAdd, async (reaction, user) => {
    console.log("reaction")
    console.log(reaction)
    console.log(reaction._emoji.name, reaction.message.id)
    HandleReaction(reaction, user, undefined, "add")
})

bot.on(Events.MessageReactionRemove, async (reaction, user) => {
    HandleReaction(reaction, user, Database, "remove")
})
bot.login(process.env.TOKEN)

