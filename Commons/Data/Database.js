const sql = require('mysql');

var Database = async (db) => {
    var server = sql.createConnection({
        host     : db.HOST,
        user     : db.USER,
        password : db.PASSWORD,
        database : db.DATABASE
    });
    
    server.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            process.exit(1)
        }
    });

    return server
}

module.exports = Database