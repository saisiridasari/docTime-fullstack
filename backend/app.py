from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate  # ✅ Added for migration
from datetime import datetime
import os

from models import db, User, Appointment, Doctor
from data import doctors as seed_data

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

# Configuration
app.config['JWT_SECRET_KEY'] = 'a-secure-and-random-secret-key-should-be-used-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///doctime.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)  # ✅ Enable migrations
jwt = JWTManager(app)

# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not all(k in data for k in ['name', 'email', 'password']):
        return jsonify({'message': 'Name, email, and password are required'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 409

    hashed_password = generate_password_hash(data['password'])
    new_user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registration successful'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not all(k in data for k in ['email', 'password']):
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.email)
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': {
            'name': user.name,
            'email': user.email
        }
    })

@app.route('/api/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return jsonify([doc.to_dict() for doc in doctors])

@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    data = request.get_json()
    required = ['patient', 'doctor', 'doctor_id', 'date', 'time']
    if not data or not all(k in data for k in required):
        return jsonify({'message': 'Missing appointment details'}), 400

    try:
        appointment_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        appointment_time = datetime.strptime(data['time'], '%H:%M').time()
    except ValueError:
        return jsonify({'message': 'Invalid date or time format'}), 400

    new_appt = Appointment(
        patient=data['patient'],
        doctor=data['doctor'],
        doctor_id=data['doctor_id'],
        date=appointment_date,
        time=appointment_time
    )
    db.session.add(new_appt)
    db.session.commit()

    return jsonify({'message': 'Appointment booked', 'appointment': new_appt.to_dict()}), 201

@app.route('/api/appointments', methods=['GET'])
def get_all_appointments():
    appointments = Appointment.query.order_by(Appointment.date, Appointment.time).all()
    return jsonify([appt.to_dict() for appt in appointments])

@app.route('/api/appointments/<int:id>', methods=['DELETE'])
def cancel_appointment(id):
    appt = Appointment.query.get(id)
    if not appt:
        return jsonify({'message': 'Appointment not found'}), 404

    db.session.delete(appt)
    db.session.commit()
    return jsonify({'message': 'Appointment cancelled'})

@app.route('/api/seed-doctors', methods=['GET'])
def seed_doctors():
    if Doctor.query.first():
        return jsonify({'message': 'Doctors already seeded'}), 400

    for doc in seed_data:
        new_doc = Doctor(
            id=doc['id'],
            name=doc['name'],
            specialization=doc['specialization'],
            experience=doc.get('experience', 0),
            available=doc.get('available', True)
        )
        db.session.add(new_doc)
    db.session.commit()
    return jsonify({'message': 'Doctors seeded successfully'}), 201

@app.route('/init-db')
def init_db():
    db.create_all()
    return 'Database initialized!'

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
