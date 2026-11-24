# Ishadam Project - Operational Guidelines & Quality Rules

## 1. Zero Over-Analysis & Direct Execution
- **Edit directly, no analysis loops**: When the user asks for a layout or style change (e.g. "to the corner", "move left", "change padding"), edit the HTML/CSS class directly in `index.html` or `style.css` in **one turn**.
- **No unnecessary Python scripts**: NEVER run multi-step Python scripts to inspect pixel coordinates, crop rows, or sample colors when a straightforward CSS anchor (`left-0 bottom-0`) solves the request.
- **No excuses or fluff**: Give concise, direct, technical answers. Do not make empty promises—deliver working code and verified assets.

## 2. Transparency & Direct Honesty
- **Never silently substitute**: If an AI generation tool, external API, or service fails (e.g., HTTP 503 capacity error), inform the user immediately upfront. Never silently crop, fake, or substitute a placeholder without stating exactly what happened.

## 3. Speed & Background Process Safeguards
- **Zero stalling**: Never start heavy unverified downloads (e.g., multi-gigabyte ONNX models or pip packages) during interactive work. 
- **No lingering background tasks**: Do not run recursive file searches across system trees. Keep commands local, targeted, and synchronous.
- **Fast fallbacks**: If an operation takes more than 5 seconds, cancel it immediately and use the simplest native solution.

## 4. Pixel-Accurate UI & Reference Layouts
- **Direct CSS Anchoring**: When the user asks to anchor to a corner, use pure Tailwind/CSS (`absolute bottom-0 left-0`) directly without adding arbitrary offsets (`lg:left-8`, `xl:left-14`) unless explicitly requested.
- **Mobile & Desktop fidelity**: Ensure zero horizontal overflow (`overflow-x: hidden`) and smooth 60fps GPU-composited animations without layout jitter.

## 5. Asset Handling
- When images are provided, convert to optimized WebP (`.webp`), place them in `assets/images/`, and wire them into `index.html` in a single pass.
