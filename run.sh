./setup.sh

echo "Retrieving state of charge..."
toCharge=$(node vw.js)

python charger.py $toCharge

