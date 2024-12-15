import {BoxStatus, EStatusType} from "web/src/utils/utils";
export * as Orders from "./orders";
import {SQL} from "./sql";
import {sql} from "kysely";
import axios from "axios";
import {refactorOrder} from "./utils/handle";
import {sendEmail} from "@dinenation-postgresql/functions/src/sendEmail";
import {orderMailToUser} from "./utils/orderMailToUser";
import {orderMailToOffice} from "./utils/orderMailToOffice";
import {adminKey, adminUrl} from "@dinenation-postgresql/functions/src/constants";

export const lineCart = '_tmcartepo_data';
export const isOffice = "Office";
// export const isSauce = "Sauce";
export const isSauce = "Breakfast";
export const combo = 'Corporate Lunch Combo';
const officeMail = 'delivery@dinenation.com'

export interface TBoxes {
  sticker: string;
  type: string;
  week_day: string;
  image: string;
  small_img: string;
  office?: string | null;
  price: number;
  side_dish?: string | null;
  side_dish_type?: string | null;
  sauce?: string | null;
  combo_id: number;
}

export async function createOrderWithBoxes(
  price: number,
  combo_price: number,
  coupon_id: number,
  customer_id: number,
  comment: string | null | undefined,
  address: string | null | undefined,
  boxes: TBoxes[]
) {
  const startNumber = 'DN-75000';

  const [[lastOrder], [user, coupon]] = await Promise.all([
    SQL.DB.selectFrom('orders').select('number').orderBy('number', 'desc').limit(1).execute(),
    Promise.all([
      SQL.DB.selectFrom("users").selectAll().where("id", "=", customer_id).executeTakeFirstOrThrow(),
      SQL.DB.selectFrom("coupons").selectAll().where("id", "=", coupon_id).executeTakeFirstOrThrow()
    ])
  ]);
  const lastNumber = lastOrder?.number || startNumber;
  const numericPart = parseInt(lastNumber.split('-')[1], 10);
  const newNumber = `DN-${numericPart + 1}`;

  const [orderResult] = await SQL.DB.insertInto('orders')
    .values({
      status: EStatusType.PROCESSING,
      number: newNumber,
      price,
      combo_price,
      customer_id,
      coupon_id,
      comment,
      address,
      date_updated: sql`now()`,
    })
    .returningAll()
    .execute();

  const orderId = orderResult.id;

  const boxInsertions= boxes.map(box => ({
    sticker: box.sticker,
    type: box.type,
    week_day: box.week_day,
    image: box.image,
    office: box.office,
    price: box.price,
    side_dish: box.side_dish,
    side_dish_type: box.side_dish_type,
    sauce: box.sauce,
    order_id: orderId,
    combo_id: box.combo_id,
    status: BoxStatus.NEW,
    date_updated: sql<string>`now()`,
  }));

  await SQL.DB.insertInto('boxes').values(boxInsertions).execute();

  const refactorBox = refactorOrder(boxes);

  await Promise.all([
    axios({
      url: `${adminUrl}orderCreatedInWp`,
      method: 'post',
      headers: {
        'x-api-key': adminKey,
      },
      data: {
        number: newNumber,
        status: EStatusType.PROCESSING,
        total: price,
        billing: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          company: coupon.title
        },
        date_created: sql`now()`,
        shipping: {
          address_1: coupon.address,
          address_2: "",
          city: "Limassol",
          postcode: "3105",
          country: "CY",
        },
        customer_note: comment,
        coupon_lines: [
          {code: coupon.title}
        ],
        line_items: refactorBox
      },
    }),

    //email to customer
    sendEmail({
      to: user.email,
      subject: `Order #${newNumber}`,
      html: orderMailToUser({
        user: user.first_name,
        hidePrice: coupon.hide_price,
        coupon: coupon.title,
        address: coupon.address,
        email: user.email,
        orderId,
        comment,
        orderNumber: newNumber,
        boxes: refactorBox,
      }),
    }),

    // email to office
    sendEmail({
      to: officeMail,
      subject: `Order #${newNumber}`,
      html: orderMailToOffice({
        user: `${user.first_name} ${user.last_name}`,
        coupon: coupon.title,
        address: coupon.address,
        email: user.email,
        comment,
        orderNumber: newNumber,
        boxes: refactorBox,
      }),
    }),
  ]);

  return await SQL.DB.selectFrom('orders')
    .where('id', '=', orderId)
    .selectAll()
    .executeTakeFirstOrThrow();
}

export async function updateOrder(
  id: number,
  number: string,
  status: string,
  price: number,
  combo_price: number,
  coupon_id: number,
  customer_id: number,
  comment: string | null | undefined,
  address: string | null | undefined,
) {
  const [result] = await SQL.DB.updateTable("orders")
    .set({
      id,
      number,
      status,
      price,
      combo_price,
      coupon_id,
      customer_id,
      comment,
      address,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();
  return result;
}

export async function updateOrders(
  orders: { number: string }[],
) {
  const numbers = orders.map(order => order.number); // Извлекаем массив номеров

  let result = await SQL.DB.updateTable("orders")
    .set({
      status: EStatusType.COMPLETED,
      date_updated: sql`now()`,
    })
    .where("number", "in", numbers) // Используем оператор IN для массива
    .returningAll()
    .execute();

  await axios({
    url: `${adminUrl}ordersToCompleted`,
    method: 'post',
    headers: {
      'x-api-key': adminKey,
    },
    data: numbers,
  })

  return result;
}

export async function updateOrderWithBoxes(
  id: number,
  status: string,
  combo_id: number,
  price: number,
  customer_id: number,
  boxes: TBoxes[],
) {
  const [result] = await SQL.DB.updateTable("orders")
    .set({
      status,
      price,
      date_updated: sql`now()`,
    })
    .where("id", "=", id)
    .returningAll()
    .execute();

  await SQL.DB.deleteFrom("boxes")
    .where('combo_id', '=', combo_id)
    .execute();

  const [user] = await SQL.DB.selectFrom("users")
    .selectAll()
    .where("id", "=", customer_id)
    .execute();
  const [coupon] = await SQL.DB.selectFrom("coupons")
    .selectAll()
    .where("id", "=", user.coupon_id)
    .execute();

  const refactorBox = refactorOrder(boxes);

  await axios({
    url: `${adminUrl}orderUpdatedInWp`,
    method: 'post',
    headers: {
      'x-api-key': adminKey,
    },
    data: {
      number: result.number,
      status: status,
      total: price,
      billing: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        company: coupon.title
      },
      date_created: sql`now()`,
      shipping: {
        address_1: coupon.address,
        address_2: "",
        city: "Limassol",
        postcode: "3105",
        country: "CY",
      },
      coupon_lines: [
        {code: coupon.title}
      ],
      line_items: refactorBox
    },
  });

  return result;
}

export async function deleteOrder(id: number) {
  await SQL.DB.deleteFrom("boxes")
    .where("order_id", "=", id)
    .execute();
  await SQL.DB.deleteFrom("orders")
    .where('id', '=', id)
    .execute();
  return true
}

export function orders() {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .orderBy("date_created", "desc")
    .execute();
}

export async function orderProducts(id: number) {
  return await SQL.DB.selectFrom("boxes")
    .selectAll()
    .where("order_id", "=", id)
    .orderBy("date_created", "desc")
    .execute();
}

export function ordersByCustomerId(customer_id: number) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("customer_id", "=", customer_id)
    .orderBy("date_created", "desc")
    .execute();
}

export function ordersByCoupon(coupon_id: number) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("coupon_id", "=", coupon_id)
    .where("status", "=", EStatusType.PROCESSING)
    .orderBy("date_created", "desc")
    .execute();
}

export function ordersByCouponDate(coupon_id: number, date_start: string, date_end: string) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("coupon_id", "=", coupon_id)
    .where("status", "in", [EStatusType.COMPLETED, EStatusType.PROCESSING])
    .where("date_created", ">=", date_start)
    .where("date_created", "<=", date_end)
    .orderBy("date_created", "desc")
    .execute();
}

export async function orderTotalCount(status: string) {
  const result = await SQL.DB.selectFrom("orders")
    .select(sql<string>`count(*)`.as('count'))
    .where("status", "=", status)
    .execute();

  // Получаем количество из первого элемента массива и преобразуем его в число
  return parseInt(result[0]?.count || '0', 10);
}

export function ordersCheckById(customer_id: number, status: string) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("customer_id", "=", customer_id)
    .where("status", "=", status)
    // .orderBy("date_created", "desc")
    .execute();
}

// export function ordersByStatus(status: string) {
//   return SQL.DB.selectFrom("orders")
//     .selectAll()
//     .where("status", "=", status)
//     .orderBy("date_created", "desc")
//     .execute();
// }

export function ordersByBox() {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("status", "=", EStatusType.PROCESSING)
    .orderBy("date_created", "desc")
    .execute();
}

export function ordersByStatus(status: string, limit: number, offset: number) {
  return SQL.DB.selectFrom("orders")
    .selectAll()
    .where("status", "=", status)
    .orderBy("date_created", "desc")
    .limit(limit) // Добавляем ограничение на количество возвращаемых записей
    .offset(offset) // Добавляем смещение для пагинации
    .execute();
}

export async function getOrder(id: number) {
  const [result] = await SQL.DB.selectFrom("orders")
    .selectAll()
    .where("id", "=", id)
    .execute();
  return result
}

export async function getOrderCustomerId(id: number, customer_id: number) {
  const [result] = await SQL.DB.selectFrom("orders")
    .selectAll()
    .where("id", "=", id)
    .where("customer_id", "=", customer_id)
    .execute();
  return result
}

export async function getUsersWithoutProcessingOrders() {
  const emails = await SQL.DB
    .selectFrom("users")
    .select(['email', "first_name"])
    .whereNotExists(
      SQL.DB
        .selectFrom("orders")
        .whereRef("orders.customer_id" as any, "=", "users.id" as any)
        .where("orders.status", "=", "processing")
    )
    .execute();

  return emails;
}


