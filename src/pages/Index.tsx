import HeroSlider from "@/components/HeroSlider";
import ProductCard, { Product } from "@/components/ProductCard";
import { CartItem } from "@/pages/Cart";
import { useToast } from "@/hooks/use-toast";

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 79.99,
    originalPrice: 129.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch Fitness Tracker",
    price: 149.99,
    originalPrice: 199.99,
    discount: 50,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Leather Messenger Bag",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Fashion",
  },
  {
    id: "4",
    name: "Running Shoes - Lightweight & Comfortable",
    price: 119.99,
    originalPrice: 159.99,
    discount: 40,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Sports",
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    price: 159.99,
    originalPrice: 249.99,
    discount: 90,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    category: "Fashion",
  },
  {
    id: "7",
    name: "Yoga Mat with Carrying Strap",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    category: "Sports",
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
    category: "Sports",
  },
];

interface IndexProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Index = ({ cartItems, setCartItems }: IndexProps) => {
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <HeroSlider />

      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
