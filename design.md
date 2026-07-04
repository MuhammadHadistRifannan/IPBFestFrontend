# EcoStock Dashboard Design System & Specification

This design document outlines the visual identity, token mappings, and layout choices for the **EcoStock AI Web Dashboard**, built using Tailwind CSS v4 and Shadcn/ui.

---

## 🎨 Color Palette & Tokens

We are using a custom organic-tech color palette:
*   **Onyx (Neutral & Dark Mode)**: A set of deep, slate-like purples and grays. Used for main backgrounds, dark text, and panel borders.
*   **Mauve Shadow (Secondary & Accents)**: A dusty rose-to-berry hue. Used for interactive states, secondary metrics, and subtle gradients.
*   **Toffee Brown (Warm Accent)**: An organic, warm brown shade. Used to represent Earth and organic materials.
*   **Lemon Lime & Chartreuse (Primary/Eco Accents)**: High-energy, vibrant neon green-yellows. Represents energy, recycling, and the "AI" futuristic vibe.

### Color Mapping Matrix
| Token | Source Hex | Usage in UI |
| :--- | :--- | :--- |
| `onyx-950` | `#131014` | Dark mode primary background |
| `onyx-900` | `#1b171c` | Dark mode card background |
| `onyx-50` | `#f3f1f4` | Light mode primary background |
| `onyx-100` | `#e7e3e8` | Light mode card/panel background |
| `mauve-shadow-500` | `#a35c74` | Active states, main accents, line chart metrics |
| `toffee-brown-500` | `#ab7854` | Organic metric indicators, warnings, wood/paper waste |
| `lemon-lime-500` | `#cdee11` | Primary CTA, positive indicators, recycling rate highlights |
| `chartreuse-500` | `#c0f906` | Secondary high-tech accent, AI insight highlights |

---

## 📐 Layout Grid

The dashboard layout is structured as follows:

```
+-----------------------------------------------------------------------+
|  Sidebar   |  Header: Search + User Profile & Actions                 |
| (EcoStock) |----------------------------------------------------------|
|            |  Dashboard Title & Export / Date Actions                 |
|  - Overview|----------------------------------------------------------|
|  - Forecast|  Metric Cards (Row of 3):                                |
|  - Waste   |  [ Total Produksi ]  [ Recycling Rate ]  [ Investment ]  |
|  - Sales   |----------------------------------------------------------|
|  - Product |  Main Row (2 Columns):                                   |
|  - Profit  |  [ Production vs Sales Chart ]    [ Waste per Product ]  |
|            |----------------------------------------------------------|
|  Settings  |  Bottom Row (3 Columns):                                 |
|  Help      |  [ Portfolio Perf. ] [ Recent Trans. ] [ Global Map ]    |
+-----------------------------------------------------------------------+
```

### Layout Elements
1.  **Navigation Sidebar**: Fixed-width, collapsible sidebar with logo, navigation links, and bottom controls (Settings, Help, Log Out).
2.  **Top Header**: Centered search utility, system notifications, direct messages, and user profile avatar.
3.  **Metrics Grid**: Three responsive summary cards highlighting core business metrics, each containing custom micro-charts (sparklines, mini bar graphs).
4.  **Analytics Section**:
    *   *Production vs Sales Overview*: An interactive Area/Line chart comparing production volume against sales over time.
    *   *Waste per Product*: A breakdown of waste materials with toggleable AI Insight recommendations.
5.  **Data & Map Grid**:
    *   *Portfolio Performance*: Trend lines showing portfolio evaluation.
    *   *Recent Transactions*: Table showing activities, timestamp, and values.
    *   *Global Recycling Activity*: Interactive styled map showing active locations.

---

## 🛠 Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4 (CSS-based theme variables configuration)
*   **Components**: Shadcn/ui (Radix-based primitives)
*   **Charts**: Recharts (Custom themed)
*   **Icons**: Lucide React
