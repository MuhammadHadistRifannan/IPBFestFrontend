"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, Plus, Trash2, Edit2, Check, X, AlertTriangle } from "lucide-react";
import { initialProducts, Product } from "@/lib/mock-data";

export function ViewProduct() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal forms state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // New product form inputs
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Handler to toggle product status
  const handleToggleStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "Aktif" ? "Nonaktif" : "Aktif" } : p
      )
    );
  };

  // Handler to save new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCategory || !newPrice) return;

    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name: newName,
      category: newCategory,
      price: parseInt(newPrice) || 0,
      status: "Aktif",
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsAddOpen(false);

    // Clear inputs
    setNewName("");
    setNewCategory("");
    setNewPrice("");
  };

  // Handlers for deleting products
  const handleOpenDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setIsDeleteOpen(false);
      setProductToDelete(null);
    }
  };

  // Handlers for editing price inline
  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setEditPrice(product.price.toString());
  };

  const handleSavePrice = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, price: parseInt(editPrice) || p.price } : p
      )
    );
    setEditingId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            <Package className="h-6 w-6 text-toffee-600 dark:text-toffee-400" />
            Kelola Master Produk
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Tambah, sunting, atau nonaktifkan produk makanan dari katalog menu penjualan Anda.
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="self-start md:self-auto bg-chartreuse-500 text-onyx-950 font-bold hover:bg-chartreuse-600 rounded-xl text-xs h-10 px-4 flex items-center gap-2 cursor-pointer shadow-md shadow-chartreuse-500/10"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Produk</span>
        </Button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex items-center w-full sm:max-w-sm relative">
          <Search className="absolute left-3 h-4 w-4 text-onyx-400 dark:text-onyx-500" />
          <Input
            type="search"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 w-full rounded-xl bg-white dark:bg-onyx-900 border-onyx-200/60 dark:border-onyx-800 focus-visible:ring-chartreuse-500 text-sm"
          />
        </div>

        <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || "all")}>
          <SelectTrigger className="w-full sm:w-[160px] h-10 rounded-xl border-onyx-200/60 dark:border-onyx-800 bg-white dark:bg-onyx-900 text-onyx-700 dark:text-onyx-300 text-xs font-semibold focus:ring-chartreuse-500">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-onyx-950 border-onyx-200 dark:border-onyx-800 rounded-xl text-onyx-800 dark:text-white">
            <SelectItem value="all" className="text-xs rounded-lg cursor-pointer">Semua Kategori</SelectItem>
            {uniqueCategories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-xs rounded-lg cursor-pointer">{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Master Products Table */}
      <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-onyx-50/50 dark:bg-onyx-950/30 border-b border-onyx-100 dark:border-onyx-800">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px] text-xs font-bold text-onyx-700 dark:text-onyx-300">Nama Produk</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300">Kategori</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-right">Harga Jual</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-center">Status Keaktifan</TableHead>
                  <TableHead className="text-xs font-bold text-onyx-700 dark:text-onyx-300 text-right pr-6">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-xs text-onyx-400 dark:text-onyx-500">
                      Tidak ada produk ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="border-b border-onyx-100/50 dark:border-onyx-800/30 last:border-none hover:bg-onyx-50/30 dark:hover:bg-onyx-800/10 transition-colors duration-200">
                      <TableCell className="font-semibold text-onyx-900 dark:text-white py-4 text-xs">
                        {product.name}
                      </TableCell>
                      <TableCell className="py-4 text-xs text-onyx-500 dark:text-onyx-400">
                        <Badge variant="outline" className="border-onyx-200 dark:border-onyx-800 text-[10px] py-0.5 px-2 text-onyx-600 dark:text-onyx-300 bg-onyx-50/50 dark:bg-onyx-950/20">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-4 text-xs font-bold text-onyx-900 dark:text-white">
                        {editingId === product.id ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-onyx-400 text-xs">Rp</span>
                            <Input
                              type="number"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              className="h-8 w-24 text-right rounded-lg border-onyx-200 dark:border-onyx-800 text-xs bg-white dark:bg-onyx-950 p-1"
                            />
                            <Button size="icon" onClick={() => handleSavePrice(product.id)} className="h-7 w-7 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="icon" onClick={() => setEditingId(null)} className="h-7 w-7 rounded-lg bg-rose-500 text-white hover:bg-rose-600">
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1 group/price">
                            <span>Rp{product.price.toLocaleString("id-ID")}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleStartEdit(product)}
                              className="h-6 w-6 rounded-md opacity-0 group-hover/price:opacity-100 text-onyx-400 hover:text-onyx-900 dark:hover:text-white transition-opacity"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-center py-4 text-xs">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold py-0.5 px-2 rounded-full cursor-pointer transition-colors ${
                            product.status === "Aktif"
                              ? "bg-chartreuse-500/10 text-chartreuse-700 dark:text-chartreuse-400 hover:bg-chartreuse-500/20"
                              : "bg-onyx-100 text-onyx-500 dark:bg-onyx-800 dark:text-onyx-450 hover:bg-onyx-200 dark:hover:bg-onyx-700"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${product.status === "Aktif" ? "bg-chartreuse-500" : "bg-onyx-400"}`} />
                          <span>{product.status}</span>
                        </button>
                      </TableCell>
                      <TableCell className="text-right py-4 text-xs pr-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleStartEdit(product)}
                            className="h-8 w-8 rounded-lg text-onyx-400 hover:text-onyx-900 dark:hover:text-white hover:bg-onyx-50 dark:hover:bg-onyx-900"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDelete(product)}
                            className="h-8 w-8 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal (Simple overlay dialog in React) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <CardHeader className="border-b border-onyx-100 dark:border-onyx-850">
              <CardTitle className="text-base font-bold">Tambah Produk Baru</CardTitle>
              <CardDescription className="text-xs text-onyx-500">Masukkan data master produk makanan baru Anda.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAddProduct}>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-onyx-500 uppercase">Nama Produk</label>
                  <Input
                    required
                    placeholder="Contoh: Roti Manis Cokelat"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-9 rounded-lg border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 focus-visible:ring-chartreuse-500 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-onyx-500 uppercase">Kategori</label>
                  <Select value={newCategory} onValueChange={(val) => setNewCategory(val || "")} required>
                    <SelectTrigger className="w-full h-9 rounded-lg border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 text-xs focus:ring-chartreuse-500 text-onyx-700 dark:text-onyx-300">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-onyx-950 border-onyx-200 dark:border-onyx-800 rounded-xl text-onyx-800 dark:text-white">
                      <SelectItem value="Roti" className="text-xs rounded-lg cursor-pointer">Roti</SelectItem>
                      <SelectItem value="Kue" className="text-xs rounded-lg cursor-pointer">Kue</SelectItem>
                      <SelectItem value="Dessert" className="text-xs rounded-lg cursor-pointer">Dessert</SelectItem>
                      <SelectItem value="Minuman" className="text-xs rounded-lg cursor-pointer">Minuman</SelectItem>
                      <SelectItem value="Frozen Food" className="text-xs rounded-lg cursor-pointer">Frozen Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-onyx-500 uppercase">Harga Jual (Rupiah)</label>
                  <Input
                    required
                    type="number"
                    placeholder="Contoh: 15000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="h-9 rounded-lg border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 focus-visible:ring-chartreuse-500 text-xs"
                  />
                </div>
              </CardContent>
              <div className="p-4 bg-onyx-50 dark:bg-onyx-950/40 border-t border-onyx-100 dark:border-onyx-850 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddOpen(false)}
                  className="h-9 text-xs rounded-lg text-onyx-500 hover:bg-onyx-100 dark:hover:bg-onyx-900"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs rounded-lg bg-chartreuse-500 text-onyx-950 font-bold hover:bg-chartreuse-600"
                >
                  Simpan Produk
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-sm border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <CardContent className="p-5 flex flex-col items-center text-center space-y-4 pt-6">
              <div className="h-12 w-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold">Hapus Produk Ini?</h3>
                <p className="text-xs text-onyx-500 dark:text-onyx-400 leading-relaxed">
                  Apakah Anda yakin ingin menghapus produk <strong>{productToDelete.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </CardContent>
            <div className="p-4 bg-onyx-50 dark:bg-onyx-950/40 border-t border-onyx-100 dark:border-onyx-850 flex items-center justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setProductToDelete(null);
                }}
                className="h-9 text-xs rounded-lg text-onyx-500 hover:bg-onyx-100 dark:hover:bg-onyx-900"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="h-9 text-xs rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-600"
              >
                Hapus Permanen
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
