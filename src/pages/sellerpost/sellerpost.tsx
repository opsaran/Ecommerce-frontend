import React, { ChangeEvent, useRef, useState } from "react";

export default function SellerPost() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const formDataInitial = {
    title: "",
    description: "",
    price: 0,
    category: "fashion",
    expiryTime: "none",
    defaultQuantity: "1 kg",
    inStock: true,
  };
  //   interface formDataInterface {
  //     title: string;
  //     description: string;
  //     price: number;
  //     category: string;
  //     expiryTime: string;
  //     defaultQuantity: string;
  //     inStock: boolean;
  //   }
  const [formData, setFormData] =
    useState<typeof formDataInitial>(formDataInitial);

  function handleChange(
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function submitHandler(e: any) {
    e.preventDefault();
    console.log("Somebody is trying to submit the form: ", formData);
    if (inputFileRef.current?.files && inputFileRef.current.files.length <= 0) {
      alert("Please select at least one image");
    }
    if (inputFileRef.current?.files && inputFileRef.current.files.length <= 3) {
      let totalSize = 0;
      for (let i = 0; i < inputFileRef.current.files.length; i++) {
        totalSize += inputFileRef.current.files[i].size;
      }
      if (totalSize > 3145728) {
        alert("Files are too large, combined size should be less than 3 MB");
      } else {
      }

      console.log("Namess of files: ", inputFileRef.current?.files);
    } else if (
      inputFileRef.current?.files &&
      inputFileRef.current.files.length > 3
    ) {
      alert("Please only select 3 images");
    }
  }
  return (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit saepe
        perferendis, ex, dolorem ducimus id mollitia quae, consequatur est sit
        iure ipsa blanditiis labore sint. Sit ipsum, officia excepturi
        recusandae ex quam! Deserunt, vitae autem? Alias aliquid, ea cupiditate
        voluptate esse, veritatis doloribus eum quia minus animi obcaecati
        temporibus? Nesciunt?
      </p>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="titleInput">Title</label>
          <input
            name="title"
            required
            id="titleInput"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description</label>
          <textarea
            id="descriptionInput"
            name="description"
            required
            cols={30}
            rows={10}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="priceInput">Price</label>
          <input
            name="price"
            required
            id="priceInput"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categorySelect">Category</label>
          <select id="categorySelect" name="category" onChange={handleChange}>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="grocery">Grocery</option>
            <option value="book">Book</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <div>
          <label htmlFor="expiryInput">Expiry Time in shelf</label>
          <select id="expiryInput" name="expiryTime" onChange={handleChange}>
            <option value="none">None</option>
            <option value="1 month">1 Month</option>
            <option value="2 month">2 Month</option>
            <option value="3 month">3 Month</option>
            <option value="4 month">4 Month</option>
            <option value="5 month">5 Month</option>
            <option value="6 month">6 Month</option>
          </select>
        </div>
        <div>
          <label htmlFor="defquant">Default Quantity</label>
          <select id="defquant" name="defaultQuantity" onChange={handleChange}>
            <option value="1 kg">1 Kg</option>
            <option value="1 litre">1 Litre</option>
            <option value="1 unit">1 Unit</option>
          </select>
        </div>
        <div>
          <label htmlFor="instockInput">Is the Item in Stock?</label>
          <select id="instockInput" name="inStock" onChange={handleChange}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="imagesInput">Add Images:</label>
          <input
            type="file"
            multiple
            name="images"
            ref={inputFileRef}
            accept="image/*"
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
