import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import authContext from "../../contexts/authcontext";
import { useFullCart } from "../../hooks/usefullcart";
import axiosInstance from "../../utils/axiosInstance";

interface propsInterface {
  productId: string;
  defaultQuantity: number;
  price: number;
}

export default function CartQuantity({
  productId,
  defaultQuantity,
  price,
}: propsInterface) {
  const { setFullCart } = useFullCart();
  const { user } = useContext(authContext);

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    updateCart(Number(e.target.value));
  }

  async function updateCart(quant: number) {
    try {
      const response = await axiosInstance.put(
        `/cart/editProductInCart/${user.cart._id}`,
        {
          product: {
            product: productId,
            quantity: quant,
          },
        }
      );

      if (response) {
        setFullCart(response.data.fullCart);
      }
    } catch (error: any) {
      console.log("Error occured while updating quanity: ", error.response);
    }
  }

  return (
    <>
      <select value={defaultQuantity} onChange={handleSelectChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <h5>Rs. {price * defaultQuantity}</h5>
    </>
  );
}
