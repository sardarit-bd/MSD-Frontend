"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Nav Data ─────────────────────────────────────────────────────────────────

const NAV = [
  {
    group: "Content",
    items: [
      {
        label: "Topics",
        href: "/dashboard/topics",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.396 0 2.698.37 3.8 1.015A7.978 7.978 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.969 7.969 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        ),
      },
      {
        label: "Articles",
        href: "/dashboard/articles",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
          </svg>
        ),
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: (
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.992 6.992 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        ),
      },
    ],
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const pathname = usePathname();
  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  const Inner = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-[18px] border-b border-slate-100
        ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white text-sm font-black tracking-tight">M</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 leading-none">
              MSD Manual
            </p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">CMS Admin</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {NAV.map((section) => (
          <div key={section.group}>
            {!collapsed && (
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 px-2 mb-1.5">
                {section.group}
              </p>
            )}
            {collapsed && (
              <div className="w-full border-t border-slate-100 mb-2" />
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                    title={collapsed ? item.label : undefined}
                    className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm
                      font-medium transition-all duration-150 group
                      ${collapsed ? "justify-center" : ""}
                      ${active
                        ? "bg-red-50 text-red-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    {/* Active left bar */}
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5
                        bg-red-500 rounded-r-full" />
                    )}

                    <span className={`shrink-0 transition-colors
                      ${active ? "text-red-600" : "text-slate-400 group-hover:text-slate-500"}`}>
                      {item.icon}
                    </span>

                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] font-bold bg-red-100 text-red-600
                            px-1.5 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Collapsed tooltip */}
                    {collapsed && (
                      <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900
                        text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none
                        group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                        {item.badge && (
                          <span className="ml-1.5 bg-red-500 text-white text-[10px]
                            px-1.5 py-0.5 rounded-full">{item.badge}</span>
                        )}
                        {/* Arrow */}
                        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4
                          border-transparent border-r-slate-900" />
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className={`border-t border-slate-100 p-3 ${collapsed ? "flex justify-center" : ""}`}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50
            transition-colors cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600
              flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">Admin User</p>
              <p className="text-[10px] text-slate-400 truncate">admin@msdmanual.com</p>
            </div>
            <svg viewBox="0 0 20 20" fill="currentColor"
              className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600
            flex items-center justify-center cursor-pointer shadow-sm" title="Admin User">
            <span className="text-white text-xs font-bold">A</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className={`hidden lg:flex flex-col h-screen bg-white border-r border-slate-100
        sticky top-0 shrink-0 transition-all duration-300 ease-in-out
        ${collapsed ? "w-[56px]" : "w-56"}`}>
        {/* Collapse toggle */}
        <button
          type="button"
          onClick={onToggle}
          className="absolute -right-3 top-[22px] w-6 h-6 bg-white border border-slate-200
            rounded-full shadow-sm flex items-center justify-center z-10
            hover:bg-slate-50 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor"
            className={`w-3 h-3 text-slate-500 transition-transform duration-300
              ${collapsed ? "" : "rotate-180"}`}>
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>
        <Inner />
      </aside>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r
        border-slate-100 z-50 flex flex-col shadow-2xl transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button
          type="button"
          onClick={onMobileClose}
          className="absolute right-3 top-4 w-7 h-7 flex items-center justify-center
            rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <Inner />
      </aside>
    </>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────

function Topbar({ onMobileMenuOpen }) {
  const pathname = usePathname();

  const crumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));

  return (
    <header className="h-[56px] bg-white border-b border-slate-100 flex items-center
      justify-between px-4 lg:px-6 sticky top-0 z-20 shrink-0">

      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMobileMenuOpen}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
            text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm">
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-slate-300 text-xs">/</span>}
              <span className={i === crumbs.length - 1
                ? "font-semibold text-slate-800"
                : "text-slate-400"}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {/* Search bar */}
        <label className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200
          rounded-lg px-3 py-1.5 w-44 lg:w-56 cursor-text
          focus-within:ring-2 focus-within:ring-red-400/25 focus-within:border-red-300
          transition-all">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-slate-400 shrink-0">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Search topics…"
            className="bg-transparent text-sm text-slate-700 placeholder-slate-400
              focus:outline-none w-full"
          />
          <kbd className="hidden lg:inline text-[10px] text-slate-400 bg-white border
            border-slate-200 rounded px-1 py-0.5 font-mono shrink-0">
            ⌘K
          </kbd>
        </label>

        {/* New topic */}
        <Link href="/dashboard/articles/new"
          className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95
            text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm
            shadow-red-200">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <span className="hidden sm:inline">New Article</span>
        </Link>
      </div>
    </header>
  );
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8F8FA] overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}