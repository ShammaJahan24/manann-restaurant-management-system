
"use client";

import { useMemo, useState } from "react";
import {
  TrendingUp,
  Award,
  Utensils,
  ArrowUpRight,
  Flame,
} from "lucide-react";

import { popularItems } from "@/src/data/dashboardData";

export default function PopularItems() {
  const [sortBy, setSortBy] = useState("popular");
  const [selectedItem, setSelectedItem] = useState(null);

  const sortedItems = useMemo(() => {
    return [...popularItems].sort((a, b) => {
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "sold") return b.sold - a.sold;
      return b.progress - a.progress;
    });
  }, [sortBy]);

  const topItem = [...popularItems].sort(
    (a, b) => b.sold - a.sold
  )[0];

  return (
    <div className="overflow-hidden rounded-2xl border border-[#F1E3DE] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#F16B62]">
              <Utensils size={18} />
            </div>

            <div>
              <h3 className="font-bold text-[#87434D]">
                Popular Menu Items
              </h3>
              <p className="mt-1 text-xs text-[#AD9293]">
                Best-selling food items
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-[#FFF5F0] p-1">
          {[
            { label: "Popular", value: "popular" },
            { label: "Sold", value: "sold" },
            { label: "Price", value: "price" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                sortBy === option.value
                  ? "bg-[#F16B62] text-white shadow-sm"
                  : "text-[#AD9293] hover:bg-white hover:text-[#87434D]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Selling Highlight */}
      {topItem && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-[#F8DDD4] bg-linear-to-r from-[#FFF1EB] to-[#FFF9F6] p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#F16B62] shadow-sm">
            <Award size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#AD9293]">
              Top Selling Item
            </p>
            <h4 className="mt-1 truncate text-sm font-bold text-[#87434D]">
              {topItem.name}
            </h4>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-lg font-bold text-[#F16B62]">
              {topItem.sold}
            </p>
            <p className="text-[10px] text-[#AD9293]">Sold</p>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="space-y-5">
        {sortedItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              setSelectedItem(
                selectedItem?.id === item.id ? null : item
              )
            }
            className={`group w-full rounded-xl p-2 text-left transition-all duration-300 ${
              selectedItem?.id === item.id
                ? "bg-[#FFF5F0]"
                : "hover:bg-[#FFFAF8]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${
                    index === 0
                      ? "bg-[#F16B62] text-white shadow-md shadow-[#F16B62]/20"
                      : "bg-[#FFF0EB] text-[#F16B62] group-hover:bg-[#F16B62] group-hover:text-white"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-[#87434D]">
                    {item.name}
                  </h4>

                  <p className="mt-0.5 text-xs text-[#AD9293]">
                    {item.category}
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-[#87434D]">
                  Rs. {Number(item.price).toLocaleString("en-IN")}
                </p>

                <p className="mt-0.5 text-xs text-[#AD9293]">
                  {item.sold} sold
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F8EDE8]">
              <div
                style={{
                  width: `${Math.min(100, Math.max(0, Number(item.progress) || 0))}%`,
                  transition: "width 900ms ease",
                }}
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-gradient-to-r from-[#F16B62] to-[#FF9B83]"
                    : "bg-gradient-to-r from-[#FFB09B] to-[#F3A18E]"
                }`}
              />
            </div>

            {/* Expanded Details */}
            {selectedItem?.id === item.id && (
              <div className="mt-3 flex items-center justify-between border-t border-[#F1E3DE] pt-3">
                <div>
                  <p className="text-[10px] text-[#AD9293]">
                    Selling Price
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#87434D]">
                    Rs. {Number(item.price).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-[#AD9293]">
                    Sales Performance
                  </p>
                  <p className="mt-1 flex items-center justify-end gap-1 text-sm font-bold text-[#F16B62]">
                    {item.progress}%
                    <TrendingUp size={14} />
                  </p>
                </div>
              </div>
            )}

            <div className="sr-only">
              <ArrowUpRight />
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-2 border-t border-[#F1E3DE] pt-4 text-xs text-[#AD9293]">
        <Flame size={15} className="text-[#F16B62]" />
        <span>Tap any item to view more details</span>
      </div>
    </div>
  );
}
