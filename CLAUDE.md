# CLAUDE.md

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm start` - Start production server
- `./start.sh` - Startup script with Docker support
- `docker compose up --build` - Full Docker setup

## Project Structure
- Next.js 16 App Router with TypeScript
- `src/lib/chapters.ts` - Single file with all course content, quizzes, exercises, and SVG diagrams
- `src/components/MarkdownRenderer.tsx` - Custom markdown renderer with YAML/Bash/JSON syntax highlighting
- `src/app/api/terminal/exec/route.ts` - API route for executing kubectl commands
