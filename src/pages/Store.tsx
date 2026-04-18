import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import PageWrapper from '@/components/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Plus, Info } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  author?: string;
  artist?: string;
  price: number;
  description: string;
  image: string;
  features: string[];
  details?: string;
}

const products: Product[] = [
  {
    id: 'book',
    name: 'Animal Alphabet Adventure',
    author: 'Written by Mala Mahabir',
    artist: 'Art by Tasha N. Maraj',
    price: 15.99,
    description: 'A delightful journey through the alphabet with adorable animal characters that makes learning letters fun and engaging for young readers.',
    image: '/animal-alphabet-book.jpg',
    features: [
      '26 colorful animal illustrations',
      'Educational and entertaining',
      'Perfect for ages 3-7',
      'Hardcover edition',
      '32 pages of learning fun'
    ],
    details: 'Join zookeeper Zoe on an exciting adventure through Animal Alphabet Park! Each page introduces a new animal friend while teaching letter recognition and phonics. From Alex the Alligator to Zara the Zebra, children will love the rhyming text and vibrant illustrations.'
  },
  {
    id: 'bookmark',
    name: 'Pickering Reading Circle Bookmark',
    price: 4.99,
    description: 'Beautiful, durable bookmark featuring our logo and motto "Empowering Children Through Literacy".',
    image: '/api/placeholder/200/300',
    features: [
      'High-quality cardstock',
      'Glossy finish',
      'Tassel included',
      '6 inches long'
    ],
    details: 'Never lose your page again with our premium bookmark. Features the official Pickering Reading Circle logo and our inspiring motto. Perfect for books, textbooks, or journals.'
  }
];

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">Our Store</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Support our mission while getting wonderful reading materials and accessories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div 
                    className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.id === 'book' ? (
                      <img 
                        src="/animal-alphabet-book.jpg" 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/api/placeholder/300/400';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="w-16 h-16 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                            <div className="text-3xl">??</div>
                          </div>
                          <p className="text-sm text-muted-foreground">Product Image</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Info className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-lg mb-1">{product.name}</h3>
                    {product.author && (
                      <p className="text-sm text-muted-foreground mb-2">{product.author}</p>
                    )}
                    {product.artist && (
                      <p className="text-sm text-muted-foreground mb-2">{product.artist}</p>
                    )}
                    <p className="text-xl font-bold text-primary mb-3">${product.price.toFixed(2)}</p>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="flex-1"
                        variant="default"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Product Detail Modal */}
            <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                {selectedProduct && (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg overflow-hidden">
                        {selectedProduct.id === 'book' ? (
                          <img 
                            src="/animal-alphabet-book.jpg" 
                            alt={selectedProduct.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/api/placeholder/300/400';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center p-8">
                              <div className="w-24 h-24 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                                <div className="text-4xl">??</div>
                              </div>
                              <p className="text-sm text-muted-foreground">Product Image</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-3xl font-bold text-primary">${selectedProduct.price.toFixed(2)}</h3>
                        </div>
                        
                        {selectedProduct.author && (
                          <p className="text-lg text-foreground">{selectedProduct.author}</p>
                        )}
                        {selectedProduct.artist && (
                          <p className="text-lg text-foreground">{selectedProduct.artist}</p>
                        )}
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Description</h4>
                          <p className="text-foreground/90 leading-relaxed">{selectedProduct.description}</p>
                        </div>
                        
                        {selectedProduct.details && (
                          <div>
                            <h4 className="font-semibold text-lg mb-2">Details</h4>
                            <p className="text-foreground/90 leading-relaxed">{selectedProduct.details}</p>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Features</h4>
                          <ul className="list-disc list-inside text-foreground/90 space-y-1">
                            {selectedProduct.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button 
                          onClick={() => {
                            handleAddToCart(selectedProduct);
                            setSelectedProduct(null);
                          }}
                          className="w-full"
                          variant="default"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>

            <div className="mt-16 text-center">
              <div className="bg-primary/10 rounded-lg p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-primary mb-4">Support Our Mission</h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  Every purchase directly supports our free tutoring programs and helps us continue 
                  providing quality education to children in our community. Thank you for your support!
                </p>
                <p className="text-sm text-foreground/70">
                  All proceeds go directly to funding our reading programs and educational materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Store;
