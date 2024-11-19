// AUTH
import {EAllergensList, EWEEK_DAY} from "./utils";
import {Product} from "../pages/AdminPanel/Orders/OrderView";

export interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  address: string | null | undefined,
  phone: string,
  coupon: UserCoupon,
  role: string,
  image: string | null | undefined,
  is_update: boolean,
}

export interface UserCoupon {
  id: number,
  title: string,
  address: string | null | undefined,
  check_order: boolean,
  hide_price: boolean,
  domain: Domain
  office: Office[]
}

export interface Office {
  id: number,
  title: string,
}

export interface Domain {
  id: number,
  title: string,
}

export interface CheckCoupon {
  id: number,
  title: string,
  has_domain: boolean,
}

export interface CheckDomain {
  coupon_id: number,
  domain: string,
}

export interface CheckMail {
  coupon_id: number,
  email: string,
}



// WEEKLY MENU

export interface SideDishType {
  title: string;
  type: string;
  description: string | null | undefined;
}


// PRODUCT


export interface ProductForm {
  id: number
  title: string;
  price: number;
  allergens: EAllergensList;
  sauces: string;
  is_dish: boolean;
  categories: string;
  dish_type: string;
  image: string;
  small_img: string;
  description: string;
  week_day: string;
  status: string;
  calories: string;
}


type ProductList = {
  [combo_id: number]: Product[];
}

export type GroupedProducts = {
  [week_day: string]: ProductList;
};


export interface BoxCreate {
  sticker: string,
  type: string,
  week_day: EWEEK_DAY,
  image: string,
  small_img: string,
  office: string | null | undefined,
  price: number,
  side_dish: string | null | undefined,
  side_dish_type: string | null | undefined,
  sauce: string | null | undefined,
  combo_id: number,
}
