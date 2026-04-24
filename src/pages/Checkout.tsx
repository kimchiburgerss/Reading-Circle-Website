import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageWrapper from '@/components/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Truck, User, Phone, MapPin, Store } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingMethod: 'pickup' | 'shipping';
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingMethod: 'pickup',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const shipping = formData.shippingMethod === 'pickup' ? 0 : (cart.total > 25 ? 0 : 5.99);
  const tax = cart.total * 0.13; // 13% HST for Ontario
  const total = cart.total + shipping + tax;

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (formData.shippingMethod === 'shipping') {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.province.trim()) newErrors.province = 'Province is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate processing and redirect to PayPal
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to PayPal with order details
      const paypalUrl = `https://www.paypal.com/donate?token=AUJ9CUrtWhpwmQQRta7Hc3zh91kMChLmiyV49ltB1QQAYPpyyVJPTv5pk3eqEDi8-vLgxKj_wz328C-2&amount=${total.toFixed(2)}&currency_code=CAD&item_name=Pickering Reading Circle Order&return=${window.location.origin}/order-confirmation`;
      window.location.href = paypalUrl;
    }, 1000);
  };

  if (cart.items.length === 0) {
    return (
      <PageWrapper>
        <div className="min-h-screen">
          <Navigation />
          <div className="pt-32 pb-16">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <Card className="p-8">
                  <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
                  <p className="text-muted-foreground mb-6">
                    Add some items to your cart before proceeding to checkout.
                  </p>
                  <Button onClick={() => navigate('/store')} variant="default">
                    Continue Shopping
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate('/store')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Order Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Shipping Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value: 'pickup' | 'shipping') => handleInputChange('shippingMethod', value)}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <div className="flex-1">
                          <Label htmlFor="pickup" className="flex items-center cursor-pointer">
                            <Store className="w-4 h-4 mr-2" />
                            <div>
                              <p className="font-medium">Pickup</p>
                              <p className="text-sm text-muted-foreground">Free pickup from our location</p>
                            </div>
                          </Label>
                        </div>
                        <span className="font-semibold text-green-600">FREE</span>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="shipping" id="shipping" />
                        <div className="flex-1">
                          <Label htmlFor="shipping" className="flex items-center cursor-pointer">
                            <Truck className="w-4 h-4 mr-2" />
                            <div>
                              <p className="font-medium">Shipping</p>
                              <p className="text-sm text-muted-foreground">Delivery to your address</p>
                            </div>
                          </Label>
                        </div>
                        <span className="font-semibold">
                          {cart.total > 25 ? 'FREE' : '$5.99'}
                        </span>
                      </div>
                    </RadioGroup>
                    {cart.total <= 25 && formData.shippingMethod === 'shipping' && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Add ${(25 - cart.total).toFixed(2)} more for free shipping!
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className={formData.shippingMethod === 'pickup' ? 'opacity-50' : ''}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={errors.address ? 'border-red-500' : ''}
                        disabled={formData.shippingMethod === 'pickup'}
                      />
                      {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className={errors.city ? 'border-red-500' : ''}
                          disabled={formData.shippingMethod === 'pickup'}
                        />
                        {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label htmlFor="province">Province</Label>
                        <Input
                          id="province"
                          value={formData.province}
                          onChange={(e) => handleInputChange('province', e.target.value)}
                          className={errors.province ? 'border-red-500' : ''}
                          disabled={formData.shippingMethod === 'pickup'}
                        />
                        {errors.province && <p className="text-sm text-red-500 mt-1">{errors.province}</p>}
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          className={errors.postalCode ? 'border-red-500' : ''}
                          disabled={formData.shippingMethod === 'pickup'}
                        />
                        {errors.postalCode && <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PayPal Note */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">P</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-900 font-medium">Secure PayPal Checkout</p>
                        <p className="text-xs text-blue-700">
                          You will be redirected to PayPal to complete your payment securely.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (13%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleSubmit}
                      className="w-full" 
                      variant="default"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Proceed to PayPal'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Checkout;
