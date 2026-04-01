import { Helmet } from "react-helmet";
import {
  EMAIL,
  PRIMARY_PHONE_LABEL,
  SECONDARY_PHONE_LABEL,
  SHOP_NAME,
} from "@/constants/shop";

export default function ContactsPage() {
  return (
    <div>
      <Helmet>
        <title>Контакты | {SHOP_NAME}</title>
        <meta
          name="description"
          content="Контакты цветочного магазина Флоркет. Заказ букетов по телефону и онлайн."
        />
      </Helmet>

      <h1>Контакты</h1>

      <p>Телефон: {PRIMARY_PHONE_LABEL}</p>
      <p>Телефон: {SECONDARY_PHONE_LABEL}</p>
      <p>Email: {EMAIL}</p>

      <h2>Адрес</h2>
      <p>Москва, Россия</p>

      <h2>О компании</h2>
      <p>
        Флоркет — онлайн-магазин цветов с доставкой по Москве и области.
      </p>
    </div>
  );
}
