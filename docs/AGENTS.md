# EcoStock AI Development Team (Agents Specification)

File ini mendefinisikan panduan sistem, peran, dan aturan kolaborasi untuk AI coding agent yang mengerjakan **EcoStock AI Web Dashboard (Frontend Only)**.

> **Referensi wajib sebelum eksekusi apapun:** `EcoStock_AI_Dokumen_Terpadu.docx` — dokumen ini adalah sumber kebenaran tunggal untuk fitur, target user, dan alur produk. Jika ada konflik antara referensi visual/inspirasi lama, hasil diskusi filosofis, atau ide baru apapun dengan dokumen ini, **dokumen terpadu yang menang.**

---

## 🧭 Prinsip Utama (WAJIB DIBACA SEBELUM CODING)

EcoStock AI adalah alat bantu keputusan produksi untuk Owner UMKM makanan, bukan dashboard analitik generik.

Sebelum membangun komponen, halaman, atau interaksi apapun, agent harus bisa menjawab pertanyaan ini:

> **"Apakah ini membantu Owner UMKM memahami kondisi bisnisnya hari ini, atau memutuskan produksi besok — dan apakah ini ada di BAB III/IV dokumen terpadu?"**

- ✅ **YA** → Lanjutkan.
- ❌ **TIDAK** → Jangan dibangun, sekalipun terlihat menarik secara visual. Tanyakan ke Tama dulu.

Setiap halaman juga harus punya **satu tujuan yang jelas** dan dijawab lewat headline/subheadline singkat di bagian atas halaman:

| Halaman | Pertanyaan yang dijawab |
| --- | --- |
| Overview | "Bagaimana kondisi bisnis saya hari ini?" |
| AI Forecast | "Apa yang sebaiknya saya produksi besok?" |
| Waste Analytics | "Di mana sumber pemborosan saya?" |
| Sales Analytics | "Produk apa yang paling laku dan kapan?" |
| Product Management | "Apa saja produk yang saya kelola?" |

---

## ⚠️ Aturan Data & AI Insight (PALING PENTING)

Ini aturan yang paling sering dilanggar kalau terburu-buru, jadi ditulis paling atas dan tegas:

1. **Setiap angka yang ditampilkan harus punya data source yang jelas.** Kalau backend belum punya data untuk menghitungnya, JANGAN ditampilkan sebagai angka presisi.
2. **Tidak boleh ada confidence score palsu** (contoh: "Confidence: 91%") kecuali backend benar-benar punya model yang menghasilkan angka itu. Kalau belum ada, gunakan label kualitatif saja: `Tinggi` / `Sedang` / `Rendah`.
3. **Tidak boleh menampilkan estimasi emisi karbon atau metrik lingkungan lain** yang tidak punya rumus/basis data yang bisa dipertanggungjawabkan. Ini akan menyulitkan backend dan berisiko saat ditanya juri.
4. **AI Insight boleh berbahasa natural dan meyakinkan, tapi tidak boleh mengklaim angka yang tidak benar-benar dihitung dari data.**
5. Kalau ragu apakah suatu metrik "aman" ditampilkan atau tidak, defaultnya adalah **jangan tampilkan**, dan tanyakan ke Tama.

---

## 🎯 Scope Proyek

- **Fokus kerja: FRONTEND SAJA.** Tidak ada implementasi backend, API real, autentikasi asli, atau koneksi database.
- Semua data ditampilkan menggunakan **mock/dummy data** yang disimpan di file lokal (JSON/TS constant), bukan hasil fetch dari server sungguhan.
- Tidak perlu membangun integrasi WhatsApp beneran (Fonnte/Wablas) atau AI Server (Gemini) sungguhan. Cukup **simulasikan hasilnya di UI** (contoh: teks rekomendasi AI ditulis sebagai data statis yang terlihat seperti output AI).
- Agent tidak perlu menyentuh: skema database, REST API, autentikasi backend, business logic server-side.
- **Agent TIDAK BOLEH membuat, mengedit, atau menjalankan file/tool apapun di luar permintaan eksplisit** — termasuk file dokumentasi seperti `AGENTS.md` ini sendiri. Kalau ada ide perbaikan, tulis sebagai saran ke Tama dulu, jangan langsung dieksekusi.

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
    * Setiap halaman punya headline + subheadline singkat yang menjawab tujuan halaman tersebut (lihat tabel Prinsip Utama).

### 2. Content & Copy Consistency Checker (Subagent: `content-review`)
* **Peran**: Mengaudit semua teks, label, dan data dummy di komponen sebelum dianggap selesai.
* **Tanggung Jawab**:
    * Pastikan tidak ada istilah bahasa investasi/finansial korporat (contoh: "Investment Value", "Portfolio", "ETF") yang lolos ke UI.
    * Pastikan nama produk dalam data dummy selalu produk makanan (roti, kue, minuman, frozen food, catering item), bukan barang manufaktur/recycling.
    * Pastikan tidak ada angka/metrik yang melanggar Aturan Data & AI Insight di atas (confidence score palsu, emisi karbon tanpa basis, dll).
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
| Prediksi/Rekomendasi Produksi AI (III.2) | Kartu/preview di Overview + halaman "AI Forecast" khusus, dengan alur: Rekomendasi → Alasan (kenapa) → Chart pendukung |
| Waste Analytics (III.3) | Breakdown produk sering sisa + estimasi kerugian (hanya jika ada basis datanya), dengan AI insight per produk |
| Sales Analytics (III.4) | Produk terlaris, grafik penjualan, hari penjualan tertinggi |
| Produk Management (III.5) | Halaman "Product": CRUD jenis produk (tanpa jumlah produksi, itu urusan AI) |
| Rekap via WhatsApp (III.6) | Indikator/badge yang menunjukkan data masuk dari channel WhatsApp (simulasi saja, tidak perlu integrasi asli) |

---

## 🚫 Fitur yang SUDAH DIPUTUSKAN untuk TIDAK dibangun (Parkir/Skip)

Daftar ini hasil diskusi eksplisit dan sudah final. Jangan dibangun ulang tanpa persetujuan Tama:

* **Tombol "Terapkan ke Rencana Produksi"** — akan menarik ke workflow draft/save/rollback yang scope-nya terlalu besar untuk MVP. Cukup pakai tombol navigasi sederhana seperti `Lihat Detail →` atau `Lihat Forecast →`.
* **Estimasi emisi karbon** (kg CO2, dll) — tidak ada rumus/basis data yang bisa dipertanggungjawabkan, berisiko saat ditanya juri, dan menyulitkan backend.
* **Confidence score presisi** (contoh: "91%", "94.23%") — kecuali backend benar-benar menyediakan angka itu dari model AI. Default: gunakan label kualitatif.
* **AI Insight sebagai card besar di hero section** — gunakan banner ringkas (~60-80px tinggi) supaya KPI utama tidak terdorong ke bawah fold.

---

## 🛠 Coding Conventions

### UI & Styling Guidelines
* **Tailwind v4, bukan v3**: Project ini pakai Tailwind v4. Beberapa class v3 sudah deprecated, jangan dipakai lagi:
    * Opacity: pakai `bg-black/50`, bukan `bg-black bg-opacity-50`.
    * Ring: kalau butuh ring 3px seperti default v3, tulis eksplisit `ring-3`, jangan cuma `ring` (default v4 adalah `ring-1`).
    * Warna custom didefinisikan lewat `@theme` di file CSS, bukan `tailwind.config.js` versi lama.
    * Kalau extension Tailwind IntelliSense kasih warning "simplify class", ikuti saran itu — artinya class yang dipakai masih syntax v3.
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
* Jangan menambahkan fitur di luar BAB III dokumen terpadu tanpa persetujuan eksplisit dari Tama.
* Jangan menggunakan istilah/skema data dari referensi visual lama (fintech/investment/recycling korporat) sebagai default copy.
* Jangan mengubah struktur layout grid atau color palette tanpa alasan fungsional yang jelas (lihat `design.md`).
* Jangan menampilkan angka/metrik apapun yang melanggar Aturan Data & AI Insight di atas.
* Jangan membuat/mengedit file di luar permintaan eksplisit, termasuk file dokumentasi seperti `AGENTS.md` ini.

---

*Dokumen ini adalah versi final hasil sintesis diskusi tim (termasuk review eksternal), disetujui oleh Tama. Revisi berikutnya hanya boleh dilakukan atas persetujuan eksplisit Tama.*
