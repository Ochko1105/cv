"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  formatCompactNumber,
  formatPrice,
  getDiscountPercent,
} from "../chair-utils";
import type { ButtonProps, CardProps, Product } from "../chair-types";

interface ProductCardProps {
  product: Product;
  index?: number;
  navigateTo: (page: "productDetail", product: Product) => void;
  addToCart: (product: Product, quantity?: number) => void;
}

export const Button = ({
  children,
  primary = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] hover:-translate-y-0.5 ${
      primary
        ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/20"
        : "bg-white/90 text-slate-900 border border-slate-200/80 hover:bg-white hover:shadow-lg hover:shadow-slate-200/70"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const Card = ({ children, className = "", onClick, ...props }: CardProps) => (
  <div
    onClick={onClick}
    className={`bg-white/88 rounded-3xl border border-white/70 p-5 backdrop-blur-sm shadow-[0_14px_50px_rgba(15,23,42,0.06)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${onClick ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)]" : ""} ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const ProductCard = ({
  product,
  index = 0,
  navigateTo,
  addToCart,
}: ProductCardProps) => (
  <Card
    className="flex flex-col p-4 group animate-in fade-in slide-in-from-bottom-4 duration-700"
    onClick={() => navigateTo("productDetail", product)}
    style={{ animationDelay: `${index * 70}ms` }}
  >
    <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-slate-50 p-5">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-contain transition-transform duration-700 group-hover:scale-105"
        unoptimized
      />
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
        {product.type}
      </div>
      <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
        {product.isNewArrival && (
          <span className="rounded-full bg-sky-500/95 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            Шинээр ирсэн
          </span>
        )}
        {product.originalPrice && (
          <span className="rounded-full bg-rose-500/95 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            Хямдарсан
          </span>
        )}
        {product.isTrending && (
          <span className="rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            Trend
          </span>
        )}
        {product.isBestSeller && (
          <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
            Их зарагдсан
          </span>
        )}
      </div>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-slate-900 leading-tight">{product.name}</h3>
        <div className="flex items-center text-amber-500 text-sm font-medium">
          <Star className="w-4 h-4 fill-current mr-1" />
          {product.rating}
        </div>
      </div>
      <p className="text-lg font-bold text-slate-600">
        {formatPrice(product.price)}
      </p>
      {product.originalPrice && (
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="text-slate-400 line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="rounded-full bg-rose-50 px-2.5 py-1 font-semibold text-rose-600">
            -{getDiscountPercent(product.price, product.originalPrice)}%
          </span>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
          Тух {product.comfortScore}/10
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          {formatCompactNumber(product.soldCount)} зарагдсан
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          {product.featureBadges[0]}
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500">
        {product.type === "Gaming" ? product.socialProof : product.adjustmentNote}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{product.reviews} үнэлгээ</span>
        <span>{product.specs[1]}</span>
      </div>
    </div>
    <Button
      className="w-full mt-4 py-2.5 text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product);
      }}
    >
      Сагсанд нэмэх
    </Button>
  </Card>
);
