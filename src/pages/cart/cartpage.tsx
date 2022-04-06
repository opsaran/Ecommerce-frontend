import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../contexts/authcontext";
import { useFullCart } from "../../hooks/usefullcart";
import CartQuantity from "./cartquantity";
export default function CartPage() {
  const { fullCart } = useFullCart();
  const navigate = useNavigate();
  const { user } = useContext(authContext);
  return (
    <>
      {user.active ? (
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
                    <CartQuantity
                      productId={product._id._id}
                      defaultQuantity={product.quantity}
                      price={product._id.price}
                    />
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
                  {fullCart.products.reduce((total, obj) => {
                    return (total = total + obj._id.price * obj.quantity);
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
                  {fullCart.products.reduce((total, obj) => {
                    return (total = total + obj._id.price * obj.quantity);
                  }, 0)}
                </span>
              </div>
            </div>
            <button>CHECK OUT</button>
          </div>
        </div>
      ) : (
        navigate({ pathname: "/" })
      )}
    </>
  );
}
