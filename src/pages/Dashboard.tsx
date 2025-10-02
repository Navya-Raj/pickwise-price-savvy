import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    description: "Latest Apple flagship with A16 Bionic chip",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 129900, link: "https://amazon.in" },
      { platform: "Flipkart", price: 127999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "2",
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air cushioning",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 12995, link: "https://amazon.in" },
      { platform: "Flipkart", price: 11999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 12495, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 12195, link: "https://ajio.com" },
    ],
  },
  {
    id: "3",
    name: "Maybelline Lipstick Set",
    description: "Long-lasting matte finish lipstick collection",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 799, link: "https://amazon.in" },
      { platform: "Flipkart", price: 749, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 699, link: "https://nykaa.com" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");
  const [products, setProducts] = useState(mockProducts);
  const [displayedProducts, setDisplayedProducts] = useState(mockProducts);

  useEffect(() => {
    const auth = localStorage.getItem("pickwise_auth");
    if (!auth) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("pickwise_auth");
    navigate("/auth");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setDisplayedProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedProducts(filtered);
  };

  const handleSort = (order: "low" | "high") => {
    setSortOrder(order);
    const sorted = [...displayedProducts].sort((a, b) => {
      const aLowest = Math.min(...a.prices.filter(p => p.price > 0).map(p => p.price));
      const bLowest = Math.min(...b.prices.filter(p => p.price > 0).map(p => p.price));
      return order === "low" ? aLowest - bLowest : bLowest - aLowest;
    });
    setDisplayedProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLogout={handleLogout} isAuthenticated={true} />
      
      <div className="bg-gradient-hero border-b border-border">
        <div className="container px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Find the Best Deals</h1>
          <p className="text-muted-foreground mb-8">Compare prices across India's top e-commerce platforms</p>
          
          <div className="flex gap-4 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products (e.g., iPhone 14, Nike Shoes)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            {searchQuery ? `Results for "${searchQuery}"` : "Popular Products"}
          </h2>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <Select value={sortOrder} onValueChange={(value: "low" | "high") => handleSort(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Lowest Price First</SelectItem>
                <SelectItem value="high">Highest Price First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {displayedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found. Try a different search term.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
