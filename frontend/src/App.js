import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root from "./pages/Root";
import Home from "./pages/home/Home";
import Cart from './pages/cart/Cart.jsx'
import ProductDetails from './pages/details/ProductDetails.jsx'
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="product-details/:id" element={<ProductDetails />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;