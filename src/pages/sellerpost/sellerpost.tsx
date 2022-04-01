import { AxiosError, AxiosRequestConfig } from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

interface imageDataInterface {
  name: string;
  type: string;
  size: number;
  base64: any;
}
interface formDataInterface {
  title: string;
  description: string;
  price: number;
  category: string;
  expiryTime: string;
  defaultQuantity: string;
  inStock: boolean;
  images?: imageDataInterface[];
}
export default function SellerPost() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  // const [files, setFiles] = useState<any>([]);

  const formDataInitial = {
    title: "",
    description: "",
    price: 0,
    category: "fashion",
    expiryTime: "none",
    defaultQuantity: "1 kg",
    inStock: true,
  };

  const [formData, setFormData] = useState<formDataInterface>(formDataInitial);
  const [progress, setProgress] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  function handleChange(
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  }

  //new func

  async function submitHandler(e: any) {
    e.preventDefault(); //preventing default refresh behaviour
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
        let imagesWithBase64: imageDataInterface[] = [];

        const files = inputFileRef.current.files;
        const length = files.length;
        const imgPromise = new Promise((resolve, reject) => {
          for (let i = 0; i < length; i++) {
            const reader = new FileReader();
            reader.onload = function () {
              imagesWithBase64.push({
                name: files[i].name,
                type: files[i].type,
                size: files[i].size,
                base64: (reader.result as unknown as string).split(",")[1],
              });
              if (i === length - 1) {
                //resolving in the end
                return resolve(imagesWithBase64);
              }
            };
            reader.readAsDataURL(files[i]);
            reader.onerror = function (error) {
              return reject(error);
            };
          }
        });

        imgPromise
          .then((val: any) => {
            setFormData((prevState) => {
              prevState.images = val;
              return { ...prevState };
            });
          })
          .catch((error) => console.log(error));
      }

      console.log("Namess of files: ", inputFileRef.current?.files);
    } else if (
      inputFileRef.current?.files &&
      inputFileRef.current.files.length > 3
    ) {
      alert("Please only select 3 images");
    }
  }

  useEffect(() => {
    console.log("fulldata images changed", formData.images);
    if (formData.images) {
      setSubmitting(true);
      async function fetch() {
        try {
          const config: AxiosRequestConfig = {
            onUploadProgress: function (progressEvent) {
              const percentComplete = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentComplete);
            },
          };

          const response = await axiosInstance.post(
            "/seller/createproduct",
            formData,
            config
          );
          console.log("we got back this response: ", response.data);
        } catch (error: any) {
          console.log(
            "oh erro back: ",
            error.response.data.error.fieldErrors.body
          );
          setErrors(error.response.data.error.fieldErrors.body);
          setTimeout(() => {
            setErrors([]);
          }, 4000);
        } finally {
          setSubmitting(false);
          setProgress(0);
        }
      }
      fetch();
    }
  }, [formData.images]);

  const errorElmRef = useRef<HTMLParagraphElement>(null);

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
            onChange={handlePriceChange}
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
        {submitting && <p>Progress: {progress}</p>}
        <button type="submit">Submit</button>
      </form>
      {errors && <p>{errors[0]}</p>}
    </div>
  );
}
