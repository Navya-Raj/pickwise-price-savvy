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
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise cancelling wireless headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 29990, link: "https://amazon.in" },
      { platform: "Flipkart", price: 28999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "5",
    name: "Levi's 501 Original Jeans",
    description: "Classic straight fit denim jeans for men",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 3499, link: "https://amazon.in" },
      { platform: "Flipkart", price: 3299, link: "https://flipkart.com" },
      { platform: "Myntra", price: 3199, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 3399, link: "https://ajio.com" },
    ],
  },
  {
    id: "6",
    name: "Samsung Galaxy Watch 5",
    description: "Advanced fitness and health tracking smartwatch",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 24999, link: "https://amazon.in" },
      { platform: "Flipkart", price: 23999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "7",
    name: "Lakme 9to5 Foundation",
    description: "Flawless matte finish foundation with SPF 20",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 449, link: "https://amazon.in" },
      { platform: "Flipkart", price: 425, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 399, link: "https://nykaa.com" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "8",
    name: "Adidas Ultraboost 22",
    description: "High-performance running shoes with Boost cushioning",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 16999, link: "https://amazon.in" },
      { platform: "Flipkart", price: 15999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 16499, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 16199, link: "https://ajio.com" },
    ],
  },
  {
    id: "9",
    name: "Dyson V11 Vacuum Cleaner",
    description: "Cordless vacuum with powerful suction technology",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 52900, link: "https://amazon.in" },
      { platform: "Flipkart", price: 51999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "10",
    name: "Fossil Gen 6 Smartwatch",
    description: "Stylish smartwatch with Wear OS and fitness tracking",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 21995, link: "https://amazon.in" },
      { platform: "Flipkart", price: 20999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 21495, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "11",
    name: "Boat Airdopes 131",
    description: "True wireless earbuds with 12 hours playback",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 1299, link: "https://amazon.in" },
      { platform: "Flipkart", price: 1199, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "12",
    name: "H&M Cotton T-Shirt Pack",
    description: "Comfortable 3-pack basic cotton t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 1499, link: "https://amazon.in" },
      { platform: "Flipkart", price: 0, link: "" },
      { platform: "Myntra", price: 1399, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 1449, link: "https://ajio.com" },
    ],
  },
  {
    id: "13",
    name: "The Alchemist by Paulo Coelho",
    description: "Bestselling philosophical novel about following dreams",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 299, link: "https://amazon.in" },
      { platform: "Flipkart", price: 279, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "14",
    name: "Philips Air Fryer",
    description: "Healthy cooking with rapid air technology, 4.1L capacity",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 8995, link: "https://amazon.in" },
      { platform: "Flipkart", price: 8499, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "15",
    name: "Puma Sports Backpack",
    description: "Durable 30L backpack for gym and travel",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 1799, link: "https://amazon.in" },
      { platform: "Flipkart", price: 1699, link: "https://flipkart.com" },
      { platform: "Myntra", price: 1749, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 1729, link: "https://ajio.com" },
    ],
  },
  {
    id: "16",
    name: "L'Oreal Paris Shampoo",
    description: "Total Repair 5 shampoo for damaged hair",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 549, link: "https://amazon.in" },
      { platform: "Flipkart", price: 499, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 475, link: "https://nykaa.com" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "17",
    name: "Dell Wireless Mouse",
    description: "Ergonomic wireless mouse with 2.4GHz connectivity",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 799, link: "https://amazon.in" },
      { platform: "Flipkart", price: 749, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "18",
    name: "Zara Floral Summer Dress",
    description: "Elegant midi dress with floral print for women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 0, link: "" },
      { platform: "Flipkart", price: 0, link: "" },
      { platform: "Myntra", price: 2990, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 2899, link: "https://ajio.com" },
    ],
  },
  {
    id: "19",
    name: "Canon EOS 1500D DSLR",
    description: "Entry-level DSLR camera with 24.1MP sensor and Wi-Fi",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 38990, link: "https://amazon.in" },
      { platform: "Flipkart", price: 37999, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "20",
    name: "Michael Kors Handbag",
    description: "Premium leather crossbody bag for women",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 12999, link: "https://amazon.in" },
      { platform: "Flipkart", price: 0, link: "" },
      { platform: "Myntra", price: 11999, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 12499, link: "https://ajio.com" },
    ],
  },
  {
    id: "21",
    name: "Casio Digital Watch",
    description: "Classic F-91W digital watch with LED backlight",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 995, link: "https://amazon.in" },
      { platform: "Flipkart", price: 949, link: "https://flipkart.com" },
      { platform: "Myntra", price: 975, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 0, link: "" },
    ],
  },
  {
    id: "22",
    name: "Yoga Mat with Carrying Strap",
    description: "Non-slip TPE yoga mat, 6mm thick for comfort",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 899, link: "https://amazon.in" },
      { platform: "Flipkart", price: 799, link: "https://flipkart.com" },
      { platform: "Myntra", price: 849, link: "https://myntra.com" },
      { platform: "Nykaa", price: 0, link: "" },
      { platform: "AJIO", price: 829, link: "https://ajio.com" },
    ],
  },
  {
    id: "23",
    name: "HP DeskJet Printer",
    description: "All-in-one wireless printer with scanner and copier",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&h=400&fit=crop",
    prices: [
      { platform: "Amazon", price: 6499, link: "https://amazon.in" },
      { platform: "Flipkart", price: 6299, link: "https://flipkart.com" },
      { platform: "Myntra", price: 0, link: "" },
      { platform: "Nykaa", price: 0, link: "" },
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
