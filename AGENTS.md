# Kubernetes 101 Interactive Course

An interactive web application for learning Kubernetes. Built with Next.js 16 + TypeScript + Tailwind CSS.

## Architecture

- `src/app/` - Next.js App Router pages (home, chapters, exercises, terminal, API)
- `src/components/` - Reusable UI components (Navbar, Sidebar, ChapterContent, Quiz, Exercise, Terminal, Diagram, MarkdownRenderer)
- `src/lib/` - Data layer (types, chapter content with YAML/bash/json syntax highlighting)

## Key Decisions

- Markdown is rendered client-side via `MarkdownRenderer` component (no heavy MD library needed)
- YAML syntax highlighting uses inline span styles for zero-dependency rendering
- Terminal API runs commands via child_process with security allowlisting
- Docker Compose provides optional sandboxed terminal container
- SVG diagrams are inline strings in the data layer for portability
