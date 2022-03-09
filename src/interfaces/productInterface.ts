export interface featuredProductInterface {
  _id: string;
  title: string;
  description: string;
  inStock: boolean;
  expiryTime: string;
  catagory: string;
  price: number;
  images: {
    image1: string;
    image2: string;
    image3: string;
  };
}

export interface productLocationState {
  product: featuredProductInterface;
}

export interface chosenProduct {
  isChosen: boolean;
  product: featuredProductInterface;
  quantity: number;
}
