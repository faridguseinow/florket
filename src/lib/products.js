import { PRODUCTS_API_URL, DEFAULT_PRODUCT_DESCRIPTION } from "@/constants/shop";

const CACHE_KEY = "products";
const CACHE_TIME_KEY = "products_time";
const CACHE_HASH_KEY = "products_hash";
const CACHE_TTL = 1000 * 60 * 60;
export const PRODUCTS_REFRESH_INTERVAL = 1000 * 60;

const safeArrayParse = (value) => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeListField = (value) => {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string") return [];

  return value
    .split(/[;,/|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export const normalizeProduct = (product) => {
  const id = product?.id ?? product?.ID ?? product?.sku;
  const title = String(product?.title ?? product?.name ?? "").trim();

  return {
    ...product,
    id: String(id ?? ""),
    title,
    description:
      String(product?.description ?? "").trim() || DEFAULT_PRODUCT_DESCRIPTION,
    category: String(product?.category ?? "").trim(),
    subcategory: String(product?.subcategory ?? "").trim(),
    height: String(product?.height ?? "").trim(),
    type: String(product?.type ?? "").trim(),
    color: normalizeListField(product?.color),
    occasion: normalizeListField(product?.occasion),
    price: Number(product?.price) || 0,
    image: String(product?.image ?? "").trim(),
    composition: String(product?.composition ?? "").trim(),
  };
};

export const sanitizeProducts = (data) => {
  if (!Array.isArray(data)) return [];

  return data
    .map(normalizeProduct)
    .filter((item) => item.id && item.title);
};

const hashData = (data) => JSON.stringify(data).length;

export const getCachedProducts = () => {
  return safeArrayParse(localStorage.getItem(CACHE_KEY));
};

export const loadProducts = async ({ force = false } = {}) => {
  const cached = getCachedProducts();
  const cachedTime = Number(localStorage.getItem(CACHE_TIME_KEY) || 0);
  const cachedHash = localStorage.getItem(CACHE_HASH_KEY);
  const now = Date.now();

  if (!force && cached.length && cachedTime && now - cachedTime < CACHE_TTL) {
    return { products: cached, source: "cache" };
  }

  const response = await fetch(PRODUCTS_API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Products request failed: ${response.status}`);
  }

  const rawData = await response.json();
  const products = sanitizeProducts(rawData);
  const newHash = String(hashData(products));

  if (!products.length && cached.length) {
    return { products: cached, source: "cache-fallback" };
  }

  if (cachedHash === newHash && cached.length) {
    localStorage.setItem(CACHE_TIME_KEY, String(now));
    return { products: cached, source: "cache-refresh" };
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify(products));
  localStorage.setItem(CACHE_TIME_KEY, String(now));
  localStorage.setItem(CACHE_HASH_KEY, newHash);

  return { products, source: "remote" };
};

export const buildProductMessage = (product) => {
  const lines = [
    "Здравствуйте! Хочу заказать букет.",
    "",
    `Товар: ${product.title}`,
    `Цена: ${product.price} руб.`,
  ];

  if (product.category) lines.push(`Категория: ${product.category}`);
  if (product.composition) lines.push(`Состав: ${product.composition}`);
  if (product.height) lines.push(`Высота: ${product.height}`);
  if (product.color?.length) lines.push(`Цвет: ${product.color.join(", ")}`);

  return lines.join("\n");
};
