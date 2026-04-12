import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { useStore } from "../../useStore"
import ProductCard from "../../components/ProductCard"
import "./style.scss"

export default function FavoritesPage() {
  const { favorites, products, productsReady } = useStore()

  const favoriteItems = products.filter((p) => favorites.includes(p.id))

  if (!productsReady && favorites.length) {
    return (
      <div className="favorites_page">
        <h1 className="favorites_title">Избранное</h1>
        <div className="empty_state">Загружаем избранные товары...</div>
      </div>
    )
  }

  return (
    <div className="favorites_page">

      <div className="favorites_heading">
        <h1 className="favorites_title">Избранное</h1>
        <p>
          {favoriteItems.length
            ? `Сохранено букетов: ${favoriteItems.length}`
            : "Добавляйте понравившиеся букеты в избранное"}
        </p>
      </div>

      {!favoriteItems.length ? (
        <div className="favorites_empty_card">
          <Heart size={28} />
          <h3>В избранном пока пусто</h3>
          <p>Нажмите на сердечко у букета, чтобы сохранить его здесь.</p>
          <Link to="/" className="favorites_cta">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="favorites_grid">
          {favoriteItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}

    </div>
  )
}
