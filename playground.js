const fs = require('fs');
const csv = require('@fast-csv/parse');

const records = [];
fs.createReadStream('./data.csv')
    .pipe(csv.parse({ delimiter: ",", skipLines: 0 }))
    .on('error', error => console.error(error))
    .on('data', row => {
        var x = parseFloat(row[3])
        var y = parseFloat(row[2])

        const point = {
            ConstructionDateText: row[1],
            LatitudeMeasure: y,
            LongitudeMeasure: x,
            HUCEightDigitCode: row[4],
            CountryCode: row[5],
            StateCode: row[6],
            CountyCode: row[7],
            minX: x,
            maxX: x,
            minY: y,
            maxY: y,
        }

        records.push(point)
    })
    .on('end', rowCount => {
        console.log(records);
        console.log(`Parsed ${rowCount} rows`)
    });