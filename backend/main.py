from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/api/user/login', methods=['GET', 'POST'])
def root_api_user_login():
    response = {
        "status": "Dette funker sfsdfsdfsdfasfoijsdkjsdfkljsdfljk osksklsdf!",
        "token": "asfjisdijodsoijfdskoj",
    }
    return jsonify(response)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='0.0.0.0', port=8080, debug=True)