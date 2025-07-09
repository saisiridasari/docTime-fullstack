# reset_db.py

from app import app, db
from models import Doctor
from data import doctors as seed_data

with app.app_context():
    print("📛 Dropping all tables...")
    db.drop_all()

    print("✅ Creating all tables...")
    db.create_all()

    print("🌱 Seeding doctors...")
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
    print("🎉 Done! Database has been reset and doctors are seeded.")
