from marshmallow import Schema, fields, validate

class TaskCreate(Schema):
    task_name = fields.String(required=True, validate=validate.Length(min=1,max=50))

class TaskUpdate(Schema):
    status = fields.Boolean(required=True)
