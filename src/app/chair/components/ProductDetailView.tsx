"use client";

import Image from "next/image";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { SHOWROOM_IMAGES, SPACE_LABELS } from "../chair-data";
import {
  formatCompactNumber,
  formatPrice,
  getDiscountPercent,
  getRelatedProducts,
} from "../chair-utils";
import type { ChairAppModel } from "../chair-types";
import { Button, ProductCard } from "./ui";

interface ProductDetailViewProps {
  app: ChairAppModel;
}

export const ProductDetailView = ({ app }: ProductDetailViewProps) => {
  const product = app.selectedProduct;
  if (!product) return null;

  const relatedProducts = getRelatedProducts(product, app.products);

  return (
    <div className="py-8 animate-in slide-in-from-bottom-8 duration-700">
      <button
        onClick={() => app.navigateTo("products")}
        className="flex items-center text-slate-500 hover:text-slate-900 mb-8 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Буцах
      </button>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="relative h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden bg-slate-50 p-10 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-700 hover:scale-[1.02]"
              unoptimized
            />
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm md:grid-cols-[220px_1fr]">
            <div className="relative h-40 w-full rounded-[1.5rem] bg-slate-50 p-4">
              <Image
                src={SHOWROOM_IMAGES[product.showroomSpace]}
                alt={`${product.name} showroom preview`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Орчинд хэрхэн харагдах вэ
              </div>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {SPACE_LABELS[product.showroomSpace]}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {product.showroomNote}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.spaces.map((space) => (
                  <span
                    key={space}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                  >
                    {SPACE_LABELS[space]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Борлуулалт
              </div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {formatCompactNumber(product.soldCount)}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Trend score
              </div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {product.trendScore}/100
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Showroom
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {SPACE_LABELS[product.showroomSpace]}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Суух мэдрэмж
              </div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {product.comfortScore}/10
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Өндөр/нам
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {product.featureBadges[0]}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Тохируулга
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                {product.featureBadges[1]}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-4">
          <div className="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
            {product.type} CHAIR
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-slate-800">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                    -{getDiscountPercent(product.price, product.originalPrice)}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-600 font-medium text-sm">
              <Star className="w-4 h-4 fill-current" /> {product.rating} (
              {product.reviews} үнэлгээ)
            </div>
          </div>

          <div className="mb-8">
            <Button
              primary
              className="w-full py-4 text-lg"
              onClick={() => app.addToCart(product)}
            >
              Сагсанд нэмэх
            </Button>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {product.isNewArrival && (
              <span className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-medium text-white">
                Шинээр ирсэн
              </span>
            )}
            {product.isBestSeller && (
              <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
                Хамгийн их зарагдсан
              </span>
            )}
            {product.originalPrice && (
              <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600">
                Хямдарсан
              </span>
            )}
            {product.isTrending && (
              <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white">
                Trend болж буй
              </span>
            )}
            {product.spaces.map((space) => (
              <span
                key={space}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
              >
                {SPACE_LABELS[space]}
              </span>
            ))}
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] bg-slate-50 px-5 py-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Суухад ямар вэ
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {product.comfortNote}
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-50 px-5 py-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Тохируулга ба хэрэглээ
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {product.adjustmentNote}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.featureBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`mb-8 rounded-[1.75rem] px-5 py-5 ${
              product.type === "Gaming"
                ? "bg-slate-900 text-white"
                : "bg-white/80 border border-slate-200/70 text-slate-900"
            }`}
          >
            <div
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                product.type === "Gaming" ? "text-slate-300" : "text-slate-400"
              }`}
            >
              {product.type === "Gaming"
                ? "Creator / Streamer Vibe"
                : "Хэн их сонгодог вэ"}
            </div>
            <p
              className={`mt-3 text-sm leading-6 ${
                product.type === "Gaming" ? "text-slate-100" : "text-slate-600"
              }`}
            >
              {product.socialProof}
            </p>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mb-10">
            <h3 className="font-bold text-slate-900 mb-4">Үзүүлэлт:</h3>
            <ul className="space-y-3">
              {product.specs.map((spec, i) => (
                <li key={i} className="flex items-center text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-slate-300 mr-3" /> {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-slate-200/70 pt-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Төстэй бараа
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Энэ сандалтай ойролцоо сонголтууд
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Ижил төрлийн хэрэглээ, showroom орчин, үнийн түвшинтэй
              бүтээгдэхүүнүүдийг доор card-аар харууллаа.
            </p>
          </div>
          <Button onClick={() => app.navigateTo("products")}>Бүгдийг харах</Button>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                index={index}
                navigateTo={app.navigateTo}
                addToCart={app.addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50/70 px-6 py-10 text-center text-slate-500">
            Одоогоор энэ бараанд харьцуулах өөр бүтээгдэхүүн алга байна.
          </div>
        )}
      </section>
    </div>
  );
};
