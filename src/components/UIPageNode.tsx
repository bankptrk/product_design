"use client";

import React from "react";
import Link from "next/link";
import {
  Handle,
  Position,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
} from "@xyflow/react";
import {
  ExternalLink,
  FileCode2,
  Layers,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
  ShoppingBag,
  Search,
  Home,
  Palette,
  GitBranch,
  Eye,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { UIPageMetadata, FlowCategory } from "@/data/uiFlowData";

export type UIPageNodeData = {
  page: UIPageMetadata;
  isSelected?: boolean;
  compact?: boolean;
  onSelectPage?: (pageId: string) => void;
} & Record<string, unknown>;

export type SharedLayerNodeData = {
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  bgClass: string;
  borderClass: string;
  items: { name: string; detail: string }[];
} & Record<string, unknown>;

export type UIFlowEdgeData = {
  label: string;
  subLabel?: string;
  category: FlowCategory;
  color: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  isHighlighted?: boolean;
  curvature?: number;
} & Record<string, unknown>;

export type AppFlowNode =
  | Node<UIPageNodeData, "uiPage">
  | Node<SharedLayerNodeData, "sharedLayer">;

export type AppFlowEdge = Edge<UIFlowEdgeData, "uiFlow">;

/**
 * Miniature Visual UI Wireframe Preview for each page route
 */
function MiniPageWireframe({ route }: { route: string }) {
  if (route === "/") {
    return (
      <div
        aria-hidden="true"
        className="bg-[#f7f8fa] rounded-xl p-2.5 border border-gray-200/80 space-y-2 select-none"
      >
        {/* Mini Header */}
        <div className="bg-white rounded-md px-2 py-1 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#fab528] inline-block" />
            <span className="text-[10px] font-black text-gray-800">Farmart</span>
          </div>
          <div className="flex-1 mx-2 h-3 bg-gray-100 rounded-xs flex items-center px-1">
            <Search className="w-2.5 h-2.5 text-gray-400" />
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>
        {/* Mini Hero 8+4 cols */}
        <div className="grid grid-cols-12 gap-1.5">
          <div className="col-span-8 bg-[#d9ede2] rounded-lg p-2 border border-emerald-200/60 flex flex-col justify-between h-14">
            <span className="text-[9px] font-extrabold text-emerald-950 bg-white/80 px-1.5 py-0.2 rounded w-fit">
              ACTIVE SUMMER
            </span>
            <span className="text-[10px] font-bold bg-white text-gray-900 px-1.5 py-0.5 rounded shadow-2xs w-fit">
              Shop Now ➔ /products
            </span>
          </div>
          <div className="col-span-4 bg-[#fab528] rounded-lg p-1.5 flex flex-col justify-between h-14">
            <span className="text-[9px] font-black text-gray-900">20% SALE</span>
            <span className="text-[9px] font-bold bg-white text-gray-900 px-1 py-0.5 rounded w-fit">
              ?onSale
            </span>
          </div>
        </div>
        {/* Mini Category Slider (8 circles) */}
        <div className="grid grid-cols-8 gap-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`bg-white rounded-md p-1 border flex flex-col items-center ${
                i === 1 ? "border-amber-400 ring-1 ring-amber-300" : "border-gray-100"
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-amber-100" />
              <div className="w-4 h-1 bg-gray-300 rounded-full mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (route === "/products") {
    return (
      <div
        aria-hidden="true"
        className="bg-[#f7f8fa] rounded-xl p-2.5 border border-gray-200/80 space-y-2 select-none"
      >
        {/* Mini Breadcrumb & Pastel Dept Hero */}
        <div className="flex items-center gap-1 text-[10px] text-gray-600">
          <Home className="w-2.5 h-2.5 text-amber-600" />
          <span>Home</span>
          <span>›</span>
          <span className="font-bold text-gray-900">Products</span>
          <span className="ml-auto text-[9px] bg-emerald-100 text-emerald-900 px-1.5 rounded font-mono font-bold">
            ?category &amp; ?q
          </span>
        </div>
        <div className="bg-[#ffe8df] border border-[#ffd5c4] rounded-lg p-2 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-900 block">
              All Grocery Products (24)
            </span>
            <div className="flex gap-1 mt-1">
              {["All", "Fruits", "Seafood"].map((c, idx) => (
                <span
                  key={c}
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    idx === 0 ? "bg-gray-900 text-white" : "bg-white/90 text-gray-800"
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-800" />
        </div>
        {/* Sidebar + 3 Product Cards */}
        <div className="grid grid-cols-12 gap-1.5">
          <div className="col-span-3 bg-white rounded-md p-1.5 border border-gray-100 space-y-1">
            <div className="text-[9px] font-bold text-gray-800">Filters</div>
            <div className="h-1 w-full bg-amber-400 rounded-full" />
          </div>
          <div className="col-span-9 grid grid-cols-3 gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-md p-1.5 border border-gray-100 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[8px] bg-red-500 text-white px-1 rounded-xs font-bold">
                    -20%
                  </span>
                  <Eye className="w-2.5 h-2.5 text-gray-400" />
                </div>
                <div className="h-5 bg-gray-50 rounded-xs my-1 flex items-center justify-center text-[9px] font-bold text-sky-800">
                  ➔ /[id]
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (route === "/products/[id]") {
    return (
      <div
        aria-hidden="true"
        className="bg-[#f7f8fa] rounded-xl p-2.5 border border-gray-200/80 space-y-2 select-none"
      >
        {/* Mini Breadcrumbs */}
        <div className="flex items-center gap-1 text-[10px] text-gray-600 bg-white px-2 py-1 rounded border border-gray-100">
          <span>Home</span>
          <span>›</span>
          <span className="text-sky-700 font-semibold">Catalog</span>
          <span>›</span>
          <span className="font-bold text-gray-900 truncate">Strawberries</span>
        </div>
        {/* 2-Col Gallery + Buy Box */}
        <div className="bg-white rounded-lg p-2 border border-gray-100 grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="h-12 bg-[#ffe8df]/60 border border-[#ffe8df] rounded-md flex items-center justify-center text-[9px] font-bold text-amber-950">
              4-Angle Gallery
            </div>
          </div>
          <div className="col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] bg-amber-50 text-amber-900 px-1 rounded border border-amber-200 font-bold">
                Category
              </span>
              <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1 rounded font-bold">
                In Stock
              </span>
            </div>
            <div className="flex items-center gap-1 text-amber-400 my-0.5">
              <Star className="w-2.5 h-2.5 fill-amber-400" />
              <span className="text-[10px] font-mono font-black text-amber-700">$8.50</span>
            </div>
            <div className="bg-[#fab528] rounded py-0.5 text-[9px] font-bold text-gray-900 text-center">
              Add to Cart
            </div>
          </div>
        </div>
        {/* Related Products Loop */}
        <div className="bg-white rounded-md p-1.5 border border-gray-100 flex items-center justify-between">
          <span className="text-[9px] font-bold text-gray-800">
            Related Products (4)
          </span>
          <span className="text-[9px] font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200">
            Loop ➔ /[relatedId]
          </span>
        </div>
      </div>
    );
  }

  if (route === "/design") {
    return (
      <div
        aria-hidden="true"
        className="bg-[#f7f8fa] rounded-xl p-2.5 border border-gray-200/80 space-y-2 select-none"
      >
        {/* Mini Style Guide Header */}
        <div className="bg-white rounded-md px-2 py-1 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Palette className="w-3 h-3 text-amber-600" />
            <span className="text-[9px] font-black text-gray-900">DESIGN.MD SPEC</span>
          </div>
          <div className="flex gap-1">
            <span className="text-[8px] bg-gray-100 text-gray-800 px-1 rounded font-semibold">
              Catalog
            </span>
            <span className="text-[8px] bg-[#fab528] text-gray-900 px-1 rounded font-bold">
              Store
            </span>
          </div>
        </div>
        {/* Color Swatches Row */}
        <div className="grid grid-cols-6 gap-1">
          {[
            "bg-[#fab528]",
            "bg-[#191c1f]",
            "bg-emerald-500",
            "bg-red-500",
            "bg-[#eee9df]",
            "bg-[#d8eef5]",
          ].map((cls, i) => (
            <div key={i} className="bg-white p-0.5 rounded border border-gray-100">
              <div className={`h-4 rounded-xs ${cls}`} />
            </div>
          ))}
        </div>
        {/* Interactive Playground Preview */}
        <div className="bg-white rounded-md p-1.5 border border-gray-100 flex items-center justify-between">
          <span className="text-[9px] font-bold text-gray-800">
            Component &amp; Dialog Playground
          </span>
          <span className="text-[9px] font-mono text-amber-800 font-bold">
            sm..2xl
          </span>
        </div>
      </div>
    );
  }

  // Default: /overview wireframe
  return (
    <div
      aria-hidden="true"
      className="bg-[#f7f8fa] rounded-xl p-2.5 border border-gray-200/80 space-y-2 select-none"
    >
      <div className="bg-white rounded-md px-2 py-1 border border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <GitBranch className="w-3 h-3 text-amber-600" />
          <span className="text-[9px] font-black text-gray-900">REACT FLOW MAP</span>
        </div>
        <span className="text-[9px] bg-amber-100 text-amber-900 px-1.5 rounded font-bold">
          5 Routes • 18 Links
        </span>
      </div>
      <div className="bg-white rounded-lg p-2 border border-gray-100 flex items-center justify-around">
        <div className="px-2 py-1 rounded border-2 border-amber-400 bg-amber-50 text-[9px] font-bold text-gray-900">
          /
        </div>
        <span className="text-xs text-amber-600 font-bold">⇄</span>
        <div className="px-2 py-1 rounded border-2 border-emerald-400 bg-emerald-50 text-[9px] font-bold text-gray-900">
          /products
        </div>
        <span className="text-xs text-sky-600 font-bold">⇄</span>
        <div className="px-2 py-1 rounded border-2 border-sky-400 bg-sky-50 text-[9px] font-bold text-gray-900">
          /[id]
        </div>
      </div>
    </div>
  );
}

/**
 * Custom React Flow Node representing a full UI Page Component
 */
export function UIPageNode({ data, selected }: NodeProps<Node<UIPageNodeData, "uiPage">>) {
  const { page, isSelected, compact, onSelectPage } = data;
  const active = Boolean(selected || isSelected);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectPage?.(page.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-label={`Inspect ${page.title} (${page.route})`}
      onClick={() => onSelectPage?.(page.id)}
      onKeyDown={handleKeyDown}
      className={`w-[360px] rounded-2xl bg-white transition-all duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#fab528] ${
        active
          ? "ring-4 ring-amber-400/50 border-2 border-gray-900 shadow-xl"
          : "border-2 border-gray-200/90 hover:border-amber-400 shadow-md hover:shadow-lg"
      }`}
    >
      {/* Top Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className="!w-3 !h-3 !bg-gray-900 !border-2 !border-white"
        style={{ left: "38%" }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        className="!w-3 !h-3 !bg-[#fab528] !border-2 !border-white"
        style={{ left: "62%" }}
      />

      {/* Left Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        className="!w-3 !h-3 !bg-gray-900 !border-2 !border-white"
        style={{ top: "38%" }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className="!w-3 !h-3 !bg-[#fab528] !border-2 !border-white"
        style={{ top: "62%" }}
      />

      {/* Right Handles */}
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        className="!w-3 !h-3 !bg-gray-900 !border-2 !border-white"
        style={{ top: "38%" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className="!w-3 !h-3 !bg-[#fab528] !border-2 !border-white"
        style={{ top: "62%" }}
      />

      {/* Bottom Handles */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        className="!w-3 !h-3 !bg-gray-900 !border-2 !border-white"
        style={{ left: "38%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="!w-3 !h-3 !bg-[#fab528] !border-2 !border-white"
        style={{ left: "62%" }}
      />

      {/* Browser Chrome Top Bar */}
      <div className="bg-gray-900 text-white px-3.5 py-2.5 rounded-t-[14px] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
        </div>

        {/* Route URL Bar */}
        <div className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1 flex items-center justify-between gap-1.5 min-w-0">
          <span className="font-mono text-xs font-bold text-amber-400 truncate">
            {page.route}
          </span>
          <span
            className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${page.badgeBg} ${page.badgeText}`}
          >
            {page.routeType}
          </span>
        </div>

        {/* Direct Visit Link */}
        <Link
          href={page.sampleHref}
          onClick={(e) => e.stopPropagation()}
          className="nodrag nopan inline-flex items-center gap-1 bg-[#fab528] hover:bg-[#e59d12] text-gray-900 font-bold text-[11px] px-2.5 py-1 rounded-md transition-colors shrink-0 shadow-2xs"
          title={`Open ${page.sampleHref}`}
        >
          <span>Open</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Card Body */}
      <div className="p-4 space-y-3">
        {/* Page Header Info */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 tracking-tight leading-snug">
              {page.title}
            </h3>
            <p className="text-xs font-semibold text-amber-800">{page.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200 shrink-0">
            <FileCode2 className="w-3 h-3 text-gray-500" />
            {page.filePath.replace("src/app/", "")}
          </span>
        </div>

        {/* Query Params / Dynamic Params Pills */}
        {page.queryParams && page.queryParams.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {page.queryParams.map((qp) => (
              <span
                key={qp}
                className="text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-md"
              >
                {qp}
              </span>
            ))}
          </div>
        )}

        {/* Miniature Visual UI Wireframe Preview */}
        {!compact && <MiniPageWireframe route={page.route} />}

        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {page.description}
        </p>

        {/* UI Page Sections & Outgoing Link Triggers */}
        {!compact && (
          <div className="space-y-1.5 pt-1 border-t border-gray-100">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-gray-500">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-600" />
                UI Sections &amp; Link Triggers
              </span>
              <span className="tabular-nums">{page.sections.length} Blocks</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto pr-0.5">
              {page.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50/90 hover:bg-amber-50/60 border border-gray-200/70 rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-2 text-[11px] transition-colors"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-gray-800 block truncate">
                      {sec.name}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500 block truncate">
                      {sec.component}
                    </span>
                  </div>
                  {sec.hasOutgoingLink && sec.linkTarget && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold bg-white text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded shrink-0 shadow-2xs">
                      <ArrowUpRight className="w-2.5 h-2.5 text-amber-700" />
                      {sec.linkTarget.split(",")[0]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Stats: Incoming & Outgoing Link Counters */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] tabular-nums">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <ArrowDownLeft className="w-3 h-3" />
              {page.stats.incomingCount} Incoming
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-100/80 border border-amber-300 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              {page.stats.outgoingCount} Outgoing
            </span>
          </div>

          <span className="text-[11px] font-bold text-gray-500">
            {page.components.length} Components
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Custom React Flow Node representing Shared Global Navigation / Context / Dialog Overlays
 */
export function SharedLayerNode({
  data,
}: NodeProps<Node<SharedLayerNodeData, "sharedLayer">>) {
  return (
    <div
      className={`w-[290px] rounded-2xl ${data.bgClass} border-2 ${data.borderClass} p-4 shadow-md select-none space-y-2.5`}
    >
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-white"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className="!w-2.5 !h-2.5 !bg-gray-800 !border-2 !border-white"
      />

      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-gray-900 border border-black/10 shadow-2xs">
          {data.badge}
        </span>
        <Sparkles className="w-4 h-4 text-amber-600" />
      </div>

      <div>
        <h4 className="text-sm font-black text-gray-900">{data.title}</h4>
        <p className="text-[11px] font-semibold text-gray-700">{data.subtitle}</p>
      </div>

      <div className="space-y-1.5 pt-1">
        {data.items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/95 rounded-lg px-2.5 py-1.5 border border-black/5 text-[11px]"
          >
            <span className="font-bold text-gray-900 block">{item.name}</span>
            <span className="text-[10px] text-gray-600 block">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Custom React Flow Edge with Interactive Pill Label
 */
export function UIFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps<Edge<UIFlowEdgeData, "uiFlow">>) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: data?.curvature ?? 0.25,
  });

  const isHighlighted = data?.isHighlighted ?? true;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: isHighlighted ? 2.75 : 1.5,
          stroke: data?.color || "#fab528",
          opacity: isHighlighted ? 1 : 0.25,
          transition: "stroke-width 0.2s, opacity 0.2s",
        }}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
              opacity: isHighlighted ? 1 : 0.3,
            }}
            className="nodrag nopan"
          >
            <div
              className={`px-2.5 py-1 rounded-full border shadow-sm text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 transition-transform hover:scale-105 ${
                data.badgeBg || "bg-white"
              } ${data.badgeText || "text-gray-900"} ${
                data.badgeBorder || "border-gray-200"
              }`}
            >
              <ShoppingBag className="w-3 h-3 shrink-0" />
              <span>{data.label}</span>
              {data.subLabel && (
                <span className="font-mono text-[10px] opacity-85 bg-black/5 px-1.5 py-0.2 rounded-full">
                  {data.subLabel}
                </span>
              )}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
