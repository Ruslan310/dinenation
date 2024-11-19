import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {
  AddComboMenu,
  AddCoupon,
  AddDomain,
  AddOrder,
  AddProduct,
  AddSauces,
  AddSideDish,
  AddUser,
  Checkout,
  Combo,
  CompanyOrders,
  CompanyOrderView,
  ContactUs,
  Coupons,
  Domains,
  Invoice,
  OrderHistory,
  OrderHistoryView,
  Orders,
  OrderView,
  Product,
  ProductReviews,
  Profile,
  Reviews,
  Sauces,
  SideDishes,
  UpdateCombo,
  UpdateCoupon,
  UpdateDomain,
  UpdateOrder,
  UpdateProduct,
  UpdateSauces,
  UpdateSideDish,
  UpdateUser,
  Users,
  WeeklyMenu,
  Boxes,
  Kitchen
} from './pages'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {PageConfig, ROLE} from "./utils/utils";

const MainRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PageConfig.home} element={<WeeklyMenu />} />
      <Route path={PageConfig.wrong} element={<Navigate to={PageConfig.home} />} />

      <Route path={PageConfig.checkout} element={<Checkout />}/>
      <Route path={PageConfig.profile} element={<Profile />} />
      {/*<Route path="/address" element={<Address />} />*/}
      <Route path={PageConfig.reviews} element={<Reviews />} />
      <Route path={PageConfig.history} element={<OrderHistory />} />
      <Route path={`${PageConfig.history}/:id`} element={<OrderHistoryView />} />
      <Route path={PageConfig.contact} element={<ContactUs />} />

      {/*for hr */}
      <Route path={PageConfig.company_orders} element={<ProtectedRoute customer={ROLE.HR} component={CompanyOrders} />} />
      <Route path={`${PageConfig.company_orders}/:id`} element={<ProtectedRoute customer={ROLE.HR} component={CompanyOrderView} />} />

      {/*for admin panel */}
      <Route path={PageConfig.combo} element={<ProtectedRoute component={Combo} />} />
      <Route path={`${PageConfig.combo}/add`} element={<ProtectedRoute component={AddComboMenu} />} />
      <Route path={`${PageConfig.combo}/:id`} element={<ProtectedRoute component={UpdateCombo} />} />

      <Route path={PageConfig.product} element={<ProtectedRoute component={Product} />} />
      <Route path={`${PageConfig.product}/add`} element={<ProtectedRoute component={AddProduct} />} />
      <Route path={`${PageConfig.product}/:id`} element={<ProtectedRoute component={UpdateProduct} />} />

      <Route path={PageConfig.sauces} element={<ProtectedRoute component={Sauces} />} />
      <Route path={`${PageConfig.sauces}/add`} element={<ProtectedRoute component={AddSauces} />} />
      <Route path={`${PageConfig.sauces}/:id`} element={<ProtectedRoute component={UpdateSauces} />} />

      <Route path={PageConfig.side_dishes} element={<ProtectedRoute component={SideDishes} />} />
      <Route path={`${PageConfig.side_dishes}/add`} element={<ProtectedRoute component={AddSideDish} />} />
      <Route path={`${PageConfig.side_dishes}/:id`} element={<ProtectedRoute component={UpdateSideDish} />} />

      <Route path={PageConfig.coupons} element={<ProtectedRoute component={Coupons} />} />
      <Route path={`${PageConfig.coupons}/add`} element={<ProtectedRoute component={AddCoupon} />} />
      <Route path={`${PageConfig.coupons}/:id`} element={<ProtectedRoute component={UpdateCoupon} />} />

      <Route path={PageConfig.domains} element={<ProtectedRoute component={Domains} />} />
      <Route path={`${PageConfig.domains}/add`} element={<ProtectedRoute component={AddDomain} />} />
      <Route path={`${PageConfig.domains}/:id`} element={<ProtectedRoute component={UpdateDomain} />} />

      <Route path={PageConfig.users} element={<ProtectedRoute component={Users} />} />
      <Route path={`${PageConfig.users}/add`} element={<ProtectedRoute component={AddUser} />} />
      <Route path={`${PageConfig.users}/:id`} element={<ProtectedRoute component={UpdateUser} />} />

      <Route path={PageConfig.orders} element={<ProtectedRoute component={Orders} />} />
      <Route path={`${PageConfig.orders}/:id`} element={<ProtectedRoute component={OrderView} />} />
      <Route path={`${PageConfig.orders}/add`} element={<ProtectedRoute component={AddOrder} />} />
      <Route path="/updateOrder/:id" element={<ProtectedRoute component={UpdateOrder} />} />

      <Route path={PageConfig.product_reviews} element={<ProtectedRoute component={ProductReviews} />} />
      <Route path={PageConfig.invoice} element={<ProtectedRoute component={Invoice} />} />
      <Route path={PageConfig.boxes} element={<ProtectedRoute component={Boxes} />} />
      <Route path={PageConfig.kitchen} element={<ProtectedRoute component={Kitchen} />} />

    </Routes>
  </BrowserRouter>
);

export default MainRoutes;
