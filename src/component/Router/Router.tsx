import { Route, Routes } from "react-router-dom";
import { routes, type RouteItems } from "../../routesConfig";

const Router = () => {
  return (
    <Routes>
      {routes.map((routeItem) => {
        if (routeItem.children) {
          return (
            <Route path={routeItem.path} element={<routeItem.element />}>
              {getRoutesComponent(routeItem.children)}
            </Route>
          );
        }
        return <Route path={routeItem.path} element={<routeItem.element />} />;
      })}
    </Routes>
  );
};

function getRoutesComponent(routeItem: RouteItems[]) {
  return routeItem.map((routeItem) => {
    if (routeItem.children) {
      return (
        <Route path={routeItem.path} element={<routeItem.element />}>
          {getRoutesComponent(routeItem.children)}
        </Route>
      );
    }
    return <Route path={routeItem.path} element={<routeItem.element />} />;
  });
}

export default Router;
