import React from "react";
import "./style.scss";

const FlowerCatalogGrid = ({ items }) => {
  if (!items || !Array.isArray(items)) {
    return <p className="error-message">Нет данных для отображения.</p>;
  }

  return (
    <div className="flower-grid">
      {items.map((item) => (
        <div className="flower-card" key={item.id}>
          <div className="flower-image">
            <img src={item.images[0].img} alt={item.name} />
          </div>
          <div className="flower-info">
            <h3 className="flower-name">{item.name}</h3>
            <p className="flower-description">{item.description}</p>
            <p className="flower-price">
              {item.price} {item.currency}
            </p>
            <p className="flower-time">
              ⏱ Время подготовки: {item.preparationTime}
            </p>
            <ul className="flower-assortment">
              {item.assortment.map((flower, index) => (
                <li key={index}>{flower}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowerCatalogGrid;
