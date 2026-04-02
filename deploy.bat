@echo off
REM ==========================================
REM Automated Deployment Script for Food Delivery App
REM This script will:
REM 1. Build the frontend
REM 2. Prepare backend for deployment
REM 3. Commit and push to GitHub
REM ==========================================

echo ========================================
echo   Food Delivery App Deployment Script
echo ========================================
echo.

REM Step 1: Navigate to client directory and build
echo [Step 1/4] Building React Frontend...
cd client
call npm install
call npm run build
if errorlevel 1 (
    echo ERROR: Frontend build failed!
    cd ..
    exit /b 1
)
cd ..
echo Frontend build successful!
echo.

REM Step 2: Verify backend files
echo [Step 2/4] Preparing Backend for Deployment...
if not exist "backend\railway.json" (
    echo ERROR: railway.json not found!
    exit /b 1
)
if not exist "backend\Procfile" (
    echo ERROR: Procfile not found!
    exit /b 1
)
echo Backend files verified!
echo.

REM Step 3: Git operations
echo [Step 3/4] Committing changes to Git...
git add .
if errorlevel 1 (
    echo ERROR: git add failed!
    exit /b 1
)

git commit -m "Deploy ready - API configuration fixed and backend prepared for Railway"
if errorlevel 1 (
    echo No changes to commit or commit failed
)

echo.

REM Step 4: Push to GitHub
echo [Step 4/4] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: git push failed!
    exit /b 1
)

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Deploy Backend to Railway:
echo    a. Go to https://railway.app
echo    b. New Project ^> Deploy from GitHub
echo    c. Select repo: kanimozhi2905/romato
echo    d. Set Root Directory: backend
echo    e. Add environment variables (see DEPLOYMENT_GUIDE.md)
echo    f. Deploy and get your URL
echo.
echo 2. Update Vercel Environment Variable:
echo    a. Go to vercel.com dashboard
echo    b. Settings ^> Environment Variables
echo    c. Add REACT_APP_API_URL with your Railway URL
echo.
echo 3. Test the deployment:
echo    - Visit your Vercel URL
echo    - Test login, cart, and checkout
echo.
echo For detailed instructions, see:
echo - READ_ME_FIRST_DEPLOYMENT_FIX.md
echo - DEPLOYMENT_GUIDE.md
echo.
pause
