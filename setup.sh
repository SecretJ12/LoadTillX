# install vw connect lib
echo "Installing dependencies..."
if [ -d "lib" ]; then
  echo "Dependencies already installed."
else
  mkdir lib
  cd lib
  git clone https://github.com/nightsha-de/npm-vwconnectapi.git >/dev/null 2>&1
  cd npm-vwconnectapi
  npm install >/dev/null 2>&1
  cd ../..
  npm install >/dev/null 2>&1

  # install wattpilot
  pip install python-dotenv >/dev/null 2>&1
  pip install wattpilot >/dev/null 2>&1
  echo "Everything installed."
fi