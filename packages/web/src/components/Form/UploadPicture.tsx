import React from 'react';
import {Form, message, Upload} from "antd";
import axios from "axios";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";

interface Props {
  load: boolean
  setLoad: (value: boolean) => void
  picture: string
  setPicture: (value: string) => void
  className?: string
  name?: string
  link?: string
}

const UploadPicture = ({
                         load,
                         setLoad,
                         picture,
                         setPicture,
                         className,
                         name = "picture",
                         link = 'https://e8dsho1l09.execute-api.us-east-1.amazonaws.com/image'
}: Props) => {

  const uploadButton = (
    <div>
      {load ? <LoadingOutlined/> : <PlusOutlined/>}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (
    <Form.Item label="Picture" name={name}>
      <Upload
        name={name}
        listType="picture-card"
        className={className}
        showUploadList={false}
        customRequest={async (options) => {
          setLoad(true)
          try {
            const {data} = await axios.post(link);
            const {url} = await fetch(data, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data"
              },
              body: options.file
            })
            const imageUrl = url.split('?')[0]
            setPicture(imageUrl);
          } catch (error) {
            console.log('Error uploading file: ', error);
          } finally {
            setLoad(false);
          }
        }}
        beforeUpload={async (file) => {
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          if (!isJpgOrPng) {
            await message.error('You can only upload JPG/PNG file!');
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            await message.error('Image must smaller than 2MB!');
          }
          return isJpgOrPng && isLt2M;
        }}
      >
        {!load && picture ?
          <img src={picture} alt="component photo" style={{width: '100%'}}/> : uploadButton}
      </Upload>
    </Form.Item>
  );
};

export default UploadPicture;
