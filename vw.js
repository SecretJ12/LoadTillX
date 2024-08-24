const api = require('npm-vwconnectidapi');
const dotenv = require('dotenv').config().parsed

var vwConn = new api.VwWeConnect();
vwConn.setLogLevel("INFO"); // optional, ERROR (default), INFO, WARN or DEBUG
vwConn.setCredentials(dotenv.vw_username, dotenv.vw_password);
vwConn.getData()
    .then(() => {
        // console.log(vwConn.idData.charging.batteryStatus.value)

        const soc = vwConn.idData.charging.batteryStatus.value.currentSOC_pct
        if (soc > dotenv.chargeTill) {
            // Already charged enough
            console.log(0)
        } else {
            const diffPercent = dotenv.chargeTill - soc
            const diffKWH = diffPercent * dotenv.maxKwh * 10
            console.log(diffKWH)
        }

        process.exit(0)
    })
    .catch((error) => {
        log.error("something went wrong");
        log.error(error)
        process.exit(1);
    });
