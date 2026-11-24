
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Table2,
  ChefHat,
  UtensilsCrossed,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    title: "MAIN MENU",
    items: [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
     { name: "POS System", href: "/dashboard/pos", icon: ShoppingCart },
      { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
      { name: "Tables", href: "/dashboard/table", icon: Table2 },
      { name: "Kitchen", href: "/kitchen", icon: ChefHat },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Menu Management", href: "/menu", icon: UtensilsCrossed },
      { name: "Inventory", href: "/inventory", icon: Package },
      { name: "Staff", href: "/staff", icon: Users },
      { name: "Reports", href: "/reports", icon: BarChart3 },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#172126]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col
        border-r border-white/10 bg-[#263238] text-white
        shadow-2xl shadow-black/10
        transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/"
            onClick={onClose}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F06449] to-[#E98570] text-white shadow-lg shadow-[#F06449]/20 transition duration-300 group-hover:scale-110 group-hover:rotate-3">
              <UtensilsCrossed size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide text-white">
                Mannan
              </h1>
              <p className="text-[10px] font-medium tracking-wider text-gray-400">
                RESTAURANT MANAGEMENT
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:rotate-90 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-7">
          {navigation.map((section, sectionIndex) => (
            <div
              key={section.title}
              className="animate-in fade-in slide-in-from-left-2 duration-500"
              style={{ animationDelay: `${sectionIndex * 100}ms` }}
            >
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.16em] text-gray-500">
                {section.title}
              </p>

              <div className="space-y-1.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-[13px] font-medium transition-all duration-300 ease-out ${
                        active
                          ? "translate-x-1 bg-gradient-to-r from-[#F06449] to-[#E98570] text-white shadow-lg shadow-[#F06449]/20"
                          : "text-gray-400 hover:translate-x-1 hover:bg-white/[0.07] hover:text-white"
                      }`}
                    >
                      {/* Active indicator */}
                      {active && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white/80" />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={active ? 2.3 : 1.8}
                        className={`shrink-0 transition-all duration-300 ${
                          active
                            ? "scale-110 text-white"
                            : "group-hover:scale-110 group-hover:text-[#F06449]"
                        }`}
                      />

                      <span className="flex-1">{item.name}</span>

                      {item.name === "Orders" && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-300 ${
                            active
                              ? "bg-white/20 text-white"
                              : "bg-[#F06449]/15 text-[#F28A75] group-hover:bg-[#F06449]/25"
                          }`}
                        >
                          8
                        </span>
                      )}

                      <ChevronRight
                        size={15}
                        className={`transition-all duration-300 ${
                          active
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <Link
            href="/settings"
            onClick={onClose}
            className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition-all duration-300 hover:translate-x-1 hover:bg-white/[0.07] hover:text-white ${
              pathname.startsWith("/settings")
                ? "bg-white/10 text-[#F28A75]"
                : "text-gray-400"
            }`}
          >
            <Settings
              size={19}
              className="transition-transform duration-500 group-hover:rotate-90 group-hover:text-[#F06449]"
            />
            <span>Settings</span>
          </Link>

          <button
            type="button"
            className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium text-gray-400 transition-all duration-300 hover:translate-x-1 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut
              size={19}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Logout</span>
          </button>

          {/* Restaurant information */}
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.05] p-3 transition-all duration-300 hover:border-[#F06449]/40 hover:bg-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#F06449]" />
              <p className="text-xs font-semibold text-white">
                Mannan Restaurant
              </p>
            </div>

            <p className="mt-2 pl-4 text-[10px] text-gray-500">
              Hyderabad, Sindh, Pakistan
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
