import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    const auth = localStorage.getItem("pickwise_auth");
    if (!auth) {
      navigate("/auth");
      return;
    }

    const savedWishlist = localStorage.getItem("pickwise_wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("pickwise_auth");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} isAuthenticated={true} />
      
      <div className="container px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-destructive fill-destructive" />
          <h1 className="text-4xl font-bold">My Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">Start adding products to keep track of items you love!</p>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
