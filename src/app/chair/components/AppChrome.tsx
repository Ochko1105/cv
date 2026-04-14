"use client";

import {
  Armchair,
  CheckCircle2,
  ChevronRight,
  Menu,
  MessageCircle,
  Search,
  SendHorizonal,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import {
  CHATBOT_QUICK_PROMPTS,
  NAV_ITEMS,
} from "../chair-data";
import { formatPrice } from "../chair-utils";
import type { ChatMessage, PageType } from "../chair-types";
import type { Dispatch, FormEvent, RefObject, SetStateAction } from "react";

interface NavigateFooterProps {
  navigateTo: (page: PageType) => void;
}

interface FloatingCartButtonsProps {
  cartCount: number;
  cartTotal: number;
  showFloatingCart: boolean;
  navigateTo: (page: PageType) => void;
}

export const ToastBanner = ({ toast }: { toast: string | null }) =>
  toast ? (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-5 duration-500">
      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      <span className="font-medium text-sm">{toast}</span>
    </div>
  ) : null;

export const FloatingCartButtons = ({
  cartCount,
  cartTotal,
  showFloatingCart,
  navigateTo,
}: FloatingCartButtonsProps) =>
  showFloatingCart ? (
    <>
      <button
        type="button"
        onClick={() => navigateTo("cart")}
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between rounded-2xl border border-white/70 bg-white/92 px-4 py-3 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-all duration-500 hover:bg-white sm:hidden"
      >
        <span className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-inner">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full border-2 border-white bg-emerald-400 px-1 text-[9px] font-bold leading-none text-slate-950 flex items-center justify-center">
              {cartCount}
            </span>
          </span>
          <span className="text-left">
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Сагс
            </span>
            <span className="block text-sm font-semibold text-slate-900">
              {cartCount} ширхэг
            </span>
          </span>
        </span>
        <span className="text-right">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400">
            Нийт
          </span>
          <span className="block text-sm font-semibold text-slate-900">
            {formatPrice(cartTotal)}
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={() => navigateTo("cart")}
        className="group fixed right-5 top-1/2 z-40 hidden h-14 w-14 -translate-y-1/2 items-center overflow-hidden rounded-2xl border border-white/70 bg-white/88 px-2.5 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-[width,box-shadow,background-color] duration-500 hover:w-[14rem] hover:bg-white hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)] sm:flex"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-inner">
          <ShoppingBag className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 min-w-4 h-4 rounded-full border-2 border-white bg-emerald-400 px-1 text-[9px] font-bold leading-none text-slate-950 flex items-center justify-center">
            {cartCount}
          </span>
        </span>
        <span className="ml-3 flex min-w-0 max-w-0 flex-1 items-center justify-between overflow-hidden opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
          <span className="min-w-0 text-left">
            <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">
              Сагс
            </span>
            <span className="block truncate text-xs font-semibold text-slate-900">
              {formatPrice(cartTotal)}
            </span>
          </span>
          <ChevronRight className="ml-2 h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-500 group-hover:translate-x-0.5" />
        </span>
      </button>
    </>
  ) : null;

interface ChatbotWidgetProps {
  chatbotOpen: boolean;
  setChatbotOpen: Dispatch<SetStateAction<boolean>>;
  chatMessages: ChatMessage[];
  chatbotTyping: boolean;
  chatEndRef: RefObject<HTMLDivElement | null>;
  sendMockChatMessage: (message: string) => void;
  handleChatSubmit: (e: FormEvent<HTMLFormElement>) => void;
  chatInput: string;
  setChatInput: (value: string) => void;
}

export const ChatbotWidget = ({
  chatbotOpen,
  setChatbotOpen,
  chatMessages,
  chatbotTyping,
  chatEndRef,
  sendMockChatMessage,
  handleChatSubmit,
  chatInput,
  setChatInput,
}: ChatbotWidgetProps) => (
  <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-5">
    {chatbotOpen && (
      <div className="w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/94 shadow-[0_22px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-inner">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">AI туслах</div>
              <div className="text-xs text-slate-400">Mock demo</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setChatbotOpen(false)}
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm whitespace-pre-line ${
                  message.role === "user"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200/70 bg-slate-50 text-slate-700"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {chatbotTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-500 shadow-sm">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400 [animation-delay:240ms]" />
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="border-t border-slate-200/70 px-4 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {CHATBOT_QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMockChatMessage(prompt)}
                disabled={chatbotTyping}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Жишээ нь: 600000 дотор office chair"
              className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="submit"
              disabled={chatbotTyping || chatInput.trim().length === 0}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <SendHorizonal className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    )}

    <button
      type="button"
      onClick={() => setChatbotOpen((prev) => !prev)}
      className="flex h-14 items-center gap-3 rounded-full border border-white/80 bg-white/92 px-4 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl transition-all duration-500 hover:bg-white hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white shadow-inner">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="hidden text-left sm:block">
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Mock
        </span>
        <span className="block text-sm font-semibold text-slate-900">AI туслах</span>
      </span>
    </button>
  </div>
);

interface ChairHeaderProps {
  currentPage: PageType;
  cartCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  headerSearchOpen: boolean;
  headerSearchInputRef: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  navigateTo: (page: PageType) => void;
  openSearch: () => void;
  submitHeaderSearch: (e: FormEvent<HTMLFormElement>) => void;
}

export const ChairHeader = ({
  currentPage,
  cartCount,
  mobileMenuOpen,
  setMobileMenuOpen,
  headerSearchOpen,
  headerSearchInputRef,
  searchQuery,
  setSearchQuery,
  navigateTo,
  openSearch,
  submitHeaderSearch,
}: ChairHeaderProps) => (
  <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div
        className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
        onClick={() => navigateTo("home")}
      >
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <Armchair className="w-5 h-5 text-white" />
        </div>
        Sandal
      </div>

      <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => navigateTo(item.page)}
            className={`hover:text-slate-900 transition-colors ${currentPage === item.page ? "text-slate-900 font-bold" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={openSearch}
          className="flex w-10 h-10 items-center justify-center rounded-full hover:bg-white text-slate-600 transition-all duration-500 hover:shadow-sm"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigateTo("cart")}
          className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/80 text-slate-900 hover:bg-white transition-all duration-500 hover:shadow-sm"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/80 transition-all duration-500 hover:bg-white hover:shadow-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden absolute top-20 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-4 duration-500">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => navigateTo(item.page)}
            className="text-left text-lg font-bold"
          >
            {item.label}
          </button>
        ))}
      </div>
    )}

    {headerSearchOpen && (
      <div className="absolute left-0 top-20 w-full border-b border-slate-200 bg-white/92 px-6 py-4 shadow-lg backdrop-blur-xl animate-in slide-in-from-top-3 duration-300">
        <form
          onSubmit={submitHeaderSearch}
          className="mx-auto flex max-w-3xl items-center gap-3 rounded-[1.75rem] border border-slate-200/80 bg-white px-4 py-3 shadow-sm"
        >
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={headerSearchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Сандал хайх... жишээ нь office, gaming, mesh"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Хайх
          </button>
        </form>
      </div>
    )}
  </header>
);

export const ChairFooter = ({ navigateTo }: NavigateFooterProps) => (
  <footer className="relative z-10 bg-slate-900 text-slate-400 py-16 mt-20 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Armchair className="w-5 h-5 text-slate-900" />
          </div>
          Sandal
        </div>
        <p className="max-w-sm text-sm leading-relaxed">
          Монголын хамгийн том оффис болон тоглоомын сандлын төрөлжсөн дэлгүүр.
          Таны эрүүл мэнд, тав тух бидний зорилго.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Холбоос</h4>
        <ul className="space-y-4 text-sm">
          <li>
            <button
              onClick={() => navigateTo("home")}
              className="hover:text-white transition-colors"
            >
              Нүүр
            </button>
          </li>
          <li>
            <button
              onClick={() => navigateTo("products")}
              className="hover:text-white transition-colors"
            >
              Бүтээгдэхүүн
            </button>
          </li>
          <li>
            <button className="hover:text-white transition-colors">Бидний тухай</button>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Холбоо барих</h4>
        <ul className="space-y-4 text-sm">
          <li>Утас: 7700-XXXX</li>
          <li>И-мэйл: info@</li>
          <li>Хаяг: Улаанбаатар хот, СБД, 1-р хороо</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-sm flex justify-between items-center">
      <p>© 2024 Sandal Бүх эрх хуулиар хамгаалагдсан.</p>
    </div>
  </footer>
);
