# 🍔 Food Delivery Application

A full-stack food delivery application with React frontend and Django backend.

## 📁 Project Structure

```
romato/
├── client/          # React Frontend (Deploy to Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/       # Production build output
├── backend/         # Django Backend (Deploy to Railway/Render)
│   ├── apps/
│   ├── food_delivery/
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

---

## 🚀 Quick Start

### Frontend (React)

```bash
cd client
npm install
npm start
```

Runs at: http://localhost:3000

### Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python manage.py runserver
```

Runs at: http://localhost:8000

---

## ☁️ Deployment

### Frontend → Vercel

**⚠️ CRITICAL**: Set Root Directory to `client` in Vercel settings!

1. Go to [Vercel](https://vercel.com)
2. Import this GitHub repository
3. **Settings**:
   - **Root Directory**: `client` ← MANDATORY
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variable: `REACT_APP_API_URL`
5. Deploy!

### Backend → Railway

1. Go to [Railway](https://railway.app)
2. Deploy from GitHub
3. Set root directory: `backend`
4. Add environment variables (see `backend/.env.example`)
5. Deploy!

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Context API (State Management)

**Backend:**
- Django 6.0
- Django REST Framework
- Simple JWT (Authentication)
- MongoDB (optional)

---

## 📦 Features

- User authentication (JWT)
- Browse food menu
- Shopping cart
- Checkout & orders
- Admin panel

---

## 🔗 Live Demo

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.railway.app
- **Admin Panel**: https://your-backend.railway.app/admin/

---

## 📝 License

MIT
