import { Order } from "./pages/orders/types";

export type Photo = {
  id: number;
  url: string;
};

export type Manufacturer = {
  id: number;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  width: number;
  breadth: number;
  height: number;
  price: number;
  // count: number;  diploma??
  manufacturer: Manufacturer;
  category: Category;
  photos: Photo[];
  comments: Comment[];
};

export type Transaction = {
  id: number;
  date: string;
  sum: number;
};

export type Office = {
  id: number;
  location: string;
};

/* 0 0 0 0 0 blocked admin user */
export type UserRole = {
  id: number;
  name: string;
  rights: number;
};

export type Paycard = {
  id: number;
  cardNumber: string;
  validThrough: string;
  cvv: number;
};

export type User = {
  id: number;
  login: string;
  password: string;
  name?: string;
  role: UserRole;
  cards: Paycard[];
  orders?: Order[];
};

export type Comment = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  date: string;
  text: string;
  rating: number;
};
