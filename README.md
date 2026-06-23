# CausalFunnel User Analytics Application

A lightweight, high-performance, and beautifully designed user analytics platform that tracks user behavior (page views and click coordinates) on a sandbox webpage and visualizes it through an interactive dashboard.

## Reviewer Guide

Follow this sequence to evaluate the application:

1. **Start the Application**: Run `npm run dev` and navigate to `http://localhost:3000/`.
2. **Open the Demo Sandbox**: Click the **Open Demo Page** button to go to `/demo`.
3. **Generate User Interactions**: Click various CTA buttons, pricing cards, and nav links. Notice the **Live Event Tracker** card in the bottom-right updating with click coordinates.
4. **Access the Dashboard**: Click the **Go to Dashboard** button on the header or navigate directly to `/dashboard`.
5. **Evaluate Analytics**:
   - Check the **Overview** page for total event aggregates and recent live logs.
   - Go to the **Sessions** view, select your active session, and inspect the chronological **User Journey Timeline**.
   - Go to the **Heatmap** page to visualize your click coordinates mapped on a wireframe preview.

---

## Architecture & Data Flow

```text
Browser (usePathname / click listener)
   │
   ▼
Tracker SDK (lib/tracker.ts)
   │
   ▼
POST /api/events
   │
   ▼
MongoDB Atlas (Mongoose Event Model)
   │
   ▼
Aggregation APIs (/api/stats, /api/sessions, /api/events?limit=20)
   │
   ▼
Dashboard (Overview, Sessions, Heatmap Pages)
```

- **Frontend Tracker (Client-Side)**: Intercepts router transitions and window clicks to capture coordinate markers `(clientX, clientY)`.
- **Backend APIs (Next.js App Router Routes)**: REST endpoints utilizing Mongoose for storing records and aggregating session counts and event flows.
- **Persistence (MongoDB)**: Scalable, indexed storage structured for quick analytical retrieval.

---

## Features

- **Ingestion Pipeline**: Asynchronous client-side tracking hooks that capture page paths and viewport click coordinates.
- **Session Aggregation**: Groups event documents by unique sessions in MongoDB, showcasing event volumes and the most recent active timestamps.
- **Journey Timelines**: Chronological step-by-step visualizations of all navigation nodes and click positions for an individual session.
- **Simplified Coordinate Heatmap**: Position-accurate click dot overlays mapped to wireframe containers with hover coordinates and details.
- **Responsive Layout**: Dark-themed workspace layout with side navigation and stats indicator widgets.

---

## Technical Specifications & Choices

### Database Indexes
To maintain responsive query times under load, the schema employs two compound indexes:
- `session_id: 1, timestamp: 1`: Facilitates fast timeline generation for single user journeys.
- `page_url: 1, event_type: 1`: Speeds up coordinate retrieval for the heatmaps page.

### Viewport Coordinate Strategy
Uses `clientX` and `clientY` coordinates instead of `pageX` / `pageY`. This aligns click points cleanly with standard viewport bounds inside the mockup browser frame container.

---

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Connection URI (configured in `.env.local`)

### Installation & Run

1. Clone this repository.
2. Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Assumptions & Tradeoffs

- **Session Management**: Session IDs are stored in the browser's `localStorage` and persist across tab closures. Opening the site in a different browser session or clear-data action simulates a new unique user session.
- **Overlay Coordinates**: Clicking elements is mapped relative to the client viewport window size. To align these spots, the dashboard visualizer renders click indicators over a fixed wireframe aspect ratio.
- **Aggregation Scope**: Overview metrics are computed dynamically on database load. For high-scale platforms, event batching and pre-calculated time-series collections would be implemented.

---

## Future Improvements

1. **Real-time Streaming**: WebSockets or Server-Sent Events (SSE) to update the dashboard immediately as actions occur.
2. **Session Replay**: Recording and playing back full browser mouse movements and dom mutations.
3. **Authentication & Multi-Tenancy**: Secure route groups using professional authenticators (e.g. Clerk).
4. **Rate Limiting & Event Batching**: Throttling API routes to prevent ingestion spam and buffering clicks to reduce database connections.
5. **Advanced Heatmaps**: Rendering canvas-based heat-density maps using canvas gradients.
