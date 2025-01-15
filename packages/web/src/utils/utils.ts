import Kitchen from "../pages/AdminPanel/Kitchen/Kitchen";

export enum PageConfig {
  home = "/",
  wrong = "*",
  auth = '/auth',
  checkout = "/checkout",
  profile = "/profile",
  reviews = "/reviews",
  history = "/history",
  contact = "/contact",
  company_orders = "/company-orders",
  combo = "/combo",
  product = "/product",
  sauces = "/sauces",
  side_dishes = "/side-dishes",
  coupons = "/coupons",
  domains = "/domains",
  users = "/users",
  orders = "/orders",
  product_reviews = "/product-reviews",
  invoice = "/invoice",
  boxes = "/boxes",
  kitchen = "/kitchen",
}

export enum WeekDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  WITHOUT_DAY = "WITHOUT_DAY",
  EVERY_DAY = "EVERY_DAY",
}

export enum CATEGORIES_TYPE {
  MEAT = "Meat",
  CHICKEN = "Chicken",
  SEAFOOD = "Seafood",
  VEGETARIAN = "Vegetarian",
  MAIN_SALADS = "Main Salads",
  SIDE_SALADS = "Side Salads",
  SOUP_SIDE_SALADS = "Soup + Side Salads",
  SOUP = "Soup",
  PELMENI = "Pelmeni",
  SUSHI = "Sushi",
  SWEETS = "Sweets",
  MIK_BAO = "Mik Bao",
  SANDWICHES = "Sandwiches",
}

export enum dateFormat {
  DATE_TIME = 'YYYY-MM-DD HH:mm',
  DATE = 'YYYY-MM-DD',
  DAY = 'dddd',
  SHORT_DATE = 'D.MM'
}

export const CATEGORIES_TYPE_SORT: CATEGORIES_TYPE[] = [
  CATEGORIES_TYPE.MEAT,
  CATEGORIES_TYPE.CHICKEN,
  CATEGORIES_TYPE.SEAFOOD,
  CATEGORIES_TYPE.VEGETARIAN,
  CATEGORIES_TYPE.SOUP_SIDE_SALADS,
  CATEGORIES_TYPE.MAIN_SALADS,
  CATEGORIES_TYPE.SIDE_SALADS,
  CATEGORIES_TYPE.SOUP,
  CATEGORIES_TYPE.PELMENI,
  CATEGORIES_TYPE.SUSHI,
  CATEGORIES_TYPE.SWEETS,
  CATEGORIES_TYPE.MIK_BAO,
  CATEGORIES_TYPE.SANDWICHES,
];

export enum COMBO_TYPE {
  COMBO = "Combo",
  LUNCH = 'Lunch',
  MAIN_SIDE_SOUP = "Main Side Soup",
}

export enum BoxStatus {
  NEW = "NEW",
  PRINTED = "PRINTED",
}

export enum ProductStatus {
  PUBLISHED = 'Published',
  DRAFTS = 'Drafts',
  TRASH = 'Trash'
}

export enum EStatusType {
  PROCESSING = 'processing',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  PENDING_PAYMENT = 'pending-payment',
  CANCEL_REQUEST = 'cancel-request',
  ON_HOLD = 'on-hold',
  FAILED = 'failed',
}

export enum EAllergensList {
  CRUSTACEANS = 'Crustaceans',
  FISH = 'Fish',
  GLUTEN = 'Gluten',
  CELERY = 'Celery',
  MOLLUSKS = 'Mollusks',
  EGGS = 'Eggs',
  MUSTARD = 'Mustard',
  MILK = 'Milk',
  SULPHITES = 'Sulphites',
  PEANUTS = 'Peanuts',
  SOY = 'Soy',
  NUTS = 'Nuts',
  SESAME = 'Sesame',
  LUPIN = 'Lupin',
}

export enum EColorSideDishList {
  RISE = 'RISE',
  SALAD = 'SALAD',
  GRILLED = 'GRILLED',
  POTATO = 'POTATO',
  BARLEY = 'BARLEY',
}

export const DaysList = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'without_day',
];

export type TStatusType =
  'completed' |
  'cancelled' |
  'processing' |
  'cancel-request' |
  'on-hold';

export const OrderStatus = [
  'processing',
  'completed',
  'cancelled',
  'pending-payment',
  'on-hold',
  'refunded',
  'failed',
  'cancel-request',
  'draft',
];

export enum Role {
  DELIVERY = "DELIVERY",
  KITCHEN = "KITCHEN",
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export enum ComponentType {
  MAIN = "Main Dish",
  SECOND = "Second Dish",
  DESSERT = "Dessert",
}

export const WEEKDAY_ORDER_TYPE: ComponentType[] = [
  ComponentType.MAIN,
  ComponentType.SECOND,
  ComponentType.DESSERT,
];

export enum DishType {
  MAIN = "Main Dish",
  SECOND = "Second Dish",
  DESSERT = "Dessert",
  SIDE = "Side Dish",
  SAUCE = "Sauce",
}

export enum EWEEK_DAY {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}

export const WEEKDAY_ORDER: EWEEK_DAY[] = [
  EWEEK_DAY.MONDAY,
  EWEEK_DAY.TUESDAY,
  EWEEK_DAY.WEDNESDAY,
  EWEEK_DAY.THURSDAY,
  EWEEK_DAY.FRIDAY,
  EWEEK_DAY.SATURDAY,
];


export enum ROLE {
  PUBLIC = "public",
  ADMIN = "admin",
  HR = "hr",
}
