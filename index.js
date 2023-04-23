require("dotenv").config();
const { Client, GatewayIntentBits, Collection, REST, Routes, Events, Partials } = require('discord.js');
const fs = require('fs');
const sql = require('mysql');
const {CreateUser} = require('./Commons/Data/User')

const bot = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

bot.commands = new Collection();

const server = sql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

server.connect(function(err) {
    if (err) {
        console.error('error connecting Database in Data.Database: ' + err.stack);
        process.exit(1)
    }
});

/* ===============
* File Import *
=============== */
const commandFiles = fs.readdirSync("./Commands/").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on(Events.GuildMemberAdd, async user => {
    console.log(`new user found`, user.guild.id.toString(), user.user.id.toString(), user.user.username, false)
    await CreateUser(server, user.guild.id.toString(), user.user.id.toString(), user.user.username, false);
})

bot.on(Events.InteractionCreate, async interaction => {
    // TODO: Adde Rolebased Permission Tracking rather then relying on discord permission system
    if (!interaction.isChatInputCommand()) return;
    let commandfile = bot.commands.get(interaction.commandName);
    if (commandfile) commandfile.run(bot, interaction);
})

// Handles Reactions
bot.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return;
    HandleReaction(reaction, user, undefined, "add", bot)
})

bot.on(Events.MessageReactionRemove, async (reaction, user) => {
    if (user.bot) return;
    HandleReaction(reaction, user, server, "remove", bot)
})
bot.login(process.env.TOKEN)

