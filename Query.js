class Query {
    static convertStringToTime
    
    // template: SELECTION: BBox([], []) + Time(start, end) + PROJECTION: Feature/Keyword
    static searchPoint = (text) => {
        const params = text.trim().split("//");
        var select_points = "";
        //Search bounding boxes
        if(params.length > 1){
            const x = params[0].trim().split(" ");
            const minX = parseFloat(x[0].trim().split("=")[1].trim());
            const maxX = parseFloat(x[1].trim().split("=")[1].trim());
            
            const y = params[1].trim().split(" ");
            const minY = parseFloat(y[0].trim().split("=")[1].trim());
            const maxY = parseFloat(y[1].trim().split("=")[1].trim());

            //Search only bounding boxes query
            if (params.length == 2){
                
                select_points = `
                    SELECT * FROM Casfer
                    WHERE Casfer.minX >= ${minX} AND Casfer.maxX <= ${maxX} 
                        AND Casfer.minY >= ${minY} AND Casfer.maxY <= ${maxY};
                `
            }
            //Search bounding boxes and time query
            else{
                const time = params[2].trim().split(" ");
                const start = time[0].trim().split("=")[1].trim()
                const end = time[1].trim().split("=")[1].trim()
                // console.log(start, end);
                select_points = `
                    SELECT * FROM Casfer
                    WHERE Casfer.minX >= ${minX} AND Casfer.maxX <= ${maxX} 
                        AND Casfer.minY >= ${minY} AND Casfer.maxY <= ${maxY}
                        AND Casfer.HUCEightDigitCode >= ${start}
                        AND Casfer.HUCEightDigitCode <= ${end};
                `
            }
        }
        //Projection query
        else{
            const keyword = params[0].trim().split("=")[1].trim();
            select_points = `
                SELECT DISTINCT ${keyword} FROM Casfer 
            `
        }

        return select_points;

        // console.log(minX + " " + maxX);
        // console.log(minY + " " + maxY);
        // console.log(start + " " + end);

    }

    static createTable = () => {
        var create_table = `CREATE TABLE Casfer (
            ConstructionDateText varchar(255),
            LatitudeMeasure float(7),
            LongitudeMeasure float(7),
            HUCEightDigitCode varchar(16),
            CountryCode varchar(2),
            StateCode varchar(2),
            CountyCode varchar(4),
            minX float(7),
            maxX float(7),
            minY float(7),
            maxY float(7)
        );`;
        return create_table;
    }

    static dropTable = () => {
        var drop_table = `DROP TABLE Casfer;`
        return drop_table;
    }

    static insertPoint = (record) => {
        var insert = `INSERT INTO Casfer (ConstructionDateText, LatitudeMeasure, LongitudeMeasure, 
            HUCEightDigitCode, CountryCode, StateCode, CountyCode,
            minX, maxX, minY, maxY)
            
            VALUES ('${record.ConstructionDateText}', ${record.LatitudeMeasure}, ${record.LongitudeMeasure}, '${record.HUCEightDigitCode}', 
                '${record.CountryCode}', '${record.StateCode}', '${record.CountyCode}', 
                ${record.minX}, ${record.maxX}, ${record.minY}, ${record.maxY})`;
        return insert;
    }
}

module.exports = Query;