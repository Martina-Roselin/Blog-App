import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { IRouteConfig } from "../types/route.type";
import { ROUTE_CONFIG } from "../configs/route.config";
import LoadingScreen from "../pages/loader/index.tsx";

// Application router
export const AppRouter = () => {
  const applyGuard = (
    Guard: React.ElementType | undefined,
    children: React.ReactNode,
  ) => {
    return Guard ? <Guard>{children}</Guard> : children;
  };

  const applyLayout = (
    Layout: React.ElementType,
    children: React.ReactNode,
  ) => {
    return Layout ? <Layout>{children}</Layout> : children;
  };

  const renderRoutes = (routes: IRouteConfig[]) =>
    routes.map(
      (
        { path, layout, guard, element: Element, children }: IRouteConfig,
        i,
      ) => (
        <Route
          key={i}
          path={path}
          element={
            <Suspense fallback={<LoadingScreen/>}>
              {Element
                ? applyGuard(guard, applyLayout(layout, <Element />))
                : applyGuard(guard, applyLayout(layout, null))}
            </Suspense>
          }
        >
          {children && renderRoutes(children as IRouteConfig[])}
        </Route>
      ),
    );
  return (
      <Routes>{renderRoutes(ROUTE_CONFIG)}</Routes>
  );
};
