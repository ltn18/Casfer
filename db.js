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

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MYSQL Server!");

    connection.query("DROP TABLE casfer",
        (err, drop) => {
            // Query to create table "sample"
            var createStatament =
                "CREATE TABLE casfer(ConstructionDateText int(10), " +
                "LatitudeMeasure FLOAT(7,4), LongitudeMeasure FLOAT(7,4), HUCEightDigitCode int(8), " +
                "CountryCode varchar(2), StateCode int(2), CountyCode int(3), minX FLOAT(7,4), maxX FLOAT(7,4), minY FLOAT(7,4), maxY FLOAT(7,4))"

            // Creating table "sample"
            connection.query(createStatament, (err, drop) => {
                if (err)
                    console.log("ERROR: ", err);
            });
        });
});

const csvtojson = require('csvtojson');
// CSV file name
const fileName = "./data.csv";

csvtojson().fromFile(fileName).then(source => {

    // Fetching the data from each row
    // and inserting to the table "sample"
    for (var i = 0; i < source.length; i++) {
        var ConstructionDateText = source[i]["ConstructionDateText"],
            LatitudeMeasure = source[i]["LatitudeMeasure"],
            LongitudeMeasure = source[i]["LongitudeMeasure"],
            HUCEightDigitCode = source[i]["HUCEightDigitCode"],
            CountryCode = source[i]["CountryCode"],
            StateCode = source[i]["StateCode"],
            CountyCode = source[i]["CountyCode"]


        var insertStatement =
            `INSERT INTO casfer values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        var items = [ConstructionDateText, LatitudeMeasure, LongitudeMeasure, HUCEightDigitCode, CountryCode, StateCode, CountyCode,
            LongitudeMeasure, LongitudeMeasure, LatitudeMeasure, LatitudeMeasure];

        // Inserting data of current row
        // into database
        connection.query(insertStatement, items,
            (err, results, fields) => {
                if (err) {
                    console.log("Unable to insert item at row ", i + 1);
                    return console.log(err);
                }
            });
    }

    console.log("All items stored into database successfully");
    console.log(`INSERT all items takes ${Math.floor((after - before)/1000)} seconds`)
});