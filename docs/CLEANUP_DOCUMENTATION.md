# Dokumentasi Pembersihan & Optimalisasi Codebase
Dokumen ini merangkum perbaikan bug, optimalisasi performa, dan pembersihan kode tidak terpakai (*unused code*) yang telah dilakukan pada proyek **IPB Fest Frontend**.

---

## 📋 Ringkasan Perbaikan

| Komponen / File | Masalah | Perbaikan / Solusi | Status |
| :--- | :--- | :--- | :--- |
| **Peringatan Dimensi Grafik**<br>(Recharts) | Konsol browser dibanjiri warning: `The width(-1) and height(-1) of chart should be greater than 0...` | Menghapus tag `<ResponsiveContainer>` manual yang bertumpuk (*nested*) di dalam `<ChartContainer>`. | **Selesai** |
| **Hook `useIsMobile`**<br>`hooks/use-mobile.ts` | Error ESLint `react-hooks/set-state-in-effect`: Sinkronisasi state di dalam `useEffect` memicu render berulang (*cascading render*). | Mengubah logika hook menggunakan API React 18+ `useSyncExternalStore` untuk subskripsi media query secara *native*. | **Selesai** |
| **JSX Unescaped Quotes**<br>`components/view-profit.tsx` | Error ESLint `react/no-unescaped-entities` karena menggunakan tanda kutip `"` langsung di dalam JSX. | Meng-escape tanda kutip menggunakan entitas HTML (`&quot;`) dan ampersand (`&amp;`). | **Selesai** |
| **Kode & Variabel Tidak Terpakai**<br>(Seluruh Codebase) | Banyak warning *unused variables*, *unused imports*, dan *unused loop parameters* yang mengotori log build. | Menghapus seluruh import, state setter, dan parameter perulangan `.map` yang tidak terpakai secara sistematis. | **Selesai** |

---

## 🛠️ Detail Perbaikan & Analisis Teknis

### 1. Masalah Grafik Recharts (`ResponsiveContainer` bertumpuk)
* **Lokasi File:** 
  - `components/view-profit.tsx`
  - `components/view-sales.tsx`
  - `components/view-waste.tsx`
* **Analisis Masalah:** 
  Komponen pembungkus bawaan shadcn/ui `<ChartContainer>` secara internal sudah membungkus anak-anaknya dengan `<RechartsPrimitive.ResponsiveContainer>`. Adanya tag `<ResponsiveContainer>` tambahan di dalam file komponen membuat pengukuran ukuran layout bertabrakan saat inisialisasi halaman (menghasilkan lebar/tinggi `-1`).
* **Solusi:**
  Menghilangkan tag `<ResponsiveContainer>` duplikat. Sekarang grafik (`LineChart`, `AreaChart`, `BarChart`) langsung diletakkan sebagai anak langsung dari `<ChartContainer>`.
  ```tsx
  // SEBELUM (Salah/Redundan)
  <ChartContainer config={chartConfig}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>...</LineChart>
    </ResponsiveContainer>
  </ChartContainer>

  // SESUDAH (Benar/Bersih)
  <ChartContainer config={chartConfig}>
    <LineChart data={data}>...</LineChart>
  </ChartContainer>
  ```

### 2. Refaktorisasi Hook `useIsMobile` (Kinerja & SSR Safety)
* **Lokasi File:** `hooks/use-mobile.ts`
* **Analisis Masalah:**
  Penggunaan `React.useEffect` untuk meng-update state secara langsung/sinkron setelah inisialisasi media query dinilai buruk untuk kinerja rendering karena memicu *cascading render* (render ganda).
* **Solusi:**
  Menggunakan `React.useSyncExternalStore`. Metode ini adalah standar modern React untuk membaca data dari luar React (seperti ukuran window/viewport) tanpa perlu menggunakan gabungan `useState` + `useEffect`.
  ```typescript
  import * as React from "react"

  const MOBILE_BREAKPOINT = 768

  export function useIsMobile() {
    const subscribe = React.useCallback((callback: () => void) => {
      if (typeof window === "undefined") return () => {}
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      mql.addEventListener("change", callback)
      return () => mql.removeEventListener("change", callback)
    }, [])

    const getSnapshot = React.useCallback(() => {
      if (typeof window === "undefined") return false
      return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
    }, [])

    const getServerSnapshot = React.useCallback(() => {
      return false
    }, [])

    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  }
  ```

### 3. Pembersihan Kode & Variabel Tidak Terpakai
Semua sisa kode dan import yang tidak terpakai telah dibersihkan sepenuhnya untuk menjaga keterbacaan kode (*code readability*) dan memastikan build produksi berjalan optimal tanpa warning:

* **`dashboard-header.tsx`**: Menghapus `useState` dari React, serta `HelpCircle` dan `Mail` dari `lucide-react`.
* **`metric-card.tsx`**: Menghapus import `Button` dari `@/components/ui/button`.
* **`production-chart.tsx`**: Menghapus import `Tooltip` dan `Legend` dari `recharts`.
* **`view-forecast.tsx`**: Menghapus import `TrendingUp`, `Layers`, serta variabel state updater `setForecastData`.
* **`view-profit.tsx`**: Menghapus import `Button`, `Select`, `Tooltip`, `Legend`, state `timeframe` & `activeCategoryIndex`, serta parameter `index` pada map categories.
* **`view-sales.tsx`**: Menghapus `Badge`, `Button`, `TrendingUp`, `Tooltip`, serta state updater `setSalesList`.
* **`view-waste.tsx`**: Menghapus `Badge`, `Button`, `AlertTriangle`, `TrendingDown`, `Tooltip`, serta state updater `setWasteList`.
* **`waste-progress.tsx`**: Menghapus parameter `index` yang tidak digunakan pada perulangan `initialWasteData.map`.

---

## 🚀 Status Kualitas Kode Saat Ini

Setelah dilakukan perbaikan dan pembersihan menyeluruh, hasil pengujian linter menunjukkan:

```bash
$ npm run lint

> ipbfest-frontend@0.1.0 lint
> eslint
# (Berhasil selesai tanpa output error/warning)
```

* **Errors:** `0`
* **Warnings:** `0`
* **Build Status:** Sangat aman, bersih, dan siap untuk diproduksi (*production-ready*).
