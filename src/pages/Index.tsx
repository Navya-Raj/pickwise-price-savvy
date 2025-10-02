import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingDown, Heart, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("pickwise_auth");
    if (auth) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <nav className="container px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PickWise
            </span>
          </div>
          <Button onClick={() => navigate("/auth")}>Get Started</Button>
        </div>
      </nav>

      <main className="container px-4">
        <div className="py-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-light text-success text-sm font-medium mb-6">
            <TrendingDown className="h-4 w-4" />
            Save up to 40% by comparing prices
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find the Best Deals Across India's Top
            <span className="bg-gradient-primary bg-clip-text text-transparent"> E-Commerce </span>
            Sites
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Compare prices from Amazon, Flipkart, Myntra, Nykaa, and AJIO in seconds. Make smarter shopping decisions and save money on every purchase.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Start Comparing Prices
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <TrendingDown className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-muted-foreground">
                Instantly compare prices across 5 major platforms to find the lowest deal
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-gradient-success flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-success-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Get real-time price comparisons in seconds with our optimized search
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">
                Create wishlists and track prices on products you love
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="container px-4 py-8 border-t border-border mt-20">
        <div className="text-center text-muted-foreground">
          <p>© 2025 PickWise. Making smart shopping decisions easier.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
