import React from 'react';
import {Button, Form, InputNumber, Select, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

interface Props {
  arr?: PropsArr[];
  name: string;
  buttonText: string;
  placeholder: string;
}

interface PropsArr {
  id: number;
  title: string;
}

const SelectComboProduct = ({arr = [], name, buttonText, placeholder}: Props) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove,  }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex'}} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'product_id']}
                rules={[{ required: true, message: 'Missing product name' }]}
              >
                <Select<string, { value: string; children: string }>
                  showSearch
                  style={{minWidth: 220}}
                  placeholder={placeholder}
                  filterOption={(input, option) =>
                    option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                  }
                >
                  {arr.map(({id, title}) =>
                      <Select.Option
                        key={id}
                        value={id}>
                        {title}
                      </Select.Option>)
                  }
                </Select>
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'price']}
                rules={[{ required: true, message: 'Missing price' }]}
              >
                <InputNumber min={0} placeholder="0" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              {buttonText}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default SelectComboProduct;
