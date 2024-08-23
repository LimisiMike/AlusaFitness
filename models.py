from app import db
from datetime import datetime

#Stores information about all users (coaches, clients, admins).
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    clients = db.relationship('Client', backref='coach', lazy=True)

#Stores details about clients, including their health data and progress.
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coach_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    health_data = db.Column(db.JSON)
    goals = db.Column(db.Text)
    progress_notes = db.Column(db.Text)
    plans = db.relationship('Plan', backref='client', lazy=True)
    sessions = db.relationship('Session', backref='client', lazy=True)
    progress = db.relationship('Progress', backref='client', lazy=True)
    payment = db.relationship('payment', backref='client', lazy=True)
    
#Stores workout and nutrition plans associated with clients.
class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    plan_type = db.Column(db.String(50), nullable=False)
    content = db.Column(db.JSON)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.String(50), nullable=False)

#Manages scheduled sessions between coaches and clients.
class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    notes = db.Column(db.Text)

#Tracks client progress over time.
class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    progress_date = db.Column(db.Date, nullable=False)
    metrics = db.Column(db.JSON)
    notes = db.Column(db.Text)

#Handles communication between coaches and clients.
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    sent_at = db.Column(db.DateTime, default=db.func.current_timestamp())


class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.Date, default=datetime.utcnow, nullable=False)
    payment_type = db.Column(db.String(50), nullable=False) #Describes the payment method (e.g., credit card, PayPal).

    client = db.relationship('Client', backref=db.backref('payments', lazy=True))

    # def __repr__(self):
    #     return f'<Payment {self.id}, Client {self.client_id}, Amount {self.amount}>'