'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'haki.cxd7ybnaxl1r.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'root',
    password: 'makaremat357',
    database: 'haki'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
