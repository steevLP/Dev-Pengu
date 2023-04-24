require("dotenv").config();
const {REST} = require("@discordjs/rest");
const {WebSocketManager} = require("@discordjs/ws");
const { Client, GatewayIntentBits, GatewayDispatchEvents, InteractionType } = require('@discordjs/core');
const fs = require('fs');
const sql = require('mysql');
const {CreateUser} = require('./Commons/Data/User')

let token = process.env.TOKEN;

const rest = new REST({ version: '10' }).setToken(token);
const ws = new WebSocketManager({
	token,
    intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
    rest,
});

const bot = new Client({ws, rest});

bot.commands = new Map();

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

bot.on(GatewayDispatchEvents.GuildMemberAdd, async user => {
    console.log(`new user found`, user.guild.id.toString(), user.user.id.toString(), user.user.username, false)
    await CreateUser(server, user.guild.id.toString(), user.user.id.toString(), user.user.username, false);
});

bot.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
    console.log(interaction.data.message);

    // TODO: Add Rolebased Permission Tracking rather then relying on discord permission system
    if (InteractionType.ApplicationCommand){
        let commandfile = bot.commands.get(interaction.data.name);
        if (commandfile) commandfile.run(bot, interaction, api);
    } else {
        // TODO: Handle Chat input
        console.log("command gets triggered here");
    }
});

// Handles Reactions
bot.on(GatewayDispatchEvents.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return;
    HandleReaction(reaction, user, undefined, "add", bot)
});

bot.on(GatewayDispatchEvents.MessageReactionRemove, async (reaction, user) => {
    if (user.bot) return;
    HandleReaction(reaction, user, server, "remove", bot)
});

ws.connect();

