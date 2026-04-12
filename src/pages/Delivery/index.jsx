import { Helmet } from "react-helmet"
import {
  SHOP_NAME,
  SHOP_REGION,
} from "@/constants/shop"
import "./style.scss"

export default function DeliveryPage() {
  return (
    <main className="delivery_page">
      <Helmet>
        <title>Доставка и оплата | {SHOP_NAME}</title>
        <meta
          name="description"
          content="Условия доставки и оплаты Флоркет по Москве и области."
        />
      </Helmet>

      <section className="delivery_header">
        <h1>Доставка и оплата</h1>
        <p>
          Работаем по {SHOP_REGION}. Ниже актуальные условия доставки для московского рынка.
        </p>
      </section>

      <section className="delivery_grid">
        <article className="delivery_card">
          <h2>Зоны и стоимость доставки</h2>
          <ul>
            <li>В пределах МКАД: от 390 руб.</li>
            <li>За МКАД до 10 км: от 690 руб.</li>
            <li>За МКАД 10-25 км: от 990 руб.</li>
            <li>Точная стоимость зависит от адреса и времени доставки.</li>
          </ul>
        </article>

        <article className="delivery_card">
          <h2>Сроки и интервалы</h2>
          <ul>
            <li>Стандартная доставка: 2-4 часа.</li>
            <li>Срочная доставка в день заказа: от 90 минут (при наличии свободного курьера).</li>
            <li>Можно выбрать удобный интервал: 10:00-14:00, 14:00-18:00, 18:00-22:00.</li>
          </ul>
        </article>

        <article className="delivery_card wide">
          <h2>Оплата и важные условия</h2>
          <ul>
            <li>Оплата онлайн картой, переводом или по ссылке от менеджера.</li>
            <li>Перед отправкой можем прислать фото готового букета.</li>
            <li>Если получатель недоступен, согласуем замену времени доставки с заказчиком.</li>
            <li>В праздничные дни возможны изменения интервалов и стоимости, менеджер предупреждает заранее.</li>
          </ul>
        </article>
      </section>
    </main>
  )
}
