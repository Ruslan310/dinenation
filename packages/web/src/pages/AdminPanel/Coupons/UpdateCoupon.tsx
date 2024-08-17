import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Collapse, CollapseProps, DatePicker, Form, Input, message, Select} from "antd";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Coupons.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import {ProductStatus} from "../../../utils/utils";
import dayjs, {Dayjs} from 'dayjs';
import {RangePickerProps} from "antd/es/date-picker";
import SelectFieldsComponent from "../../../components/Form/SelectFieldsComponent";
import {OfficeFormAdd} from "./AddCoupon";

interface CouponForm {
  id: number;
  title: string;
  status: string;
  expiration_date: Dayjs;
}

interface InitialForm extends CouponForm {
  offices: OfficeForm[];
}

interface OfficeForm {
  title: string;
}

const key = 'updatable';


const UpdateCoupon = () => {
  const currentId= useParams();
  const currentCouponId = Number(currentId?.id) as number
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<InitialForm>>();
  const [form] = Form.useForm();
  const [coupon] = useTypedQuery({
    query: {
      coupon: {
        __args: {
          id: currentCouponId
        },
        id: true,
        title: true,
        status: true,
        expiration_date: true,
      },
    },
  });
  const [office] = useTypedQuery({
    query: {
      officesByCoupon: {
        __args: {
          coupon_id: currentCouponId
        },
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

  const [_o, addOffice] = useTypedMutation((opts: OfficeFormAdd) => ({
    addOffice: {
      __args: opts,
      id: true
    },
  }));

  const [del, deleteOffice] = useTypedMutation((opts: {coupon_id: number}) => ({
    addOffice: {
      __args: opts,
      id: true
    },
  }));

  console.log('----office', coupon.data?.coupon)

  useEffect(() => {
    if (coupon.data?.coupon && office.data) {
      const {
        expiration_date,
        ...rest
      } = coupon.data?.coupon;
      const time = expiration_date ? {expiration_date: dayjs(expiration_date)} : {}
      setInitialValues({
        ...rest,
        offices: office.data.officesByCoupon,
        ...time,
      });
    }
  }, [coupon.data, office.data])

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
      {initialValues ?
        <Form layout="horizontal" className={styles.form} form={form} initialValues={initialValues}>
          <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
            <Input placeholder='Enter sauces name'/>
          </Form.Item>
          <Form.Item name="expiration_date" className={styles.field}>
            <DatePicker disabledDate={disabledDate} />
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
                const {data} = await updateCoupon({
                  id: currentCouponId,
                  title,
                  expiration_date: expiration_date?.toISOString() || '',
                  status,
                });
                if (data && offices?.length) {
                  await deleteOffice({coupon_id: currentCouponId})
                  offices?.map(async ({title}: {title: string }) =>
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
