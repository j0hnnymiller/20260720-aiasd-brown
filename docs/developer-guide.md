# Developer Guide

## Overview

This repository contains a Next.js App Router project for a React calculator application.

Primary goals of this guide:

- Get a contributor running locally quickly.
- Standardize day-to-day local workflows.
- Provide practical troubleshooting for common setup issues.

## Prerequisites

- Git
- Node.js and npm
- A terminal
- A code editor (VS Code recommended)

## Verify Local Tooling

This repository does not currently define `engines` in `package.json`, so verify your local versions before setup:

```bash
node -v
npm -v
```

If you see build or dependency resolution issues, switch to a current Node.js LTS release and reinstall dependencies.

## Initial Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd 20260720-aiasd-brown
```

### 2. Install dependencies

```bash
npm install
```

### 3. Verify the baseline

Run the standard validation steps:

```bash
npm run lint
npm run test
npm run build
```

## Deployment To Azure App Service

This application can be deployed to Azure App Service as a Node-hosted Next.js server.

### Deployment shape

- CI runs lint, tests, and a production build on pull requests and on pushes to `main`.
- CD deploys only from `main`.
- The build uses Next.js standalone output so App Service receives a self-contained server bundle.

### Required Azure setup

Provision a Linux App Service that runs Node.js 20.

Example Azure CLI flow:

```bash
az group create --name <resource-group> --location eastus
az appservice plan create --name <plan-name> --resource-group <resource-group> --sku B1 --is-linux
az webapp create --name <web-app-name> --resource-group <resource-group> --plan <plan-name> --runtime "NODE:20-lts"
az webapp config set --name <web-app-name> --resource-group <resource-group> --startup-file "node server.js"
```

Recommended App Service configuration:

- Startup command: `node server.js`
- Runtime stack: Node.js 20 LTS on Linux
- Always On: enable it for non-Free plans to reduce cold-start behavior

### Required GitHub secrets

The workflow in `.github/workflows/azure-app-service.yml` uses GitHub OpenID Connect with Azure login.

Add these repository or environment secrets:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_WEBAPP_NAME`

### Federated identity setup

Create a Microsoft Entra application or use a user-assigned managed identity with a federated credential that trusts this GitHub repository and branch.

Grant that identity permission to deploy to the web app. The minimum practical built-in role is typically `Contributor` on the target web app or its resource group.

### Release behavior

- Pull requests validate the app but do not deploy.
- A push to `main` publishes the standalone artifact to Azure App Service.
- If application settings are added later, manage them in App Service configuration rather than committing them to the repository.

## Environment Configuration

This project currently has no required application environment variables for local development.

### Current status

- Required variables: none
- Optional variables: none required by current source code
- Safe default: run with no `.env.local` file

### When adding environment variables

If a future feature needs configuration:

- Put local-only values in `.env.local`.
- Prefix browser-exposed variables with `NEXT_PUBLIC_`.
- Do not commit secrets.
- Add new required variables to this guide and to repository onboarding docs.

Example pattern:

```env
# .env.local
# Only add variables your feature actually needs.
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

## Local Workflows

### Start development server

```bash
npm run dev
```

Default URL:

- http://localhost:3000

### Run lint

```bash
npm run lint
```

### Run tests

Run once (CI-style):

```bash
npm run test
```

Run in watch mode while developing:

```bash
npm run test:watch
```

Run with coverage report:

```bash
npm run test:coverage
```

Coverage output is written to `coverage/`.

### Run production build

```bash
npm run build
```

### Preview production build locally

Build first, then start the production server:

```bash
npm run build
npm run start
```

## Platform-Specific Notes

Most npm commands are identical on Windows, macOS, and Linux. Differences typically appear in cleanup commands.

### Remove install artifacts and reinstall

Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

macOS/Linux (bash/zsh):

```bash
rm -rf node_modules package-lock.json
npm install
```

### Set a temporary environment variable for one shell session

Windows (PowerShell):

```powershell
$env:NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000"
```

macOS/Linux (bash/zsh):

```bash
export NEXT_PUBLIC_API_BASE_URL="http://localhost:3000"
```

## Troubleshooting

### Dependency install failures

Symptoms:

- `npm install` fails
- peer dependency conflicts
- postinstall/tooling errors

Actions:

1. Confirm versions with `node -v` and `npm -v`.
2. Reinstall cleanly using the platform-specific cleanup commands above.
3. Retry `npm install`.

### Port conflicts (3000 already in use)

Symptoms:

- `npm run dev` fails to bind to port 3000

Actions:

1. Stop the process using port 3000, or
2. Start on another port:

```bash
npm run dev -- --port 3001
```

### Missing environment variables

Symptoms:

- feature-specific runtime errors after introducing new config

Actions:

1. Check feature documentation for required variables.
2. Add missing values to `.env.local`.
3. Restart the dev server after environment changes.

### Cache/build artifact issues

Symptoms:

- stale behavior after code changes
- unexpected build/test mismatch

Actions:

1. Remove `.next` and reinstall dependencies if needed.
2. Restart local workflows.

Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

macOS/Linux (bash/zsh):

```bash
rm -rf .next
npm run dev
```

## Recommended Commit and Pull Request Workflow

### Branching

1. Sync your local `main` branch.
2. Create a focused feature/fix branch:

```bash
git checkout main
git pull origin main
git checkout -b feat/<short-description>
```

### During development

- Keep commits small and descriptive.
- Run local checks before pushing:

```bash
npm run lint
npm run test
npm run build
```

### Open a pull request

1. Push your branch.
2. Open a PR targeting `main`.
3. Include:

- summary of changes
- testing evidence (commands run)
- screenshots/video for UI changes when relevant

### Before merge

- Address review feedback.
- Keep branch up to date with `main`.
- Ensure CI checks pass.

## CI/CD: Deploy to GitHub Pages

This project can be deployed automatically to GitHub Pages using GitHub Actions.

### Deployment model

- CI validates quality gates (`lint`, `test`, `build`).
- CD publishes the static Next.js export to GitHub Pages.
- Deployment runs from `main` (plus manual `workflow_dispatch`).

### 1. Configure Next.js for static export

Update `next.config.ts` so `next build` generates an `out/` folder compatible with GitHub Pages.

Use this configuration:

```ts
import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgSite = repoName.endsWith(".github.io");

const basePath = isGithubActions && !isUserOrOrgSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
```

Why this matters:

- `output: "export"` enables static site generation for GitHub Pages.
- `basePath` and `assetPrefix` handle project sites like `/<repo-name>/`.
- `images.unoptimized` avoids server-side image optimization requirements.

### 2. Add the GitHub Actions workflow

Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy Next.js to GitHub Pages

on:
	push:
		branches: [main]
	workflow_dispatch:

permissions:
	contents: read
	pages: write
	id-token: write

concurrency:
	group: pages
	cancel-in-progress: true

jobs:
	build:
		runs-on: ubuntu-latest
		env:
			GITHUB_ACTIONS: true
			GITHUB_REPOSITORY: ${{ github.repository }}
		steps:
			- name: Checkout
				uses: actions/checkout@v4

			- name: Setup Node
				uses: actions/setup-node@v4
				with:
					node-version: 22
					cache: npm

			- name: Configure Pages
				uses: actions/configure-pages@v5

			- name: Install dependencies
				run: npm ci

			- name: Lint
				run: npm run lint

			- name: Test
				run: npm run test

			- name: Build static site
				run: npm run build

			- name: Upload artifact
				uses: actions/upload-pages-artifact@v3
				with:
					path: out

	deploy:
		needs: build
		runs-on: ubuntu-latest
		environment:
			name: github-pages
			url: ${{ steps.deployment.outputs.page_url }}
		steps:
			- name: Deploy to GitHub Pages
				id: deployment
				uses: actions/deploy-pages@v4
```

### 3. Enable Pages in repository settings

In GitHub:

1. Open **Settings** -> **Pages**.
2. Set **Source** to **GitHub Actions**.

### 4. Trigger and verify deployment

1. Commit and push `next.config.ts` and `.github/workflows/deploy-pages.yml` to `main`.
2. Open the **Actions** tab and watch `Deploy Next.js to GitHub Pages`.
3. After success, GitHub will publish the Pages URL from the workflow environment output.

### Optional: preview-only CI on pull requests

If you want PR validation without deployment, add this trigger to the same workflow (or a separate `ci.yml`):

```yaml
on:
	pull_request:
		branches: [main]
	push:
		branches: [main]
	workflow_dispatch:
```

Then gate deployment so it only runs for pushes to `main`:

```yaml
	deploy:
		if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

### Common deployment issues

- Broken styles/assets on Pages:
  - Confirm `basePath` and `assetPrefix` are set as shown.
- Workflow passes but no site URL:
  - Verify Pages source is set to **GitHub Actions**.
- Build fails in CI but works locally:
  - Run the CI-equivalent sequence locally:

```bash
npm ci
npm run lint
npm run test
npm run build
```

- Static export incompatibility:
  - Remove or refactor server-only features not supported by static export.

## Quick Command Reference

| Goal                            | Command                      |
| ------------------------------- | ---------------------------- |
| Install dependencies            | `npm install`                |
| Start development server        | `npm run dev`                |
| Run lint                        | `npm run lint`               |
| Run tests once                  | `npm run test`               |
| Run tests in watch mode         | `npm run test:watch`         |
| Generate coverage               | `npm run test:coverage`      |
| Build for production            | `npm run build`              |
| Start production server         | `npm run start`              |
| Run dev server on a custom port | `npm run dev -- --port 3001` |

## Related Files

- `README.md`
- `package.json`
- `vitest.config.ts`
- `docs/c4-architecture.md`
