const csv = require('csvtojson')
const RBush = require('rbush');

const path = "./data.csv"
const rtree = new RBush(1000000)
const records = []

csv().fromFile(path)
    .then((source) => {
        for (var i = 0; i < source.length; i++) {
            var ConstructionDateText = source[i]["ConstructionDateText"],
                LatitudeMeasure = source[i]["LatitudeMeasure"],
                LongitudeMeasure = source[i]["LongitudeMeasure"],
                HUCEightDigitCode = source[i]["HUCEightDigitCode"],
                CountryCode = source[i]["CountryCode"],
                StateCode = source[i]["StateCode"],
                CountyCode = source[i]["CountyCode"];

            var x = parseFloat(LongitudeMeasure)
            var y = parseFloat(LatitudeMeasure)

            // x = lon, y = lat
            const point = {
                ConstructionDateText: parseInt(ConstructionDateText),
                LatitudeMeasure: y,
                LongitudeMeasure: x,
                HUCEightDigitCode: HUCEightDigitCode,
                CountryCode: CountryCode,
                StateCode: StateCode,
                CountyCode: CountyCode,
                minX: x,
                maxX: x,
                minY: y,
                maxY: y,
            }

            records.push(point);
        }
    })
    .then(() => {
        console.time('load data into rtree')
        rtree.load(records);
        console.timeEnd('load data into rtree')
        // console.log(records)

        // minX=-160 maxX=-150 // minY=59 maxY=61
        const bbox = {
            minX: -160,
            maxX: -150,
            minY: 59,
            maxY: 61
        }

        console.time('search rtree bbox')
        const result = rtree.search(bbox);
        console.timeEnd('search rtree bbox')

        console.log(result.length);
    })

