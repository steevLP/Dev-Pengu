const discord = require("discord.js")
/**
    assigns a given role to a given user
    @param {discord.GuildMember} userVal the target user
    @param {string} roleName name of role to assign a user
    @param {discord.Client} bot the bots instance
*/
const AddRole = async (userVal, roleName, bot) => {

    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleName == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "Discord.GuildMember") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleName) != "string") { throw "error roleNames is not of type string" }
    if (typeof(bot) != "Discord.Client") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const guild = bot.guilds.cache.first()
    const role = guild.roles.find("name", roleName)

    if (role == undefined) {
        throw `error couldnt find role ${role}`
    }
    userVal.roles.add(role, reason)
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
    if (roleNames == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "Discord.GuildMember") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleNames) != "object") { throw "error roleNames is not of type object" }
    if (typeof(bot) != "Discord.Client") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const guild = bot.guilds.cache.first()

    roles.forEach(r => {
        const role = guild.roles.find("name", r.name)
        if (role == undefined) {
            throw `error couldnt find role ${role}`
        }
        userVal.roles.add(role, r.reason)
    })
}

/**
revokes a given role to a given user
@param {discord.GuildMember} userVal the target user
@param {string} roleName name of role to assign a user
@param {discord.Client} bot the bots instance
*/
const RemoveRole = async (userVal, roleName, bot, reason) => {

    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleName == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "Discord.GuildMember") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleName) != "string") { throw "error roleNames is not of type string" }
    if (typeof(bot) != "Discord.Client") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const guild = bot.guilds.cache.first()
    const role = guild.roles.find("name", roleName)

    if (role == undefined) {
        throw `error couldnt find role ${role}`
    }
    userVal.roles.remove(role, reason)
}

/**
revokes a given roles to a given user
@param {discord.GuildMember} userVal the target user
@param {string} roleName name of role to assign a user
@param {discord.Client} bot the bots instance
*/
const RemoveRoles = async (userVal, roles, bot) => {

    [
        {
            name: "role",
            reason: "given as a test"
        },
        {
            name: "role",
            reason: undefined
        },
     ]

    // error handling
    if (userVal == undefined) { throw "error user was undefined" }
    if (roleNames == undefined) { throw "error roleNames was undefined" }
    if (bot == undefined) { throw "error bot was undefined" }
    if (typeof(userVal) != "Discord.GuildMember") { throw "error userVal is not of type Discord.GuildMember" }
    if (typeof(roleNames) != "object") { throw "error roleNames is not of type object" }
    if (typeof(bot) != "Discord.Client") { throw "error roleNames is not of type Discord.Client" }

    // fetching required data
    const guild = bot.guilds.cache.first()

    roles.forEach(r => {
        const role = guild.roles.find("name", r.name)
        if (role == undefined) {
            throw `error couldnt find role ${role}`
        }
        userVal.roles.remove(role, r.reason)
    })
}