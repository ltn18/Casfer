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
    var query = "minX=-160 maxX=-150 // minY=59 maxY=61";
    var projection = "keyword=HUCEightDigitCode";
    var search = Query.searchPoint(query);

    connection.connect(function (err) {
        if (err) throw err;

        // 939681
        // connection.query("SELECT * FROM casfer", (err, res) => {
        //     // var result = JSON.stringify(res);
        //     console.log(res.length);
        // });

        console.log(search)

        console.time('search mysql bbox')
        
        connection.query(`
            SELECT * FROM casfer
                WHERE casfer.minX >= -160 AND casfer.maxX <= -150
                    AND casfer.minY >= 59 AND casfer.maxY <= 61;`, 

            function (err, result, fields) {
                if (err) throw err;
                var res = JSON.stringify(result);
                console.log(res);
                // console.log(result.length)
            }
        );

        
        console.timeEnd('search mysql bbox')
    });
}

main()
