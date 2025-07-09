from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.Integer, nullable=True)
    available = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'experience': self.experience,
            'available': self.available
        }

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient = db.Column(db.String(100), nullable=False)
    doctor = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    doctor_id = db.Column(
        db.Integer,
        db.ForeignKey('doctor.id', name='fk_appointment_doctor_id'),
        nullable=False
    )

    def to_dict(self):
        return {
            'id': self.id,
            'patient': self.patient,
            'doctor': self.doctor,
            'doctor_id': self.doctor_id,
            'date': self.date.isoformat(),
            'time': self.time.strftime('%H:%M')
        }
