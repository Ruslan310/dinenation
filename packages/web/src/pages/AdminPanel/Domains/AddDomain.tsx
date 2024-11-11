import React from 'react';
import styles from './Domains.module.css'
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {useNavigate} from "react-router-dom";
import {Button, DatePicker, Form, Input, InputNumber, message, Select, Switch} from 'antd';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {RangePickerProps} from "antd/es/date-picker";
import dayjs from "dayjs";
import {PageConfig} from "../../../utils/utils";

export interface DomainsForm {
  title: string;
  discount: number | null | undefined;
  expired_date: string | null | undefined;
}

export interface DomainsComboForm {
  combo_id: number;
  domain_id: number;
}

const key = 'updatable';

const AddDomain = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [_, addDomain] = useTypedMutation((opts: DomainsForm) => ({
    addDomain: {
      __args: opts,
      id: true,
    },
  }));

  const [_d, addDomainCombo] = useTypedMutation((opts: DomainsComboForm) => ({
    addDomainCombo: {
      __args: opts,
      id: true
    },
  }));

  const [combos] = useTypedQuery({
    query: {
      combosList: {
        id: true,
        title: true,
      },
    },
  });



  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Form form={form} layout="horizontal" className={styles.form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter domain name'/>
        </Form.Item>
        <Form.Item name="discount" rules={[{required: true, message: 'Please enter discount!'}]} className={styles.field}>
          <InputNumber min={0} placeholder='Discount'/>
        </Form.Item>
        <Form.Item name="expired_date" className={styles.field}>
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          name="combos"
          rules={[{ required: true, message: 'Select combo!' }]}
          style={{ display: 'inline-block' }}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            mode={'multiple'}
            placeholder="Select combo"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {combos.data?.combosList.map(({ id, title }) => (
              <Select.Option key={id} value={id}>
                {title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving ...', key});
              const {
                expired_date,
                combos,
                ...rest
              } = form.getFieldsValue();
              const {data} = await addDomain({
                expired_date: expired_date?.toISOString() || '',
                ...rest
              });
              if (data && data.addDomain?.id) {
                await combos.map((id: number) => addDomainCombo({combo_id: id, domain_id: data.addDomain?.id}))
              }
              message.success({content: 'Domain successfully saved!', key, duration: 2});
              data && navigate(PageConfig.domains)
            } catch (e) {
              console.log('validations errors: ', e);
            }
          }} type="primary" htmlType="submit">
            Add Domain
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDomain;
