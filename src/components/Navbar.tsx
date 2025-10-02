import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, LogOut } from "lucide-react";

interface NavbarProps {
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

const Navbar = ({ onLogout, isAuthenticated }: NavbarProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            PickWise
          </span>
        </Link>
        
        {isAuthenticated && (
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/wishlist"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                isActive("/wishlist") ? "text-primary" : "text-foreground"
              }`}
            >
              <Heart className="h-4 w-4" />
              Wishlist
            </Link>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
