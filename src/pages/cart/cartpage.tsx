import React from "react";
import { useFullCart } from "../../hooks/usefullcart";
// import { fetchFullCart } from "../../components/cartmodal";

export default function CartPage() {
  const fullCart = useFullCart();
  return (
    <div className="cartpage">
      <h2>Your Cart</h2>
      <div className="cartpage-products-section">
        <div className="cartpage-products-section-top">
          <h3>DESCRIPTION</h3>
          <h3>QUANTITY</h3>
          <h3>PRICE</h3>
        </div>
        {fullCart &&
          fullCart.products.map((product, index) => {
            return (
              <div key={index} className="cartpage-product">
                <div>
                  <img src={product._id.images.image1} alt="productimage" />
                  <div>
                    <h4>{product._id.title}</h4>
                    <span style={{ color: "green" }}>
                      {product._id.inStock ? "InStock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <h5>{product.quantity}</h5>
                <h5>Rs. {product._id.price}</h5>
              </div>
            );
          })}
      </div>
      <div className="cartpage-bottom-right">
        <div>
          <div>
            <span>SUBTOTAL</span>
            <span>
              Rs.
              {fullCart.products.reduce((total, product) => {
                return (total = total + product._id.price * product.quantity);
              }, 0)}
            </span>
          </div>
          <div>
            <span>DELIVERY</span>
            <span>FREE</span>
          </div>
          <div>
            <span>Tax</span>
            <span>0</span>
          </div>
          <div>
            <span style={{ fontSize: "1.5rem" }}>TOTAL</span>
            <span style={{ fontSize: "1.5rem" }}>
              Rs.
              {fullCart.products.reduce((total, product) => {
                return (total = total + product._id.price * product.quantity);
              }, 0)}
            </span>
          </div>
        </div>
        <button>CHECK OUT</button>
      </div>
    </div>
  );
}
