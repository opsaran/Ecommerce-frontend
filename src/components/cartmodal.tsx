import React from "react";
import { useNavigate } from "react-router-dom";
import { useFullCart } from "../hooks/usefullcart";

export default function CartModal() {
  const { fullCart } = useFullCart();

  const navigate = useNavigate();

  return (
    <div className="bg-cartmodal">
      <div className="cartmodal">
        <div className="cartmodal-top">
          <h2>Cart</h2>
          <button onClick={() => navigate(-1)}>Close</button>
        </div>

        <div>
          {fullCart.products.length > 0 &&
            fullCart.products.map((product, index) => {
              return (
                <div key={index} className="cartmodal-product">
                  <img src={product._id.images.image1} alt="" />
                  <h4>{product._id.title}</h4>
                  <h5>{product.quantity} Kg</h5>
                </div>
              );
            })}
        </div>
        <button
          onClick={() => navigate({ pathname: "/cart" })}
          className="cartmodal-bottom-button"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}
