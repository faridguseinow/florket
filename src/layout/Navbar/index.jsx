import { useState, useEffect, useRef } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Search } from 'lucide-react'
import { useStore } from '../../useStore'
import {
  EMAIL,
  PRIMARY_PHONE,
  PRIMARY_PHONE_LABEL,
  SECONDARY_PHONE,
  SECONDARY_PHONE_LABEL,
  TELEGRAM_URL,
} from '@/constants/shop'

const getRecentSearch = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem("recentSearch"))
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const Navbar = () => {

  const { products } = useStore()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  const [search, setSearch] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const [recent, setRecent] = useState(getRecentSearch)

  // 🔍 подсказки
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([])
      return
    }

    setSuggestions(
      products
        .filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
        .slice(0, 10)
    )
  }, [search, products])

  // 🚀 поиск
  const handleSearch = (rawTerm = search) => {
    const term = rawTerm.trim()
    if (!term) return

    const updated = [
      term,
      ...recent.filter(r => r !== term)
    ].slice(0, 3)

    localStorage.setItem("recentSearch", JSON.stringify(updated))
    setRecent(updated)
    setSearch(term)

    setIsFocused(false)
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  // ⌨️ Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch()
  }

  // ❌ клик вне
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header>

      <div className="top_links">
        <div className="top_links_inner">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={`tel:${PRIMARY_PHONE}`}>{PRIMARY_PHONE_LABEL}</a>
          <a href={`tel:${SECONDARY_PHONE}`}>{SECONDARY_PHONE_LABEL}</a>
        </div>

        <div className="top_links_menu">
          <Link to="/delivery">Доставка</Link>
          <Link to="/contacts">Контакты</Link>
        </div>
      </div>

      <div className="navbar">
        <div className="nav_inner">

          <Link to="/" className="logo">
            ФЛОРКЕТ
          </Link>

          <div className="search" ref={searchRef}>

            <input
              type="text"
              placeholder="Поиск на сайте..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
            />

            <button className="search_button" onClick={handleSearch}>
              <Search size={16} />
            </button>

            {isFocused && (
              (search && suggestions.length > 0) ||
              (!search && recent.length > 0)
            ) && (
              <div className="search_dropdown">

                {search && suggestions.map(item => (
                  <div
                    key={item.id}
                    className="search_item"
                    onClick={() => {
                      handleSearch(item.title)
                    }}
                  >
                    {item.title}
                  </div>
                ))}

                {!search && recent.length > 0 && (
                  <>
                    <div className="search_label">Недавние</div>

                    {recent.map((item, i) => (
                      <div
                        key={i}
                        className="search_item"
                        onClick={() => {
                          setSearch(item)
                          navigate(`/search?q=${encodeURIComponent(item)}`)
                          setIsFocused(false)
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </>
                )}

              </div>
            )}

          </div>

          <div className="nav_actions">

            <Link to="/favorites" className="nav_button">
              <Heart size={16} />
            </Link>

            <Link to="/cart" className="nav_button" id="cart-icon">
              <ShoppingCart size={16} />
            </Link>

            <a
              href={TELEGRAM_URL}
              className="order_btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Заказать
            </a>

          </div>

        </div>
      </div>

    </header>
  )
}

export default Navbar
