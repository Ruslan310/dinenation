import React from 'react';
import {Typography} from 'antd';
import {colorTheme} from "../../utils/theme";
import ComboSvg from "../../components/svg/ComboSvg";

const {Title, Text} = Typography;

const WaitDish = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    margin: '0 auto'
  }}>
    <div style={{textAlign: 'center'}}>
      <ComboSvg style={{
        width: 100,
        height: 100,
      }} color={colorTheme.secondary} />
      <Title level={4} style={{marginTop: 20, color: colorTheme.secondary}}>We haven't prepared the menu for next week yet.</Title>
      <Text style={{color: colorTheme.secondary}}>Please come back at 15:00.</Text>
    </div>
  </div>
);

export default WaitDish;
