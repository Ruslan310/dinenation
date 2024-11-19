import React, {useState} from 'react';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import styles from "./Invoice.module.css";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {DatePicker, GetProps, Progress, Select, Spin} from "antd";
import dayjs, {Dayjs} from "dayjs";
import Button from "../../../components/Button/Button";
import {defaultParams} from "../../../constants";
import {utils, write} from "xlsx";
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
  itemNumber: number | undefined;
  qty: number | undefined;
  date: string;
};

const Invoice = () => {
  const [progress, setProgress] = useState(0);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [selectCoupon, setSelectCoupon] = useState<number | undefined>();
  const [start, setStart] = useState(true);
  const [showGetButton, setShowGetButton] = useState(false);
  const [showXlsxButton, setShowXlsxButton] = useState(false);
  const [csvData, setCsvData] = useState<OrderSummary[] | undefined>();

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
          existing.total_price += product.price;
        } else {
          acc.push({
            date: dayjs(order.date_created).format(dateFormat.DATE_TIME),
            number: order.number,
            qty: 1,
            total_price: product.price,
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
      'Item #': item.itemNumber,
      'Currency': item.currency,
      'Full Name': item.customer,
      'Company': item.coupon,
    }));

    sheetData.push({
      'Order Date': '',
      'Order Number': '',
      'Qty': undefined,
      'Total': currency(totalSum),
      'Item #': undefined,
      'Currency': '',
      'Full Name': '',
      'Company': '',
    });

    // Создание книги и листа
    const ws = utils.json_to_sheet(sheetData);

    ws['!cols'] = [
      { wch: 18 }, // date
      { wch: 13 }, // number
      { wch: 5 }, // qty
      { wch: 10 }, // total_price
      { wch: 7 }, // itemNumber
      { wch: 8 }, // currency
      { wch: 25 }, // customer
      { wch: 12 }, // coupon
    ];

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Invoices');

    const fileName = `Invoices - ${coupons.data?.coupons.find(coupon => coupon.id === selectCoupon)?.title || ''}`;
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
                Download as Excel
              </Button>
            }
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Invoice;
