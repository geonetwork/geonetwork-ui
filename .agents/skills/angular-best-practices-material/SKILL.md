---
name: angular-best-practices-material
description: >-
  Angular Material and CDK best practices. Covers selective imports, M3 theming,
  CDK utilities, and component test harnesses.
  Activates when working with @angular/material and @angular/cdk.
  Do not use for PrimeNG, Spartan UI, or other component libraries.
  Install alongside angular-best-practices for full coverage.
license: MIT
metadata:
  author: alfredoperez
  version: "1.2.0"
tags: [angular, material, cdk, ui-components]
globs:
  - "**/*.ts"
  - "**/*.component.ts"
  - "**/*.scss"
---

# Angular Material Best Practices

Angular Material and CDK rules for component usage, theming, and testing. Use with the core
[angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
skill for comprehensive Angular coverage.

## Links

- [Core Skill: angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
- [Browse All Skills](https://skills.sh/alfredoperez/angular-best-practices)
- [GitHub Repository](https://github.com/alfredoperez/angular-best-practices)

## When to Apply

- Importing and configuring Material components
- Setting up M3 theming with design tokens
- Using CDK utilities for overlays, drag-and-drop, or virtual scrolling
- Writing tests for Material components

## Rules

| Rule | Impact | Description |
|------|--------|-------------|
| Import Material Modules Selectively | MEDIUM | Tree-shake unused components with standalone imports |
| Use Angular Material Theming System | MEDIUM | M3 theme API with CSS custom properties |
| Use CDK Utilities Over Custom Implementations | MEDIUM | Battle-tested overlays, virtual scroll, and a11y primitives |
| Use Test Harnesses for Material Components | HIGH | Stable tests that survive internal DOM changes |

## Install

Install from [skills.sh/alfredoperez/angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices):

- Core skill: [angular-best-practices](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices)
- This add-on: [angular-best-practices-material](https://skills.sh/alfredoperez/angular-best-practices/angular-best-practices-material)
