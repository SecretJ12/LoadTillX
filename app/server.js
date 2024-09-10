import express from 'express';

const app = express();

const env = process.env
const port = env.PORT;

import {getData} from "./vw.js";
import * as child_process from "node:child_process";

app.get('/start', async (req, res) => {
    run()
    res.send("Script started!");
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