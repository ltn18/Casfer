const RBush = require('rbush');
const fs = require("fs");
const { parse } = require("csv-parse");
const KDBush = require('kdbush');

class GeoRBush {
    #tree = new RBush(1000000);

    static fetchData = async (path) => {
        const records = []
        const parser = fs
            .createReadStream(path)
            .pipe(parse({ delimiter: ",", from_line: 2 }));

        for await (const row of parser) {
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
        }

        // await this.#tree.load(records);

        return records;
    }

    static search = async (point) => {
        const result = await this.#tree.search(point)
        console.log(result)
    }
}

module.exports = GeoRBush