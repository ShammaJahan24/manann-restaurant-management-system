
"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ShoppingBag,
  Users,
  Receipt,
} from "lucide-react";

const iconMap = {
  Wallet,
  ShoppingBag,
  Users,
  Receipt,
};

export default function StatsCard({ data }) {
  const Icon = iconMap[data.icon];

  const originalValue = String(data.value ?? "0");
  const match = originalValue.match(/-?\d[\d,]*(?:\.\d+)?/);

  const numericValue = match
    ? Number(match[0].replace(/,/g, ""))
    : 0;

  const prefix = match
    ? originalValue.slice(0, match.index)
    : "";

  const suffix = match
    ? originalValue.slice(match.index + match[0].length)
    : "";

  const decimalPlaces = match?.[0].includes(".")
    ? match[0].split(".")[1].length
    : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!Number.isFinite(numericValue)) return;

    const duration = 1500;
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(numericValue * easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [numericValue]);

  const formattedCount = count.toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  const isPositive =
    data.changeType === "positive" ||
    data.trend === "up" ||
    (typeof data.change === "string" &&
      data.change.startsWith("+"));

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#E9E5E1] bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#F06449]/30 hover:shadow-xl hover:shadow-[#F06449]/10">

      {/* Decorative background */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#FFF0EC] opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-3">

        {/* Card Information */}
        <div className="min-w-0 flex-1">

          <p className="text-sm font-medium text-[#788087] transition-colors duration-300 group-hover:text-[#263238]">
            {data.title}
          </p>

          {/* Animated Number */}
          <h3 className="mt-3 text-2xl font-bold tracking-tight tabular-nums text-[#263238] transition-colors duration-300 group-hover:text-[#F06449]">
            {prefix}{formattedCount}{suffix}
          </h3>

          {/* Growth Information */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                isPositive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {isPositive ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}

              {data.change}
            </span>

            <span className="text-xs text-[#A0A6A9]">
              {data.period || "vs last period"}
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EC] text-[#F06449] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#F06449] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#F06449]/25">
          {Icon ? (
            <Icon size={23} strokeWidth={1.8} />
          ) : null}
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 rounded-r-full bg-[#F06449] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}
