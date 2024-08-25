# app/routes.py

from flask import Blueprint, request, jsonify
from .models import User, Client, Plan, Session, Progress, Message, Payment, db
from .schema import ClientSchema, PaymentSchema, MessageSchema
from .app import app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash


client_schema = ClientSchema()
clients_schema = ClientSchema(many=True) # For hamdling lists of clients
payment_schema = PaymentSchema()
message_schema = MessageSchema()

main = Blueprint('main', __name__)

app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)
# Helper function to get user by email
def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

# User Registration
@main.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')

    if not email or not password or not role:
        return jsonify({'message': 'Missing required fields'}), 400

    if get_user_by_email(email):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# User Login
@main.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = get_user_by_email(email)
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid email or password'}), 401

# Get all clients for the authenticated coach
@main.route('/clients', methods=['GET'])
@jwt_required()
def get_clients():
    current_user_email = get_jwt_identity()
    current_user = get_user_by_email(current_user_email)

    if current_user.role != 'coach':
        return jsonify({'message': 'Access denied'}), 403

    clients = Client.query.filter_by(coach_id=current_user.id).all()
    
    #Use the clientschema for serialization
    client_list = client_schema.dump(clients)
    return jsonify({'clients': client_list}), 200

# Create a new client
@main.route('/clients', methods=['POST'])
@jwt_required()
def create_client():
    data = request.json
    errors = client_schema.validate(data)
    if errors:
        return jsonify(errors),400
    
    current_user_email = get_jwt_identity()
    current_user = get_user_by_email(current_user_email)

    if current_user.role != 'coach':
        return jsonify({'message': 'Access denied'}), 403
    
    new_client = Client(
        coach_id=current_user.id,
        name = data.get('name'),
        email = data.get('email'),
        health_data = data.get('health_data'),
        goals = data.get('goals'),
        progress_notes = data.get('progress_notes')
    )
    db.session.add(new_client)
    db.session.commit()

    return client_schema.jsonify(new_client), 201

# Get a single client
@main.route('/clients/<int:client_id>', methods=['GET'])
@jwt_required()
def get_client(client_id):
    current_user_email = get_jwt_identity()
    current_user = get_user_by_email(current_user_email)

    if current_user.role != 'coach':
        return jsonify({'message': 'Access denied'}), 403

    client = Client.query.get_or_404(client_id)
    if client.coach_id != current_user.id:
        return jsonify({'message': 'Client not found'}), 404

    # client_data = {
    #     'id': client.id,
    #     'name': client.name,
    #     'email': client.email,
    #     'health_data': client.health_data,
    #     'goals': client.goals,
    #     'progress_notes': client.progress_notes
    # }

    #using clientschema for serialization
    client_data = client_schema.dump(client)
    return jsonify(client_data), 200

# Update a client
@main.route('/clients/<int:client_id>', methods=['PUT'])
@jwt_required()
def update_client(client_id):
    current_user_email = get_jwt_identity()
    current_user = get_user_by_email(current_user_email)

    if current_user.role != 'coach':
        return jsonify({'message': 'Access denied'}), 403

    client = Client.query.get_or_404(client_id)
    if client.coach_id != current_user.id:
        return jsonify({'message': 'Client not found'}), 404

    data = request.json

    #validate and serialize input
    errors = client_schema.validate(data, partial=True)
    if errors:
        return jsonify(errors), 400
    
    client.name = data.get('name', client.name)
    client.health_data = data.get('health_data', client.health_data)
    client.goals = data.get('goals', client.goals)
    client.progress_notes = data.get('progress_notes', client.progress_notes)

    db.session.commit()
    return jsonify({'message': 'Client updated successfully'}), 200

# Delete a client
@main.route('/clients/<int:client_id>', methods=['DELETE'])
@jwt_required()
def delete_client(client_id):
    current_user_email = get_jwt_identity()
    current_user = get_user_by_email(current_user_email)

    if current_user.role != 'coach':
        return jsonify({'message': 'Access denied'}), 403

    client = Client.query.get_or_404(client_id)
    if client.coach_id != current_user.id:
        return jsonify({'message': 'Client not found'}), 404

    db.session.delete(client)
    db.session.commit()
    return jsonify({'message': 'Client deleted successfully'}), 200

# Create a new plan for a client
@main.route('/plans', methods=['POST'])
@jwt_required()
def create_plan():
    data = request.json
    client_id = data.get('client_id')
    plan_type = data.get('plan_type')
    content = data.get('content')
    start_date = data.get('start_date')
    end_date = data.get('end_date')
    status = data.get('status')

    client = Client.query.get_or_404(client_id)

    new_plan = Plan(
        client_id=client.id,
        plan_type=plan_type,
        content=content,
        start_date=start_date,
        end_date=end_date,
        status=status
    )
    db.session.add(new_plan)
    db.session.commit()

    return jsonify({'message': 'Plan created successfully'}), 201

# Get all plans for a client
@main.route('/plans/<int:client_id>', methods=['GET'])
@jwt_required()
def get_plans(client_id):
    client = Client.query.get_or_404(client_id)

    plans = Plan.query.filter_by(client_id=client.id).all()
    plan_list = [{
        'id': plan.id,
        'plan_type': plan.plan_type,
        'content': plan.content,
        'start_date': plan.start_date,
        'end_date': plan.end_date,
        'status': plan.status
    } for plan in plans]

    return jsonify({'plans': plan_list}), 200

# Create a new session
@main.route('/sessions', methods=['POST'])
@jwt_required()
def create_session():
    data = request.json
    client_id = data.get('client_id')
    date_time = data.get('date_time')
    session_type = data.get('type')
    notes = data.get('notes')

    client = Client.query.get_or_404(client_id)

    new_session = Session(
        client_id=client.id,
        date_time=date_time,
        type=session_type,
        notes=notes
    )
    db.session.add(new_session)
    db.session.commit()

    return jsonify({'message': 'Session created successfully'}), 201

# Get all sessions for a client
@main.route('/sessions/<int:client_id>', methods=['GET'])
@jwt_required()
def get_sessions(client_id):
    client = Client.query.get_or_404(client_id)

    sessions = Session.query.filter_by(client_id=client.id).all()
    session_list = [{
        'id': session.id,
        'date_time': session.date_time,
        'type': session.type,
        'notes': session.notes
    } for session in sessions]

    return jsonify({'sessions': session_list}), 200

# Create progress record
@main.route('/progress', methods=['POST'])
@jwt_required()
def create_progress():
    data = request.json
    client_id = data.get('client_id')
    progress_date = data.get('progress_date')
    metrics = data.get('metrics')
    notes = data.get('notes')

    client = Client.query.get_or_404(client_id)

    new_progress = Progress(
        client_id=client.id,
        progress_date=progress_date,
        metrics=metrics,
        notes=notes
    )
    db.session.add(new_progress)
    db.session.commit()

    return jsonify({'message': 'Progress record created successfully'}), 201

# Get all progress records for a client
@main.route('/progress/<int:client_id>', methods=['GET'])
@jwt_required()
def get_progress(client_id):
    client = Client.query.get_or_404(client_id)

    progress_records = Progress.query.filter_by(client_id=client.id).all()
    progress_list = [{
        'id': progress.id,
        'progress_date': progress.progress_date,
        'metrics': progress.metrics,
        'notes': progress.notes
        } for progress in progress_records]
    return jsonify({'progress': progress_list}), 200


# Send a message
@main.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    data = request.json
    errors = message_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    receiver_id = data.get('receiver_id')
    message_content = data.get('message')

    sender_email = get_jwt_identity()
    sender = User.query.filter_by(email=sender_email).first()

    receiver = User.query.get_or_404(receiver_id)

    new_message = Message(
        sender_id=sender.id,
        receiver_id=receiver.id,
        message=message_content
    )
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'message': 'Message sent successfully'}), 201

# Get all messages for the authenticated user
@main.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

    messages = Message.query.filter(
        (Message.sender_id == current_user.id) |
        (Message.receiver_id == current_user.id)
    ).all()

    # message_list = [{
    #     'id': message.id,
    #     'sender_id': message.sender_id,
    #     'receiver_id': message.receiver_id,
    #     'message': message.message,
    #     'sent_at': message.sent_at
    # } for message in messages]

    return jsonify(message_schema.dump(messages, many=True)), 200


# Create a new payment record
@main.route('/payments', methods=['POST'])
@jwt_required()
def create_payment():
    data = request.json
    errors = payment_schema.validate(data)
    if errors:
        return jsonify(errors), 400
    
    client_id = data.get('client_id')
    amount = data.get('amount')
    payment_date = data.get('payment_date')
    payment_type = data.get('payment_type')

    client = Client.query.get_or_404(client_id)

    new_payment = Payment(
        client_id=client.id,
        amount=amount,
        payment_date=payment_date,
        payment_type=payment_type
    )
    db.session.add(new_payment)
    db.session.commit()

    return payment_schema.jsonify(new_payment), 201

# Get all payments for a client
@main.route('/payments/<int:client_id>', methods=['GET'])
@jwt_required()
def get_payments(client_id):
    client = Client.query.get_or_404(client_id)

    payments = Payment.query.filter_by(client_id=client.id).all()
    # payment_list = [{
    #     'id': payment.id,
    #     'amount': payment.amount,
    #     'payment_date': payment.payment_date,
    #     'payment_type': payment.payment_type
    # } for payment in payments]

    return jsonify(payment_schema.dump(payments, many=True)), 200