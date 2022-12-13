const GeoRBush = require("./GeoRBush");
const Query = require("./Query")
const mysql = require("mysql")

const config = {
    host: 'localhost',
    user: 'csds234',
    port: 3306,
    password: 'PassWord@234',
    database: 'csds234'
}
const connection = mysql.createConnection(config);

const main = () => {
    var query = "minX=-140 maxX=-100 // minY=30 maxY=50 // start=5070204 end=19010301";
    var projection = "keyword=HUCEightDigitCode"
    var search = Query.searchPoint(query);

    connection.connect(function(err) {
        if (err) throw err;

        // connection.query("SELECT * FROM casfer", (err, res) => {
        //     console.log(res)
        // });

        var before = Date.now();
        connection.query(search, function (err, result, fields) {
          if (err) throw err;
          var res = JSON.stringify(result);
          console.log(res);
        });
        var after = Date.now();
        // console.log(`Linear scan search with BBox and Time Range takes ${after - before} seconds`)
    });
}

main()