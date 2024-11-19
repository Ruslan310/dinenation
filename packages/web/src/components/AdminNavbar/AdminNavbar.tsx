import React from 'react';
import styles from "./AdminNavbar.module.css";
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import type { MenuProps } from 'antd';
import HistorySvg from "../svg/HistorySvg";
import {colorTheme} from "../../utils/theme";
import LogoSvg, {logoType} from "../svg/LogoSvg";
import MenuSvg from "../svg/MenuSvg";
import DishSvg from "../svg/DishSvg";
import ComboSvg from "../svg/ComboSvg";
import SauceSvg from "../svg/SauceSvg";
import SideDishSvg from "../svg/SideDishSvg";
import CouponSvg from "../svg/CouponSvg";
import OrderSvg from "../svg/OrderSvg";
import UserSvg from "../svg/UserSvg";
import {useResize} from "../../hooks/useResize";
import BoxesSvg from "../svg/BoxesSvg";
import ReviewsSvg from "../svg/ReviewsSvg";
import InvoiceSvg from "../svg/InvoiceSvg";
import {PageConfig} from "../../utils/utils";
import DomainSvg from "../svg/DomainSvg";
import KitchenSvg from "../svg/KitchenSvg";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const {isScreenLg } = useResize();
  const path = window.location.pathname.replace(new RegExp("/(\\w*)"), "$1")
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('go to ', e.key);
    navigate(`/${e.key}`)
  };

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {key: 'menu', icon: <MenuSvg color={path === '/' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Menu'},
    {key: 'history', icon: <HistorySvg color={path === 'history' ? colorTheme.primary : colorTheme.secondary}/>, label: !isScreenLg && 'Order history'},
    {key: 'product', icon: <DishSvg color={path === 'product' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Product'},
    {key: 'combo', icon: <ComboSvg color={path === 'combo' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Combo'},
    {key: 'sauces', icon: <SauceSvg color={path === 'sauces' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Sauces'},
    {key: 'side-dishes', icon: <SideDishSvg color={path === 'side-dishes' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Side Dishes'},
    {key: 'coupons', icon: <CouponSvg color={path === 'coupons' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Coupons'},
    {key: 'domains', icon: <DomainSvg color={path === 'domains' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Domains'},
    {key: 'users', icon: <UserSvg color={path === 'users' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Users'},
    {key: 'orders', icon: <OrderSvg color={path === 'orders' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Orders'},
    {key: 'product-reviews', icon: <ReviewsSvg color={path === 'product-reviews' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Reviews'},
    {key: 'invoice', icon: <InvoiceSvg color={path === 'invoice' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Invoice'},
    {key: 'boxes', icon: <BoxesSvg color={path === 'boxes' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Boxes'},
    {key: 'kitchen', icon: <KitchenSvg color={path === 'kitchen' ? colorTheme.darkPrimary : colorTheme.secondary}/>, label: !isScreenLg && 'Kitchen'},
  ];

  return (
    <div className={styles.navbarContainer}>
      <LogoSvg size={!isScreenLg ? 70 : 40} type={logoType.VERTICAL} click={() => navigate(PageConfig.home)} style={{cursor: 'pointer'}}/>
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

export default AdminNavbar;
