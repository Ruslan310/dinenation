import CryptoJS from 'crypto-js';
import Resizer from 'react-image-file-resizer';
import {CRYPTO_KEY, EURO} from "../constants";
import dayjs from 'dayjs';
import {EWEEK_DAY, WEEKDAY_ORDER} from "./utils";


const time = dayjs();
const currentDay = time.format('dddd');

export const currency = (value: number) => `${EURO} ${value.toFixed(2)}`;

export const encryptData = (data: string): string => CryptoJS.AES.encrypt(data, CRYPTO_KEY).toString();

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, CRYPTO_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const dayTime = (t: number) => time.hour(t).minute(0).second(0);

export const openDay = (): boolean => {
  const tenAM = dayTime(10);
  return time.isAfter(tenAM) || time.isSame(tenAM);
};

export const openWeek = (): boolean => {
  const tenAM = dayTime(15);
  return time.isAfter(tenAM) || time.isSame(tenAM);
};


export const getCurrentWeekDay = () => {
  const weekDays = Object.values(EWEEK_DAY);
  const currentDayIndex = weekDays.indexOf(currentDay as EWEEK_DAY);
  return weekDays[currentDayIndex].toUpperCase();
};

export const currentDayIndex = WEEKDAY_ORDER.indexOf(currentDay as EWEEK_DAY);
// export const currentDayIndex = WEEKDAY_ORDER.indexOf('Friday' as EWEEK_DAY); //test day

export const capitalizeFirstLetter = (day: string): string => {
  return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
};

export const generateUniqueId = (): number => Math.floor(Date.now() % 1000000000 + Math.random() * 1000);


export const resizeImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      300, // ширина изображения
      300, // высота изображения
      'JPEG', // формат
      70, // качество изображения
      0, // ротация
      (uri: string | Blob | ProgressEvent<FileReader>) => {
        if (typeof uri === 'string') {
          // Если uri — строка, преобразуем ее в Blob
          fetch(uri)
            .then(res => res.blob())
            .then(blob => {
              const resizedFile = new File([blob], file.name, { type: file.type });
              resolve(resizedFile);
            })
            .catch(err => reject(err));
        } else if (uri instanceof Blob) {
          // Если uri — Blob, используем его напрямую
          const resizedFile = new File([uri], file.name, { type: file.type });
          resolve(resizedFile);
        } else {
          reject(new Error('Unsupported file type returned from Resizer'));
        }
      },
      'base64'
    );
  });
};
