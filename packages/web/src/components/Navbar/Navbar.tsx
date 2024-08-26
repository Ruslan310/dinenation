import React, {useState} from 'react';
import styles from "./Navbar.module.css";
import {ConfigProvider, Menu, Modal} from "antd";
import {useNavigate} from "react-router-dom";
import type { MenuProps } from 'antd';
import AddressSvg from "../svg/AddressSvg";
import LogOutSvg from "../svg/LogOutSvg";
import ProfileSvg from "../svg/ProfileSvg";
import HistorySvg from "../svg/HistorySvg";
import ReviewsSvg from "../svg/ReviewsSvg";
import ContactUsSvg from "../svg/ContactUsSvg";
import Avatar from "../Avatar/Avatar";
import {useAuthenticator} from "@aws-amplify/ui-react";
import Button from "../Button/Button";
import {colorTheme} from "../../utils/theme";
import LogoSvg, {logoType} from "../svg/LogoSvg";

const Navbar = () => {
  const {signOut} = useAuthenticator((context) => [context.user]);
  const path = window.location.pathname.replace(new RegExp("/(\\w*)"), "$1")
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false)

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('go to ', e.key);
    if (e.key === 'logOut') {
      setOpen(true)
    } else {
      navigate(`/${e.key}`)
    }
  };


  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {key: 'history', icon: <HistorySvg color={path === 'history' ? colorTheme.primary : "#68696D"}/>, label: 'Order history'},
    {key: 'address', icon: <AddressSvg color={path === 'address' ? colorTheme.primary : "#68696D"}/>, label: 'My Address'},
    {key: 'reviews', icon: <ReviewsSvg color={path === 'reviews' ? colorTheme.primary : "#68696D"}/>, label: 'My reviews'},
    {key: 'contactUs', icon: <ContactUsSvg color={path === 'contactUs' ? colorTheme.primary : "#68696D"}/>, label: 'Contact Us'},
    {key: 'profile', icon: <ProfileSvg color={path === 'profile' ? colorTheme.primary : "#68696D"}/>, label: 'Edit Profile'},
    {key: 'logOut', icon: <LogOutSvg color={colorTheme.primary}/>, label: 'Log Out', danger: true},
  ];

  return (
    <div className={styles.navbarContainer}>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        width={460}>
        <div className={styles.messageContainer}>
          <h3>Are you sure you want to log out?</h3>
          <Button onClick={() => {
            signOut()
            localStorage.setItem('cartList', '')
            navigate('/auth')
            setOpen(false)
          }}>OK</Button>
        </div>
      </Modal>
      <LogoSvg type={logoType.VERTICAL} click={() => navigate('/')} style={{cursor: 'pointer'}}/>
      <Avatar size={100} showFullName />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: colorTheme.navbar,
              itemActiveBg: colorTheme.navbar,
              itemSelectedColor: colorTheme.darkPrimary,
              dangerItemHoverColor: colorTheme.primary,
              dangerItemColor: colorTheme.primary,
              dangerItemActiveBg: colorTheme.primary,
              dangerItemSelectedColor: colorTheme.primary,
              dangerItemSelectedBg: colorTheme.navbar,
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

export default Navbar;
