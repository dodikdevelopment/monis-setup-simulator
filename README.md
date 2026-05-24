# Monis Workspace Builder & Configurator

Monis Workspace Builder is a premium, interactive 3D-like 2D canvas configurator that allows users to design their dream remote office, customize desks and chairs, add accessories via drag-and-drop, and instantly calculate rental setup breakdowns.

---

## 🚀 Short Write-Up

### 1. Approach
- **Dynamic 2D Stage Canvas Layout:** Built a high-fidelity visual workspace layout stage where furniture pieces (desks and chairs) dynamically change textures and models in real-time, accompanied by realistic window/shadow presets, day/night light modes, and active backlight glows.
- **Precision Drag and Drop:** Integrated absolute coordinate drop zones so accessories (monitors, keyboards, plants, and coffee machines) can be dragged anywhere inside the canvas bounding box, snapping neatly to logical anchor slots (monitor shelves, wall mounts, left/right desk surfaces, and the floor).
- **Responsive 3-Column Interface:** Restructured the responsive workspace design into three columns. On large screens (`xl`), the grid spans are optimized to `3-6-3` columns to allocate **50% of the screen width to the center visual workspace canvas**, keeping the configurator controls and rental breakdown sidebars compact and elegant at 25% width each. The layout width constraints were successfully expanded to a massive `max-w-[1600px]` with fluid responsive spacing.

### 2. Tech Choices
- **React 19 & Next.js 16 (App Router):** Leveraged the latest server/client component paradigm for instantaneous transitions, rapid client-side hydration, and production-ready static optimization.
- **Zustand (State Management):** Used a centralized Zustand store (`workspaceStore`) to manage reactive client state (selected items, heights, positions, light toggles, and quantities) in a lightweight, single-directional flow without the overhead of Redux or React Context re-renders.
- **Framer Motion:** Handled high-performance, GPU-accelerated micro-animations, physics-based dragging behaviors with elastic constraints, and realistic particle effects (like hot steam rising from the espresso machine).
- **Tailwind CSS & Lucide Icons:** Designed custom responsive layouts, beautiful glassmorphism panels (`backdrop-blur-md`), dark mode overrides (`dark bg-zinc-950`), and premium iconography.

### 3. What to Improve with More Time
- **Persisted Configurations:** Sync user configurations with a local storage adapter or cloud database (like PostgreSQL) to support saving and reloading historical workspace setups.
- **3D Canvas Integration:** Upgrade the visual model stage using WebGL via Three.js / React Three Fiber to allow full 360-degree rotation, pan, zoom, and dynamic light ray casting.
- **Collaborative Real-time Designing:** Implement WebSockets (e.g., Socket.io or Supabase Realtime) to enable multiple teammates to collaboratively drag, drop, and configure the same workspace together.
- **Granular Accessory Customizations:** Allow users to pick detailed individual color variations, keycap finishes, and custom monitor wallpapers for accessories.

---

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the interactive configurator in action.

## 📦 Building for Production

To generate an optimized production bundle:

```bash
npm run build
```

This will run TypeScript checks and output static assets inside the `.next` directory.
