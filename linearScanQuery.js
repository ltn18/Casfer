const csv = require('csvtojson')
const path = "./data.csv"

const linearSearch = (bbox) => {
    csv().fromFile(path)
        .then((source) => {
            const results = []

            console.time('search linear scan')
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

                if (point.minX >= bbox.minX && point.maxX <= bbox.maxX
                    && point.minY >= bbox.minY && point.maxY <= bbox.maxY
                ) {
                    results.push(point);
                }
            }
            console.timeEnd('search linear scan')

            console.log(results.length);
        })
}

const bbox = {
    minX: -160,
    maxX: -150,
    minY: 59,
    maxY: 61
}
linearSearch(bbox)

