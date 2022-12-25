const sql = require('mysql');

const Database = async (db) => {

    const server = sql.createConnection({
        host     : db.DB_HOST,
        user     : db.DB_USERNAME,
        password : db.DB_PASSWORD
        ,
        database : db.DB_NAME
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