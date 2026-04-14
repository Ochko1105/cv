"use client";

import Image from "next/image";
import { Armchair, ChevronRight, ShieldCheck, Truck } from "lucide-react";
import type { ChairAppModel } from "../chair-types";
import { Button, ProductCard } from "./ui";

interface HomeViewProps {
  app: ChairAppModel;
}

export const HomeView = ({ app }: HomeViewProps) => {
  const heroProduct = app.products[0] ?? null;
  const averageRating =
    app.products.length > 0
      ? (
          app.products.reduce((sum, product) => sum + product.rating, 0) /
          app.products.length
        ).toFixed(1)
      : "0.0";
  const storeStats = [
    { value: `${app.products.length}+`, label: "загвар бэлэн" },
    { value: "24 цаг", label: "дотор хүргэлт" },
    { value: `${averageRating}/5`, label: "дундаж үнэлгээ" },
  ];

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-700 lg:space-y-20">
      <section className="relative grid items-center gap-12 pt-12 lg:grid-cols-2 lg:pt-20">
        <div className="space-y-8 animate-in slide-in-from-left-6 duration-700">
          <button
            type="button"
            onClick={app.openNewArrivals}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-md"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Шинэ загварууд ирлээ
          </button>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 lg:text-7xl">
            Таны тухтай{" "}
            <span className="bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent">
              суудлын шийдэл
            </span>
          </h1>
          <p className="max-w-md text-lg text-slate-500">
            Оффис болон Gaming сандлын өргөн сонголт. Эрүүл мэнд, тав тухаа
            бидэнд даатга.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button primary onClick={() => app.navigateTo("products")}>
              Бүтээгдэхүүн үзэх
            </Button>
            <Button onClick={() => app.navigateTo("products")}>
              Захиалга өгөх
            </Button>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-3 pt-2">
            {storeStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 shadow-sm backdrop-blur-sm"
              >
                <div className="text-xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative animate-in slide-in-from-right-6 duration-700">
          <div className="absolute inset-0 -z-10 rotate-3 scale-105 rounded-[3rem] bg-gradient-to-tr from-slate-200 via-white to-slate-100 blur-[2px]" />
          <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-emerald-200/50 blur-3xl" />
          {heroProduct ? (
            <button
              type="button"
              onClick={() => app.navigateTo("productDetail", heroProduct)}
              className="group relative h-[500px] w-full overflow-hidden rounded-[3rem] bg-white/70 p-8 text-left shadow-[0_28px_80px_rgba(15,23,42,0.18)] transition-transform duration-700 hover:scale-[1.015]"
              aria-label={`${heroProduct.name} дэлгэрэнгүй харах`}
            >
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                unoptimized
              />
              <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
                {heroProduct.name} харах
              </div>
            </button>
          ) : (
            <div className="flex h-[500px] w-full flex-col items-start justify-center rounded-[3rem] border border-dashed border-slate-300 bg-white/70 p-10 text-left shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Hero placeholder
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Одоогоор бүтээгдэхүүн алга
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                Header дээрх Admin хэсгээс шинэ mock бараа нэмбэл энд хамгийн
                эхэнд харагдана.
              </p>
              <Button
                className="mt-6"
                primary
                onClick={() => app.navigateTo("admin")}
              >
                Admin руу орох
              </Button>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Онцлох загварууд
          </h2>
          <button
            onClick={() => app.navigateTo("products")}
            className="group flex items-center gap-1 font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Бүгдийг үзэх{" "}
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        {app.featuredProducts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {app.featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                navigateTo={app.navigateTo}
                addToCart={app.addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/75 px-6 py-10 text-center text-slate-500 shadow-sm">
            Featured бүтээгдэхүүн хараахан алга байна.
          </div>
        )}
      </section>

      <section className="space-y-5 border-t border-slate-200/70 pt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
            Үйлчилгээ
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Худалдан авалтын дараах 3 гол давуу тал
          </h3>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-200/70 md:grid-cols-3">
          {[
            {
              icon: <Truck className="h-6 w-6" />,
              title: "Шуурхай хүргэлт",
              note: "Хот дотор хурдан хүргэнэ",
              desc: "Улаанбаатар хот дотор 24 цагийн дотор үнэгүй хүргэнэ.",
              iconClass:
                "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
            },
            {
              icon: <ShieldCheck className="h-6 w-6" />,
              title: "Баталгаат хугацаа",
              note: "1-2 жилийн баталгаа",
              desc: "Бүх сандалд 1-2 жилийн албан ёсны баталгаа олгоно.",
              iconClass: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
            },
            {
              icon: <Armchair className="h-6 w-6" />,
              title: "Эргономик загвар",
              note: "Өдөржин тухтай суулт",
              desc: "Нурууны өвчлөлөөс сэргийлэх ухаалаг бүтэцтэй.",
              iconClass: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
            },
          ].map((feat, i) => (
            <article
              key={feat.title}
              className="flex h-full flex-col bg-white/88 p-6 text-left backdrop-blur-sm transition-transform duration-500 animate-in fade-in slide-in-from-bottom-4 md:p-7"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ${feat.iconClass}`}
                >
                  {feat.icon}
                </div>
                <h3 className="pt-0.5 text-lg font-bold tracking-tight text-slate-900">
                  {feat.title}
                </h3>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500">
                {feat.desc}
              </p>
              <div className="mt-auto pt-6 text-sm font-medium text-slate-700">
                {feat.note}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
