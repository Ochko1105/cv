"use client";

import Image from "next/image";
import { ArrowLeft, CreditCard, QrCode, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { formatPrice } from "../chair-utils";
import type { ChairAppModel } from "../chair-types";
import { Button, Card } from "./ui";

interface CheckoutViewProps {
  app: ChairAppModel;
}

const QR_PAYMENT_METHOD = "QPay (QR уншуулах)";
const PAYMENT_METHODS = [
  QR_PAYMENT_METHOD,
  "Дансаар шилжүүлэх",
  "Бэлнээр (Хүргэлт ирэх үед)",
] as const;

const MOCK_QR_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" fill="none">
    <rect width="320" height="320" rx="28" fill="#FFFFFF"/>
    <rect x="26" y="26" width="268" height="268" rx="16" fill="#F8FAFC"/>
    <rect x="46" y="46" width="64" height="64" rx="10" fill="#0F172A"/>
    <rect x="58" y="58" width="40" height="40" rx="6" fill="#FFFFFF"/>
    <rect x="70" y="70" width="16" height="16" rx="3" fill="#0F172A"/>
    <rect x="210" y="46" width="64" height="64" rx="10" fill="#0F172A"/>
    <rect x="222" y="58" width="40" height="40" rx="6" fill="#FFFFFF"/>
    <rect x="234" y="70" width="16" height="16" rx="3" fill="#0F172A"/>
    <rect x="46" y="210" width="64" height="64" rx="10" fill="#0F172A"/>
    <rect x="58" y="222" width="40" height="40" rx="6" fill="#FFFFFF"/>
    <rect x="70" y="234" width="16" height="16" rx="3" fill="#0F172A"/>
    <rect x="138" y="46" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="164" y="46" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="138" y="72" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="164" y="72" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="138" y="98" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="124" y="138" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="150" y="138" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="176" y="138" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="202" y="138" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="124" y="164" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="150" y="164" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="202" y="164" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="228" y="164" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="124" y="190" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="176" y="190" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="228" y="190" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="138" y="216" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="164" y="216" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="190" y="216" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="216" y="216" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="138" y="242" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="190" y="242" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="216" y="242" width="14" height="14" rx="3" fill="#0F172A"/>
    <rect x="242" y="242" width="14" height="14" rx="3" fill="#0F172A"/>
  </svg>
`)}`;

export const CheckoutView = ({ app }: CheckoutViewProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>(QR_PAYMENT_METHOD);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const handleOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    app.completeOrder();
  };

  const selectPaymentMethod = (method: string) => {
    setPaymentMethod(method);

    if (method === QR_PAYMENT_METHOD) {
      setQrDialogOpen(true);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-700">
        <button
          onClick={() => app.navigateTo("cart")}
          className="flex items-center text-slate-500 hover:text-slate-900 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Сагс руу буцах
        </button>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">
          Захиалга баталгаажуулах
        </h1>

        <form onSubmit={handleOrder} className="space-y-8">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              1. Хүргэлтийн мэдээлэл
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Овог нэр
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                  placeholder="Болд..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Утасны дугаар
                </label>
                <input
                  required
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  placeholder="9911..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Хүргүүлэх хаяг дэлгэрэнгүй
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                  placeholder="Дүүрэг, Хороо, Байр..."
                ></textarea>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              2. Төлбөрийн хэлбэр
            </h2>
            <div className="space-y-4">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all duration-500 ${
                    paymentMethod === method
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method}
                    onChange={() => selectPaymentMethod(method)}
                    className="w-5 h-5 text-slate-900 border-slate-300 focus:ring-slate-900"
                  />
                  <span className="ml-4 font-medium text-slate-900 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-slate-400" /> {method}
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod === QR_PAYMENT_METHOD && (
              <button
                type="button"
                onClick={() => setQrDialogOpen(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <QrCode className="h-4 w-4" />
                Mock QR харах
              </button>
            )}
          </Card>

          <Button
            primary
            type="submit"
            className="w-full py-4 text-lg font-bold"
          >
            {formatPrice(app.cartTotal)} төлж захиалах
          </Button>
        </form>
      </div>

      {qrDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
          onClick={() => setQrDialogOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mock-qr-title"
            className="w-full max-w-md rounded-[2rem] border border-white/70 bg-white/95 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Mock payment
                </div>
                <h2
                  id="mock-qr-title"
                  className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
                >
                  QPay QR уншуулах
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setQrDialogOpen(false)}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-4">
              <div className="relative mx-auto h-64 w-64 rounded-[1.5rem] bg-white p-4 shadow-sm">
                <Image
                  src={MOCK_QR_IMAGE}
                  alt="Mock QPay QR"
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
              <p className="mt-4 text-center text-sm leading-6 text-slate-500">
                Энэ бол demo зориулалттай mock QR. Уншуулах flow харагдуулахын
                тулд жишээ dialog болгон нээж байна.
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Төлөх дүн
                </div>
                <div className="mt-1 text-lg font-bold text-slate-900">
                  {formatPrice(app.cartTotal)}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Лавлах код
                </div>
                <div className="mt-1 text-lg font-bold text-slate-900">
                  CHAIR-{app.cartCount || 1}01
                </div>
              </div>
            </div>

            <Button
              primary
              className="mt-5 w-full py-3.5 text-sm"
              onClick={() => setQrDialogOpen(false)}
            >
              Ойлголоо
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
