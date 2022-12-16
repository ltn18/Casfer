const mysql = require("mysql")
const Query = require("./Query")

class DB {
    static #config = {
        host: 'localhost',
        user: 'csds234',
        port: 3306,
        password: 'PassWord@234',
        database: 'csds234'
    }
    
    static connect = (records) => {
        const connection = mysql.createConnection(this.#config)

        connection.connect((err) => {
            if (err) throw err;
            console.log("Connected to MYSQL Server!");
        
            const point = {
                ConstructionDateText: '19810828',
                LatitudeMeasure: 60.4833165,
                LongitudeMeasure: -151.180003,
                HUCEightDigitCode: '19020302',
                CountryCode: 'US',
                StateCode: '2',
                CountyCode: '122',
                minX: -151.180003,
                maxX: -151.180003,
                minY: 60.4833165,
                maxY: 60.4833165
            };
        
            connection.query(Query.dropTable(), (err, res) => {
                if (err) throw err;
                console.log("Casfer table dropped!")
            });
        
            connection.query(Query.createTable(), (err, res) => {
                if (err) throw err;
                console.log("Casfer table created!")
            });
        
            for (let i = 0; i < records.length; i++) {
                connection.query(Query.insertPoint(records[i]), (err, res) => {
                    if (err) throw err;
                    console.log("Record " + records.HUCEightDigitCode + " added!");
                });
            }

            // connection.query(Query.insertPoint(point), (err, res) => {
            //     if (err) throw err;
            // });
        
            var search = `SELECT * FROM Casfer`;
            var query = "minX=-160 maxX=-150 // minY=59 maxY=61 // start=19680508 end=19730511 // keyword=HUCEightDigitCode";
        
            connection.query(Query.searchPoint(query), (err, res) => {
                if (err) throw err;
                console.log(res);
            });
        
            // const BBox = {
            //     minX: -140,
            //     maxX: -131,
            //     minY: 55,
            //     maxY: 60
            // };
        });
    }
}

module.exports = DB;