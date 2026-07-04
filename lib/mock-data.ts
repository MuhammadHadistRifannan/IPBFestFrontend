// central mock data file for EcoStock AI Dashboard

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "Aktif" | "Nonaktif";
}

export interface ForecastItem {
  id: string;
  name: string;
  category: string;
  todayProduction: number;
  recommendedProduction: number | string;
  reason: string;
  warning: boolean;
  isNew?: boolean;
}

export interface WasteItem {
  id: string;
  name: string;
  wastePercentage: number;
  wasteQty: number; // in Pcs
  unit: string;
  price: number;
  insight: string;
}

export interface SalesItem {
  id: string;
  name: string;
  soldQty: number;
  revenue: number;
}

// 1. Master Product List (For Product Management CRUD)
export const initialProducts: Product[] = [
  { id: "p-1", name: "Roti Tawar Pandan", category: "Roti", price: 15000, status: "Aktif" },
  { id: "p-2", name: "Kue Brownies Cokelat", category: "Kue", price: 80000, status: "Aktif" },
  { id: "p-3", name: "Donat Kentang Gula", category: "Dessert", price: 10000, status: "Aktif" },
  { id: "p-4", name: "Kue Lapis Legit", category: "Kue", price: 300000, status: "Aktif" },
  { id: "p-5", name: "Roti Manis Keju", category: "Roti", price: 12000, status: "Aktif" },
  { id: "p-6", name: "Kopi Susu Aren", category: "Minuman", price: 18000, status: "Aktif" },
  { id: "p-7", name: "Frozen Risol Mayo", category: "Frozen Food", price: 35000, status: "Aktif" },
];

// 2. AI Forecast Data
export const initialForecastData: ForecastItem[] = [
  {
    id: "f-1",
    name: "Roti Tawar Pandan",
    category: "Roti",
    todayProduction: 50,
    recommendedProduction: 45,
    reason: "Permintaan cenderung turun di hari Minggu berdasarkan tren historis 7 hari.",
    warning: false,
  },
  {
    id: "f-2",
    name: "Kue Brownies Cokelat",
    category: "Kue",
    todayProduction: 12,
    recommendedProduction: 8,
    reason: "Sisa produk tinggi kemarin (82%). Disarankan kurangi produksi untuk menjaga margin.",
    warning: true,
  },
  {
    id: "f-3",
    name: "Donat Kentang Gula",
    category: "Dessert",
    todayProduction: 120,
    recommendedProduction: 140,
    reason: "Tingkat sisa sangat rendah (38%). Permintaan meningkat menjelang akhir pekan.",
    warning: false,
  },
  {
    id: "f-4",
    name: "Kue Lapis Legit",
    category: "Kue",
    todayProduction: 5,
    recommendedProduction: 5,
    reason: "Stabilitas permintaan kue premium di akhir pekan tetap tinggi.",
    warning: false,
  },
  {
    id: "f-5",
    name: "Roti Manis Keju",
    category: "Roti",
    todayProduction: 30,
    recommendedProduction: 35,
    reason: "Permintaan naik 15% pada hari Sabtu sebelumnya.",
    warning: false,
  },
  {
    id: "f-6",
    name: "Frozen Risol Mayo",
    category: "Frozen Food",
    todayProduction: 0,
    recommendedProduction: "-",
    reason: "Data transaksi belum mencukupi untuk melakukan prediksi AI. Masukkan rekap WhatsApp minimal 3 hari.",
    warning: false,
    isNew: true,
  },
];

// 3. Waste Analytics Data
export const initialWasteData: WasteItem[] = [
  {
    id: "w-1",
    name: "Kue Brownies Cokelat",
    wastePercentage: 82,
    wasteQty: 10,
    unit: "Pcs",
    price: 80000,
    insight: "Suhu oven yang terlalu tinggi membuat kulit brownies gosong. Tinjau kembali waktu pemanggangan.",
  },
  {
    id: "w-2",
    name: "Roti Tawar Pandan",
    wastePercentage: 64,
    wasteQty: 32,
    unit: "Pcs",
    price: 15000,
    insight: "Optimalisasi pemotongan adonan dapat mengurangi sisa pinggiran roti sebesar 12% besok.",
  },
  {
    id: "w-3",
    name: "Donat Kentang Gula",
    wastePercentage: 38,
    wasteQty: 45,
    unit: "Pcs",
    price: 10000,
    insight: "Produksi donat sangat efisien dengan tingkat sisa di bawah batas aman (38%).",
  },
];

// 4. Sales Analytics Data (Ranking Best Sellers)
export const initialSalesData: SalesItem[] = [
  { id: "s-1", name: "Donat Kentang Gula", soldQty: 120, revenue: 1200000 },
  { id: "s-2", name: "Roti Tawar Pandan", soldQty: 50, revenue: 750000 },
  { id: "s-3", name: "Roti Manis Keju", soldQty: 30, revenue: 360000 },
  { id: "s-4", name: "Kue Brownies Cokelat", soldQty: 12, revenue: 960000 },
  { id: "s-5", name: "Kopi Susu Aren", soldQty: 25, revenue: 450000 },
];

// 5. WhatsApp Transactions Log (WhatsApp Rekap)
export const transactions = [
  {
    id: "tx-1",
    activity: "Roti Tawar Pandan (50 Pcs)",
    category: "WhatsApp Rekap",
    date: "Sab, 04 Jul 2026",
    price: "Rp750.000",
  },
  {
    id: "tx-2",
    activity: "Kue Brownies Cokelat (12 Pcs)",
    category: "WhatsApp Rekap",
    date: "Sab, 04 Jul 2026",
    price: "Rp960.000",
  },
  {
    id: "tx-3",
    activity: "Donat Kentang Gula (120 Pcs)",
    category: "WhatsApp Rekap",
    date: "Jum, 03 Jul 2026",
    price: "Rp1.200.000",
  },
  {
    id: "tx-4",
    activity: "Kue Lapis Legit (5 Loyang)",
    category: "WhatsApp Rekap",
    date: "Kam, 02 Jul 2026",
    price: "Rp1.500.000",
  },
  {
    id: "tx-5",
    activity: "Roti Manis Keju (30 Pcs)",
    category: "WhatsApp Rekap",
    date: "Rabu, 01 Jul 2026",
    price: "Rp360.000",
  },
];

// 6. Channel Log activity data
export const channelData = [
  {
    id: "ch-1",
    name: "WhatsApp Rekap Bot",
    type: "whatsapp",
    status: "aktif",
    usagePercentage: 82,
    totalTrans: "42 Rekap Bulan Ini",
    lastSync: "10 menit lalu",
    colorClass: "bg-chartreuse-500",
    log: "Owner memasukkan rekap penjualan harian Roti Tawar Pandan.",
  },
  {
    id: "ch-2",
    name: "Dashboard Web Owner",
    type: "web",
    status: "aktif",
    usagePercentage: 18,
    totalTrans: "8 Sesi Akses Bulan Ini",
    lastSync: "Baru saja",
    colorClass: "bg-toffee-600",
    log: "AI memperbarui rekomendasi stok produksi kue brownies.",
  },
];

// 7. Sparkline / Historical Trends
export const produksiData = [
  { value: 45000 },
  { value: 52000 },
  { value: 49000 },
  { value: 63000 },
  { value: 58000 },
  { value: 71000 },
  { value: 98400 },
];

export const profitData = [
  { value: 120 },
  { value: 190 },
  { value: 150 },
  { value: 220 },
  { value: 280 },
  { value: 240 },
  { value: 310 },
  { value: 290 },
  { value: 340 },
  { value: 420 },
];

export interface WaMessage {
  id: string;
  sender: "owner" | "bot";
  text: string;
  time: string;
}

export interface WaLogEntry {
  id: string;
  time: string;
  summary: string;
  status: "Sukses" | "Gagal";
}

export const mockWaMessages: WaMessage[] = [
  {
    id: "m-1",
    sender: "owner",
    text: "Rekap hari ini: Roti Tawar Pandan terjual 48 sisa 2. Kue Brownies Cokelat terjual 2 sisa 10.",
    time: "20:05",
  },
  {
    id: "m-2",
    sender: "bot",
    text: "Rekap berhasil dicatat! Data masuk: 50 pcs Roti Tawar Pandan & 12 pcs Kue Brownies Cokelat. Prediksi AI telah diperbarui di dashboard Anda.",
    time: "20:05",
  },
];

export const mockWaLog: WaLogEntry[] = [
  {
    id: "l-1",
    time: "20:05",
    summary: "Rekap: Roti Tawar Pandan & Kue Brownies Cokelat",
    status: "Sukses",
  },
  {
    id: "l-2",
    time: "19:50",
    summary: "Rekap: Donat Kentang Gula",
    status: "Sukses",
  },
  {
    id: "l-3",
    time: "18:30",
    summary: "Rekap: Kue Lapis Legit",
    status: "Sukses",
  },
  {
    id: "l-4",
    time: "17:15",
    summary: "Pesan: 'halo' (tidak sesuai format)",
    status: "Gagal",
  },
];
