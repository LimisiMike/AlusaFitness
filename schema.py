from marshmallow import Schema, fields

class ClientSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    health_data = fields.Dict()
    goals = fields.Str()
    progress_notes = fields.Str()

class PaymentSchema(Schema):
    id = fields.Int()
    client_id = fields.Int(required=True)
    amount = fields.Float(required=True)
    payment_date = fields.Date()
    payment_type = fields.Str(required=True)

class MessageSchema(Schema):
    id = fields.Int()
    sender_id = fields.Int()
    receiver_id = fields.Int()
    message = fields.Str(required=True)
    sent_at = fields.DateTime()