import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, Routes, Route } from 'react-router-dom';
import MyAccount from '../Pages/MyAccount';
import AccountDetails from './UserAccount/AccountDetails';
import AccountOrders from './UserAccount/AccountOrders';
import AccountUnits from './UserAccount/AccountUnits';
import AccountSafety from './UserAccount/AccountSafety';
import UsagePolicy from './UserAccount/UsagePolicy';
import ProtectedRoute from './ProtectedRoute';
import AddNewUnit from '../Pages/AddNewUnit';

const PageTransition = ({ routes }) => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/my-account" element={<ProtectedRoute><MyAccount /></ProtectedRoute>}>
            <Route path='account-details' element={<AccountDetails />}/>
            <Route path='account-orders' element={<AccountOrders />}/>
            <Route path='account-units' element={<AccountUnits />}/>
            <Route path='account-safety' element={<AccountSafety />}/>
            <Route path='usage-policy' element={<UsagePolicy />}/>
          </Route>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;