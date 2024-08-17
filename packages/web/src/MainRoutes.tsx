import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {
  WeeklyMenu,
  Auth,
  Checkout,
  Profile,
  Address,
  Reviews,
  OrderHistory,
  ContactUs,
  AddComboMenu,
  UpdateCombo,
  Combo,
  Product,
  AddProduct,
  UpdateProduct,
  Sauces,
  AddSauces,
  UpdateSauces,
  SideDishes,
  AddSideDish,
  UpdateSideDish,
  Coupons,
  AddCoupon,
  UpdateCoupon,
  OrderHistoryView,
} from './pages'
const MainRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WeeklyMenu />} />
      <Route path="*" element={<Navigate to="/" />} />

      {/*<Route path="/auth" element={<Auth />} />*/}

      <Route path="/checkout" element={<Checkout />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/address" element={<Address />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/history" element={<OrderHistory />} />
      <Route path="/history/:id" element={<OrderHistoryView />} />
      <Route path="/contactUs" element={<ContactUs />} />

      {/* just for admin panel */}
      <Route path="/addCombo" element={<AddComboMenu />} />
      <Route path="/updateCombo/:id" element={<UpdateCombo />} />
      <Route path="/combo" element={<Combo />} />

      <Route path="/product" element={<Product />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/updateProduct/:id" element={<UpdateProduct />} />

      <Route path="/sauces" element={<Sauces />} />
      <Route path="/addSauces" element={<AddSauces />} />
      <Route path="/updateSauces/:id" element={<UpdateSauces />} />

      <Route path="/sideDishes" element={<SideDishes />} />
      <Route path="/addSideDish" element={<AddSideDish />} />
      <Route path="/updateSideDish/:id" element={<UpdateSideDish />} />

      <Route path="/coupons" element={<Coupons />} />
      <Route path="/addCoupons" element={<AddCoupon />} />
      <Route path="/updateCoupons/:id" element={<UpdateCoupon />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
