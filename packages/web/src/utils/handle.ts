import CryptoJS from 'crypto-js';
import {defaultParams} from "../constants";
import dayjs from 'dayjs';
import {dateFormat, EWEEK_DAY, WEEKDAY_ORDER} from "./utils";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {botApi} from "../constants";
import axios from "axios";
import {Product} from "../pages/OrderHistoryView/OrderHistoryView";
import {GroupedProducts} from "./type";

const CRYPTO_KEY = import.meta.env?.VITE_CRYPTO_KEY
const telegramToken = import.meta.env?.VITE_TELEGRAM_TOKEN

dayjs.extend(utc);
dayjs.extend(timezone)

export const time = dayjs().tz('Europe/Nicosia');
export const currentDay = time.format(dateFormat.DAY);

export const currency = (value: number, hide?: boolean) => {
  if (hide) {
    return ''
  }
  return `${defaultParams.CURRENCY} ${value.toFixed(2)}`
};

export const encryptData = (data: string): string => CryptoJS.AES.encrypt(data, CRYPTO_KEY).toString();

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const dayTime = (t: number) => time.hour(t).minute(0).second(0);

export const openDay = (): boolean => {
  const hourAM = dayTime(defaultParams.endDayTime);
  return time.isAfter(hourAM) || time.isSame(hourAM);
};

export const openWeek = (): boolean => {
  const hourPM = dayTime(defaultParams.newWeekTime);
  return time.isAfter(hourPM) || time.isSame(hourPM);
};

export const currentDayIndex = WEEKDAY_ORDER.indexOf(currentDay as EWEEK_DAY);
// export const currentDayIndex = WEEKDAY_ORDER.indexOf('Friday' as EWEEK_DAY); //test day

export const capitalizeFirstLetter = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
};

export const generateUniqueId = (): number => Math.floor(Date.now() % 1000000000 + Math.random() * 1000);

export const sendBotMessage = async (chatId: number, text: string): Promise<void> => {
  const params = `chat_id=${encodeURIComponent(chatId.toString())}&text=${encodeURIComponent(text)}`;
  await axios(`${botApi}${telegramToken}/sendMessage?${params}`);
}

export const resizeImage = (file: File, quality = 0.15, coef = 1): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      img.src = event.target?.result as string; // Устанавливаем src для изображения

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const targetWidth = img.width * coef; // Уменьшаем до 30% от исходного размера
        const targetHeight = img.height * coef;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Рисуем уменьшенное изображение на canvas
        ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Получаем сжатое изображение с уменьшенным качеством
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, { type: file.type });
              resolve(resizedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};


//group product by id
export const groupByWeekDayAndComboId = (products: Product[]): GroupedProducts => {
  return products?.reduce((acc, product) => {
    if (!acc[product.week_day]) {
      acc[product.week_day] = {};
    }
    if (!acc[product.week_day][product.combo_id]) {
      acc[product.week_day][product.combo_id] = [];
    }
    acc[product.week_day][product.combo_id].push(product);
    return acc;
  }, {} as GroupedProducts);
}

//send message to me
const Token = '6460557426:AAGxWVU6WM8BG7FhOjTwVRqPH0zrUrQpaMU';
export const sendBotMessageForMe = async (text: string): Promise<void> => {
  const params = new URLSearchParams({chat_id: '658137109', text: text})
  await axios(`${botApi}${Token}/sendMessage?${params}`)
}
