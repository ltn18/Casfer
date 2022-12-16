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
        rtree.load(records);
        // console.log(records)

        // minX=-140 maxX=-100 // minY=30 maxY=50 // start=19590601 end=19740901
        const bbox = {
            minX: -140,
            minY: 30,
            maxX: -100,
            maxY: 50
        }

        const result = rtree.search(bbox);
        console.log(result);
    })

