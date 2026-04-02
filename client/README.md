# Food Delivery App - React Frontend

This is the React frontend for the food delivery application.

## 🚀 Deployment to Vercel

### ⚠️ CRITICAL: Root Directory Setting

When deploying this project on Vercel, you **MUST** set the Root Directory to `client` because this is a monorepo with both backend and frontend.

### Vercel Configuration

**In Vercel Dashboard:**

1. **Root Directory**: `client` ← THIS IS MANDATORY
2. **Framework**: Create React App (auto-detected)
3. **Build Command**: `npm run build`
4. **Output Directory**: `build`
5. **Install Command**: `npm install`

### Environment Variables

Add these in Vercel dashboard:

```
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### Local Development

```bash
npm install
npm start
```

App runs at http://localhost:3000

### Build for Production

```bash
npm run build
```

Production files are in `build/` folder.

## Features

- Landing page with food menu
- User authentication (login/signup)
- Shopping cart
- Checkout and order placement
- Order tracking

## Tech Stack

- React 19
- React Router DOM
- Context API for state management
