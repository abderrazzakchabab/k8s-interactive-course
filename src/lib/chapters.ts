import { Chapter, QuizQuestion, Exercise, Diagram } from './types';

// ============================
// SVG DIAGRAMS
// ============================

export const diagrams: Diagram[] = [
  {
    id: "k8s-architecture",
    title: "Kubernetes Architecture Overview",
    type: "architecture",
    caption: "High-level Kubernetes architecture showing Control Plane and Worker Nodes",
    svg: `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#326CE5"/>
          <stop offset="100%" stop-color="#2957C4"/>
        </linearGradient>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00B4D8"/>
          <stop offset="100%" stop-color="#0077B6"/>
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="800" height="500" rx="12" fill="#1e1e2e"/>
      <!-- Title -->
      <text x="400" y="35" text-anchor="middle" fill="white" font-size="18" font-weight="bold">Kubernetes Cluster Architecture</text>
      <!-- Control Plane Box -->
      <rect x="50" y="55" width="700" height="180" rx="10" fill="#1a1a2e" stroke="#326CE5" stroke-width="2" stroke-dasharray="6,3"/>
      <text x="400" y="80" text-anchor="middle" fill="#326CE5" font-size="14" font-weight="bold">CONTROL PLANE</text>
      <!-- API Server -->
      <rect x="80" y="100" width="140" height="50" rx="8" fill="url(#cpGrad)"/>
      <text x="150" y="130" text-anchor="middle" fill="white" font-size="12" font-weight="bold">kube-apiserver</text>
      <!-- Scheduler -->
      <rect x="240" y="100" width="140" height="50" rx="8" fill="url(#cpGrad)"/>
      <text x="310" y="130" text-anchor="middle" fill="white" font-size="12" font-weight="bold">kube-scheduler</text>
      <!-- Controller Manager -->
      <rect x="400" y="100" width="160" height="50" rx="8" fill="url(#cpGrad)"/>
      <text x="480" y="130" text-anchor="middle" fill="white" font-size="12" font-weight="bold">controller-manager</text>
      <!-- etcd -->
      <rect x="580" y="100" width="140" height="50" rx="8" fill="url(#cpGrad)"/>
      <text x="650" y="130" text-anchor="middle" fill="white" font-size="12" font-weight="bold">etcd (cluster store)</text>
      <!-- Labels -->
      <text x="150" y="170" text-anchor="middle" fill="#888" font-size="10">API & RBAC</text>
      <text x="310" y="170" text-anchor="middle" fill="#888" font-size="10">Pod Scheduling</text>
      <text x="480" y="170" text-anchor="middle" fill="#888" font-size="10">Controllers (Deployments, etc.)</text>
      <text x="650" y="170" text-anchor="middle" fill="#888" font-size="10">Key-Value Store</text>

      <!-- Worker Node 1 -->
      <rect x="50" y="260" width="340" height="210" rx="10" fill="#1a1a2e" stroke="#00B4D8" stroke-width="2"/>
      <text x="220" y="285" text-anchor="middle" fill="#00B4D8" font-size="13" font-weight="bold">WORKER NODE 1</text>
      <!-- Pods -->
      <rect x="70" y="300" width="140" height="40" rx="6" fill="url(#nodeGrad)"/>
      <text x="140" y="325" text-anchor="middle" fill="white" font-size="11">POD: app-v1 (container)</text>
      <rect x="70" y="350" width="140" height="40" rx="6" fill="url(#nodeGrad)"/>
      <text x="140" y="375" text-anchor="middle" fill="white" font-size="11">POD: app-v2 (container)</text>
      <!-- kubelet -->
      <rect x="240" y="300" width="130" height="40" rx="6" fill="#0077B6"/>
      <text x="305" y="325" text-anchor="middle" fill="white" font-size="11">kubelet agent</text>
      <!-- kube-proxy -->
      <rect x="240" y="350" width="130" height="40" rx="6" fill="#0077B6"/>
      <text x="305" y="375" text-anchor="middle" fill="white" font-size="11">kube-proxy</text>
      <text x="220" y="430" text-anchor="middle" fill="#888" font-size="10">Container Runtime (containerd/Docker)</text>

      <!-- Worker Node 2 -->
      <rect x="410" y="260" width="340" height="210" rx="10" fill="#1a1a2e" stroke="#00B4D8" stroke-width="2"/>
      <text x="580" y="285" text-anchor="middle" fill="#00B4D8" font-size="13" font-weight="bold">WORKER NODE 2</text>
      <rect x="430" y="300" width="140" height="40" rx="6" fill="url(#nodeGrad)"/>
      <text x="500" y="325" text-anchor="middle" fill="white" font-size="11">POD: app-v3 (container)</text>
      <rect x="430" y="350" width="140" height="40" rx="6" fill="url(#nodeGrad)"/>
      <text x="500" y="375" text-anchor="middle" fill="white" font-size="11">POD: log-agent</text>
      <rect x="600" y="300" width="130" height="40" rx="6" fill="#0077B6"/>
      <text x="665" y="325" text-anchor="middle" fill="white" font-size="11">kubelet agent</text>
      <rect x="600" y="350" width="130" height="40" rx="6" fill="#0077B6"/>
      <text x="665" y="375" text-anchor="middle" fill="white" font-size="11">kube-proxy</text>
      <text x="580" y="430" text-anchor="middle" fill="#888" font-size="10">Container Runtime (containerd/Docker)</text>
    </svg>`
  },
  {
    id: "deployment-rollout",
    title: "Deployment & Rolling Update",
    type: "flow",
    caption: "How a Deployment manages Pods and performs rolling updates",
    svg: `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#326CE5"/>
          <stop offset="100%" stop-color="#2957C4"/>
        </linearGradient>
        <linearGradient id="pGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00B4D8"/>
          <stop offset="100%" stop-color="#0096C7"/>
        </linearGradient>
        <linearGradient id="pGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#06D6A0"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="800" height="400" rx="12" fill="#1e1e2e"/>
      <text x="400" y="30" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Deployment & Rolling Update Flow</text>

      <!-- Deployment -->
      <rect x="300" y="50" width="200" height="50" rx="8" fill="url(#dGrad)"/>
      <text x="400" y="80" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Deployment (v2)</text>
      <text x="400" y="115" text-anchor="middle" fill="#888" font-size="11">Desired: 3 replicas</text>

      <!-- Down arrow -->
      <polygon points="400,125 390,140 410,140" fill="#326CE5"/>
      <line x1="400" y1="115" x2="400" y2="140" stroke="#326CE5" stroke-width="2"/>

      <!-- ReplicaSet -->
      <rect x="310" y="145" width="180" height="40" rx="8" fill="#E76F51"/>
      <text x="400" y="170" text-anchor="middle" fill="white" font-size="12" font-weight="bold">ReplicaSet (v2)</text>

      <!-- Down arrows to pods -->
      <polygon points="250,195 240,210 260,210" fill="#E76F51"/>
      <polygon points="400,195 390,210 410,210" fill="#E76F51"/>
      <polygon points="550,195 540,210 560,210" fill="#E76F51"/>
      <line x1="250" y1="185" x2="250" y2="195" stroke="#E76F51" stroke-width="2"/>
      <line x1="400" y1="185" x2="400" y2="195" stroke="#E76F51" stroke-width="2"/>
      <line x1="550" y1="185" x2="550" y2="195" stroke="#E76F51" stroke-width="2"/>

      <!-- Pods Row -->
      <rect x="180" y="215" width="140" height="45" rx="6" fill="url(#pGrad2)"/>
      <text x="250" y="235" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Pod: app-v2 (Ready)</text>
      <text x="250" y="250" text-anchor="middle" fill="#ddd" font-size="9">Node 1</text>

      <rect x="330" y="215" width="140" height="45" rx="6" fill="url(#pGrad2)"/>
      <text x="400" y="235" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Pod: app-v2 (Ready)</text>
      <text x="400" y="250" text-anchor="middle" fill="#ddd" font-size="9">Node 2</text>

      <rect x="480" y="215" width="140" height="45" rx="6" fill="url(#pGrad2)"/>
      <text x="550" y="235" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Pod: app-v2 (Ready)</text>
      <text x="550" y="250" text-anchor="middle" fill="#ddd" font-size="9">Node 3</text>

      <!-- Service -->
      <rect x="280" y="290" width="240" height="45" rx="25" fill="#7209B7" opacity="0.9"/>
      <text x="400" y="310" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Service (LoadBalancer)</text>
      <text x="400" y="325" text-anchor="middle" fill="#ddd" font-size="10">Cluster-IP: 10.96.0.1 → Port 80</text>

      <!-- Arrows from service to pods -->
      <line x1="250" y1="290" x2="250" y2="260" stroke="#7209B7" stroke-width="1.5" stroke-dasharray="4,2"/>
      <line x1="400" y1="290" x2="400" y2="260" stroke="#7209B7" stroke-width="1.5" stroke-dasharray="4,2"/>
      <line x1="550" y1="290" x2="550" y2="260" stroke="#7209B7" stroke-width="1.5" stroke-dasharray="4,2"/>

      <!-- Ingress -->
      <rect x="310" y="355" width="180" height="35" rx="6" fill="#F77F00" opacity="0.9"/>
      <text x="400" y="377" text-anchor="middle" fill="white" font-size="11" font-weight="bold">Ingress → myapp.example.com</text>
      <line x1="400" y1="355" x2="400" y2="335" stroke="#F77F00" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: "services",
    title: "Kubernetes Service Types",
    type: "comparison",
    caption: "Different Service types and how they expose applications",
    svg: `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#06D6A0"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
        <linearGradient id="sGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#326CE5"/>
          <stop offset="100%" stop-color="#2957C4"/>
        </linearGradient>
        <linearGradient id="sGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F77F00"/>
          <stop offset="100%" stop-color="#E76F51"/>
        </linearGradient>
      </defs>
      <rect width="800" height="380" rx="12" fill="#1e1e2e"/>
      <text x="400" y="30" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Kubernetes Service Types</text>

      <!-- ClusterIP -->
      <rect x="30" y="55" width="230" height="300" rx="10" fill="#1a1a2e" stroke="#06D6A0" stroke-width="1.5"/>
      <rect x="30" y="55" width="230" height="40" rx="10" fill="url(#sGrad1)"/>
      <text x="145" y="80" text-anchor="middle" fill="white" font-size="12" font-weight="bold">ClusterIP</text>
      <text x="145" y="115" text-anchor="middle" fill="#06D6A0" font-size="11">Internal Cluster Access</text>
      <rect x="50" y="130" width="90" height="35" rx="5" fill="#1e1e2e" stroke="#06D6A0" stroke-width="1"/>
      <text x="95" y="152" text-anchor="middle" fill="white" font-size="10">Pod A</text>
      <rect x="150" y="130" width="90" height="35" rx="5" fill="#1e1e2e" stroke="#06D6A0" stroke-width="1"/>
      <text x="195" y="152" text-anchor="middle" fill="white" font-size="10">Pod B</text>
      <text x="145" y="200" text-anchor="middle" fill="#888" font-size="10">kubectl get svc</text>
      <text x="145" y="218" text-anchor="middle" fill="#888" font-size="10">10.96.0.1:80</text>
      <rect x="60" y="240" width="170" height="35" rx="5" fill="url(#sGrad1)" opacity="0.7"/>
      <text x="145" y="262" text-anchor="middle" fill="white" font-size="10">curl 10.96.0.1:80</text>
      <text x="145" y="300" text-anchor="middle" fill="#666" font-size="9">✓ Internal only</text>
      <text x="145" y="318" text-anchor="middle" fill="#666" font-size="9">✗ No external access</text>

      <!-- NodePort -->
      <rect x="280" y="55" width="230" height="300" rx="10" fill="#1a1a2e" stroke="#326CE5" stroke-width="1.5"/>
      <rect x="280" y="55" width="230" height="40" rx="10" fill="url(#sGrad2)"/>
      <text x="395" y="80" text-anchor="middle" fill="white" font-size="12" font-weight="bold">NodePort</text>
      <text x="395" y="115" text-anchor="middle" fill="#326CE5" font-size="11">External Access via Node IP</text>
      <rect x="300" y="130" width="90" height="35" rx="5" fill="#1e1e2e" stroke="#326CE5" stroke-width="1"/>
      <text x="345" y="152" text-anchor="middle" fill="white" font-size="10">Pod A</text>
      <rect x="400" y="130" width="90" height="35" rx="5" fill="#1e1e2e" stroke="#326CE5" stroke-width="1"/>
      <text x="445" y="152" text-anchor="middle" fill="white" font-size="10">Pod B</text>
      <rect x="300" y="190" width="190" height="35" rx="5" fill="url(#sGrad2)" opacity="0.7"/>
      <text x="395" y="212" text-anchor="middle" fill="white" font-size="10">NodeIP:30007 → Service:80</text>
      <rect x="320" y="250" width="150" height="35" rx="5" fill="#F77F00"/>
      <text x="395" y="272" text-anchor="middle" fill="white" font-size="10">curl nodeIP:30007</text>
      <text x="395" y="310" text-anchor="middle" fill="#666" font-size="9">✓ External access</text>
      <text x="395" y="328" text-anchor="middle" fill="#666" font-size="9">✓ Port range: 30000-32767</text>

      <!-- LoadBalancer -->
      <rect x="530" y="55" width="240" height="300" rx="10" fill="#1a1a2e" stroke="#F77F00" stroke-width="1.5"/>
      <rect x="530" y="55" width="240" height="40" rx="10" fill="url(#sGrad3)"/>
      <text x="650" y="80" text-anchor="middle" fill="white" font-size="12" font-weight="bold">LoadBalancer</text>
      <text x="650" y="115" text-anchor="middle" fill="#F77F00" font-size="11">Cloud LB → External IP</text>
      <rect x="550" y="130" width="90" height="35" rx="5" fill="#1e1e2e" stroke="#F77F00" stroke-width="1"/>
      <text x="595" y="152" text-anchor="middle" fill="white" font-size="10">Pod A</text>
      <rect x="650" y="130" width="90" height="35" rx="5" fill="#1e1e2e" stroke="#F77F00" stroke-width="1"/>
      <text x="695" y="152" text-anchor="middle" fill="white" font-size="10">Pod B</text>
      <rect x="555" y="190" width="190" height="35" rx="5" fill="url(#sGrad3)" opacity="0.7"/>
      <text x="650" y="212" text-anchor="middle" fill="white" font-size="10">EXTERNAL-IP: 203.0.113.1</text>
      <rect x="575" y="250" width="150" height="35" rx="5" fill="#06D6A0"/>
      <text x="650" y="272" text-anchor="middle" fill="white" font-size="10">curl external-IP</text>
      <text x="650" y="310" text-anchor="middle" fill="#666" font-size="9">✓ Cloud LB (AWS/GCP/Azure)</text>
      <text x="650" y="328" text-anchor="middle" fill="#666" font-size="9">✓ Production ready</text>
    </svg>`
  },
  {
    id: "scaling",
    title: "Horizontal Pod Autoscaling",
    type: "timeline",
    caption: "How HPA automatically scales pods based on CPU/memory metrics",
    svg: `<svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="upGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#EF476F"/>
          <stop offset="100%" stop-color="#D90429"/>
        </linearGradient>
        <linearGradient id="downGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#06D6A0"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="800" height="350" rx="12" fill="#1e1e2e"/>
      <text x="400" y="30" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Horizontal Pod Autoscaling (HPA)</text>

      <!-- Timeline line -->
      <line x1="50" y1="180" x2="750" y2="180" stroke="#555" stroke-width="2"/>
      <polygon points="750,180 740,175 740,185" fill="#555"/>

      <!-- Step 1: Low load -->
      <rect x="50" y="60" width="120" height="40" rx="8" fill="url(#downGrad)" opacity="0.7"/>
      <text x="110" y="85" text-anchor="middle" fill="white" font-size="10" font-weight="bold">2 Pods (Low Load)</text>
      <circle cx="110" cy="140" r="4" fill="#06D6A0"/>
      <line x1="110" y1="100" x2="110" y2="140" stroke="#06D6A0" stroke-width="1.5"/>
      <text x="110" y="160" text-anchor="middle" fill="#888" font-size="9">CPU: 30%</text>

      <!-- Arrow -->
      <polygon points="180,175 190,180 180,185" fill="#555"/>

      <!-- Step 2: Load increases -->
      <rect x="200" y="60" width="120" height="40" rx="8" fill="#F77F00" opacity="0.8"/>
      <text x="260" y="78" text-anchor="middle" fill="white" font-size="9" font-weight="bold">2 Pods (High Load)</text>
      <text x="260" y="92" text-anchor="middle" fill="#F77F00" font-size="8">CPU: 85% > 50% threshold</text>
      <circle cx="260" cy="140" r="4" fill="#F77F00"/>
      <line x1="260" y1="100" x2="260" y2="140" stroke="#F77F00" stroke-width="1.5"/>
      <text x="260" y="160" text-anchor="middle" fill="#888" font-size="9">CPU: 85% ↑</text>

      <!-- Arrow -->
      <polygon points="330,175 340,180 330,185" fill="#555"/>

      <!-- Step 3: Scale up -->
      <rect x="350" y="55" width="120" height="50" rx="8" fill="#E76F51"/>
      <text x="410" y="75" text-anchor="middle" fill="white" font-size="9" font-weight="bold">HPA Triggers</text>
      <text x="410" y="92" text-anchor="middle" fill="#E76F51" font-size="8">Scale up to 4 pods</text>
      <circle cx="410" cy="140" r="4" fill="#E76F51"/>
      <line x1="410" y1="105" x2="410" y2="140" stroke="#E76F51" stroke-width="1.5"/>

      <!-- Arrow -->
      <polygon points="480,175 490,180 480,185" fill="#555"/>

      <!-- Step 4: Scaled -->
      <rect x="500" y="60" width="120" height="40" rx="8" fill="url(#upGrad)" opacity="0.8"/>
      <text x="560" y="78" text-anchor="middle" fill="white" font-size="9" font-weight="bold">4 Pods (Stable)</text>
      <text x="560" y="92" text-anchor="middle" fill="#EF476F" font-size="8">Load balanced across 4</text>
      <circle cx="560" cy="140" r="4" fill="#EF476F"/>
      <line x1="560" y1="100" x2="560" y2="140" stroke="#EF476F" stroke-width="1.5"/>
      <text x="560" y="160" text-anchor="middle" fill="#888" font-size="9">CPU: 40% ✓</text>

      <!-- Arrow -->
      <polygon points="630,175 640,180 630,185" fill="#555"/>

      <!-- Step 5: Scale down -->
      <rect x="640" y="60" width="110" height="40" rx="8" fill="url(#downGrad)" opacity="0.7"/>
      <text x="695" y="78" text-anchor="middle" fill="white" font-size="9" font-weight="bold">Scale Down</text>
      <text x="695" y="92" text-anchor="middle" fill="#06D6A0" font-size="8">Back to 3 pods</text>
      <circle cx="695" cy="140" r="4" fill="#06D6A0"/>
      <line x1="695" y1="100" x2="695" y2="140" stroke="#06D6A0" stroke-width="1.5"/>
      <text x="695" y="160" text-anchor="middle" fill="#888" font-size="9">CPU: 25% ↓</text>

      <!-- Legend -->
      <rect x="200" y="220" width="400" height="110" rx="8" fill="#1a1a2e" stroke="#333" stroke-width="1"/>
      <text x="400" y="245" text-anchor="middle" fill="white" font-size="11" font-weight="bold">HPA Configuration</text>
      <text x="220" y="268" fill="#888" font-size="10">kubectl autoscale deployment myapp --cpu-percent=50 --min=2 --max=10</text>
      <text x="220" y="290" fill="#888" font-size="10">📈 Scale-up condition: CPU > 50% for 3 minutes</text>
      <text x="220" y="312" fill="#888" font-size="10">📉 Scale-down condition: CPU < 50% for 5 minutes</text>
    </svg>`
  }
];

// ============================
// CHAPTERS
// ============================

export const chapters: Chapter[] = [
  {
    id: "ch1-introduction",
    number: 1,
    title: "Introduction to Kubernetes",
    subtitle: "Understanding Container Orchestration",
    duration: "45 min",
    sections: [
      {
        title: "What is Kubernetes?",
        content: `Kubernetes (also known as K8s or "kube") is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.

**Why Kubernetes?**
- **Self-healing**: Automatically restarts failed containers
- **Scaling**: Scales apps up/down based on demand
- **Rolling updates**: Updates apps without downtime
- **Service discovery**: Automatically finds and connects services
- **Storage orchestration**: Mounts storage systems of your choice
- **Secret & config management**: Manages sensitive data and configs

**Key Concepts:**
- **Cluster**: A set of worker machines (nodes) that run containerized applications
- **Node**: A worker machine in Kubernetes (physical or virtual)
- **Pod**: The smallest deployable unit in K8s (group of one or more containers)
- **Service**: An abstraction that exposes a set of pods as a network service`,
        codeExample: `# Check Kubernetes version
kubectl version --client

# Check cluster info
kubectl cluster-info

# List all nodes in the cluster
kubectl get nodes`,
        diagramId: "k8s-architecture"
      },
      {
        title: "Kubernetes Architecture",
        content: `A Kubernetes cluster consists of **Control Plane** and **Worker Nodes**.

**Control Plane Components:**
- **kube-apiserver**: The front-end to the control plane. All administrative tasks go through this.
- **etcd**: Distributed key-value store that maintains cluster state and configuration.
- **kube-scheduler**: Watches for newly created pods and assigns them to nodes.
- **kube-controller-manager**: Runs controller processes like node controller, replication controller.

**Worker Node Components:**
- **kubelet**: Agent that runs on each node and ensures containers are running in a pod.
- **kube-proxy**: Network proxy that maintains network rules and load balancing.
- **Container Runtime**: Software that runs containers (Docker, containerd, CRI-O).`,
        codeExample: `# View control plane components
kubectl get pods -n kube-system

# Get detailed node information
kubectl describe nodes

# View component statuses
kubectl get componentstatuses`,
        diagramId: "k8s-architecture"
      },
      {
        title: "Core Objects & Resources",
        content: `Kubernetes uses YAML or JSON manifests to declare desired state.

**Core Resources:**
- **Pod**: Basic execution unit (one or more containers)
- **Deployment**: Declarative update for Pods & ReplicaSets
- **Service**: Network abstraction exposing Pods
- **ConfigMap**: Configuration data
- **Secret**: Sensitive data (passwords, tokens)
- **Volume**: Storage that outlives containers
- **Namespace**: Virtual cluster isolation

**Declarative Model:**
Write a YAML file describing the desired state, then apply it.`,
        codeExample: `# Apply a YAML manifest
kubectl apply -f pod.yaml

# Get running pods
kubectl get pods

# Get all resources in the cluster
kubectl get all`,
        diagramId: "k8s-architecture"
      }
    ],
    quiz: [
      {
        id: "ch1-q1",
        question: "What is the smallest deployable unit in Kubernetes?",
        options: ["Node", "Pod", "Container", "Service"],
        correctIndex: 1,
        explanation: "A Pod is the smallest and simplest unit in Kubernetes. It represents a group of one or more containers with shared storage/network."
      },
      {
        id: "ch1-q2",
        question: "Which component serves as the front-end to the Kubernetes control plane?",
        options: ["etcd", "kube-scheduler", "kube-apiserver", "kubelet"],
        correctIndex: 2,
        explanation: "kube-apiserver is the front-end to the control plane. All REST commands go through the API server."
      },
      {
        id: "ch1-q3",
        question: "What does the 'kubelet' do?",
        options: ["Acts as a network proxy on each node", "An agent that runs on each node and ensures containers are running", "Assigns pods to nodes", "Stores cluster state"],
        correctIndex: 1,
        explanation: "kubelet is an agent running on each node that ensures containers are running in a Pod as expected."
      },
      {
        id: "ch1-q4",
        question: "What format is typically used to define Kubernetes objects?",
        options: ["JSON only", "YAML or JSON", "XML", "TOML"],
        correctIndex: 1,
        explanation: "Kubernetes uses YAML or JSON for object definitions. YAML is more human-readable and commonly used."
      }
    ],
    exercises: [
      {
        id: "ch1-ex1",
        title: "Explore Your Cluster",
        description: "Get familiar with kubectl commands to inspect your cluster.",
        instruction: "Run kubectl commands to get information about your cluster including nodes, services, and pods in the kube-system namespace.",
        hint: "Use: kubectl get nodes | kubectl get pods -n kube-system | kubectl cluster-info",
        solution: "kubectl get nodes\nkubectl get pods -n kube-system\nkubectl cluster-info",
        initialCommand: "kubectl get nodes",
        expectedOutput: "NAME\\s+STATUS\\s+ROLES\\s+AGE\\s+VERSION",
        verificationCommand: "kubectl get pods -n kube-system"
      },
      {
        id: "ch1-ex2",
        title: "Create Your First Pod",
        description: "Create a simple Nginx pod and verify it's running.",
        instruction: "Create a pod named 'my-nginx' using the nginx:latest image. Verify it's running by listing pods.",
        hint: "kubectl run my-nginx --image=nginx:latest",
        solution: "kubectl run my-nginx --image=nginx:latest\nkubectl get pods",
        initialCommand: "kubectl run my-nginx --image=nginx:latest",
        expectedOutput: "pod/my-nginx created",
        verificationCommand: "kubectl get pods my-nginx"
      }
    ]
  },
  {
    id: "ch2-deployments",
    number: 2,
    title: "Deployments & Applications",
    subtitle: "Running and Managing Applications",
    duration: "50 min",
    sections: [
      {
        title: "Understanding Deployments",
        content: `A **Deployment** is a Kubernetes resource that provides declarative updates to applications. It manages ReplicaSets and Pods.

**Why Deployments?**
- **Rolling updates**: Update pods gradually without downtime
- **Rollback**: Revert to a previous version
- **Self-healing**: Maintains desired number of replicas
- **Scaling**: Easily scale applications up or down

**Deployment YAML Structure:**
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.19
        ports:
        - containerPort: 80
\`\`\`

The **selector** tells the Deployment which pods to manage. The **template** defines what pods to create.`,
        codeExample: `# Create a deployment
kubectl create deployment nginx --image=nginx:1.19 --replicas=3

# Get deployments
kubectl get deployments

# Describe deployment (detailed info)
kubectl describe deployment nginx`,
        diagramId: "deployment-rollout"
      },
      {
        title: "Rolling Updates & Rollbacks",
        content: `Kubernetes supports zero-downtime deployments through **rolling updates**.

**Rolling Update Strategy:**
1. Create new ReplicaSet with updated Pods
2. Gradually increase new Pods while decreasing old ones
3. Monitor health checks during transitions
4. Rollback immediately if issues detected

**Update Commands:**
\`\`\`bash
# Update image
kubectl set image deployment/nginx nginx=nginx:1.20

# Check rollout status
kubectl rollout status deployment/nginx

# View rollout history
kubectl rollout history deployment/nginx

# Rollback to previous version
kubectl rollout undo deployment/nginx
\`\`\`

**Key Parameters:**
- **maxSurge**: How many extra pods can be created during update
- **maxUnavailable**: How many pods can be unavailable during update`,
        codeExample: `# Update deployment image
kubectl set image deployment/nginx nginx=nginx:1.20

# Check rollout status
kubectl rollout status deployment/nginx

# Rollback if something goes wrong
kubectl rollout undo deployment/nginx`,
        diagramId: "deployment-rollout"
      }
    ],
    quiz: [
      {
        id: "ch2-q1",
        question: "What Kubernetes resource provides declarative updates to applications?",
        options: ["Pod", "Service", "Deployment", "ReplicaSet"],
        correctIndex: 2,
        explanation: "A Deployment provides declarative updates to applications, managing ReplicaSets and Pods."
      },
      {
        id: "ch2-q2",
        question: "What is the command to rollback a deployment to the previous version?",
        options: ["kubectl rollback deployment/nginx", "kubectl rollout undo deployment/nginx", "kubectl deployment revert nginx", "kubectl undo deployment nginx"],
        correctIndex: 1,
        explanation: "kubectl rollout undo deployment/nginx rolls back to the previous version."
      },
      {
        id: "ch2-q3",
        question: "What does 'maxSurge' control in a rolling update?",
        options: ["Maximum pods that can be unavailable", "Maximum extra pods created during update", "Maximum replicas in deployment", "Maximum restarts per pod"],
        correctIndex: 1,
        explanation: "maxSurge defines how many extra pods can be created during a rolling update (beyond desired count)."
      }
    ],
    exercises: [
      {
        id: "ch2-ex1",
        title: "Create and Scale a Deployment",
        description: "Create an Nginx deployment and scale it up.",
        instruction: "Create a deployment named 'web-app' with image nginx:alpine, then scale it from 1 to 3 replicas.",
        hint: "kubectl create deployment web-app --image=nginx:alpine\nkubectl scale deployment web-app --replicas=3",
        solution: "kubectl create deployment web-app --image=nginx:alpine\nkubectl scale deployment web-app --replicas=3\nkubectl get pods",
        initialCommand: "kubectl create deployment web-app --image=nginx:alpine",
        expectedOutput: "deployment.apps/web-app created",
        verificationCommand: "kubectl get deployment web-app"
      },
      {
        id: "ch2-ex2",
        title: "Perform a Rolling Update",
        description: "Update a deployment and check its rollout status.",
        instruction: "Update the 'web-app' deployment to nginx:1.25-alpine, check the rollout status, then view the rollout history.",
        hint: "kubectl set image deployment/web-app nginx=nginx:1.25-alpine\nkubectl rollout status deployment/web-app\nkubectl rollout history deployment/web-app",
        solution: "kubectl set image deployment/web-app nginx=nginx:1.25-alpine\nkubectl rollout status deployment/web-app\nkubectl rollout history deployment/web-app",
        initialCommand: "kubectl set image deployment/web-app nginx=nginx:1.25-alpine",
        expectedOutput: "deployment.apps/web-app image updated",
        verificationCommand: "kubectl rollout status deployment/web-app"
      }
    ]
  },
  {
    id: "ch3-services",
    number: 3,
    title: "Services & Networking",
    subtitle: "Connecting and Exposing Applications",
    duration: "50 min",
    sections: [
      {
        title: "Service Types",
        content: `A **Service** is an abstraction that exposes a set of Pods as a network service.

**Service Types (from internal to external):**

1. **ClusterIP** (default) - Internal cluster IP
   - Accessible only within the cluster
   - Used for internal service-to-service communication

2. **NodePort** - External access via node IP + port
   - Opens a port on every node (30000-32767)
   - Traffic forwarded to ClusterIP then Pods

3. **LoadBalancer** - Cloud load balancer
   - Integrates with cloud provider's LB (AWS ELB, GCP LB)
   - Each service gets its own external IP

4. **ExternalName** - Maps to DNS CNAME`,
        codeExample: `# Expose a deployment as a service
kubectl expose deployment web-app --type=ClusterIP --port=80 --target-port=80

# Get services
kubectl get services

# Access service internally
kubectl run test-pod --rm -it --image=busybox -- /bin/sh -c 'wget -qO- web-app:80'`,
        diagramId: "services"
      },
      {
        title: "Service Discovery & DNS",
        content: `Kubernetes provides built-in **DNS-based service discovery** via CoreDNS.

**How DNS Works in Kubernetes:**
- Every Service gets a DNS name: \`<service>.<namespace>.svc.cluster.local\`
- Pods within the same namespace can reach services by just their name
- CoreDNS runs as a cluster add-on

**Ingress Controller:**
Ingress manages external HTTP/HTTPS access to services:
- Path-based routing: \`example.com/api → api-service\`
- Host-based routing: \`api.example.com → api-service\`
- TLS/SSL termination
- Rate limiting and authentication`,
        codeExample: `# Create an Ingress
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app
            port:
              number: 80
EOF

# Get ingress
kubectl get ingress`,
        diagramId: "services"
      }
    ],
    quiz: [
      {
        id: "ch3-q1",
        question: "What is the default Service type in Kubernetes?",
        options: ["NodePort", "LoadBalancer", "ClusterIP", "ExternalName"],
        correctIndex: 2,
        explanation: "ClusterIP is the default Service type. It exposes the service on a cluster-internal IP."
      },
      {
        id: "ch3-q2",
        question: "What port range does NodePort use?",
        options: ["20000-30000", "30000-32767", "1024-65535", "80-443"],
        correctIndex: 1,
        explanation: "NodePort assigns a port in the range 30000-32767 on each node."
      },
      {
        id: "ch3-q3",
        question: "Which component provides DNS-based service discovery in Kubernetes?",
        options: ["kube-proxy", "CoreDNS", "etcd", "kube-dns-manager"],
        correctIndex: 1,
        explanation: "CoreDNS provides DNS-based service discovery in modern Kubernetes clusters."
      }
    ],
    exercises: [
      {
        id: "ch3-ex1",
        title: "Expose an Application",
        description: "Create a service for your deployment.",
        instruction: "Expose the 'web-app' deployment on port 80 using NodePort type, then verify the service was created.",
        hint: "kubectl expose deployment web-app --type=NodePort --port=80",
        solution: "kubectl expose deployment web-app --type=NodePort --port=80\nkubectl get svc web-app",
        initialCommand: "kubectl expose deployment web-app --type=NodePort --port=80",
        expectedOutput: "service/web-app exposed",
        verificationCommand: "kubectl get svc web-app"
      },
      {
        id: "ch3-ex2",
        title: "Service Discovery via DNS",
        description: "Test service discovery from another pod.",
        instruction: "Run a temporary busybox pod and use wget to access the 'web-app' service by its DNS name.",
        hint: "kubectl run test --rm -it --image=busybox -- wget -qO- http://web-app",
        solution: "kubectl run test --rm -it --image=busybox -- wget -qO- http://web-app",
        initialCommand: "kubectl run test --rm -it --image=busybox -- wget -qO- http://web-app",
        expectedOutput: "Welcome to nginx",
        verificationCommand: "kubectl get pods"
      }
    ]
  },
  {
    id: "ch4-config-secrets",
    number: 4,
    title: "Configuration & Secrets",
    subtitle: "Managing Configs and Sensitive Data",
    duration: "40 min",
    sections: [
      {
        title: "ConfigMaps",
        content: `**ConfigMaps** allow you to decouple configuration artifacts from container images.

**ConfigMap Sources:**
- Literal values
- Configuration files
- Environment files
- Directories

When you create a ConfigMap, you can inject its data into pods as:
- Environment variables
- Command-line arguments
- Volume mounts (files)`,
        codeExample: `# Create ConfigMap from literal
kubectl create configmap app-config --from-literal=APP_ENV=production --from-literal=LOG_LEVEL=info

# Create ConfigMap from file
kubectl create configmap app-config --from-file=app.properties

# Get ConfigMaps
kubectl get configmaps

# Describe ConfigMap
kubectl describe configmap app-config`
      },
      {
        title: "Secrets",
        content: `**Secrets** are similar to ConfigMaps but designed for confidential data.

**Secret Types:**
- **Opaque**: Generic key-value pairs (base64 encoded)
- **kubernetes.io/service-account-token**: Service account credentials
- **kubernetes.io/dockerconfigjson**: Docker registry credentials
- **kubernetes.io/tls**: TLS certificates

**Best Practices:**
- Use RBAC to restrict secret access
- Enable encryption at rest for secrets
- Consider external secret management (HashiCorp Vault, AWS Secrets Manager)
- Secrets are base64 encoded (not encrypted!) by default`,
        codeExample: `# Create a secret
kubectl create secret generic db-credentials --from-literal=username=admin --from-literal=password=s3cret

# Get secrets
kubectl get secrets

# Decode a secret
kubectl get secret db-credentials -o jsonpath='{.data.password}' | base64 --decode

# Use secret in a pod
kubectl run nginx --image=nginx --env="DB_USER=\$(kubectl get secret db-credentials -o jsonpath='{.data.username}' | base64 --decode)"`
      }
    ],
    quiz: [
      {
        id: "ch4-q1",
        question: "How are values in Secrets encoded?",
        options: ["AES-256 encrypted", "Base64 encoded", "SHA-256 hashed", "Plain text"],
        correctIndex: 1,
        explanation: "Secret values are base64 encoded, not encrypted. For production, enable encryption at rest."
      },
      {
        id: "ch4-q2",
        question: "Which resource is used for non-sensitive configuration data?",
        options: ["Secret", "ConfigMap", "Environment", "Volume"],
        correctIndex: 1,
        explanation: "ConfigMaps are designed for non-sensitive configuration data."
      }
    ],
    exercises: [
      {
        id: "ch4-ex1",
        title: "Create and Use a ConfigMap",
        description: "Create a ConfigMap and inject it into a pod.",
        instruction: "Create a ConfigMap named 'my-config' with key=value pairs (APP_NAME=MyApp, VERSION=1.0). Then create a pod that uses it as environment variables.",
        hint: "kubectl create configmap my-config --from-literal=APP_NAME=MyApp --from-literal=VERSION=1.0\nkubectl run config-pod --image=nginx --env-from=configmap/my-config",
        solution: "kubectl create configmap my-config --from-literal=APP_NAME=MyApp --from-literal=VERSION=1.0\nkubectl run config-pod --image=nginx --env-from=configmap/my-config",
        initialCommand: "kubectl create configmap my-config --from-literal=APP_NAME=MyApp --from-literal=VERSION=1.0",
        expectedOutput: "configmap/my-config created",
        verificationCommand: "kubectl describe configmap my-config"
      }
    ]
  },
  {
    id: "ch5-storage",
    number: 5,
    title: "Storage & Volumes",
    subtitle: "Persistent Data in Kubernetes",
    duration: "45 min",
    sections: [
      {
        title: "Volumes Overview",
        content: `Containers are ephemeral — when they restart, their filesystem is gone. **Volumes** provide persistent storage.

**Types of Volumes:**
1. **emptyDir**: Temporary storage (lives with pod)
2. **hostPath**: Node filesystem (not for production)
3. **PersistentVolume (PV)**: Cluster-wide storage
4. **PersistentVolumeClaim (PVC)**: Storage request by users
5. **ConfigMap/Secret**: Injected as files
6. **Cloud volumes**: AWS EBS, GCE PD, Azure Disk`,
        codeExample: `# Create a PersistentVolumeClaim
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
EOF

# Get PVCs
kubectl get pvc

# Get PVs
kubectl get pv`
      },
      {
        title: "PersistentVolume & PersistentVolumeClaim",
        content: `**PersistentVolume (PV):** Storage provisioned by an administrator.
**PersistentVolumeClaim (PVC):** A request for storage by a user.

**Access Modes:**
- **ReadWriteOnce (RWO)**: Read/write by one node
- **ReadOnlyMany (ROX)**: Read-only by many nodes
- **ReadWriteMany (RWX)**: Read/write by many nodes

**Lifecycle:**
1. PV is provisioned (static or dynamic)
2. User creates PVC requesting storage
3. Kubernetes binds PVC to PV
4. Pod uses PVC as a volume
5. When PVC is deleted, PV can be reclaimed (Retain/Recycle/Delete)`,
        codeExample: `# Use PVC in a Pod
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: storage-pod
spec:
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: my-pvc
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: data
EOF
kubectl get pods`
      }
    ],
    quiz: [
      {
        id: "ch5-q1",
        question: "Which Kubernetes resource represents a request for storage by a user?",
        options: ["PersistentVolume", "PersistentVolumeClaim", "StorageClass", "Volume"],
        correctIndex: 1,
        explanation: "A PersistentVolumeClaim (PVC) is a request for storage by a user, which gets bound to a PV."
      },
      {
        id: "ch5-q2",
        question: "What access mode allows read/write from multiple nodes simultaneously?",
        options: ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany", "ReadWritePod"],
        correctIndex: 2,
        explanation: "ReadWriteMany (RWX) allows read/write access from many nodes."
      }
    ],
    exercises: [
      {
        id: "ch5-ex1",
        title: "Create a PVC and Use It",
        description: "Provision persistent storage for a pod.",
        instruction: "Create a PVC named 'data-pvc' requesting 500Mi storage with ReadWriteOnce access. Then create a pod that mounts it at /data.",
        hint: "Use kubectl apply with a PVC YAML, then run a pod with volume mounts.",
        solution: "kubectl apply -f - <<EOF\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: data-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 500Mi\nEOF",
        initialCommand: "kubectl get pvc",
        expectedOutput: "No resources found",
        verificationCommand: "kubectl get storageclass"
      }
    ]
  },
  {
    id: "ch6-networking",
    number: 6,
    title: "Advanced Networking",
    subtitle: "Network Policies & CNI Plugins",
    duration: "40 min",
    sections: [
      {
        title: "Network Policies",
        content: `**Network Policies** control traffic flow between pods. By default, all pods can communicate with each other.

**Network Policy Rules:**
- **Ingress**: Incoming traffic rules
- **Egress**: Outgoing traffic rules
- **Pod Selector**: Which pods the policy applies to
- **Namespace Selector**: Which namespaces are allowed

**Important:** Network Policies require a CNI plugin that supports them (Calico, Cilium, Weave).`,
        codeExample: `# Create a Network Policy
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-network-policy
spec:
  podSelector:
    matchLabels:
      app: database
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: api-server
    ports:
    - protocol: TCP
      port: 5432
EOF

# Get network policies
kubectl get networkpolicies`
      },
      {
        title: "CNI Plugins",
        content: `**Container Network Interface (CNI)** plugins provide networking in Kubernetes.

**Popular CNI Plugins:**
| Plugin | Type | Key Features |
|--------|------|-------------|
| Calico | Network Policy | BGP routing, eBPF, network policies |
| Cilium | eBPF-based | eBPF, service mesh, observability |
| Flannel | Overlay | Simple, easy setup, VXLAN |
| Weave | Overlay | Simple, multicast support |
| AWS VPC CNI | Native VPC | Each pod gets a VPC IP |

**CNI Responsibilities:**
- Pod IP allocation
- Routing between nodes
- Network policy enforcement
- Service load balancing`,
        codeExample: `# Check CNI plugin
kubectl get pods -n kube-system | grep -E 'calico|cilium|flannel|weave'

# List nodes with pod CIDR
kubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}'

# Check node network config
kubectl describe node | grep -A5 "PodCIDR"`
      }
    ],
    quiz: [
      {
        id: "ch6-q1",
        question: "By default, can pods in a Kubernetes cluster communicate with each other?",
        options: ["No, network policies block everything", "Yes, all pods can communicate by default", "Only in the same namespace", "Only if they have labels"],
        correctIndex: 1,
        explanation: "Kuberneties allows all pod-to-pod communication by default. Network Policies restrict this."
      },
      {
        id: "ch6-q2",
        question: "Which CNI plugin uses eBPF for high-performance networking?",
        options: ["Flannel", "Calico", "Cilium", "Weave"],
        correctIndex: 2,
        explanation: "Cilium uses eBPF (extended Berkeley Packet Filter) for high-performance networking and security."
      }
    ],
    exercises: [
      {
        id: "ch6-ex1",
        title: "Inspect Network Configuration",
        description: "Examine the current network configuration of your cluster.",
        instruction: "Check which CNI plugin is installed, look at pod CIDR ranges, and examine kube-proxy configuration.",
        hint: "kubectl get pods -n kube-system | grep -E 'calico|cilium|flannel|weave|kube-proxy'",
        solution: "kubectl get pods -n kube-system | grep -E 'calico|cilium|flannel|weave|kube-proxy'\nkubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}'",
        initialCommand: "kubectl get pods -n kube-system | head -10",
        expectedOutput: "kube-proxy",
        verificationCommand: "kubectl get nodes -o jsonpath='{.items[0].spec.podCIDR}'"
      }
    ]
  },
  {
    id: "ch7-monitoring",
    number: 7,
    title: "Monitoring & Debugging",
    subtitle: "Observability and Troubleshooting",
    duration: "45 min",
    sections: [
      {
        title: "Monitoring Cluster Health",
        content: `Monitoring is critical for production Kubernetes. Here are the essential tools and commands.

**Built-in Monitoring:**
- **kubectl top**: Shows CPU/memory for nodes and pods
- **kubectl describe**: Detailed resource information
- **kubectl logs**: Container log output

**Metrics Server** must be installed for \`kubectl top\` to work:
\`\`\`bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
\`\`\`

**Prometheus & Grafana Stack:**
- **Prometheus**: Collects and stores metrics
- **Grafana**: Visualizes metrics in dashboards
- **AlertManager**: Sends alerts based on rules`,
        codeExample: `# Check node resource usage
kubectl top nodes

# Check pod resource usage
kubectl top pods

# Describe a node for conditions
kubectl describe node | grep -A10 "Conditions"

# Watch pod events
kubectl get events --watch`
      },
      {
        title: "Debugging Applications",
        content: `When things go wrong, here's your debugging toolkit.

**Common Debugging Commands:**
\`\`\`bash
# Check pod logs
kubectl logs pod-name
kubectl logs pod-name -c container-name
kubectl logs --previous pod-name  # Last crashed instance

# Execute commands in a pod
kubectl exec -it pod-name -- /bin/sh
kubectl exec pod-name -- env

# Port forwarding for testing
kubectl port-forward pod-name 8080:80

# Copy files from/to pods
kubectl cp pod-name:/path/to/file ./local-file
\`\`\`

**Troubleshooting Checklist:**
1. Is the pod running? → \`kubectl get pods\`
2. What events occurred? → \`kubectl describe pod <name>\`
3. What are the logs? → \`kubectl logs <name>\`
4. Can the pod resolve DNS? → \`kubectl exec <name> -- nslookup service-name\`
5. Is the endpoint ready? → \`kubectl get endpoints\``,
        codeExample: `# Debug a pod
kubectl describe pod my-pod
kubectl logs my-pod
kubectl exec -it my-pod -- /bin/sh

# Port forward for testing
kubectl port-forward svc/web-app 8080:80`
      }
    ],
    quiz: [
      {
        id: "ch7-q1",
        question: "Which command shows CPU/memory usage for nodes?",
        options: ["kubectl describe nodes", "kubectl top nodes", "kubectl get nodes --usage", "kubectl stats nodes"],
        correctIndex: 1,
        explanation: "kubectl top nodes shows CPU and memory usage for nodes."
      },
      {
        id: "ch7-q2",
        question: "How do you view logs from a previously crashed container?",
        options: ["kubectl logs --previous pod-name", "kubectl logs --crashed pod-name", "kubectl logs --history pod-name", "kubectl logs --last pod-name"],
        correctIndex: 0,
        explanation: "kubectl logs --previous pod-name shows logs from the last (crashed) instance of a container."
      }
    ],
    exercises: [
      {
        id: "ch7-ex1",
        title: "Debug a Failing Pod",
        description: "Debug a pod that's not starting correctly.",
        instruction: "Create a pod with an intentional error (wrong image name), then diagnose what went wrong using kubectl describe and logs.",
        hint: "kubectl run failing-pod --image=nginx:nonexistent\nkubectl describe pod failing-pod\nkubectl logs failing-pod",
        solution: "kubectl run failing-pod --image=nginx:nonexistent\nkubectl describe pod failing-pod | grep -A5 Events\nkubectl logs failing-pod 2>&1",
        initialCommand: "kubectl run failing-pod --image=nginx:nonexistent",
        expectedOutput: "Error\\s+ImagePullBackOff",
        verificationCommand: "kubectl describe pod failing-pod | grep -E 'Error|BackOff'"
      },
      {
        id: "ch7-ex2",
        title: "Port Forwarding",
        description: "Use port forwarding to access an application.",
        instruction: "Forward local port 8080 to port 80 of the web-app service, then test the connection.",
        hint: "kubectl port-forward svc/web-app 8080:80 --address=0.0.0.0 &\ncurl localhost:8080",
        solution: "kubectl port-forward svc/web-app 8080:80 &\ncurl localhost:8080",
        initialCommand: "kubectl get svc web-app",
        expectedOutput: "web-app",
        verificationCommand: "kubectl port-forward svc/web-app 8080:80 --address=0.0.0.0"
      }
    ]
  }
];

// ============================
// QUIZ ANSWER TRACKING
// ============================

export interface QuizResult {
  chapterId: string;
  answers: Record<string, number>; // questionId -> selectedIndex
  score: number;
  total: number;
  completedAt: string;
}

export function calculateQuizScore(questions: QuizQuestion[], answers: Record<string, number>): { score: number; total: number } {
  let score = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correctIndex) {
      score++;
    }
  }
  return { score, total: questions.length };
}
