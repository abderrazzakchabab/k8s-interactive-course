#!/bin/bash
set -e
CLUSTER_NAME="${1:-k8s-learn}"
echo "╔══════════════════════════════════════════╗"
echo "║   Setting up Kubernetes Learning Cluster ║"
echo "╚══════════════════════════════════════════╝"
if ! command -v kind &> /dev/null; then
    echo "📥 Installing kind..."
    curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.24.0/kind-linux-amd64
    chmod +x /usr/local/bin/kind
fi
if kind get clusters 2>/dev/null | grep -q "^${CLUSTER_NAME}$"; then
    echo "✓ Cluster '${CLUSTER_NAME}' already exists"
    exit 0
fi
cat > /tmp/kind-config-${CLUSTER_NAME}.yaml << 'KINDEOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 30000
        hostPort: 30000
      - containerPort: 30001
        hostPort: 30001
      - containerPort: 30002
        hostPort: 30002
KINDEOF
echo "🚀 Creating cluster '${CLUSTER_NAME}'..."
kind create cluster --name "${CLUSTER_NAME}" --config /tmp/kind-config-${CLUSTER_NAME}.yaml --wait 60s
echo ""
echo "✅ Cluster ready!"
kubectl cluster-info
echo ""
echo "📊 Nodes:"
kubectl get nodes
