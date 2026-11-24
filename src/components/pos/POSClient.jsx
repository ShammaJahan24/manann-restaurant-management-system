
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ShoppingCart,
  Utensils,
  CreditCard,
  Banknote,
  X,
  CheckCircle2,
  ImageOff,
  Receipt,
  Clock3,
} from "lucide-react";

import { categories, products } from "@/src/data/posData";

const formatPrice = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-US")}`;

function ProductCard({ product, onAdd, quantity }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#F1E3DE] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#F16B62]/40 hover:shadow-xl hover:shadow-[#87434D]/[0.06]">
      {/* Product Image */}
      <div className="relative h-40 overflow-hidden bg-[#FFF5F0] sm:h-44">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#FFF5F0] to-[#F8DDD5] text-[#D99A8F]">
            <ImageOff size={32} strokeWidth={1.5} />
            <span className="text-[10px] font-medium">
              Add product image
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[10px] font-bold text-[#87434D] shadow-sm backdrop-blur">
          {product.category}
        </span>

        {quantity > 0 && (
          <span className="absolute right-3 top-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#F16B62] px-2 text-xs font-bold text-white shadow-md">
            {quantity}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="truncate text-sm font-bold text-[#87434D]">
          {product.name}
        </h3>

        <p className="mt-1 min-h-8 text-xs leading-4 text-[#AD9293]">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-base font-extrabold text-[#F16B62]">
            {formatPrice(product.price)}
          </p>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#F16B62] transition-all duration-300 hover:scale-110 hover:bg-[#F16B62] hover:text-white active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function POSClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("Dine In");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [tableNumber, setTableNumber] = useState("1");
  const [showCheckout, setShowCheckout] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const filteredProducts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.category.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Demo tax rate: 5%. Adjust when the restaurant's actual rate is confirmed.
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setCompletedOrder({
      items: cart,
      subtotal,
      tax,
      total,
      orderType,
      paymentMethod,
      tableNumber: orderType === "Dine In" ? tableNumber : null,
      itemCount: cartCount,
    });

    setCart([]);
    setShowCheckout(false);
  };

  const closeConfirmation = () => {
    setCompletedOrder(null);
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#FFFAF8] pb-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#F16B62]">
              <Utensils size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-[#87434D]">
                POS System
              </h1>
              <p className="mt-1 text-xs text-[#AD9293]">
                Create and manage restaurant orders
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#F1E3DE] bg-white px-4 py-2.5 text-xs font-semibold text-[#98777A] shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          POS Ready
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        {/* Product Section */}
        <section className="min-w-0 space-y-5">
          {/* Search */}
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AD9293]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search food items or categories..."
              className="h-12 w-full rounded-xl border border-[#F1E3DE] bg-white pl-12 pr-4 text-sm text-[#87434D] outline-none transition-all placeholder:text-[#C2A9A8] focus:border-[#F16B62] focus:ring-4 focus:ring-[#F16B62]/10"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-[#F16B62] text-white shadow-md shadow-[#F16B62]/20"
                    : "border border-[#F1E3DE] bg-white text-[#98777A] hover:border-[#F16B62]/40 hover:bg-[#FFF5F0] hover:text-[#F16B62]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Count */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#87434D]">
                Menu Items
              </h2>
              <p className="mt-1 text-xs text-[#AD9293]">
                Showing {filteredProducts.length} of {products.length} items
              </p>
            </div>

            <span className="rounded-lg bg-[#FFF0EB] px-3 py-1.5 text-xs font-bold text-[#F16B62]">
              {cartCount} items in cart
            </span>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const cartItem = cart.find(
                  (item) => item.id === product.id
                );

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAdd={addToCart}
                    quantity={cartItem?.quantity || 0}
                  />
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#EBD8D2] bg-white py-16 text-center">
              <Search
                size={32}
                className="mx-auto text-[#D8B9B3]"
              />
              <h3 className="mt-3 text-sm font-bold text-[#87434D]">
                No products found
              </h3>
              <p className="mt-1 text-xs text-[#AD9293]">
                Try another search or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-xs font-bold text-[#F16B62] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Cart Panel */}
        <aside className="overflow-hidden rounded-2xl border border-[#F1E3DE] bg-white shadow-sm xl:sticky xl:top-24">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-[#F1E3DE] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#F16B62]">
                <ShoppingCart size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#87434D]">
                  Current Order
                </h2>
                <p className="mt-0.5 text-xs text-[#AD9293]">
                  {cartCount} items selected
                </p>
              </div>
            </div>

            {cart.length > 0 && (
              <button
                type="button"
                onClick={() => setCart([])}
                className="rounded-lg p-2 text-[#C18B87] transition hover:bg-red-50 hover:text-red-500"
                aria-label="Clear cart"
                title="Clear cart"
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>

          {/* Order Type */}
          <div className="space-y-3 border-b border-[#F1E3DE] p-5">
            <p className="text-xs font-bold text-[#87434D]">
              Order Type
            </p>

            <div className="grid grid-cols-2 gap-2">
              {["Dine In", "Takeaway"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                    orderType === type
                      ? "border-[#F16B62] bg-[#FFF0EB] text-[#F16B62]"
                      : "border-[#F1E3DE] text-[#AD9293] hover:bg-[#FFFAF8]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {orderType === "Dine In" && (
              <div>
                <label
                  htmlFor="tableNumber"
                  className="mb-2 block text-xs font-semibold text-[#98777A]"
                >
                  Table Number
                </label>

                <select
                  id="tableNumber"
                  value={tableNumber}
                  onChange={(event) =>
                    setTableNumber(event.target.value)
                  }
                  className="h-10 w-full rounded-xl border border-[#F1E3DE] bg-white px-3 text-xs font-medium text-[#87434D] outline-none focus:border-[#F16B62]"
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    <option key={index + 1} value={String(index + 1)}>
                      Table {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="max-h-[350px] min-h-[140px] space-y-4 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="flex min-h-[140px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF5F0] text-[#D8A49A]">
                  <ShoppingBag size={25} />
                </div>
                <p className="mt-3 text-sm font-bold text-[#87434D]">
                  Your cart is empty
                </p>
                <p className="mt-1 text-xs text-[#AD9293]">
                  Add food items to start an order.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0EB] text-[#F16B62]">
                    <Utensils size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#87434D]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[11px] text-[#AD9293]">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-[#F1E3DE] text-[#98777A] transition hover:bg-[#FFF0EB] hover:text-[#F16B62]"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={12} />
                      </button>

                      <span className="min-w-4 text-center text-xs font-bold text-[#87434D]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md border border-[#F1E3DE] text-[#98777A] transition hover:bg-[#FFF0EB] hover:text-[#F16B62]"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-bold text-[#87434D]">
                      {formatPrice(item.price * item.quantity)}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-[#C18B87] transition hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Method */}
          <div className="border-t border-[#F1E3DE] p-5">
            <p className="mb-3 text-xs font-bold text-[#87434D]">
              Payment Method
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Cash", icon: Banknote },
                { name: "Card", icon: CreditCard },
              ].map((method) => {
                const Icon = method.icon;

                return (
                  <button
                    key={method.name}
                    type="button"
                    onClick={() => setPaymentMethod(method.name)}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs font-bold transition-all ${
                      paymentMethod === method.name
                        ? "border-[#F16B62] bg-[#FFF0EB] text-[#F16B62]"
                        : "border-[#F1E3DE] text-[#AD9293] hover:bg-[#FFFAF8]"
                    }`}
                  >
                    <Icon size={16} />
                    {method.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-[#F1E3DE] bg-[#FFFAF8] p-5">
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#AD9293]">Subtotal</span>
                <span className="font-semibold text-[#87434D]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-[#AD9293]">
                  Tax (5% demo rate)
                </span>
                <span className="font-semibold text-[#87434D]">
                  {formatPrice(tax)}
                </span>
              </div>

              <div className="border-t border-dashed border-[#EBD8D2] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#87434D]">
                    Total Amount
                  </span>
                  <span className="text-xl font-extrabold text-[#F16B62]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCheckout(true)}
              disabled={cart.length === 0}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F16B62] to-[#FF9B83] text-sm font-bold text-white shadow-lg shadow-[#F16B62]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F16B62]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              <Receipt size={18} />
              Proceed to Checkout
            </button>

            <p className="mt-3 text-center text-[10px] text-[#AD9293]">
              <Clock3 size={11} className="mr-1 inline" />
              Review your order before confirming
            </p>
          </div>
        </aside>
      </div>

      {/* Checkout Confirmation Modal */}
      {showCheckout && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#512F35]/40 p-4 backdrop-blur-sm"
          onClick={() => setShowCheckout(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md animate-in fade-in zoom-in-95 rounded-2xl bg-white p-6 shadow-2xl duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2
                  id="checkout-title"
                  className="text-lg font-extrabold text-[#87434D]"
                >
                  Confirm Order
                </h2>
                <p className="mt-1 text-xs text-[#AD9293]">
                  Please review your order details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="rounded-lg p-2 text-[#AD9293] hover:bg-[#FFF0EB] hover:text-[#F16B62]"
                aria-label="Close checkout"
              >
                <X size={19} />
              </button>
            </div>

            <div className="my-5 rounded-xl bg-[#FFF5F0] p-4">
              <div className="flex justify-between text-xs text-[#98777A]">
                <span>Order Type</span>
                <span className="font-bold text-[#87434D]">
                  {orderType}
                </span>
              </div>

              {orderType === "Dine In" && (
                <div className="mt-3 flex justify-between text-xs text-[#98777A]">
                  <span>Table</span>
                  <span className="font-bold text-[#87434D]">
                    Table {tableNumber}
                  </span>
                </div>
              )}

              <div className="mt-3 flex justify-between text-xs text-[#98777A]">
                <span>Payment</span>
                <span className="font-bold text-[#87434D]">
                  {paymentMethod}
                </span>
              </div>

              <div className="mt-4 border-t border-[#EBD8D2] pt-4">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-[#87434D]">
                    Total
                  </span>
                  <span className="text-lg font-extrabold text-[#F16B62]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="flex-1 rounded-xl border border-[#F1E3DE] py-3 text-xs font-bold text-[#98777A] transition hover:bg-[#FFFAF8]"
              >
                Go Back
              </button>

              <button
                type="button"
                onClick={handleCheckout}
                className="flex-1 rounded-xl bg-[#F16B62] py-3 text-xs font-bold text-white transition hover:bg-[#E85D55]"
              >
                Confirm Demo Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Order Success */}
      {completedOrder && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#512F35]/40 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={34} />
            </div>

            <h2
              id="success-title"
              className="mt-4 text-xl font-extrabold text-[#87434D]"
            >
              Demo Order Completed!
            </h2>

            <p className="mt-2 text-xs leading-5 text-[#AD9293]">
              Your frontend demo order has been confirmed.
              No real order has been saved to a server.
            </p>

            <div className="my-5 rounded-xl bg-[#FFF5F0] p-4">
              <p className="text-xs text-[#AD9293]">
                Items: {completedOrder.itemCount}
              </p>
              <p className="mt-2 text-xl font-extrabold text-[#F16B62]">
                {formatPrice(completedOrder.total)}
              </p>
            </div>

            <button
              type="button"
              onClick={closeConfirmation}
              className="w-full rounded-xl bg-[#F16B62] py-3 text-sm font-bold text-white transition hover:bg-[#E85D55]"
            >
              Continue to POS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
