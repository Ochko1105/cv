"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "../chair-utils";
import type { ChairAppModel } from "../chair-types";
import { Button } from "./ui";

interface CartViewProps {
  app: ChairAppModel;
}

export const CartView = ({ app }: CartViewProps) => (
  <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-700">
    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">
      Таны сагс
    </h1>

    {app.cart.length === 0 ? (
      <div className="text-center py-24 bg-white/80 border border-slate-200/70 rounded-[3rem] shadow-sm backdrop-blur-sm">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-medium text-slate-900 mb-2">
          Сагс хоосон байна
        </h2>
        <p className="text-slate-500 mb-8">
          Та бүтээгдэхүүнүүд рүү орж сонголтоо хийнэ үү.
        </p>
        <Button primary onClick={() => app.navigateTo("products")}>
          Дэлгүүр рүү буцах
        </Button>
      </div>
    ) : (
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          {app.cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-4 bg-white/90 rounded-3xl shadow-sm border border-slate-100 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="relative w-24 h-24 self-center rounded-2xl bg-slate-50 p-2 sm:self-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-slate-900">{item.name}</h3>
                <p className="text-slate-500 text-sm mt-1 mb-3">
                  {formatPrice(item.price)}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
                  <div className="flex items-center bg-slate-100 rounded-full">
                    <button
                      onClick={() => app.updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => app.updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => app.removeFromCart(item.id)}
                    className="text-red-500 text-sm font-medium hover:text-red-600"
                  >
                    Устгах
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:self-start md:w-[18rem]">
          <div className="bg-white/80 border border-slate-200/70 p-6 rounded-[1.75rem] h-fit md:sticky md:top-28 shadow-sm backdrop-blur-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-5">
              Захиалгын дүн
            </h2>
            <div className="flex justify-between text-sm text-slate-600 mb-3">
              <span>Нийт ({app.cartCount} ширхэг)</span>
              <span>{formatPrice(app.cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600 mb-5 pb-5 border-b border-slate-200">
              <span>Хүргэлт</span>
              <span className="text-emerald-600 font-medium">Үнэгүй</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-lg mb-6">
              <span>Төлөх дүн</span>
              <span>{formatPrice(app.cartTotal)}</span>
            </div>
            <Button
              primary
              className="w-full py-3.5 text-sm"
              onClick={() => app.navigateTo("checkout")}
            >
              Тооцоо хийх
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
);
