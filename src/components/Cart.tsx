import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

export const CartButton: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate('/checkout')}
      className="relative"
    >
      <ShoppingCart className="h-5 w-5" />
      {cart.itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
        >
          {cart.itemCount}
        </Badge>
      )}
    </Button>
  );
};
