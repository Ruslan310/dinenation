import React from 'react';
import styles from "./AdminNavbar.module.css";
import {ConfigProvider, Menu} from "antd";
import {useNavigate} from "react-router-dom";
import type { MenuProps } from 'antd';
import AddressSvg from "../svg/AddressSvg";
import ProfileSvg from "../svg/ProfileSvg";
import HistorySvg from "../svg/HistorySvg";
import ReviewsSvg from "../svg/ReviewsSvg";
import ContactUsSvg from "../svg/ContactUsSvg";
import {colorTheme} from "../../utils/theme";
import LogoSvg, {logoType} from "../svg/LogoSvg";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const path = window.location.pathname.replace(new RegExp("/(\\w*)"), "$1")
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('go to ', e.key);
    navigate(`/${e.key}`)
  };

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {key: 'product', icon: <HistorySvg color={path === 'product' ? colorTheme.darkPrimary : "#68696D"}/>, label: 'Product'},
    {key: 'combo', icon: <AddressSvg color={path === 'combo' ? colorTheme.darkPrimary : "#68696D"}/>, label: 'Combo'},
    {key: 'sauces', icon: <ReviewsSvg color={path === 'sauces' ? colorTheme.darkPrimary : "#68696D"}/>, label: 'Sauces'},
    {key: 'sideDishes', icon: <ContactUsSvg color={path === 'sideDishes' ? colorTheme.darkPrimary : "#68696D"}/>, label: 'Side Dishes'},
    {key: 'coupons', icon: <ProfileSvg color={path === 'coupons' ? colorTheme.darkPrimary : "#68696D"}/>, label: 'Coupons'},
  ];

  return (
    <div className={styles.navbarContainer}>
      <LogoSvg type={logoType.VERTICAL} click={() => navigate('/')} style={{cursor: 'pointer'}}/>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: colorTheme.navbar,
              itemActiveBg: colorTheme.navbar,
              itemSelectedColor: colorTheme.darkPrimary,
              itemBg: colorTheme.navbar,
              lineWidth: 0
            },
          },
        }}
      >
        <Menu
          className={styles.menuContainer}
          defaultSelectedKeys={[path]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </ConfigProvider>
    </div>
  );
};

export default AdminNavbar;
