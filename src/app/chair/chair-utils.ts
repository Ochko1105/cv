import {
  EXPERIENCE_FILTER_OPTIONS,
  PRICE_FILTER_OPTIONS,
  RATING_FILTER_OPTIONS,
  SORT_OPTIONS,
  SPACE_FILTER_OPTIONS,
  SPACE_LABELS,
} from "./chair-data";
import type {
  AdminToggleField,
  ExperienceFilter,
  PriceFilter,
  Product,
  RatingFilter,
  SortOption,
} from "./chair-types";

export const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("mn-MN").format(price)} ₮`;

export const getDiscountPercent = (
  price: number,
  originalPrice: number | null,
) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("mn-MN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export const normalizeSearchValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

export const buildProductSearchText = (product: Product) =>
  normalizeSearchValue(
    [
      product.name,
      product.description,
      product.type,
      product.showroomNote,
      product.comfortNote,
      product.adjustmentNote,
      product.socialProof,
      product.specs.join(" "),
      product.featureBadges.join(" "),
      product.spaces.map((space) => SPACE_LABELS[space]).join(" "),
      SPACE_LABELS[product.showroomSpace],
      "chair sandal сандал office gaming ergonomic mesh posture support",
      product.isNewArrival ? "шинэ шинэ ирсэн new arrival" : "",
      product.originalPrice ? "хямдарсан sale discount promo" : "",
      product.isBestSeller ? "хамгийн их зарагдсан best seller" : "",
      product.isTrending ? "trending trend" : "",
    ].join(" "),
  );

export const matchesProductSearch = (product: Product, query: string) => {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return true;

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const searchableText = buildProductSearchText(product);

  return tokens.every((token) => searchableText.includes(token));
};

export const matchesPriceFilter = (price: number, filter: PriceFilter) => {
  switch (filter) {
    case "under-400k":
      return price < 400000;
    case "400k-700k":
      return price >= 400000 && price <= 700000;
    case "700k-plus":
      return price > 700000;
    default:
      return true;
  }
};

export const matchesRatingFilter = (rating: number, filter: RatingFilter) => {
  switch (filter) {
    case "4.5-up":
      return rating >= 4.5;
    case "4.8-up":
      return rating >= 4.8;
    default:
      return true;
  }
};

export const matchesExperienceFilter = (
  product: Product,
  filter: ExperienceFilter,
) => {
  switch (filter) {
    case "new-arrival":
      return product.isNewArrival;
    case "best-seller":
      return product.isBestSeller;
    case "discounted":
      return (
        product.originalPrice !== null && product.originalPrice > product.price
      );
    case "trending":
      return product.isTrending;
    case "office-ready":
      return product.spaces.some(
        (space) =>
          space === "open-office" ||
          space === "executive-office" ||
          space === "meeting-room" ||
          space === "home-office",
      );
    default:
      return true;
  }
};

export const sortProducts = (products: Product[], sortBy: SortOption) => {
  const sorted = [...products];

  switch (sortBy) {
    case "sold-desc":
      return sorted.sort((a, b) => b.soldCount - a.soldCount);
    case "trend-desc":
      return sorted.sort((a, b) => b.trendScore - a.trendScore);
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "reviews-desc":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
};

export const getRelatedProducts = (
  selectedProduct: Product,
  products: Product[],
) =>
  products
    .filter((product) => product.id !== selectedProduct.id)
    .map((product) => {
      const sharedSpaces = product.spaces.filter((space) =>
        selectedProduct.spaces.includes(space),
      ).length;
      const priceGap = Math.abs(product.price - selectedProduct.price);
      let score = 0;

      if (product.type === selectedProduct.type) score += 5;
      if (product.showroomSpace === selectedProduct.showroomSpace) score += 3;
      score += sharedSpaces * 2;
      if (priceGap <= 100000) score += 2;
      if (priceGap <= 50000) score += 1;
      if (product.isTrending === selectedProduct.isTrending) score += 1;

      return { product, score, priceGap };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.priceGap !== b.priceGap) return a.priceGap - b.priceGap;
      return b.product.rating - a.product.rating;
    })
    .slice(0, 4)
    .map(({ product }) => product);

export const buildMockAssistantReply = (
  query: string,
  selectedProduct: Product | null,
  products: Product[],
) => {
  const normalized = query.trim().toLowerCase();
  const budgetMatch = normalized.match(/(\d{3,7})(?:\s*(?:₮|төгрөг))?/u);
  const budgetValue = budgetMatch ? Number(budgetMatch[1]) : null;
  const availableProducts = products.length > 0 ? products : [];

  if (availableProducts.length === 0) {
    return "Одоогоор mock product үлдээгүй байна. Admin хэсгээс дахин бараа нэмбэл би санал болгоод эхэлнэ.";
  }

  if (
    selectedProduct &&
    /(энэ|selected|detail|дэлгэрэнгүй)/u.test(normalized)
  ) {
    return `${selectedProduct.name} нь ${selectedProduct.type.toLowerCase()} төрлийн ${formatPrice(selectedProduct.price)}-ийн сандал. Гол давуу тал нь ${selectedProduct.featureBadges[0].toLowerCase()}, ${selectedProduct.featureBadges[1].toLowerCase()} дээр төвлөрсөн бөгөөд ${SPACE_LABELS[selectedProduct.showroomSpace]} орчинд илүү сайн зохино.`;
  }

  if (/(хүргэлт|delivery)/u.test(normalized)) {
    return "Хот доторх захиалгыг 24 цагийн дотор хүргэхээр mock байдлаар үзүүлж байгаа. Захиалга баталгаажсаны дараа хүргэлтийн төлөв болон холбоо барих дугаар руу notification очно гэж тооцсон.";
  }

  if (/(баталгаа|warranty)/u.test(normalized)) {
    return "Энэ demo дээр ихэнх сандал 1-2 жилийн баталгаатай харагдаж байгаа. Product detail доторх specs хэсгээс яг тухайн загварын баталгааны хугацааг харьцуулж үзэхэд хамгийн эвтэйхэн.";
  }

  if (/(gaming|тоглоом|stream|rgb|esport)/u.test(normalized)) {
    const picks = sortProducts(
      availableProducts.filter((product) => product.type === "Gaming"),
      "rating-desc",
    ).slice(0, 3);

    if (picks.length === 0) {
      return "Одоогоор gaming төрлийн mock сандал алга байна. Admin дээрээс gaming бүтээгдэхүүн нэмээд эсвэл төрөл өөрчлөөд үзэж болно.";
    }

    return `Gaming талдаа эхлээд ${picks
      .map((product) => `${product.name} (${formatPrice(product.price)})`)
      .join(
        ", ",
      )} гэсэн 3-ыг харвал гоё. Эд нарын common тал нь өндөр түшлэг, удаан суухад тухтай padding, setup-д илүү “complete” харагдах silhouette байгаа.`;
  }

  if (/(office|оффис|ажил|study|хичээл|home office)/u.test(normalized)) {
    const picks = sortProducts(
      availableProducts.filter((product) => product.type === "Office"),
      "rating-desc",
    ).slice(0, 3);

    if (picks.length === 0) {
      return "Одоогоор office төрлийн mock сандал алга байна. Admin хэсгээс office бараа нэмээд эсвэл төрлийг сольж болно.";
    }

    return `Office хэрэглээнд бол ${picks
      .map((product) => `${product.name} (${formatPrice(product.price)})`)
      .join(
        ", ",
      )} гэдэг 3 дээрээс эхлэхийг санал болгоно. Эдгээр нь posture, mesh/back support, өдөр тутмын work session дээр илүү balanced feeling өгнө.`;
  }

  if (budgetValue !== null) {
    const picks = sortProducts(
      availableProducts.filter((product) => product.price <= budgetValue),
      "price-asc",
    ).slice(0, 3);

    if (picks.length > 0) {
      return `${formatPrice(budgetValue)} дотор ${picks
        .map((product) => `${product.name} (${formatPrice(product.price)})`)
        .join(
          ", ",
        )} гэсэн сонголтууд багтаж байна. Хэрэв хүсвэл үүнээс gaming эсвэл office гэж нарийсгаад дахин санал болгож чадна.`;
    }

    return `${formatPrice(budgetValue)} дотор яг багтах загвар энэ mock list дээр цөөн байна. Price filter дээр “400,000₮-с бага” эсвэл “400,000₮ - 700,000₮” сонгоод ойролцоо хувилбаруудыг харахад амархан.`;
  }

  return "Mock AI туслах байдлаар ажиллаж байгаа болохоор яг live AI биш ч product list дотроос хурдан чиглүүлж өгч чадна. Та office, gaming, төсөв, эсвэл хүргэлт/баталгаа гэж асуувал илүү оновчтой санал гаргаж өгнө.";
};

export const getNextDiscountPrice = (price: number) =>
  Math.max(100000, Math.round(price * 0.85 / 1000) * 1000);

export const getDiscountBasePrice = (price: number) =>
  Math.max(price + 50000, Math.round(price * 1.18 / 1000) * 1000);

export const ADMIN_TOGGLE_LABELS: Record<AdminToggleField, string> = {
  isNewArrival: "Шинээр ирсэн",
  isTrending: "Trend",
  isBestSeller: "Best seller",
};

export const getSortLabel = (sortBy: SortOption) =>
  SORT_OPTIONS.find((option) => option.value === sortBy)?.label;

export const getExperienceLabel = (value: ExperienceFilter) =>
  EXPERIENCE_FILTER_OPTIONS.find((option) => option.value === value)?.label;

export const getPriceLabel = (value: PriceFilter) =>
  PRICE_FILTER_OPTIONS.find((option) => option.value === value)?.label;

export const getRatingLabel = (value: RatingFilter) =>
  RATING_FILTER_OPTIONS.find((option) => option.value === value)?.label;

export const getSpaceLabel = (value: Product["showroomSpace"] | "All") =>
  SPACE_FILTER_OPTIONS.find((option) => option.value === value)?.label;
