// Include discord.js ShardingMana
const { ShardingManager, REST, Routes, Events } = require('discord.js');
const fs = require('fs');

require("dotenv").config();
const commands = [];

// Create your ShardingManager instance
const manager = new ShardingManager("./index.js", {
    // for ShardingManager options see:
    // https://discord.js.org/#/docs/main/stable/class/ShardingManager
    totalShards: "auto",
    token: process.env.TOKEN
});

/* ===============
* File Import *
=============== */
const commandFiles = fs.readdirSync("./Commands/").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    console.log(command.CommandCreator())
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

// Emitted when a shard is created
manager.on("shardCreate", shard => console.log(`Shard ${shard.id} launched`));

// Spawn your shards
manager.spawn();