export interface featuredProductInterface {
  _id: string;
  seller: string;
  title: string;
  description: string;
  inStock: boolean;
  expiryTime: string;
  category: string;
  price: number;
  defaultQuantity: string;
  images: { name: string; type: string; size: number; base64: string }[];
}

export interface productLocationState {
  product: featuredProductInterface;
}

export interface chosenProduct {
  isChosen: boolean;

  quantity: number;
}
