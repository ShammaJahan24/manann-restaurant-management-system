
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock3,
  ChefHat,
  CheckCircle2,
  Eye,
  X,
  Filter,
  Package,
  Phone,
  MapPin,
  CreditCard,
  CalendarDays,
} from "lucide-react";

import { ordersData } from "@/src/data/ordersData";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 border-amber-100",
  Preparing: "bg-blue-50 text-blue-700 border-blue-100",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
};

const statusOptions = [
  "All Status",
  "Pending",
  "Preparing",
  "Completed",
  "Cancelled",
];

function formatPrice(value) {
  return `Rs. ${Number(value).toLocaleString("en-US")}`;
}

// Statistics Card
function StatCard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <div className="group rounded-2xl border border-[#F0E5E0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#F16B62]/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#927F7D]">
            {title}
          </p>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#49383A]">
            {value}
          </h3>

          <p className="mt-2 text-xs text-[#AD9293]">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

// Status Badge
function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

// Order Details Modal
function OrderDetailsModal({ order, onClose, onStatusChange }) {
  if (!order) return null;

  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#263238]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-[#FFFAF8] shadow-2xl">

        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#F0E5E0] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#AD9293]">
              Order Details
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#49383A]">
              {order.id}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-[#FFF0EC] p-2 text-[#87434D] transition hover:bg-[#FCE0D9]"
            aria-label="Close order details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">

          {/* Customer Details */}
          <div className="rounded-2xl border border-[#F0E5E0] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-[#AD9293]">
                  Customer
                </p>

                <h3 className="mt-1 font-bold text-[#49383A]">
                  {order.customer}
                </h3>
              </div>

              <StatusBadge status={order.status} />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-[#887777]">
                <Phone size={16} className="text-[#F16B62]" />
                {order.phone}
              </div>

              <div className="flex items-center gap-2 text-sm text-[#887777]">
                <MapPin size={16} className="text-[#F16B62]" />
                {order.type}
                {order.table !== "-" && ` · ${order.table}`}
              </div>

              <div className="flex items-center gap-2 text-sm text-[#887777]">
                <CalendarDays size={16} className="text-[#F16B62]" />
                {order.date} · {order.time}
              </div>

              <div className="flex items-center gap-2 text-sm text-[#887777]">
                <CreditCard size={16} className="text-[#F16B62]" />
                {order.payment}
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="rounded-2xl border border-[#F0E5E0] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#49383A]">
                Ordered Items
              </h3>

              <span className="text-xs text-[#AD9293]">
                {itemCount} items
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#49383A]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-[#AD9293]">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-[#49383A]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-dashed border-[#EADBD5] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#49383A]">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-[#F16B62]">
                  {formatPrice(order.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="rounded-2xl border border-[#F0E5E0] bg-white p-5">
            <label
              htmlFor="order-status"
              className="mb-2 block text-sm font-bold text-[#49383A]"
            >
              Update Order Status
            </label>

            <select
              id="order-status"
              value={order.status}
              onChange={(event) =>
                onStatusChange(order.id, event.target.value)
              }
              className="w-full rounded-xl border border-[#EADBD5] bg-[#FFFAF8] px-4 py-3 text-sm text-[#49383A] outline-none transition focus:border-[#F16B62] focus:ring-2 focus:ring-[#F16B62]/10"
            >
              {statusOptions.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-[#AD9293]">
              This is a demo status update. Changes are not saved to a server.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#F0E5E0] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#F16B62] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E45C55]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Orders Component
export default function OrdersClient() {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Search and Filter Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchMatch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All Status" ||
        order.status === statusFilter;

      const typeMatch =
        typeFilter === "All Types" ||
        order.type === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [orders, search, statusFilter, typeFilter]);

  // Dynamic Statistics
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === "Pending").length,
      preparing: orders.filter((order) => order.status === "Preparing").length,
      completed: orders.filter((order) => order.status === "Completed").length,
    };
  }, [orders]);

  // Selected Order
  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) || null;

  // Update Order Status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  // Reset Filters
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All Status");
    setTypeFilter("All Types");
  };

  return (
    <div className="space-y-7">

      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#F16B62]">
            <span className="h-2 w-2 rounded-full bg-[#F16B62]" />
            Restaurant Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[#49383A] sm:text-3xl">
            Orders Management
          </h1>

          <p className="mt-2 text-sm text-[#AD9293]">
            Track, manage and monitor all restaurant orders.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#F0E5E0] bg-white px-4 py-3 text-sm text-[#887777] shadow-sm">
          <CalendarDays size={17} className="text-[#F16B62]" />
          <span>Today · 23 Nov 2026</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={stats.total}
          subtitle="All recorded orders"
          icon={ShoppingBag}
          color="bg-[#FFF0EC] text-[#F16B62]"
        />

        <StatCard
          title="Pending Orders"
          value={stats.pending}
          subtitle="Waiting for preparation"
          icon={Clock3}
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Preparing Orders"
          value={stats.preparing}
          subtitle="Currently being prepared"
          icon={ChefHat}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Completed Orders"
          value={stats.completed}
          subtitle="Successfully completed"
          icon={CheckCircle2}
          color="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Orders Table Section */}
      <div className="overflow-hidden rounded-2xl border border-[#F0E5E0] bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-[#F3EAE6] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#49383A]">
                All Orders
              </h2>

              <p className="mt-1 text-xs text-[#AD9293]">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#FFF5F0] px-3 py-2 text-xs font-medium text-[#87434D]">
              <Package size={15} />
              Order List
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_190px_170px_auto]">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AD9293]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order ID or customer..."
                className="w-full rounded-xl border border-[#EADBD5] bg-[#FFFAF8] py-3 pl-10 pr-4 text-sm text-[#49383A] outline-none transition placeholder:text-[#B9A6A3] focus:border-[#F16B62] focus:ring-2 focus:ring-[#F16B62]/10"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-[#EADBD5] bg-[#FFFAF8] px-3 py-3 text-sm text-[#49383A] outline-none focus:border-[#F16B62]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* Order Type Filter */}
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="rounded-xl border border-[#EADBD5] bg-[#FFFAF8] px-3 py-3 text-sm text-[#49383A] outline-none focus:border-[#F16B62]"
            >
              <option value="All Types">All Types</option>
              <option value="Dine In">Dine In</option>
              <option value="Takeaway">Takeaway</option>
              <option value="Delivery">Delivery</option>
            </select>

            {/* Reset */}
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#F0D8D2] px-4 py-3 text-sm font-semibold text-[#87434D] transition hover:bg-[#FFF0EC]"
            >
              <Filter size={16} />
              Reset
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="bg-[#FFFAF8] text-[11px] uppercase tracking-wider text-[#AD9293]">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Order Type</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F5EEEA]">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-[#FFFAF8]"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#87434D]">
                      {order.id}
                    </span>

                    <p className="mt-1 text-xs text-[#AD9293]">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      items
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-[#49383A]">
                      {order.customer}
                    </p>

                    <p className="mt-1 text-xs text-[#AD9293]">
                      {order.phone}
                    </p>
                  </td>

                  {/* Order Type */}
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-[#FFF5F0] px-3 py-1.5 text-xs font-medium text-[#87434D]">
                      {order.type}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-sm font-bold text-[#49383A]">
                    {formatPrice(order.amount)}
                  </td>

                  {/* Date and Time */}
                  <td className="px-6 py-4">
                    <p className="text-xs font-medium text-[#49383A]">
                      {order.date}
                    </p>

                    <p className="mt-1 text-xs text-[#AD9293]">
                      {order.time}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Interactive Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">

                      {/* Quick Status Update */}
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(
                            order.id,
                            event.target.value
                          )
                        }
                        aria-label={`Update status for ${order.id}`}
                        className="max-w-[130px] cursor-pointer rounded-lg border border-[#EADBD5] bg-[#FFFAF8] px-2 py-2 text-xs font-semibold text-[#49383A] outline-none transition hover:border-[#F16B62] focus:border-[#F16B62] focus:ring-2 focus:ring-[#F16B62]/10"
                      >
                        {statusOptions.slice(1).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      {/* View Details */}
                      <button
                        onClick={() =>
                          setSelectedOrderId(order.id)
                        }
                        aria-label={`View ${order.id}`}
                        title="View Order Details"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EC] text-[#F16B62] transition hover:bg-[#F16B62] hover:text-white"
                      >
                        <Eye size={17} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0EC] text-[#F16B62]">
                      <Search size={24} />
                    </div>

                    <h3 className="mt-4 font-bold text-[#49383A]">
                      No orders found
                    </h3>

                    <p className="mt-1 text-sm text-[#AD9293]">
                      Try changing your search or filters.
                    </p>

                    <button
                      onClick={clearFilters}
                      className="mt-4 text-sm font-semibold text-[#F16B62] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrderId(null)}
          onStatusChange={updateOrderStatus}
        />
      )}
    </div>
  );
}
