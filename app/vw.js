import api from 'npm-vwconnectidapi'

const dotenv = process.env

var vwConn = new api.VwWeConnect();
vwConn.setLogLevel("INFO"); // optional, ERROR (default), INFO, WARN or DEBUG
vwConn.setCredentials(dotenv.vw_username, dotenv.vw_password);
console.log("Created VW connect")

export function getData() {
    console.log("Retreiving data...")
    return vwConn.getData()
        .then(() => {
            console.log("Got data")
            // return vwConn.idData.charging.batteryStatus.value
            return convertData(vwConn.idData)
        })
        .catch(() => {
            return null
        });
}

function convertData(idData) {
    function getDoorStatus(name) {
        return idData.access.accessStatus.value.doors.find(e => e.name === name).status
    }
    function getWindowStatus(name) {
        return idData.access.accessStatus.value.windows.find(e => e.name === name).status
    }

    return {
        overallStatus: idData.access.accessStatus.value.overallStatus,
        doors: {
            time: idData.access.accessStatus.value.carCapturedTimestamp,
            trunk: getDoorStatus("trunk"),
            frontRight: getDoorStatus("frontRight"),
            frontLeft: getDoorStatus("frontLeft"),
            rearRight: getDoorStatus("rearRight"),
            rearLeft: getDoorStatus("rearLeft"),
            bonnet: getDoorStatus("bonnet")
        },
        windows: {
            frontRight: getWindowStatus("frontRight"),
            frontLeft: getWindowStatus("frontLeft"),
            rearRight: getWindowStatus("rearRight"),
            rearLeft: getWindowStatus("rearLeft"),
        },
        battery: {
            time: idData.charging.batteryStatus.value.carCapturedTimestamp,
            SOC: idData.charging.batteryStatus.value.currentSOC_pct,
            range: idData.charging.batteryStatus.value.cruisingRangeElectric_km,
            charging: {
                state: idData.charging.chargingStatus.value.chargingState,
                power: idData.charging.chargingStatus.value.chargePower_kW
            }
        }
    }
}