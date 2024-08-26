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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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

      {/*for admin panel */}
      <Route path="/addCombo" element={<ProtectedRoute component={AddComboMenu} />} />
      <Route path="/updateCombo/:id" element={<ProtectedRoute component={UpdateCombo} />} />
      <Route path="/combo" element={<ProtectedRoute component={Combo} />} />

      <Route path="/product" element={<ProtectedRoute component={Product} />} />
      <Route path="/addProduct" element={<ProtectedRoute component={AddProduct} />} />
      <Route path="/updateProduct/:id" element={<ProtectedRoute component={UpdateProduct} />} />

      <Route path="/sauces" element={<ProtectedRoute component={Sauces} />} />
      <Route path="/addSauces" element={<ProtectedRoute component={AddSauces} />} />
      <Route path="/updateSauces/:id" element={<ProtectedRoute component={UpdateSauces} />} />

      <Route path="/sideDishes" element={<ProtectedRoute component={SideDishes} />} />
      <Route path="/addSideDish" element={<ProtectedRoute component={AddSideDish} />} />
      <Route path="/updateSideDish/:id" element={<ProtectedRoute component={UpdateSideDish} />} />

      <Route path="/coupons" element={<ProtectedRoute component={Coupons} />} />
      <Route path="/addCoupons" element={<ProtectedRoute component={AddCoupon} />} />
      <Route path="/updateCoupons/:id" element={<ProtectedRoute component={UpdateCoupon} />} />
    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
