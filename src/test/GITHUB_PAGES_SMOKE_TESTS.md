# GitHub Pages Deployment Smoke Test

This document explains the smoke test suite for verifying successful GitHub Pages deployment.

## Overview

The smoke test suite (`src/test/github-pages-deployment.test.tsx`) verifies that:

1. **Page Rendering** - The main page renders without errors
2. **UI Elements** - All key UI components are present and visible
3. **Calculator Functionality** - The calculator performs arithmetic operations correctly
4. **Accessibility** - The page follows semantic HTML and accessibility standards
5. **Layout** - The page uses proper responsive design
6. **Deployment Readiness** - The app is ready for static export to GitHub Pages

## Test Suite Breakdown

### Page Rendering Tests (4 tests)

- ✅ Home page renders without errors
- ✅ Main heading displays correctly
- ✅ Product tagline is visible
- ✅ Description text appears

### Calculator Component Tests (5 tests)

- ✅ Calculator component renders
- ✅ All number buttons (0-9) are present
- ✅ Operation buttons (+, -, ×, ÷) exist
- ✅ Basic arithmetic operations work correctly
- ✅ Keyboard input is supported

### Accessibility Tests (4 tests)

- ✅ Semantic HTML structure is correct
- ✅ Proper heading hierarchy
- ✅ Buttons have accessible labels
- ✅ Output display element exists

### UI Layout Tests (2 tests)

- ✅ Content renders within main area
- ✅ Responsive styling classes applied

### Deployment Readiness Tests (3 tests)

- ✅ No console errors during render
- ✅ No console warnings during render
- ✅ Page is statically exportable

## Running the Tests

### Local Testing

Run all smoke tests:

```bash
npm test -- src/test/github-pages-deployment.test.tsx
```

Run tests in watch mode:

```bash
npm run test:watch -- src/test/github-pages-deployment.test.tsx
```

Run with coverage:

```bash
npm run test:coverage -- src/test/github-pages-deployment.test.tsx
```

Run all tests (including component tests):

```bash
npm test
```

### Automated Testing

The GitHub Actions workflow (`.github/workflows/github-pages-deployment.yml`) automatically:

1. Checks out the code
2. Installs dependencies
3. Runs the smoke test suite
4. Builds the application for static export
5. Deploys to GitHub Pages (on success)
6. Reports results in the workflow summary

## Expected Output

When tests pass, you should see:

```
✓ GitHub Pages Deployment Smoke Tests (18 passed)
```

## CI/CD Integration

The smoke tests are integrated into the GitHub Pages deployment pipeline:

1. **Pre-deployment**: Tests verify the app is deployable
2. **Build**: Application is built with `NEXT_OUTPUT_MODE=export`
3. **Deployment**: On test success, the app is deployed to GitHub Pages
4. **Verification**: Each deployment run provides test status in workflow summary

## Common Issues & Troubleshooting

| Issue                             | Cause                        | Solution                                      |
| --------------------------------- | ---------------------------- | --------------------------------------------- |
| Tests fail locally but pass on CI | Node version mismatch        | Update Node.js locally to match CI version    |
| Calculator tests fail             | Missing Calculator component | Verify `src/components/Calculator.tsx` exists |
| Render errors                     | Missing dependencies         | Run `npm install`                             |
| Deploy fails after test pass      | Export config issue          | Check `next.config.ts` export settings        |

## Next Steps

- Add E2E tests using Playwright or Cypress for post-deployment verification
- Monitor GitHub Pages uptime with status checks
- Add performance testing to smoke suite
- Implement scheduled deployment verification tests

## References

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Deployment Action](https://github.com/peaceiris/actions-gh-pages)
