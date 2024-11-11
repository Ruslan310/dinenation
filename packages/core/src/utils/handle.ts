import {DishType} from "web/src/utils/utils";
import {combo, isOffice, isSauce, lineCart, TBoxes} from "../orders";

export interface ILineItemMeta {
  key: string;
  value: string | ILineItemMetaValue[];
}

export interface ILineItemMetaValue {
  name: string;
  section_label: string;
  value: string;
  quantity: number;
  price?: number;
}

export interface ILineItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  meta_data: ILineItemMeta[];
}

export const refactorOrder = (boxes: TBoxes[]) => {
  const lineItemsMap: { [key: number]: ILineItem } = {};

  boxes.forEach(box => {
    if (!lineItemsMap[box.combo_id]) {
      lineItemsMap[box.combo_id] = {
        id: box.combo_id,
        name: combo,
        quantity: 1,
        price: box.price,
        meta_data: [
          // {
          //   key: box.week_day,
          //   value: "Lunch",
          // },
          {
            key: isOffice,
            value: box.office || "",
          },
          {
            key: lineCart,
            value: [],
          },
          {
            key: isSauce,
            value: box.sauce || "",
          },
        ]
      };
    } else {
      // Если элемент уже есть, увеличиваем его цену на box.price
      lineItemsMap[box.combo_id].price += box.price;
    }

    const metaDataValue = Array.isArray(lineItemsMap[box.combo_id].meta_data[1].value)
      ? lineItemsMap[box.combo_id].meta_data[1].value as ILineItemMetaValue[]
      : [];
    const weekDayExists = metaDataValue.some(
      (item: any) => item.name === box.week_day && item.section_label === box.week_day
    );

    if (!weekDayExists) {
      metaDataValue.push({
        name: box.week_day,
        section_label: box.week_day,
        value: "Lunch",
        quantity: 1,
        price: 0,
      });
    }
    metaDataValue.push({
      name: box.type,
      section_label: box.type,
      value: box.sticker,
      quantity: 1,
      price: box.price
    });

    if (box.side_dish) {
      metaDataValue.push({
        name: DishType.SIDE,
        section_label: DishType.SIDE,
        value: box.side_dish,
        quantity: 1,
      });
    }
  });

  return Object.values(lineItemsMap)
}


// {
//   number: newNumber,
//     status: EStatusType.PROCESSING,
//   total: price,
//   billing: {
//   email: user.email,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     company: coupon.title
// },
//   date_created: sql`now()`,
//     shipping: {
//   address_1: coupon.address,
//     address_2: "",
//     city: "Limassol",
//     postcode: "3105",
//     country: "CY",
// },
//   coupon_lines: [
//     {code: coupon.title}
//   ],
//   line_items: [
//   {
//     id: 222332332,
//     name: "Corporate Lunch Combo",
//     quantity: 1,
//     meta_data: [
//       {
//         key: isOffice,
//         value: "nexters",
//       },
//       {
//         key: lineCart,
//         value: [
//           {
//             name: "Monday",
//             section_label: "Monday",
//             value: "Lunch",
//             quantity: 1,
//           },
//           {
//             name: "Main Dish",
//             value: "Grilled Salmon with Teriyaki Glaze",
//             section_label: "Main Dish",
//             quantity: 1,
//           },
//           {
//             name: "Side Dish",
//             value: "Jasmin Rice with Raz El Hanout",
//             section_label: "Side Dish",
//             quantity: 1,
//           },
//           {
//             name: "Second Dish",
//             value: "Japanese Coleslaw Salad",
//             section_label: "Second Dish",
//             quantity: 1,
//           },
//         ]
//       },
//     ]
//   },
// ]
// }


