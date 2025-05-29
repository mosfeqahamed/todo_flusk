from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, Task
from db_client import DATABASE_URI
from schemas import TaskCreate, TaskUpdate

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

create_schema = TaskCreate()

@app.route('/tasks', methods=['GET'])
def get_task():
    tasks = Task.query.all()
    return jsonify([{'id': t.id, 'task_name': t.task_name, 'status': t.status} for t in tasks])



@app.route('/tasks', methods=['POST'])
def add_task():
    json_data = request.get_json()
    errors = create_schema.validate(json_data)
    if errors:
        return jsonify({'error': errors}), 400

    new_task = Task(task_name=json_data['task_name'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added'}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    json_data = request.get_json()
    errors = TaskUpdate().validate(json_data)
    if errors:
        return jsonify({'error': errors}), 400

    task.status = json_data['status']
    db.session.commit()
    return jsonify({'message': 'Task updated'})


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)