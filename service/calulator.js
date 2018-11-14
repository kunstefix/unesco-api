// https://www.movable-type.co.uk/scripts/latlong-db.html
const mysqlx = require('@mysql/xdevapi');


const options = {
    host: "localhost",
    port: '33060',
    user: "root",
    password: "root1234",
    schema: "unescoScheme"
};

exports.calculateDistance = function calculateDistance(latitude, longitude) {

    let lat = latitude // 46.056946;  // latitude of centre of bounding circle in degrees
    let lon = longitude // 14.505751; // longitude of centre of bounding circle in degrees
    // let distance = 100; // radius of bounding circle in kilometers

    let R = 6371;  // earth's mean radius, km
    let sqlstatement = `
        SELECT
        sitesTable.name, agentsTable.name,
        (
        ${R} *
        acos(cos(radians(${lat})) *
        cos(radians(latitude)) *
        cos(radians(longitude) -
        radians(${lon})) +
        sin(radians(${lat})) *
        sin(radians(latitude)))
        ) AS distance
        FROM unescoScheme.sitesTable
        LEFT JOIN unescoScheme.agentsTable ON unescoScheme.sitesTable.agentID = unescoScheme.agentsTable._id
        ORDER BY distance LIMIT 0, 5;
    `;



    return new Promise(function (resolve, reject) {

        mysqlx.getSession(options)
            .then((session) => {
                let resuls = [];
                session.sql(sqlstatement)
                    .execute(res => {
                        resuls.push(
                            {
                                name: res[0],
                                agent: res[1],
                                distance: res[2]
                            }
                        );
                    }).then(() => {
                        session.close();
                        resolve(resuls);
                    }).catch(err => {
                        session.close()
                            .then(() => {
                                throw err;
                            })
                            .catch(err => {
                                throw err;
                            });
                    });;

            })
    });
}

