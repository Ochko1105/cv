import type {
  ChairArtOptions,
  ExperienceFilter,
  LabeledOption,
  NavItem,
  PriceFilter,
  Product,
  RatingFilter,
  SortOption,
  SpaceStyle,
  StoreStat,
  TypeFilter,
} from "./chair-types";

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

const MOCK_PRODUCT_COUNT = 60;
const PRODUCT_VARIANT_LABELS = ["Plus", "Max", "Elite", "Ultra", "Prime"] as const;
const PRODUCT_FINISHES = ["Slate", "Ivory", "Carbon", "Sand", "Olive", "Copper"] as const;

export const PRODUCTS: Product[] = Array.from(
  { length: MOCK_PRODUCT_COUNT },
  (_, index) => {
    const image = AMAZON_CHAIR_IMAGES[index % AMAZON_CHAIR_IMAGES.length];
    const base = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
    const cycle = Math.floor(index / BASE_PRODUCTS.length);
    const finish = PRODUCT_FINISHES[(index + cycle) % PRODUCT_FINISHES.length];
    const priceBump =
      cycle * (base.type === "Gaming" ? 35000 : 25000) + (index % 3) * 5000;
    const price = base.price + priceBump;
    const originalPriceBase =
      base.originalPrice === null ? base.price + 50000 : base.originalPrice;
    const originalPrice =
      index % 5 === 2
        ? null
        : Math.max(price + 40000, originalPriceBase + priceBump);
    const rating = Number(
      Math.max(
        4.3,
        Math.min(5, base.rating - cycle * 0.1 + ((index % 3) - 1) * 0.05),
      ).toFixed(1),
    );
    const reviews = base.reviews + cycle * 26 + index * 4;
    const soldCount = base.soldCount + cycle * 48 + index * 6;
    const trendScore = Math.min(
      98,
      base.trendScore + cycle * 4 + (index % 4) * 2,
    );
    const name =
      cycle === 0
        ? base.name
        : `${base.name} ${PRODUCT_VARIANT_LABELS[(cycle - 1) % PRODUCT_VARIANT_LABELS.length]} ${finish}`;

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
      isTrending:
        cycle > 0 ? index % 2 === 0 || base.isTrending : base.isTrending,
      isBestSeller:
        cycle > 0 ? index % 3 === 0 || base.isBestSeller : base.isBestSeller,
      isNewArrival: index >= 18 ? true : base.isNewArrival,
      featureBadges:
        cycle === 0
          ? [...base.featureBadges]
          : [...base.featureBadges.slice(0, 2), `${finish} finish`],
    };
  },
);

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);
export const TYPE_FILTERS: TypeFilter[] = ["All", "Office", "Gaming"];
export const EXPERIENCE_FILTER_OPTIONS: Array<
  LabeledOption<ExperienceFilter>
> = [
  { value: "All", label: "Бүх онцлог" },
  { value: "new-arrival", label: "Шинээр ирсэн" },
  { value: "best-seller", label: "Хамгийн их зарагдсан" },
  { value: "discounted", label: "Хямдарсан" },
  { value: "trending", label: "Trend болж буй" },
  { value: "office-ready", label: "Оффист гоё харагдах" },
];
export const PRICE_FILTER_OPTIONS: Array<LabeledOption<PriceFilter>> = [
  { value: "All", label: "Бүх үнэ" },
  { value: "under-400k", label: "400,000₮-с бага" },
  { value: "400k-700k", label: "400,000₮ - 700,000₮" },
  { value: "700k-plus", label: "700,000₮+" },
];
export const RATING_FILTER_OPTIONS: Array<LabeledOption<RatingFilter>> = [
  { value: "All", label: "Бүх үнэлгээ" },
  { value: "4.5-up", label: "4.5+" },
  { value: "4.8-up", label: "4.8+" },
];
export const SORT_OPTIONS: Array<LabeledOption<SortOption>> = [
  { value: "featured", label: "Онцлох" },
  { value: "sold-desc", label: "Хамгийн их зарагдсан" },
  { value: "trend-desc", label: "Trend score өндөр" },
  { value: "price-asc", label: "Үнэ өсөхөөр" },
  { value: "price-desc", label: "Үнэ буурахаар" },
  { value: "rating-desc", label: "Үнэлгээ өндөр" },
  { value: "reviews-desc", label: "Сэтгэгдэл их" },
];
export const SPACE_FILTER_OPTIONS: Array<LabeledOption<SpaceStyle | "All">> = [
  { value: "All", label: "Бүх орчин" },
  { value: "open-office", label: "Нээлттэй оффис" },
  { value: "executive-office", label: "Executive office" },
  { value: "meeting-room", label: "Meeting room" },
  { value: "home-office", label: "Home office" },
  { value: "gaming-room", label: "Gaming room" },
];
export const NAV_ITEMS: NavItem[] = [
  { page: "home", label: "Нүүр" },
  { page: "products", label: "Бүтээгдэхүүн" },
  { page: "admin", label: "Admin" },
];
export const STORE_STATS: StoreStat[] = [
  { value: `${PRODUCTS.length}+`, label: "загвар бэлэн" },
  { value: "24 цаг", label: "дотор хүргэлт" },
  { value: "4.8/5", label: "дундаж үнэлгээ" },
];
export const CHATBOT_QUICK_PROMPTS = [
  "700000 төгрөг дотор office chair санал болго",
  "Gaming setup-д ямар сандал илүү тохирох вэ?",
  "Хүргэлт ба баталгааны талаар хэлээд өг",
] as const;

export const SPACE_LABELS: Record<SpaceStyle, string> = {
  "open-office": "Нээлттэй оффис",
  "executive-office": "Executive office",
  "meeting-room": "Meeting room",
  "home-office": "Home office",
  "gaming-room": "Gaming room",
};

export const SHOWROOM_IMAGES: Record<SpaceStyle, string> = {
  "open-office": PRODUCTS[0].image,
  "executive-office": PRODUCTS[5].image,
  "meeting-room": PRODUCTS[11].image,
  "home-office": PRODUCTS[7].image,
  "gaming-room": PRODUCTS[8].image,
};
