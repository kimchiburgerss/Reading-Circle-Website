import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import PageWrapper from '@/components/PageWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="text-center p-8">
                <div className="mb-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Thank you for your purchase. Your order has been successfully processed.
                  </p>
                </div>

                <div className="bg-primary/10 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-primary mb-4">Order Details</h2>
                  <div className="text-left space-y-2">
                    <p className="text-foreground/90">
                      <strong>Order Number:</strong> #RC{Date.now().toString().slice(-6)}
                    </p>
                    <p className="text-foreground/90">
                      <strong>Date:</strong> {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-foreground/90">
                      <strong>Email Confirmation:</strong> A confirmation email has been sent to your email address.
                    </p>
                    <p className="text-foreground/90">
                      <strong>Processing Time:</strong> 1-2 business days
                    </p>
                    <p className="text-foreground/90">
                      <strong>Delivery:</strong> 3-5 business days (for shipped orders)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Support Our Mission</h3>
                    <p className="text-blue-800 text-sm">
                      Your purchase directly supports our free tutoring programs and helps us continue 
                      providing quality education to children in our community. Thank you for your support!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/store')}
                      variant="outline"
                      className="flex-1"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      onClick={() => navigate('/')}
                      variant="default"
                      className="flex-1"
                    >
                      Return Home
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderConfirmation;
