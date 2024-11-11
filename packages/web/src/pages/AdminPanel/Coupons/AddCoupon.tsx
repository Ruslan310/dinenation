import React from 'react';
import styles from './Coupons.module.css'
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {useNavigate} from "react-router-dom";
import {Button, Collapse, CollapseProps, DatePicker, Form, Input, message, Select, Switch} from 'antd';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {PageConfig, ProductStatus} from "../../../utils/utils";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import SelectFieldsComponent from "../../../components/Form/SelectFieldsComponent";
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

export interface CouponForm {
  title: string;
  has_domain: boolean;
  domain_id: number;
  address: string;
  expiration_date: string;
  status: string;
  check_order: boolean;
  hide_price: boolean;
}

export interface OfficeForm {
  title: string;
  coupon_id: number
}

const key = 'updatable';

const AddCoupon = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [_c, addCoupon] = useTypedMutation((opts: CouponForm) => ({
    addCoupon: {
      __args: opts,
      id: true
    },
  }));

  const [_o, addOffice] = useTypedMutation((opts: OfficeForm) => ({
    addOffice: {
      __args: opts,
      id: true
    },
  }));

  const [domains] = useTypedQuery({
    query: {
      domains: {
        id: true,
        title: true,
      },
    },
  });


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
      <Form layout="horizontal" form={form} className={styles.form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter coupon name'/>
        </Form.Item>
        <div className={styles.dateSwitch}>
          <Form.Item name="expiration_date" className={styles.field}>
            <DatePicker disabledDate={disabledDate}/>
          </Form.Item>
          <Form.Item initialValue={false} label={"Has domain"} name="has_domain" className={styles.field}>
            <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}/>
          </Form.Item>
        </div>
        <div className={styles.dateSwitch}>
          <Form.Item initialValue={false} label={"Check order"} name="check_order" className={styles.field}>
            <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}/>
          </Form.Item>
          <Form.Item initialValue={false} label={"Hide price"} name="hide_price" className={styles.field}>
            <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}/>
          </Form.Item>
        </div>
        <Form.Item
          name="domain_id"
          rules={[{required: true, message: 'Select domain!'}]}
          style={{display: 'inline-block'}}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            placeholder="Select domain"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {domains.data?.domains
              .map(({id, title}) => <Select.Option key={id} value={id}>{title}</Select.Option>)}
          </Select>
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
        <Form.Item name="address" rules={[{required: true, message: 'Please enter company address!'}]}
                   className={styles.field}>
          <Input placeholder='Enter company address'/>
        </Form.Item>
        <Collapse bordered={false} className={styles.collapse} items={items}/>
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving component...', key});
              const {
                offices,
                expiration_date,
                ...rest
              } = form.getFieldsValue();
              const {data} = await addCoupon({
                expiration_date: expiration_date?.toISOString() || '',
                ...rest
              });
              if (data && offices?.length) {
                offices?.map(async ({title}: { title: string }) =>
                  await addOffice({
                    title,
                    coupon_id: data.addCoupon.id
                  })
                );
              }
              message.success({content: 'Sauces successfully saved!', key, duration: 2});
              data && navigate(PageConfig.coupons)
            } catch (e) {
              console.log('validations errors: ', e);
            }
          }} type="primary" htmlType="submit">
            Add Coupon
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCoupon;
