const fs = require('fs');
const { REST, Routes } = require('discord.js');

/**
 * handles reactions in both ways
 * @param {string} Path path to Commands folder
 */
const Register = async (path) => {

    if (typeof(path) != "string") {
        console.error("ERROR in commands.Register Commands path was not of type string")
        process.exit(1)
    }

    if (path == "") {
        console.error("ERROR in commands.Register Commands path was not of type string")
        process.exit(1)
    }

    const commands = [];

    /* ===============
    * File Import *
    =============== */
    const commandFiles = fs.readdirSync(path).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        console.log(`loading: ${path}${file}`)
        const command = require(`.${path}${file}`);
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
    console.log("commands registered")
}

module.exports = {Register}