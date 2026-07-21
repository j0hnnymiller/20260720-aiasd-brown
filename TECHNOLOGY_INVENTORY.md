# Technology Inventory

Current repository snapshot for [20260720-aiasd-brown](./).

## Core Platform

| Area                    | Technology      | Notes                                                     |
| ----------------------- | --------------- | --------------------------------------------------------- |
| App framework           | Next.js 16.2.10 | App Router project using the `src/` directory.            |
| UI library              | React 19.2.4    | Client-side calculator component uses modern React hooks. |
| Language                | TypeScript 5    | Strict TypeScript configuration enabled.                  |
| Runtime package manager | npm             | Standard scripts in `package.json`.                       |

## Styling and UI

| Area                | Technology                      | Notes                                                                              |
| ------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| CSS framework       | Tailwind CSS 4                  | Imported through `@import "tailwindcss";` in `src/app/globals.css`.                |
| PostCSS integration | `@tailwindcss/postcss`          | Configured in `postcss.config.mjs`.                                                |
| Font loading        | `next/font/google`              | Uses Geist and Geist Mono in `src/app/layout.tsx`.                                 |
| Design approach     | Utility-first component styling | UI is composed with Tailwind utility classes directly in page and component files. |

## Project Structure

| Path                            | Purpose                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `src/app/layout.tsx`            | Root layout, metadata, and font setup.                  |
| `src/app/page.tsx`              | Landing page that renders the calculator.               |
| `src/app/globals.css`           | Global theme tokens and base styles.                    |
| `src/components/Calculator.tsx` | Client calculator implementation and keyboard handling. |

## Build and Quality Tooling

| Tool         | Purpose                                                  |
| ------------ | -------------------------------------------------------- |
| `next dev`   | Local development server.                                |
| `next build` | Production build.                                        |
| `next start` | Production runtime server.                               |
| `eslint`     | Linting via `eslint-config-next` and TypeScript support. |

## Type and Lint Configuration

| Area              | Technology      | Notes                                                                      |
| ----------------- | --------------- | -------------------------------------------------------------------------- |
| ESLint            | ESLint 9        | Configured through `eslint.config.mjs` with Next.js core web vitals rules. |
| Type checking     | `tsconfig.json` | Path alias `@/*` maps to `src/*`.                                          |
| Module resolution | Bundler mode    | Matches the Next.js app-router setup.                                      |

## Runtime Behavior

| Feature          | Technology               | Notes                                                        |
| ---------------- | ------------------------ | ------------------------------------------------------------ |
| Keyboard input   | Browser `keydown` events | Managed in the calculator client component with React hooks. |
| State management | React state hooks        | Calculator state is kept locally in the component.           |
| Metadata         | Next.js metadata API     | Document title and description are set in the root layout.   |

## Summary

This project is a small Next.js app built with React, TypeScript, and Tailwind CSS 4. Its current scope is a single calculator experience, with the architecture centered on a client component, a root app shell, and lightweight tooling for build and linting.
