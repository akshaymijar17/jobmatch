#!/bin/bash
set -e

# Kill any process running on port 8000 (Backend)
lsof -ti :8000 | xargs kill -9 2>/dev/null || true

# Kill any process running on port 5173 (Frontend)
lsof -ti :5173 | xargs kill -9 2>/dev/null || true

echo "Starting Backend..."
cd backend
# Check if venv exists
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "Creating venv..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

uvicorn main:app --reload --port 8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID $BACKEND_PID"
cd ..

echo "Starting Frontend..."
cd frontend
npm install # ensure deps are installed
npm run dev -- --port 5173 > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend started with PID $FRONTEND_PID"
cd ..

echo "App is running!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
