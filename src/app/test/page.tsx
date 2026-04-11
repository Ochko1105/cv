"use client";

import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Inter } from "next/font/google";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  Menu,
  X,
  ChevronRight,
  Star,
  Truck,
  ShieldCheck,
  Armchair,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MessageCircle,
  Sparkles,
  SendHorizonal,
} from "lucide-react";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

type ProductType = "Office" | "Gaming";
type TypeFilter = "All" | ProductType;
type PriceFilter = "All" | "under-400k" | "400k-700k" | "700k-plus";
type RatingFilter = "All" | "4.5-up" | "4.8-up";
type ExperienceFilter =
  | "All"
  | "new-arrival"
  | "best-seller"
  | "discounted"
  | "trending"
  | "office-ready";
type SpaceStyle =
  | "open-office"
  | "executive-office"
  | "meeting-room"
  | "home-office"
  | "gaming-room";
type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "reviews-desc"
  | "sold-desc"
  | "trend-desc";
type PageType = "home" | "products" | "productDetail" | "cart" | "checkout";

interface Product {
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

interface CartItem extends Product {
  quantity: number;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primary?: boolean;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: number;
  role: ChatRole;
  text: string;
}

interface ChairArtOptions {
  shell: string;
  accent: string;
  base: string;
  background: string;
  glow: string;
  silhouette?: "office" | "gaming";
}

const createChairIllustration = ({
  shell,
  accent,
  base,
  background,
  glow,
  silhouette = "office",
}: ChairArtOptions) => {
  const officeShape = `
    <rect x="312" y="170" width="176" height="252" rx="72" fill="${shell}"/>
    <rect x="338" y="200" width="124" height="184" rx="52" fill="${accent}" fill-opacity="0.88"/>
    <rect x="276" y="404" width="28" height="122" rx="14" fill="${base}"/>
    <rect x="496" y="404" width="28" height="122" rx="14" fill="${base}"/>
    <rect x="272" y="516" width="104" height="24" rx="12" fill="${base}"/>
    <rect x="424" y="516" width="104" height="24" rx="12" fill="${base}"/>
    <rect x="270" y="470" width="260" height="92" rx="42" fill="${shell}"/>
    <rect x="312" y="496" width="176" height="34" rx="17" fill="${accent}" fill-opacity="0.86"/>
  `;

  const gamingShape = `
    <rect x="336" y="118" width="128" height="90" rx="36" fill="${shell}"/>
    <path d="M314 188C314 160 336 138 364 138H436C464 138 486 160 486 188V418C486 444 468 470 442 478L414 486C404 489 396 498 396 508C396 498 388 489 378 486L350 478C324 470 306 444 306 418V188Z" fill="${shell}"/>
    <path d="M344 214C344 194 360 178 380 178H420C440 178 456 194 456 214V394C456 411 446 427 430 432L404 440C399 442 396 446 396 451C396 446 393 442 388 440L362 432C346 427 336 411 336 394V214Z" fill="${accent}" fill-opacity="0.9"/>
    <rect x="282" y="410" width="30" height="122" rx="15" fill="${base}"/>
    <rect x="488" y="410" width="30" height="122" rx="15" fill="${base}"/>
    <rect x="278" y="522" width="96" height="24" rx="12" fill="${base}"/>
    <rect x="426" y="522" width="96" height="24" rx="12" fill="${base}"/>
    <rect x="270" y="474" width="260" height="94" rx="44" fill="${shell}"/>
    <rect x="312" y="498" width="176" height="34" rx="17" fill="${accent}" fill-opacity="0.86"/>
  `;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="900" viewBox="0 0 800 900" fill="none">
      <rect width="800" height="900" rx="54" fill="${background}"/>
      <circle cx="560" cy="180" r="170" fill="${glow}" fill-opacity="0.36"/>
      <ellipse cx="400" cy="776" rx="210" ry="28" fill="#CBD5E1" fill-opacity="0.58"/>
      <g>
        ${silhouette === "gaming" ? gamingShape : officeShape}
        <rect x="384" y="560" width="24" height="122" rx="12" fill="${base}"/>
        <path d="M396 682L320 714" stroke="${base}" stroke-width="18" stroke-linecap="round"/>
        <path d="M396 682L476 714" stroke="${base}" stroke-width="18" stroke-linecap="round"/>
        <path d="M396 682L396 730" stroke="${base}" stroke-width="18" stroke-linecap="round"/>
        <path d="M396 682L338 760" stroke="${base}" stroke-width="18" stroke-linecap="round"/>
        <path d="M396 682L456 760" stroke="${base}" stroke-width="18" stroke-linecap="round"/>
        <circle cx="312" cy="720" r="18" fill="#475569"/>
        <circle cx="484" cy="720" r="18" fill="#475569"/>
        <circle cx="396" cy="738" r="18" fill="#475569"/>
        <circle cx="330" cy="774" r="18" fill="#475569"/>
        <circle cx="462" cy="774" r="18" fill="#475569"/>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

// --- MOCK DATA ---
const BASE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ErgoPro Office Chair",
    type: "Office",
    price: 450000,
    originalPrice: 520000,
    rating: 4.8,
    reviews: 124,
    image: createChairIllustration({
      shell: "#334155",
      accent: "#CBD5E1",
      base: "#0F172A",
      background: "#F8FAFC",
      glow: "#BFDBFE",
      silhouette: "office",
    }),
    description:
      "Олон цагаар сууж ажиллахад зориулагдсан, нурууны хэлбэр дагах ухаалаг түшлэгтэй орчин үеийн оффис сандал.",
    specs: ["Материал: Амьсгалдаг торон", "Даац: 120кг", "Баталгаа: 1 жил"],
    soldCount: 342,
    trendScore: 76,
    isTrending: true,
    isBestSeller: true,
    spaces: ["open-office", "home-office"],
    showroomSpace: "open-office",
    showroomNote:
      "Шилэн хана, цэвэрхэн ширээтэй modern office орчинд хамгийн сайн зохицно.",
    comfortScore: 9.2,
    comfortNote:
      "Суух үед зөөлөн боловч суудал нь хэт шигдэхгүй, нурууг удаан хугацаанд тогтвортой дэмжинэ.",
    adjustmentNote:
      "Газ лифтээр өндөр намаа тохируулж, түшлэгийг өдөр тутмын ажлын хэмнэлд тааруулан налуулах боломжтой.",
    featureBadges: [
      "Өндөр/нам тохируулга",
      "Нурууны support",
      "Амьсгалдаг mesh",
    ],
    socialProof:
      "Hybrid office багууд болон бүтэн өдрийн desk work хийдэг хэрэглэгчид их сонгодог төрлийн шийдэл.",
    isNewArrival: false,
  },
  {
    id: 2,
    name: "TitanX Gaming Chair",
    type: "Gaming",
    price: 680000,
    originalPrice: 760000,
    rating: 4.9,
    reviews: 89,
    image: createChairIllustration({
      shell: "#111827",
      accent: "#EF4444",
      base: "#020617",
      background: "#F8FAFC",
      glow: "#FCA5A5",
      silhouette: "gaming",
    }),
    description:
      "Мэргэжлийн тоглогчдод зориулсан дээд зэргийн тав тух. Хүзүү болон ууцны дэрнүүдтэй.",
    specs: ["Материал: Сайн чанарын савхин", "Даац: 150кг", "Баталгаа: 2 жил"],
    soldCount: 275,
    trendScore: 88,
    isTrending: true,
    isBestSeller: true,
    spaces: ["gaming-room", "home-office"],
    showroomSpace: "gaming-room",
    showroomNote:
      "RGB гэрэлтэй setup, dual-monitor ширээтэй gaming room-д илүү хүчтэй харагдана.",
    comfortScore: 9.4,
    comfortNote:
      "Хүзүү, ууцны дэртэй тул олон цаг тоглоход суулт илүү тогтвортой, биед тухтай мэдрэмж өгнө.",
    adjustmentNote:
      "Өндөр намаа газ лифтээр өөрчилж, налалтыг амралт болон тоглолтын байрлалд хурдан шилжүүлж чадна.",
    featureBadges: ["Өндөр/нам", "155° налалт", "Хүзүү/ууцны дэр"],
    socialProof:
      "Стример, esports-style setup хийдэг хэрэглэгчдийн дунд хамгийн түгээмэл харагддаг gaming chair төрлийн нэг.",
    isNewArrival: false,
  },
  {
    id: 3,
    name: "Minimalist Mesh Task",
    type: "Office",
    price: 290000,
    originalPrice: null,
    rating: 4.5,
    reviews: 56,
    image: createChairIllustration({
      shell: "#94A3B8",
      accent: "#E2E8F0",
      base: "#475569",
      background: "#F8FAFC",
      glow: "#CFFAFE",
      silhouette: "office",
    }),
    description: "Зай бага эзлэх, цэвэрхэн минимал загвартай ажлын сандал.",
    specs: ["Материал: Торон даавуу", "Даац: 100кг", "Баталгаа: 6 сар"],
    soldCount: 198,
    trendScore: 58,
    isTrending: false,
    isBestSeller: false,
    spaces: ["home-office", "open-office"],
    showroomSpace: "home-office",
    showroomNote:
      "Жижиг workstation, унтлагын өрөөний home office тохижилтод зай бага эзэлж clean харагдана.",
    comfortScore: 8.5,
    comfortNote:
      "Хөнгөн биетэй ч суухад эвтэйхэн, өдөр тутмын хичээл эсвэл богино session ажилд ядраахгүй суулт өгнө.",
    adjustmentNote:
      "Суудлын өндрийг энгийнээр тохируулж болох бөгөөд жижиг зайд эвтэйхэн хөдөлгөөнтэй ашиглана.",
    featureBadges: ["Өндөр/нам", "Compact size", "Daily use"],
    socialProof:
      "Оюутан, minimal setup хийдэг хэрэглэгчид болон гэрийн ажлын буланд хамгийн их тавьдаг загварын хэв маяг.",
    isNewArrival: false,
  },
  {
    id: 4,
    name: "Lumina RGB Gamer",
    type: "Gaming",
    price: 750000,
    originalPrice: 840000,
    rating: 4.7,
    reviews: 42,
    image: createChairIllustration({
      shell: "#0F172A",
      accent: "#8B5CF6",
      base: "#111827",
      background: "#F8FAFC",
      glow: "#C4B5FD",
      silhouette: "gaming",
    }),
    description:
      "Гэрэлтдэг RGB хүрээтэй, хэвтээ хэлбэрт шилжих боломжтой гайхалтай загвар.",
    specs: ["Материал: Савхин / RGB LED", "Даац: 130кг", "Баталгаа: 1 жил"],
    soldCount: 133,
    trendScore: 82,
    isTrending: true,
    isBestSeller: false,
    spaces: ["gaming-room"],
    showroomSpace: "gaming-room",
    showroomNote:
      "Контент creator эсвэл streamer setup-тэй dark gaming room-д онцгой акцент болно.",
    comfortScore: 9.1,
    comfortNote:
      "Зөөлөвч нь мөр болон нурууг сайн түших тул тоглоом, кино, stream edit зэрэг урт session-д илүү тав тухтай.",
    adjustmentNote:
      "Өндөр/нам болон налалтын тохируулга хурдан мэдрэмжтэй, тоглох байрлалаас амрах байрлал руу шууд шилжинэ.",
    featureBadges: ["Өндөр/нам", "RGB accent", "Relax recline"],
    socialProof:
      "Dark RGB өрөөтэй creator, streamer төрлийн setup-д их харагддаг, нүдэнд тусах gaming chair төрхтэй.",
    isNewArrival: true,
  },
  {
    id: 5,
    name: "Nordic Posture Plus",
    type: "Office",
    price: 520000,
    originalPrice: 590000,
    rating: 4.7,
    reviews: 91,
    image: createChairIllustration({
      shell: "#64748B",
      accent: "#E5E7EB",
      base: "#1E293B",
      background: "#F8FAFC",
      glow: "#DDD6FE",
      silhouette: "office",
    }),
    description:
      "Нуруу дэмжих хос тулгууртай, удирдах ажилтанд зориулсан дэгжин office chair.",
    specs: ["Материал: Mesh + Nylon", "Даац: 135кг", "Баталгаа: 2 жил"],
    soldCount: 226,
    trendScore: 69,
    isTrending: false,
    isBestSeller: false,
    spaces: ["executive-office", "meeting-room"],
    showroomSpace: "executive-office",
    showroomNote:
      "Менежерийн өрөө, executive table, модон өнгөлгөөтэй оффист илүү premium харагдана.",
    comfortScore: 9,
    comfortNote:
      "Нуруу дагасан суулттай, өдөржин meeting орсон ч бие хэт чилээхгүй тэнцвэртэй мэдрэмж өгнө.",
    adjustmentNote:
      "Өндөр/нам, түшлэгийн өнцөг, гарын байрлалыг ажлын ширээний өндрөөс хамаарч амархан тааруулна.",
    featureBadges: ["Өндөр/нам", "Executive fit", "Meeting-ready"],
    socialProof:
      "Менежер, team lead, boardroom орчинд ажилладаг хүмүүсийн сонголтод их багтдаг төрлийн office chair.",
    isNewArrival: false,
  },
  {
    id: 6,
    name: "AeroFlex Executive",
    type: "Office",
    price: 610000,
    originalPrice: null,
    rating: 4.9,
    reviews: 138,
    image: createChairIllustration({
      shell: "#1E293B",
      accent: "#CBD5E1",
      base: "#0F172A",
      background: "#F8FAFC",
      glow: "#FDE68A",
      silhouette: "office",
    }),
    description:
      "Толгой, мөр, нурууны зөв байрлалыг хадгалах олон түвшний тохируулгатай executive chair.",
    specs: ["Материал: Premium mesh", "Даац: 140кг", "Баталгаа: 3 жил"],
    soldCount: 311,
    trendScore: 74,
    isTrending: true,
    isBestSeller: true,
    spaces: ["executive-office", "meeting-room", "open-office"],
    showroomSpace: "executive-office",
    showroomNote:
      "Boardroom эсвэл өндөр түвшний executive office интерьер дээр маш цэгцтэй, хүчтэй харагдана.",
    comfortScore: 9.5,
    comfortNote:
      "Толгой, мөр, нурууг зэрэг дэмждэг тул бүтэн өдөр суухад premium, ядраахгүй feel өгдөг.",
    adjustmentNote:
      "Газ лифт, налалт, гарын түшлэгийн түвшнийг олон байрлалаар тааруулж, суултын posture-оо амархан олно.",
    featureBadges: ["Өндөр/нам", "Executive support", "Multi-adjust"],
    socialProof:
      "Top management, studio founder, premium workspace тохижуулдаг багуудын дунд өндөр үнэлгээтэй төрлийн суудал.",
    isNewArrival: false,
  },
  {
    id: 7,
    name: "ShadowStrike Pro",
    type: "Gaming",
    price: 820000,
    originalPrice: 910000,
    rating: 4.8,
    reviews: 77,
    image: createChairIllustration({
      shell: "#111827",
      accent: "#22C55E",
      base: "#020617",
      background: "#F8FAFC",
      glow: "#86EFAC",
      silhouette: "gaming",
    }),
    description:
      "Тэмцээний үеийн удаан суултад зориулагдсан өндөр нягтралтай зөөлөвчтэй gaming chair.",
    specs: ["Материал: PU leather", "Даац: 150кг", "Баталгаа: 2 жил"],
    soldCount: 259,
    trendScore: 85,
    isTrending: true,
    isBestSeller: true,
    spaces: ["gaming-room", "home-office"],
    showroomSpace: "gaming-room",
    showroomNote:
      "ESports-style setup, RGB strip, механик keyboard-тэй орчинд хамгийн зохимжтой.",
    comfortScore: 9.6,
    comfortNote:
      "Нягт зөөлөвч, өндөр түшлэг хоёр нь удаан тоглолт, tournament watch, editing session-д илүү тухтай суулгадаг.",
    adjustmentNote:
      "Өндөр/нам, налалтын өнцөг, гарын түшлэгээ тохируулснаар keyboard ба mouse-ын өндөрт яг тааруулж сууна.",
    featureBadges: ["Өндөр/нам", "Tournament fit", "Streamer favorite"],
    socialProof:
      "Esports vibe-тэй өрөө, stream corner, creator desk setup хийдэг хэрэглэгчид хамгийн их сонирхдог төрлийн загвар.",
    isNewArrival: false,
  },
  {
    id: 8,
    name: "CloudBack Study Chair",
    type: "Office",
    price: 260000,
    originalPrice: null,
    rating: 4.4,
    reviews: 63,
    image: createChairIllustration({
      shell: "#CBD5E1",
      accent: "#FFFFFF",
      base: "#64748B",
      background: "#F8FAFC",
      glow: "#FDE68A",
      silhouette: "office",
    }),
    description:
      "Сурагч, оюутан, гэрээсээ ажилладаг хүмүүст тохирох хөнгөн, хөдөлгөөнт суудал.",
    specs: ["Материал: Fabric mesh", "Даац: 95кг", "Баталгаа: 6 сар"],
    soldCount: 185,
    trendScore: 60,
    isTrending: false,
    isBestSeller: false,
    spaces: ["home-office", "open-office"],
    showroomSpace: "home-office",
    showroomNote:
      "Цонхны дэргэдэх study corner эсвэл minimal home office тохижилтод тохиромжтой.",
    comfortScore: 8.4,
    comfortNote:
      "Хөнгөн суулттай ч ар тал хэт халууцахгүй, өдөр тутмын хичээл болон remote work-д тухтай.",
    adjustmentNote:
      "Өндөр намаа амархан өөрчилж, бага зайтай ширээнд ч эвтэйхэн шургаж сууна.",
    featureBadges: ["Өндөр/нам", "Study setup", "Light mobility"],
    socialProof:
      "Study desk, remote work corner хийсэн хэрэглэгчид practical сонголт гэж их авдаг хэв маяг.",
    isNewArrival: true,
  },
  {
    id: 9,
    name: "Nebula X Elite",
    type: "Gaming",
    price: 890000,
    originalPrice: 990000,
    rating: 5,
    reviews: 54,
    image: createChairIllustration({
      shell: "#030712",
      accent: "#06B6D4",
      base: "#111827",
      background: "#F8FAFC",
      glow: "#67E8F9",
      silhouette: "gaming",
    }),
    description:
      "4D гарын түшлэг, 180 градус хэвтэх боломж, premium өнгөлгөөтэй дээд зэрэглэлийн загвар.",
    specs: ["Материал: Carbon-look PU", "Даац: 160кг", "Баталгаа: 3 жил"],
    soldCount: 147,
    trendScore: 92,
    isTrending: true,
    isBestSeller: false,
    spaces: ["gaming-room"],
    showroomSpace: "gaming-room",
    showroomNote:
      "High-end стриминг өрөө, neon light акценттай setup-д хамгийн их анхаарал татна.",
    comfortScore: 9.7,
    comfortNote:
      "Суудлын зөөлөвч, өргөн түшлэг хоёр нь high-end gaming chair-ийн шигдэлтгүй боловч тухтай feel-ийг өгнө.",
    adjustmentNote:
      "Өндөр, налалт, гарын түшлэгийн тохируулга нь илүү өргөн хүрээтэй тул setup бүрт гүн тааруулж болно.",
    featureBadges: ["Өндөр/нам", "180° хэвтэлт", "Creator pick"],
    socialProof:
      "Premium creator room, stream highlight content хийдэг хэрэглэгчдийн мөрөөдлийн setup-тай хамгийн ойр vibe өгдөг.",
    isNewArrival: true,
  },
  {
    id: 10,
    name: "PureForm White Mesh",
    type: "Office",
    price: 380000,
    originalPrice: 430000,
    rating: 4.6,
    reviews: 112,
    image: createChairIllustration({
      shell: "#E5E7EB",
      accent: "#FFFFFF",
      base: "#94A3B8",
      background: "#F8FAFC",
      glow: "#BFDBFE",
      silhouette: "office",
    }),
    description:
      "Цагаан өнгийн цэвэрхэн хийцтэй, жижиг оффис болон studio өрөөнд төгс зохицох загвар.",
    specs: ["Материал: White mesh", "Даац: 110кг", "Баталгаа: 1 жил"],
    soldCount: 289,
    trendScore: 79,
    isTrending: true,
    isBestSeller: true,
    spaces: ["open-office", "meeting-room", "home-office"],
    showroomSpace: "open-office",
    showroomNote:
      "Bright palette-тэй оффис, цагаан ширээ, studio workspace-д илүү цэвэрхэн харагдана.",
    comfortScore: 8.9,
    comfortNote:
      "Зөөлөн суух мэдрэмжтэй хэрнээ mesh ар тал нь агаарыг сайн нэвтрүүлж, удаан суухад хөнгөн feel өгнө.",
    adjustmentNote:
      "Өндөр намаа хурдан тааруулах бөгөөд гэрийн болон оффисын ширээний өндөрт уян хатан зохицно.",
    featureBadges: ["Өндөр/нам", "Clean aesthetic", "Air flow back"],
    socialProof:
      "Bright office, design studio, aesthetic workspace сонирхдог хэрэглэгчдийн дунд хамгийн их түгээмэл өнгө төрхтэй.",
    isNewArrival: true,
  },
  {
    id: 11,
    name: "Velocity GT Racer",
    type: "Gaming",
    price: 720000,
    originalPrice: 790000,
    rating: 4.7,
    reviews: 69,
    image: createChairIllustration({
      shell: "#1F2937",
      accent: "#F97316",
      base: "#111827",
      background: "#F8FAFC",
      glow: "#FDBA74",
      silhouette: "gaming",
    }),
    description:
      "Уралдааны суудлын хэлбэрээс санаа авсан, мөр болон нурууг сайн түших загвар.",
    specs: ["Материал: Hybrid leather", "Даац: 145кг", "Баталгаа: 18 сар"],
    soldCount: 204,
    trendScore: 71,
    isTrending: true,
    isBestSeller: false,
    spaces: ["gaming-room", "home-office"],
    showroomSpace: "gaming-room",
    showroomNote:
      "Console gaming булан эсвэл racing sim setup-д хамгийн спортлог өнгө аяс өгнө.",
    comfortScore: 9,
    comfortNote:
      "Нурууны хоёр талаар шахаж тогтоодог хийцтэй тул racing style сууц мэдрэмж илүү тод мэдрэгдэнэ.",
    adjustmentNote:
      "Өндөр/нам болон налалтын тохируулга нь sim racing эсвэл console тоглох өнцөгт хурдан таарна.",
    featureBadges: ["Өндөр/нам", "Racing posture", "Home setup"],
    socialProof:
      "Racing sim, console streamer, sport-style setup хийдэг хэрэглэгчид энэ төрлийн chair-ийг их сонирхдог.",
    isNewArrival: false,
  },
  {
    id: 12,
    name: "ZenCurve Work Lounge",
    type: "Office",
    price: 470000,
    originalPrice: 540000,
    rating: 4.8,
    reviews: 84,
    image: createChairIllustration({
      shell: "#475569",
      accent: "#F5F5F4",
      base: "#334155",
      background: "#F8FAFC",
      glow: "#E9D5FF",
      silhouette: "office",
    }),
    description:
      "Сандал болон lounge feel-ийг хослуулсан, meeting room болон creative space-д тохиромжтой.",
    specs: ["Материал: Soft-touch fabric", "Даац: 120кг", "Баталгаа: 1 жил"],
    soldCount: 164,
    trendScore: 67,
    isTrending: false,
    isBestSeller: false,
    spaces: ["meeting-room", "executive-office"],
    showroomSpace: "meeting-room",
    showroomNote:
      "Creative agency meeting room, lounge corner, discussion area-д дулаан мэдрэмж өгнө.",
    comfortScore: 8.8,
    comfortNote:
      "Суудал нь lounge feel-тэй тул meeting, brainstorm, coffee chat маягийн суултад илүү тайван мэдрэмж төрүүлнэ.",
    adjustmentNote:
      "Өндөр/нам үндсэн тохируулгатай бөгөөд олон хүн ээлжилж суух meeting орчинд хурдан тааруулж болно.",
    featureBadges: ["Өндөр/нам", "Lounge comfort", "Creative room"],
    socialProof:
      "Agency, creative studio, discussion-heavy оффист relaxed atmosphere хүсдэг багууд их сонгодог.",
    isNewArrival: true,
  },
];

const AMAZON_CHAIR_IMAGES = [
  "https://m.media-amazon.com/images/I/61FiA3sniYL._AC_.jpg",
  "https://m.media-amazon.com/images/I/71VdQKzSAqL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81BwbwKZLNL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81yWiUlTKyL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71aGX3PevYL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71aCli5M3fL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81KBbKsn6tL._AC_.jpg",
  "https://m.media-amazon.com/images/I/71SJdjXNHzL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81Ln03kqhIL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/818nJ1piNoL._AC_.jpg",
  "https://m.media-amazon.com/images/I/714hi150rlL.jpg",
  "https://m.media-amazon.com/images/I/71szprNjmvL.jpg",
  "https://m.media-amazon.com/images/I/71VVnBaTC2L._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71uUQh68eqL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61fKWv9WRSL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71YTRYhUrIL.jpg",
  "https://m.media-amazon.com/images/I/71heil7CimL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/91qW-+Z+2bL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81iKeTYiomL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81NfOxpUROL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61KFDPSh8mL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/815Qev5QFkL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/513qCj5IsdL.jpg",
  "https://m.media-amazon.com/images/I/717G8q4WDkL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81sic2iGCKL._AC_.jpg",
  "https://m.media-amazon.com/images/I/91QmnZzeEWL.jpg",
  "https://m.media-amazon.com/images/I/91ud0RbaP8L._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71TXsjrQjFL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81eKYaxjlbL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81tPQlLJYML._AC_SL1500_.jpg",
] as const;

const PRODUCT_VARIANT_LABELS = ["Plus", "Max", "Elite"] as const;
const PRODUCT_FINISHES = ["Slate", "Ivory", "Carbon", "Sand"] as const;

const PRODUCTS: Product[] = AMAZON_CHAIR_IMAGES.map((image, index) => {
  const base = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
  const cycle = Math.floor(index / BASE_PRODUCTS.length);
  const priceBump =
    cycle * (base.type === "Gaming" ? 35000 : 25000) + (index % 3) * 5000;
  const price = base.price + priceBump;
  const originalPriceBase =
    base.originalPrice === null ? base.price + 50000 : base.originalPrice;
  const originalPrice =
    index % 5 === 2 ? null : Math.max(price + 40000, originalPriceBase + priceBump);
  const rating = Number(
    Math.max(
      4.3,
      Math.min(5, base.rating - cycle * 0.1 + ((index % 3) - 1) * 0.05),
    ).toFixed(1),
  );
  const reviews = base.reviews + cycle * 26 + index * 4;
  const soldCount = base.soldCount + cycle * 48 + index * 6;
  const trendScore = Math.min(98, base.trendScore + cycle * 4 + (index % 4) * 2);
  const name =
    cycle === 0
      ? base.name
      : `${base.name} ${PRODUCT_VARIANT_LABELS[(cycle - 1) % PRODUCT_VARIANT_LABELS.length]} ${PRODUCT_FINISHES[index % PRODUCT_FINISHES.length]}`;

  return {
    ...base,
    id: index + 1,
    name,
    price,
    originalPrice,
    rating,
    reviews,
    image,
    soldCount,
    trendScore,
    isTrending: cycle > 0 ? index % 2 === 0 || base.isTrending : base.isTrending,
    isBestSeller:
      cycle > 0 ? index % 3 === 0 || base.isBestSeller : base.isBestSeller,
    isNewArrival: index >= 18 ? true : base.isNewArrival,
    featureBadges:
      cycle === 0
        ? [...base.featureBadges]
        : [
            ...base.featureBadges.slice(0, 2),
            `${PRODUCT_FINISHES[index % PRODUCT_FINISHES.length]} finish`,
          ],
  };
});

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);
const TYPE_FILTERS: TypeFilter[] = ["All", "Office", "Gaming"];
const EXPERIENCE_FILTER_OPTIONS: Array<{
  value: ExperienceFilter;
  label: string;
}> = [
  { value: "All", label: "Бүх онцлог" },
  { value: "new-arrival", label: "Шинээр ирсэн" },
  { value: "best-seller", label: "Хамгийн их зарагдсан" },
  { value: "discounted", label: "Хямдарсан" },
  { value: "trending", label: "Trend болж буй" },
  { value: "office-ready", label: "Оффист гоё харагдах" },
];
const PRICE_FILTER_OPTIONS: Array<{ value: PriceFilter; label: string }> = [
  { value: "All", label: "Бүх үнэ" },
  { value: "under-400k", label: "400,000₮-с бага" },
  { value: "400k-700k", label: "400,000₮ - 700,000₮" },
  { value: "700k-plus", label: "700,000₮+" },
];
const RATING_FILTER_OPTIONS: Array<{ value: RatingFilter; label: string }> = [
  { value: "All", label: "Бүх үнэлгээ" },
  { value: "4.5-up", label: "4.5+" },
  { value: "4.8-up", label: "4.8+" },
];
const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Онцлох" },
  { value: "sold-desc", label: "Хамгийн их зарагдсан" },
  { value: "trend-desc", label: "Trend score өндөр" },
  { value: "price-asc", label: "Үнэ өсөхөөр" },
  { value: "price-desc", label: "Үнэ буурахаар" },
  { value: "rating-desc", label: "Үнэлгээ өндөр" },
  { value: "reviews-desc", label: "Сэтгэгдэл их" },
];
const SPACE_FILTER_OPTIONS: Array<{
  value: SpaceStyle | "All";
  label: string;
}> = [
  { value: "All", label: "Бүх орчин" },
  { value: "open-office", label: "Нээлттэй оффис" },
  { value: "executive-office", label: "Executive office" },
  { value: "meeting-room", label: "Meeting room" },
  { value: "home-office", label: "Home office" },
  { value: "gaming-room", label: "Gaming room" },
];
const NAV_ITEMS: Array<{
  page: Extract<PageType, "home" | "products">;
  label: string;
}> = [
  { page: "home", label: "Нүүр" },
  { page: "products", label: "Бүтээгдэхүүн" },
];
const STORE_STATS = [
  { value: `${PRODUCTS.length}+`, label: "загвар бэлэн" },
  { value: "24 цаг", label: "дотор хүргэлт" },
  { value: "4.8/5", label: "дундаж үнэлгээ" },
];

const CHATBOT_QUICK_PROMPTS = [
  "700000 төгрөг дотор office chair санал болго",
  "Gaming setup-д ямар сандал илүү тохирох вэ?",
  "Хүргэлт ба баталгааны талаар хэлээд өг",
] as const;

// --- UTILS ---
const formatPrice = (price: number) =>
  `${new Intl.NumberFormat("mn-MN").format(price)} ₮`;
const getDiscountPercent = (price: number, originalPrice: number | null) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("mn-MN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const normalizeSearchValue = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const SPACE_LABELS: Record<SpaceStyle, string> = {
  "open-office": "Нээлттэй оффис",
  "executive-office": "Executive office",
  "meeting-room": "Meeting room",
  "home-office": "Home office",
  "gaming-room": "Gaming room",
};

const SHOWROOM_IMAGES: Record<SpaceStyle, string> = {
  "open-office": PRODUCTS[0].image,
  "executive-office": PRODUCTS[5].image,
  "meeting-room": PRODUCTS[11].image,
  "home-office": PRODUCTS[7].image,
  "gaming-room": PRODUCTS[8].image,
};

const buildProductSearchText = (product: Product) =>
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

const matchesProductSearch = (product: Product, query: string) => {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return true;

  const tokens = normalizedQuery.split(" ").filter(Boolean);
  const searchableText = buildProductSearchText(product);

  return tokens.every((token) => searchableText.includes(token));
};

const matchesPriceFilter = (price: number, filter: PriceFilter) => {
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

const matchesRatingFilter = (rating: number, filter: RatingFilter) => {
  switch (filter) {
    case "4.5-up":
      return rating >= 4.5;
    case "4.8-up":
      return rating >= 4.8;
    default:
      return true;
  }
};

const matchesExperienceFilter = (
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

const sortProducts = (products: Product[], sortBy: SortOption) => {
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

const buildMockAssistantReply = (
  query: string,
  selectedProduct: Product | null,
) => {
  const normalized = query.trim().toLowerCase();
  const budgetMatch = normalized.match(/(\d{3,7})(?:\s*(?:₮|төгрөг))?/u);
  const budgetValue = budgetMatch ? Number(budgetMatch[1]) : null;

  if (selectedProduct && /(энэ|selected|detail|дэлгэрэнгүй)/u.test(normalized)) {
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
      PRODUCTS.filter((product) => product.type === "Gaming"),
      "rating-desc",
    ).slice(0, 3);

    return `Gaming талдаа эхлээд ${picks
      .map((product) => `${product.name} (${formatPrice(product.price)})`)
      .join(", ")} гэсэн 3-ыг харвал гоё. Эд нарын common тал нь өндөр түшлэг, удаан суухад тухтай padding, setup-д илүү “complete” харагдах silhouette байгаа.`;
  }

  if (/(office|оффис|ажил|study|хичээл|home office)/u.test(normalized)) {
    const picks = sortProducts(
      PRODUCTS.filter((product) => product.type === "Office"),
      "rating-desc",
    ).slice(0, 3);

    return `Office хэрэглээнд бол ${picks
      .map((product) => `${product.name} (${formatPrice(product.price)})`)
      .join(", ")} гэдэг 3 дээрээс эхлэхийг санал болгоно. Эдгээр нь posture, mesh/back support, өдөр тутмын work session дээр илүү balanced feeling өгнө.`;
  }

  if (budgetValue !== null) {
    const picks = sortProducts(
      PRODUCTS.filter((product) => product.price <= budgetValue),
      "price-asc",
    ).slice(0, 3);

    if (picks.length > 0) {
      return `${formatPrice(budgetValue)} дотор ${picks
        .map((product) => `${product.name} (${formatPrice(product.price)})`)
        .join(", ")} гэсэн сонголтууд багтаж байна. Хэрэв хүсвэл үүнээс gaming эсвэл office гэж нарийсгаад дахин санал болгож чадна.`;
    }

    return `${formatPrice(budgetValue)} дотор яг багтах загвар энэ mock list дээр цөөн байна. Price filter дээр “400,000₮-с бага” эсвэл “400,000₮ - 700,000₮” сонгоод ойролцоо хувилбаруудыг харахад амархан.`;
  }

  return "Mock AI туслах байдлаар ажиллаж байгаа болохоор яг live AI биш ч product list дотроос хурдан чиглүүлж өгч чадна. Та office, gaming, төсөв, эсвэл хүргэлт/баталгаа гэж асуувал илүү оновчтой санал гаргаж өгнө.";
};

export default function SandalApp() {
  // State Management
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [experienceFilter, setExperienceFilter] =
    useState<ExperienceFilter>("All");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("All");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("All");
  const [spaceFilter, setSpaceFilter] = useState<SpaceStyle | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [headerSearchOpen, setHeaderSearchOpen] = useState(false);
  const [shouldFocusProductSearch, setShouldFocusProductSearch] =
    useState(false);
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
  const desktopSearchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);
  const headerSearchInputRef = useRef<HTMLInputElement | null>(null);
  const homeSearchInputRef = useRef<HTMLInputElement | null>(null);
  const homeSearchResultsRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatMessageIdRef = useRef(2);

  // Navigation
  const navigateTo = (page: PageType, product: Product | null = null) => {
    setCurrentPage(page);
    setSelectedProduct(product);
    setMobileFiltersOpen(false);
    setHeaderSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  // Cart Functions
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

  // Toast
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const resetProductFilters = () => {
    setTypeFilter("All");
    setExperienceFilter("All");
    setPriceFilter("All");
    setRatingFilter("All");
    setSpaceFilter("All");
    setSortBy("featured");
    setSearchQuery("");
    setMobileFiltersOpen(false);
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

  const scrollToHomeSearchResults = () => {
    window.setTimeout(() => {
      homeSearchResultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 140);
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

    if (currentPage === "home") {
      scrollToHomeSearchResults();
      return;
    }

    setShouldFocusProductSearch(true);

    if (currentPage !== "products") {
      navigateTo("products");
      return;
    }
  };

  const submitHomeSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim().length === 0) {
      homeSearchInputRef.current?.focus();
      return;
    }

    scrollToHomeSearchResults();
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
          text: buildMockAssistantReply(trimmed, selectedProduct),
        },
      ]);
      setChatbotTyping(false);
    }, 650);
  };

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMockChatMessage(chatInput);
  };

  useEffect(() => {
    if (!(currentPage === "products" && shouldFocusProductSearch)) return;

    const timer = window.setTimeout(() => {
      const preferredTarget =
        window.innerWidth >= 1024
          ? desktopSearchInputRef.current
          : mobileSearchInputRef.current;
      const fallbackTarget =
        desktopSearchInputRef.current ?? mobileSearchInputRef.current;

      (preferredTarget ?? fallbackTarget)?.focus();
      (preferredTarget ?? fallbackTarget)?.select();
      setShouldFocusProductSearch(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [currentPage, shouldFocusProductSearch]);

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

  // --- REUSABLE UI COMPONENTS ---
  const Button = ({
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

  const Card = ({ children, className = "", onClick, ...props }: CardProps) => (
    <div
      onClick={onClick}
      className={`bg-white/88 rounded-3xl border border-white/70 p-5 backdrop-blur-sm shadow-[0_14px_50px_rgba(15,23,42,0.06)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${onClick ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)]" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  // --- VIEWS ---
  const renderHome = () => {
    const hasHomeSearch = searchQuery.trim().length > 0;
    const homeSearchResults = sortProducts(
      PRODUCTS.filter((product) => matchesProductSearch(product, searchQuery)),
      "rating-desc",
    ).slice(0, 6);

    return (
      <div className="space-y-16 pb-12 animate-in fade-in duration-700 lg:space-y-20">
        {/* Hero */}
        <section className="relative grid items-center gap-12 pt-12 lg:grid-cols-2 lg:pt-20">
          <div className="space-y-8 animate-in slide-in-from-left-6 duration-700">
            <button
              type="button"
              onClick={openNewArrivals}
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
              <Button primary onClick={() => navigateTo("products")}>
                Бүтээгдэхүүн үзэх
              </Button>
              <Button onClick={() => navigateTo("products")}>
                Захиалга өгөх
              </Button>
            </div>
            <form
              onSubmit={submitHomeSearch}
              className="flex max-w-xl items-center gap-3 rounded-[1.75rem] border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm"
            >
              <Search className="h-5 w-5 text-slate-400" />
              <input
                ref={homeSearchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Сандал хайх... office, gaming, mesh"
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
              >
                Хайх
              </button>
            </form>
            <div className="grid max-w-xl grid-cols-3 gap-3 pt-2">
              {STORE_STATS.map((stat) => (
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
            <img
              src={PRODUCTS[0].image}
              alt="Hero Chair"
              className="h-[500px] w-full rounded-[3rem] bg-white/70 p-8 object-contain shadow-[0_28px_80px_rgba(15,23,42,0.18)] transition-transform duration-700 hover:scale-[1.015]"
            />
          </div>
        </section>

        {hasHomeSearch && (
          <section ref={homeSearchResultsRef}>
            <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-slate-200/70 bg-white/75 p-5 shadow-sm backdrop-blur-sm md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Home Search
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  "{searchQuery.trim()}" хайлтад {homeSearchResults.length} загвар
                  тохирлоо
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Эндээс card-аар харж болно. Илүү нарийн шүүх бол products page
                  руу орж filter-үүдтэй нь үргэлжлүүлээрэй.
                </p>
              </div>
              <Button onClick={() => navigateTo("products")}>Бүгдийг харах</Button>
            </div>

            {homeSearchResults.length === 0 ? (
              <Card className="p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Илэрц олдсонгүй
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Өөр түлхүүр үг оруулж үзэх эсвэл products page дээр filter-ээр
                  хайлтаа нарийсгаад үзээрэй.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {homeSearchResults.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Featured Products */}
        <section>
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Онцлох загварууд
            </h2>
            <button
              onClick={() => navigateTo("products")}
              className="group flex items-center gap-1 font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Бүгдийг үзэх{" "}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
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
                iconClass:
                  "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
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

  const ProductCard = ({ product, index = 0 }: ProductCardProps) => (
    <Card
      className="flex flex-col p-4 group animate-in fade-in slide-in-from-bottom-4 duration-700"
      onClick={() => navigateTo("productDetail", product)}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-5 transition-transform duration-700 group-hover:scale-105"
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
          <h3 className="font-bold text-slate-900 leading-tight">
            {product.name}
          </h3>
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
          {product.type === "Gaming"
            ? product.socialProof
            : product.adjustmentNote}
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

  const renderProducts = () => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = PRODUCTS.filter((product) => {
      const matchesType =
        typeFilter === "All" ? true : product.type === typeFilter;
      const matchesExperience = matchesExperienceFilter(
        product,
        experienceFilter,
      );
      const matchesPrice = matchesPriceFilter(product.price, priceFilter);
      const matchesRating = matchesRatingFilter(product.rating, ratingFilter);
      const matchesSpace =
        spaceFilter === "All" ? true : product.spaces.includes(spaceFilter);
      const searchableText =
        `${product.name} ${product.description} ${product.type} ${product.showroomNote} ${SPACE_LABELS[product.showroomSpace]} ${product.comfortNote} ${product.adjustmentNote} ${product.socialProof} ${product.featureBadges.join(" ")} ${product.isNewArrival ? "шинэ шинэ ирсэн" : ""} ${product.originalPrice ? "хямдарсан sale discount" : ""}`.toLowerCase();
      const matchesSearch =
        normalizedQuery.length === 0
          ? true
          : searchableText.includes(normalizedQuery);

      return (
        matchesType &&
        matchesExperience &&
        matchesPrice &&
        matchesRating &&
        matchesSpace &&
        matchesSearch
      );
    });
    const visibleProducts = sortProducts(filtered, sortBy);
    const hasActiveFilters =
      typeFilter !== "All" ||
      experienceFilter !== "All" ||
      priceFilter !== "All" ||
      ratingFilter !== "All" ||
      spaceFilter !== "All" ||
      sortBy !== "featured" ||
      searchQuery.trim().length > 0;
    const activeFilterCount = [
      typeFilter !== "All",
      experienceFilter !== "All",
      priceFilter !== "All",
      ratingFilter !== "All",
      spaceFilter !== "All",
      sortBy !== "featured",
      searchQuery.trim().length > 0,
    ].filter(Boolean).length;
    const mobileExperienceOptions = EXPERIENCE_FILTER_OPTIONS.filter(
      (option) =>
        option.value === "All" ||
        option.value === "new-arrival" ||
        option.value === "best-seller" ||
        option.value === "discounted",
    );

    return (
      <div className="py-8 animate-in fade-in duration-700">
        <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
            <Card className="p-5 md:p-6 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Шүүлтүүр
                </div>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  Бүх Сандал
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Зүүн талаас шүүлтүүрээ сонгоод баруун талаас тохирох
                  загваруудаа харьцуулж үзээрэй.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Хайлт
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      ref={desktopSearchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Нэр, шинэ, хямдарсан..."
                      className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Төрөл
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    {TYPE_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setTypeFilter(f)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-500 ${
                          typeFilter === f
                            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        {f === "All" ? "Бүгд" : f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Онцлох шүүлтүүр
                  </label>
                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {EXPERIENCE_FILTER_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setExperienceFilter(option.value)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-500 lg:text-left ${
                          experienceFilter === option.value
                            ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Орчин
                  </label>
                  <select
                    value={spaceFilter}
                    onChange={(e) =>
                      setSpaceFilter(e.target.value as SpaceStyle | "All")
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  >
                    {SPACE_FILTER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Үнийн шүүлтүүр
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) =>
                      setPriceFilter(e.target.value as PriceFilter)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  >
                    {PRICE_FILTER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Үнэлгээ
                  </label>
                  <select
                    value={ratingFilter}
                    onChange={(e) =>
                      setRatingFilter(e.target.value as RatingFilter)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  >
                    {RATING_FILTER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Эрэмбэлэх
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <Button
                  className="mt-6 w-full py-3 text-sm"
                  onClick={resetProductFilters}
                >
                  Шүүлтүүр цэвэрлэх
                </Button>
              )}
            </Card>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 lg:hidden sticky top-24 z-20">
              <Card className="border-white/80 bg-white/88 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    ref={mobileSearchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Сандал хайх..."
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
                    {TYPE_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setTypeFilter(f)}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                          typeFilter === f
                            ? "bg-slate-900 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600"
                        }`}
                      >
                        {f === "All" ? "Бүгд" : f}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen((prev) => !prev)}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-500"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {activeFilterCount > 0 ? `Шүүлтүүр ${activeFilterCount}` : "Шүүлтүүр"}
                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-500 ${
                        mobileFiltersOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {mobileExperienceOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setExperienceFilter(option.value)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-500 ${
                        experienceFilter === option.value
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "border border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <div
                  className={`grid transition-all duration-500 ease-out ${
                    mobileFiltersOpen
                      ? "mt-4 grid-rows-[1fr] opacity-100"
                      : "pointer-events-none mt-0 grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 border-t border-slate-200 pt-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2 sm:col-span-1">
                          <label className="mb-2 block text-sm font-medium text-slate-600">
                            Орчин
                          </label>
                          <select
                            value={spaceFilter}
                            onChange={(e) =>
                              setSpaceFilter(
                                e.target.value as SpaceStyle | "All",
                              )
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                          >
                            {SPACE_FILTER_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="mb-2 block text-sm font-medium text-slate-600">
                            Үнэ
                          </label>
                          <select
                            value={priceFilter}
                            onChange={(e) =>
                              setPriceFilter(e.target.value as PriceFilter)
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                          >
                            {PRICE_FILTER_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="mb-2 block text-sm font-medium text-slate-600">
                            Үнэлгээ
                          </label>
                          <select
                            value={ratingFilter}
                            onChange={(e) =>
                              setRatingFilter(e.target.value as RatingFilter)
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                          >
                            {RATING_FILTER_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="mb-2 block text-sm font-medium text-slate-600">
                            Эрэмбэлэх
                          </label>
                          <select
                            value={sortBy}
                            onChange={(e) =>
                              setSortBy(e.target.value as SortOption)
                            }
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                          >
                            {SORT_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {hasActiveFilters && (
                        <Button
                          className="w-full py-3 text-sm"
                          onClick={resetProductFilters}
                        >
                          Шүүлтүүр цэвэрлэх
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mb-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200/70 bg-white/70 p-5 shadow-sm backdrop-blur-sm md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Үр дүн
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  {visibleProducts.length} загвар олдлоо
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Сонгосон шүүлтүүрийн дагуу баруун талд тохирох
                  бүтээгдэхүүнүүд гарч байна.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600">
                Эрэмбэ:{" "}
                {SORT_OPTIONS.find((option) => option.value === sortBy)?.label}
              </div>
            </div>

            <div className="mb-6 flex gap-2 overflow-x-auto pb-1 text-xs text-slate-500 md:flex-wrap md:overflow-visible">
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                Төрөл: {typeFilter === "All" ? "Бүгд" : typeFilter}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                Онцлог:{" "}
                {
                  EXPERIENCE_FILTER_OPTIONS.find(
                    (option) => option.value === experienceFilter,
                  )?.label
                }
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                Орчин:{" "}
                {
                  SPACE_FILTER_OPTIONS.find(
                    (option) => option.value === spaceFilter,
                  )?.label
                }
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                Үнэ:{" "}
                {
                  PRICE_FILTER_OPTIONS.find(
                    (option) => option.value === priceFilter,
                  )?.label
                }
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                Үнэлгээ:{" "}
                {
                  RATING_FILTER_OPTIONS.find(
                    (option) => option.value === ratingFilter,
                  )?.label
                }
              </span>
              {searchQuery.trim() && (
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
                  Хайлт: {searchQuery.trim()}
                </span>
              )}
            </div>

            {visibleProducts.length === 0 ? (
              <Card className="p-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Илэрц олдсонгүй
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Өөр үнийн шүүлтүүр сонгох эсвэл хайлтын үгээ өөрчлөөд үзээрэй.
                </p>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderProductDetail = () => {
    const p = selectedProduct;
    if (!p) return null;

    return (
      <div className="py-8 animate-in slide-in-from-bottom-8 duration-700">
        <button
          onClick={() => navigateTo("products")}
          className="flex items-center text-slate-500 hover:text-slate-900 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Буцах
        </button>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="h-[500px] lg:h-[600px] rounded-[3rem] overflow-hidden bg-slate-50 shadow-[0_24px_70px_rgba(15,23,42,0.14)]">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain p-10 transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="grid gap-4 rounded-[2rem] border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm md:grid-cols-[220px_1fr]">
              <img
                src={SHOWROOM_IMAGES[p.showroomSpace]}
                alt={`${p.name} showroom preview`}
                className="h-40 w-full rounded-[1.5rem] bg-slate-50 p-4 object-contain"
              />
              <div className="flex flex-col justify-center">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Орчинд хэрхэн харагдах вэ
                </div>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {SPACE_LABELS[p.showroomSpace]}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {p.showroomNote}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.spaces.map((space) => (
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
          </div>

          {/* Info */}
          <div className="flex flex-col pt-4">
            <div className="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">
              {p.type} CHAIR
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              {p.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-800">
                  {formatPrice(p.price)}
                </span>
                {p.originalPrice && (
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="text-slate-400 line-through">
                      {formatPrice(p.originalPrice)}
                    </span>
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                      -{getDiscountPercent(p.price, p.originalPrice)}%
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-amber-600 font-medium text-sm">
                <Star className="w-4 h-4 fill-current" /> {p.rating} (
                {p.reviews} үнэлгээ)
              </div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Борлуулалт
                </div>
                <div className="mt-1 text-lg font-bold text-slate-900">
                  {formatCompactNumber(p.soldCount)}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Trend score
                </div>
                <div className="mt-1 text-lg font-bold text-slate-900">
                  {p.trendScore}/100
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Showroom
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {SPACE_LABELS[p.showroomSpace]}
                </div>
              </div>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 border border-slate-200/70 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Суух мэдрэмж
                </div>
                <div className="mt-1 text-lg font-bold text-slate-900">
                  {p.comfortScore}/10
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200/70 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Өндөр/нам
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {p.featureBadges[0]}
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200/70 px-4 py-3">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Тохируулга
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {p.featureBadges[1]}
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {p.isNewArrival && (
                <span className="rounded-full bg-sky-500 px-3 py-1.5 text-xs font-medium text-white">
                  Шинээр ирсэн
                </span>
              )}
              {p.isBestSeller && (
                <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">
                  Хамгийн их зарагдсан
                </span>
              )}
              {p.originalPrice && (
                <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600">
                  Хямдарсан
                </span>
              )}
              {p.isTrending && (
                <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white">
                  Trend болж буй
                </span>
              )}
              {p.spaces.map((space) => (
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
                  {p.comfortNote}
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-slate-50 px-5 py-5">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Тохируулга ба хэрэглээ
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {p.adjustmentNote}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.featureBadges.map((badge) => (
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
                p.type === "Gaming"
                  ? "bg-slate-900 text-white"
                  : "bg-white/80 border border-slate-200/70 text-slate-900"
              }`}
            >
              <div
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  p.type === "Gaming" ? "text-slate-300" : "text-slate-400"
                }`}
              >
                {p.type === "Gaming"
                  ? "Creator / Streamer Vibe"
                  : "Хэн их сонгодог вэ"}
              </div>
              <p
                className={`mt-3 text-sm leading-6 ${
                  p.type === "Gaming" ? "text-slate-100" : "text-slate-600"
                }`}
              >
                {p.socialProof}
              </p>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {p.description}
            </p>

            <div className="mb-10">
              <h3 className="font-bold text-slate-900 mb-4">Үзүүлэлт:</h3>
              <ul className="space-y-3">
                {p.specs.map((spec, i) => (
                  <li key={i} className="flex items-center text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-slate-300 mr-3" />{" "}
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto bg-white/80 border border-slate-200/70 p-6 rounded-3xl flex items-center gap-6 shadow-sm backdrop-blur-sm">
              <Button
                primary
                className="flex-1 py-4 text-lg"
                onClick={() => addToCart(p)}
              >
                Сагсанд нэмэх
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-700">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">
        Таны сагс
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-white/80 border border-slate-200/70 rounded-[3rem] shadow-sm backdrop-blur-sm">
          <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-slate-900 mb-2">
            Сагс хоосон байна
          </h2>
          <p className="text-slate-500 mb-8">
            Та бүтээгдэхүүнүүд рүү орж сонголтоо хийнэ үү.
          </p>
          <Button primary onClick={() => navigateTo("products")}>
            Дэлгүүр рүү буцах
          </Button>
        </div>
      ) : (
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 bg-white/90 rounded-3xl shadow-sm border border-slate-100 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 self-center rounded-2xl object-contain bg-slate-50 p-2 sm:self-auto"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-slate-500 text-sm mt-1 mb-3">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-4">
                    <div className="flex items-center bg-slate-100 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
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
                <span>Нийт ({cartCount} ширхэг)</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mb-5 pb-5 border-b border-slate-200">
                <span>Хүргэлт</span>
                <span className="text-emerald-600 font-medium">Үнэгүй</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-lg mb-6">
                <span>Төлөх дүн</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <Button
                primary
                className="w-full py-3.5 text-sm"
                onClick={() => navigateTo("checkout")}
              >
                Тооцоо хийх
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckout = () => {
    const handleOrder = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      showToast("Захиалга амжилттай үүслээ! Бид удахгүй холбогдох болно.");
      setCart([]);
      setTimeout(() => navigateTo("home"), 2000);
    };

    return (
      <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-700">
        <button
          onClick={() => navigateTo("cart")}
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
              {[
                "QPay (QR уншуулах)",
                "Дансаар шилжүүлэх",
                "Бэлнээр (Хүргэлт ирэх үед)",
              ].map((method, i) => (
                <label
                  key={i}
                  className="flex items-center p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all duration-500"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="w-5 h-5 text-slate-900 border-slate-300 focus:ring-slate-900"
                    defaultChecked={i === 0}
                  />
                  <span className="ml-4 font-medium text-slate-900 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-slate-400" /> {method}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          <Button
            primary
            type="submit"
            className="w-full py-4 text-lg font-bold"
          >
            {formatPrice(cartTotal)} төлж захиалах
          </Button>
        </form>
      </div>
    );
  };

  // --- MAIN LAYOUT ---
  return (
    <div
      className={`${inter.className} relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(241,245,249,0.92)_40%,_rgba(226,232,240,0.86)_100%)] text-slate-900 selection:bg-slate-200`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(148,163,184,0.16),transparent_26%)]" />
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-5 duration-500">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}

      {showFloatingCart && (
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
      )}

      <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-5">
        {chatbotOpen && (
          <div className="w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/94 shadow-[0_22px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-inner">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    AI туслах
                  </div>
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
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
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
            <span className="block text-sm font-semibold text-slate-900">
              AI туслах
            </span>
          </span>
        </button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-white/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
            onClick={() => navigateTo("home")}
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Armchair className="w-5 h-5 text-white" />
            </div>
            Sandal
          </div>

          {/* Desktop Nav */}
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
            <button className="hover:text-slate-900 transition-colors">
              Холбоо барих
            </button>
          </nav>

          {/* Actions */}
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
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-4 duration-500">
            <button
              onClick={() => navigateTo("home")}
              className="text-left text-lg font-bold"
            >
              Нүүр
            </button>
            <button
              onClick={() => navigateTo("products")}
              className="text-left text-lg font-bold"
            >
              Бүтээгдэхүүн
            </button>
            <button className="text-left text-lg font-bold">
              Холбоо барих
            </button>
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

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 min-h-[70vh]">
        {currentPage === "home" && renderHome()}
        {currentPage === "products" && renderProducts()}
        {currentPage === "productDetail" && renderProductDetail()}
        {currentPage === "cart" && renderCart()}
        {currentPage === "checkout" && renderCheckout()}
      </main>

      {/* Footer */}
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
              Монголын хамгийн том оффис болон тоглоомын сандлын төрөлжсөн
              дэлгүүр. Таны эрүүл мэнд, тав тух бидний зорилго.
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
                <button className="hover:text-white transition-colors">
                  Бидний тухай
                </button>
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
    </div>
  );
}
