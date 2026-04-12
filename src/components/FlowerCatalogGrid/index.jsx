import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { useStore } from "../../useStore"
import ProductCard from "@/components/ProductCard"
import "./style.scss"

const mixItems = (list) => {
  const result = [...list]

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

const FlowerCatalogGrid = ({ selectedSubcategory = "all" }) => {

  const { products, productsReady } = useStore()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [subcategory, setSubcategory] = useState("all")
  const [height, setHeight] = useState("all")
  const [color, setColor] = useState("all")
  const [occasion, setOccasion] = useState("all")
  const [type, setType] = useState("all")
  const [page, setPage] = useState(1)
  const catalogTopRef = useRef(null)
  const didMountRef = useRef(false)

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [heights, setHeights] = useState([])
  const [colors, setColors] = useState([])
  const [occasions, setOccasions] = useState([])
  const [types, setTypes] = useState([])

  useEffect(() => {
    setSubcategory(selectedSubcategory || "all")
  }, [selectedSubcategory])

  useEffect(() => {
    const clean = Array.isArray(products) ? products : []
    const mixed = mixItems(clean)

    setItems(mixed)
    setCategories([...new Set(clean.map(i => i.category).filter(Boolean))])
    setSubcategories([...new Set(clean.map(i => i.subcategory).filter(Boolean))])
    setHeights([...new Set(clean.map(i => i.height).filter(Boolean))])
    setTypes([...new Set(clean.map(i => i.type).filter(Boolean))])
    setColors([...new Set(clean.flatMap(i => i.color || []).filter(Boolean))])
    setOccasions([...new Set(clean.flatMap(i => i.occasion || []).filter(Boolean))])
    setLoading(!productsReady && !clean.length)
  }, [products, productsReady])

  const filtered = items.filter(item => {

    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false

    if (category !== "all" && item.category !== category) return false
    if (subcategory !== "all" && item.subcategory !== subcategory) return false
    if (height !== "all" && item.height !== height) return false
    if (type !== "all" && item.type !== type) return false

    if (color !== "all" && !item.color?.includes(color)) return false
    if (occasion !== "all" && !item.occasion?.includes(occasion)) return false

    return true
  })

  const ITEMS_PER_PAGE = 16
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginatedItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [search, category, subcategory, height, type, color, occasion])

  useEffect(() => {
    if (page <= totalPages) return
    setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    catalogTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, [page])

  const getPaginationTokens = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", totalPages]
    }

    if (page >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", page - 1, page, page + 1, "...", totalPages]
  }

  const tokens = getPaginationTokens()

  return (

    <div className="catalog" ref={catalogTopRef}>

      <div className="catalog_controls">

        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="filter_row">

          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">Категория</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={subcategory} onChange={e => setSubcategory(e.target.value)}>
            <option value="all">Подкатегория</option>
            {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={height} onChange={e => setHeight(e.target.value)}>
            <option value="all">Высота</option>
            {heights.map(h => <option key={h} value={h}>{h}</option>)}
          </select>

          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="all">Тип</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select value={occasion} onChange={e => setOccasion(e.target.value)}>
            <option value="all">Повод</option>
            {occasions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          <select value={color} onChange={e => setColor(e.target.value)}>
            <option value="all">Цвет</option>
            {colors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

        </div>

      </div>

      <div className="flower_catalog_grid">

        {loading
          ? [...Array(6)].map((_, i) => <ProductCard key={i} isLoading />)
          : paginatedItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))
        }

      </div>

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            className="pagination_nav"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>

          {tokens.map((token, index) => (
            token === "..."
              ? (
                <span className="pagination_dots" key={`dots-${index}`}>...</span>
              )
              : (
                <button
                  type="button"
                  key={token}
                  className={`pagination_page ${token === page ? "active" : ""}`}
                  onClick={() => setPage(token)}
                >
                  {token}
                </button>
              )
          ))}

          <button
            type="button"
            className="pagination_nav"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            {">"}
          </button>
        </div>
      )}

    </div>

  )
}

FlowerCatalogGrid.propTypes = {
  selectedSubcategory: PropTypes.string,
}

export default FlowerCatalogGrid
