

var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', user: 'root',  
                                          password: 'home', database: 'ember_blog'});

exports.all = function(req, res){
    if (connection) {
        connection.query('select * from entry order by id', function(err, rows, fields) {
            if (err) throw err;
            objresponse = new Object();
            objresponse.posts = rows;
            res.contentType('application/json');
            res.write(JSON.stringify(objresponse));
            res.end();
        });
    }
};

exports.one = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'select * from entry where id = ?';
        connection.query(queryString, [id], function(err, rows, fields) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(rows));
            res.end();
        });
    }
};

exports.create = function(req, res){
    var params = req.body;
    if (connection) {
        var queryString = 'insert into entry values(0,?,?,?,?,?)';
        connection.query(queryString, [params.title,
                                       params.author,
                                       params.intro,
                                       params.published_date,
                                       params.extended], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.update = function(req, res){
    var params = req.body;
    var id = req.params.id;
    if (connection) {
        var queryString = 'update entry set title=?,intro=?,extended=? where id = ?';
        connection.query(queryString, [params.post.title,
                                       params.post.intro,
                                       params.post.extended,
                                       id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};

exports.delete = function(req, res){
    var id = req.params.id;
    if (connection) {
        var queryString = 'delete from entry where id = ?';
        connection.query(queryString, [id], function(err, result) {
            if (err) throw err;
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.end();
        });
    }
};