---
name: Hilal06 Portfolio Website
description: High-crafted interactive developer portfolio built with Svelte 5 Runes, GSAP motion, and refined dark mode aesthetics.
colors:
  primary: "#6366f1"
  primary-hover: "#4f46e5"
  primary-light: "#818cf8"
  primary-subtle: "#a5b4fc"
  neutral-bg: "#090d16"
  surface-card: "#111726"
  surface-elevated: "#1a2235"
  border-subtle: "rgba(255, 255, 255, 0.1)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Hilal06 Portfolio Website

## Overview

**Creative North Star: "The Precision Code Atelier"**

A high-crafted, ultra-clean developer portfolio designed to captivate tech recruiters, hiring managers, and prospective clients within seconds. Built with a disciplined Obsidian Dark palette, crisp typography, and purposeful GSAP motion micro-interactions.

### Key Characteristics:
- **Disciplined Dark Mode**: Rich slate surfaces (`#090d16` / `#111726`) with 1px subtle borders.
- **No AI Slop**: Zero gradient text overlays, zero bounce easing, and zero hyper-rounded pill containers.
- **Vector Precision**: Custom SVG icons and monospace data indicators instead of emoji glyphs.

## Colors & Theme Variations

The visual system relies on a deep, disciplined dark foundation paired with intentional accent roles (The One Voice Rule: accent color ≤ 10% screen area). Four curated color palettes are defined below:

### 1. Precision Indigo (Current Default — Obsidian Atelier)
- **Vibe:** Sharp, executive, modern engineering authority.
- **Canvas / Background:** `#090d16` (`surface-900`)
- **Card Surface:** `#111726` (`surface-800`) / `#1a2235` (`surface-700`)
- **Primary Accent:** Precision Indigo `#6366f1` (`brand-500`) / `#4f46e5` (`brand-600`)
- **Subtle Highlight:** Violet `#818cf8` (`brand-400`)

### 2. Emerald Matrix (Terminal / High Tech)
- **Vibe:** Hacker elegance, Linux terminal, backend & embedded systems precision.
- **Canvas / Background:** `#060b08` (`theme-matrix-bg`)
- **Card Surface:** `#0d1712` (`theme-matrix-surface`) / `#14241c` (`theme-matrix-elevated`)
- **Primary Accent:** Vivid Emerald `#10b981` / `#059669`
- **Subtle Highlight:** Mint `#34d399`

### 3. Midnight Amber (Warm Craftsmanship & Studio)
- **Vibe:** Luxury editorial studio, warm bronze glow, architectural refinement.
- **Canvas / Background:** `#0e0d0b` (`theme-amber-bg`)
- **Card Surface:** `#181613` (`theme-amber-surface`) / `#23201c` (`theme-amber-elevated`)
- **Primary Accent:** Warm Amber `#f59e0b` / `#d97706`
- **Subtle Highlight:** Soft Gold `#fbbf24`

### 4. Nordic Cyan (Frost Arctic / Cloud Architecture)
- **Vibe:** Ice-sharp, cloud-native architecture, high data readability.
- **Canvas / Background:** `#080f1a` (`theme-nordic-bg`)
- **Card Surface:** `#101b2d` (`theme-nordic-surface`) / `#19273f` (`theme-nordic-elevated`)
- **Primary Accent:** Electric Cyan `#0ea5e9` / `#0284c7`
- **Subtle Highlight:** Sky Blue `#38bdf8`

### Named Rules
**The One Voice Rule.** The primary accent color is used on ≤10% of any given viewport. Its rarity creates maximum focus, hierarchy, and visual signal.

## Typography

**Display Font:** Plus Jakarta Sans / Inter
**Body Font:** Plus Jakarta Sans / Inter
**Label/Mono Font:** JetBrains Mono

## Layout

A fluid 12-column grid layout with generous vertical spacing (`py-16 sm:py-24`) and max-width containers (`max-w-7xl`).

## Elevation & Depth

Surfaces use subtle 1px glassmorphic borders and soft backdrop blur (`backdrop-blur-xl`).

## Shapes

Card radii are strictly capped at `12px - 16px` (`rounded-xl` / `rounded-2xl`). Buttons and info badges use disciplined `8px` (`rounded-lg`) radii.

## Components

### Buttons
- **Primary:** Solid Precision Indigo (`#6366f1`) with white text and smooth 300ms hover transitions.
- **Secondary:** Subtle glass card background (`bg-surface-800/80`) with 1px border.

### Cards / Containers
- **Corner Style:** `16px` (`rounded-2xl`) for main dialog modals, `12px` (`rounded-xl`) for project cards and profile widgets.

## Do's and Don'ts

### Do:
- **Do** use solid crisp white/gray typography for headings.
- **Do** use SVG icons for technical attributes and badges.

### Don't:
- **Don't** use text gradients (`bg-clip-text bg-gradient`).
- **Don't** use `animate-bounce` or exaggerated bouncy easing.
- **Don't** use emoji glyphs in place of icon systems.
