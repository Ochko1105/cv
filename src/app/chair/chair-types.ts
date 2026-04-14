import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  RefObject,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

export type ProductType = "Office" | "Gaming";
export type TypeFilter = "All" | ProductType;
export type PriceFilter = "All" | "under-400k" | "400k-700k" | "700k-plus";
export type RatingFilter = "All" | "4.5-up" | "4.8-up";
export type ExperienceFilter =
  | "All"
  | "new-arrival"
  | "best-seller"
  | "discounted"
  | "trending"
  | "office-ready";
export type SpaceStyle =
  | "open-office"
  | "executive-office"
  | "meeting-room"
  | "home-office"
  | "gaming-room";
export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "reviews-desc"
  | "sold-desc"
  | "trend-desc";
export type AdminToggleField =
  | "isNewArrival"
  | "isTrending"
  | "isBestSeller";
export type PageType =
  | "home"
  | "products"
  | "productDetail"
  | "cart"
  | "checkout"
  | "admin";
export type ChatRole = "assistant" | "user";

export interface Product {
  id: number;
  name: string;
  type: ProductType;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  specs: string[];
  soldCount: number;
  trendScore: number;
  isTrending: boolean;
  isBestSeller: boolean;
  spaces: SpaceStyle[];
  showroomSpace: SpaceStyle;
  showroomNote: string;
  comfortScore: number;
  comfortNote: string;
  adjustmentNote: string;
  featureBadges: string[];
  socialProof: string;
  isNewArrival: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface ProductCardProps {
  product: Product;
  index?: number;
}

export interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
}

export interface ChairArtOptions {
  shell: string;
  accent: string;
  base: string;
  background: string;
  glow: string;
  silhouette?: "office" | "gaming";
}

export interface LabeledOption<T extends string> {
  value: T;
  label: string;
}

export interface StoreStat {
  value: string;
  label: string;
}

export interface NavItem {
  page: Extract<PageType, "home" | "products" | "admin">;
  label: string;
}

export interface ChairAppModel {
  currentPage: PageType;
  selectedProduct: Product | null;
  products: Product[];
  featuredProducts: Product[];
  cart: CartItem[];
  toast: string | null;
  mobileMenuOpen: boolean;
  typeFilter: TypeFilter;
  experienceFilter: ExperienceFilter;
  priceFilter: PriceFilter;
  ratingFilter: RatingFilter;
  spaceFilter: SpaceStyle | "All";
  sortBy: SortOption;
  searchQuery: string;
  headerSearchOpen: boolean;
  chatbotOpen: boolean;
  chatInput: string;
  chatbotTyping: boolean;
  chatMessages: ChatMessage[];
  headerSearchInputRef: RefObject<HTMLInputElement | null>;
  chatEndRef: RefObject<HTMLDivElement | null>;
  cartTotal: number;
  cartCount: number;
  showFloatingCart: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  setTypeFilter: Dispatch<SetStateAction<TypeFilter>>;
  setExperienceFilter: Dispatch<SetStateAction<ExperienceFilter>>;
  setPriceFilter: Dispatch<SetStateAction<PriceFilter>>;
  setRatingFilter: Dispatch<SetStateAction<RatingFilter>>;
  setSpaceFilter: Dispatch<SetStateAction<SpaceStyle | "All">>;
  setSortBy: Dispatch<SetStateAction<SortOption>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setHeaderSearchOpen: Dispatch<SetStateAction<boolean>>;
  setChatbotOpen: Dispatch<SetStateAction<boolean>>;
  setChatInput: Dispatch<SetStateAction<string>>;
  navigateTo: (page: PageType, product?: Product | null) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  resetProductFilters: () => void;
  openNewArrivals: () => void;
  openSearch: () => void;
  submitHeaderSearch: (e: FormEvent<HTMLFormElement>) => void;
  sendMockChatMessage: (message: string) => void;
  handleChatSubmit: (e: FormEvent<HTMLFormElement>) => void;
  completeOrder: () => void;
  addAdminProduct: () => void;
  deleteProduct: (id: number) => void;
  deleteProducts: (ids: number[]) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  toggleAdminProductField: (id: number, field: AdminToggleField) => void;
  applyProductDiscount: (id: number) => void;
  clearProductDiscount: (id: number) => void;
}
