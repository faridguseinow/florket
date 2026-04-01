import { create } from "zustand";
import { getCachedProducts } from "@/lib/products";

const getLocal = (key, fallback) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key));
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const useStore = create((set, get) => ({
  // PRODUCTS
  products: getCachedProducts(),
  productsReady: getCachedProducts().length > 0,
  setProducts: (products) => set({ products, productsReady: true }),
  setProductsReady: (productsReady) => set({ productsReady }),

  // FAVORITES
  favorites: getLocal("favorites", []),

  toggleFavorite: (id) => {
    const favorites = get().favorites.includes(id)
      ? get().favorites.filter((f) => f !== id)
      : [...get().favorites, id];

    localStorage.setItem("favorites", JSON.stringify(favorites));
    set({ favorites });
  },

  // CART
  cart: getLocal("cart", []),

  addToCart: (product) => {
    const cart = [...get().cart];
    const existing = cart.find((i) => i.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    set({ cart });
  },

  removeFromCart: (id) => {
    const cart = get().cart.filter((i) => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    set({ cart });
  },

  changeQuantity: (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      return;
    }

    const cart = get().cart.map((i) =>
      i.id === id ? { ...i, quantity: nextQuantity } : i
    );

    localStorage.setItem("cart", JSON.stringify(cart));
    set({ cart });
  },
}));
