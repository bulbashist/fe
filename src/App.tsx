import { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "./app/translation";
import { getUserData } from "./app/store/core-reducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { themes } from "./app/themes/theme";

import AdminPage from "./app/pages/admin";
import OrderPage from "./app/pages/order";
import OrdersPage from "./app/pages/orders";
import MainPage from "./app/pages/main";
import NoPage from "./app/pages/404";
import SearchPage from "./app/pages/search";
import UserPage from "./app/pages/user";
import ProductPage from "app/pages/product";
import CartPage from "app/pages/cart/cart";
import OfficesPage from "app/pages/offices";
import SellerSignPage from "app/pages/seller";
import StatsPage from "app/pages/stats";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/users/:id", element: <UserPage /> },
  { path: "/orders/:id", element: <OrderPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/orders", element: <OrdersPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/products/:id", element: <ProductPage /> },
  { path: "/offices", element: <OfficesPage /> },
  { path: "/seller", element: <SellerSignPage /> },
  { path: "/stats", element: <StatsPage /> },
  { path: "*", element: <NoPage /> },
]);

function App() {
  const theme = useAppSelector((state) => state.core.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
