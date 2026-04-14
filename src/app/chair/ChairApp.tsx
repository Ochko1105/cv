"use client";

import { Inter } from "next/font/google";
import {
  ChairFooter,
  ChairHeader,
  ChatbotWidget,
  FloatingCartButtons,
  ToastBanner,
} from "./components/AppChrome";
import { AdminView } from "./components/AdminView";
import { CartView } from "./components/CartView";
import { CheckoutView } from "./components/CheckoutView";
import { HomeView } from "./components/HomeView";
import { ProductDetailView } from "./components/ProductDetailView";
import { ProductsView } from "./components/ProductsView";
import { useChairApp } from "./use-chair-app";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function ChairApp() {
  const app = useChairApp();

  return (
    <div
      className={`${inter.className} relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(241,245,249,0.92)_40%,_rgba(226,232,240,0.86)_100%)] text-slate-900 selection:bg-slate-200 [&_button]:cursor-pointer`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(148,163,184,0.16),transparent_26%)]" />

      <ToastBanner toast={app.toast} />
      <FloatingCartButtons
        cartCount={app.cartCount}
        cartTotal={app.cartTotal}
        showFloatingCart={app.showFloatingCart}
        navigateTo={app.navigateTo}
      />
      <ChatbotWidget
        chatbotOpen={app.chatbotOpen}
        setChatbotOpen={app.setChatbotOpen}
        chatMessages={app.chatMessages}
        chatbotTyping={app.chatbotTyping}
        chatEndRef={app.chatEndRef}
        sendMockChatMessage={app.sendMockChatMessage}
        handleChatSubmit={app.handleChatSubmit}
        chatInput={app.chatInput}
        setChatInput={app.setChatInput}
      />
      <ChairHeader
        currentPage={app.currentPage}
        cartCount={app.cartCount}
        mobileMenuOpen={app.mobileMenuOpen}
        setMobileMenuOpen={app.setMobileMenuOpen}
        headerSearchOpen={app.headerSearchOpen}
        headerSearchInputRef={app.headerSearchInputRef}
        searchQuery={app.searchQuery}
        setSearchQuery={app.setSearchQuery}
        navigateTo={app.navigateTo}
        openSearch={app.openSearch}
        submitHeaderSearch={app.submitHeaderSearch}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 min-h-[70vh]">
        {app.currentPage === "home" && <HomeView app={app} />}
        {app.currentPage === "products" && <ProductsView app={app} />}
        {app.currentPage === "productDetail" && <ProductDetailView app={app} />}
        {app.currentPage === "cart" && <CartView app={app} />}
        {app.currentPage === "checkout" && <CheckoutView app={app} />}
        {app.currentPage === "admin" && <AdminView app={app} />}
      </main>

      <ChairFooter navigateTo={app.navigateTo} />
    </div>
  );
}
