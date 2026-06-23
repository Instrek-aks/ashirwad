@echo off
echo ===================================================
echo Ashirwad - WebP Image Conversion Script
echo ===================================================
echo.
echo Step 1: Installing dependencies (this will install sharp if missing)...
call npm install
echo.
echo Step 2: Running conversion script...
call npm run convert-images
echo.
echo ===================================================
echo Image conversion and code reference updates complete!
echo ===================================================
pause
