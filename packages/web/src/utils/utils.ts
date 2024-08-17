export enum WeekDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  WITHOUT_DAY = "WITHOUT_DAY"
}

export enum CATEGORIES_TYPE {
  SWEETS = "Sweets",
  MEAT = "Meat",
  SEAFOOD = "Seafood",
  CHICKEN = "Chicken",
  VEGETARIAN = "Vegetarian",
  SOUP = "Soup",
  SIDE_SALADS = "Side Salads",
  SANDWICHES = "Sandwiches",
}

export enum COMBO_TYPE {
  COMBO = "Combo",
  LUNCH = 'Lunch',
  MAIN_SIDE_SOUP = "Main Side Soup",
}

export enum BoxStatus {
  NEW = "NEW",
  PRINTED = "PRINTED",
  COOKED = "COOKED",
  IN_DELIVERY = "IN_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
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
  SULFITES = 'Sulfites',
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
  GUEST = "GUEST"
}

export enum ComponentType {
  MAIN = "Main Dish",
  SECOND = "Second Dish",
  DESSERT = "Desert"
}

export const WEEKDAY_ORDER_TYPE: ComponentType[] = [
  ComponentType.MAIN,
  ComponentType.SECOND,
  ComponentType.DESSERT,
];

export enum DishType {
  MAIN = "Main Dish",
  SECOND = "Second Dish",
  DESSERT = "Desert",
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
