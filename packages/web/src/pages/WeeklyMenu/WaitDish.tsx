import React from 'react';
import {SmileOutlined} from '@ant-design/icons';
import {Typography} from 'antd';
import {colorTheme} from "../../utils/theme";
const {Title, Text} = Typography;

const WaitDish = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    margin: '0 auto'
  }}>
    <div style={{textAlign: 'center'}}>
      <SmileOutlined style={{fontSize: 48, color: colorTheme.darkPrimary}}/>
      <Title level={4} style={{marginTop: 20}}>We haven't prepared the menu for next week yet.</Title>
      <Text>Please come back at 15:00 to place a new order.</Text>
    </div>
  </div>
);

export default WaitDish;
