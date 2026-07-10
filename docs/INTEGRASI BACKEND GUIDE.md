# Panduan Integrasi Data Dinamis Frontend ke Backend (EcoStock AI)

Dokumen ini memetakan seluruh komponen visual (View) di folder [components/](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components) ke rancangan endpoint REST API yang harus disediakan oleh Backend. Panduan ini dibuat agar tim backend bisa memahami struktur data yang dikonsumsi frontend tanpa mengubah kode (*codebase*) frontend saat ini.

---

## 1. Halaman Overview
* **File Utama**: [components/view-overview.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/view-overview.tsx)
* **Kebutuhan Data & Sub-Komponen**:
  Halaman Overview memuat beberapa sub-komponen (kartu informasi) yang masing-masing menggunakan data dinamis berikut:

  ### A. Trend Charts & Metric Cards (Overview Utama)
  * **Komponen**: [components/production-chart.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/production-chart.tsx)
  * **Data**: Angka total produksi, sell-through rate (STR), total kerugian material, dan riwayat tren harian untuk chart.
  * **Catatan Integrasi**: `AreaChart` diatur simetris dengan margin `left: 20` & `right: 55` serta sumbu Y `width={55}` untuk mencegah angka nominal k terpotong.

  ### B. Rekap Penjualan Terkini (Recent Transactions)
  * **Komponen**: [components/recent-transactions.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/recent-transactions.tsx)
  * **Data**: Log audit transaksi rekap harian terakhir yang masuk via WhatsApp Bot.
  * **Tindakan UX**: Menerima properti `setActiveTab` untuk navigasi langsung ke tab `"sales"` (Penjualan) saat tombol ikon `ArrowUpRight` diklik.
  * **Fields**: `id` (string), `activity` (nama produk & jumlah pcs), `category` (selalu "WhatsApp Rekap"), `date` (tanggal format text), `price` (total nilai omzet).

  ### C. Sisa Bahan & Makanan (Waste Progress)
  * **Komponen**: [components/waste-progress.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/waste-progress.tsx)
  * **Data**: Persentase optimalisasi sisa produk untuk mengetahui efisiensi pemanfaatan adonan beserta rekomendasi AI instan.
  * **Tindakan UX**: Menerima properti `setActiveTab` untuk navigasi langsung ke tab `"waste"` (Analisis Sisa) saat tombol ikon `ArrowUpRight` diklik.
  * **Fields**: `name` (nama produk), `wastePercentage` (angka rasio sisa), `wasteQty` (jumlah pcs sisa), `unit` (satuan, e.g. "Pcs"), `insight` (rekomendasi teks singkat dari AI).

  ### D. Aktivitas Channel Masuk (Activity Map)
  * **Komponen**: [components/activity-map.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/activity-map.tsx)
  * **Data**: Statistik pembagian porsi data masuk antara WhatsApp Bot dan Web Dashboard (e.g. rasio pemakaian).
  * **Fields**: `name` (nama channel), `type` ("whatsapp" | "web"), `usagePercentage` (persentase porsi penggunaan), `totalTrans` (jumlah transaksi bulan ini), `lastSync` (status sinkronisasi terakhir, e.g. "10 menit lalu").

  ### E. Ikhtisar Keuntungan (Portfolio Performance)
  * **Komponen**: [components/portfolio-performance.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/portfolio-performance.tsx)
  * **Data**: Rincian kontribusi keuntungan per kategori produk makanan serta **Daftar Produk Penyumbang Laba Terbesar (Top Profit Drivers)** yang berubah secara dinamis sesuai kategori yang dipilih.
  * **Tindakan UX**: Menerima properti `setActiveTab` untuk navigasi langsung ke tab `"profit"` (Keuntungan) saat tombol ikon `ArrowUpRight` diklik.
  * **Fields**: 
    * Kategori: `id` (string), `name` (nama kategori), `type` (sub-label), `value` (nilai profit kategori), `growth` (persentase pertumbuhan).
    * Daftar Produk Terlaris (Dinamis per Kategori): `name` (nama menu makanan), `profit` (laba bersih nominal), `str` (angka persentase sell-through rate).

* **Rekomendasi Endpoint API**:
  * **`GET /api/analytics/overview`**
  * **Struktur Response**:
    ```json
    {
      "totalProduced": 98400,
      "sellThroughRate": 76.2,
      "totalLoss": 2700000,
      "productionChart": [
        { "name": "Sen", "Produksi": 45000, "Terjual": 38000 },
        { "name": "Sel", "Produksi": 52000, "Terjual": 41000 }
      ],
      "recentLogs": [
        { "id": "tx-1", "activity": "Roti Tawar Pandan (50 Pcs)", "category": "WhatsApp Rekap", "date": "Sab, 04 Jul 2026", "price": "Rp750.000" }
      ],
      "wasteProgress": [
        { "name": "Kue Brownies Cokelat", "wastePercentage": 82, "wasteQty": 10, "unit": "Pcs", "insight": "Suhu oven tinggi..." }
      ],
      "channelActivity": [
        { "id": "ch-1", "name": "WhatsApp Rekap Bot", "type": "whatsapp", "usagePercentage": 82, "totalTrans": "42 Rekap", "lastSync": "10 menit lalu" }
      ],
      "categoryProfitOverview": {
        "asset-1": [
          { "name": "Brownies Cokelat", "profit": "Rp12,4 Jt", "str": 89 },
          { "name": "Roti Tawar Pandan", "profit": "Rp8,2 Jt", "str": 92 }
        ],
        "asset-2": [
          { "name": "Kopi Susu Aren", "profit": "Rp10,5 Jt", "str": 95 },
          { "name": "Matcha Latte", "profit": "Rp4,5 Jt", "str": 82 }
        ],
        "asset-3": [
          { "name": "Puding Sutra Mangga", "profit": "Rp15,2 Jt", "str": 88 },
          { "name": "Croissant Cokelat", "profit": "Rp8,4 Jt", "str": 82 }
        ]
      }
    }
    ```

---

## 2. Halaman AI Forecast (Prediksi Produksi)
* **File Utama**: [components/view-forecast.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/view-forecast.tsx)
* **Kebutuhan Data**:
  * Daftar rekomendasi jumlah produksi harian per produk.
  * Teks penjelasan alasan rekomendasi AI (*reasoning*).
  * Indikator peringatan (*warning*) jika sisa produk terlalu tinggi sebelumnya.
  * Tombol aksi "Perbarui Prediksi" untuk men-trigger refresh AI.
* **Rekomendasi Endpoint API**:
  * **`GET /api/forecasts/latest`** (Mengambil data ramalan produksi terakhir).
  * **`POST /api/forecasts/generate`** (Menjalankan Gemini API untuk menghitung prediksi baru).
  * **Struktur Response (`GET /api/forecasts/latest`)**:
    ```json
    [
      {
        "id": "f-1",
        "name": "Roti Tawar Pandan",
        "category": "Roti",
        "todayProduction": 50,
        "recommendedProduction": 45,
        "reason": "Permintaan cenderung turun di hari Minggu berdasarkan tren historis 7 hari.",
        "warning": false,
        "reliability": "Tinggi"
      }
    ]
    ```

---

## 3. Halaman Waste Analytics
* **File Utama**: [components/view-waste.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/view-waste.tsx)
* **Kebutuhan Data**:
  * Daftar produk dengan persentase sisa terbuang (*waste*).
  * Estimasi kerugian finansial per jenis produk.
  * Insight rekomendasi pembenahan kualitas dari AI (misalnya: suhu pemanggangan, porsi potongan).
  * Grafik histogram mingguan/bulanan dari tren sisa produk.
* **Rekomendasi Endpoint API**:
  * **`GET /api/analytics/waste`**
  * **Struktur Response**:
    ```json
    {
      "totalGlobalLoss": 1250000,
      "wasteList": [
        {
          "id": "w-1",
          "name": "Kue Brownies Cokelat",
          "wastePercentage": 82,
          "wasteQty": 10,
          "unit": "Pcs",
          "price": 80000,
          "insight": "Suhu oven yang terlalu tinggi membuat kulit brownies gosong. Tinjau kembali waktu pemanggangan."
        }
      ],
      "trendData": [
        { "name": "Sen", "Sisa": 12 },
        { "name": "Sel", "Sisa": 8 }
      ]
    }
    ```

---

## 4. Halaman Sales Analytics
* **File Utama**: [components/view-sales.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/view-sales.tsx)
* **Kebutuhan Data**:
  * Daftar ranking produk terlaris beserta jumlah terjual dan total omzet.
  * Grafik area tren penjualan harian/mingguan.
  * Analisis teks pola penjualan oleh AI (contoh: hari terlaris, produk favorit).
* **Rekomendasi Endpoint API**:
  * **`GET /api/analytics/sales`**
  * **Struktur Response**:
    ```json
    {
      "bestSellers": [
        { "id": "s-1", "name": "Donat Kentang Gula", "soldQty": 120, "revenue": 1200000 }
      ],
      "trendData": [
        { "name": "Sen", "Penjualan": 900000 },
        { "name": "Sel", "Penjualan": 1400000 }
      ],
      "aiSummary": "Donat Kentang Gula menyumbang 45% dari total omzet Anda minggu ini. Puncak penjualan terjadi pada hari Sabtu."
    }
    ```

---

## 5. Halaman Profit Analytics
* **File Utama**: [components/view-profit.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/view-profit.tsx)
* **Kebutuhan Data**:
  * Grafik garis perbandingan Omzet vs Keuntungan Bersih bulanan.
  * Data persentase margin laba dan pertumbuhan laba berdasarkan kategori produk (Roti, Kue, Minuman).
* **Rekomendasi Endpoint API**:
  * **`GET /api/analytics/profit`**
  * **Struktur Response**:
    ```json
    {
      "profitTrend": [
        { "name": "Jan", "Omzet": 45, "Keuntungan": 30.6 },
        { "name": "Feb", "Omzet": 52, "Keuntungan": 35.4 }
      ],
      "categories": [
        { "name": "Roti & Kue", "profit": 32500000, "margin": 64, "growth": 14.2, "isPositive": true }
      ]
    }
    ```

---

## 6. Halaman Kelola Produk (CRUD Katalog)
* **File Utama**: [components/view-product.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/view-product.tsx)
* **Kebutuhan Aksi & Data**:
  * Menampilkan semua daftar produk (`GET`).
  * Menambah produk baru lengkap dengan berkas gambar (`POST`).
  * Mengedit nama, kategori, harga, status aktif, dan mengunggah ulang foto produk (`PUT`).
  * Menghapus produk (`DELETE`).
* **Catatan Integrasi Backend**:
  * **Filter Kategori Utama**: Menggunakan parameter filter bahasa Indonesia `"Semua"` (huruf S kapital) alih-alih `"all"` untuk mengambil seluruh data produk.
  * **Unggah Foto Berkas (File Upload)**: Uploader foto di sisi klien sekarang mengolah file asli via input. API backend untuk `POST` dan `PUT` harus siap memproses tipe konten `multipart/form-data` yang memuat berkas gambar biner, menyimpannya di penyimpanan awan/server, dan mengembalikan tautan URL gambar permanen.
* **Rekomendasi Endpoint API**:
  * **`GET /api/products`** (Mendukung parameter `?category=Semua` atau filter kategori tertentu).
  * **`POST /api/products`** (Tipe konten `multipart/form-data` dengan payload fields: `name`, `category`, `price`, `status`, `image`).
  * **`PUT /api/products/{id}`** (Mendukung pembaruan parsial atau unggah ulang gambar baru).
  * **`DELETE /api/products/{id}`**

---

## 7. Header (Notifikasi & Profil Pengguna)
* **File Utama**: [components/dashboard-header.tsx](file:///home/pputra/Documents/Project-Web/ipbfest-frontend/components/dashboard-header.tsx)
* **Kebutuhan Data**:
  * **Daftar Notifikasi**: Riwayat notifikasi sistem dan rekomendasi AI (e.g. peringatan stok kritis, pembaruan rekomendasi AI).
  * **Profil Pengguna**: Nama owner (e.g. "Pratama Putra"), email, dan foto avatar.
* **Rekomendasi Endpoint API**:
  * **`GET /api/notifications`** (Mengambil daftar notifikasi terbaru).
  * **`PUT /api/notifications/{id}/read`** (Menandai notifikasi telah dibaca).
  * **`GET /api/user/profile`** (Mengambil informasi profil user yang sedang login).
  * **Struktur Response (`GET /api/notifications`)**:
    ```json
    [
      { "id": 1, "type": "system", "text": "WhatsApp Rekap berhasil diimpor", "time": "5 mnt lalu", "unread": true },
      { "id": 2, "type": "ai", "text": "Rekomendasi Roti Tawar diperbarui", "time": "1 jam lalu", "unread": true }
    ]
    ```
  * **Struktur Response (`GET /api/user/profile`)**:
    ```json
    {
      "name": "Pratama Putra",
      "email": "pratama.putra@ecostock.ai",
      "avatarUrl": "https://images.unsplash.com/..."
    }
    ```
