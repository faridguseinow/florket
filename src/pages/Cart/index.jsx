import { Trash } from "lucide-react"
import { Link } from "react-router-dom"
import { useStore } from "../../useStore"
import {
  MAX_URL,
  PRIMARY_PHONE,
  TELEGRAM_URL,
} from "@/constants/shop"
import { buildCartMessage } from "@/lib/products"
import "./style.scss"

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useStore()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const orderMessage = encodeURIComponent(buildCartMessage(cart, total))
  const getOrderLink = (baseUrl) => `${baseUrl}?text=${orderMessage}`

  return (
    <div className="cart_page">

      <div className="cart_heading">
        <h1 className="cart_title">Корзина</h1>
        <p>{cart.length ? `Товаров в корзине: ${cart.length}` : "Добавьте букет, чтобы оформить заказ"}</p>
      </div>

      {!cart.length ? (
        <div className="cart_empty_card">
          <h3>Корзина пока пуста</h3>
          <p>Выберите понравившийся букет и вернитесь сюда для оформления заказа.</p>
          <Link to="/" className="cart_cta">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="cart_list">

            {cart.map((item) => (
              <div className="cart_item" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart_item_image"
                />

                <div className="cart_item_info">
                  <h3 className="cart_item_title">{item.name}</h3>
                  <p className="cart_item_price">{item.price} руб.</p>
                </div>

                <div className="cart_item_actions">

                  <label className="quantity_control">
                    <span>Кол-во</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="cart_item_quantity"
                      onChange={(e) =>
                        changeQuantity(item.id, e.target.value)
                      }
                    />
                  </label>

                  <button
                    className="cart_item_remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Удалить товар"
                  >
                    <Trash size={16} />
                    Удалить
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="cart_footer">

            <h2 className="cart_total">
              Итого: {total} руб.
            </h2>

            <div className="cart_order_actions">
              <span className="cart_order_label">Оформить заказ через:</span>

              <a
              href={getOrderLink("https://t.me/florketcveti")}
                className="cart_checkout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>

              {MAX_URL ? (
                <a
                  href={getOrderLink(MAX_URL)}
                  className="cart_checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MAX
                </a>
              ) : (
                <button type="button" className="cart_checkout disabled" disabled>
                  MAX
                </button>
              )}

              <a href={`tel:${PRIMARY_PHONE}`} className="cart_checkout">
                Позвонить
              </a>
            </div>

          </div>
        </>
      )}

    </div>
  )
}
