import { useState } from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
  onLoginClick: () => void;
  onMenuClick: () => void;
}

const Navbar = ({ cartCount, onLoginClick, onMenuClick }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <ShoppingCart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">AEON Shop</span>
        </div>

        <div className="flex-1 flex items-center gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={onLoginClick}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
