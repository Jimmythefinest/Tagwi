#!/usr/bin/env bash
# start.sh – starts the backend API and a static frontend server

# Colors
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}Starting BugByte Savara...${NC}"

# Start backend
echo -e "${GREEN}[Backend]${NC} http://localhost:5000"
node backend/server.js &
BACKEND_PID=$!

# Start frontend static server
echo -e "${GREEN}[Frontend]${NC} http://localhost:3000"
npx -y serve frontend -p 3000 &
FRONTEND_PID=$!

echo ""
echo "Press Ctrl+C to stop both servers."

# Trap Ctrl+C and kill both processes
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

# Wait for both
wait $BACKEND_PID $FRONTEND_PID
