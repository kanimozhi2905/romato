# 🚀 Deployment Fix Guide - API Configuration Issue

## 🔍 What Was Wrong?

### **The Problem:**
Your website was running locally but failing on Vercel because of **incorrect API URL configuration**.

#### **Root Causes:**

1. **Hardcoded localhost in `.env.production`**: 
   ```
   ❌ BEFORE: REACT_APP_API_URL=http://localhost:8000
   ✅ AFTER:  REACT_APP_API_URL=https://your-backend-url.herokuapp.com
   ```

2. **Relative API paths in components**:
   - Components were using `/api/cart/`, `/api/auth/login/`, etc.
   - These work locally (thanks to proxy) but fail in production
   - Vercel serves static files, so `/api/...` looks for files that don't exist

3. **Missing environment variable usage**:
   - The `setupProxy.js` only works during development
   - Production builds need explicit API URLs

---

## ✅ What I Fixed

### 1. **Created API Utility** (`client/src/utils/api.js`)
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const apiCall = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  // ... fetch logic with error handling
};
```

### 2. **Updated All API Calls**

**Files Modified:**
- ✅ `CartContext.js` - Cart sync and loading
- ✅ `Loginpage.jsx` - User authentication
- ✅ `Signuppage.jsx` - User registration  
- ✅ `CheckoutPage.jsx` - Order placement

**Changed from:**
```javascript
fetch('/api/cart/', { ... })
```

**To:**
```javascript
fetch(`${API_URL}/api/cart/`, { ... })
```

### 3. **Updated Environment File**
```bash
# .env.production
REACT_APP_API_URL=https://your-backend-url.herokuapp.com
```

---

## 📋 What You Need to Do Now

### **Step 1: Deploy Your Backend**

You need to deploy your Django backend to a hosting service:

**Options:**
1. **Railway** (Recommended) - https://railway.app
2. **Render** - https://render.com
3. **Heroku** - https://heroku.com

**For Railway:**
1. Go to railway.app and sign up
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo: `kanimozhi2905/romato`
4. Set Root Directory: `backend`
5. Add environment variables:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=.railway.app,your-app.vercel.app
   MONGODB_URI=your-mongodb-connection-string
   ```
6. Add start command:
   ```bash
   pip install gunicorn && gunicorn food_delivery.wsgi:application --bind 0.0.0.0:$PORT
   ```
7. Deploy and get your URL (e.g., `https://your-app.railway.app`)

### **Step 2: Update Frontend Environment**

Update `client/.env.production` with your actual backend URL:

```bash
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### **Step 3: Configure CORS in Django**

In your `backend/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    'https://your-app.vercel.app',  # Your Vercel URL
    'http://localhost:3000',
]
```

### **Step 4: Rebuild and Redeploy**

```bash
cd client
npm run build
git add .
git commit -m "Fix API URL configuration for production"
git push origin main
```

Vercel will automatically redeploy.

---

## 🧪 Test Locally First

Before deploying, test the production build locally:

```bash
cd client
npm run build
npx serve -s build
```

Visit `http://localhost:5000` and test:
- ✅ Login/Signup
- ✅ Adding items to cart
- ✅ Checkout process

---

## 🎯 How This Works

### **Development (Local):**
```
React App (localhost:3000)
    ↓
setupProxy.js intercepts /api/* requests
    ↓
Proxies to Django (localhost:8000)
```

### **Production (Vercel):**
```
React App (your-app.vercel.app)
    ↓
Uses REACT_APP_API_URL
    ↓
Directly calls Django (your-backend.railway.app)
```

---

## ⚠️ Important Notes

1. **Never commit `.env.production`** - It's already in `.gitignore`
2. **Set environment variables in Vercel dashboard**:
   - Go to your Vercel project → Settings → Environment Variables
   - Add `REACT_APP_API_URL` with your backend URL

3. **Backend must be deployed separately** - Vercel only hosts the frontend

---

## 🐛 Troubleshooting

### Still getting errors?

**Check these:**

1. **Backend URL is accessible**:
   ```bash
   curl https://your-backend-url.railway.app/api/food/
   ```

2. **CORS is configured** in Django settings

3. **Environment variable is set** in Vercel dashboard

4. **Build succeeds locally**:
   ```bash
   cd client
   npm run build
   # Should complete without errors
   ```

---

## 📊 Summary

| Component | Status | Action Needed |
|-----------|--------|---------------|
| Frontend Code | ✅ Fixed | None |
| API Configuration | ✅ Fixed | None |
| Backend Deployment | ⏳ Pending | Deploy to Railway/Render |
| Environment Setup | ⏳ Pending | Update `.env.production` |
| CORS Settings | ⏳ Pending | Add Vercel URL to allowed origins |

---

## 🎉 Next Steps

1. Deploy backend to Railway
2. Update `.env.production` with real backend URL
3. Set environment variable in Vercel dashboard
4. Push code to GitHub
5. Vercel will auto-deploy
6. Test everything works!

---

**Need help?** Check these files:
- `DEPLOYMENT_GUIDE.md` - Full deployment instructions
- `VERCEL_DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `API_TESTING_GUIDE.md` - How to test your APIs
