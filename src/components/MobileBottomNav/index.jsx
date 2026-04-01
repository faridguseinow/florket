import { NavLink } from "react-router-dom";
import { Home, Heart, Phone, ShoppingCart } from "lucide-react";
import "./style.scss";

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className="nav-item">
        <Home size={22} />
        <span>Главная</span>
      </NavLink>

      <NavLink to="/favorites" className="nav-item">
        <Heart size={22} />
        <span>Избранное</span>
      </NavLink>

      <NavLink to="/cart" className="nav-item">
        <ShoppingCart size={22} />
        <span>Корзина</span>
      </NavLink>

      <NavLink to="/contacts" className="nav-item">
        <Phone size={22} />
        <span>Контакты</span>
      </NavLink>

    </nav>
  )
}