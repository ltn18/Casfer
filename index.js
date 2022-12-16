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
    var query = "minX=-140 maxX=-100 // minY=30 maxY=50 // start=19590601 end=19740901";
    var projection = "keyword=HUCEightDigitCode";
    var search = Query.searchPoint(query);

    connection.connect(function(err) {
        if (err) throw err;

        // 939681
        connection.query("SELECT * FROM casfer", (err, res) => {
            // var result = JSON.stringify(res);
            console.log(res.length);
        });

        console.log(search)

        connection.query(search, function (err, result, fields) {
            if (err) throw err;
            //   var res = JSON.stringify(result);
            //   console.log(res);
            console.log(result.length)
        });
    });
}

main()