import { useLocation } from "react-router-dom";
import { useStore } from "../../useStore";
import ProductCard from "../../components/ProductCard";
import "./style.scss";

export default function SearchPage() {

  const { products, productsReady } = useStore();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q") || "";

  const results = products.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  if (!productsReady && query) {
    return (
      <div className="search_page">
        <h1 className="search_title">
          Результаты поиска для «{query}»
        </h1>

        <div className="empty_state">
          Загружаем каталог...
        </div>
      </div>
    );
  }

  return (
    <div className="search_page">

      <h1 className="search_title">
        Результаты поиска для «{query}»
      </h1>

      {!results.length ? (
        <div className="empty_state">
          Ничего не найдено
        </div>
      ) : (
        <div className="search_grid">
          {results.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

    </div>
  );
}
