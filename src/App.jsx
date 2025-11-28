import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouterProvider } from "./routes/provider";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./feature/cart/context/CartContext";
import { WishlistProvider } from "./feature/wishlist/context/WishlistContext";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <WishlistProvider>
        <CartProvider>
          <AppRouterProvider />
          <ToastContainer position="top-right" autoClose={3000} />
        </CartProvider>
      </WishlistProvider>
    </QueryClientProvider>
  );
}

export default App;
