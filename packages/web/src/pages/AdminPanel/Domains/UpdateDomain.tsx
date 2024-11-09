import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Collapse, CollapseProps, DatePicker, Form, Input, message, Select, Switch} from "antd";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Coupons.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import {ProductStatus} from "../../../utils/utils";
import dayjs from 'dayjs';
import {RangePickerProps} from "antd/es/date-picker";
import SelectFieldsComponent from "../../../components/Form/SelectFieldsComponent";
import {NotFound} from "../../index";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

export interface CouponForm {
  id: number;
  title: string;
  has_domain: boolean;
  domain_id: number
  address: string;
  expiration_date: string;
  status: string;
}

interface InitialForm {
  id: number;
  title: string;
  has_domain: boolean;
  domain_id: number
  address: string;
  expiration_date: dayjs.Dayjs;
  status: string;
  office: OfficeForm[];
}

export interface OfficeForm {
  title: string;
  coupon_id: number
}

const key = 'updatable';


const UpdateCoupon = () => {
  const currentId= useParams();
  const currentCouponId = Number(currentId?.id) as number
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<InitialForm>>();
  const [form] = Form.useForm();

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const [coupon] = useTypedQuery({
    query: {
      coupon: {
        __args: {
          id: currentCouponId
        },
        id: true,
        title: true,
        status: true,
        has_domain: true,
        domain: {
          id: true
        },
        address: true,
        expiration_date: true,
        office: {
          coupon_id: true,
          title: true
        }
      },
    },
  });

  const [domains] = useTypedQuery({
    query: {
      domains: {
        id: true,
        title: true,
      },
    },
  });

  const [_, updateCoupon] = useTypedMutation((opts: CouponForm) => ({
    updateCoupon: {
      __args: opts,
      id: true,
    },
  }));

  const [_o, addOffice] = useTypedMutation((opts: OfficeForm) => ({
    addOffice: {
      __args: opts,
      id: true
    },
  }));

  const [del, deleteOffice] = useTypedMutation((opts: {
    coupon_id: number
  }) => ({
    deleteOffice: {
      __args: opts,
    },
  }));

  useEffect(() => {
    if (coupon.data?.coupon) {
      const {
        domain,
        expiration_date,
        ...rest
      } = coupon.data?.coupon;
      const time = expiration_date ? {expiration_date: dayjs(expiration_date)} : {}
      setInitialValues({
        domain_id: domain.id,
        ...rest,
        ...time,
      });
    }
  }, [coupon.data])

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Offices',
      children: (
        <SelectFieldsComponent
          name="office"
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
      {initialValues ?
        <Form layout="horizontal" className={styles.form} form={form} initialValues={initialValues}>
            <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
              <Input placeholder='Enter sauces name'/>
            </Form.Item>
            <Form.Item name="address" rules={[{required: true, message: 'Please enter address!'}]} className={styles.field}>
              <Input placeholder='Enter coupon address'/>
            </Form.Item>
          <div className={styles.dateSwitch}>
            <Form.Item name="expiration_date" className={styles.field}>
              <DatePicker disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item label={"Has domain"} name="has_domain" className={styles.field}>
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
            rules={[{required: true, message: 'Please select order status!'}]}
            style={{display: 'inline-block'}}
            className={styles.field}
          >
            <Select<string, { value: string; children: string }>
              placeholder="Select product status"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {Object.values(ProductStatus)
                .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Form.Item>
          <Collapse bordered={false} className={styles.collapse} items={items}/>
          <Form.Item className={styles.button}>
            <Button onClick={async () => {
              try {
                await form.validateFields();
                message.loading({content: 'Saving component...', key});
                const {
                  expiration_date,
                  offices,
                  office,
                  ...rest
                } = form.getFieldsValue();
                const {data} = await updateCoupon({
                  id: currentCouponId,
                  expiration_date: expiration_date?.toISOString() || '',
                  ...rest
                });
                if (data && offices?.length) {
                  await deleteOffice({coupon_id: currentCouponId})
                  offices?.map(async ({title}: { title: string }) =>
                    await addOffice({
                      title,
                      coupon_id: currentCouponId
                    })
                  );
                }
                message.success({content: 'Sauces successfully saved!', key, duration: 2});
                data && navigate('/coupons')
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Coupons
            </Button>
          </Form.Item>
        </Form>
        : <Loading/>
      }
    </div>
  );
};

export default UpdateCoupon;
