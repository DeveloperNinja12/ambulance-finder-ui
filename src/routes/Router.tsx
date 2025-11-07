import React, { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AppRoutes, type TAppRoute } from '../constants/routes';

function PrivateRoute() {
  const isAuthed = typeof window !== 'undefined' && localStorage.getItem('auth') === 'true';
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}

function renderRoutes(routes: TAppRoute[]): React.ReactNode {
  return routes.map((route, idx) => {
    if (route.indexRedirect) {
      return <Route key={`index-${idx}`} index element={<Navigate to={route.indexRedirect!} replace />} />;
    }

    const element = route.element ?? null;
    const hasChildren = Array.isArray(route.children) && route.children.length > 0;

    if (route.private && hasChildren) {
      return (
        <Route key={route.path ?? `grp-${idx}`} element={<PrivateRoute />}>
          {renderRoutes(route.children!)}
        </Route>
      );
    }

    if (route.private) {
      return (
        <Route key={route.path ?? idx} element={<PrivateRoute />}>
          {route.path ? <Route path={route.path} element={element} /> : null}
        </Route>
      );
    }

    if (hasChildren) {
      return (
        <Route key={route.path ?? `grp-${idx}`} path={route.path} element={element}>
          {renderRoutes(route.children!)}
        </Route>
      );
    }

    if (route.path === '/' && element === null) {
      return <Route key="root-redirect" path="/" element={<Navigate to="/login" replace />} />;
    }
    if (route.path === '*' && element === null) {
      return <Route key="wildcard-redirect" path="*" element={<Navigate to="/login" replace />} />;
    }

    return <Route key={route.path ?? idx} path={route.path} element={element} />;
  });
}

export default function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {renderRoutes(AppRoutes)}
      </Routes>
    </Suspense>
  );
}


