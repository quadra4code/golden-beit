import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, Routes, Route } from 'react-router-dom';
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
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;