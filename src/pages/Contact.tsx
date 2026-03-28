import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import PageWrapper from '@/components/PageWrapper';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "pickeringreads@hotmail.com",
      link: "mailto:pickeringreads@hotmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "(905) 831-6354",
      link: "tel:9058316354"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "1 The Esplanade, Pickering Ontario L1V 6K7"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Saturday: 9:30 AM - 11:30 AM"
    }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />
        
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <ScrollAnimatedSection>
              <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
                Contact Us
              </h1>
              
              <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
                Ready to join our community or make a donation? We'd love to hear from you!
              </p>
            </ScrollAnimatedSection>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <ScrollAnimatedSection delay={200}>
                  <h2 className="text-2xl font-bold text-primary mb-6">Get In Touch</h2>
                </ScrollAnimatedSection>
                
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <ScrollAnimatedSection key={index} delay={300 + index * 100}>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-gradient-primary rounded-lg shadow-neu-light">
                              <IconComponent className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                              {info.link ? (
                                <a 
                                  href={info.link}
                                  className="text-foreground hover:text-primary transition-colors"
                                >
                                  {info.details}
                                </a>
                              ) : (
                                <p className="text-foreground whitespace-pre-line">{info.details}</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </ScrollAnimatedSection>
                  );
                })}
              </div>
              
              {/* Contact Form */}
              <ScrollAnimatedSection delay={400}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="Your first name" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Your last name" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your.email@example.com" />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help you?" />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us more about how we can help you or your interest in our programs..."
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        variant="neu-primary"
                        className="w-full font-semibold py-3"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </ScrollAnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Contact;