
"use client";

import {
  X,
  Users,
  Clock3,
  Receipt,
  UserRound,
  ShoppingBag,
} from "lucide-react";

const statusColors = {
  Available: "bg-emerald-50 text-emerald-700",
  Occupied: "bg-blue-50 text-blue-700",
  Reserved: "bg-amber-50 text-amber-700",
  "Needs Cleaning": "bg-orange-50 text-orange-700",
  "Out of Service": "bg-rose-50 text-rose-700",
};

export default function TableDetailsModal({
  table,
  onClose,
  onStatusChange,
}) {
  if (!table) return null;

  const formatPrice = (amount) =>
    `Rs. ${amount.toLocaleString("en-PK")}`;

  const handleStatusChange = (event) => {
    onStatusChange(table.id, event.target.value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172E27]/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-[#FFFCF6] shadow-2xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E8E4D9] p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A18A58]">
              Table Information
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#234B3E]">
              Table {table.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {table.area}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 transition hover:bg-[#F0EDE4] hover:text-[#234B3E]"
            aria-label="Close details"
          >
            <X size={21} />
          </button>
        </div>

        <div className="space-y-6 p-6">

          {/* Table information */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4">
              <Users size={19} className="text-[#A18A58]" />
              <p className="mt-3 text-xs text-gray-500">
                Seating Capacity
              </p>
              <p className="mt-1 font-bold text-[#234B3E]">
                {table.capacity} Persons
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <Clock3 size={19} className="text-[#A18A58]" />
              <p className="mt-3 text-xs text-gray-500">
                Elapsed Time
              </p>
              <p className="mt-1 font-bold text-[#234B3E]">
                {table.elapsedTime}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#234B3E]">
              Table Status
            </label>

            <select
              value={table.status}
              onChange={handleStatusChange}
              className="w-full rounded-xl border border-[#E4DFD1] bg-white px-4 py-3 text-sm text-[#234B3E] outline-none focus:border-[#A18A58]"
            >
              {Object.keys(statusColors).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}
          <div className="rounded-2xl border border-[#E8E4D9] bg-white p-4">
            <div className="flex items-center gap-2">
              <UserRound size={18} className="text-[#A18A58]" />
              <h3 className="font-semibold text-[#234B3E]">
                Customer Details
              </h3>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              {table.customer || "No customer assigned"}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Order ID: {table.orderId || "No active order"}
            </p>
          </div>

          {/* Ordered items */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#A18A58]" />
              <h3 className="font-semibold text-[#234B3E]">
                Ordered Items
              </h3>
            </div>

            {table.items.length > 0 ? (
              <div className="space-y-3">
                {table.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl bg-white p-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#234B3E]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-[#234B3E]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-5 text-center text-sm text-gray-400">
                No items in this table
              </div>
            )}
          </div>

          {/* Bill details */}
          <div className="rounded-2xl bg-[#234B3E] p-5 text-white">
            <div className="flex items-center gap-2">
              <Receipt size={18} className="text-[#D9C28C]" />
              <p className="font-semibold">Bill Information</p>
            </div>

            <div className="mt-4 flex justify-between text-sm text-white/70">
              <span>Payment Status</span>
              <span className="font-semibold text-[#E7D7A9]">
                {table.billStatus}
              </span>
            </div>

            <div className="mt-4 flex justify-between border-t border-white/15 pt-4">
              <span className="text-sm text-white/70">
                Total Amount
              </span>
              <span className="text-xl font-bold">
                {formatPrice(table.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8E4D9] p-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#234B3E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193A30]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
