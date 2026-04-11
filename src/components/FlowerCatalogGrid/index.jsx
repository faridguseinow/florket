import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStore } from "../../useStore"
import ProductCard from "@/components/ProductCard"
import "./style.scss"

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

    setItems(clean)
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

  return (

    <div className="catalog">

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
          : filtered.map(item => (
            <ProductCard key={item.id} product={item} />
          ))
        }

      </div>

    </div>

  )
}

FlowerCatalogGrid.propTypes = {
  selectedSubcategory: PropTypes.string,
}

export default FlowerCatalogGrid
