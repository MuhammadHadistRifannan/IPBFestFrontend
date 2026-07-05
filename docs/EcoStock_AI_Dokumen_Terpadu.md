**EcoStock AI**

Dokumen Konsep Terpadu

Gabungan hasil diskusi awal & diagram alur sistem tim

IT Festival 2026 | Software Development Competition | Subtema: Green Economy

|  |
| --- |
| **Elevator Pitch**  *EcoStock AI adalah platform berbasis kecerdasan buatan yang membantu UMKM makanan memprediksi jumlah produksi harian melalui analisis data produksi dan penjualan. Dengan integrasi WhatsApp untuk rekap harian dan dashboard web untuk analisis AI, EcoStock AI membantu mengurangi overproduksi, menekan limbah produk, menghemat bahan baku, serta meningkatkan keuntungan usaha secara berkelanjutan.* |

# **BAB I | Latar Belakang Masalah**

UMKM makanan sering memproduksi terlalu banyak tanpa dasar data yang akurat. Hal ini menimbulkan rantai masalah yang saling berkaitan:

|  |  |
| --- | --- |
| **Masalah** | **Dampak** |
| **Produksi berlebih** | UMKM memproduksi lebih banyak dari permintaan aktual |
| **Produk tidak habis terjual** | Sisa produk menumpuk di akhir hari |
| **Produk menjadi limbah** | Produk makanan tidak tahan lama, akhirnya terbuang |
| **Bahan baku terbuang** | Biaya bahan baku yang sudah dikeluarkan jadi sia-sia |
| **Profit menurun** | Biaya produksi tidak sebanding dengan pendapatan |

## **1.1 Solusi**

* AI memprediksi jumlah produksi yang tepat berdasarkan histori penjualan
* Produksi disesuaikan dengan permintaan aktual, bukan sekadar estimasi manual

## **1.2 Keunggulan**

* Sangat sesuai dengan tema Green Economy
* AI menjadi inti/core dari sistem, bukan sekadar fitur tambahan
* Konsep mudah dipahami juri karena problem-solution jelas
* Mudah dibuat MVP dalam waktu terbatas

# **BAB II | Keputusan Final Konsep**

## **2.1 Ide Utama**

EcoStock AI adalah platform AI untuk UMKM makanan yang membantu memprediksi jumlah produksi harian agar tidak terjadi overproduksi yang menyebabkan limbah produk, pemborosan bahan baku, dan penurunan keuntungan.

## **2.2 Target Pengguna**

|  |
| --- |
| **Owner UMKM Makanan (satu-satunya role utama)**  *Contoh: Bakery, Toko Roti, Toko Kue, Catering, Frozen Food, Kedai Minuman. Tidak ada role lain yang ditampilkan saat presentasi -- admin hanya kebutuhan teknis internal.* |

## **2.3 Keunikan Utama**

Bukan aplikasi yang memaksa owner selalu membuka dashboard. Konsepnya:

|  |  |
| --- | --- |
| **WhatsApp** | **Dashboard** |
| Input harian (produksi & penjualan) | Analisis AI & prediksi |

*Owner cukup menggunakan WhatsApp untuk aktivitas sehari-hari, sementara dashboard digunakan saat ingin melihat hasil analisis dan rekomendasi produksi dari AI.*

# **BAB III | Struktur Fitur (dari Diagram Tim)**

Berikut adalah breakdown detail fitur berdasarkan diagram alur yang telah disusun tim, mencakup fungsi dan alasan (intinya) di balik setiap fitur.

## **3.1 Dashboard Analytics**

Menampilkan total produksi selama ini, produk terjual, sisa produk, grafik, serta ringkasan AI & strategi.

|  |
| --- |
| **Intinya**  *Fitur ini buat ringkasan banyaknya produksi secara all time per produk, juga sisa produk yang dihasilkan. Ada grafik untuk membaca data tersebut lebih enak, plus ringkasan AI dan strategi penjualan kedepannya.* |

## **3.2 Prediksi / Rekomendasi Produksi AI**

Menampilkan produksi hari ini & rekomendasi jumlah produksi per jenis produk supaya mengurangi limbah produk dan menambah keuntungan.

|  |
| --- |
| **Intinya**  *Ini fitur utamanya -- untuk rekomendasi AI agar produksi besok tidak terlalu banyak menghasilkan limbah dan keuntungan menjadi meningkat.* |

## **3.3 Waste Analytics**

Menampilkan produk sering sisa, jumlah limbah per hari, serta estimasi kerugian berdasarkan AI.

|  |
| --- |
| **Intinya**  *Produk apa yang paling sering bersisa, nanti AI bakal menghitung kerugian akibat produk sisa itu.* |

## **3.4 Sales Analytics**

Menampilkan produk paling laris dan juga grafik penjualan serta hari dengan penjualan tertinggi. Analisis AI berdasarkan data grafik.

|  |
| --- |
| **Intinya**  *Produk apa yang all time laris banget, lalu dibuatkan grafik penjualannya, AI memberi analisis teks berdasarkan grafik tersebut.* |

## **3.5 Produk Management (Tambah / Hapus / Edit Produk)**

Menambah, menghapus, dan mengedit jenis produk yang akan dijual. Rekomendasi stok diberikan AI lewat data penjualan hari ini.

|  |
| --- |
| **Intinya**  *CRUD di sini biasanya untuk menambah jenis produk, tapi tidak termasuk jumlah produksinya -- karena nanti rekomendasi jumlah produksi akan diberikan oleh AI.* |

## **3.6 Rekap via WhatsApp**

Merekap hasil penjualan hari ini melalui WhatsApp, serta menambah jumlah produksi harian.

|  |
| --- |
| **Intinya**  *Karena pelaku UMKM lebih sering membuka WhatsApp ketimbang web, rekap dilakukan di sana saja plus menambah jumlah produksi per jenis produk.* |

# **BAB IV | Application Flow (Arsitektur Sistem)**

Berikut adalah alur sistem EcoStock AI berdasarkan diagram Excalidraw yang telah disusun oleh tim.

## **4.1 Alur Utama**

* User dapat mengakses sistem melalui dua jalur: Web App atau WhatsApp
* Web App terhubung dua arah dengan Backend Server
* WhatsApp terhubung dua arah dengan Backend Server
* Backend Server terhubung dua arah dengan AI Server (Gemini)
* Backend Server terhubung dua arah dengan MySQL Database

## **4.2 Diagram Alur**

|  |  |  |  |
| --- | --- | --- | --- |
| **User** | **Channel** | **Backend Server** | **Layanan Terhubung** |
| Owner UMKM | Web App / WhatsApp | Pusat pemrosesan logic & request | AI Server (Gemini) & MySQL Database |

|  |
| --- |
| **Catatan Penting**  *AI Server menggunakan Gemini (bukan Python FastAPI + Prophet/XGBoost seperti draf awal). Database yang disepakati tim adalah MySQL. Keputusan ini menggantikan opsi sebelumnya dan menjadi acuan resmi untuk pengembangan backend.* |

# **BAB V | Tech Stack Terbaru**

|  |  |  |
| --- | --- | --- |
| **Layer** | **Teknologi** | **Keterangan** |
| **Frontend** | Next.js 14 + Tailwind CSS + shadcn/ui | Dashboard web untuk owner UMKM |
| **Backend** | ASP.NET Core Web API | REST API, autentikasi, business logic |
| **AI Service** | Gemini API | Prediksi produksi & analisis teks otomatis |
| **Database** | MySQL | Penyimpanan seluruh data transaksi |
| **WhatsApp** | Fonnte / Wablas | Bot input harian via WhatsApp |

# **BAB VI | Rangkuman Peran (Role) Pengguna**

EcoStock AI hanya memiliki satu role aktif: Owner UMKM Makanan. Berikut ringkasan aksi yang dapat dilakukan berdasarkan channel akses.

|  |  |  |
| --- | --- | --- |
| **Aksi** | **WhatsApp** | **Dashboard** |
| Tambah jumlah produksi harian | Ya | Tidak |
| Rekap penjualan harian | Ya | Tidak |
| Tambah jenis produk baru | Tidak | Ya (CRUD) |
| Edit / hapus produk | Tidak | Ya |
| Lihat Dashboard Analytics | Tidak | Ya |
| Lihat Prediksi/Rekomendasi AI | Tidak | Ya |
| Lihat Waste Analytics | Tidak | Ya |
| Lihat Sales Analytics | Tidak | Ya |

*Dokumen ini menggabungkan hasil diskusi konsep awal EcoStock AI dengan diagram alur sistem (Excalidraw) yang disusun oleh tim, sebagai acuan resmi pengembangan.*