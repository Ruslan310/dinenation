import React from 'react';
import {Button, Form, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

interface Props {
  name: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
  children: React.ReactNode
}

const SelectFieldsComponent = ({
                              children,
                              name,
                              buttonText = 'Add',
                              className = '',
}: Props) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space className={className} key={key} style={{display: 'flex'}} align="baseline">
              <Form.Item
                {...restField}
                name={[name, 'title']}
                rules={[{ required: true, message: 'Missing office name' }]}
              >
                {children}
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

export default SelectFieldsComponent;
