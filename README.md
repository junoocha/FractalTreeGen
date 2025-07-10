# Interactive Tree Visualizer

An interactive, animated fractal tree generator built with **React** and **TypeScript**. Users can customize branching parameters, colors, animation speed, and explore tree generation in real time via zooming, panning, and controls.

---

## Features

- **Animated tree growth** based on user-defined depth and branching rules.
- **Real-time controls** for:
  - Number of branches per level
  - Maximum recursion depth
  - Initial length, width, and angle
  - Leaf size, branch color, color settings, animation speed
- **Drag & Zoom** to explore large trees
- **Performance-aware UI**: dynamically warns when tree size may affect performance
- **Live branch counter** and expected total branches

---

## Project Structure

src/

- app/
  - page.tsx # Root layout and rendering logic

- components/
  - control-panel/ # Settings UI
    - ControlPanel.tsx
    - control-slider.tsx
    - color-pickers.tsx
    - action-buttons.tsx

  - tree/
    - Tree.tsx # Recursively renders branches
    - Branch.tsx # Represents a single recursive branch
    - TreeWindow.tsx # Viewport that includes drag, zoom, etc.

  - ui/
    - Line.tsx # Renders a rotated line (branch segment)
    - Leaf.tsx # Renders a leaf shape

- hooks/
  - use-drag.ts
  - use-zoom.ts
  - use-tree-animation.ts

- utils/
  - tree-settings-types.ts

## Key Components

| Component          | Purpose                                                                        | Uses / Parent Of                                      |
| ------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `ControlPanel`     | Panel with all sliders, color pickers, and buttons                             | Parent of `TreeWindow`                                |
| `TreeWindow`       | Canvas container; handles dragging, zoom, animation, and renders the root tree | Uses `Tree`, `useDrag`, `useZoom`, `useTreeAnimation` |
| `Tree`             | Recursively renders branches and leaves up to `currentLevel`                   | Uses `Branch` and `Leaf`                              |
| `Branch`           | Recursively renders sub-branches and lines                                     | Uses `Line` and `Branch` (recursive)                  |
| `Line`             | Visual component for individual branch lines                                   | —                                                     |
| `Leaf`             | Visual component representing a leaf                                           | —                                                     |
| `useTreeAnimation` | Hook that updates the current animation level at a user-set frame rate         | Used by `TreeWindow`                                  |
| `useDrag`          | Tracks and updates offset for drag-panning                                     | Used by `TreeWindow`                                  |
| `useZoom`          | Listens to mouse wheel events to apply zoom scaling                            | Used by `TreeWindow`                                  |

---

## Performance Analysis

Tree rendering performance depends heavily on two variables:

- `maxLevel` (tree depth)
- `branchesPerLevel` (branching factor)

### Theoretical Branch Count

TotalBranches = Σ (branchesPerLevel^n) for n from 0 to maxLevel

Growth is **exponential** with depth and number of branches per level.

### Performance Metrics

| Metric                   | Description                                            | Value (Example: 6 levels, 3 branches/level) |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------- |
| Max Elements Rendered    | Total `<Line>` & `<Leaf>` components rendered          | ~364 nodes                                  |
| Animation Update Rate    | Tree expands frame-by-frame at `frameRate` (ms)        | e.g., 30 FPS → 33ms                         |
| Memory Usage (DOM-heavy) | Scales with node count, primarily due to inline styles | ~1–2MB for moderate trees                   |
| FPS (on 60Hz monitor)    | With 500+ nodes, remains stable on modern browsers     | 55–60 FPS                                   |

### Optimization Techniques

- **Debounced state updates** during animation
- **lineCount batching** using `useRef` to reduce renders
- **Early termination** in animation once `maxLevel` is reached
- **Estimated branch count preview** and performance warnings in UI

---

## Future Improvements

- GPU-accelerated rendering with WebGL/Canvas for larger trees
- Tree export (PNG, SVG)
- Touch support for mobile (drag/zoom)
- State sharing / saving (e.g., share your tree settings via URL)
  """
