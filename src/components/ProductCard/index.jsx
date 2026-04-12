import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useStore } from "../../useStore";
import "./style.scss";

const ProductCard = ({ product, isLoading }) => {

  const { addToCart, favorites, toggleFavorite } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  // безопасная проверка
  const isFavorite = product ? favorites.includes(product.id) : false;

  const getVisibleTarget = (ids) => {
    for (const id of ids) {
      const element = document.getElementById(id);

      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.width > 0 && rect.height > 0;

      if (isVisible) return element;
    }

    return null;
  };

  const flyToTarget = (targetIds) => {
    if (!product) return;

    const target = getVisibleTarget(targetIds);
    const img = document.querySelector(`[data-product-id="${product.id}"] img`);

    if (!target || !img) return;

    const imgRect = img.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const clone = img.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.top = `${imgRect.top}px`;
    clone.style.left = `${imgRect.left}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.objectFit = "cover";
    clone.style.zIndex = "9999";
    clone.style.borderRadius = "14px";
    clone.style.boxShadow = "0 12px 35px rgba(17, 17, 17, 0.22)";
    clone.style.transition = "transform 0.72s cubic-bezier(.19,.89,.28,1.1), opacity 0.72s ease, border-radius 0.72s ease";
    clone.style.transform = "translate(0, 0) scale(1)";
    clone.style.transformOrigin = "center center";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    const imgCenterX = imgRect.left + imgRect.width / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const dx = targetCenterX - imgCenterX;
    const dy = targetCenterY - imgCenterY;

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.12)`;
      clone.style.opacity = "0.35";
      clone.style.borderRadius = "50%";
    });

    setTimeout(() => {
      clone.remove();
    }, 760);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!product) return;

    setIsAdding(true);

    flyToTarget(["cart-icon", "mobile-cart-icon"]);

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  // ❤️
  const handleFavorite = (e) => {
    e.preventDefault();
    if (!product) return;

    if (!isFavorite) {
      flyToTarget(["favorites-icon", "mobile-favorites-icon"]);
    }

    toggleFavorite(product.id);
  };

  // 👉 теперь safe return
  if (isLoading || !product) {
    return <div className="product_card skeleton"></div>;
  }

  return (
    <div className="product_card" data-product-id={product.id}>

      <Link to={`/product/${product.id}`}>

        <div className="product_image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product_info">
          <span className="product_category">{product.category}</span>

          <p className="product_title">{product.title}</p>

          <span className="product_price">
            {product.price} руб.
          </span>
        </div>

      </Link>

      <button
        className={`favorite_btn ${isFavorite ? "active" : ""}`}
        onClick={handleFavorite}
      >
        <Heart size={16} />
      </button>

      <button
        className={`cart_btn ${isAdding ? "active" : ""}`}
        onClick={handleAddToCart}
      >
        <ShoppingCart size={16} />
      </button>

    </div>
  )
}

export default ProductCard
