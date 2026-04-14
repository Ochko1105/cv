"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { PRODUCTS } from "./chair-data";
import {
  buildMockAssistantReply,
  getDiscountBasePrice,
  getNextDiscountPrice,
} from "./chair-utils";
import type {
  AdminToggleField,
  CartItem,
  ChairAppModel,
  ChatMessage,
  ExperienceFilter,
  PageType,
  PriceFilter,
  Product,
  RatingFilter,
  SortOption,
  SpaceStyle,
  TypeFilter,
} from "./chair-types";

export const useChairApp = (): ChairAppModel => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceFilter>("All");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("All");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("All");
  const [spaceFilter, setSpaceFilter] = useState<SpaceStyle | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatbotTyping, setChatbotTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: 1,
      role: "assistant",
      text: "Сайн байна уу. Би mock AI туслах байна. Төсөв, office/gaming хэрэгцээ, эсвэл хүргэлт баталгааны талаар асуугаарай.",
    },
  ]);
  const headerSearchInputRef = useRef<HTMLInputElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatMessageIdRef = useRef(2);
  const nextProductIdRef = useRef(
    Math.max(...PRODUCTS.map((product) => product.id)) + 1,
  );
  const featuredProducts = products.slice(0, 4);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const showFloatingCart =
    cartCount > 0 &&
    !mobileMenuOpen &&
    currentPage !== "cart" &&
    currentPage !== "checkout";

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const navigateTo = (page: PageType, product: Product | null = null) => {
    setCurrentPage(page);
    setSelectedProduct(product);
    setHeaderSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast("Сагсанд амжилттай нэмэгдлээ!");
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQ = item.quantity + delta;
          return newQ > 0 ? { ...item, quantity: newQ } : item;
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const syncSelectedProduct = (targetId: number, nextProduct: Product | null) => {
    if (selectedProduct?.id !== targetId) return;

    setSelectedProduct(nextProduct);
    if (!nextProduct && currentPage === "productDetail") {
      setCurrentPage("products");
    }
  };

  const syncCartProduct = (targetId: number, nextProduct: Product | null) => {
    setCart((prev) =>
      nextProduct
        ? prev.map((item) =>
            item.id === targetId
              ? { ...nextProduct, quantity: item.quantity }
              : item,
          )
        : prev.filter((item) => item.id !== targetId),
    );
  };

  const mutateProduct = (
    targetId: number,
    transform: (product: Product) => Product,
  ) => {
    setProducts((prev) => {
      let nextProduct: Product | null = null;
      const nextProducts = prev.map((product) => {
        if (product.id !== targetId) return product;
        nextProduct = transform(product);
        return nextProduct;
      });

      if (!nextProduct) return prev;

      syncSelectedProduct(targetId, nextProduct);
      syncCartProduct(targetId, nextProduct);
      return nextProducts;
    });
  };

  const addAdminProduct = () => {
    const id = nextProductIdRef.current++;
    const template = products[0] ?? PRODUCTS[0];
    const image =
      PRODUCTS[(id - 1) % PRODUCTS.length]?.image ?? template.image;
    const newProduct: Product = {
      ...template,
      id,
      name: `Шинэ сандал ${id}`,
      type: "Office",
      price: 390000,
      originalPrice: null,
      rating: 4.5,
      reviews: 0,
      image,
      description: "Admin хэсгээс нэмсэн шинэ mock бүтээгдэхүүн.",
      specs: ["Материал: Mesh + fabric", "Даац: 120кг", "Баталгаа: 1 жил"],
      soldCount: 0,
      trendScore: 52,
      isTrending: false,
      isBestSeller: false,
      spaces: ["open-office", "home-office"],
      showroomSpace: "open-office",
      showroomNote:
        "Admin-аас нэмсэн mock бүтээгдэхүүн тул showroom тайлбарыг хүссэнээрээ дараа нь өөрчилж болно.",
      comfortScore: 8.8,
      comfortNote:
        "Анхны mock тохиргоотой үүссэн тул дараа нь product detail мэдээллээ өөрчлөхөд амар.",
      adjustmentNote:
        "Өндөр/нам болон өдөр тутмын хэрэглээнд зориулсан default demo тохиргоотой.",
      featureBadges: ["Өндөр/нам", "Mock demo", "Admin edit"],
      socialProof: "Admin хэсгээс шинээр нэмсэн бүтээгдэхүүн.",
      isNewArrival: true,
    };

    setProducts((prev) => [...prev, newProduct]);
    showToast("Шинэ бүтээгдэхүүн амжилттай нэмэгдлээ.");
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    mutateProduct(id, (product) => ({
      ...product,
      ...updates,
    }));
  };

  const deleteProduct = (id: number) => {
    const deletedProduct = products.find((product) => product.id === id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
    syncSelectedProduct(id, null);
    syncCartProduct(id, null);
    showToast(
      `${deletedProduct?.name ?? "Сонгосон бүтээгдэхүүн"} жагсаалтаас устлаа.`,
    );
  };

  const deleteProducts = (ids: number[]) => {
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length === 0) return;

    const idSet = new Set(uniqueIds);
    const deletedCount = products.filter((product) => idSet.has(product.id)).length;

    setProducts((prev) => prev.filter((product) => !idSet.has(product.id)));
    setCart((prev) => prev.filter((item) => !idSet.has(item.id)));

    if (selectedProduct && idSet.has(selectedProduct.id)) {
      setSelectedProduct(null);
      if (currentPage === "productDetail") {
        setCurrentPage("products");
      }
    }

    showToast(`${deletedCount} бүтээгдэхүүн жагсаалтаас устлаа.`);
  };

  const toggleAdminProductField = (id: number, field: AdminToggleField) => {
    mutateProduct(id, (product) => ({
      ...product,
      [field]: !product[field],
    }));
  };

  const applyProductDiscount = (id: number) => {
    mutateProduct(id, (product) => {
      const originalPrice =
        product.originalPrice && product.originalPrice > product.price
          ? product.originalPrice
          : getDiscountBasePrice(product.price);

      return {
        ...product,
        price: getNextDiscountPrice(product.price),
        originalPrice,
      };
    });
    showToast("Хямдралын үнэ тохируулагдлаа.");
  };

  const clearProductDiscount = (id: number) => {
    mutateProduct(id, (product) => ({
      ...product,
      originalPrice: null,
    }));
    showToast("Хямдрал арилгалаа.");
  };

  const resetProductFilters = () => {
    setTypeFilter("All");
    setExperienceFilter("All");
    setPriceFilter("All");
    setRatingFilter("All");
    setSpaceFilter("All");
    setSortBy("featured");
    setSearchQuery("");
  };

  const openNewArrivals = () => {
    resetProductFilters();
    setExperienceFilter("new-arrival");
    navigateTo("products");
  };

  const openSearch = () => {
    setMobileMenuOpen(false);
    setHeaderSearchOpen((prev) => !prev);
  };

  const submitHeaderSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (searchQuery.trim().length === 0) {
      setHeaderSearchOpen(true);
      headerSearchInputRef.current?.focus();
      return;
    }

    setHeaderSearchOpen(false);

    if (currentPage !== "products") {
      navigateTo("products");
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sendMockChatMessage = (message: string) => {
    const trimmed = message.trim();
    if (!trimmed || chatbotTyping) return;

    const userMessage: ChatMessage = {
      id: chatMessageIdRef.current++,
      role: "user",
      text: trimmed,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatbotOpen(true);
    setChatbotTyping(true);

    window.setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: chatMessageIdRef.current++,
          role: "assistant",
          text: buildMockAssistantReply(trimmed, selectedProduct, products),
        },
      ]);
      setChatbotTyping(false);
    }, 650);
  };

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMockChatMessage(chatInput);
  };

  const completeOrder = () => {
    showToast("Захиалга амжилттай үүслээ! Бид удахгүй холбогдох болно.");
    setCart([]);
    setTimeout(() => navigateTo("home"), 2000);
  };

  useEffect(() => {
    if (!headerSearchOpen) return;

    const timer = window.setTimeout(() => {
      headerSearchInputRef.current?.focus();
      headerSearchInputRef.current?.select();
    }, 50);

    return () => window.clearTimeout(timer);
  }, [headerSearchOpen]);

  useEffect(() => {
    if (!chatbotOpen) return;

    const timer = window.setTimeout(() => {
      chatEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [chatMessages, chatbotOpen, chatbotTyping]);

  return {
    currentPage,
    selectedProduct,
    products,
    featuredProducts,
    cart,
    toast,
    mobileMenuOpen,
    typeFilter,
    experienceFilter,
    priceFilter,
    ratingFilter,
    spaceFilter,
    sortBy,
    searchQuery,
    headerSearchOpen,
    chatbotOpen,
    chatInput,
    chatbotTyping,
    chatMessages,
    headerSearchInputRef,
    chatEndRef,
    cartTotal,
    cartCount,
    showFloatingCart,
    setMobileMenuOpen,
    setTypeFilter,
    setExperienceFilter,
    setPriceFilter,
    setRatingFilter,
    setSpaceFilter,
    setSortBy,
    setSearchQuery,
    setHeaderSearchOpen,
    setChatbotOpen,
    setChatInput,
    navigateTo,
    addToCart,
    updateQuantity,
    removeFromCart,
    resetProductFilters,
    openNewArrivals,
    openSearch,
    submitHeaderSearch,
    sendMockChatMessage,
    handleChatSubmit,
    completeOrder,
    addAdminProduct,
    deleteProduct,
    deleteProducts,
    updateProduct,
    toggleAdminProductField,
    applyProductDiscount,
    clearProductDiscount,
  };
};
