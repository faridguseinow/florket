import "./style.scss"
import { Link } from "react-router-dom"
import {
  EMAIL,
  MAX_URL,
  PRIMARY_PHONE_LABEL,
  SECONDARY_PHONE_LABEL,
  TELEGRAM_URL,
} from "@/constants/shop"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        {/* 1. Бренд */}
        <div className="footer__col">
          <h2 className="footer__logo">ФЛОРКЕТ</h2>
          <p className="footer__text">
            Доставка свежих цветов по Москве и области. 
            Быстро, качественно и с гарантией.
          </p>
        </div>

        {/* 2. Каталог */}
        <div className="footer__col">
          <h3 className="footer__title">Каталог</h3>
          <ul>
            <li><a href="#">Букеты</a></li>
            <li><a href="#">Розы</a></li>
            <li><a href="#">Тюльпаны</a></li>
            <li><a href="#">Подарки</a></li>
          </ul>
        </div>

        {/* 3. Информация */}
        <div className="footer__col">
          <h3 className="footer__title">Информация</h3>
          <ul>
            <li><Link to="/delivery">Доставка</Link></li>
            <li><Link to="/contacts">Контакты</Link></li>
            <li><Link to="/privacy">Политика конфиденциальности</Link></li>
            <li><Link to="/terms">Пользовательское соглашение</Link></li>
            <li><Link to="/cookies">Cookie</Link></li>
          </ul>
        </div>

        {/* 4. Контакты */}
        <div className="footer__col">
          <h3 className="footer__title">Контакты</h3>
          <p>{PRIMARY_PHONE_LABEL}</p>
          <p>{SECONDARY_PHONE_LABEL}</p>
          <p>{EMAIL}</p>
          <p>Ежедневно: 08:00 – 22:00</p>

          <div className="footer__socials">
            {MAX_URL ? (
              <a href={MAX_URL} target="_blank" rel="noopener noreferrer">MAX</a>
            ) : null}
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="#">Вконтакте</a>
          </div>
        </div>

      </div>

      {/* Нижняя линия */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Флоркет. Все права защищены.</p>
        <div className="footer__legal_links">
          <Link to="/privacy">Политика конфиденциальности</Link>
          <Link to="/terms">Пользовательское соглашение</Link>
          <Link to="/cookies">Cookie</Link>
        </div>
      </div>
    </footer>
  )
}
