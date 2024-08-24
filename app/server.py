from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/start', methods=['GET'])
def start_script():
    try:
        # Run the shell script
        subprocess.Popen(['/bin/bash', './run.sh'])
        return "Script started!", 200
    except Exception as e:
        return f"Error: {e}", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)