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

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MYSQL Server!");

    connection.query("DROP TABLE points", 
        (err, drop) => {
  
        // Query to create table "sample"
        var createStatament = 
        "CREATE TABLE points(ConstructionDateText int(10), " +
        "LatitudeMeasure FLOAT(7,4), LongitudeMeasure FLOAT(7,4), HUCEightDigitCode int(8), " +
        "CountryCode varchar(2), StateCode int(2), CountyCode int(3))"
  
        // Creating table "sample"
        connection.query(createStatament, (err, drop) => {
            if (err)
                console.log("ERROR: ", err);
        });
    });
});

const csvtojson = require('csvtojson');
// CSV file name
const fileName = "data.csv";
  
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
        `INSERT INTO points values(?, ?, ?, ?, ?, ?, ?)`;
        var items = [ConstructionDateText, LatitudeMeasure, LongitudeMeasure, HUCEightDigitCode, CountryCode, StateCode, CountyCode];
  
        // Inserting data of current row
        // into database
        connection.query(insertStatement, items, 
            (err, results, fields) => {
            if (err) {
                console.log(
    "Unable to insert item at row ", i + 1);
                return console.log(err);
            }
        });
    }
    console.log(
    "All items stored into database successfully");
});