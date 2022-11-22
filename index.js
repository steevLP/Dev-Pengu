require("dotenv").config();
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const sql = require('mysql');

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
bot.commands = new Collection();
const commands = [];

const server = sql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

server.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        process.exit(1)
    }
});

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
        await rest.put(Routes.applicationCommands("1037320315186974771"), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

bot.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
    let commandfile = bot.commands.get(interaction.commandName);
    if (commandfile) commandfile.run(bot, interaction);
})

bot.login(process.env.TOKEN)