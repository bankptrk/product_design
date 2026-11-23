"use client";

import React, { createContext, useContext, useState } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  children,
  className = "",
}: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultValue || "");
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = (tab: string) => {
    if (value === undefined) {
      setInternalTab(tab);
    }
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TabsList({ children, className = "", ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={`flex items-center gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar scroll-smooth ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  badge?: string | number;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function TabsTrigger({
  value,
  badge,
  icon,
  children,
  className = "",
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const isActive = context.activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.setActiveTab(value)}
      className={`group inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
        isActive
          ? "border-[#fab528] text-gray-900 bg-amber-50/20"
          : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
      } ${className}`}
      {...props}
    >
      {icon && (
        <span
          className={`transition-colors ${
            isActive ? "text-amber-600" : "text-gray-400 group-hover:text-gray-600"
          }`}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
      {badge !== undefined && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
            isActive
              ? "bg-[#fab528] text-gray-900"
              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({
  value,
  children,
  className = "",
  ...props
}: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  if (context.activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={`focus:outline-none animate-in fade-in-50 duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
