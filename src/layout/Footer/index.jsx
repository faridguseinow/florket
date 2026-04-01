import "./style.scss"
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
            <li><a href="#">О нас</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
            <li><a href="#">Политика конфиденциальности</a></li>
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
        {/* <a href="https://faridguseinow.framer.website/" target="_blank" rel="noopener noreferrer">
          Создание сайта - Гусейнов Фарид
        </a> */}
      </div>
    </footer>
  )
}
