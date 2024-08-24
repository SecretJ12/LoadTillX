import os
import argparse
from time import sleep
import wattpilot
from math import ceil

ip = os.getenv('wattpilot_IP')
password = os.getenv('wattpilot_PW')

parser = argparse.ArgumentParser()
parser.add_argument("toCharge", help="Amount to charge at minimum")

args = parser.parse_args()

toCharge = ceil(int(args.toCharge)/100)*100

print("Charge at least", toCharge, "wh")

solarwatt = wattpilot.Wattpilot(ip, password)
print("Connecting to Wattpilot...")
solarwatt.connect()
c = 0
while not solarwatt.connected and c < 10:
    sleep(1)
    c = c + 1
if c == 10:
    print("Failed to connect to wattpilot")
    exit(1)

print("Connected.")

if int(toCharge) <= 0:
    print("No need to charge, set to ECO mode...")
    solarwatt.set_mode(wattpilot.LoadMode.ECO)
else:
    print("Send froniusTripEnergy...")
    solarwatt.send_update("fte", toCharge)
    print("Set Mode to NextTrip...")
    solarwatt.set_mode(wattpilot.LoadMode.NEXTTRIP)

print("Completed.")
