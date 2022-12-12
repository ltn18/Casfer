const GeoRBush = require("./GeoRBush");
const Query = require("./Query")
const mysql = require("mysql")

const benchmark = () => {
    
}

const config = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'prj234'
}
const connection = mysql.createConnection(config);

const main = () => {
    var query = "minX=-140 maxX=-131 // minY=55 maxY=60 // start=5070204 end=19010301";
    var projection = "keyword=HUCEightDigitCode"
    var search = Query.searchPoint(projection);
    connection.connect(function(err) {
        if (err) throw err;
        connection.query(search, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
    });
}

main()