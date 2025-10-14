import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cart, { CartItem } from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LoginModal from "@/components/LoginModal";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient();

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onLoginClick={() => setLoginModalOpen(true)}
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Index cartItems={cartItems} setCartItems={setCartItems} />}
            />
            <Route
              path="/cart"
              element={
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
