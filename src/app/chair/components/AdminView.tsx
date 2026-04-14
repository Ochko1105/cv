"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BadgePercent,
  CheckSquare,
  Eye,
  Plus,
  Search,
  ShieldCheck,
  Square,
  Trash2,
} from "lucide-react";
import {
  ADMIN_TOGGLE_LABELS,
  formatPrice,
  getDiscountPercent,
  matchesProductSearch,
} from "../chair-utils";
import type {
  AdminToggleField,
  ChairAppModel,
  Product,
} from "../chair-types";
import { Button, Card } from "./ui";

interface AdminViewProps {
  app: ChairAppModel;
}

type AdminQuickFilter = "all" | "discounted" | "trending" | "new-arrival";
type AdminTypeFilter = "All" | Product["type"];
type AdminSortOption = "latest" | "price-asc" | "price-desc" | "rating-desc";

const updateNumberField = (
  app: ChairAppModel,
  productId: number,
  field: "price" | "rating" | "trendScore",
  value: string,
) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return;

  const normalizedValue =
    field === "rating"
      ? Number(Math.min(5, Math.max(0, numericValue)).toFixed(1))
      : field === "trendScore"
        ? Math.min(100, Math.max(0, Math.round(numericValue)))
        : Math.max(0, Math.round(numericValue));

  app.updateProduct(productId, {
    [field]: normalizedValue,
  } as Partial<Product>);
};

const updateOriginalPrice = (
  app: ChairAppModel,
  productId: number,
  value: string,
) => {
  if (value.trim().length === 0) {
    app.updateProduct(productId, { originalPrice: null });
    return;
  }

  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) return;

  app.updateProduct(productId, {
    originalPrice: Math.max(0, Math.round(numericValue)),
  });
};

export const AdminView = ({ app }: AdminViewProps) => {
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [bulkDeletePending, setBulkDeletePending] = useState(false);
  const [activeSummaryFilter, setActiveSummaryFilter] =
    useState<AdminQuickFilter>("all");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminTypeFilter, setAdminTypeFilter] =
    useState<AdminTypeFilter>("All");
  const [adminSortBy, setAdminSortBy] = useState<AdminSortOption>("latest");
  const toggleEntries = Object.entries(ADMIN_TOGGLE_LABELS) as Array<
    [AdminToggleField, string]
  >;
  const discountedCount = app.products.filter(
    (product) =>
      product.originalPrice !== null && product.originalPrice > product.price,
  ).length;
  const trendingCount = app.products.filter((product) => product.isTrending).length;
  const newArrivalCount = app.products.filter(
    (product) => product.isNewArrival,
  ).length;
  const summaryButtons: Array<{
    value: AdminQuickFilter;
    label: string;
    count: number;
    activeClass: string;
    idleClass: string;
  }> = [
    {
      value: "all",
      label: "Нийт бараа",
      count: app.products.length,
      activeClass: "bg-slate-900 text-white border-slate-900 shadow-sm",
      idleClass: "bg-white text-slate-600 border-slate-200 hover:text-slate-900",
    },
    {
      value: "discounted",
      label: "Хямдралтай",
      count: discountedCount,
      activeClass: "bg-rose-50 text-rose-700 border-rose-200 shadow-sm",
      idleClass:
        "bg-white text-slate-600 border-slate-200 hover:text-rose-700 hover:border-rose-200",
    },
    {
      value: "trending",
      label: "Trend",
      count: trendingCount,
      activeClass:
        "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
      idleClass:
        "bg-white text-slate-600 border-slate-200 hover:text-emerald-700 hover:border-emerald-200",
    },
    {
      value: "new-arrival",
      label: "Шинэ",
      count: newArrivalCount,
      activeClass: "bg-sky-50 text-sky-700 border-sky-200 shadow-sm",
      idleClass:
        "bg-white text-slate-600 border-slate-200 hover:text-sky-700 hover:border-sky-200",
    },
  ];

  const filteredProducts = [...app.products]
    .filter((product) => {
      switch (activeSummaryFilter) {
        case "discounted":
          return (
            product.originalPrice !== null &&
            product.originalPrice > product.price
          );
        case "trending":
          return product.isTrending;
        case "new-arrival":
          return product.isNewArrival;
        default:
          return true;
      }
    })
    .filter((product) =>
      adminTypeFilter === "All" ? true : product.type === adminTypeFilter,
    )
    .filter((product) => matchesProductSearch(product, adminSearchQuery))
    .sort((a, b) => {
      switch (adminSortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return b.id - a.id;
      }
    });
  const visibleIdSet = new Set(filteredProducts.map((product) => product.id));
  const allVisibleSelected =
    filteredProducts.length > 0 &&
    filteredProducts.every((product) => selectedProductIds.includes(product.id));

  const resetAdminFilters = () => {
    setActiveSummaryFilter("all");
    setAdminSearchQuery("");
    setAdminTypeFilter("All");
    setAdminSortBy("latest");
  };

  const toggleProductSelection = (productId: number) => {
    setBulkDeletePending(false);
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const toggleSelectAllVisible = () => {
    setBulkDeletePending(false);
    setSelectedProductIds((prev) => {
      if (allVisibleSelected) {
        return prev.filter((id) => !visibleIdSet.has(id));
      }

      const next = new Set(prev);
      filteredProducts.forEach((product) => next.add(product.id));
      return [...next];
    });
  };

  const clearSelections = () => {
    setSelectedProductIds([]);
    setBulkDeletePending(false);
  };

  const handleSingleDelete = (productId: number) => {
    app.deleteProduct(productId);
    setPendingDeleteId(null);
    setSelectedProductIds((prev) => prev.filter((id) => id !== productId));
    setBulkDeletePending(false);
  };

  const handleBulkDelete = () => {
    if (selectedProductIds.length === 0) return;
    app.deleteProducts(selectedProductIds);
    setSelectedProductIds([]);
    setBulkDeletePending(false);
    setPendingDeleteId(null);
  };

  const openCatalogWithFilter = () => {
    app.resetProductFilters();

    if (activeSummaryFilter === "discounted") {
      app.setExperienceFilter("discounted");
    }

    if (activeSummaryFilter === "trending") {
      app.setExperienceFilter("trending");
    }

    if (activeSummaryFilter === "new-arrival") {
      app.setExperienceFilter("new-arrival");
    }

    if (adminTypeFilter !== "All") {
      app.setTypeFilter(adminTypeFilter);
    }

    if (adminSearchQuery.trim().length > 0) {
      app.setSearchQuery(adminSearchQuery.trim());
    }

    if (adminSortBy === "price-asc") {
      app.setSortBy("price-asc");
    }

    if (adminSortBy === "price-desc") {
      app.setSortBy("price-desc");
    }

    if (adminSortBy === "rating-desc") {
      app.setSortBy("rating-desc");
    }

    app.navigateTo("products");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-5 py-8 animate-in fade-in duration-700">
      <Card className="p-5 md:p-6">
        <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/70 p-5">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-inner">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Super Admin
                </div>
                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Бүтээгдэхүүн удирдах
                </h1>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Эндээс бараа нэмэх, устгах, нэр болон үнэ өөрчлөх, хямдрал
              тохируулах, шинэ/trend/best seller төлөвүүдийг асааж унтраах
              боломжтой.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {summaryButtons.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setActiveSummaryFilter(item.value)}
                  className={`rounded-2xl border px-3 py-3 text-center transition-colors ${activeSummaryFilter === item.value ? item.activeClass : item.idleClass}`}
                >
                  <span className="block text-lg font-bold">{item.count}</span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-1">
            <Button
              primary
              className="flex items-center justify-center gap-2 py-3.5"
              onClick={app.addAdminProduct}
            >
              <Plus className="h-4 w-4" />
              Шинэ бараа нэмэх
            </Button>
            <Button
              className="flex items-center justify-center gap-2 py-3.5"
              onClick={openCatalogWithFilter}
            >
              <Eye className="h-4 w-4" />
              Каталог шалгах
            </Button>
          </div>
        </div>
      </Card>

      {app.products.length > 0 && (
        <Card className="p-5 md:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Admin filters
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Жагсаалтаа шүүж харах
                </h2>
              </div>
              <Button className="py-3 text-sm" onClick={resetAdminFilters}>
                Шүүлтүүр цэвэрлэх
              </Button>
            </div>

            <div className="grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_13rem_13rem]">
              <label className="space-y-2 text-sm text-slate-600">
                <span className="block font-medium">Хайлт</span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={adminSearchQuery}
                    onChange={(e) => setAdminSearchQuery(e.target.value)}
                    placeholder="Нэр, төрөл, feature, showroom..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span className="block font-medium">Төрөл</span>
                <select
                  value={adminTypeFilter}
                  onChange={(e) =>
                    setAdminTypeFilter(e.target.value as AdminTypeFilter)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="All">Бүгд</option>
                  <option value="Office">Office</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span className="block font-medium">Эрэмбэ</span>
                <select
                  value={adminSortBy}
                  onChange={(e) =>
                    setAdminSortBy(e.target.value as AdminSortOption)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="latest">Хамгийн сүүлд</option>
                  <option value="price-desc">Үнэ өндөр</option>
                  <option value="price-asc">Үнэ бага</option>
                  <option value="rating-desc">Үнэлгээ өндөр</option>
                </select>
              </label>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                {filteredProducts.length} илэрц
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                {selectedProductIds.length} сонгосон
              </span>
              {adminTypeFilter !== "All" && (
                <span className="rounded-full bg-slate-100 px-3 py-1.5">
                  Төрөл: {adminTypeFilter}
                </span>
              )}
              {adminSearchQuery.trim().length > 0 && (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
                  Хайлт: {adminSearchQuery.trim()}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  className="flex items-center gap-2 px-4 py-2.5 text-sm"
                  onClick={toggleSelectAllVisible}
                >
                  {allVisibleSelected ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  {allVisibleSelected
                    ? "Харагдаж буйг буцаах"
                    : "Харагдаж буйг бүгдийг сонгох"}
                </Button>
                <Button className="px-4 py-2.5 text-sm" onClick={clearSelections}>
                  Сонголт цэвэрлэх
                </Button>
              </div>

              {selectedProductIds.length > 0 ? (
                bulkDeletePending ? (
                  <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2">
                    <span className="text-xs font-semibold text-rose-700">
                      {selectedProductIds.length} барааг устгах уу?
                    </span>
                    <button
                      type="button"
                      onClick={handleBulkDelete}
                      className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-rose-700"
                    >
                      <Trash2 className="h-3 w-3" />
                      Тийм, устгах
                    </button>
                    <button
                      type="button"
                      onClick={() => setBulkDeletePending(false)}
                      className="inline-flex items-center rounded-full border border-white/80 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:border-slate-200 hover:text-slate-900"
                    >
                      Болих
                    </button>
                  </div>
                ) : (
                  <Button
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm"
                    onClick={() => setBulkDeletePending(true)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Сонгосон барааг устгах
                  </Button>
                )
              ) : (
                <div className="text-sm text-slate-400">
                  Олон устгахын тулд card-уудаас сонголтоо хийгээрэй.
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {app.products.length === 0 ? (
        <Card className="p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Одоогоор бүтээгдэхүүн үлдээгүй байна
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Дахин mock бараа үүсгэвэл home, products, detail view-үүд дээр шууд
            харагдана.
          </p>
          <Button primary className="mt-5" onClick={app.addAdminProduct}>
            Шинэ бараа үүсгэх
          </Button>
        </Card>
      ) : (
        <div className="grid gap-5">
          {filteredProducts.length === 0 && (
            <Card className="p-8 text-center">
              <div className="text-lg font-semibold text-slate-900">
                Энэ шүүлтүүрт бараа алга байна
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Summary filter, search, type эсвэл эрэмбээ өөрчлөөд үзээрэй.
              </p>
            </Card>
          )}

          {filteredProducts.map((product) => {
            const isDiscounted =
              product.originalPrice !== null &&
              product.originalPrice > product.price;

            return (
              <Card key={product.id} className="overflow-hidden p-0">
                <div className="grid gap-0 lg:grid-cols-[13.5rem_minmax(0,1fr)]">
                  <div className="relative min-h-[14rem] bg-slate-50 p-4 sm:min-h-[15rem]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      unoptimized
                    />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleProductSelection(product.id)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors ${
                          selectedProductIds.includes(product.id)
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white/95 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                        }`}
                        aria-label={`${product.name} сонгох`}
                      >
                        {selectedProductIds.includes(product.id) ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </button>
                      <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                        #{product.id}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                          Admin control
                        </div>
                        <div className="mt-1 text-lg font-bold text-slate-900">
                          {product.name}
                        </div>
                      </div>
                      {pendingDeleteId === product.id ? (
                        <div className="flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2">
                          <span className="text-xs font-semibold text-rose-700">
                            Устгах уу?
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              handleSingleDelete(product.id);
                            }}
                            className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-rose-700"
                          >
                            <Trash2 className="h-3 w-3" />
                            Тийм
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDeleteId(null)}
                            className="inline-flex items-center rounded-full border border-white/80 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-colors hover:border-slate-200 hover:text-slate-900"
                          >
                            Болих
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(product.id)}
                          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold whitespace-nowrap text-rose-700 transition-colors hover:bg-rose-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Устгах
                        </button>
                      )}
                    </div>

                    <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_12rem]">
                      <label className="space-y-2 text-sm text-slate-600">
                        <span className="block font-medium">Нэр</span>
                        <input
                          value={product.name}
                          onChange={(e) =>
                            app.updateProduct(product.id, { name: e.target.value })
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        />
                      </label>

                      <label className="space-y-2 text-sm text-slate-600">
                        <span className="block font-medium">Төрөл</span>
                        <select
                          value={product.type}
                          onChange={(e) =>
                            app.updateProduct(product.id, {
                              type: e.target.value as Product["type"],
                            })
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        >
                          <option value="Office">Office</option>
                          <option value="Gaming">Gaming</option>
                        </select>
                      </label>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                      <label className="space-y-2 text-sm text-slate-600">
                        <span className="block font-medium">Үнэ</span>
                        <input
                          type="number"
                          min="0"
                          value={product.price}
                          onChange={(e) =>
                            updateNumberField(
                              app,
                              product.id,
                              "price",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        />
                      </label>

                      <label className="space-y-2 text-sm text-slate-600">
                        <span className="block font-medium">Хуучин үнэ</span>
                        <input
                          type="number"
                          min="0"
                          value={product.originalPrice ?? ""}
                          onChange={(e) =>
                            updateOriginalPrice(app, product.id, e.target.value)
                          }
                          placeholder="хоосон бол discount off"
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200 placeholder:text-slate-300"
                        />
                      </label>

                      <label className="space-y-2 text-sm text-slate-600">
                        <span className="block font-medium">Үнэлгээ</span>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={product.rating}
                          onChange={(e) =>
                            updateNumberField(
                              app,
                              product.id,
                              "rating",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        />
                      </label>

                      <label className="space-y-2 text-sm text-slate-600">
                        <span className="block font-medium">Trend score</span>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={product.trendScore}
                          onChange={(e) =>
                            updateNumberField(
                              app,
                              product.id,
                              "trendScore",
                              e.target.value,
                            )
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        />
                      </label>
                    </div>

                    <div className="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                            Discount status
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
                            {formatPrice(product.price)}
                            {isDiscounted && product.originalPrice && (
                              <span className="text-slate-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        {isDiscounted && product.originalPrice && (
                          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold whitespace-nowrap text-rose-700">
                            -{getDiscountPercent(product.price, product.originalPrice)}%
                          </span>
                        )}
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                        <Button
                          className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm"
                          onClick={() => app.applyProductDiscount(product.id)}
                        >
                          <BadgePercent className="h-4 w-4" />
                          Хямдралтай болгох
                        </Button>
                        <Button
                          className="justify-center px-4 py-2.5 text-sm"
                          onClick={() => app.clearProductDiscount(product.id)}
                        >
                          Хямдрал арилгах
                        </Button>
                        <Button
                          className="justify-center px-4 py-2.5 text-sm"
                          onClick={() => app.navigateTo("productDetail", product)}
                        >
                          Дэлгэрэнгүй харах
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 text-sm font-medium text-slate-600">
                        Онцлох төлөвүүд
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {toggleEntries.map(([field, label]) => (
                          <button
                            key={field}
                            type="button"
                            onClick={() =>
                              app.toggleAdminProductField(product.id, field)
                            }
                            className={`rounded-2xl px-4 py-2.5 text-center text-xs font-semibold transition-colors ${
                              product[field]
                                ? "bg-slate-900 text-white"
                                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
