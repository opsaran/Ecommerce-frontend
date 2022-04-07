import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
// import firstpic from "../../assets/images/firstpic.png";
// import secondpic from "../../assets/images/secondpic.png";
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
  emptyProducts = "emptyProducts",
}

function myReducer(
  featuredProducts: featuredProductInterface[],
  action: { type: ACTION_TYPE; products: featuredProductInterface[] }
) {
  switch (action.type) {
    case ACTION_TYPE.addProducts:
      return [...featuredProducts, ...action.products];
    case ACTION_TYPE.emptyProducts:
      return [];
    default:
      throw new Error("I don't know man!");
  }
}

// const initialProduct = []

function Featured(): JSX.Element {
  const [featuredProducts, dispatch] = useReducer(myReducer, []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axiosInstance.get(
          `/featuredproducts?page=${page}`
        );
        console.log("kinda successfull", response.data);
        if (response) {
          setLoading(false);
          setTotalPages(response.data.pagination.totalPages);
          dispatch({
            type: ACTION_TYPE.addProducts,
            products: response.data.featuredProducts,
          });
        }
      } catch (error: any) {
        setLoading(false);
        if (error.response) {
          setErrors(error.response.data.message);
        } else if (error.toJSON().message === "Network Error") {
          setErrors(error.toJSON().message);
        }
      }
    }
    fetchProducts();
  }, [page]);

  if (loading) {
    return <p id="feturedSection_id">Loading....</p>;
  }

  if (errors) {
    return <p id="feturedSection_id">{errors}</p>;
  }

  return (
    <section className="featured-section" id="feturedSection_id">
      <h2>Featured Products</h2>
      <ul className="featured-products">
        {featuredProducts.map((product) => {
          return (
            <li className="product" key={product._id}>
              <Link to={`/product/${product._id}`} state={{ product }}>
                <img
                  src={product.images[0].base64}
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

      <button
        disabled={page === totalPages}
        onClick={() => {
          setPage((p) => {
            if (p === totalPages) return p;
            return p + 1;
          });
        }}
      >
        Show More
      </button>
    </section>
  );
}

export default Featured;
