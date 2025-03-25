from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Smart Task Manager Backend is Running!"

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = [
        {"id": 1, "title": "Finish Flask Deployment", "completed": False},
        {"id": 2, "title": "Integrate Azure Services", "completed": True},
    ]
    return jsonify(tasks)

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))  # Use Azure's PORT or default to 8000
    app.run(host="0.0.0.0", port=port)
