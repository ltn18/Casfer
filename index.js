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
    var query = "minX=-140 maxX=-131 // minY=55 maxY=60 // start=19680508 end=19730511 // keyword=HUCEightDigitCode";
    var sql = Query.searchPoint(query);
    console.log(sql);
}

main()