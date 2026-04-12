import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, Phone, ShoppingCart, Car } from "lucide-react";
import "./style.scss";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (event, to) => {
    event.preventDefault();

    if (location.pathname === to) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }

    navigate(to);
  };

  return (
    <nav className="mobile-bottom-nav">
      <NavLink to="/" className="nav-item" onClick={(event) => handleNavClick(event, "/")}>
        <Home size={22} />
        <span>Главная</span>
      </NavLink>

      <NavLink
        to="/favorites"
        className="nav-item"
        id="mobile-favorites-icon"
        onClick={(event) => handleNavClick(event, "/favorites")}
      >
        <Heart size={22} />
        <span>Избранное</span>
      </NavLink>

      <NavLink
        to="/cart"
        className="nav-item"
        id="mobile-cart-icon"
        onClick={(event) => handleNavClick(event, "/cart")}
      >
        <ShoppingCart size={22} />
        <span>Корзина</span>
      </NavLink>

      <NavLink to="/contacts" className="nav-item" onClick={(event) => handleNavClick(event, "/contacts")}>
        <Phone size={22} />
        <span>Контакты</span>
      </NavLink>

      <NavLink to="/delivery" className="nav-item" onClick={(event) => handleNavClick(event, "/delivery")}>
        <Car size={22} />
        <span>Доставка</span>
      </NavLink>

    </nav>
  )
}
