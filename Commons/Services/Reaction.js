const {MessageReaction, PartialMessageReaction, User} = require("discord.js")
const {Connection} = require("mysql")

/**
 * handles reactions in both ways
 * @param {MessageReaction | PartialMessageReaction} reaction the message reaction
 * @param {User} user
 * @param {Connection} Database current databes instance
 * @param {string} Action string of current action happening
 */
const HandleReaction = async (reaction, user, database, Action) => {
    // Handle if reaction is partial and therefor might throw api errors
    if (reaction.partial()){
        try{
            // global values
            let react = await reaction.fetch()

            // Route Actions
            switch (Action) {
                case "add":
                    break;
                case "remove":
                    break;
            }
        }catch (e) {
            console.log(e)
            return
        }
    }
}

module.exports = {HandleReaction}