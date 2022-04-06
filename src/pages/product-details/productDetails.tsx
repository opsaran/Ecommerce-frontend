import React, { MouseEvent, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authContext from "../../contexts/authcontext";
// import firstone from "../../assets/images/firstpic.png";
// import secondpic from "../../assets/images/secondpic.png";
import {
  chosenProduct,
  productLocationState,
  featuredProductInterface,
} from "../../interfaces/productInterface";
import axiosInstance from "../../utils/axiosInstance";
function ProductDetails() {
  const { user, setUser } = useContext(authContext);
  const { id } = useParams();
  const location = useLocation();

  // const { product } = location.state as productLocationState;
  const [product, setProduct] = useState<featuredProductInterface>();
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();

  const locationProduct = location.state as productLocationState;
  useEffect(() => {
    if (locationProduct) {
      setProduct(locationProduct.product);
      setCurrentImage(locationProduct.product.images[0].base64);
    } else {
      async function fetchProduct() {
        try {
          const productData = await axiosInstance.get(`/product/${id}`);
          console.log("we got the product back: ", productData.data.product);
          setProduct(productData.data.product);
          setCurrentImage(productData.data.product.images.image1);
        } catch (error) {
          console.log("could not find the product bro");
          navigate({ pathname: "/" });
        }
      }
      fetchProduct();
    }
  }, []);
  // console.log("Okay:", id);
  // console.log("This is what you wanted me to send:", product);

  const [chosenQuantity, setChosenQuantity] = useState<number>(1);
  const [chosenProduct, setChosenProduct] = useState<chosenProduct>({
    isChosen: false,

    quantity: 1,
  });
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);

  useEffect(() => {
    if (!user.active && window.sessionStorage.getItem("cartItem")) {
      setIsProductInCart(true);
      setChosenProduct(
        JSON.parse(window.sessionStorage.getItem("cartItem") as any)
      );
    } else {
      setIsProductInCart(
        user.cart?.products.some((prod: any) => prod._id === id)
      );
    }
  }, [user]);
  const handleImageChange = (e: MouseEvent<HTMLDivElement>) => {
    //e.target has a type of EventTarget
    const targetButton = (e.target as Element).closest("button");
    if (!targetButton) return;
    //removing the class from all buttons
    const imageButtons = Array.from(e.currentTarget.children);
    imageButtons.forEach((button) => {
      button.classList.remove("current-product-image");
    });
    //adding the class on clicked button

    targetButton.classList.add("current-product-image");

    if (!Array.from(targetButton.children)[0].getAttribute("src")) return;
    setCurrentImage(
      Array.from(targetButton.children)[0].getAttribute("src") as string
    );
  };

  useEffect(() => {
    if (chosenProduct.isChosen && !user.active) {
      window.sessionStorage.setItem("cartItem", JSON.stringify(chosenProduct));
      setIsProductInCart(true);
    } else if (chosenProduct.isChosen && user.active && user.cart) {
      console.log("cartId exists: ", user.cart);
      async function addProductToCart() {
        try {
          const response = await axiosInstance.post(
            `/cart/addtocart/${user.cart._id}`,
            {
              products: [
                {
                  product: id,
                  quantity: chosenProduct.quantity,
                },
              ],
            }
          );
          setUser((user: any) => (user["cart"] = response.data.cart));
          console.log("new product added to cart: ", response.data);
        } catch (error: any) {
          console.log(
            "error while adding a new product to cart: ",
            error.response
          );
        }
      }
      addProductToCart();
    }
  }, [chosenProduct]);

  return (
    <>
      {product ? (
        <div className="product-details">
          <div className="product-images-area">
            <div className="product-image-options" onClick={handleImageChange}>
              {product.images.map((imgData) => (
                <button
                  className="current-product-image"
                  key={`${imgData.size}${imgData.name}`}
                >
                  <img src={imgData.base64} alt="productpic" />
                </button>
              ))}
            </div>
            <div className="product-image">
              <img src={currentImage} alt="productpic" />
            </div>
          </div>
          <div className="product-fullDetails">
            <h2>{product.title}</h2>
            <h3>({product.inStock ? "In Stock" : "Not in Stock"})</h3>
            <hr />
            <div className="product-price">
              <h2>Rs {product.price}</h2>
              <p>(Inclusive of all taxes)</p>
            </div>

            <div className="product-quantity">
              <h3>Select Quantity:</h3>
              <div>
                <button
                  onClick={() =>
                    setChosenQuantity((chosenQuantity) => chosenQuantity - 1)
                  }
                >
                  -
                </button>
                <span>
                  {chosenQuantity < 1 ? setChosenQuantity(1) : chosenQuantity}{" "}
                  Kg
                </span>
                <button
                  onClick={() =>
                    setChosenQuantity((chosenQuantity) => chosenQuantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button
                onClick={(e) => {
                  setChosenProduct({
                    isChosen: true,
                    quantity: chosenQuantity,
                  });
                }}
                className={isProductInCart ? "product-is-in-cart" : ""}
              >
                {isProductInCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button>Buy Now</button>
            </div>

            <div className="delivery-option">
              <h3>DELIVERY OPTIONS:</h3>
              <div className="input-wrapper">
                <label htmlFor="pincodeinput">Pincode:</label>
                <input
                  id="pincodeinput"
                  className="textinput"
                  required
                  type="text"
                  name="pincode"
                />
              </div>
              <p>*Please enter PIN code to check delivery time</p>
            </div>
            <div className="product-features">
              <div>
                <h3>Key Features</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-desclaimer">
                <h3>Desclaimer:</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi doloribus recusandae atque eligendi facilis inventore.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ProductDetails;
