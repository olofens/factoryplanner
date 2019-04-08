from flask import Flask
app = Flask(__name__, template_folder="public")

@app.route("/")
def hello():
    return "Hello, world!"

if __name__ == '__main__':
    Flask.run(app, debug=True)