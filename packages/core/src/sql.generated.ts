import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Boxes {
  id: Generated<number>;
  sticker: string;
  type: string;
  week_day: string;
  image: string;
  office: string | null;
  side_dish: string | null;
  side_dish_type: string | null;
  sauce: string | null;
  order_id: number;
  combo_id: number;
  status: string;
  date_created: Generated<string>;
  date_updated: string;
}

export interface Combo {
  id: Generated<number>;
  title: string;
  coupon_id: number;
  price: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
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
  price: string;
  dish_type: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
}

export interface Coupons {
  id: Generated<number>;
  title: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
  expiration_date: string | null;
  status: string;
}

export interface Domain {
  id: Generated<number>;
  title: string;
  discount: number;
  expired_date: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
}

export interface Office {
  id: Generated<number>;
  coupon_id: number;
  title: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
}

export interface Orders {
  id: Generated<number>;
  number: string;
  status: string;
  price: string;
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
  price: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
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

export interface Sauces {
  id: Generated<number>;
  title: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
  status: string;
}

export interface SideDishes {
  id: Generated<number>;
  title: string;
  type: string;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
  status: string;
}

export interface Users {
  id: Generated<number>;
  full_name: string;
  email: string;
  address: string | null;
  phone: string;
  coupon: string;
  domain_id: number;
  date_created: Generated<Timestamp>;
  date_updated: Timestamp;
}

export interface Database {
  boxes: Boxes;
  combo: Combo;
  combo_product: ComboProduct;
  coupons: Coupons;
  domain: Domain;
  office: Office;
  orders: Orders;
  product: Product;
  sauces: Sauces;
  side_dishes: SideDishes;
  users: Users;
}
