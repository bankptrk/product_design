"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import "@xyflow/react/dist/style.css";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";
import {
  Layers,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  Compass,
  Maximize2,
  Minimize2,
  RotateCcw,
  Filter,
  LayoutGrid,
  Component,
  MessageSquare,
} from "lucide-react";

import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartToast from "@/components/CartToast";
import Breadcrumbs from "@/components/Breadcrumbs";
import Badge from "@/components/Badge";
import {
  UIPageNode,
  SharedLayerNode,
  UIFlowEdge,
  type AppFlowNode,
  type AppFlowEdge,
} from "@/components/UIPageNode";
import {
  PROJECT_PAGES,
  PAGE_FLOW_LINKS,
  type FlowCategory,
  type UIPageMetadata,
} from "@/data/uiFlowData";

const nodeTypes: NodeTypes = {
  uiPage: UIPageNode,
  sharedLayer: SharedLayerNode,
};

const edgeTypes: EdgeTypes = {
  uiFlow: UIFlowEdge,
};

/**
 * Farmart DESIGN.md compliant semantic & warm palette for flow categories
 * Avoids off-brand neon violet/cyan combinations.
 */
const CATEGORY_META: Record<
  FlowCategory | "all",
  {
    label: string;
    detailLabel: string;
    color: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
  }
> = {
  all: {
    label: "All UI Flows",
    detailLabel: "All Flows (18)",
    color: "#191c1f",
    badgeBg: "bg-gray-900",
    badgeText: "text-white",
    badgeBorder: "border-gray-900",
  },
  shopping: {
    label: "Shopping Funnel",
    detailLabel: "Shopping Funnel",
    color: "#d97706",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-950",
    badgeBorder: "border-amber-400",
  },
  breadcrumb: {
    label: "Breadcrumbs & Back",
    detailLabel: "Breadcrumbs & Return",
    color: "#0284c7",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-900",
    badgeBorder: "border-sky-300",
  },
  "global-nav": {
    label: "Global Header & Search",
    detailLabel: "Header Search & Menu",
    color: "#059669",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-900",
    badgeBorder: "border-emerald-300",
  },
  "self-dynamic": {
    label: "Dynamic & Related Loop",
    detailLabel: "Filters & Related Loop",
    color: "#10b981",
    badgeBg: "bg-[#d9ede2]",
    badgeText: "text-emerald-950",
    badgeBorder: "border-emerald-400",
  },
  system: {
    label: "Design & Architecture",
    detailLabel: "Design & Overview",
    color: "#b45309",
    badgeBg: "bg-[#eee9df]",
    badgeText: "text-amber-950",
    badgeBorder: "border-amber-400",
  },
};

function buildInitialNodes(
  selectedPageId: string,
  compact: boolean,
  showSharedNodes: boolean,
  onSelectPage: (id: string) => void
): AppFlowNode[] {
  const positions: Record<string, { x: number; y: number }> = {
    "page-home": { x: 40, y: 140 },
    "page-products": { x: 560, y: 140 },
    "page-product-detail": { x: 1080, y: 140 },
    "page-design": { x: 260, y: 860 },
    "page-overview": { x: 860, y: 860 },
  };

  const pageNodes: AppFlowNode[] = PROJECT_PAGES.map((page) => ({
    id: page.id,
    type: "uiPage",
    position: positions[page.id] || { x: 0, y: 0 },
    data: {
      page,
      isSelected: page.id === selectedPageId,
      compact,
      onSelectPage,
    },
  }));

  if (!showSharedNodes) {
    return pageNodes;
  }

  const sharedNodes: AppFlowNode[] = [
    {
      id: "shared-global-layout",
      type: "sharedLayer",
      position: { x: 280, y: -150 },
      data: {
        title: "Global Navigation & Cart Context",
        subtitle: "Shared Layout & State Across All Pages",
        badge: "GLOBAL LAYER",
        accentColor: "#fab528",
        bgClass: "bg-[#fffbeb]",
        borderClass: "border-amber-300",
        items: [
          {
            name: "<Header /> & <Footer />",
            detail: "Logo (➔ /), Search (?q= ➔ /products), Design (/design), UI Flow (/overview)",
          },
          {
            name: "<CartProvider /> & <CartToast />",
            detail: "Global cart items, wishlist state, and floating toast notifications",
          },
        ],
      },
    },
    {
      id: "shared-modals-layer",
      type: "sharedLayer",
      position: { x: 840, y: -150 },
      data: {
        title: "Interactive Dialog & Modal Overlays",
        subtitle: "In-Page Portal Overlays Powered by <Dialog />",
        badge: "MODAL OVERLAYS",
        accentColor: "#0284c7",
        bgClass: "bg-[#d8eef5]/60",
        borderClass: "border-sky-300",
        items: [
          {
            name: "Quick View & Filter Drawer (/products)",
            detail: "Instant product preview modal (2xl) and mobile filter drawer (md)",
          },
          {
            name: "Fullscreen Zoom & Review (/products/[id])",
            detail: "High-res photo zoom modal (2xl) and customer review submission (md)",
          },
        ],
      },
    },
  ];

  return [...pageNodes, ...sharedNodes];
}

function buildInitialEdges(activeCategory: FlowCategory | "all"): AppFlowEdge[] {
  const isMatch = (cat: FlowCategory) =>
    activeCategory === "all" || activeCategory === cat;

  const edges: AppFlowEdge[] = [
    // 1. Home -> Products (Primary Shopping Funnel: Hero + CategorySlider)
    {
      id: "e-home-products-shopping",
      source: "page-home",
      target: "page-products",
      sourceHandle: "right-source",
      targetHandle: "left-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#d97706", width: 18, height: 18 },
      data: {
        label: "Hero CTA & 8 Category Cards",
        subLabel: "/products?category=...",
        category: "shopping",
        color: "#d97706",
        badgeBg: "bg-amber-100",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("shopping"),
        curvature: 0.18,
      },
    },
    // 2. Home -> Products (Header Search & Mega Menu)
    {
      id: "e-home-products-search",
      source: "page-home",
      target: "page-products",
      sourceHandle: "top-source",
      targetHandle: "top-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#059669", width: 18, height: 18 },
      data: {
        label: "Header Search & Category Menu",
        subLabel: "?q= & ?onSale=true",
        category: "global-nav",
        color: "#059669",
        badgeBg: "bg-emerald-50",
        badgeText: "text-emerald-900",
        badgeBorder: "border-emerald-400",
        isHighlighted: isMatch("global-nav"),
        curvature: 0.35,
      },
    },
    // 3. Products -> Home (Breadcrumbs & Logo)
    {
      id: "e-products-home-back",
      source: "page-products",
      target: "page-home",
      sourceHandle: "left-source",
      targetHandle: "right-target",
      type: "uiFlow",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#0284c7", width: 18, height: 18 },
      data: {
        label: "Breadcrumbs Home / Logo",
        subLabel: "➔ /",
        category: "breadcrumb",
        color: "#0284c7",
        badgeBg: "bg-sky-50",
        badgeText: "text-sky-900",
        badgeBorder: "border-sky-300",
        isHighlighted: isMatch("breadcrumb"),
        curvature: 0.25,
      },
    },
    // 4. Products -> Product Detail (Click ProductCard)
    {
      id: "e-products-detail-card",
      source: "page-products",
      target: "page-product-detail",
      sourceHandle: "right-source",
      targetHandle: "left-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#d97706", width: 18, height: 18 },
      data: {
        label: "Click ProductCard (Grid / List)",
        subLabel: "/products/[id]",
        category: "shopping",
        color: "#d97706",
        badgeBg: "bg-amber-100",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("shopping"),
        curvature: 0.18,
      },
    },
    // 5. Product Detail -> Products (Breadcrumbs Catalog / Category / View All)
    {
      id: "e-detail-products-back",
      source: "page-product-detail",
      target: "page-products",
      sourceHandle: "left-source",
      targetHandle: "right-target",
      type: "uiFlow",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#0284c7", width: 18, height: 18 },
      data: {
        label: "Breadcrumbs / Category Badge / View All",
        subLabel: "/products?category=...",
        category: "breadcrumb",
        color: "#0284c7",
        badgeBg: "bg-sky-50",
        badgeText: "text-sky-900",
        badgeBorder: "border-sky-300",
        isHighlighted: isMatch("breadcrumb"),
        curvature: 0.25,
      },
    },
    // 6. Product Detail -> Home (Breadcrumb Home / Header Logo)
    {
      id: "e-detail-home-breadcrumb",
      source: "page-product-detail",
      target: "page-home",
      sourceHandle: "top-source",
      targetHandle: "top-target",
      type: "uiFlow",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#0284c7", width: 18, height: 18 },
      data: {
        label: "Breadcrumb Home / Farmart Logo",
        subLabel: "➔ /",
        category: "breadcrumb",
        color: "#0284c7",
        badgeBg: "bg-sky-50",
        badgeText: "text-sky-900",
        badgeBorder: "border-sky-300",
        isHighlighted: isMatch("breadcrumb"),
        curvature: 0.4,
      },
    },
    // 7. Product Detail -> Product Detail (Related Products Loop)
    {
      id: "e-detail-related-self",
      source: "page-product-detail",
      target: "page-product-detail",
      sourceHandle: "right-source",
      targetHandle: "bottom-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#059669", width: 18, height: 18 },
      data: {
        label: "Related Products Loop",
        subLabel: "/products/[relatedId]",
        category: "self-dynamic",
        color: "#059669",
        badgeBg: "bg-[#d9ede2]",
        badgeText: "text-emerald-950",
        badgeBorder: "border-emerald-400",
        isHighlighted: isMatch("self-dynamic"),
        curvature: 0.6,
      },
    },
    // 8. Storefront (Home / Header / Footer) <-> Design System (/design)
    {
      id: "e-home-design",
      source: "page-home",
      target: "page-design",
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#b45309", width: 18, height: 18 },
      data: {
        label: "Header Pill & Footer Link ⇄ Back to Store",
        subLabel: "/ ⇄ /design",
        category: "system",
        color: "#b45309",
        badgeBg: "bg-[#eee9df]",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("system"),
        curvature: 0.2,
      },
    },
    // 9. Design System (/design) <-> Catalog (/products)
    {
      id: "e-design-products",
      source: "page-design",
      target: "page-products",
      sourceHandle: "top-source",
      targetHandle: "bottom-target",
      type: "uiFlow",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#b45309", width: 18, height: 18 },
      data: {
        label: "Catalog Button & Hero CTA",
        subLabel: "/design ⇄ /products",
        category: "system",
        color: "#b45309",
        badgeBg: "bg-[#eee9df]",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("system"),
        curvature: 0.2,
      },
    },
    // 10. Design System (/design) -> Product Detail (/products/prod-1)
    {
      id: "e-design-detail",
      source: "page-design",
      target: "page-product-detail",
      sourceHandle: "right-source",
      targetHandle: "bottom-target",
      type: "uiFlow",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#b45309", width: 18, height: 18 },
      data: {
        label: "Header Button & Playground ProductCard",
        subLabel: "➔ /products/prod-1",
        category: "system",
        color: "#b45309",
        badgeBg: "bg-[#eee9df]",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("system"),
        curvature: 0.25,
      },
    },
    // 11. Design System (/design) <-> UI Flow Overview (/overview)
    {
      id: "e-design-overview",
      source: "page-design",
      target: "page-overview",
      sourceHandle: "right-source",
      targetHandle: "left-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#ea580c", width: 18, height: 18 },
      data: {
        label: "Design System ⇄ UI Flow Canvas",
        subLabel: "/design ⇄ /overview",
        category: "system",
        color: "#ea580c",
        badgeBg: "bg-[#ffe8df]",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("system"),
        curvature: 0.15,
      },
    },
    // 12. Storefront Pages <-> UI Flow Overview (/overview)
    {
      id: "e-products-overview",
      source: "page-products",
      target: "page-overview",
      sourceHandle: "bottom-source",
      targetHandle: "top-target",
      type: "uiFlow",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#ea580c", width: 18, height: 18 },
      data: {
        label: "Global Header 'UI Flow' & Live Node Launchers",
        subLabel: "All Pages ⇄ /overview",
        category: "system",
        color: "#ea580c",
        badgeBg: "bg-[#ffe8df]",
        badgeText: "text-amber-950",
        badgeBorder: "border-amber-400",
        isHighlighted: isMatch("system"),
        curvature: 0.2,
      },
    },
  ];

  return edges;
}

function OverviewPageContent() {
  const [selectedPageId, setSelectedPageId] = useState<string>("page-home");
  const [activeCategory, setActiveCategory] = useState<FlowCategory | "all">("all");
  const [compactNodes, setCompactNodes] = useState<boolean>(false);
  const [showSharedNodes, setShowSharedNodes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [tableFilterPage, setTableFilterPage] = useState<string>("all");

  const handleSelectPage = useCallback((pageId: string) => {
    setSelectedPageId(pageId);
  }, []);

  const initialNodes = useMemo(
    () =>
      buildInitialNodes(
        selectedPageId,
        compactNodes,
        showSharedNodes,
        handleSelectPage
      ),
    [selectedPageId, compactNodes, showSharedNodes, handleSelectPage]
  );

  const initialEdges = useMemo(
    () => buildInitialEdges(activeCategory),
    [activeCategory]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync nodes & edges when filter or view toggles change
  React.useEffect(() => {
    setNodes((prevNodes) => {
      const posMap = new Map(prevNodes.map((n) => [n.id, n.position]));
      return buildInitialNodes(
        selectedPageId,
        compactNodes,
        showSharedNodes,
        handleSelectPage
      ).map((n) => ({
        ...n,
        position: posMap.get(n.id) || n.position,
      }));
    });
  }, [selectedPageId, compactNodes, showSharedNodes, handleSelectPage, setNodes]);

  React.useEffect(() => {
    setEdges(buildInitialEdges(activeCategory));
  }, [activeCategory, setEdges]);

  const handleResetLayout = () => {
    setNodes(
      buildInitialNodes(
        selectedPageId,
        compactNodes,
        showSharedNodes,
        handleSelectPage
      )
    );
    setEdges(buildInitialEdges(activeCategory));
  };

  const selectedPage: UIPageMetadata = useMemo(
    () =>
      PROJECT_PAGES.find((p) => p.id === selectedPageId) || PROJECT_PAGES[0],
    [selectedPageId]
  );

  const incomingLinks = useMemo(
    () =>
      PAGE_FLOW_LINKS.filter((link) => link.targetPageId === selectedPage.id),
    [selectedPage]
  );

  const outgoingLinks = useMemo(
    () =>
      PAGE_FLOW_LINKS.filter((link) => link.sourcePageId === selectedPage.id),
    [selectedPage]
  );

  const filteredTableLinks = useMemo(() => {
    return PAGE_FLOW_LINKS.filter((link) => {
      const matchesCat =
        activeCategory === "all" || link.category === activeCategory;
      const matchesPage =
        tableFilterPage === "all" ||
        link.sourcePageId === tableFilterPage ||
        link.targetPageId === tableFilterPage;
      return matchesCat && matchesPage;
    });
  }, [activeCategory, tableFilterPage]);

  const getPageById = (id: string) =>
    PROJECT_PAGES.find((p) => p.id === id) || PROJECT_PAGES[0];

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      <Header />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-5 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "UI Flow & Sitemap Overview (/overview)" },
          ]}
        />

        {/* Operate-Mode Workspace Header & Route Switcher (Farmart Light/Amber Surface) */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="max-w-3xl space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                UI Page Flow &amp; Application Navigation Map
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed max-w-[72ch]">
                Interactive React Flow architecture map across all{" "}
                <strong className="font-semibold text-gray-900 tabular-nums">
                  {PROJECT_PAGES.length} routes
                </strong>{" "}
                and{" "}
                <strong className="font-semibold text-gray-900 tabular-nums">
                  {PAGE_FLOW_LINKS.length} navigation paths
                </strong>
                . Select any UI Page Component node to inspect its incoming/outgoing triggers or launch the live route.
              </p>
            </div>

            {/* Canvas View Mode Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCompactNodes((prev) => !prev)}
                className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  !compactNodes
                    ? "bg-amber-50 border-amber-300 text-amber-900"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-amber-600" />
                <span>{compactNodes ? "Full UI Wireframes" : "Compact Nodes"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSharedNodes((prev) => !prev)}
                className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  showSharedNodes
                    ? "bg-sky-50 border-sky-300 text-sky-900"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>Shared Header &amp; Modals</span>
              </button>

              <button
                type="button"
                onClick={handleResetLayout}
                className="min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-colors cursor-pointer flex items-center gap-1.5"
                title="Reset Node Positions"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
                <span>Reset Layout</span>
              </button>
            </div>
          </div>

          {/* Route Switcher Tabs + Flow Category Filter Row */}
          <div className="pt-4 border-t border-gray-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* 5 Route Focus Pills */}
            <div
              role="tablist"
              aria-label="Application routes"
              className="flex flex-wrap items-center gap-2"
            >
              {PROJECT_PAGES.map((page) => {
                const isSelected = page.id === selectedPageId;
                return (
                  <button
                    key={page.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedPageId(page.id)}
                    className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-[#fab528] text-gray-900 border-amber-500 shadow-xs font-bold"
                        : "bg-gray-50/80 hover:bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-gray-900 text-[#fab528]"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      {page.route}
                    </span>
                    <span className="text-xs font-bold">{page.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Flow Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>Flow:</span>
              </span>
              {(
                [
                  "all",
                  "shopping",
                  "breadcrumb",
                  "global-nav",
                  "self-dynamic",
                  "system",
                ] as const
              ).map((cat) => {
                const meta = CATEGORY_META[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isActive
                        ? "bg-gray-900 text-white border-gray-900 shadow-2xs"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span>{meta.detailLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Workspace: React Flow Canvas + Page Inspector Sidebar */}
        <section
          className={`grid grid-cols-1 ${
            isFullscreen ? "" : "xl:grid-cols-12"
          } gap-6 items-start`}
        >
          {/* Left/Main Column: React Flow Interactive Canvas */}
          <div
            className={`${
              isFullscreen
                ? "fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl border-2 border-gray-900 flex flex-col"
                : "xl:col-span-8 bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col h-[740px]"
            }`}
          >
            {/* Canvas Top Status Bar */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-extrabold text-gray-900">
                  React Flow UI Page Canvas
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  • Drag nodes, pan/zoom the canvas, or select any page node to inspect its links
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen((prev) => !prev)}
                className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Fullscreen</span>
                  </>
                )}
              </button>
            </div>

            {/* React Flow Instance */}
            <div className="flex-1 w-full relative">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodeClick={(_, node) => {
                  if (node.type === "uiPage") {
                    setSelectedPageId(node.id);
                  }
                }}
                fitView
                fitViewOptions={{ padding: 0.16 }}
                minZoom={0.25}
                maxZoom={1.6}
                proOptions={{ hideAttribution: true }}
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={1.4}
                  color="#cbd5e1"
                />
                <Controls
                  position="bottom-left"
                  className="!bg-white !border !border-gray-200 !rounded-xl !shadow-md overflow-hidden"
                />
                <MiniMap
                  position="bottom-right"
                  pannable
                  zoomable
                  nodeColor={(node) => {
                    if (node.id === "page-home") return "#fab528";
                    if (node.id === "page-products") return "#10b981";
                    if (node.id === "page-product-detail") return "#0284c7";
                    if (node.id === "page-design") return "#d97706";
                    if (node.id === "page-overview") return "#ea580c";
                    return "#94a3b8";
                  }}
                  className="!bg-white/95 !border !border-gray-200 !rounded-xl !shadow-md"
                />

                {/* Floating Legend Panel inside Canvas */}
                <Panel
                  position="top-left"
                  className="bg-white/95 backdrop-blur-xs border border-gray-200/90 rounded-xl p-3 shadow-sm max-w-xs hidden sm:block"
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-600 mb-2">
                    Navigation Edge Legend
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-bold text-gray-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1.5 rounded-full bg-amber-600 inline-block" />
                      <span>Shopping Funnel</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1.5 rounded-full bg-sky-600 inline-block" />
                      <span>Breadcrumbs / Back</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1.5 rounded-full bg-emerald-600 inline-block" />
                      <span>Header &amp; Related Loop</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-1.5 rounded-full bg-amber-800 inline-block" />
                      <span>Design &amp; Overview</span>
                    </div>
                  </div>
                </Panel>
              </ReactFlow>
            </div>
          </div>

          {/* Right Column: Live Selected Page Inspector Panel */}
          {!isFullscreen && (
            <aside
              aria-label="Selected page flow inspector"
              className="xl:col-span-4 bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col"
            >
              {/* Inspector Header (Warm Amber Pastel Surface per DESIGN.md) */}
              <div className={`${selectedPage.pastelBg} border-b border-gray-200 p-5 space-y-3`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-black bg-gray-900 text-[#fab528] px-2.5 py-0.5 rounded-md">
                      {selectedPage.route}
                    </span>
                    <Badge variant="brand">{selectedPage.routeType}</Badge>
                  </div>
                  <span className="font-mono text-xs font-semibold text-gray-700">
                    {selectedPage.filePath}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">
                      {selectedPage.title}
                    </h2>
                    <p className="text-xs text-gray-700 font-semibold">
                      {selectedPage.subtitle}
                    </p>
                  </div>

                  <Link
                    href={selectedPage.sampleHref}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs transition-all shrink-0 shadow-xs"
                  >
                    <span>Visit Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed pt-2 border-t border-black/10">
                  {selectedPage.description}
                </p>
              </div>

              {/* Inspector Content */}
              <div className="p-5 space-y-6 max-h-[590px] overflow-y-auto">
                {/* 1. Outgoing Links from this Page */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ArrowUpRight className="w-4 h-4 text-amber-600" />
                      <span>Outgoing Links (From This Page)</span>
                    </span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full text-[11px] tabular-nums">
                      {outgoingLinks.length} Paths
                    </span>
                  </h3>

                  <div className="space-y-2">
                    {outgoingLinks.map((link) => {
                      const targetPage = getPageById(link.targetPageId);
                      return (
                        <div
                          key={link.id}
                          className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1.5 hover:border-amber-400 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-gray-900 flex items-center gap-1">
                              <span className="font-mono text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                                {link.triggerComponent}
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedPageId(targetPage.id)}
                              className="inline-flex items-center gap-1 font-mono text-xs font-black text-gray-900 bg-white hover:bg-[#fab528] px-2.5 py-1 rounded-md border border-amber-300 transition-colors cursor-pointer"
                            >
                              <span>➔ {targetPage.route}</span>
                            </button>
                          </div>
                          <p className="text-xs font-bold text-gray-900">
                            {link.triggerLabel}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {link.description}
                          </p>
                          <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-gray-600">
                            <span>URL: {link.targetHref}</span>
                            <Link
                              href={targetPage.sampleHref}
                              className="text-amber-800 hover:underline font-sans font-bold flex items-center gap-1"
                            >
                              <span>Test Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Incoming Links to this Page */}
                <div className="space-y-2.5 pt-3 border-t border-gray-100">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                      <span>Incoming Links (To This Page)</span>
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full text-[11px] tabular-nums">
                      {incomingLinks.length} Paths
                    </span>
                  </h3>

                  <div className="space-y-2">
                    {incomingLinks.map((link) => {
                      const sourcePage = getPageById(link.sourcePageId);
                      return (
                        <div
                          key={link.id}
                          className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-200/70 space-y-1 hover:border-emerald-400 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedPageId(sourcePage.id)}
                              className="inline-flex items-center gap-1 font-mono text-xs font-black text-emerald-950 bg-white hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 transition-colors cursor-pointer"
                            >
                              <span>From {sourcePage.route}</span>
                            </button>
                            <span className="font-mono text-[11px] font-semibold text-gray-600">
                              via {link.triggerComponent}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-gray-900">
                            {link.triggerLabel}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {link.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Components & Modals inside this Page */}
                <div className="space-y-2.5 pt-3 border-t border-gray-100">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                    <Component className="w-4 h-4 text-amber-600" />
                    <span>UI Components Used ({selectedPage.components.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPage.components.map((comp) => (
                      <span
                        key={comp}
                        className="text-[11px] font-mono font-bold bg-gray-100 text-gray-800 px-2.5 py-1 rounded-lg border border-gray-200"
                      >
                        &lt;{comp} /&gt;
                      </span>
                    ))}
                  </div>

                  {selectedPage.modals.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-xs font-bold text-gray-600 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                        <span>Interactive Modals / Overlays:</span>
                      </span>
                      <div className="space-y-1">
                        {selectedPage.modals.map((m) => (
                          <div
                            key={m}
                            className="text-xs font-semibold text-sky-950 bg-sky-50 border border-sky-200/80 px-2.5 py-1.5 rounded-lg"
                          >
                            • {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          )}
        </section>

        {/* Complete Cross-Page Navigation Matrix Table */}
        <section className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight tabular-nums">
              Cross-Page Routing &amp; Link Reference ({filteredTableLinks.length} Paths)
            </h2>

            {/* Filter by Page Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="filter-by-page-select"
                className="text-xs font-bold text-gray-600"
              >
                Filter by Page:
              </label>
              <select
                id="filter-by-page-select"
                value={tableFilterPage}
                onChange={(e) => setTableFilterPage(e.target.value)}
                className="min-h-[40px] bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All Pages (5 Routes)</option>
                {PROJECT_PAGES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.route} — {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Source Page (From)</th>
                  <th className="py-3.5 px-4">Trigger Component &amp; Action</th>
                  <th className="py-3.5 px-4">Target Route (To)</th>
                  <th className="py-3.5 px-4">Flow Category</th>
                  <th className="py-3.5 px-4">Navigation Behavior</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTableLinks.map((link) => {
                  const sourcePage = getPageById(link.sourcePageId);
                  const targetPage = getPageById(link.targetPageId);
                  const catMeta = CATEGORY_META[link.category];

                  return (
                    <tr
                      key={link.id}
                      onClick={() => setSelectedPageId(sourcePage.id)}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                            {sourcePage.route}
                          </span>
                          <span className="font-bold text-gray-800">
                            {sourcePage.title}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit">
                          {link.triggerComponent}
                        </span>
                        <span className="text-gray-800 font-semibold block mt-0.5">
                          {link.triggerLabel}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-mono font-black text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {targetPage.route}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-gray-500 block mt-0.5">
                          {link.targetHref}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${catMeta.badgeBg} ${catMeta.badgeText} ${catMeta.badgeBorder}`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: catMeta.color }}
                          />
                          {catMeta.label}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 max-w-sm leading-relaxed">
                        {link.description}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          href={targetPage.sampleHref}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-xs transition-colors shadow-2xs"
                        >
                          <span>Open Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
      <CartToast />
    </div>
  );
}

export default function OverviewPage() {
  return (
    <CartProvider>
      <OverviewPageContent />
    </CartProvider>
  );
}
