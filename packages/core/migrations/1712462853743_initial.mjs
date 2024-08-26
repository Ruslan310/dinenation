import {Kysely, sql} from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("product")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .addColumn("allergens", "text")
    .addColumn("sauces", "text")
    .addColumn("categories", "text", (col) => col.notNull())
    .addColumn("dish_type", "varchar(20)", (col) => col.notNull())
    .addColumn("image", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("week_day", "varchar(20)", (col) => col.notNull())
    .addColumn("status", "varchar(20)", (col) => col.notNull())
    .addColumn("calories", "varchar(10)")
    .execute();

  await db.schema
    .createTable("side_dishes")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("type", "varchar(20)", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .addColumn("status", "varchar(20)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("sauces")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .addColumn("status", "varchar(20)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("domain")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("discount", "real", (col) => col.notNull())
    .addColumn("expired_date", "varchar(50)", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("coupons")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("address", "text", (col) => col.notNull())
    .addColumn("has_domain", "boolean", (col) => col.notNull().defaultTo(false))
    .addColumn("domain_id", "integer", (col) => col.notNull().references("domain.id"))
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .addColumn("expiration_date", "varchar(50)")
    .addColumn("status", "varchar(20)", (col) => col.notNull())
    .execute();


  await db.schema
    .createTable("combo")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "varchar(100)", (col) => col.notNull())
    .addColumn("domain_id", "integer", (col) => col.notNull().references("domain.id"))
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .addColumn("week_day", "varchar(10)", (col) => col.notNull())
    .addColumn("type", "varchar(20)", (col) => col.notNull())
    .addColumn("image", "varchar(255)", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("status", "varchar(20)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("combo_product")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("product_id", "integer", (col) => col.notNull().references("product.id"))
    .addColumn("combo_id", "integer", (col) => col.notNull().references("combo.id"))
    .addColumn("price", "real", (col) => col.notNull())
    .addColumn("dish_type", "varchar(20)", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("office")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("coupon_id", "integer", (col) => col.notNull().references("coupons.id"))
    .addColumn("title", "text", (col) => col.notNull())
    .addColumn("date_created", "varchar(50)", (col) => col.notNull().defaultTo(sql`now()`))
    .addColumn("date_updated", "varchar(50)", (col) => col.notNull())
    .execute();

  const CATEGORIES_TYPE = {
    SWEETS: "Sweets",
    MEAT: "Meat",
    SEAFOOD: "Seafood",
    CHICKEN: "Chicken",
    VEGETARIAN: "Vegetarian",
    SOUP: "Soup",
    SIDE_SALADS: "Side Salads",
    SANDWICHES: "Sandwiches",
  }

  const DishType = {
    MAIN: "Main Dish",
    SECOND: "Second Dish",
    DESSERT: "Desert",
    SIDE: "Side Dish",
    SAUCE: "Sauce",
  }

  const EAllergensList = {
    CRUSTACEANS: 'Crustaceans',
    FISH: 'Fish',
    GLUTEN: 'Gluten',
    CELERY: 'Celery',
    MOLLUSKS: 'Mollusks',
    EGGS: 'Eggs',
    MUSTARD: 'Mustard',
    MILK: 'Milk',
    SULFITES: 'Sulfites',
    PEANUTS: 'Peanuts',
    SOY: 'Soy',
    NUTS: 'Nuts',
    SESAME: 'Sesame',
    LUPIN: 'Lupin',
  }

  const EColorSideDishList = {
    RISE: 'RISE',
    SALAD: 'SALAD',
    GRILLED: 'GRILLED',
    POTATO: 'POTATO',
    BARLEY: 'BARLEY',
  }

  const ProductStatus = {
    PUBLISHED: 'Published',
    DRAFTS: 'Drafts',
    TRASH: 'Trash'
  };

  const WeekDay = {
    MONDAY: "MONDAY",
    TUESDAY: "TUESDAY",
    WEDNESDAY: "WEDNESDAY",
    THURSDAY: "THURSDAY",
    FRIDAY: "FRIDAY",
    SATURDAY: "SATURDAY",
    SUNDAY: "SUNDAY",
    WITHOUT_DAY: "WITHOUT_DAY"
  }

  const COMBO_TYPE = {
    COMBO: "Combo",
    LUNCH: 'Lunch',
    MAIN_SIDE_SOUP: "Main Side Soup",
  }

  const des1 = 'Linguine, vodka, onion, garlic, tomato, cream, parmesan, basil. Allergens: sulphites, gluten, milk.'
  const des2 = 'Cajun spices, onion, garlic, tomato, fresh basil. Allergens: none.'
  const des3 = 'Dashi, fennel, honey, olive oil, lemon. Allergens: fish.'

  const sauce1 = 'Ketchup'
  const sauce2 = 'Garlic'
  const sauce3 = 'Spicy Mayo'

  const image1 = "https://bucket-for-image-test.s3.amazonaws.com/cc7c07a85d2ddaa0226d511b78af1ec4"
  const image2 = "https://bucket-for-image-test.s3.amazonaws.com/ee31d069c09edd9711db8a6868db5165"
  const image3 = "https://bucket-for-image-test.s3.amazonaws.com/15f94c0f845370a96fe5e064089c7853"
  const image4 = "https://bucket-for-image-test.s3.amazonaws.com/1e9ddb78c131eb64335fe3866a7b0acb"
  const image5 = "https://bucket-for-image-test.s3.amazonaws.com/4302e3b420d2247866b8bdb421b8ce6f"
  const image6 = "https://bucket-for-image-test.s3.amazonaws.com/b3da93d462a6ae31fb2b4deb5b17bee7"

  const currentDate = new Date();

  // Вставка записей в таблицу product
  await db.insertInto('product').values([
    { title: 'Vodka Pasta', price: 8.30, date_updated: currentDate, allergens: EAllergensList.EGGS, sauces: sauce1, categories: CATEGORIES_TYPE.MEAT, dish_type: DishType.SECOND, image: image1, description: des1, week_day: WeekDay.MONDAY, status: ProductStatus.PUBLISHED, calories: '100' },
    { title: 'Roasted Eggplant with Tomato Sauce', price: 20.00, date_updated: currentDate, allergens: '', sauces: sauce2, categories: CATEGORIES_TYPE.CHICKEN, dish_type: DishType.SECOND, image: image2, description: des2, week_day: WeekDay.FRIDAY, status: ProductStatus.PUBLISHED, calories: '200' },
    { title: 'Beef and Gribish Sauce', price: 19.00, date_updated: currentDate, allergens: EAllergensList.MILK, sauces: sauce3, categories: CATEGORIES_TYPE.SEAFOOD, dish_type: DishType.DESSERT, image: image3, description: des3, week_day: WeekDay.MONDAY, status: ProductStatus.PUBLISHED, calories: '400' },
    { title: 'Rainbow Orzo Salad', price: 15.40, date_updated: currentDate, allergens: '', sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.SECOND, image: image4, description: des1, week_day: WeekDay.TUESDAY, status: ProductStatus.PUBLISHED, calories: '420' },
    { title: 'Aubergine Korean salad', price: 10.00, date_updated: currentDate, allergens: EAllergensList.FISH, sauces: sauce3, categories: CATEGORIES_TYPE.SIDE_SALADS, dish_type: DishType.SECOND, image: image5, description: des3, week_day: WeekDay.MONDAY, status: ProductStatus.PUBLISHED, calories: '500' },
    { title: 'Aubergine Korean salad', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image6, description: des2, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '210' },
    { title: 'Turkish Red Lentil Soup', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: sauce3, categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image2, description: des2, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '510' },
    { title: 'Snickers', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image1, description: des1, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '412' },
    { title: 'Fruit Cup', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: sauce1, categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image5, description: des2, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '515' },
    { title: 'Lemon mouse cup', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image3, description: des1, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '110' },
    { title: 'Mushroom Stew', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image1, description: des1, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '110' },
    { title: 'Svekolnik', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image4, description: des2, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '110' },
    { title: 'Lamb Casserole', price: 16.00, date_updated: currentDate, allergens: EAllergensList.CELERY, sauces: '', categories: CATEGORIES_TYPE.SANDWICHES, dish_type: DishType.MAIN, image: image3, description: des1, week_day: WeekDay.THURSDAY, status: ProductStatus.PUBLISHED, calories: '110' },
  ]).execute();

  // Вставка записей в таблицу side_dishes
  await db.insertInto('side_dishes').values([
    { title: 'Buckwheat', type: EColorSideDishList.BARLEY, date_updated: currentDate, status: ProductStatus.PUBLISHED },
    { title: 'Fresh Cucumber & Tomato', type: EColorSideDishList.SALAD, date_updated: currentDate, status: ProductStatus.PUBLISHED },
    { title: 'Mashed Potato', type: EColorSideDishList.POTATO, date_updated: currentDate, status: ProductStatus.PUBLISHED },
    { title: 'Garlicky Green Beans', type: EColorSideDishList.GRILLED, date_updated: currentDate, status: ProductStatus.PUBLISHED },
    { title: 'Rice with Chinese Vegetables', type: EColorSideDishList.RISE, date_updated: currentDate, status: ProductStatus.PUBLISHED },
  ]).execute();

  // Вставка записей в таблицу sauces
  await db.insertInto('sauces').values([
    { title: sauce1, date_updated: currentDate, status: ProductStatus.PUBLISHED },
    { title: sauce2, date_updated: currentDate, status: ProductStatus.PUBLISHED },
    { title: sauce3, date_updated: currentDate, status: ProductStatus.PUBLISHED },
  ]).execute();

  // Инсерт данных в таблицу domain
  await db.insertInto("domain").values([
    {title: "nexters", discount: 10, expired_date: "2025-12-31", date_updated: currentDate},
    {title: "subsum", discount: 20, expired_date: "2025-11-04", date_updated: currentDate},
    {title: "appari", discount: 30, expired_date: "2025-06-23", date_updated: currentDate}
  ]).execute();

  // Вставка записей в таблицу coupons
  await db.insertInto('coupons').values([
    {title: 'nexters', has_domain: true, domain_id: 1, date_updated: currentDate, expiration_date: '', status: ProductStatus.PUBLISHED, address: '3-5, Georgiou A Avenue'},
    {title: 'sumsub', has_domain: false, domain_id: 2, date_updated: currentDate, expiration_date: '', status: ProductStatus.PUBLISHED, address: '237, Arch. Makarios III Avenue'},
    {title: 'appari', has_domain: true, domain_id: 1, date_updated: currentDate, expiration_date: '', status: ProductStatus.PUBLISHED, address: '29, Amathus Avenue'},
  ]).execute();

  const imgCombo = 'https://bucket-for-image-test.s3.amazonaws.com/d0de5a8abae5737aa21dc0740b4d6177'

  // Вставка записей в таблицу combo
  await db.insertInto('combo').values([
    {title: 'Combo Monday', domain_id: 1, price: 14.70, date_updated: currentDate, week_day: WeekDay.MONDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu nexters', status: ProductStatus.PUBLISHED},
    {title: 'Combo Tuesday', domain_id: 1, price: 14.70, date_updated: currentDate, week_day: WeekDay.TUESDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu nexters', status: ProductStatus.PUBLISHED},
    {title: 'Combo Wednesday', domain_id: 1, price: 14.70, date_updated: currentDate, week_day: WeekDay.WEDNESDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu nexters', status: ProductStatus.PUBLISHED},
    {title: 'Combo Thursday', domain_id: 1, price: 14.70, date_updated: currentDate, week_day: WeekDay.THURSDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu nexters', status: ProductStatus.PUBLISHED},
    {title: 'Combo Friday', domain_id: 1, price: 14.70, date_updated: currentDate, week_day: WeekDay.FRIDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu nexters', status: ProductStatus.PUBLISHED},

    {title: 'Combo Monday', domain_id: 2, price: 15.00, date_updated: currentDate, week_day: WeekDay.MONDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu sumsab', status: ProductStatus.PUBLISHED},
    {title: 'Combo Tuesday', domain_id: 2, price: 15.00, date_updated: currentDate, week_day: WeekDay.TUESDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu sumsab', status: ProductStatus.PUBLISHED},
    {title: 'Combo Wednesday', domain_id: 2, price: 15.00, date_updated: currentDate, week_day: WeekDay.WEDNESDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu sumsab', status: ProductStatus.PUBLISHED},
    {title: 'Combo Thursday', domain_id: 2, price: 15.00, date_updated: currentDate, week_day: WeekDay.THURSDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu sumsab', status: ProductStatus.PUBLISHED},
    {title: 'Combo Friday', domain_id: 2, price: 15.00, date_updated: currentDate, week_day: WeekDay.FRIDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu sumsab', status: ProductStatus.PUBLISHED},
    {title: 'Combo Saturday', domain_id: 2, price: 15.00, date_updated: currentDate, week_day: WeekDay.SATURDAY, type: COMBO_TYPE.COMBO, image: imgCombo, description: 'Combo menu sumsab', status: ProductStatus.PUBLISHED},
  ]).execute();

  // Вставка записей в таблицу combo_product
  await db.insertInto('combo_product').values([
    {product_id: 1, combo_id: 1, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 2, combo_id: 1, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 3, combo_id: 1, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 4, combo_id: 1, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 1, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 5, combo_id: 1, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 6, combo_id: 1, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 7, combo_id: 1, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 8, combo_id: 1, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 9, combo_id: 1, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 10, combo_id: 1, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 4, combo_id: 2, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 1, combo_id: 2, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 3, combo_id: 2, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 6, combo_id: 2, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 11, combo_id: 2, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 2, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 5, combo_id: 2, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 12, combo_id: 2, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 4, combo_id: 2, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 7, combo_id: 2, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 1, combo_id: 2, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 5, combo_id: 3, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 8, combo_id: 3, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 5, combo_id: 3, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 1, combo_id: 3, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 13, combo_id: 3, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 5, combo_id: 3, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 10, combo_id: 3, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 7, combo_id: 3, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 1, combo_id: 3, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 8, combo_id: 3, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 9, combo_id: 3, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 8, combo_id: 4, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 1, combo_id: 4, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 4, combo_id: 4, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 4, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 11, combo_id: 4, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 3, combo_id: 4, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 7, combo_id: 4, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 9, combo_id: 4, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 3, combo_id: 4, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 8, combo_id: 4, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 6, combo_id: 4, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 3, combo_id: 5, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 6, combo_id: 5, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 1, combo_id: 5, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 9, combo_id: 5, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 9, combo_id: 5, price: 14.70, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 5, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 3, combo_id: 5, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 4, combo_id: 5, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 7, combo_id: 5, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 5, combo_id: 5, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 11, combo_id: 5, price: 1.05, date_updated: currentDate, dish_type: DishType.DESSERT},



    {product_id: 4, combo_id: 6, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 3, combo_id: 6, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 2, combo_id: 6, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 5, combo_id: 6, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 12, combo_id: 6, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 11, combo_id: 6, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 9, combo_id: 6, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 4, combo_id: 6, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 13, combo_id: 6, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 7, combo_id: 6, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 8, combo_id: 6, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 2, combo_id: 7, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 7, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 4, combo_id: 7, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 4, combo_id: 7, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 9, combo_id: 7, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 13, combo_id: 7, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 5, combo_id: 7, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 11, combo_id: 7, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 5, combo_id: 7, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 6, combo_id: 7, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 2, combo_id: 7, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 3, combo_id: 8, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 7, combo_id: 8, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 9, combo_id: 8, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 8, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 11, combo_id: 8, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 6, combo_id: 8, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 12, combo_id: 8, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 5, combo_id: 8, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 2, combo_id: 8, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 8, combo_id: 8, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 1, combo_id: 8, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 9, combo_id: 9, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 1, combo_id: 9, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 2, combo_id: 9, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 11, combo_id: 9, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 9, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 3, combo_id: 9, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 8, combo_id: 9, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 10, combo_id: 9, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 4, combo_id: 9, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 7, combo_id: 9, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 5, combo_id: 9, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 1, combo_id: 10, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 6, combo_id: 10, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 2, combo_id: 10, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 9, combo_id: 10, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 7, combo_id: 10, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 10, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 1, combo_id: 10, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 2, combo_id: 10, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 7, combo_id: 10, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 6, combo_id: 10, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 11, combo_id: 10, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},

    {product_id: 1, combo_id: 11, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 6, combo_id: 11, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 9, combo_id: 11, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 5, combo_id: 11, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 2, combo_id: 11, price: 15.00, date_updated: currentDate, dish_type: DishType.MAIN},
    {product_id: 10, combo_id: 11, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 4, combo_id: 11, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 3, combo_id: 11, price: 0, date_updated: currentDate, dish_type: DishType.SECOND},
    {product_id: 8, combo_id: 11, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 7, combo_id: 11, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},
    {product_id: 11, combo_id: 11, price: 1.80, date_updated: currentDate, dish_type: DishType.DESSERT},

  ]).execute();

  // Инсерт данных в таблицу office
  await db.insertInto('office').values([
    {coupon_id: 1, title: "larnaca", date_updated: currentDate},
    {coupon_id: 1, title: "nexters", date_updated: currentDate},
    {coupon_id: 2, title: "sumsub", date_updated: currentDate},
    {coupon_id: 2, title: "lophitis", date_updated: currentDate},
    {coupon_id: 2, title: "a.andreou", date_updated: currentDate},
  ]).execute();

}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("office").execute();
  await db.schema.dropTable("combo_product").execute();
  await db.schema.dropTable("combo").execute();
  await db.schema.dropTable("coupons").execute();
  await db.schema.dropTable("domain").execute();
  await db.schema.dropTable("product").execute();
  await db.schema.dropTable("side_dishes").execute();
  await db.schema.dropTable("sauces").execute();
}
