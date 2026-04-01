import { Trash } from "lucide-react";
import { useStore } from "../../useStore";
import "./style.scss";

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart_page">

      <h1 className="cart_title">Корзина</h1>

      {!cart.length ? (
        <div className="empty_state">
          Корзина пуста
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

                  <button
                    className="cart_item_remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash size={16} />
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="cart_item_quantity"
                    onChange={(e) =>
                      changeQuantity(item.id, e.target.value)
                    }
                  />

                </div>

              </div>
            ))}

          </div>

          <div className="cart_footer">

            <h2 className="cart_total">
              Итого: {total} руб.
            </h2>

            <button className="btn btn-primary cart_checkout">
              Оформить заказ
            </button>

          </div>
        </>
      )}

    </div>
  );
}
