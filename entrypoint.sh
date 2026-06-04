#!/bin/bash
# Terminal container entrypoint

echo "╔══════════════════════════════════════════╗"
echo "║   Kubernetes Learning Terminal           ║"
echo "║   Type 'kubectl' commands to get started ║"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "kubectl version: $(kubectl version --client 2>/dev/null | head -1)"
echo ""

exec "$@"
