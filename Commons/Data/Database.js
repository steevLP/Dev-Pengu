const sql = require('mysql');

const Database = async (db) => {

    const server = sql.createConnection({
        host     : db.HOST,
        user     : db.USERNAME,
        password : db.PASSWORD
        ,
        database : db.DATABASE
    });
    
    server.connect(function(err) {
        if (err) {
            console.error('error connecting Database in Data.Database: ' + err.stack);
            process.exit(1)
        }
    });

    return server
}

module.exports = Database