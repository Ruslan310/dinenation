import React, {useContext} from 'react';
import styles from './FeedbackModal.module.css';
import Button from "../Button/Button";
import {Form, Input, message, Modal, Rate} from "antd";
import {Product} from "../../pages/OrderHistoryView/OrderHistoryView";
import {colorTheme} from "../../utils/theme";
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";

const {TextArea} = Input;

interface Props {
  date: Product | undefined
  close: () => void
}


interface FieldTypeReview {
  rate: number;
  review: string;
}

interface ReviewFields extends FieldTypeReview {
  user_id: number;
  rate: number;
  review: string;
  dish_name: string;
}

const ReviewModal = ({date, close}: Props) => {
  const [form] = Form.useForm();
  const {userData} = useContext(MainContext);

  const [_, addReview] = useTypedMutation((opts: ReviewFields) => ({
    addReview: {
      __args: opts,
      id: true,
    },
  }));

  const reset = () => {
    form.resetFields();
    close()
  }

  const submit = async () => {
    try {
      if (userData?.id)
        await addReview({
          user_id: userData?.id,
          dish_name: date?.sticker,
          ...form.getFieldsValue()
        })
      reset()
      message.success({content: 'Review successfully saved!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  }

  return (
    <Modal
      open={!!date}
      onCancel={reset}
      footer={null}
      styles={{content:
          {padding: '20px 20px 1px'}
      }}
      width={480}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={submit}
        autoComplete="off"
        requiredMark={false}
      >
        <div>
          <h3>Leave Review</h3>
          <Form.Item<FieldTypeReview>
            className={styles.starContainer}
            name="rate"
            label='Stars'
            rules={[{required: true, message: 'Please select a rating'}]}
          >
            <Rate style={{color: colorTheme.rate}} />
          </Form.Item>
          <p className={styles.starContainer}>{date?.sticker}</p>
        </div>

        <Form.Item<FieldTypeReview>
          className={styles.input}
          name="review"
          rules={[{required: true, message: 'Enter your text'}]}
        >
          <TextArea rows={4} placeholder="Enter your text"/>
        </Form.Item>
        <Form.Item className={styles.buttonContainer}>
          <Button disabled={_.fetching} loading={_.fetching} className={styles.submitButton} type="submit">
            <p>Send your feedback</p>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewModal;
