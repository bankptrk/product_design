export type FlowCategory =
  | "shopping"
  | "breadcrumb"
  | "global-nav"
  | "self-dynamic"
  | "system";

export interface PageLinkDetail {
  id: string;
  sourcePageId: string;
  targetPageId: string;
  triggerComponent: string;
  triggerLabel: string;
  targetHref: string;
  category: FlowCategory;
  description: string;
}

export interface PageSectionBlueprint {
  name: string;
  component: string;
  description: string;
  hasOutgoingLink?: boolean;
  linkTarget?: string;
}

export interface UIPageMetadata {
  id: string;
  route: string;
  sampleHref: string;
  title: string;
  subtitle: string;
  filePath: string;
  routeType: "Static Route" | "Query Catalog" | "Dynamic [id]" | "Design Spec" | "Flow Canvas";
  accentColor: string;
  pastelBg: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  description: string;
  queryParams?: string[];
  components: string[];
  modals: string[];
  sections: PageSectionBlueprint[];
  stats: {
    sectionsCount: number;
    componentsCount: number;
    outgoingCount: number;
    incomingCount: number;
  };
}

export const PROJECT_PAGES: UIPageMetadata[] = [
  {
    id: "page-home",
    route: "/",
    sampleHref: "/",
    title: "Home Storefront",
    subtitle: "Main Landing & Promotional Hub",
    filePath: "src/app/page.tsx",
    routeType: "Static Route",
    accentColor: "#fab528",
    pastelBg: "bg-[#fef9c3]",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    borderColor: "border-amber-400",
    description:
      "Primary storefront landing page showcasing seasonal hero promotions, 8 grocery department sliders, live countdown flash deals, best sellers, and new arrivals.",
    components: [
      "Header",
      "HeroBanners",
      "CategorySlider",
      "FeaturedBrands",
      "TopSaverToday",
      "BestSeller",
      "JustLanding",
      "TrustBadges",
      "Footer",
      "CartToast",
    ],
    modals: ["Header Category Dropdown", "Shop By Category Mega Menu"],
    sections: [
      {
        name: "Global Header & Search",
        component: "<Header />",
        description: "Universal search bar with category filter, Shop By Category mega menu, and quick navigation links.",
        hasOutgoingLink: true,
        linkTarget: "/products, /design, /overview",
      },
      {
        name: "Hero Carousel & Weekend Promo",
        component: "<HeroBanners />",
        description: "2-slide promotional hero banner and 20% SALE OFF weekend offer card.",
        hasOutgoingLink: true,
        linkTarget: "/products, /products?onSale=true",
      },
      {
        name: "Browse by Category (8 Depts)",
        component: "<CategorySlider />",
        description: "Interactive 8-department carousel linking directly to filtered catalog views.",
        hasOutgoingLink: true,
        linkTarget: "/products?category=...",
      },
      {
        name: "Featured Brands & Top Saver",
        component: "<FeaturedBrands /> + <TopSaverToday />",
        description: "4 pastel brand promo tiles, Deal of the Day with live countdown timer, and 15% OFF signup form.",
      },
      {
        name: "Best Seller & Just Landing",
        component: "<BestSeller /> + <JustLanding />",
        description: "Department-tabbed product showcases with quantity steppers and instant Add to Cart triggers.",
      },
      {
        name: "Trust Badges & Footer",
        component: "<TrustBadges /> + <Footer />",
        description: "Service guarantee badges, newsletter subscription bar, and system documentation links.",
        hasOutgoingLink: true,
        linkTarget: "/design, /overview",
      },
    ],
    stats: {
      sectionsCount: 6,
      componentsCount: 10,
      outgoingCount: 7,
      incomingCount: 5,
    },
  },
  {
    id: "page-products",
    route: "/products",
    sampleHref: "/products",
    title: "Product Catalog & Search",
    subtitle: "Full Grocery Listing & Multi-Faceted Filtering",
    filePath: "src/app/products/page.tsx",
    routeType: "Query Catalog",
    accentColor: "#10b981",
    pastelBg: "bg-[#d9ede2]",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800",
    borderColor: "border-emerald-400",
    description:
      "Complete catalog of 24 products supporting URL query filters (?category, ?q), sidebar facet controls, 6 sort modes, Grid/List view switching, and Quick View modal inspection.",
    queryParams: ["?category={dept}", "?q={search}", "?onSale=true"],
    components: [
      "Header",
      "Breadcrumbs",
      "ProductFilters",
      "ProductCard",
      "Pagination",
      "Dialog",
      "TrustBadges",
      "Footer",
      "CartToast",
    ],
    modals: ["Product Quick View Modal (<Dialog size='2xl' />)", "Mobile Filter Drawer (<Dialog size='md' />)"],
    sections: [
      {
        name: "Breadcrumb Trail",
        component: "<Breadcrumbs />",
        description: "Hierarchical path navigation: Home ➔ Products ➔ [Active Category].",
        hasOutgoingLink: true,
        linkTarget: "/",
      },
      {
        name: "Dynamic Department Hero",
        component: "Department Theme Banner",
        description: "Department-specific pastel banner with quick category switcher pills and item counts.",
        hasOutgoingLink: true,
        linkTarget: "/products?category=...",
      },
      {
        name: "Sidebar & Mobile Filters",
        component: "<ProductFilters /> + <Dialog />",
        description: "Faceted filtering by department, price range ($0-$100), brands, customer rating (4★+), stock, and sale status.",
      },
      {
        name: "Catalog Grid / List & Quick View",
        component: "<ProductCard /> + <Pagination />",
        description: "24 product cards linking to dynamic detail pages or opening the Quick View modal overlay.",
        hasOutgoingLink: true,
        linkTarget: "/products/[id]",
      },
    ],
    stats: {
      sectionsCount: 4,
      componentsCount: 9,
      outgoingCount: 6,
      incomingCount: 9,
    },
  },
  {
    id: "page-product-detail",
    route: "/products/[id]",
    sampleHref: "/products/prod-1",
    title: "Product Detail Page",
    subtitle: "Dynamic Single Product Showcase & Bundle Builder",
    filePath: "src/app/products/[id]/page.tsx",
    routeType: "Dynamic [id]",
    accentColor: "#0284c7",
    pastelBg: "bg-[#d8eef5]",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-800",
    borderColor: "border-sky-400",
    description:
      "Dynamic product route (e.g. prod-1 to prod-24) featuring a 4-angle image gallery with fullscreen zoom, buy box, Frequently Bought Together bundle builder, 4 detail tabs, and related product recommendations.",
    queryParams: ["[id] (prod-1 .. prod-24)"],
    components: [
      "Header",
      "Breadcrumbs",
      "Badge",
      "QuantityStepper",
      "Tabs",
      "Dialog",
      "ProductCard",
      "TrustBadges",
      "Footer",
      "CartToast",
    ],
    modals: ["Fullscreen Photo Zoom (<Dialog size='2xl' />)", "Write a Review Modal (<Dialog size='md' />)"],
    sections: [
      {
        name: "Multi-Level Breadcrumbs",
        component: "<Breadcrumbs />",
        description: "Deep breadcrumb trail: Home ➔ Catalog (/products) ➔ Category (/products?category=...) ➔ Product.",
        hasOutgoingLink: true,
        linkTarget: "/, /products, /products?category=...",
      },
      {
        name: "Image Gallery & Buy Box Hero",
        component: "Gallery + <QuantityStepper /> + <Badge />",
        description: "4-angle photo switcher, enlarge modal trigger, clickable category pill, stock meter, and Add to Cart CTA.",
        hasOutgoingLink: true,
        linkTarget: "/products?category=...",
      },
      {
        name: "Frequently Bought Together & Tabs",
        component: "Bundle Builder + <Tabs />",
        description: "Companion product combo checkout and 4 tabs (Description, Nutritional Facts, Reviews, Shipping).",
      },
      {
        name: "Related Products Loop",
        component: "<ProductCard /> x4",
        description: "4 related items from the same category/brand enabling continuous product-to-product navigation.",
        hasOutgoingLink: true,
        linkTarget: "/products/[relatedId], /products?category=...",
      },
    ],
    stats: {
      sectionsCount: 4,
      componentsCount: 10,
      outgoingCount: 6,
      incomingCount: 3,
    },
  },
  {
    id: "page-design",
    route: "/design",
    sampleHref: "/design",
    title: "Design System & Tokens",
    subtitle: "Interactive DESIGN.md Style Guide & Playground",
    filePath: "src/app/design/page.tsx",
    routeType: "Design Spec",
    accentColor: "#d97706",
    pastelBg: "bg-[#eee9df]",
    badgeBg: "bg-[#eee9df]",
    badgeText: "text-amber-950",
    borderColor: "border-amber-300",
    description:
      "Live interactive implementation of DESIGN.md with 27 click-to-copy color swatches, Geist Sans/Mono typography tester, component playground, and 6 dialog modal demos.",
    components: [
      "Badge",
      "QuantityStepper",
      "Tabs",
      "Dialog",
      "Breadcrumbs",
      "ProductCard",
      "ProductFilters",
      "Pagination",
      "CartToast",
    ],
    modals: [
      "Size Preset Modals (sm, md, lg, xl, 2xl)",
      "Destructive Alert Dialog",
      "Newsletter & Address Form Dialogs",
      "Quick View Demo Dialog",
    ],
    sections: [
      {
        name: "Style Guide Header & Quick Nav",
        component: "Design Header Bar",
        description: "Sticky navigation bar with shortcuts to Catalog, Product Detail, UI Flow Overview, and Back to Store.",
        hasOutgoingLink: true,
        linkTarget: "/, /products, /products/prod-1, /overview",
      },
      {
        name: "Foundations & Color Swatches",
        component: "27 Color Tokens + Type Tester",
        description: "Primary Amber, Neutral, Semantic, and Department Pastel swatches with single-click Hex copy.",
      },
      {
        name: "Interactive Component Playground",
        component: "<ProductCard /> + <ProductFilters /> + <Dialog />",
        description: "Live product card previews (linking to /products/[id]) and interactive modal showcase.",
        hasOutgoingLink: true,
        linkTarget: "/products/[id]",
      },
    ],
    stats: {
      sectionsCount: 3,
      componentsCount: 9,
      outgoingCount: 5,
      incomingCount: 4,
    },
  },
  {
    id: "page-overview",
    route: "/overview",
    sampleHref: "/overview",
    title: "UI Flow & Sitemap Overview",
    subtitle: "Interactive React Flow Architecture Canvas",
    filePath: "src/app/overview/page.tsx",
    routeType: "Flow Canvas",
    accentColor: "#ea580c",
    pastelBg: "bg-[#ffe8df]",
    badgeBg: "bg-[#ffe8df]",
    badgeText: "text-amber-950",
    borderColor: "border-amber-400",
    description:
      "Interactive React Flow visual map displaying all 5 application pages as UI Page Component nodes, shared layout/modal layers, and all 18 cross-page navigation paths.",
    components: [
      "Header",
      "Footer",
      "UIPageNode (React Flow)",
      "UIFlowEdge (React Flow)",
      "Badge",
      "CartToast",
    ],
    modals: ["Interactive Node Inspector Panel"],
    sections: [
      {
        name: "Overview Top Bar & Flow Filters",
        component: "Architecture Toolbar",
        description: "Route switcher, flow category filters (Shopping, Breadcrumb, Global Nav), and view mode toggles.",
      },
      {
        name: "Interactive React Flow Canvas",
        component: "<ReactFlow /> + <UIPageNode />",
        description: "Connected UI Page Component nodes with live wireframe previews and direct page launch buttons.",
        hasOutgoingLink: true,
        linkTarget: "/, /products, /products/prod-1, /design",
      },
      {
        name: "Route Inspector & Link Matrix",
        component: "Inspector Panel + Navigation Table",
        description: "Detailed inspection of incoming/outgoing links, component trees, and full cross-page routing matrix.",
      },
    ],
    stats: {
      sectionsCount: 3,
      componentsCount: 6,
      outgoingCount: 4,
      incomingCount: 4,
    },
  },
];

export const PAGE_FLOW_LINKS: PageLinkDetail[] = [
  // 1. From Home (/) -> Catalog (/products)
  {
    id: "link-home-to-products-hero",
    sourcePageId: "page-home",
    targetPageId: "page-products",
    triggerComponent: "<HeroBanners />",
    triggerLabel: "Shop Now / Weekend 20% Sale",
    targetHref: "/products & /products?onSale=true",
    category: "shopping",
    description:
      "Primary CTA buttons on the main hero carousel ('Shop Now', 'Discover Flavors') and the 20% SALE OFF promo card navigate to the product catalog.",
  },
  {
    id: "link-home-to-products-category",
    sourcePageId: "page-home",
    targetPageId: "page-products",
    triggerComponent: "<CategorySlider />",
    triggerLabel: "8 Category Cards (?category=)",
    targetHref: "/products?category={deptName}",
    category: "shopping",
    description:
      "Clicking any of the 8 department cards on the home page navigates to the catalog pre-filtered by that specific category.",
  },
  {
    id: "link-home-to-products-header",
    sourcePageId: "page-home",
    targetPageId: "page-products",
    triggerComponent: "<Header />",
    triggerLabel: "Search (?q=) & Shop By Category",
    targetHref: "/products?q={query}&category={cat}",
    category: "global-nav",
    description:
      "Submitting the global search bar, choosing an item in the Shop By Category mega dropdown, or clicking quick nav links (Deals Today, Special Prices, Fresh, Frozen, Drinks, Shop).",
  },

  // 2. From Catalog (/products) -> Product Detail (/products/[id])
  {
    id: "link-products-to-detail-card",
    sourcePageId: "page-products",
    targetPageId: "page-product-detail",
    triggerComponent: "<ProductCard />",
    triggerLabel: "Click Product Image / Title",
    targetHref: "/products/[id] (prod-1..24)",
    category: "shopping",
    description:
      "Clicking a product thumbnail or title inside any ProductCard (in either Grid or List view mode) navigates to its dynamic Product Detail route.",
  },

  // 3. From Catalog (/products) -> Home (/)
  {
    id: "link-products-to-home",
    sourcePageId: "page-products",
    targetPageId: "page-home",
    triggerComponent: "<Breadcrumbs /> & <Header />",
    triggerLabel: "Breadcrumb Home / Farmart Logo",
    targetHref: "/",
    category: "breadcrumb",
    description:
      "Clicking the Home icon in the breadcrumb bar or the Farmart brand logo in the header returns the user to the main storefront.",
  },

  // 4. From Catalog (/products) -> Self (/products?category=...)
  {
    id: "link-products-self-filter",
    sourcePageId: "page-products",
    targetPageId: "page-products",
    triggerComponent: "<ProductFilters /> & Dept Pills",
    triggerLabel: "Filter / Sort / Search State",
    targetHref: "/products?category=...&q=...",
    category: "self-dynamic",
    description:
      "Switching departments via the quick category pills, adjusting sidebar filters (price, brand, rating, stock), or submitting a new search query.",
  },

  // 5. From Product Detail (/products/[id]) -> Catalog (/products)
  {
    id: "link-detail-to-products-breadcrumb",
    sourcePageId: "page-product-detail",
    targetPageId: "page-products",
    triggerComponent: "<Breadcrumbs /> & Category Links",
    triggerLabel: "Catalog / Category / View All",
    targetHref: "/products & /products?category={cat}",
    category: "breadcrumb",
    description:
      "Clicking 'Catalog' or the category name in Breadcrumbs, the category badge in the Buy Box, or 'View All in {Category}' returns to the catalog.",
  },

  // 6. From Product Detail (/products/[id]) -> Home (/)
  {
    id: "link-detail-to-home",
    sourcePageId: "page-product-detail",
    targetPageId: "page-home",
    triggerComponent: "<Breadcrumbs /> & <Header />",
    triggerLabel: "Breadcrumb Home / Farmart Logo",
    targetHref: "/",
    category: "breadcrumb",
    description:
      "Clicking Home in the breadcrumb trail or the Farmart brand logo from any product detail page navigates back to the home storefront.",
  },

  // 7. From Product Detail (/products/[id]) -> Self (/products/[relatedId])
  {
    id: "link-detail-self-related",
    sourcePageId: "page-product-detail",
    targetPageId: "page-product-detail",
    triggerComponent: "Related <ProductCard />",
    triggerLabel: "You Might Also Like ([relatedId])",
    targetHref: "/products/[relatedId]",
    category: "self-dynamic",
    description:
      "Clicking any of the 4 ProductCards in the 'You Might Also Like (Related Products)' section transitions directly to another product detail page.",
  },

  // 8. Global Header & Footer -> Design System (/design)
  {
    id: "link-home-to-design",
    sourcePageId: "page-home",
    targetPageId: "page-design",
    triggerComponent: "<Header /> & <Footer />",
    triggerLabel: "Design System Pill / Footer Guide",
    targetHref: "/design",
    category: "system",
    description:
      "Clicking the amber 'Design System' pill button in the global header or the 'Design System Guide' link in the footer.",
  },
  {
    id: "link-products-to-design",
    sourcePageId: "page-products",
    targetPageId: "page-design",
    triggerComponent: "<Header /> & <Footer />",
    triggerLabel: "Design System Link",
    targetHref: "/design",
    category: "system",
    description:
      "Navigating to the Design System page from the global Header or Footer while browsing the Product Catalog.",
  },
  {
    id: "link-detail-to-design",
    sourcePageId: "page-product-detail",
    targetPageId: "page-design",
    triggerComponent: "<Header /> & <Footer />",
    triggerLabel: "Design System Link",
    targetHref: "/design",
    category: "system",
    description:
      "Navigating to the Design System page from the global Header or Footer while viewing a Product Detail page.",
  },

  // 9. From Design System (/design) -> Storefront Pages (/, /products, /products/[id], /overview)
  {
    id: "link-design-to-home",
    sourcePageId: "page-design",
    targetPageId: "page-home",
    triggerComponent: "Design Header Bar",
    triggerLabel: "Back to Store / Farmart Logo",
    targetHref: "/",
    category: "system",
    description:
      "Clicking 'Back to Store' or the Farmart logo in the Design System header returns to the main storefront.",
  },
  {
    id: "link-design-to-products",
    sourcePageId: "page-design",
    targetPageId: "page-products",
    triggerComponent: "Design Header & Hero CTA",
    triggerLabel: "Catalog / Open Product List Page",
    targetHref: "/products",
    category: "system",
    description:
      "Clicking the 'Catalog' shortcut in the Design System header or the 'Open Product List Page' CTA button in the hero section.",
  },
  {
    id: "link-design-to-detail",
    sourcePageId: "page-design",
    targetPageId: "page-product-detail",
    triggerComponent: "Design Header & Playground Card",
    triggerLabel: "Product Detail (/products/prod-1)",
    targetHref: "/products/prod-1",
    category: "system",
    description:
      "Clicking 'Product Detail' in the Design System header or clicking any live ProductCard inside the Component Playground.",
  },

  // 10. Global Links to & from UI Flow Overview (/overview)
  {
    id: "link-all-to-overview",
    sourcePageId: "page-home",
    targetPageId: "page-overview",
    triggerComponent: "<Header /> & <Footer />",
    triggerLabel: "UI Flow Overview Badge",
    targetHref: "/overview",
    category: "system",
    description:
      "Clicking the 'UI Flow' pill in the global Header or 'UI Flow Overview' in the Footer from any storefront page opens the React Flow architecture map.",
  },
  {
    id: "link-design-to-overview",
    sourcePageId: "page-design",
    targetPageId: "page-overview",
    triggerComponent: "Design Header Bar",
    triggerLabel: "UI Flow Overview Button",
    targetHref: "/overview",
    category: "system",
    description:
      "Clicking the 'UI Flow' button in the Design System top navigation bar transitions to the React Flow overview canvas.",
  },
  {
    id: "link-overview-to-pages",
    sourcePageId: "page-overview",
    targetPageId: "page-home",
    triggerComponent: "<UIPageNode /> & Inspector",
    triggerLabel: "Open Live Page Buttons",
    targetHref: "/, /products, /products/prod-1, /design",
    category: "system",
    description:
      "Clicking 'Open Page' on any UI Page Component node or inside the Page Flow Inspector navigates directly to that live route.",
  },
];
