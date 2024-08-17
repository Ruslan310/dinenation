import React from 'react';
import styles from './Coupons.module.css'
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";
import {useNavigate} from "react-router-dom";
import {Button, Collapse, CollapseProps, DatePicker, Form, Input, message, Select} from 'antd';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {ProductStatus} from "../../../utils/utils";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import SelectFieldsComponent from "../../../components/Form/SelectFieldsComponent";

export interface CouponFormAdd {
  title: string;
  expiration_date: string;
  status: string;
}

export interface OfficeFormAdd {
  title: string;
  coupon_id: number
}

const key = 'updatable';

const AddCoupon = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [_c, addCoupon] = useTypedMutation((opts: CouponFormAdd) => ({
    addCoupon: {
      __args: opts,
      id: true
    },
  }));

  const [_o, addOffice] = useTypedMutation((opts: OfficeFormAdd) => ({
    addOffice: {
      __args: opts,
      id: true
    },
  }));


  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Offices',
      children: (
        <SelectFieldsComponent
          name="offices"
          placeholder={"Office name"}
          buttonText='Add new office'
        >
          <Input placeholder='Enter office name'/>
        </SelectFieldsComponent>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Form layout="horizontal" form={form} onChange={() => console.log('======office===',form.getFieldsValue())} className={styles.form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter coupon name'/>
        </Form.Item>
        <Form.Item name="expiration_date" className={styles.field}>
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          name="status"
          rules={[{required: true, message: 'Please select coupon status!'}]}
          style={{display: 'inline-block'}}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            placeholder="Select coupon status"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {Object.values(ProductStatus)
              .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
          </Select>
        </Form.Item>
        <Collapse bordered={false} className={styles.collapse} items={items} />
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving component...', key});
              const {
                title,
                expiration_date,
                status,
                offices,
              } = form.getFieldsValue();
              const {data} = await addCoupon({
                title,
                expiration_date: expiration_date?.toISOString() || '',
                status,
              });
              if (data && offices?.length) {
                offices?.map(async ({title}: {title: string }) =>
                  await addOffice({
                    title,
                    coupon_id: data.addCoupon.id
                  })
                );
              }
              message.success({content: 'Sauces successfully saved!', key, duration: 2});
              data && navigate('/coupons')
            } catch (e) {
              console.log('validations errors: ', e);
            }
          }} type="primary" htmlType="submit">
            Add Coupons
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCoupon;
