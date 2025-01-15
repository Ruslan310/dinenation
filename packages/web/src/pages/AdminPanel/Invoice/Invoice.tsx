import React, {useMemo, useState} from 'react';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import styles from "./Invoice.module.css";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {Checkbox, DatePicker, GetProps, Progress, Select, Spin, Input, InputNumber} from "antd";
import dayjs, {Dayjs} from "dayjs";
import Button from "../../../components/Button/Button";
import {defaultParams} from "../../../constants";
import {utils, write} from "xlsx-js-style";
import {saveAs} from "file-saver";
import {dateFormat} from "../../../utils/utils";
import {currency} from "../../../utils/handle";

const {RangePicker} = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

type OrderSummary = {
  number: string;
  customer: string;
  coupon: string;
  currency: string;
  combo_id: number;
  total_price: number;
  itemNumber: number | null;
  qty: string;
  date: string;
};


const Invoice = () => {
  const [progress, setProgress] = useState(0);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [selectCoupon, setSelectCoupon] = useState<number | undefined>();
  const [coverCount, setCoverCount] = useState<number>(0);
  const [start, setStart] = useState(true);
  const [isTax, setIsTax] = useState(false);
  const [showGetButton, setShowGetButton] = useState(false);
  const [showXlsxButton, setShowXlsxButton] = useState(false);
  const [csvData, setCsvData] = useState<OrderSummary[] | undefined>();
  const taxCount = useMemo(() => isTax ? 5 : 0, [isTax]);
  const [coupons] = useTypedQuery({
    query: {
      coupons: {
        id: true,
        title: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [orders] = useTypedQuery({
    query: {
      ordersByCouponDate: {
        __args: {
          coupon_id: selectCoupon || 0,
          date_start: dateRange[0] || '',
          date_end: dateRange[1] || '',
        },
        id: true,
        number: true,
        status: true,
        price: true,
        date_created: true,
        customer: {
          first_name: true,
          last_name: true,
        },
        coupon: {
          title: true,
        },
        products: {
          id: true,
          sticker: true,
          type: true,
          week_day: true,
          office: true,
          price: true,
          combo_id: true,
        },
      },
    },
    pause: start,
    requestPolicy: 'network-only',
  });

  const changeParams = () => {
    setStart(true);
    setShowGetButton(false)
    setShowXlsxButton(false)
  }

  const handleDate = (dates: [Dayjs | null, Dayjs | null] | null) => {
    const formattedDates = dates?.map((date, index) =>
      date ? date
          .hour(index === 0 ? 12 : 8)
          .minute(0)
          .second(0)
          .format(dateFormat.DATE_TIME)
        : null
    ).filter(Boolean) as string[];    if (formattedDates) {
      setDateRange(formattedDates);
    } else {
      setDateRange([])
    }
    changeParams()
  };

  const handleInvoices = () => {
    setProgress(0);

    const totalOrders = orders.data?.ordersByCouponDate.length || 0;
    let currentOrder = 0;

    const invoice = orders.data?.ordersByCouponDate.flatMap(order => {
      const uniqueCombos: Record<number, number> = {};

      currentOrder += 1;
      setProgress(Math.round((currentOrder / totalOrders) * 100));

      return order.products.reduce<OrderSummary[]>((acc, product) => {
        if (!uniqueCombos[product.combo_id]) {
          uniqueCombos[product.combo_id] = Object.keys(uniqueCombos).length + 1;
        }

        const existing = acc.find(item => item.combo_id === product.combo_id && item.number === order.number);

        if (existing) {
          existing.total_price += product.price / (1 + taxCount / 100);
        } else {
          acc.push({
            date: dayjs(order.date_created).format(dateFormat.DATE_TIME),
            number: order.number,
            qty: '1',
            total_price: product.price / (1 + taxCount / 100),
            itemNumber: uniqueCombos[product.combo_id],
            currency: defaultParams.CURRENCY_TITLE,
            customer: `${order.customer.first_name} ${order.customer.last_name}`,
            coupon: order.coupon.title,
            combo_id: product.combo_id,
          });
        }

        return acc;
      }, []);
    });

    setProgress(100);
    setCsvData(invoice);
    setShowXlsxButton(true);
  };

  const exportToExcel = () => {
    if (!csvData) return;


    const totalSum = csvData.reduce((sum, item) => sum + item.total_price, 0);

    const sheetData = csvData.map(item => ({
      'Order Date': item.date,
      'Order Number': item.number,
      'Qty': item.qty,
      'Total': currency(item.total_price),
      'Item #': item.itemNumber?.toString(),
      'Currency': item.currency,
      'Full Name': item.customer,
      'Company': item.coupon,
    }));

    sheetData.push({
      'Order Date': 'Total',
      'Order Number': '',
      'Qty': '',
      'Total': currency(totalSum),
      'Item #': '',
      'Currency': '',
      'Full Name': '',
      'Company': '',
    });

    // Создание книги и листа
    const ws = utils.json_to_sheet(sheetData);
    const totalRowIndex = sheetData.length;
    const totalRow = totalRowIndex + 1;
    const rowTotalStyle = {
      fill: { fgColor: { rgb: 'FFFF00' } },
      font: { bold: true, color: { rgb: '000000' }, sz: 14 },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
      },
    };

    const rowStyle = {
      font: { bold: true, color: { rgb: '000000' }, sz: 14 },
      border: {
        top: { style: 'thin', color: { rgb: '000000' } },
        bottom: { style: 'thin', color: { rgb: '000000' } },
        left: { style: 'thin', color: { rgb: '000000' } },
        right: { style: 'thin', color: { rgb: '000000' } },
      },
    };

    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    columns.forEach(col => {
      const cell = ws[`${col}${1}`];
      if (cell) {
        cell.s = rowStyle;
      }
    });

    columns.forEach(col => {
      const cell = ws[`${col}${totalRow}`];
      if (cell) {
        cell.s = rowTotalStyle;
      }
    });

    ws['!cols'] = [
      { wch: 18 }, // date
      { wch: 16 }, // number
      { wch: 5 }, // qty
      { wch: 12 }, // total_price
      { wch: 7 }, // itemNumber
      { wch: 10 }, // currency
      { wch: 25 }, // customer
      { wch: 12 }, // coupon
    ];

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Invoices');

    const companyName = coupons.data?.coupons.find(coupon => coupon.id === selectCoupon)?.title || ''
    const dateFile = `${dayjs(dateRange[0]).format(dateFormat.SHORT_DATE)}-${dayjs(dateRange[1]).format(dateFormat.SHORT_DATE)}`;
    const fileName = `Details Invoices - ${companyName} ${dateFile}`;
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, `${fileName}.xlsx`);
  };

  // const exportToExcelInvoice = () => {
  //   if (!csvData) return;
  //
  //   const calculateTotalPrice = Object.values(
  //     csvData.reduce((acc, order) => {
  //       if (!acc[order.customer]) {
  //         acc[order.customer] = {
  //           customer: order.customer,
  //           total_price: 0,
  //           cover: coverCount,
  //           extra: 0
  //         };
  //       }
  //       acc[order.customer].total_price += order.total_price;
  //       return acc;
  //     }, {} as Record<string, { customer: string; total_price: number; cover: number; extra: number }>)
  //   ).map(item => {
  //     const extra = item.total_price > item.cover ? item.total_price - item.cover : 0;
  //     return { ...item, extra: extra };
  //   });
  //
  //   const totalSum = csvData.reduce((sum, item) => sum + item.total_price, 0);
  //
  //   const sheetData = calculateTotalPrice.map(item => ({
  //     'All names': item.customer,
  //     'Amount': item.total_price,
  //     'Extra': item.extra,
  //     'Cover': item.cover,
  //   }));
  //
  //   sheetData.push({
  //     'All names': 'TOTAL',
  //     'Amount': totalSum,
  //     'Extra': 0,
  //     'Cover': 0,
  //   });
  //
  //   // Создание книги и листа
  //   const ws = utils.json_to_sheet(sheetData);
  //
  //   const totalRowIndex = sheetData.length;
  //   const totalRow = totalRowIndex + 1;
  //
  //   // Добавление стилей для строки 'TOTAL'
  //   ws['A' + totalRow].s = {
  //     fill: { fgColor: { rgb: 'FFFF00' } },  // Желтый фон
  //     font: { bold: true, color: { rgb: '000000' } },  // Черный жирный шрифт
  //   };
  //   ws['B' + totalRow].s = {
  //     fill: { fgColor: { rgb: 'FFFF00' } },
  //     font: { bold: true, color: { rgb: '000000' } },
  //   };
  //   ws['C' + totalRow].s = {
  //     fill: { fgColor: { rgb: 'FFFF00' } },
  //     font: { bold: true, color: { rgb: '000000' } },
  //   };
  //   ws['D' + totalRow].s = {
  //     fill: { fgColor: { rgb: 'FFFF00' } },
  //     font: { bold: true, color: { rgb: '000000' } },
  //   };
  //
  //   // Установка ширины столбцов
  //   ws['!cols'] = [
  //     { wch: 25 }, // names
  //     { wch: 10 }, // Amount
  //     { wch: 10 }, // Extra
  //     { wch: 10 }, // Cover
  //   ];
  //
  //   const wb = utils.book_new();
  //   utils.book_append_sheet(wb, ws, 'Invoices');
  //
  //   const fileName = `Invoices - ${coupons.data?.coupons.find(coupon => coupon.id === selectCoupon)?.title || ''}`;
  //   const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
  //   const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
  //   saveAs(file, `${fileName}.xlsx`);
  // }

  const exportToExcelInvoice = () => {
    if (!csvData) return;
    const weeksData = csvData.reduce((acc, order) => {
      const orderDate = dayjs(order.date);
      const weekStart = orderDate.hour() >= 12 && orderDate.day() === 5
        ? orderDate.startOf('day').add(12, 'hour')
        : orderDate.day() < 5 || (orderDate.day() === 5 && orderDate.hour() < 8)
          ? orderDate.startOf('week').add(-2, 'day').add(12, 'hour')
          : orderDate.startOf('week').add(5, 'day').add(12, 'hour');

      const weekEnd = weekStart.add(1, 'week').set('hour', 10).set('minute', 0).set('second', 0);
      const weekKey = weekStart.format(dateFormat.DATE_TIME);
      if (!acc[weekKey]) acc[weekKey] = { weekStart, weekEnd, orders: [] };
      acc[weekKey].orders.push(order);
      return acc;
    }, {} as Record<string, { weekStart: dayjs.Dayjs, weekEnd: dayjs.Dayjs, orders: typeof csvData }>);

    const wb = utils.book_new();

    Object.values(weeksData).forEach(({ weekStart, weekEnd, orders }) => {
      const weekTotal = Object.values(
        orders.reduce((acc, order) => {
          if (!acc[order.customer]) {
            acc[order.customer] = {
              customer: order.customer,
              total_price: 0,
              cover: coverCount,
              extra: 0,
            };
          }
          acc[order.customer].total_price += order.total_price;
          return acc;
        }, {} as Record<string, { customer: string; total_price: number; cover: number; extra: number }>)
      ).map(item => {
        const extra = item.total_price > item.cover ? item.total_price - item.cover : 0;
        return { ...item, extra };
      });

      const totalSum = orders.reduce((sum, item) => sum + item.total_price, 0);

      const sheetData = weekTotal.map(item => ({
        'All names': item.customer,
        'Amount': item.total_price,
        'Extra': item.extra,
        'Cover': item.cover,
      }));

      const totalExtra = weekTotal.reduce((sum, item) => sum + item.extra, 0);

      sheetData.push({
        'All names': 'TOTAL',
        'Amount': totalSum,
        'Extra': totalExtra,
        'Cover': coverCount,
      });

      const ws = utils.json_to_sheet(sheetData);
      const totalRowIndex = sheetData.length;
      const totalRow = totalRowIndex + 1;

      const rowTotalStyle = {
        fill: { fgColor: { rgb: 'FFFF00' } },
        font: { bold: true, color: { rgb: '000000' }, sz: 14 },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
        },
      };

      const rowStyle = {
        font: { bold: true, color: { rgb: '000000' }, sz: 14 },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } },
        },
      };

      const columns = ['A', 'B', 'C', 'D'];

      columns.forEach(col => {
        const cell = ws[`${col}${1}`];
        if (cell) {
          cell.s = rowStyle;
        }
      });

      columns.forEach(col => {
        const cell = ws[`${col}${totalRow}`];
        if (cell) {
          cell.s = rowTotalStyle;
        }
      });

      ws['!cols'] = [
        { wch: 25 },
        { wch: 10 },
        { wch: 10 },
        { wch: 10 },
      ];

      const startDateFormatted = weekStart.format(dateFormat.SHORT_DATE);
      const endDateFormatted = weekEnd.format(dateFormat.SHORT_DATE);
      const sheetName = `${startDateFormatted}-${endDateFormatted}`;
      utils.book_append_sheet(wb, ws, sheetName);
    });

    const companyName = coupons.data?.coupons.find(coupon => coupon.id === selectCoupon)?.title || ''
    const dateFile = `${dayjs(dateRange[0]).format(dateFormat.SHORT_DATE)}-${dayjs(dateRange[1]).format(dateFormat.SHORT_DATE)}`;
    const fileName = `Invoices - ${companyName} ${dateFile}`;
    const excelBuffer = write(wb, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, `${fileName}.xlsx`);
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day');
  };

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Invoices</h3>
        </div>
        <Spin size="large" spinning={orders.fetching || coupons.fetching}>
          <div className={styles.content}>
            <Select<number, {value: number; children: string}>
              className={styles.select}
              value={selectCoupon}
              showSearch
              onChange={value => {
                changeParams();
                setSelectCoupon(value);
              }}
              placeholder="Select coupon"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {coupons.data?.coupons.map(({ id, title }) => (
                <Select.Option key={id} value={id}>{title}</Select.Option>
              ))}
            </Select>
            <Checkbox
              className={styles.select}
              checked={isTax}
              onChange={({target}) => {
                changeParams();
                setIsTax(target.checked);
              }}>
              Without 5% tax
            </Checkbox>
            <div className={styles.inputCount}>
              <p>Company coverage:</p>
              <InputNumber value={coverCount} onChange={count => setCoverCount(count || 0)}/>
            </div>
            <RangePicker className={styles.select} onChange={handleDate} disabledDate={disabledDate} />
            <Button className={styles.getButton} onClick={() => {
              setStart(false)
              setShowGetButton(true)
            }} disabled={!selectCoupon || !dateRange.length}>
              Generate
            </Button>
            <Button disabled={!orders.data?.ordersByCouponDate.length || !showGetButton} className={styles.getButton} onClick={handleInvoices}>
              Get Invoices
            </Button>
            {progress > 0 && showXlsxButton && <Progress style={{width: 260}} percent={progress}/>}
            {progress === 100 && showXlsxButton &&
              <Button disabled={!csvData || !showXlsxButton} onClick={exportToExcel} className={styles.getButton}>
                Details Invoice
              </Button>
            }
            {progress === 100 && showXlsxButton &&
              <Button disabled={!csvData || !showXlsxButton} onClick={exportToExcelInvoice} className={styles.getButton}>
                Invoice to Excel
              </Button>
            }
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Invoice;
