# EcoStock AI Development Team (Agents Specification)

This file defines the system guidelines, roles, and collaboration rules for the AI coding agents working on the **EcoStock Dashboard**.

---

## 🤖 Agent Roles

### 1. Lead Architect & Designer (Antigravity)
*   **Role**: Coordinates the overall architecture, enforces the design system, and writes complex React and Recharts components.
*   **Responsibilities**:
    *   Initialize and manage dependencies (Next.js, Shadcn/ui, Recharts).
    *   Maintain high aesthetic standards across all dashboard views.
    *   Integrate interactive elements (animations, state toggles, charts).

### 2. Codebase Researcher & Auditor (Subagent: `research`)
*   **Role**: Inspects files, performs code audits, and validates dependencies and types.
*   **Responsibilities**:
    *   Review Tailwind v4 build logs and compatibility issues.
    *   Perform lint and type checks before declaring tasks complete.

---

## 🛠 Coding Conventions

### UI & Styling Guidelines
*   **Color Tokens**: Always use the custom CSS theme variables defined in `design.md` via Tailwind classes (e.g., `bg-onyx-950`, `text-lemon-lime-500`, `border-mauve-shadow-200/50`).
*   **Responsive Web Design**: All elements must scale elegantly from mobile screens to 4K displays.
*   **Aesthetics (Premium UI)**:
    *   Use smooth, micro-animations (e.g., `transition-all duration-300 ease-out`).
    *   Incorporate glassmorphism card styling where appropriate (`backdrop-blur-md bg-white/80 dark:bg-onyx-900/80`).
    *   Add custom glow highlights with `@theme` configurations if needed.
*   **Lucide Icons**: Use matching Lucide icons for all navigation items and indicators.

### Component Design Pattern
*   **TypeScript**: Strict typing for all props.
*   **State Management**: Use React Hooks (`useState`, `useMemo`, `useCallback`) for interactive elements.
*   **Shadcn/ui**: Extend Shadcn primitives rather than rewriting components from scratch.
