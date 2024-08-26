// AUTH
import {EAllergensList} from "./utils";

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
}

export interface UserCoupon {
  id: number,
  title: string,
  address: string | null | undefined,
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
}


// PRODUCT


export interface ProductForm {
  id: number
  title: string;
  price: number;
  allergens: EAllergensList;
  sauces: string;
  categories: string;
  dish_type: string;
  image: string;
  description: string;
  week_day: string;
  status: string;
  calories: string;
}
