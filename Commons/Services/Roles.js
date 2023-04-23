const discord = require("discord.js")
/**
    assigns a given role to a given user
    @param {discord.GuildMember} userVal the target user
    @param {string} roleName name of role to assign a user
    @param {discord.Client} bot the bots instance
    @param {discord.Message} message the bots instance
*/
const AddRole = async (userVal, roleName, bot, reason, message) => {
    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleName == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "object") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleName) != "string") { throw "error roleNames is not of type string" }
    if (typeof(bot) != "object") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const role = bot.guilds.cache.find(guild => guild.id === message.guild.id).roles.cache.find(role => role.name === roleName)

    if (role == undefined) {
        throw `error couldnt find role ${role}`
    }
    
   userVal.roles.add(role, reason).catch(error => {
        console.log("an error occured in roles.AddRole: " + err)
    })
}

/**
    assigns a given roles to a given user
    @param {discord.GuildMember} userVal the target user
    @param {string} roleName name of role to assign a user
    @param {discord.Client} bot the bots instance
*/
const AddRoles = async (userVal, roles, bot, reason) => {

    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleName == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "object") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleName) != "string") { throw "error roleNames is not of type string" }
    if (typeof(bot) != "object") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const guild = bot.guilds.cache.first()

    roles.forEach(r => {
        const role = bot.guilds.cache.find(guild => guild.id === message.guild.id).roles.cache.find(role => role.name === roleName)

        if (role == undefined) {
            throw `error couldnt find role ${role}`
        }

        userVal.roles.add(role, r.reason).catch(err => {console.log("error in roles.Addrole" + err)})
    })
}

/**
revokes a given role to a given user
@param {discord.GuildMember} userVal the target user
@param {string} roleName name of role to assign a user
@param {discord.Client} bot the bots instance
*/
const RemoveRole = async (userVal, roleName, bot, reason, message) => {

    console.log("RemoveRole Function Call")

    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleName == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "object") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleName) != "string") { throw "error roleNames is not of type string" }
    if (typeof(bot) != "object") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const role = bot.guilds.cache.find(guild => guild.id === message.guild.id).roles.cache.find(role => role.name === roleName)

    if (role == undefined) {
        throw `error couldnt find role ${role}`
    }
   userVal.roles.remove(role, reason).catch(error => {
        console.log("an error occured in roles.AddRole: " + err)
    })
}

/**
revokes a given roles to a given user
@param {discord.GuildMember} userVal the target user
@param {string} roleName name of role to assign a user
@param {discord.Client} bot the bots instance
*/
const RemoveRoles = async (userVal, roles, bot) => {

    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleName == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "object") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleName) != "string") { throw "error roleNames is not of type string" }
    if (typeof(bot) != "object") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const guild = bot.guilds.cache.first()

    roles.forEach(r => {
        const role = bot.guilds.cache.find(guild => guild.id === message.guild.id).roles.cache.find(role => role.name === r.name)

        if (role == undefined) {
            throw `error couldnt find role ${role}`
        }
        
        userVal.roles.remove(role, reason).catch(error => {
            console.log("an error occured in roles.AddRole: " + err)
        })
    })
}

module.exports = {AddRole, AddRoles, RemoveRole, RemoveRoles}