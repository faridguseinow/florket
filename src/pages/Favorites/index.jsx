import { useStore } from "../../useStore";
import ProductCard from "../../components/ProductCard";
import "./style.scss";

export default function FavoritesPage() {
  const { favorites, products, productsReady } = useStore();

  const favoriteItems = products.filter((p) =>
    favorites.includes(p.id)
  );

  if (!productsReady && favorites.length) {
    return <p>Загружаем избранные товары...</p>;
  }

  if (!favoriteItems.length) {
    return <p>Нет избранных товаров</p>;
  }

return (
  <div className="favorites_page">

    <h1 className="favorites_title">Избранное</h1>

    {!favoriteItems.length ? (
      <div className="empty_state">
        Нет избранных товаров
      </div>
    ) : (
      <div className="favorites_grid">
        {favoriteItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    )}

  </div>
);
}
