import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, DatePicker, Form, Input, InputNumber, message, Select} from "antd";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Domains.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import dayjs from 'dayjs';
import {RangePickerProps} from "antd/es/date-picker";
import {NotFound} from "../../index";
import {DomainsComboForm} from "./AddDomain";
import {PageConfig} from "../../../utils/utils";

export interface DomainForm {
  id: number;
  title: string;
  discount: number | null | undefined;
  expired_date: string | null | undefined;
}

interface InitialForm {
  id: number;
  title: string;
  discount: number | null | undefined;
  expired_date: string | null | undefined;
  combos: number[];
}

const key = 'updatable';


const UpdateDomain = () => {
  const currentId= useParams();
  const currentDomainId = Number(currentId?.id) as number
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<InitialForm>>();
  const [form] = Form.useForm();

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const [domain] = useTypedQuery({
    query: {
      domain: {
        __args: {
          id: currentDomainId,
        },
        id: true,
        title: true,
        discount: true,
        expired_date: true,
        combos: {
          id: true,
        }
      },
    },
  });

  const [combosList] = useTypedQuery({
    query: {
      combosList: {
        id: true,
        title: true,
      },
    },
  });

  const [_, updateDomain] = useTypedMutation((opts: DomainForm) => ({
    updateDomain: {
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

  const [del, deleteDomainCombo] = useTypedMutation((opts: {domain_id: number}) => ({
    deleteDomainCombo: {
      __args: opts,
    },
  }));

  useEffect(() => {
    if (domain.data?.domain && combosList.data) {
      const {
        expired_date,
        combos,
        ...rest
      } = domain.data?.domain;
      const time = expired_date ? {expiration_date: dayjs(expired_date)} : {}
      setInitialValues({
        combos: combos.map(combo => combo.id),
        ...rest,
        ...time,
      });
    }
  }, [domain.data, combosList.data])

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().endOf('day');
  };

  return (
    <div className={styles.page}>
      <AdminNavbar />
      {initialValues && domain.data?.domain && combosList.data ?
        <Form layout="horizontal" className={styles.form} form={form} initialValues={initialValues}>
          <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
            <Input placeholder='Enter domain name'/>
          </Form.Item>
          <Form.Item name="discount" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
            <InputNumber min={0} placeholder='Discount'/>
          </Form.Item>
          <Form.Item name="expired_date" className={styles.field}>
            <DatePicker disabledDate={disabledDate}/>
          </Form.Item>
          <Form.Item
            name="combos"
            rules={[{required: true, message: 'Select domain!'}]}
            style={{display: 'inline-block'}}
            className={styles.field}
          >
            <Select<string, { value: string; children: string }>
              mode={'multiple'}
              placeholder="Select combo"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {combosList.data?.combosList
                .map(({id, title}) => <Select.Option key={id} value={id}>{title}</Select.Option>
                )}
            </Select>
          </Form.Item>
          <Form.Item className={styles.button}>
            <Button loading={_.fetching || _d.fetching} onClick={async () => {
              try {
                await form.validateFields();
                message.loading({content: 'Saving ...', key});
                const {
                  expired_date,
                  combos,
                  ...rest
                } = form.getFieldsValue();
                const {data} = await updateDomain({
                  id: currentDomainId,
                  expired_date: expired_date?.toISOString() || '',
                  ...rest
                });
                if (data) {
                  await deleteDomainCombo({domain_id: currentDomainId});
                  await Promise.all(combos.map((id: number) => addDomainCombo({combo_id: id, domain_id: currentDomainId})));
                }
                message.success({content: 'Sauces successfully saved!', key, duration: 2});
                data && navigate(PageConfig.domains)
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Domain
            </Button>
          </Form.Item>
        </Form>
        : <Loading/>
      }
    </div>
  );
};

export default UpdateDomain;
