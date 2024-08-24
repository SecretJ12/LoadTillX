
# LoadTillX

This project tries to optimize the loading between a VW ID and a Fronius Wattpilot.
You can choose a minimal SOC (in %) that should always be available for the next day trip.
It starts by retrieving the current amount of charge from your car and calculated the needed difference in kwh.
This amount is sent to the Wattpilot in next trip mode.

The config should be set in a .env file.
```.dotenv
wattpilot_IP=<IP of Wattpilot>
wattpilot_PW=<Password to Wattpilot>
vw_username=<Your VW username>
vw_password=<Your VW password>

maxKwh=58
chargeTill=50
```

Used libraries:
- [npm-vwconnectidapi](https://github.com/nightsha-de/npm-vwconnectapi) based on [
npm-vwconnectapi](https://github.com/nightsha-de/npm-vwconnectapi)
- [wattpilot](https://github.com/joscha82/wattpilot)