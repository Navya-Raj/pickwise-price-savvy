import { useState, useEffect } from "react";
import { Heart, ExternalLink, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Price {
  platform: string;
  price: number;
  link: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: Price[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = localStorage.getItem("pickwise_wishlist");
    if (wishlist) {
      const items = JSON.parse(wishlist);
      setIsWishlisted(items.some((item: Product) => item.id === product.id));
    }
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist = localStorage.getItem("pickwise_wishlist");
    let items: Product[] = wishlist ? JSON.parse(wishlist) : [];

    if (isWishlisted) {
      items = items.filter((item) => item.id !== product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      items.push(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }

    localStorage.setItem("pickwise_wishlist", JSON.stringify(items));
    setIsWishlisted(!isWishlisted);
  };

  const availablePrices = product.prices.filter((p) => p.price > 0);
  const lowestPrice = Math.min(...availablePrices.map((p) => p.price));
  const highestPrice = Math.max(...availablePrices.map((p) => p.price));
  const savings = highestPrice - lowestPrice;
  const savingsPercent = ((savings / highestPrice) * 100).toFixed(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={toggleWishlist}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-destructive text-destructive" : "text-foreground"
            }`}
          />
        </Button>
        {savings > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-success text-success-foreground">
            <TrendingDown className="h-3 w-3 mr-1" />
            Save {savingsPercent}%
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          {availablePrices.map((priceInfo) => {
            const isLowest = priceInfo.price === lowestPrice;
            return (
              <div
                key={priceInfo.platform}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{priceInfo.platform}</span>
                  {isLowest && (
                    <Badge variant="outline" className="text-success border-success">
                      Lowest
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${isLowest ? "text-success" : ""}`}>
                    {formatPrice(priceInfo.price)}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={priceInfo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {savings > 0 && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              You can save up to <span className="font-semibold text-success">{formatPrice(savings)}</span> by
              choosing the lowest price!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
