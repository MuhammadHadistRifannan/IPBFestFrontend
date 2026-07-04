# EcoStock AI Development Team (Agents Specification)

File ini mendefinisikan panduan sistem, peran, dan aturan kolaborasi untuk AI coding agent yang mengerjakan **EcoStock AI Web Dashboard (Frontend Only)**.

> **Referensi wajib sebelum eksekusi apapun:** `EcoStock_AI_Dokumen_Terpadu.docx` — dokumen ini adalah sumber kebenaran tunggal untuk fitur, target user, dan alur produk. Jika ada konflik antara referensi visual/inspirasi lama dengan dokumen ini, **dokumen terpadu yang menang.**

---

## 🎯 Scope Proyek

- **Fokus kerja: FRONTEND SAJA.** Tidak ada implementasi backend, API real, autentikasi asli, atau koneksi database.
- Semua data ditampilkan menggunakan **mock/dummy data** yang disimpan di file lokal (JSON/TS constant), bukan hasil fetch dari server sungguhan.
- Tidak perlu membangun integrasi WhatsApp beneran (Fonnte/Wablas) atau AI Server (Gemini) sungguhan. Cukup **simulasikan hasilnya di UI** (contoh: teks rekomendasi AI ditulis sebagai data statis yang terlihat seperti output AI).
- Agent tidak perlu menyentuh: skema database, REST API, autentikasi backend, business logic server-side.

---

## 👥 Target Pengguna Produk (WAJIB DIPAHAMI AGENT)

EcoStock AI dibuat untuk **Owner UMKM Makanan** — satu-satunya role aktif dalam sistem. Contoh: Bakery, Toko Roti, Toko Kue, Catering, Frozen Food, Kedai Minuman.

Tidak ada role investor, tidak ada role manufaktur, tidak ada konteks recycling industrial atau finansial korporat. Semua copy, nama produk, dan skenario data dummy harus mencerminkan bisnis UMKM makanan sehari-hari.

---

## 🤖 Agent Roles

### 1. Lead Frontend Architect & Designer (Antigravity)
* **Peran**: Mengoordinasikan struktur komponen React/Next.js, menegakkan design system dari `design.md`, membangun tampilan dashboard sesuai BAB III & IV dokumen terpadu.
* **Tanggung Jawab**:
    * Setup dan kelola dependency frontend (Next.js, Shadcn/ui, Recharts, Tailwind v4).
    * Menjaga konsistensi visual sesuai color tokens dan layout grid yang sudah ditentukan.
    * Membangun komponen interaktif (chart, toggle AI Insight, sparkline) memakai data dummy yang relevan dengan UMKM makanan.
    * Memastikan setiap fitur di dashboard punya padanan langsung ke BAB III dokumen terpadu (lihat tabel fitur di bawah).

### 2. Content & Copy Consistency Checker (Subagent: `content-review`)
* **Peran**: Mengaudit semua teks, label, dan data dummy di komponen sebelum dianggap selesai.
* **Tanggung Jawab**:
    * Pastikan tidak ada istilah bahasa investasi/finansial korporat (contoh: "Investment Value", "Portfolio", "ETF") yang lolos ke UI.
    * Pastikan nama produk dalam data dummy selalu produk makanan (roti, kue, minuman, frozen food, catering item), bukan barang manufaktur/recycling.
    * Cross-check setiap komponen baru terhadap BAB III & VI dokumen terpadu sebelum dinyatakan "done".

### 3. Codebase Researcher & Auditor (Subagent: `research`)
* **Peran**: Memeriksa file, melakukan audit kode, memvalidasi dependency dan types.
* **Tanggung Jawab**:
    * Review build log Tailwind v4 dan isu kompatibilitas.
    * Lint dan type-check sebelum task dinyatakan selesai.
    * Tidak melakukan perubahan apapun yang menyentuh backend/API/database — di luar scope proyek ini.

---

## 🧩 Pemetaan Fitur Wajib (dari BAB III Dokumen Terpadu)

Setiap fitur berikut harus punya representasi visual yang jelas di dashboard. Agent dilarang membangun fitur di luar daftar ini tanpa konfirmasi:

| Fitur (Dokumen) | Representasi di Dashboard |
| --- | --- |
| Dashboard Analytics (III.1) | Halaman Overview: ringkasan total produksi, sisa produk, grafik, ringkasan AI |
| Prediksi/Rekomendasi Produksi AI (III.2) | Kartu/preview di Overview + halaman "AI Forecast" khusus, wajib tampil eksplisit bukan cuma menu sidebar |
| Waste Analytics (III.3) | Breakdown produk sering sisa + estimasi kerugian, dengan AI insight per produk |
| Sales Analytics (III.4) | Produk terlaris, grafik penjualan, hari penjualan tertinggi |
| Produk Management (III.5) | Halaman "Product": CRUD jenis produk (tanpa jumlah produksi, itu urusan AI) |
| Rekap via WhatsApp (III.6) | Indikator/badge yang menunjukkan data masuk dari channel WhatsApp (simulasi saja, tidak perlu integrasi asli) |

---

## 🛠 Coding Conventions

### UI & Styling Guidelines
* **Color Tokens**: Selalu gunakan CSS theme variable custom yang didefinisikan di `design.md` lewat class Tailwind (contoh: `bg-onyx-950`, `text-lemon-lime-500`, `border-mauve-shadow-200/50`).
* **Responsive Web Design**: Semua elemen harus scale rapi dari mobile sampai layar 4K.
* **Aesthetics (Premium UI)**:
    * Gunakan micro-animation halus (contoh: `transition-all duration-300 ease-out`).
    * Terapkan glassmorphism card styling jika sesuai (`backdrop-blur-md bg-white/80 dark:bg-onyx-900/80`).
    * Tambahkan glow highlight custom lewat konfigurasi `@theme` bila diperlukan.
* **Lucide Icons**: Gunakan icon Lucide yang matching untuk semua item navigasi dan indikator.

### Component Design Pattern
* **TypeScript**: Strict typing untuk semua props.
* **State Management**: Gunakan React Hooks (`useState`, `useMemo`, `useCallback`) untuk elemen interaktif.
* **Shadcn/ui**: Extend primitive Shadcn, jangan menulis ulang komponen dari nol.
* **Data Dummy**: Simpan semua mock data di file terpisah (contoh: `lib/mock-data.ts`) agar mudah diaudit oleh subagent `content-review`.

---

## 🚫 Batasan Tegas (Do NOT)

* Jangan membangun endpoint API, koneksi database (MySQL), atau autentikasi backend sungguhan.
* Jangan menambahkan fitur di luar BAB III dokumen terpadu tanpa persetujuan eksplisit.
* Jangan menggunakan istilah/skema data dari referensi visual lama (fintech/investment/recycling korporat) sebagai default copy.
* Jangan mengubah struktur layout grid atau color palette tanpa alasan fungsional yang jelas (lihat `design.md`).

---

*Dokumen ini bersifat working draft, akan direvisi lebih lanjut mengikuti perkembangan wireframe Excalidraw dari tim.*
