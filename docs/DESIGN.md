# EcoStock Dashboard Design System & Specification

Dokumen ini menjelaskan identitas visual, token warna, dan pilihan layout untuk **EcoStock AI Web Dashboard**, dibangun dengan Tailwind CSS v4 dan Shadcn/ui.

> Scope: **Frontend only.** Semua data yang tampil di komponen adalah mock/dummy data yang merepresentasikan skenario Owner UMKM Makanan, sesuai `EcoStock_AI_Dokumen_Terpadu.docx`.

---

## 🎨 Color Palette & Tokens

Palette resmi (sumber: `Ecostock_Concept_Pallete.png`):

| Token | Source Hex | Deskripsi | Usage di UI |
| :--- | :--- | :--- | :--- |
| `onyx-950` | `#141115` | Hitam kebiruan pekat | Background utama dark mode |
| `plum-900` | `#4C2B36` | Merah keunguan gelap (mauve tua) | Card background sekunder, border panel, elemen hover |
| `toffee-600` | `#8D6346` | Coklat organik hangat | Indikator metrik organik, waste/limbah, warning state |
| `lemon-400` | `#DDF45B` | Kuning-hijau lembut | Highlight sekunder, progress bar, badge AI Insight |
| `chartreuse-500` | `#C6F91F` | Hijau-kuning neon terang | Primary CTA, indikator positif, aksen utama "AI/Eco" |

Filosofi warna: kombinasi gelap (onyx, plum) memberi kesan modern & fokus data, sementara toffee memberi sentuhan organik/alami (selaras tema Green Economy), dan lemon-chartreuse jadi aksen energik yang merepresentasikan AI dan pertumbuhan/efisiensi.
.000
---

## 🌗 Dual Mode (Dark & Light)

Dashboard mendukung dua mode tampilan: dark mode (default/utama) dan light mode. Keduanya memakai token warna yang sama, hanya nilai lightness dan role-nya yang menyesuaikan per mode.

### Dark Mode (Default)
* Background utama: `onyx-950`
* Card background: `onyx-900` atau `plum-900` untuk card sekunder
* Teks utama: putih/`onyx-50`
* Aksen tetap: `chartreuse-500`, `lemon-400`, `toffee-600`

### Light Mode
* Background utama: `onyx-50` (`#f3f1f4`, sudah tersedia sebagai token light dari palette awal)
* Card background: putih bersih atau `onyx-100` (`#e7e3e8`) untuk sedikit kontras dari background
* Teks utama: `onyx-950` atau abu gelap, bukan hitam pekat penuh, biar tidak terlalu keras
* Aksen tetap sama: `chartreuse-500` dan `lemon-400` dipakai sebagai warna highlight/active state, `toffee-600` untuk indikator warna hangat/organik
* Border/divider: gunakan `plum-900` dengan opacity rendah (`/10` sampai `/20`) supaya tetap halus di atas background terang

### Aturan Konsistensi Antar Mode
* Layout, struktur komponen, dan urutan elemen **tidak berubah** antara dark dan light mode, yang berubah murni warna background, teks, dan border.
* Chart (Recharts) harus punya dua set warna, disesuaikan otomatis mengikuti mode aktif (jangan hardcode warna chart, gunakan CSS variable theme).
* Toggle switch mode diletakkan di top header, ikon matahari/bulan standar, sesuai referensi awal.
* Active state sidebar/bottom navbar (background `chartreuse-500`/`lemon-400` + teks `onyx-950`) berlaku sama persis di kedua mode, karena kombinasi ini sudah kontras baik di gelap maupun terang.
* Implementasi teknis pakai mekanisme dark mode bawaan Tailwind v4 (`dark:` variant) dan CSS variable theme, tidak perlu library tambahan di luar stack yang sudah ditentukan.

---

## 📐 Layout Grid

Struktur layout dashboard (dipertahankan dari hasil review sebelumnya):

```
+-----------------------------------------------------------------------+
|  Sidebar   |  Header: Search + AI Insight Badge + User Profile        |
| (EcoStock) |----------------------------------------------------------|
|            |  Sapaan Owner UMKM & Export / Date Actions                |
|  - Overview|----------------------------------------------------------|
|  - Forecast|  Metric Cards (Row of 3):                                |
|  - Waste   |  [ Total Produksi ] [ Sell-Through Rate ] [ Est. Profit ]|
|  - Sales   |----------------------------------------------------------|
|  - Product |  Main Row (2 Columns):                                   |
|  - Profit  |  [ Produksi vs Penjualan ]     [ Waste per Produk ]      |
|            |----------------------------------------------------------|
|  Settings  |  Bottom Row (3 Columns):                                 |
|  Help      |  [ Profit Overview ] [ Rekap Penjualan ] [ Channel Log ] |
+-----------------------------------------------------------------------+
```

### Layout Elements
1. **Navigation Sidebar**: Fixed-width, collapsible, berisi logo, menu navigasi (Overview, AI Forecast, Waste, Sales, Product, Profit), dan kontrol bawah (Settings, Help, Log Out). Detail styling & interaksi lihat section "Sidebar - Detail Styling" di bawah.
2. **Top Header**: Search utility, badge "AI Insight Active", notifikasi, avatar profil owner.
3. **Metrics Grid** (3 kartu ringkasan):
   * **Total Produksi** — jumlah unit/pcs produk yang diproduksi (bukan nominal uang), dengan sparkline tren.
   * **Sell-Through Rate** (dulu "Recycling Rate") — persentase produk yang berhasil terjual habis, ditampilkan dengan gauge chart.
   * **Estimasi Profit Bulan Ini** (dulu "Investment Value") — nominal profit riil skala UMKM, dengan mini bar chart.
4. **Analytics Section**:
   * *Produksi vs Penjualan Overview*: Area/Line chart membandingkan jumlah produksi terhadap penjualan aktual per bulan.
   * *Waste per Produk*: Breakdown produk makanan yang sering bersisa (contoh: Roti Tawar, Kue Brownies, Donat Kentang), lengkap dengan toggle AI Insight berisi rekomendasi teks (contoh: prediksi pengurangan produksi besok).
5. **Data Grid**:
   * *Profit Overview* (dulu "Portfolio Performance"): Tren margin keuntungan harian/mingguan.
   * *Rekap Penjualan Harian* (dulu "Recent Transactions"): Tabel nama produk terjual, jumlah, dan waktu rekap, merepresentasikan alur "Rekap via WhatsApp".
   * *Channel Activity Log* (dulu "Global Recycling Activity"): Ringkasan aktivitas per channel (WhatsApp vs Dashboard), menggantikan peta dunia yang scope-nya tidak relevan untuk UMKM lokal.

---

## 📄 Breakdown Detail Isi Halaman

Lima halaman berikut sesuai BAB III dokumen konsep terpadu, tidak ada penambahan halaman baru.

### 1. Overview (Dashboard Analytics)
* Metric cards: total produksi all-time, total terjual, sisa produk.
* Grafik Produksi vs Penjualan (area/line chart, toggle periode).
* Ringkasan AI & strategi penjualan ke depan dalam bentuk card teks singkat (1-3 kalimat).

### 2. AI Forecast (Prediksi/Rekomendasi Produksi AI)
* Section "Produksi Hari Ini" per produk (data aktual, bukan prediksi).
* Tabel rekomendasi AI: nama produk, jumlah diproduksi hari ini, rekomendasi jumlah besok, alasan singkat (contoh: berdasarkan tren 7 hari terakhir).
* Baris dengan rekomendasi yang menyimpang jauh dari kebiasaan produksi diberi penanda visual agar owner cepat menyadari.
* Empty/loading state untuk produk baru yang datanya belum cukup untuk diprediksi.

### 3. Waste (Waste Analytics)
* Ranking produk yang paling sering bersisa (top 3-5, dengan badge urutan).
* Grafik jumlah limbah harian (bar chart, rentang waktu bisa diubah).
* Estimasi kerugian rupiah dari sisa produk, dihitung otomatis dari harga dikali jumlah sisa.
* AI insight text berisi saran perbaikan per produk.

### 4. Sales (Sales Analytics)
* Ranking produk paling laris.
* Grafik tren penjualan (harian/mingguan, toggle-able).
* Highlight hari dengan penjualan tertinggi.
* Analisis teks AI berdasarkan pola grafik penjualan.

### 5. Product (Produk Management)
* Tabel master produk: nama, kategori, harga jual, status aktif/nonaktif, aksi edit/hapus.
* Search/filter di atas tabel.
* Tombol tambah produk baru, membuka form berisi nama, kategori, dan harga jual saja.
* Modal konfirmasi sebelum produk dihapus.
* Halaman ini khusus master data, tidak menangani input jumlah produksi harian (itu domain halaman AI Forecast).

### 6. Profit (opsional, mengikuti struktur menu sidebar yang sudah berjalan)
* Detail margin keuntungan dan tren harian/mingguan/bulanan.
* Menggantikan konsep "Portfolio Performance" versi lama.

---

## 🧱 Sidebar - Detail Styling

Refinement khusus komponen Sidebar (hasil kombinasi struktur localhost + inspirasi visual mood board tambahan). Ini polish styling/interaksi, bukan perubahan struktur menu.

### Active State — Background Highlight Solid & Rounded
* Item menu aktif ("Overview") memakai background solid `chartreuse-500` atau `lemon-400` (pilih kontras yang paling enak dibaca di atas `onyx-950`), bukan sekadar teks berwarna.
* Teks & icon di dalam item aktif berubah jadi `onyx-950` supaya kontrasnya kuat.
* Border radius rounded penuh (pill-shape atau `rounded-lg`, konsisten dengan sudut card lain).
* Transisi antar state pakai `transition-all duration-300 ease-out`.

### Spacing Antar Menu Item
* Tambah jarak vertikal antar item menu (`gap-2` atau `gap-3`, sesuaikan skala Tailwind yang konsisten).
* Padding internal tiap item (icon + label) sedikit ditambah agar area klik terasa lebih lapang.
* Lebar sidebar keseluruhan tidak berubah.

### Divider Sebelum Bottom Section
* Tambahkan `border-t` tipis untuk memisahkan menu utama dari bottom section (Settings, Help, Log out).
* Warna divider: `plum-900` dengan opacity rendah (contoh: `border-plum-900/30`).
* Margin atas-bawah secukupnya, tidak terlalu sempit.

### Batasan
* Tidak ada penambahan/pengubahan urutan menu.
* Tidak ada perubahan lebar sidebar, posisi logo, atau collapse arrow.
* Tidak perlu animasi kompleks tambahan, state management baru, atau library di luar stack yang sudah ada (Tailwind, Shadcn, Lucide). Ini murni edit className pada komponen yang sudah ada.

---

## 📱 Mobile Responsiveness

Dashboard wajib responsive, termasuk mendukung layar kecil (target minimum: layar setara iPhone 5 / Samsung J2 Prime, lebar sekitar 320px-360px). Ini penting karena owner UMKM makanan mayoritas mengakses lewat HP, bukan laptop.

### Breakpoint Strategy (Tailwind default)
* `sm` (≥640px): mulai transisi ke layout tablet ringan
* Di bawah `sm` (320px-639px): mode mobile penuh, layout satu kolom

### Navigasi Mobile: Bottom Navbar (bukan sidebar collapsible)

Di layar mobile, sidebar digantikan dengan **bottom navigation bar** fixed di bawah layar. Alasan: area bawah lebih mudah dijangkau jempol di layar kecil, dan menghindari masalah umum sidebar tersembunyi yang membuat user pemula kesulitan menemukan menu.

* Tampilkan maksimal **4 item utama** di bottom navbar: **Overview, AI Forecast, Waste, Sales** (menu yang paling sering dipakai owner sehari-hari).
* Sisanya (**Product, Profit**, serta Settings/Help/Log out) digabung ke dalam satu icon **"More"** di ujung kanan bottom navbar, yang membuka bottom sheet atau halaman menu terpisah saat di-tap.
* Icon aktif di bottom navbar mengikuti gaya active state yang sama dengan sidebar desktop (background solid `chartreuse-500`/`lemon-400`, rounded, icon berubah warna `onyx-950`).
* Bottom navbar tetap terlihat penuh (icon + label singkat) meski di layar sekecil 320px, jangan sampai terpotong atau overflow. Jika ruang tidak cukup untuk label, gunakan icon saja dengan ukuran tap target minimal 44x44px (standar aksesibilitas mobile).

### Komponen Lain di Mobile
* Metric cards (3 kolom di desktop) berubah jadi 1 kolom stack vertikal di mobile.
* Chart & tabel (Production vs Sales, Waste per Produk, Rekap Penjualan) tetap 1 kolom penuh, dengan scroll horizontal jika tabel terlalu lebar untuk layar kecil.
* Top header disederhanakan lebih jauh di mobile: search bisa diciutkan jadi icon yang expand saat di-tap, hindari elemen header yang berjejer terlalu banyak di layar sempit.

---

## 🧭 Prinsip Konten (Content Guardrails)

Untuk menjaga konsistensi dengan dokumen konsep, semua komponen baru wajib mengikuti aturan ini:

* Nama produk dalam data dummy harus produk makanan nyata (roti, kue, minuman, frozen food, item catering), **bukan** istilah manufaktur/recycling seperti "Bio-Plastics" atau "Composite Wood".
* Satuan angka utama untuk produksi memakai unit/pcs, bukan mata uang.
* Istilah finansial korporat ("Investment", "Portfolio", "ETF", "Carbon Credits") tidak digunakan; ganti dengan istilah profit/margin yang relevan untuk skala UMKM.
* Setiap AI insight text harus berbunyi seperti rekomendasi produksi harian, bukan analisis investasi atau efisiensi pabrik.
---

## 🛠 Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 (CSS-based theme variables configuration)
* **Components**: Shadcn/ui (Radix-based primitives)
* **Charts**: Recharts (Custom themed)
* **Icons**: Lucide React
* **Data**: Mock/dummy data lokal (tidak ada koneksi backend/API sungguhan, sesuai scope frontend-only)

---

*Dokumen ini bersifat working draft, akan direvisi lebih lanjut mengikuti perkembangan wireframe Excalidraw dari tim.*/clea