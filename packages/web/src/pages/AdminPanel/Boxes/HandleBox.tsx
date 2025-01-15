import React, {forwardRef, useCallback, useMemo} from 'react';
import {Button, Typography} from "antd";
import styles from "./Boxes.module.css";
import {BoxStatus, dateFormat, EWEEK_DAY} from "../../../utils/utils";
import {IBoxes} from "./Boxes";
import dayjs from "dayjs";
import {currentDay} from "../../../utils/handle";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import PDF from "jspdf";
import Roboto from './Roboto-Regular.ttf';

const {Text, Title} = Typography;
const cyrillicToTranslit = new (CyrillicToTranslit as any)();

interface Props {
  boxes: IBoxes[];
  selectedDay: EWEEK_DAY;
  setOpen: (value: boolean) => void;
  setGeneratingStickers: (value: boolean) => void;
}

interface Sticker {
  orderNumber: string;
  customerName: string;
  dishName: string;
  company: string;
  qrCode: string;
  boxId: number;
  sauce: string;
  customerComment: string;
  date: string;
}

interface InstType {
  qrCode: string;
  message: string;
  subMessage: string;
}

const qrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATASURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ2clIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1LzBJAn1NwA2aTmBshvUvPGSdWik6pFJ1WLPlmmZhOQN9TcAHlCzQ2QSc0NkEnNjZpNQDadVC06qVp0UrXoky8D8oSaJ4DcqJmATGpugExqJiCTmt8E5Ak133RSteikatFJ1aJP/nFA3lBzo2YCMqmZgExq/iUnVYtOqhadVC365B+nZgJyA+QJNTdAboBMav5mJ1WLTqoWnVQt+uTL1PxJ1GwCMql5Asgbav4kJ1WLTqoWnVQt+mQZkP+TmgnIpGYCMqmZgExqJiA3QCY1bwD5k51ULTqpWnRSteiTl9T8ydQ8AWRS84aaCcgTav4mJ1WLTqoWnVQt+uQlIJOaCcgmNZOaTWomIJOaSc0EZFJzo+YGyCY133RSteikatFJ1SL8kReA3KiZgNyouQEyqbkB8oSaTUB+k5ongExq3jipWnRSteikatEnv0zNBGQCcqNmk5ongNyomdTcAJnUTEC+Sc2mk6pFJ1WLTqoW4Y98EZBJzQ2QSc0E5JvUTEBu1DwBZFIzAdmkZgIyqdl0UrXopGrRSdUi/JEXgNyomYBMam6AfJOaN4DcqPlNQG7UfNNJ1aKTqkUnVYvwR14AsknNDZAbNROQSc0E5Ak1E5A/iZongExq3jipWnRSteikahH+yCIgk5oJyI2aCciNmgnIE2omIE+omYBMap4AMql5AsiNmm86qVp0UrXopGoR/sgXAZnU3ACZ1NwAmdRMQN5QMwG5UTMBeULNDZBJzRNAJjWbTqoWnVQtOqla9MlLQCY1N0AmNTdAJjU3QCY1E5AbNROQSc0NkEnNBGRS84SaGyA3ar7ppGrRSdWik6pFn/wyNTdqnlAzAXlCzY2aGyCTmk1AnlAzAbkBMql546Rq0UnVopOqRZ/8z4A8oeZGzQRkUvMGkDfUPKFmArJJzaaTqkUnVYtOqhZ98suA3Ki5ATKpmYBMaiYgk5obIJOaN4A8oWZS84SaCcikZtNJ1aKTqkUnVYs++Z+puQGySc0EZFIzqXkCyCYgT6iZgNwAmdS8cVK16KRq0UnVIvyRvxiQSc0TQJ5QMwF5Qs0EZFLzBJBNat44qVp0UrXopGrRJy8B+U1qJjVPAJnUTEBugDyhZgLyBJBJzRtqvumkatFJ1aKTqkWfLFOzCcgNkDeA3KiZgNyo2aTmCTVPAJnUvHFSteikatFJ1aJPvgzIE2reUHMD5EbNBORGzQRkUjOpmYBMQDYBuVGz6aRq0UnVopOqRZ/8Y4BsUnMDZFJzA+RGzRtAngAyqXnjpGrRSdWik6pFn/zj1ExAJjU3QJ4AMql5AshvUrPppGrRSdWik6pFn3yZmm9ScwNkUjMBmdRMaiYgN2pu1ExAnlAzAblRMwH5ppOqRSdVi06qFn2yDMhvAnKjZgJyA2RSc6NmAjKpmYBMap4AcqNmAjKp+aaTqkUnVYtOqhbhj1QtOaladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhb9B3+SQQo/K7IuAAAAAElFTkSuQmCC';
const qrCodeInst = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaAQAAAAAefbjOAAADAklEQVR4nO2cS46jMBRFz2uQMjRSLaCXAjvrNfUOYCm1gJbwMJLR7YExOKlBq7pKpIo8BuRjjmLLT+9zbcfEu6/px/sZcMghhxxyyCGHzgnZerUwmRnEFqYO8jtieWB4SPccOh7qJUkz0CthAwCxxYaQsIFGkqRb6LjuOXQc1K6vsYP+NzANICJYr8WYrEn5IzTp8O459HDIfs3A9PNqTF0jCJvL+ORfcuhrQu3br5pkBIBo0I9LK+In/JJD3wMqFhEERNDUNYh4EcSXZJM1OXuolawvPiaHPgGazMysW6OGDaw3+vxxyaXGo7rn0NE+YncAmn4mIKScXgquplsP8eXH5NDHIbOOGynCWpi6xdYSdHvkMd1z6ECIrDP0M1mUoJ8bSUpoDImsURBSjh9ZlRi/+Jgc+ghUJjnP/lpu0itRJKlGGoNyg1vE+aEyyRTPoJlyU6K4DEna3rlFnBmiTDdozN/sUUOre9giSVa73SLODJU8QmuFQT83yhkFrFZSuwy3iLNDdbqwBowtfujOPXge8TyQxpCwIUhZphpoigIRrsZkLRrjRTY8pHsOPQCKLRpjm4tMiGbApkdke7nammp8kzE59D9QpUfsJegaSUJRL1VaPY84P7TlEVsCOTc3SaWKUJH1K7eIs0Ps/qCUm5sJzKXCgEaVMuEWcWbovtao40fRpe50TLeIU0M3UUMJjTSbYn2TQriK/RxQJTvs4lRZ35LybdOv3CLOD9VCVHYFe84wU1Y8Z3KDW8T5oSqzrGa/8hYlpnge8SRQSSCr2W+Uhah+DyelwavP80N5V13ZQNkkCH+Mfu4Q8SVp6jCIL7lBR3fPoUdBVT7JVlywWPYRWb2MFz/T9URQXA91lk0SQN6DC2UDZkj30HHdc+gw6M0Jnv71IiPMsv61xQhXgzBjxNZP+T0jNHWLSfOS1zk1xos0slh9RPi7jcmh91yrHrEr1tSydbVjxvWI54AqFZtNnNoXuXb1slrrcIs4M2T69zP3l/8zmUMOOeSQQw45BPAXUQ29GhwuS0sAAAAASUVORK5CYII=\n';


const HandleBox = forwardRef<HTMLDivElement, Props>(({
                                                       boxes, selectedDay, setOpen, setGeneratingStickers
                                                     }, ref) => {

  const dateWeek = useCallback(() => {
    const currentMoment = dayjs();
    const targetDayIndex = Object.values(EWEEK_DAY).indexOf(selectedDay);
    const currentDayIndex = Object.values(EWEEK_DAY).indexOf(currentDay as EWEEK_DAY);
    return currentMoment.add(targetDayIndex - currentDayIndex, 'days').format('DD.MMM');
  }, [selectedDay])

  const splitText = (text: string, maxLength: number) => {
    const words = text.split(' ');
    let currentLine = '';
    const result: string[] = [];
    for (let i = 0; i < words.length; i++) {
      if ((currentLine + words[i]).length <= maxLength) {
        currentLine += (currentLine === '' ? '' : ' ') + words[i];
      } else {
        result.push(currentLine);
        currentLine = words[i];
      }
    }
    result.push(currentLine)
    return result;
  }

  const generatePdfForPaperBoxes = async () => {
    setGeneratingStickers(true)
    try {
      const companyOrders = boxes.filter(box => box.coupon === 'advantika' && box.week_day === selectedDay)

      const doc = new PDF({
        orientation: 'l',
        unit: 'mm',
        format: [60, 45],
      });
      for (let i = 0; i < companyOrders.length; i++) {
        const sticker = companyOrders[i]
        if (i > 0) {
          doc.addPage([60, 45], "l");
        }
        doc.text(dateWeek(), 42, 40)
        doc.setFontSize(13);
        doc.setFontSize(15);
        doc.text(cyrillicToTranslit.transform(sticker.customer.split(' ')[0], '_'), 5, 8,)
        doc.text(cyrillicToTranslit.transform(sticker.customer.split(' ')[1], '_'), 5, 16,)
        doc.setFont("times", "bold");
        doc.setFontSize(19);
        doc.text(cyrillicToTranslit.transform(sticker.coupon, '_'), 5, 24)
        doc.setFont("times", "normal");
        doc.setFontSize(12);
        doc.setFontSize(16);
        doc.text(sticker.number, 5, 40)
      }
      doc.save(selectedDay + ".pdf")
    } finally {
      setGeneratingStickers(false)
    }
  }

  const generatePdfForPrint = async (newOnly: boolean = false) => {
    setGeneratingStickers(true)
    try {
      const printBoxes: Sticker[] = [];
      const currentDayBoxes = boxes.filter(box => {
        if (newOnly) {
          return box.week_day === selectedDay && box.status === BoxStatus.NEW;
        } else {
          return box.week_day === selectedDay;
        }
      });
      if (currentDayBoxes.length === 0) {
        alert('Nothing to print!!');
      } else {
        for (let i = 0; i < currentDayBoxes.length; i++) {
          const box = currentDayBoxes[i];

          printBoxes.push({
            orderNumber: box.number || "",
            customerName: box?.customer || "",
            dishName: box.sticker,
            company: box.office || box?.coupon || "",
            qrCode: qrCode,
            boxId: box.id,
            sauce: box.sauce || '',
            customerComment: box?.comment || '',
            date: dateWeek(),
          })
        }

        console.log('----- printBoxes lenght: ', printBoxes.length)
        printBoxes.sort((a,b) => {
          if (a.company.toLowerCase() > b.company.toLowerCase()) {
            return 1
          }
          if (a.company.toLowerCase() < b.company.toLowerCase()) {
            return -1
          }
          if (a.dishName > b.dishName) {
            return 1
          }
          if (a.dishName < b.dishName) {
            return -1
          }
          return 0
        })

        const doc = new PDF({
          orientation: 'l',
          unit: 'mm',
          format: [60, 45],
        });
        for (let i = 0; i < printBoxes.length; i++) {
          const {
            dishName,
            qrCode,
            date,
            customerName,
            orderNumber,
            customerComment,
            company,
            sauce
          } = printBoxes[i]
          if (i > 0) {
            doc.addPage([60, 45], "l");
          }
          doc.addImage(qrCode, 1, 1, 11, 11)
          doc.setFontSize(12);
          doc.text(date, 42, 5)
          doc.setFontSize(13);
          doc.text(cyrillicToTranslit.transform(customerName.split(' ')[0], '_'), 13, 5.5,)
          doc.text(cyrillicToTranslit.transform(customerName.split(' ')[1], '_'), 13, 10,)
          doc.setFont("times", "bold");

          let sticker = dishName.split("+")
          let stickerSoupAndSalad
          if (sticker[0] && sticker[0].toLowerCase().includes('salad') && sticker[0].includes('-')) {
            let isStickerSoupAndSalad = sticker[0].split(' - ')
            sticker[0] = isStickerSoupAndSalad[0]
            stickerSoupAndSalad = isStickerSoupAndSalad[1]
          }
          let newSticker = splitText(sticker[0], 18)
          if (sticker.length > 1) {
            newSticker = [...newSticker, splitText(sticker[1], 18)].flat() as string[]
          }

          doc.setFontSize(16);
          if (newSticker.length >= 4) {
            newSticker = splitText(sticker[0], 26)
            if (sticker.length > 1) {
              newSticker = [...newSticker, splitText(sticker[1], 26)].flat() as string[]
            }
            doc.setFontSize(12);
          }
          for (let k = 0; k < newSticker.length; k++) {
            doc.text(newSticker[k], 2, (newSticker.length < 3 ? 22 : 17)+(k*6),)
          }

          if (sauce) {
            doc.setFont("times", "bold");
            doc.setFontSize(12);
            doc.text(cyrillicToTranslit.transform(`Sauce: ${sauce}`, '_'), 2, 36)
          }
          doc.setFont("times", "normal");
          doc.setFontSize(12);
          doc.text(cyrillicToTranslit.transform(company.substr(0, 12), '_'), 2, 42)
          doc.setFontSize(15);
          doc.text(orderNumber, 32, 42)
          doc.setFontSize(16);

          if (stickerSoupAndSalad) {
            doc.addPage([60, 45], "l");
            doc.addImage(qrCode, 1, 1, 12, 12)
            doc.setFontSize(12);
            doc.text(date, 42, 5)
            doc.setFontSize(13);
            doc.text(cyrillicToTranslit.transform(customerName.split(' ')[0], '_'), 14, 5.5,)
            doc.text(cyrillicToTranslit.transform(customerName.split(' ')[1], '_'), 14, 11.5,)
            doc.setFont("times", "bold");
            newSticker = splitText(stickerSoupAndSalad, 18)
            doc.setFontSize(16);
            if (newSticker.length >= 4) {
              newSticker = splitText(stickerSoupAndSalad, 26)
              doc.setFontSize(12);
            }
            for (let k = 0; k < newSticker.length; k++) {
              doc.text(newSticker[k], 2, (newSticker.length < 3 ? 22 : 18)+(k*6),)
            }
            doc.setFontSize(12);
            doc.text(cyrillicToTranslit.transform(company.substr(0, 8), '_'), 2, 42)
            doc.setFontSize(15);
            doc.text(orderNumber, 32, 42)
            doc.setFontSize(16);
          }

          if (customerComment) {
            let customMess = splitText(customerComment, 26)
            doc.addPage([60, 45], "l");
            doc.text(orderNumber, 2, 7)
            doc.setFontSize(15);
            doc.text(date, 42, 7)
            doc.setFontSize(16);
            doc.text(cyrillicToTranslit.transform(customerName, ' '), 2, 14,)
            for (let k = 0; k < customMess.length; k++) {
              doc.setFontSize(13);
              doc.text(customMess[k], 2, 22+(k*6),)
            }
          }
        }
        let newPrefix = '';
        if (newOnly) {
          newPrefix = 'NEW-';
        }

        doc.save(newPrefix + selectedDay + " " + dayjs().format(dateFormat.DATE) + ".pdf")
      }
    } finally {
      setGeneratingStickers(false)
    }
  }

  const generatePdfInst = () => {
      const printBoxes = {
            qrCode: qrCodeInst,
            message: 'Scan and follow us on Instagram!',
            subMessage: 'Отсканируй и подпишись на нас в Instagram!',
          }

        const doc = new PDF({
          orientation: 'l',
          unit: 'mm',
          format: [60, 45],
        });
          const {
            qrCode,
            message,
            subMessage,
          } = printBoxes
          doc.addImage(qrCode, 18, 1, 25, 25)
          doc.setFontSize(10);
          doc.text(message, 4, 28.5)
          doc.addFont(Roboto, 'Roboto', 'normal');
          doc.setFont('Roboto', 'normal');
          // doc.text(subMessage, 1, 28)
          doc.text('Отсканируй и подпишись', 9, 35)
          doc.text('на нас в Instagram!', 14.3, 39)
          doc.setFont("times", "bold");

        doc.save('InstagramQR'+ ".pdf")
  }

  return (
    <div ref={ref}>
      <Button className={styles.buttonBox} size={"large"} onClick={() => generatePdfForPrint()} type="default" htmlType="submit">
        <>
          <Text keyboard>Print </Text>
          <Text keyboard strong>{selectedDay}</Text>
        </>
      </Button>
      <Button className={styles.buttonBox} size={"large"} onClick={() => generatePdfForPrint(true)} type="dashed"
              htmlType="submit">
        <>
          <Text style={{color: "green", fontWeight: "bold"}}>NEW ONLY
            ({boxes.filter(box => box.week_day === selectedDay && box.status === BoxStatus.NEW).length})</Text>
        </>
      </Button>
      <Button className={styles.buttonBox} size={"large"} onClick={() => setOpen(true)} type="dashed"
              htmlType="submit">
        <>
          <Text style={{color: "red", fontWeight: "bold"}}>SET NEW TO PRINTED
            ({boxes.filter(box => box.week_day === selectedDay && box.status === BoxStatus.NEW).length})</Text>
        </>
      </Button>
      <Button className={styles.buttonBox} size={"large"} onClick={() => generatePdfForPaperBoxes()} type="default" htmlType="submit">
        <>
          <Text keyboard>Print Paper boxes (Advantika, WellTech)</Text>
          <Text keyboard strong>{selectedDay}</Text>
        </>
      </Button>
      <Button onClick={() => generatePdfInst()} className={styles.buttonBox} size={"large"}>
        <>
          <Text keyboard>Inst QRcode</Text>
        </>
      </Button>
    </div>
  );
});

export default HandleBox;
