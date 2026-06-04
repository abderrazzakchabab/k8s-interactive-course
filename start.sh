#!/bin/bash
# Kubernetes 101 Interactive Course - Startup Script

echo "╔══════════════════════════════════════════╗"
echo "║   Kubernetes 101 Interactive Course      ║"
echo "║   Start Script                           ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Check for Docker
if command -v docker &> /dev/null; then
    echo "✓ Docker is available"
else
    echo "⚠ Docker not found - terminal features will be limited"
fi

# Check for kubectl
if command -v kubectl &> /dev/null; then
    echo "✓ kubectl is available"
    echo "  $(kubectl version --client 2>/dev/null | head -1)"
else
    echo "⚠ kubectl not found"
fi

# Check for minikube
if command -v minikube &> /dev/null; then
    echo "✓ minikube is available"
else
    echo "⚠ minikube not found - some advanced features may not work"
fi

echo ""
echo "🚀 Starting the Kubernetes Learning App..."
echo ""

# Option 1: Docker Compose (recommended for full features)
if [ "$1" = "--docker" ]; then
    echo "Starting with Docker Compose..."
    docker compose up --build -d
    echo "✓ App started on http://localhost:3000"
    echo "  Terminal backend on http://localhost:7682"
    exit 0
fi

# Option 2: Docker terminal container + direct dev server
if command -v docker &> /dev/null; then
    echo "Setting up terminal container..."
    docker rm -f k8s-learn-terminal 2>/dev/null
    docker run -d --name k8s-learn-terminal \
        --network host \
        -v ~/.kube:/root/.kube:ro \
        -v /var/run/docker.sock:/var/run/docker.sock \
        bitnami/kubectl:latest tail -f /dev/null 2>/dev/null && \
    echo "✓ Terminal container ready" || \
    echo "⚠ Could not start terminal container"
fi

# Check if port 3000 is available, use alternative
PORT=3000
if lsof -Pi :$PORT -sTCP:LISTEN -t &>/dev/null; then
    PORT=3001
    echo "⚠ Port 3000 is in use, using port $PORT"
fi

echo ""
echo "📚 Starting Next.js dev server..."
echo "   http://localhost:$PORT"
echo ""
npx next dev -p $PORT
