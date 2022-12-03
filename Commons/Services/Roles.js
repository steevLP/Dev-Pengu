const discord = require("discord.js")
/**
    assigns a given role to a given user
    @param {discord.User} userVal the target user
    @param {string} roleName name of role to assign a user
    @param {discord.Client} bot the bots instance
*/
const AddRole = async (userVal, roleName, bot) => {
    const guild = bot.guilds.cache.first()
    const role = guild.roles.find("name", roleName)

   
}