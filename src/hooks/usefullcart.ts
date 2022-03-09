import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/authcontext";
import axiosInstance from "../utils/axiosInstance";

export interface Images {
  image1: string;
  image2: string;
  image3: string;
}

export interface Id {
  images: Images;
  _id: string;
  title: string;
  inStock: boolean;
  price: number;
}

export interface Product {
  _id: Id;
  quantity: number;
}

export interface fullCartInterface {
  _id: string;
  user: string;
  products: Product[];
}
export function useFullCart() {
  const { user } = useContext(authContext);
  const [fullCart, setFullCart] = useState<fullCartInterface>({
    _id: "",
    products: [],
    user: "",
  });
  useEffect(() => {
    console.log("in useFullCart hook, useEffect: ", user);
    if (user.active && user.cart) {
      console.log("user.active && user.cart true if");
      async function fetchFullCart() {
        try {
          const fullCartData = await axiosInstance.get(
            `/cart/fullcart/${user.cart._id}`
          );
          console.log("fullCartData: ", fullCartData);
          if (fullCartData) {
            setFullCart(fullCartData.data.fullCart);
          }
        } catch (error: any) {
          console.log("cartData error: ", error);
        }
      }
      fetchFullCart();
    }
  }, [user]);
  return fullCart;
}
