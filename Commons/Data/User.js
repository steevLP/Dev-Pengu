const mysql = require("mysql");
/**
 * creates a user and stores it in the databse
 * @param sql {Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a user on
 * @param user {string} the id of which user you want to store
 * @param username {string} the username of the user you want to store
 * @param nickname {string} if the nickname of the user if he got any
 * @param owner {boolean} whether or not the user is the server owner
 */
let CreateUser = async (sql, server, user, username, owner) => {
    sql.query({
        sql: 'INSERT INTO serverusers SET ?',
        timeout: 40000, // 40s
        values: {serverid: server, userid: user, username: username, owner: owner}
    }, function (error, results, fields) {
        // error will be an Error if one occurred during the query
        if (error != undefined | null) {
            throw `could not create user on server ${server} with userid ${user} due to error: ` + error
        }
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });
}

/**
 * gets a user from databse
 * @param sql {mysql.Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a user on
 * @param user {string} the id of which user you want to store
 * @returns the user object fetched from database
 */
let GetUser = async (sql, server, user) => {
    sql.query({
        sql: 'SELECT * FROM serverusers WHERE ?',
        timeout: 40000, // 40s
        values: {serverid: server, userid: user}
    }, function (error, results, fields) {
        // error will be an Error if one occurred during the query
        if (error != undefined | null) {
            throw `could not create user on server ${server} with userid ${user} due to error: ` + error
        }
        // results will contain the results of the query
        return new Promise((resolve, reject) => {
            if (results[0] != undefined) {
                resolve(results[0]);
            } else {
                reject("user not found");
            }
        })
        // fields will contain information about the returned results fields (if any)
    });
}

/**
 * updates a user and stores it in the databse
 * @param sql {mysql.Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a user on
 * @param user {string} the id of which user you want to store
 * @param username {string} the username of the user you want to store
 * @param nickname {string} if the nickname of the user if he got any
 * @param owner {boolean} whether or not the user is the server owner
 * @param xp {number} the xp the specified user has
 * @param level {number} the level the user has
 */
let UpdateUser = async (sql, server, user, username, nickname, owner, xp, level) => {
        throw "not implemented";
}

/**
 * gets a user from databse
 * @param sql {mysql.Connection} the mysql connection object
 * @param server {string} the id of which server you want ot create a user on
 * @param user {string} the id of which user you want to store
 */
let RemoveUser = async (sql, server, user) => {
        throw "not implemented";
}

module.exports = {CreateUser, GetUser, UpdateUser, RemoveUser}