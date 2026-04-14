"use client";

import { Search } from "lucide-react";
import {
  EXPERIENCE_FILTER_OPTIONS,
  PRICE_FILTER_OPTIONS,
  RATING_FILTER_OPTIONS,
  SORT_OPTIONS,
  SPACE_FILTER_OPTIONS,
  TYPE_FILTERS,
} from "../chair-data";
import {
  getExperienceLabel,
  getPriceLabel,
  getRatingLabel,
  getSortLabel,
  getSpaceLabel,
  matchesExperienceFilter,
  matchesPriceFilter,
  matchesProductSearch,
  matchesRatingFilter,
  sortProducts,
} from "../chair-utils";
import type { ChairAppModel } from "../chair-types";
import { Button, Card, ProductCard } from "./ui";

interface ProductsViewProps {
  app: ChairAppModel;
}

export const ProductsView = ({ app }: ProductsViewProps) => {
  const filtered = app.products.filter((product) => {
    const matchesType =
      app.typeFilter === "All" ? true : product.type === app.typeFilter;
    const matchesExperience = matchesExperienceFilter(
      product,
      app.experienceFilter,
    );
    const matchesPrice = matchesPriceFilter(product.price, app.priceFilter);
    const matchesRating = matchesRatingFilter(product.rating, app.ratingFilter);
    const matchesSpace =
      app.spaceFilter === "All" ? true : product.spaces.includes(app.spaceFilter);
    const matchesSearch = matchesProductSearch(product, app.searchQuery);

    return (
      matchesType &&
      matchesExperience &&
      matchesPrice &&
      matchesRating &&
      matchesSpace &&
      matchesSearch
    );
  });

  const visibleProducts = sortProducts(filtered, app.sortBy);
  const hasActiveFilters =
    app.typeFilter !== "All" ||
    app.experienceFilter !== "All" ||
    app.priceFilter !== "All" ||
    app.ratingFilter !== "All" ||
    app.spaceFilter !== "All" ||
    app.sortBy !== "featured" ||
    app.searchQuery.trim().length > 0;
  const hasSearchQuery = app.searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 py-8 animate-in fade-in duration-700">
      <Card className="p-5 md:p-6">
        <div className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/70 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Шүүлтүүр
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Бүх Сандал
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Search болон filter-ээ нэг дороос удирдаж, доорх card-уудаа шууд
              шинэчилж хараарай.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                {visibleProducts.length} илэрц
              </span>
              {hasSearchQuery && (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
                  {app.searchQuery.trim()}
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                className="mt-5 w-full py-3 text-sm"
                onClick={app.resetProductFilters}
              >
                Шүүлтүүр цэвэрлэх
              </Button>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-3 block text-sm font-medium text-slate-600">
                Төрөл
              </label>
              <div className="grid gap-2 sm:grid-cols-3">
                {TYPE_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => app.setTypeFilter(filter)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-500 ${
                      app.typeFilter === filter
                        ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {filter === "All" ? "Бүгд" : filter}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-slate-600">
                Онцлох шүүлтүүр
              </label>
              <div className="grid gap-2 md:grid-cols-2 2xl:grid-cols-3">
                {EXPERIENCE_FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => app.setExperienceFilter(option.value)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-500 ${
                      app.experienceFilter === option.value
                        ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Орчин
                </label>
                <select
                  value={app.spaceFilter}
                  onChange={(e) =>
                    app.setSpaceFilter(e.target.value as typeof app.spaceFilter)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  {SPACE_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Үнийн шүүлтүүр
                </label>
                <select
                  value={app.priceFilter}
                  onChange={(e) =>
                    app.setPriceFilter(e.target.value as typeof app.priceFilter)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  {PRICE_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Үнэлгээ
                </label>
                <select
                  value={app.ratingFilter}
                  onChange={(e) =>
                    app.setRatingFilter(e.target.value as typeof app.ratingFilter)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  {RATING_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Эрэмбэлэх
                </label>
                <select
                  value={app.sortBy}
                  onChange={(e) =>
                    app.setSortBy(e.target.value as typeof app.sortBy)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="rounded-[2rem] border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Үр дүн
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              {hasSearchQuery
                ? `"${app.searchQuery.trim()}" хайлтад ${visibleProducts.length} загвар`
                : `${visibleProducts.length} загвар олдлоо`}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Сонгосон шүүлтүүр болон header search-ийн дагуу доорх card-ууд
              шинэчлэгдэж байна.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600">
            Эрэмбэ: {getSortLabel(app.sortBy)}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            Төрөл: {app.typeFilter === "All" ? "Бүгд" : app.typeFilter}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            Онцлог: {getExperienceLabel(app.experienceFilter)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            Орчин: {getSpaceLabel(app.spaceFilter)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            Үнэ: {getPriceLabel(app.priceFilter)}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5">
            Үнэлгээ: {getRatingLabel(app.ratingFilter)}
          </span>
          {hasSearchQuery && (
            <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
              Хайлт: {app.searchQuery.trim()}
            </span>
          )}
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Илэрц олдсонгүй</h3>
          <p className="mt-2 text-sm text-slate-500">
            Өөр үнийн шүүлтүүр сонгох, search түлхүүрээ өөрчлөх эсвэл Admin
            хэсгээс шинэ бараа нэмээд үзээрэй.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button onClick={app.resetProductFilters}>Шүүлтүүр цэвэрлэх</Button>
            <Button primary onClick={() => app.navigateTo("admin")}>
              Admin руу орох
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              navigateTo={app.navigateTo}
              addToCart={app.addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
