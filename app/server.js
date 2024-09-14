import express from 'express';

const app = express();

const env = process.env
const port = env.PORT;

import {getData} from "./vw.js";
import * as child_process from "node:child_process";

app.get('/loadtillx/start', async (req, res) => {
    run()
    res.redirect('/loadtillx/started')
});

app.get('/loadtillx/started', async (req, res) => {
    const data = await getData()
    const body = `Script start!<br>
    Current SOC: ${data.battery.SOC}`
    res.send(body)
});

async function run() {
    const data = await getData()
    const SOC = data.battery.SOC;

    let toCharge
    if (SOC < env.chargeTill)
        toCharge = (env.chargeTill - SOC) * env.maxKwh * 10
    else
        toCharge = 0


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