import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Heart, ShoppingCart, Home, ChevronRight } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import { useStore } from "@/useStore"
import {
  MAX_URL,
  PRIMARY_PHONE,
  PRIMARY_PHONE_LABEL,
  SHOP_NAME,
  TELEGRAM_URL,
} from "@/constants/shop"
import { buildProductMessage, loadProducts } from "@/lib/products"
import "./style.scss"

const Product = () => {

  const { id } = useParams()
  const { products, setProducts, addToCart, favorites, toggleFavorite, cart } = useStore()
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerScale, setViewerScale] = useState(1)

  const getOrderLink = (baseUrl) => {
    const message = encodeURIComponent(buildProductMessage(product))
    return `${baseUrl}?text=${message}`
  }

  useEffect(() => {
    let isMounted = true

    const resolveProduct = async () => {
      setLoading(true)
      setError("")

      const fromStore = products.find((item) => item.id === id)

      if (fromStore) {
        if (!isMounted) return
        setAllProducts(products)
        setProduct(fromStore)
        setLoading(false)
        return
      }

      try {
        const { products: loadedProducts } = await loadProducts()

        if (!isMounted) return

        setProducts(loadedProducts)
        setAllProducts(loadedProducts)
        setProduct(loadedProducts.find((item) => item.id === id) || null)
      } catch (loadError) {
        console.error("Product load error", loadError)

        if (isMounted) {
          setError("Не удалось загрузить товар. Попробуйте обновить страницу.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    resolveProduct()

    return () => {
      isMounted = false
    }
  }, [id, products, setProducts])

  if (loading) return <div className="product_page loading">Загрузка товара...</div>
  if (error) return <div className="product_page loading">{error}</div>
  if (!product) return <div className="product_page loading">Товар не найден</div>
  const isFavorite = favorites.includes(product.id)
  const inCart = cart.some((item) => item.id === product.id)

  const openImageViewer = () => {
    setIsViewerOpen(true)
    setViewerScale(1)
  }

  const closeImageViewer = () => {
    setIsViewerOpen(false)
    setViewerScale(1)
  }

  const zoomInViewer = () => {
    setViewerScale((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOutViewer = () => {
    setViewerScale((prev) => Math.max(prev - 0.25, 1))
  }

  const handleViewerWheel = (event) => {
    event.preventDefault()

    if (event.deltaY < 0) {
      zoomInViewer()
      return
    }

    zoomOutViewer()
  }

  let similar = allProducts
    .filter(i => i.id != product.id)
    .filter(i =>
      i.composition === product.composition ||
      i.color?.includes(product.color)
    )

  if (!similar.length) {
    similar = allProducts.filter(i => i.id != product.id)
  }

  similar = similar.slice(0, 6)

  return (

    <div className="product_page">

      <Helmet>
        <title>{`${product.title} | ${SHOP_NAME}`}</title>
        <meta
          name="description"
          content={`${product.title}. Доставка цветов по Москве и области. Заказ в Telegram или по телефону.`}
        />
        <meta property="og:title" content={`${product.title} | ${SHOP_NAME}`} />
        <meta
          property="og:description"
          content={`${product.title}. Быстрая доставка цветов по Москве и области.`}
        />
        <meta property="og:image" content={product.image} />
      </Helmet>

      {/* breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/"> <Home size={16} />Главная</Link>

        <Link to="/"> <ChevronRight size={16} /> {product.category}</Link>
        {product.subcategory && (
          <>

            <Link to={`/?subcategory=${encodeURIComponent(product.subcategory)}`}>
              <ChevronRight size={16} /> {product.subcategory}
            </Link>
          </>
        )}

        <span> <ChevronRight size={16} /> {product.title}</span>
      </div>

      <div className="product_container">

        <div
          className="product_image_frame"
          onClick={openImageViewer}
        >
          <img src={product.image} alt={product.title} />
          <p className="product_image_note">Товар на фото может отличаться от реального товара</p>
        </div>

        <div className="product_info">

          <h1>{product.title}</h1>

          <div className="price">{product.price} ₽</div>
          <div className="product_quick_actions">
            <button
              type="button"
              className={`product_quick_btn ${inCart ? "active-cart" : ""}`}
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.image,
                })
              }
            >
              <ShoppingCart size={16} />
              {inCart ? "В корзине" : "В корзину"}
            </button>

            <button
              type="button"
              className={`product_quick_btn ${isFavorite ? "active" : ""}`}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart size={16} />
              {isFavorite ? "В избранном" : "В избранное"}
            </button>
          </div>

          <div className="desc_block">
            <h3>Описание букета</h3>
            <p className="desc">{product.description}</p>
          </div>

          <div className="purchase_actions">
            <span className="purchase_label">Заказать через:</span>

            <a
              href={getOrderLink("https://t.me/florketcveti")}
              className="purchase_btn primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>

            {MAX_URL ? (
              <a
                href={getOrderLink(MAX_URL)}
                className="purchase_btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                MAX
              </a>
            ) : (
              <button type="button" className="purchase_btn disabled" disabled>
                MAX
              </button>
            )}

            <a href={`tel:${PRIMARY_PHONE}`} className="purchase_btn secondary">
              Позвонить
            </a>
          </div>

          <div className="attrs">
            <h3>Характеристики</h3>
            <div className="attrs_grid">
              <div className="attr_item">
                <span>Состав</span>
                <strong>{product.composition || "Уточняйте у менеджера"}</strong>
              </div>
              <div className="attr_item">
                <span>Высота</span>
                <strong>{product.height || "Уточняйте у менеджера"}</strong>
              </div>
              <div className="attr_item">
                <span>Тип</span>
                <strong>{product.type || "Уточняйте у менеджера"}</strong>
              </div>
              <div className="attr_item">
                <span>Цвет</span>
                <strong>{product.color.join(", ") || "Уточняйте у менеджера"}</strong>
              </div>
              <div className="attr_item">
                <span>Повод</span>
                <strong>{product.occasion.join(", ") || "Универсальный"}</strong>
              </div>
              <div className="attr_item">
                <span>Контакт</span>
                <strong>{PRIMARY_PHONE_LABEL}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="similar">

        <h2>Похожие</h2>

        <div className="grid">
          {similar.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

      </div>

      {isViewerOpen && (
        <div className="image_viewer" onClick={closeImageViewer}>
          <div className="image_viewer_inner" onClick={(event) => event.stopPropagation()}>
            <div className="viewer_controls">
              <button type="button" onClick={zoomOutViewer}>-</button>
              <span>{Math.round(viewerScale * 100)}%</span>
              <button type="button" onClick={zoomInViewer}>+</button>
              <button type="button" className="close_btn" onClick={closeImageViewer}>
                Закрыть
              </button>
            </div>

            <div className="viewer_image_wrap" onWheel={handleViewerWheel}>
              <img
                src={product.image}
                alt={product.title}
                style={{ transform: `scale(${viewerScale})` }}
              />
            </div>
          </div>
        </div>
      )}

    </div>

  )
}

export default Product
