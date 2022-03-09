import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import firstpic from "../../assets/images/firstpic.png";
import secondpic from "../../assets/images/secondpic.png";
import axiosInstance from "../../utils/axiosInstance";
import { featuredProductInterface } from "../../interfaces/productInterface";

// const initialProducts = [
//   {
//     _id: "",
//     title: "",
//     description: "",
//     inStock: false,
//     expiryTime: "",
//     catagory: "",
//     price: 0,
//     images: {
//       image1: "",
//       image2: "",
//       image3: "",
//     },
//   },
// ];
enum ACTION_TYPE {
  addProducts = "addProducts",
}

function myReducer(
  featuredProducts: featuredProductInterface[],
  action: { type: ACTION_TYPE; products: featuredProductInterface[] }
) {
  switch (action.type) {
    case ACTION_TYPE.addProducts:
      return [...featuredProducts, ...action.products];
    default:
      throw new Error("I don't know man!");
  }
}

// const initialProduct = []

function Featured(): JSX.Element {
  const [featuredProducts, dispatch] = useReducer(myReducer, []);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get("/featuredproducts");
        console.log("kinda successfull", response.data.featuredProducts);
        if (response) {
          dispatch({
            type: ACTION_TYPE.addProducts,
            products: response.data.featuredProducts,
          });
        }
      } catch (error: any) {
        console.log("Something went wrong: ", error.response.data.message);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="featured-section">
      <h2>Featured Products</h2>
      <ul className="featured-products">
        {featuredProducts.map((product, index) => {
          return (
            <li className="product" key={index}>
              <Link to={`/product/${product._id}`} state={{ product }}>
                <img
                  src={product.images.image1}
                  alt="productpic1"
                  className="product-imageComponent"
                />

                <div className="product-metaInfo">
                  <h3>MRP: Rs. {product.price}</h3>
                  <p>{product.title}</p>
                  <p style={{ fontSize: "0.9rem" }}>1 Unit</p>
                </div>
              </Link>
              <div className="product-action">
                <button>Add to cart</button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Featured;
