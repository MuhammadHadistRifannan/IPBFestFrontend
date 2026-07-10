"use client";

import React, { useState, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Trash2, Edit2, Check, X, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { initialProducts, Product } from "@/lib/mock-data";

interface ProductWithImage extends Product {
  image?: string;
}

export function ViewProduct() {
  const [products, setProducts] = useState<ProductWithImage[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  // Add Modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState<string>("/brownies.webp");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit Modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductWithImage | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Delete Modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductWithImage | null>(null);

  // Filter products based on search & category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "Semua" || product.category === categoryFilter;
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

  // Handler for file selection in Add Modal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setNewImage(url);
    }
  };

  // Handler for file selection in Edit Modal
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditImage(url);
    }
  };

  // Handler to save new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCategory || !newPrice) return;

    const newProduct: ProductWithImage = {
      id: `p-${Date.now()}`,
      name: newName,
      category: newCategory,
      price: parseInt(newPrice) || 0,
      status: "Aktif",
      image: newImage,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsAddOpen(false);

    // Clear inputs
    setNewName("");
    setNewCategory("");
    setNewPrice("");
    setNewImage("/brownies.webp");
  };

  // Handler to open Edit Modal
  const handleOpenEdit = (product: ProductWithImage) => {
    setProductToEdit(product);
    setEditName(product.name);
    setEditCategory(product.category);
    setEditPrice(product.price.toString());
    setEditImage(product.image || "/brownies.webp");
    setIsEditOpen(true);
  };

  // Handler to save product edits
  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productToEdit || !editName || !editCategory || !editPrice) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productToEdit.id
          ? {
              ...p,
              name: editName,
              category: editCategory,
              price: parseInt(editPrice) || 0,
              image: editImage,
            }
          : p
      )
    );
    setIsEditOpen(false);
    setProductToEdit(null);
  };

  // Handlers for deleting products
  const handleOpenDelete = (product: ProductWithImage) => {
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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-onyx-900 dark:text-white flex items-center gap-2">
            Kelola Produk
          </h1>
          <p className="text-sm text-onyx-500 dark:text-onyx-400 mt-1">
            Kelola daftar katalog menu makanan aktif dan nonaktif yang Anda tawarkan.
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="self-start md:self-auto bg-chartreuse-500 text-onyx-950 font-bold hover:bg-chartreuse-600 rounded-xl text-xs h-10 px-4 flex items-center gap-2 cursor-pointer shadow-md shadow-chartreuse-500/10 border-none"
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

        <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val || "Semua")}>
          <SelectTrigger className="w-full sm:w-[160px] h-10 rounded-xl border-onyx-200/60 dark:border-onyx-800 bg-white dark:bg-onyx-900 text-onyx-700 dark:text-onyx-300 text-xs font-bold focus:ring-chartreuse-500 cursor-pointer">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-onyx-950 border-onyx-200 dark:border-onyx-800 rounded-xl text-onyx-800 dark:text-white">
            <SelectItem value="Semua" className="text-xs rounded-lg cursor-pointer">Semua Kategori</SelectItem>
            {uniqueCategories.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-xs rounded-lg cursor-pointer">{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid Kartu Master Produk */}
      {filteredProducts.length === 0 ? (
        <Card className="border border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60 backdrop-blur-md rounded-2xl p-12 text-center shadow-sm">
          <p className="text-sm text-onyx-400 dark:text-onyx-500 font-medium">
            Tidak ada produk ditemukan.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className={cn(
                "border backdrop-blur-md rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all duration-350 hover:shadow-md hover:-translate-y-0.5",
                product.status === "Aktif"
                  ? "border-onyx-200/50 dark:border-onyx-800 bg-white/70 dark:bg-onyx-900/60"
                  : "border-onyx-200/30 dark:border-onyx-800/30 bg-onyx-50/40 dark:bg-onyx-950/20 opacity-70"
              )}
            >
              <div className="space-y-4">
                {/* Image Cover & Category Pill */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-onyx-200/40 dark:border-onyx-800/40 bg-onyx-100 dark:bg-onyx-950 shadow-inner">
                  <img
                    src={product.image || "/brownies.webp"}
                    className="h-full w-full object-cover"
                    alt={product.name}
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <Badge variant="outline" className="border-onyx-200/80 dark:border-onyx-800/80 text-[10px] font-bold py-0.5 px-2 bg-white/80 dark:bg-onyx-900/90 text-onyx-700 dark:text-onyx-300 backdrop-blur-sm shadow-sm">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                {/* Name & Price Section */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-onyx-900 dark:text-white leading-snug truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-sm font-black text-onyx-900 dark:text-white">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Control Bar */}
              <div className="pt-4 mt-4 border-t border-onyx-200/40 dark:border-onyx-800/40 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleToggleStatus(product.id)}
                  className={cn(
                    "flex items-center gap-2 py-1.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border-none",
                    product.status === "Aktif"
                      ? "bg-chartreuse-500/10 text-chartreuse-700 dark:text-chartreuse-450 hover:bg-chartreuse-500/20"
                      : "bg-onyx-100 text-onyx-500 dark:bg-onyx-800/60 dark:text-onyx-450 hover:bg-onyx-200 dark:hover:bg-onyx-800"
                  )}
                >
                  <span className={cn(
                    "h-2 w-2 rounded-full",
                    product.status === "Aktif" ? "bg-chartreuse-500 shadow-[0_0_8px_var(--color-chartreuse-500)]" : "bg-onyx-400"
                  )} />
                  <span>{product.status}</span>
                </button>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEdit(product)}
                    className="h-8 w-8 rounded-lg text-onyx-400 hover:text-onyx-955 dark:hover:text-white hover:bg-onyx-50 dark:hover:bg-onyx-900 cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDelete(product)}
                    className="h-8 w-8 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-955/20 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Product Modal (Simple overlay dialog in React) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <CardHeader className="border-b border-onyx-100 dark:border-onyx-850">
              <CardTitle className="text-base font-bold">Tambah Produk Baru</CardTitle>
              <CardDescription className="text-xs text-onyx-500">Masukkan data produk makanan baru Anda.</CardDescription>
            </CardHeader>
            <form onSubmit={handleAddProduct}>
              <CardContent className="p-5 space-y-4">
                {/* Image Upload Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Foto Produk</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-onyx-200 dark:border-onyx-800 hover:border-chartreuse-500 rounded-xl p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 bg-onyx-50/50 dark:bg-onyx-900/30"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                    {newImage !== "/brownies.webp" ? (
                      <div className="relative h-20 w-32 rounded-lg overflow-hidden border border-onyx-200 dark:border-onyx-850 shadow-sm">
                        <img src={newImage} className="h-full w-full object-cover" alt="Preview" />
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewImage("/brownies.webp");
                          }}
                          className="absolute top-1 right-1 h-5 w-5 bg-rose-500 text-white rounded-full flex items-center justify-center hover:bg-rose-600 cursor-pointer border-none shadow-sm"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="h-5 w-5 text-onyx-400 dark:text-onyx-500" />
                        <span className="text-xs text-onyx-500 dark:text-onyx-400 font-semibold">Unggah foto produk</span>
                        <span className="text-[10px] text-onyx-400 dark:text-onyx-500">Mendukung berkas JPG, PNG, atau WebP</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Nama Produk</label>
                  <Input
                    required
                    placeholder="Contoh: Roti Manis Cokelat"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="h-9 rounded-lg border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 focus-visible:ring-chartreuse-500 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Kategori</label>
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Harga Jual (Rupiah)</label>
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
                  className="h-9 text-xs rounded-lg text-onyx-500 hover:bg-onyx-100 dark:hover:bg-onyx-900 cursor-pointer"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs rounded-lg bg-chartreuse-500 text-onyx-950 font-bold hover:bg-chartreuse-600 cursor-pointer border-none"
                >
                  Simpan Produk
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditOpen && productToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-950 text-onyx-900 dark:text-white rounded-2xl overflow-hidden shadow-2xl animate-scaleIn">
            <CardHeader className="border-b border-onyx-100 dark:border-onyx-850">
              <CardTitle className="text-base font-bold">Edit Informasi Produk</CardTitle>
              <CardDescription className="text-xs text-onyx-500">Ubah detail katalog produk makanan ini.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProductEdit}>
              <CardContent className="p-5 space-y-4">
                {/* Image Edit Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Foto Produk</label>
                  <div 
                    onClick={() => editFileInputRef.current?.click()}
                    className="border-2 border-dashed border-onyx-200 dark:border-onyx-800 hover:border-chartreuse-500 rounded-xl p-4 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 bg-onyx-50/50 dark:bg-onyx-900/30"
                  >
                    <input 
                      type="file" 
                      ref={editFileInputRef} 
                      onChange={handleEditFileChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                    <div className="relative h-20 w-32 rounded-lg overflow-hidden border border-onyx-200 dark:border-onyx-850 shadow-sm">
                      <img src={editImage} className="h-full w-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <span className="text-[10px] text-onyx-400 dark:text-onyx-500 font-semibold">Klik gambar di atas untuk mengganti foto</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Nama Produk</label>
                  <Input
                    required
                    placeholder="Contoh: Roti Manis Cokelat"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-9 rounded-lg border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 focus-visible:ring-chartreuse-500 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Kategori</label>
                  <Select value={editCategory} onValueChange={(val) => setEditCategory(val || "")} required>
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-onyx-500">Harga Jual (Rupiah)</label>
                  <Input
                    required
                    type="number"
                    placeholder="Contoh: 15000"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="h-9 rounded-lg border-onyx-200 dark:border-onyx-800 bg-white dark:bg-onyx-900 focus-visible:ring-chartreuse-500 text-xs"
                  />
                </div>
              </CardContent>
              <div className="p-4 bg-onyx-50 dark:bg-onyx-950/40 border-t border-onyx-100 dark:border-onyx-850 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsEditOpen(false);
                    setProductToEdit(null);
                  }}
                  className="h-9 text-xs rounded-lg text-onyx-500 hover:bg-onyx-100 dark:hover:bg-onyx-900 cursor-pointer"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="h-9 text-xs rounded-lg bg-chartreuse-500 text-onyx-950 font-bold hover:bg-chartreuse-600 cursor-pointer border-none"
                >
                  Simpan Perubahan
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
              <div className="space-y-1.5">
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
                className="h-9 text-xs rounded-lg text-onyx-500 hover:bg-onyx-100 dark:hover:bg-onyx-900 cursor-pointer"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="h-9 text-xs rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-600 cursor-pointer border-none"
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
