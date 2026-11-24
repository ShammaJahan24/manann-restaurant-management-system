
"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCheck,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({ onMenuClick }) {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      title: "New order received",
      description: "Order #ORD-1024 has been placed.",
      time: "2 minutes ago",
    },
    {
      title: "Low inventory alert",
      description: "Chicken stock is running low.",
      time: "15 minutes ago",
    },
    {
      title: "Order completed",
      description: "Order #ORD-1019 is completed.",
      time: "30 minutes ago",
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#E9E5E1] bg-white/95 px-4 shadow-sm backdrop-blur-md transition-all duration-300 sm:px-6 lg:px-7">

      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-[#263238] transition-all duration-300 hover:bg-[#FFF0EC] hover:text-[#F06449] active:scale-90 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-bold tracking-tight text-[#263238] transition-colors duration-300">
            Dashboard
          </h1>
          <p className="hidden text-xs text-[#899196] sm:block">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Search */}
        <div className="group relative hidden sm:block">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#899196] transition-colors duration-300 group-focus-within:text-[#F06449]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything..."
            className="h-10 w-[190px] rounded-xl border border-transparent bg-[#F5F3F0] pl-10 pr-9 text-sm text-[#263238] outline-none transition-all duration-300 placeholder:text-[#A0A6A9] hover:bg-[#FFF0EC] focus:w-[240px] focus:border-[#F06449]/30 focus:bg-white focus:shadow-md focus:shadow-[#F06449]/5 focus:ring-2 focus:ring-[#F06449]/10 lg:w-[230px] lg:focus:w-[270px]"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#899196] transition hover:text-[#F06449]"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className={`relative rounded-xl p-2.5 transition-all duration-300 active:scale-90 ${
              showNotifications
                ? "bg-[#FFF0EC] text-[#F06449]"
                : "text-[#647078] hover:bg-[#FFF0EC] hover:text-[#F06449]"
            }`}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell
              size={20}
              className={showNotifications ? "animate-none" : "transition-transform duration-300 hover:rotate-12"}
            />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#F06449]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#F06449] opacity-50" />
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 z-50 w-[310px] origin-top-right animate-in fade-in slide-in-from-top-2 rounded-2xl border border-[#E9E5E1] bg-white p-4 shadow-xl duration-200 sm:w-[350px]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#263238]">Notifications</h3>
                  <p className="mt-0.5 text-xs text-[#899196]">
                    You have 3 new notifications
                  </p>
                </div>

                <span className="rounded-full bg-[#FFF0EC] px-2.5 py-1 text-[10px] font-bold text-[#F06449]">
                  3 NEW
                </span>
              </div>

              <div className="space-y-2">
                {notifications.map((item, index) => (
                  <div
                    key={item.title}
                    className="group flex gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-[#FFF5F2]"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#F06449]" />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#263238]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-[#788087]">
                        {item.description}
                      </p>
                      <p className="mt-1.5 text-[10px] text-[#A0A6A9]">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotifications(false)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5F3F0] py-2.5 text-xs font-semibold text-[#263238] transition-all duration-300 hover:bg-[#FFF0EC] hover:text-[#F06449]"
              >
                <CheckCheck size={15} />
                Close notifications
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-[#E9E5E1] sm:block" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-2 rounded-xl p-1.5 transition-all duration-300 hover:bg-[#FFF5F2] sm:gap-3 ${
              showProfile ? "bg-[#FFF5F2]" : ""
            }`}
            aria-expanded={showProfile}
            aria-label="Admin profile menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#F06449] to-[#E98570] text-sm font-bold text-white shadow-md shadow-[#F06449]/20 transition-all duration-300 hover:scale-105 hover:rotate-3">
              MA
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[#263238]">
                Admin User
              </p>
              <p className="text-[11px] text-[#899196]">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-[#899196] transition-transform duration-300 sm:block ${
                showProfile ? "rotate-180 text-[#F06449]" : ""
              }`}
            />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 z-50 w-52 origin-top-right animate-in fade-in slide-in-from-top-2 rounded-2xl border border-[#E9E5E1] bg-white p-2 shadow-xl duration-200">
              <div className="border-b border-[#E9E5E1] px-3 py-3">
                <p className="text-sm font-bold text-[#263238]">
                  Admin User
                </p>
                <p className="mt-0.5 text-xs text-[#899196]">
                  Administrator
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#647078] transition-all duration-200 hover:bg-[#FFF0EC] hover:text-[#F06449]"
              >
                <User size={17} />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#647078] transition-all duration-200 hover:bg-[#FFF0EC] hover:text-[#F06449]"
              >
                <Settings size={17} />
                Settings
              </button>

              <div className="my-1 border-t border-[#E9E5E1]" />

              <button
                type="button"
                onClick={() => setShowProfile(false)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition-all duration-200 hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
