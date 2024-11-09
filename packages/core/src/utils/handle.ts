import {DishType} from "web/src/utils/utils";
import {combo, isOffice, lineCart, TBoxes} from "./orders";

export const refactorOrder = (boxes: TBoxes[]) => {
  const lineItemsMap: { [key: number]: any } = {};

  boxes.forEach(box => {
    if (!lineItemsMap[box.combo_id]) {
      lineItemsMap[box.combo_id] = {
        id: box.combo_id,
        name: combo,
        quantity: 1,
        meta_data: [
          {
            key: isOffice,
            value: box.office,
          },
          {
            key: lineCart,
            value: [],
          }
        ]
      };
    }
    const metaDataValue = lineItemsMap[box.combo_id].meta_data[1].value;
    const weekDayExists = metaDataValue.some(
      (item: any) => item.name === box.week_day && item.section_label === box.week_day
    );

    if (!weekDayExists) {
      metaDataValue.push({
        name: box.week_day,
        section_label: box.week_day,
        value: "Lunch",
        quantity: 1,
      });
    }
    lineItemsMap[box.combo_id].meta_data[1].value.push({
      name: box.type,
      section_label: box.type,
      value: box.sticker,
      quantity: 1,
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
