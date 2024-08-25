echo "Retrieving state of charge..."

toCharge=$(node vw.js)

echo $toCharge
python charger.py $toCharge

