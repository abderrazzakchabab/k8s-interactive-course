# Kubernetes 101 - Interactive Course 🚀

An interactive web application to learn Kubernetes from scratch. Features chapters, quizzes, exercises, visual SVG diagrams, and an embedded terminal to run kubectl commands directly in your browser.

## ✨ Features

- **7 Comprehensive Chapters** covering K8s fundamentals
- **Interactive Quizzes** with detailed explanations
- **Hands-on Exercises** with step-by-step instructions
- **Embedded Terminal** with sandboxed kubectl environment
- **SVG Diagrams** explaining architecture, networking, and deployment flows
- **Visual Diagrams** generated with help from AI models explaining complex concepts

## 📚 Course Content

| # | Chapter | Description |
|---|---------|-------------|
| 1 | Introduction to Kubernetes | Architecture, core concepts, objects |
| 2 | Deployments & Applications | Running and managing applications |
| 3 | Services & Networking | Connecting and exposing applications |
| 4 | Configuration & Secrets | ConfigMaps and Secrets management |
| 5 | Storage & Volumes | Persistent data in Kubernetes |
| 6 | Advanced Networking | Network Policies and CNI plugins |
| 7 | Monitoring & Debugging | Observability and troubleshooting |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker (optional, for terminal features)
- kubectl (optional, for terminal features)

### Development

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
# or
./start.sh
```

Open [http://localhost:3000](http://localhost:3000) (or port 3001 if 3000 is in use)

### Docker (Full Features)

```bash
# Build and start with Docker
./start.sh --docker

# Or manually:
docker compose up --build -d
```

### Production Build

```bash
npm run build
npm start
```

## 🎯 Usage

### Learning Path
1. Start with **Chapter 1** - Introduction
2. Read through each section with visual diagrams
3. Complete the **exercises** - run commands in the embedded terminal
4. Test your knowledge with chapter **quizzes**
5. Use the standalone **Terminal** page to experiment freely

### Embedded Terminal
- Run kubectl commands directly in your browser
- Commands execute in a sandboxed Docker container
- Pre-populated with commands from exercises
- Quick-command sidebar for common operations

## 🏗 Architecture

```
kubernetes-app/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── chapters/
│   │   │   ├── page.tsx       # Chapter listing
│   │   │   └── [id]/page.tsx  # Chapter detail
│   │   ├── exercises/page.tsx # All exercises
│   │   ├── terminal/page.tsx  # Terminal page
│   │   └── api/terminal/exec/ # Command execution API
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── Sidebar.tsx        # Chapter sidebar
│   │   ├── ChapterContent.tsx # Chapter renderer
│   │   ├── Quiz.tsx           # Interactive quiz
│   │   ├── Exercise.tsx       # Exercise component
│   │   ├── Terminal.tsx       # Embedded terminal
│   │   └── Diagram.tsx        # SVG diagram renderer
│   └── lib/
│       ├── types.ts           # TypeScript definitions
│       └── chapters.ts        # All content & data
├── Dockerfile.terminal        # Terminal container
├── docker-compose.yml         # Docker setup
└── start.sh                   # Startup script
```

## 🎨 Diagrams & Visuals

The app includes custom SVG diagrams that explain:
- Kubernetes Cluster Architecture
- Deployment & Rolling Update Flow
- Service Types (ClusterIP, NodePort, LoadBalancer)
- Horizontal Pod Autoscaling

These diagrams were designed with assistance from AI image generation models to create clear, educational visuals.

## 🧪 Extending

### Add a New Chapter
Edit `src/lib/chapters.ts` and add a new entry to the `chapters` array with sections, quiz questions, and exercises.

### Add a New Diagram
1. Create an SVG string in the `diagrams` array in `src/lib/chapters.ts`
2. Reference it in a section using `diagramId`

## 📝 License

MIT
