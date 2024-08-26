import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Boxes {
  id: Generated<number>;
  sticker: string;
  type: string;
  week_day: string;
  image: string;
  office: string | null;
  price: number;
  side_dish: string | null;
  side_dish_type: string | null;
  sauce: string | null;
  order_id: number;
  combo_id: number;
  status: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface CheckDomain {
  id: Generated<number>;
  coupon_id: number;
  domain: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface CheckEmail {
  id: Generated<number>;
  coupon_id: number;
  email: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Combo {
  id: Generated<number>;
  title: string;
  domain_id: number;
  price: number;
  date_created: Generated<string>;
  date_updated: string;
  week_day: string;
  type: string;
  image: string;
  description: string | null;
  status: string;
}

export interface ComboProduct {
  id: Generated<number>;
  product_id: number;
  combo_id: number;
  price: number;
  dish_type: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Coupons {
  id: Generated<number>;
  title: string;
  address: string;
  has_domain: Generated<boolean>;
  domain_id: number;
  date_created: Generated<string>;
  date_updated: string;
  expiration_date: string | null;
  status: string;
}

export interface Domain {
  id: Generated<number>;
  title: string;
  discount: number;
  expired_date: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Office {
  id: Generated<number>;
  coupon_id: number;
  title: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Orders {
  id: Generated<number>;
  number: string;
  status: string;
  price: number;
  combo_price: number;
  coupon_id: number;
  customer_id: number;
  comment: string | null;
  address: string | null;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Product {
  id: Generated<number>;
  title: string;
  price: number;
  date_created: Generated<string>;
  date_updated: string;
  allergens: string | null;
  sauces: string | null;
  categories: string;
  dish_type: string;
  image: string;
  description: string | null;
  week_day: string;
  status: string;
  calories: string | null;
}

export interface Review {
  id: Generated<number>;
  user_id: number;
  review: string;
  rate: number;
  dish_name: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Sauces {
  id: Generated<number>;
  title: string;
  date_created: Generated<string>;
  date_updated: string;
  status: string;
}

export interface SideDishes {
  id: Generated<number>;
  title: string;
  type: string;
  date_created: Generated<string>;
  date_updated: string;
  status: string;
}

export interface Users {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  email: string;
  address: string | null;
  image: string | null;
  phone: string;
  coupon_id: number;
  role: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Database {
  boxes: Boxes;
  check_domain: CheckDomain;
  check_email: CheckEmail;
  combo: Combo;
  combo_product: ComboProduct;
  coupons: Coupons;
  domain: Domain;
  office: Office;
  orders: Orders;
  product: Product;
  review: Review;
  sauces: Sauces;
  side_dishes: SideDishes;
  users: Users;
}
