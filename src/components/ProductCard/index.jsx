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

  // 🛒
  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!product) return;

    setIsAdding(true);

    flyToCart();

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
    toggleFavorite(product.id);
  };

  // 🚀
  const flyToCart = () => {
    if (!product) return;

    const cart = document.getElementById("cart-icon");
    const img = document.querySelector(
      `[data-product-id="${product.id}"] img`
    );

    if (!cart || !img) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.top = imgRect.top + "px";
    clone.style.left = imgRect.left + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.zIndex = "9999";
    clone.style.transition = "all 0.7s cubic-bezier(.65,-0.2,.25,1.2)";
    clone.style.pointerEvents = "none";

    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = cartRect.top + "px";
      clone.style.left = cartRect.left + "px";
      clone.style.width = "20px";
      clone.style.height = "20px";
      clone.style.opacity = "0.5";
      clone.style.borderRadius = "50%";
    });

    setTimeout(() => {
      clone.remove();
    }, 700);
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