import { Helmet } from "react-helmet"
import {
  EMAIL,
  PRIMARY_PHONE,
  PRIMARY_PHONE_LABEL,
  SECONDARY_PHONE,
  SECONDARY_PHONE_LABEL,
  SHOP_CITY,
  SHOP_NAME,
  SHOP_REGION,
  TELEGRAM_URL,
} from "@/constants/shop"
import "./style.scss"

export default function ContactsPage() {
  return (
    <main className="contacts_page">
      <Helmet>
        <title>Контакты | {SHOP_NAME}</title>
        <meta
          name="description"
          content="Контакты цветочного магазина Флоркет. Заказ букетов по телефону и онлайн."
        />
      </Helmet>

      <section className="contacts_header">
        <h1>Контакты</h1>
        <p>
          Быстро отвечаем по заказам и доставке по {SHOP_CITY}. Удобнее всего
          написать в Telegram или позвонить.
        </p>
      </section>

      <section className="contacts_grid">
        <article className="contacts_card">
          <h2>Телефоны</h2>
          <a href={`tel:${PRIMARY_PHONE}`}>{PRIMARY_PHONE_LABEL}</a>
          <a href={`tel:${SECONDARY_PHONE}`}>{SECONDARY_PHONE_LABEL}</a>
          <p className="contacts_note">Ежедневно: 08:00 - 22:00</p>
        </article>

        <article className="contacts_card">
          <h2>Онлайн</h2>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <p className="contacts_note">Принимаем заявки и уточнения по составу букета.</p>
        </article>

        <article className="contacts_card wide">
          <h2>Регион работы</h2>
          <p>
            Доставляем цветы по {SHOP_REGION}. Основная зона обслуживания - {SHOP_CITY}.
          </p>
          <p>
            Если адрес за пределами МКАД, менеджер заранее согласует время и стоимость
            доставки.
          </p>
        </article>
      </section>
    </main>
  )
}
