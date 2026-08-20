export type PortfolioResult = { label: string; value: string };

export type FeaturedPortfolioItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  service: string;
  clientName: string;
  coverImageUrl: string;
  mediaUrls: string[];
  mediaLabels?: string[];
  deliverables: string[];
  results: PortfolioResult[];
  techStack: string[];
  liveUrl?: string;
  featured: boolean;
  displayOrder: number;
};

/**
 * Six real projects delivered by Soft.
 * Images are served from /public/portfolio/<folder>/ and use descriptive
 * file names so Next.js can apply proper cache headers.
 * All entries are intentionally static so the work library stays visible
 * even when the optional production portfolio database is empty.
 */
export const featuredPortfolio: FeaturedPortfolioItem[] = [
  /* ─────────────────────────────────────────────────────────
     1. بيت البهارات — متجر بهارات وعطارة
  ───────────────────────────────────────────────────────── */
  {
    id: 1001,
    slug: "house-of-spices",
    title: "بيت البهارات — متجر بهارات وعطارة",
    excerpt:
      "منصة تجارة رقمية لمنتجات العطارة والبهارات، صُممت حول السرد البصري واكتشاف المنتجات ومسار شراء متكامل.",
    body: `<h2>التحدي</h2><p>كان المطلوب تقديم عالم منتجات العطارة والبهارات بصورة حديثة تمنح الزائر سببًا للاستكشاف، مع الحفاظ على وضوح المنتجات وسهولة الانتقال إلى الطلب.</p><h2>ما بنيناه</h2><p>طورنا واجهة تجارة تفاعلية تحتوي على أقسام تسويقية، تصفية للمجموعات، بطاقات منتجات، مفضلة، سلة، مراجعات، ونظام دفع وطلب ضمن تجربة متجاوبة.</p><h2>النتيجة</h2><p>أصبح بيت البهارات مساحة رقمية متكاملة تجمع هوية بصرية دافئة مع وظائف التجارة الإلكترونية اللازمة لتصفح المنتجات وإدارة الطلبات.</p>`,
    category: "تجارة إلكترونية",
    service: "متاجر ومنصات المنتجات",
    clientName: "بيت البهارات",
    coverImageUrl: "/portfolio/bharat/01-laptop-and-phone-home.jpg",
    mediaUrls: [
      "/portfolio/bharat/01-laptop-and-phone-home.jpg",
      "/portfolio/bharat/02-mobile-shopping-experience.jpg",
      "/portfolio/bharat/03-product-to-checkout.jpg",
      "/portfolio/bharat/04-admin-control-center.jpg",
    ],
    mediaLabels: [
      "الواجهة الرئيسية",
      "تجربة التسوق — الموبايل",
      "مسار المنتج إلى الدفع",
      "لوحة إدارة المتجر",
    ],
    deliverables: [
      "واجهة عرض للمنتجات",
      "تصفية ومجموعات",
      "سلة ومفضلة",
      "مراجعات ومحتوى تسويقي",
      "تدفق دفع وطلب",
    ],
    results: [
      { label: "الاكتشاف", value: "تجربة تصفح منظمة للمجموعات والمنتجات" },
      { label: "التجارة", value: "سلة ومفضلة ودفع ضمن منصة واحدة" },
      { label: "المحتوى", value: "أقسام تسويقية وقصص بصرية للمنتجات" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
    liveUrl: "https://house-of-spices-linl.vercel.app/",
    featured: true,
    displayOrder: 1,
  },

  /* ─────────────────────────────────────────────────────────
     2. طيف للعطور — متجر عطور فاخرة
  ───────────────────────────────────────────────────────── */
  {
    id: 1002,
    slug: "tif-luxury-fragrance",
    title: "طيف — متجر عطور بواجهة رقمية متكاملة",
    excerpt:
      "واجهة متجر إلكتروني للعطور تعرض المنتجات بوضوح وتدعم التصفح والطلب ضمن تجربة متجاوبة وسهلة الاستخدام.",
    body: `<h2>التحدي</h2><p>احتاجت علامة طيف إلى متجر إلكتروني واضح يعرّف بالمنتجات ويقود الزائر من التصفح إلى الاستفسار أو الطلب دون تعقيد.</p><h2>ما بنيناه</h2><p>طورنا واجهة متجر متجاوبة لتنظيم عرض العطور، إبراز تفاصيل المنتجات، وتوفير مسار واضح للتواصل والطلب، مع مساحة إدارة تساعد على متابعة المنتجات والعمليات اليومية.</p><h2>النتيجة</h2><p>أصبح المشروع حضورًا رقميًا عمليًا لعلامة طيف، يجمع بين عرض المنتجات، سهولة التصفح، وإدارة محتوى المتجر ضمن تجربة مناسبة للحاسوب والهاتف.</p>`,
    category: "تجارة إلكترونية",
    service: "منصات التجارة الرقمية",
    clientName: "طيف",
    coverImageUrl: "/portfolio/atr/ora-tif-promo-01-laptop-hero.png",
    mediaUrls: [
      "/portfolio/atr/ora-tif-promo-01-laptop-hero.png",
      "/portfolio/atr/ora-tif-promo-03-catalog.png",
      "/portfolio/atr/ora-tif-promo-04-admin-control.png",
      "/portfolio/atr/ora-tif-promo-05-whitelabel.png",
    ],
    mediaLabels: [
      "الواجهة الرئيسية",
      "كتالوج العطور",
      "لوحة التحكم",
      "الهوية البصرية",
    ],
    deliverables: [
      "واجهة متجر إلكتروني",
      "عرض وتنظيم المنتجات",
      "تدفق طلبات واستفسارات",
      "واجهة متجاوبة للحاسوب والهاتف",
    ],
    results: [
      { label: "العرض", value: "واجهة واضحة لتصفح العطور والمنتجات" },
      { label: "الإدارة", value: "مساحة منظمة لمتابعة المنتجات ومحتوى المتجر" },
      { label: "الطلب", value: "استفسارات وطلبات مرتبطة بالمنتجات" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://tif-lyart.vercel.app/",
    featured: true,
    displayOrder: 2,
  },

  /* ─────────────────────────────────────────────────────────
     3. أثر للأحذية — متجر أحذية
  ───────────────────────────────────────────────────────── */
  {
    id: 1003,
    slug: "athr-footwear",
    title: "أثر — متجر أحذية بتجربة مميزة",
    excerpt:
      "متجر أحذية رقمي يجمع بين عرض المنتجات بجودة عالية، تجربة تصفح سلسة، ومسار شراء واضح على الحاسوب والهاتف.",
    body: `<h2>التحدي</h2><p>أراد فريق أثر إطلاق حضور رقمي يعكس جودة منتجاتهم ويوفر تجربة تسوق مريحة تدفع الزائر من الاكتشاف إلى الشراء بخطوات واضحة.</p><h2>ما بنيناه</h2><p>صممنا متجراً إلكترونياً يتمحور حول الصور عالية الجودة، مع قسم عرض المنتجات، صفحات التفاصيل، لوحة إدارة متكاملة، وتجربة موبايل أولى.</p><h2>النتيجة</h2><p>أصبح أثر متجراً رقمياً مكتملاً يعكس هوية العلامة التجارية ويوفر تجربة تسوق احترافية على جميع الأجهزة.</p>`,
    category: "تجارة إلكترونية",
    service: "متاجر ومنصات المنتجات",
    clientName: "أثر",
    coverImageUrl: "/portfolio/hatha/01-athr-aura-hero-real.png",
    mediaUrls: [
      "/portfolio/hatha/01-athr-aura-hero-real.png",
      "/portfolio/hatha/02-athr-aura-mobile-real.png",
      "/portfolio/hatha/03-athr-aura-laptop-real.png",
      "/portfolio/hatha/04-athr-aura-studio-real.png",
      "/portfolio/hatha/05-athr-aura-launch-real.png",
      "/portfolio/hatha/06-aura-athr-admin-hero-real.png",
      "/portfolio/hatha/07-aura-athr-admin-mobile-real.png",
    ],
    mediaLabels: [
      "الواجهة الرئيسية",
      "تجربة الموبايل",
      "واجهة الحاسوب",
      "عرض المنتجات",
      "صفحة الإطلاق",
      "لوحة الإدارة",
      "إدارة الموبايل",
    ],
    deliverables: [
      "واجهة متجر أحذية",
      "صفحات تفاصيل المنتجات",
      "تجربة موبايل أولى",
      "لوحة إدارة المتجر",
      "مسار شراء متكامل",
    ],
    results: [
      { label: "العرض", value: "صور منتجات عالية الجودة مع تصفح سلس" },
      { label: "الموبايل", value: "تجربة تسوق مريحة على الهاتف" },
      { label: "الإدارة", value: "لوحة تحكم لإدارة المنتجات والطلبات" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
    liveUrl: "https://hitha711.vercel.app/",
    featured: true,
    displayOrder: 3,
  },

  /* ─────────────────────────────────────────────────────────
     4. ORVÉN — متجر ساعات فاخرة
  ───────────────────────────────────────────────────────── */
  {
    id: 1004,
    slug: "orven-watches",
    title: "ORVÉN — متجر ساعات فاخرة",
    excerpt:
      "هوية رقمية متكاملة لمتجر ساعات فاخر، تجمع بين الجماليات الراقية وتجربة التجارة الإلكترونية الاحترافية.",
    body: `<h2>التحدي</h2><p>أراد ORVÉN تقديم متجر ساعات فاخر يعكس مكانة العلامة التجارية ويوفر تجربة تسوق تليق بجودة منتجاته.</p><h2>ما بنيناه</h2><p>طورنا هوية رقمية متكاملة تشمل واجهة المتجر، صفحات التفاصيل، منظومة تسويقية، ولوحة إدارة مع تحليلات المبيعات.</p><h2>النتيجة</h2><p>أصبح ORVÉN يمتلك حضوراً رقمياً يوازي جودة منتجاته، مع منصة إدارة تساعد الفريق على متابعة العمليات اليومية بكفاءة.</p>`,
    category: "تجارة إلكترونية",
    service: "منصات التجارة الرقمية",
    clientName: "ORVÉN",
    coverImageUrl: "/portfolio/saah/01-ora-soft-orven-identity.png",
    mediaUrls: [
      "/portfolio/saah/01-ora-soft-orven-identity.png",
      "/portfolio/saah/03-ora-soft-orven-commerce.png",
      "/portfolio/saah/04-ora-soft-orven-control-room.png",
      "/portfolio/saah/05-ora-soft-orven-analytics.png",
    ],
    mediaLabels: [
      "الهوية البصرية",
      "واجهة التجارة",
      "لوحة التحكم",
      "التحليلات والإحصائيات",
    ],
    deliverables: [
      "هوية رقمية للعلامة",
      "واجهة متجر فاخرة",
      "لوحة إدارة متكاملة",
      "تحليلات المبيعات",
    ],
    results: [
      { label: "الهوية", value: "حضور رقمي يعكس مكانة العلامة التجارية" },
      { label: "التجارة", value: "واجهة تسوق تليق بمنتجات فاخرة" },
      { label: "الإدارة", value: "لوحة تحكم مع تحليلات ومتابعة المبيعات" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
    liveUrl: "https://saahh.vercel.app/",
    featured: true,
    displayOrder: 4,
  },

  /* ─────────────────────────────────────────────────────────
     5. طاقة هوم — موقع خدمات منزلية
  ───────────────────────────────────────────────────────── */
  {
    id: 1005,
    slug: "taqa-home",
    title: "طاقة هوم — منصة خدمات منزلية",
    excerpt:
      "موقع خدمات منزلية يجمع بين عرض الخدمات بوضوح، تجربة مستخدم سلسة، ولوحة إدارة تساعد الفريق على متابعة الطلبات.",
    body: `<h2>التحدي</h2><p>احتاجت طاقة هوم إلى منصة رقمية تعرض خدماتها المنزلية بشكل واضح وتحول الزائرين إلى عملاء من خلال مسار طلب بسيط.</p><h2>ما بنيناه</h2><p>طورنا موقعاً يشمل عرض الخدمات، صفحات تفاصيل، نظام طلبات، ولوحة إدارة متكاملة لمتابعة الطلبات والمنتجات.</p><h2>النتيجة</h2><p>أصبحت طاقة هوم تمتلك منصة رقمية تجمع بين التسويق والتشغيل اليومي في مكان واحد.</p>`,
    category: "خدمات ومواقع شركات",
    service: "مواقع الشركات والخدمات",
    clientName: "طاقة هوم",
    coverImageUrl: "/portfolio/taqt/aura-soft-taqa-home-real-01-hero.jpg",
    mediaUrls: [
      "/portfolio/taqt/aura-soft-taqa-home-real-01-hero.jpg",
      "/portfolio/taqt/aura-soft-taqa-home-real-02-mobile-story.jpg",
      "/portfolio/taqt/aura-soft-taqa-home-real-05-catalog-post.jpg",
      "/portfolio/taqt/aura-soft-taqa-admin-overview-portrait.png",
      "/portfolio/taqt/aura-soft-taqa-admin-products-landscape.png",
    ],
    mediaLabels: [
      "الواجهة الرئيسية",
      "تجربة الموبايل",
      "عرض الخدمات",
      "لوحة الإدارة",
      "إدارة المنتجات",
    ],
    deliverables: [
      "موقع خدمات منزلية",
      "عرض واضح للخدمات",
      "نظام طلبات",
      "لوحة إدارة متكاملة",
    ],
    results: [
      { label: "العرض", value: "خدمات واضحة ومرتبة يسهل التصفح بينها" },
      { label: "الطلبات", value: "مسار طلب سلس يحول الزائرين إلى عملاء" },
      { label: "الإدارة", value: "لوحة تتابع الطلبات والمنتجات يومياً" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
    liveUrl: "https://taqa-gamma.vercel.app/",
    featured: true,
    displayOrder: 5,
  },

  /* ─────────────────────────────────────────────────────────
     6. عيادة د. ليان — موقع رعاية صحية
  ───────────────────────────────────────────────────────── */
  {
    id: 1006,
    slug: "dr-layan-dental",
    title: "عيادة د. ليان — تجربة رقمية هادئة للرعاية السنية",
    excerpt:
      "موقع احترافي لعيادة أسنان يوازن بين الثقة الطبية، الحضور الإنساني، والحجز الرقمي الواضح.",
    body: `<h2>التحدي</h2><p>احتاجت العيادة إلى حضور رقمي يشرح خدمات طب الأسنان التجميلي والترميمي بطريقة مطمئنة، ويحول الاهتمام إلى حجز واضح دون ازدحام بصري.</p><h2>ما بنيناه</h2><p>صممنا تجربة تحريرية هادئة تشمل تعريف الطبيبة، مجالات العناية، معرض العيادة، مقارنة قبل وبعد، نظام مراجعات، ونموذج حجز مرتبط بخدمات العيادة.</p><h2>النتيجة</h2><p>أصبح الموقع نقطة تواصل متكاملة تجمع الهوية الطبية، عرض الخدمات، المحتوى البصري، والحجز الآمن داخل تجربة متجاوبة.</p>`,
    category: "الرعاية الصحية",
    service: "مواقع الشركات والخدمات",
    clientName: "عيادة د. ليان — إب، اليمن",
    coverImageUrl: "/portfolio/doctor/aura_soft_design_01.png",
    mediaUrls: [
      "/portfolio/doctor/aura_soft_design_01.png",
      "/portfolio/doctor/aura_soft_design_02.png",
      "/portfolio/doctor/aura_soft_design_03.png",
      "/portfolio/doctor/aura_soft_design_04.png",
      "/portfolio/doctor/aura_soft_design_05.png",
    ],
    mediaLabels: [
      "الواجهة الرئيسية",
      "عرض الخدمات",
      "معرض العيادة",
      "نظام الحجز",
      "مراجعات المرضى",
    ],
    deliverables: [
      "هوية رقمية للعيادة",
      "عرض الخدمات الطبية",
      "معرض وتجربة قبل وبعد",
      "حجز مواعيد",
      "مراجعات المرضى",
    ],
    results: [
      { label: "الثقة", value: "محتوى واضح عن الطبيبة والخدمات والنهج العلاجي" },
      { label: "الحجز", value: "نموذج موعد مع حماية من الطلبات المكررة" },
      { label: "التجربة", value: "واجهة متجاوبة هادئة للرعاية الصحية" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "https://doctor-beta-dun.vercel.app/",
    featured: true,
    displayOrder: 6,
  },
];

export function getFeaturedPortfolioBySlug(slug: string) {
  return featuredPortfolio.find((item) => item.slug === slug);
}
