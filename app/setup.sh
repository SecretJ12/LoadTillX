# install vw connect lib
echo "Installing dependencies..."
if [ -d "lib" ]; then
  echo "Dependencies already installed."
else
  mkdir lib
  cd lib
  git clone https://github.com/adhyh/npm-vwconnectidapi.git
  cd npm-vwconnectidapi
  npm install
  cd ../..
  npm install

  pip install python-dotenv wattpilot flask
  pip install waitress
  echo "Everything installed."
fi