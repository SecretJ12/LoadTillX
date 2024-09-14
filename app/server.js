import express from 'express';

const app = express();

const env = process.env
const port = env.PORT;

import {getData} from "./vw.js";
import * as child_process from "node:child_process";

app.set('view engine', 'ejs');

app.get("/loadtillx", async (req, res) => {
    const data = await getData()
    const rendData = {
        defaultTill: env.chargeTill,
        time: data.battery.time.toLocaleString('de'),
        SOC: data.battery.SOC,
        range: data.battery.range,
        chargingState: data.battery.charging.state
    }
    res.render('overview', rendData)
})

app.get('/loadtillx/start', async (req, res) => {
    const loadTill = req.query.loadTill
    console.log(`Loading till ${loadTill}`)
    run(loadTill)
    res.redirect('/loadtillx/started')
});

app.get('/loadtillx/started', async (req, res) => {
    const data = await getData()
    const body = `Script start!<br>
    Current SOC: ${data.battery.SOC}`
    res.send(body)
});

function calculateAmount(SOC, chargeTill) {
    const till = chargeTill || env.chargeTill
    if (SOC < till)
        return (till - SOC) * env.maxKwh * 10
    else
        return  0
}

async function run(chargeTill) {
    const data = await getData()
    const SOC = data.battery.SOC;

    let toCharge = calculateAmount(SOC, chargeTill)

    child_process.exec(`python charger.py ${toCharge}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    })
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});