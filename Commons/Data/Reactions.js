const mysql = require("mysql");
/**
 * creates a Reaction and stores it in the databse
 * @param sql {Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a Reaction on
 * @param Reaction {string} the id of which Reaction you want to store
 * @param Reactionname {string} the Reactionname of the Reaction you want to store
 * @param nickname {string} if the nickname of the Reaction if he got any
 * @param owner {boolean} whether or not the Reaction is the server owner
 */
let CreateReaction = async (sql, server, Reaction, Reactionname, owner) => {
    throw "not implemented";
}

/**
 * gets a Reaction from databse
 * @param sql {mysql.Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a Reaction on
 * @param Reaction {string} the id of which Reaction you want to store
 */
let GetReaction = async (sql, server, Reaction) => {
    throw "not implemented";
}

/**
 * updates a Reaction and stores it in the databse
 * @param sql {mysql.Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a Reaction on
 * @param Reaction {string} the id of which Reaction you want to store
 * @param Reactionname {string} the Reactionname of the Reaction you want to store
 * @param nickname {string} if the nickname of the Reaction if he got any
 * @param owner {boolean} whether or not the Reaction is the server owner
 * @param xp {number} the xp the specified Reaction has
 * @param level {number} the level the Reaction has
 */
let UpdateReaction = async (sql, server, Reaction, Reactionname, nickname, owner, xp, level) => {
    throw "not implemented";
}

/**
 * gets a Reaction from databse
 * @param sql {mysql.Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a Reaction on
 * @param Reaction {string} the id of which Reaction you want to store
 */
let RemoveReaction = async (sql, server, Reaction) => {
    throw "not implemented";
}

module.exports = {CreateReaction, GetReaction, UpdateReaction, RemoveReaction}