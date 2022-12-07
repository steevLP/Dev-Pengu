const {MessageReaction, PartialMessageReaction, User} = require("discord.js")
const {Connection} = require("mysql")

/**
    reaction programming syntax
    -----------------------------------------------------------------------------------------------------
    MessageID:
        ReactionEmoji:
            Role = a role mention
            Restriction:
                None: this action has no restrictions
                AddOnly: nonremovable action
                AddOnce: can only be added oncuechange
                Temporary: will only be added for a given time
                StaffOnly: can only be added to staff [not final]
                PremiumOnly: can only be added to as premium specified users [not final]
            Duration: the time duration an action stays active if Restriction Temporary is
    -----------------------------------------------------------------------------------------------------
    gets moved to a more permanent documentation once syntax is final
*/

// Development dummy data
const DevData = {
    "1049942781579247627": {
        "👀":{
            Role: "test",
            Restriction: "AddOnly"
        }
    }
}

/**
 * handles reactions in both ways
 * @param {MessageReaction | PartialMessageReaction} reaction the message reaction
 * @param {User} user
 * @param {Connection} Database current databes instance
 * @param {string} Action string of current action happening
 */
const HandleReaction = async (reaction, user, database, Action) => {
    // Handle if reaction is partial and therefor might throw api errors
    if (reaction.partial){
        try{
            // global values
            let message = reaction.message

            // Route Actions
            switch (Action) {
                case "add":
                    console.log(DevData[message.id][reaction._emoji.name])
                    break;
                case "remove":
                    break;
            }
        }catch (e) {
            console.log(e)
            return
        }
    } else {
        console.error("error while checking if reaction was partial")
    }
}

module.exports = {HandleReaction}