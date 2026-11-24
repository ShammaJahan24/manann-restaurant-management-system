
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Search,
  Eye,
  X,
  ShoppingBag,
  ClipboardList,
  CheckCircle2,
  Clock3,
  XCircle,
  ChefHat,
} from "lucide-react";

import { recentOrders } from "@/src/data/dashboardData";

const filters = [
  "All",
  "Completed",
  "Preparing",
  "Pending",
  "Cancelled",
];

const statusStyles = {
  Completed: "bg-[#EAF7EF] text-[#41966A] border-[#D6EEDF]",
  Preparing: "bg-[#EDF3FF] text-[#6386C7] border-[#DCE7FA]",
  Pending: "bg-[#FFF5E7] text-[#D69A43] border-[#F8E7C8]",
  Cancelled: "bg-[#FDEDED] text-[#D66B6B] border-[#F7DADA]",
};

const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

function StatusBadge({ status }) {
  const icons = {
    Completed: <CheckCircle2 size={13} />,
    Preparing: <ChefHat size={13} />,
    Pending: <Clock3 size={13} />,
    Cancelled: <XCircle size={13} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
        statusStyles[status] ||
        "border-gray-200 bg-gray-50 text-gray-500"
      }`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export default function RecentOrders() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return recentOrders.filter((order) => {
      const matchesFilter =
        activeFilter === "All" ||
        order.status === activeFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        String(order.id).toLowerCase().includes(searchText) ||
        String(order.customer).toLowerCase().includes(searchText) ||
        String(order.items).toLowerCase().includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const getCount = (status) => {
    if (status === "All") return recentOrders.length;

    return recentOrders.filter(
      (order) => order.status === status
    ).length;
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-[#F1E3DE] bg-white shadow-[0_8px_35px_rgba(142,69,80,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(142,69,80,0.10)]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F3E8E3] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F16B62] to-[#FF9B83] text-white shadow-lg shadow-[#F16B62]/20">
            <ShoppingBag size={20} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#87434D]">
              Recent Orders
            </h3>

            <p className="mt-1 text-xs text-[#AD9293]">
              Latest restaurant transactions
            </p>
          </div>
        </div>

        <Link
          href="/orders"
          className="group flex items-center gap-2 rounded-xl border border-[#F5DDD5] bg-[#FFF5F0] px-4 py-2.5 text-xs font-semibold text-[#D66A60] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F16B62] hover:bg-[#F16B62] hover:text-white hover:shadow-lg hover:shadow-[#F16B62]/20"
        >
          View All
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="p-5 sm:p-6">

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          {/* Search */}
          <div className="relative w-full xl:max-w-xs">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C39B98]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order, customer or item..."
              className="w-full rounded-xl border border-[#F0E2DD] bg-[#FFFAF8] py-3 pl-10 pr-10 text-sm text-[#87434D] outline-none transition-all duration-300 placeholder:text-[#C4A9A5] focus:border-[#F16B62] focus:bg-white focus:ring-4 focus:ring-[#F16B62]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B99C9C] transition-colors hover:text-[#E85D55]"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#F16B62] to-[#FF9B83] text-white shadow-md shadow-[#F16B62]/20"
                      : "border border-[#F1E3DE] bg-white text-[#AD9293] hover:border-[#F16B62]/40 hover:bg-[#FFF4EF] hover:text-[#D66A60]"
                  }`}
                >
                  {filter}

                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#FFF1EC] text-[#B77A7C]"
                    }`}
                  >
                    {getCount(filter)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">

            <thead>
              <tr className="border-b border-[#F1E3DE] bg-[#FFFAF8]">
                <th className="rounded-l-xl px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Order ID
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Customer
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Items
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Type
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Amount
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Status
                </th>

                <th className="rounded-r-xl px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#B18D8D]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  style={{
                    animation: `orderFadeIn 450ms ease-out ${index * 65}ms both`,
                  }}
                  className="group border-b border-[#F5EEEA] transition-all duration-300 hover:bg-[#FFF8F5]"
                >
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="text-xs font-bold text-[#C66D67] transition-colors group-hover:text-[#E85D55]">
                      {order.id}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="text-sm font-semibold text-[#87434D]">
                      {order.customer}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-[#AD9293]">
                    {order.items}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="rounded-lg bg-[#FFF2ED] px-2.5 py-1.5 text-xs font-medium text-[#B77A7C]">
                      {order.type}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="text-sm font-bold text-[#87434D]">
                      {formatCurrency(order.amount)}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`View order ${order.id}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#F2DFD9] bg-white text-[#D66A60] transition-all duration-300 hover:scale-110 hover:border-[#F16B62] hover:bg-[#F16B62] hover:text-white hover:shadow-lg hover:shadow-[#F16B62]/20"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1EC] text-[#E98570]">
                <Search size={24} />
              </div>

              <h4 className="mt-4 text-sm font-bold text-[#87434D]">
                No orders found
              </h4>

              <p className="mt-1 text-xs text-[#AD9293]">
                Try changing your search or status filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-4 rounded-xl bg-gradient-to-r from-[#F16B62] to-[#FF9B83] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#AD9293]">
            Showing {filteredOrders.length} of {recentOrders.length} orders
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#D66A60]">
            <ClipboardList size={15} />
            Order Management
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#743D47]/30 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md animate-[modalEnter_250ms_ease-out] overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#914B55] to-[#F16B62] p-6 text-white">
              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/70">
                    Order Details
                  </p>

                  <h3
                    id="order-modal-title"
                    className="mt-1 text-xl font-bold"
                  >
                    {selectedOrder.id}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  aria-label="Close order details"
                  className="rounded-xl bg-white/15 p-2 transition-colors hover:bg-white/25"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 p-6">
              <div>
                <p className="text-xs text-[#AD9293]">
                  Customer
                </p>
                <p className="mt-1 text-sm font-bold text-[#87434D]">
                  {selectedOrder.customer}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#AD9293]">
                  Ordered Items
                </p>
                <p className="mt-1 text-sm font-semibold text-[#87434D]">
                  {selectedOrder.items}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#AD9293]">
                  Order Type
                </p>
                <p className="mt-1 text-sm font-semibold text-[#87434D]">
                  {selectedOrder.type}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#FFF5F0] p-3">
                  <p className="text-xs text-[#AD9293]">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#C65D5D]">
                    {formatCurrency(selectedOrder.amount)}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FFF5F0] p-3">
                  <p className="text-xs text-[#AD9293]">
                    Status
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full rounded-xl bg-gradient-to-r from-[#F16B62] to-[#FF9B83] py-3 text-sm font-semibold text-white shadow-md shadow-[#F16B62]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F16B62]/30"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes orderFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
