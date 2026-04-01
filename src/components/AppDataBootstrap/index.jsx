import { useEffect } from "react";
import { useStore } from "@/useStore";
import { loadProducts, PRODUCTS_REFRESH_INTERVAL } from "@/lib/products";

const AppDataBootstrap = () => {
  const { products, setProducts, setProductsReady } = useStore();

  useEffect(() => {
    let isMounted = true;
    let intervalId;

    const refreshProducts = async (force = false) => {
      try {
        const { products: loadedProducts } = await loadProducts({ force });

        if (isMounted && loadedProducts.length) {
          setProducts(loadedProducts);
        }
      } catch (error) {
        console.error("Bootstrap products error", error);
      } finally {
        if (isMounted) {
          setProductsReady(true);
        }
      }
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") {
        refreshProducts(true);
      }
    };

    const refreshOnFocus = () => {
      refreshProducts(true);
    };

    if (!products.length) {
      refreshProducts();
    } else {
      setProductsReady(true);
    }

    intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        refreshProducts(true);
      }
    }, PRODUCTS_REFRESH_INTERVAL);

    window.addEventListener("focus", refreshOnFocus);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", refreshOnFocus);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [products.length, setProducts, setProductsReady]);

  return null;
};

export default AppDataBootstrap;
