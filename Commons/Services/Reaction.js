const {MessageReaction, PartialMessageReaction, User, RoleSelectMenuBuilder} = require("discord.js")
const {Connection} = require("mysql")
const Roles = require("./Roles");

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
    "1056657249528987769": {
        type: "reactionRole",
        reactions: {
            "👀":{
                Action: "role",
                Role: {
                    Name: "Gold Role",
                    ID: "1051891644007469096"
                },
                Restriction: "AddOnly",
                MessageType: "public",
            }
        }
    },
    "1056657695207329823": {
        type: "vote",
        reactions: {
            "✅":{
                Action: "vote-yes",
                Role: "null",
                Restriction: "null",
                MessageType: "public",
            },
            "🚫":{
                Action: "vote-no",
                Role: "null",
                Restriction: "null",
                MessageType: "public",
            }
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
const HandleReaction = async (reaction, user, database, Action, bot) => {
    // Handle if reaction is partial and therefor might throw api errors
    try{
        // global values
        let message = reaction.message
        console.log(Action);

        // Route Actions
        switch (Action) {
            case "add":
                // console.log(DevData[message.id].type)
                // console.log(DevData[message.id].reactions[reaction.emoji.name].Role)
                switch (DevData[message.id].type) {
                    case 'reactionRole':
                        userRoles = reaction.message.guild.members.cache.get(user.id)
                        // Detect if user already has that Role
                        if (!userRoles.roles.cache.has(DevData[message.id].reactions[reaction.emoji.name].Role.ID)) {
                            Roles.AddRole(userRoles, DevData[message.id].reactions[reaction.emoji.name].Role.Name, bot, "added via automation", message).then(() => {
                                message.channel.send(`@${user.username} got ${DevData[message.id].reactions[reaction.emoji.name].Role.Name} added`). then(async msg => {
                                    setTimeout(() => {                                       
                                        msg.delete();
                                    },5000)
                                }).catch(err => {
                                    console.log("could not send message due to error in reactions.HandleReaction: " + err)
                                });
                            }).catch(err => {
                                console.log("could not add role to client due to error in reactions.HandleReaction: " + err)
                            });
                        }
                        break;
                }
                break;
            case "remove":
                console.log("remove trigger")
                // Reverses all actions
                // at this point of development pointless to spend development time on
                switch (DevData[message.id].type) {
                    case 'reactionRole':
                        console.log("reaction role trigger")
                        userRoles = reaction.message.guild.members.cache.get(user.id)

                        console.log(userRoles.roles.cache.has(DevData[message.id].reactions[reaction.emoji.name].Role.ID))

                        // Detect if user already has that Role
                        if (userRoles.roles.cache.has(DevData[message.id].reactions[reaction.emoji.name].Role.ID)) {
                            console.log("call removerole function")
                            Roles.RemoveRole(userRoles, DevData[message.id].reactions[reaction.emoji.name].Role.Name, bot, "removed via automation", message);
                        
                            message.channel.send(`@${user.username} got ${DevData[message.id].reactions[reaction.emoji.name].Role.Name} removed`). then(async msg => {
                                setTimeout(() => {                                       
                                    msg.delete();
                                },5000)
                            }).catch(err => {
                                console.log("could not send message due to error in reactions.HandleReaction: " + err)
                            });
                        }
                        break;
                }
                break;
        }
    }catch (e) {
        console.log(e)
        return
    }
}

module.exports = {HandleReaction}