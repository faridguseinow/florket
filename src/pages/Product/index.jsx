import { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
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
  const { products, setProducts } = useStore()
  const [product, setProduct] = useState(null)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const imageFrameRef = useRef(null)
  const [zoomState, setZoomState] = useState({
    active: false,
    x: 50,
    y: 50,
  })

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

  const handleImageMove = (event) => {
    const frame = imageFrameRef.current
    if (!frame) return

    const rect = frame.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setZoomState({
      active: true,
      x: Math.min(Math.max(x, 0), 100),
      y: Math.min(Math.max(y, 0), 100),
    })
  }

  const handleImageLeave = () => {
    setZoomState((prev) => ({ ...prev, active: false }))
  }

  // 🔻 похожие
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
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/">{product.category}</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <div className="product_container">

        <div
          ref={imageFrameRef}
          className={`product_image_frame ${zoomState.active ? "zoom-active" : ""}`}
          onMouseMove={handleImageMove}
          onMouseLeave={handleImageLeave}
        >
          <img src={product.image} alt={product.title} />

          <div
            className="zoom_lens"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
            }}
          />
        </div>

        <div className="product_info">

          <h1>{product.title}</h1>

          <div className="price">{product.price} ₽</div>

          <p className="desc">{product.description}</p>

          <div className="purchase_actions">
            <a
              href={getOrderLink(TELEGRAM_URL)}
              className="purchase_btn primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Купить в Telegram
            </a>

            {MAX_URL && (
              <a
                href={getOrderLink(MAX_URL)}
                className="purchase_btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Купить в MAX
              </a>
            )}

            <a href={`tel:${PRIMARY_PHONE}`} className="purchase_btn secondary">
              Позвонить: {PRIMARY_PHONE_LABEL}
            </a>
          </div>

          <div className="attrs">

            <div>Состав: {product.composition}</div>
            <div>Высота: {product.height}</div>
            <div>Тип: {product.type}</div>
            <div>Цвет: {product.color.join(", ") || "Уточняйте у менеджера"}</div>
            <div>Повод: {product.occasion.join(", ") || "Универсальный"}</div>

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

    </div>

  )
}

export default Product
