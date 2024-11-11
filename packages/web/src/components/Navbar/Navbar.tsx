import React, {useContext, useState} from 'react';
import styles from "./Navbar.module.css";
import {Menu, Modal} from "antd";
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
import MenuSvg from "../svg/MenuSvg";
import {MainContext} from "../../contexts/MainProvider";
import {PageConfig, ROLE} from "../../utils/utils";
import SettingSvg from "../svg/SettingSvg";
import {useResize} from "../../hooks/useResize";
import OrderSvg from "../svg/OrderSvg";

const Navbar = () => {
  const {signOut} = useAuthenticator((context) => [context.user]);
  const path = window.location.pathname.replace(new RegExp("/(\\w*)"), "$1")
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false)
  const {userData} = useContext(MainContext);
  const {isScreenLg } = useResize();
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logOut') {
      setOpen(true)
    } else {
      navigate(`/${e.key}`)
    }
  };

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {key: 'menu', icon: <MenuSvg className={styles.svgIcon} color={path === '/' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Menu'},
    {key: 'history', icon: <HistorySvg className={styles.svgIcon} color={path === 'history' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Order history'},
    // {key: 'address', icon: <AddressSvg className={styles.svgIcon} color={path === 'address' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'My Address'},
    {key: 'reviews', icon: <ReviewsSvg className={styles.svgIcon} color={path === 'reviews' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'My reviews'},
    {key: 'contact', icon: <ContactUsSvg className={styles.svgIcon} color={path === 'contact' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Contact Us'},
    {key: 'profile', icon: <ProfileSvg className={styles.svgIcon} color={path === 'profile' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Edit Profile'},
    {key: 'logOut', icon: <LogOutSvg className={styles.svgIcon} color={colorTheme.primary}/>, label: !isScreenLg && 'Log Out', danger: true},
  ];

  if (userData?.role === ROLE.ADMIN) {
    items.unshift(
      {key: 'orders', icon: <SettingSvg className={styles.svgIcon} color={path === 'orders' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Admin'},
    )
  }
  if (userData?.role === ROLE.ADMIN || userData?.role === ROLE.HR) {
    items.unshift(
      {key: 'company-orders', icon: <OrderSvg className={styles.svgIcon} color={path === 'company-orders' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Company orders'},
    )
  }

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
            localStorage.removeItem('cartList')
            localStorage.removeItem('cartTimestamp');
            localStorage.removeItem('cartTComment');
            navigate(PageConfig.auth)
            setOpen(false)
          }}>OK</Button>
        </div>
      </Modal>
      <LogoSvg size={!isScreenLg ? 100 : 40} type={logoType.VERTICAL} click={() => navigate(PageConfig.home)} style={{cursor: 'pointer'}}/>
      <Avatar size={100} showFullName={!isScreenLg} />
      <Menu
        className={styles.menuContainer}
        defaultSelectedKeys={[path]}
        mode="inline"
        items={items}
        onClick={onClick}
      />
    </div>
  );
};

export default Navbar;
