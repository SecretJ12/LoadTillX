
# LoadTillX

This project tries to optimize the loading between a VW ID and a Fronius Wattpilot.
You can choose a minimal SOC (in %) that should always be available for the next day trip.
It starts by retrieving the current amount of charge from your car and calculated the needed difference in kwh.
This amount is sent to the Wattpilot in next trip mode.

The docker image offers the following variables to edit:

| Var          | Default | Description                                 |
|--------------|---------|---------------------------------------------|
| wattpilot_IP |         | Address of your Wattpilot                   |
| wattpilot_PW |         | Password for your Wattpilot                 |
| vw_username  |         | Username of your VW account                 |
| vw_password  |         | Password of your VW account                 |
| IP           | 0.0.0.0 | Address the webserver should serve on       |
| PORT         | 5000    | Port the webserver should serve on          |
| chargeTill   | 50      | Amount you need for your next trip          |
| maxKwh       | 58      | The maximal amount of kwh your car can hold |

The server currently only offers the page "/start", which starts the script.

Used libraries:
- [npm-vwconnectidapi](https://github.com/nightsha-de/npm-vwconnectapi) based on [
npm-vwconnectapi](https://github.com/nightsha-de/npm-vwconnectapi)
- [wattpilot](https://github.com/joscha82/wattpilot)