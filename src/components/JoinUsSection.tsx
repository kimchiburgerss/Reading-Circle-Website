import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import locationMap from '@/assets/location-map.png';

const JoinUsSection = () => {
  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "pickeringreads@hotmail.com",
      link: "mailto:pickeringreads@hotmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "(905) 831-6354",
      link: "tel:9058316354"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "1 The Esplanade, Pickering Ontario L1V 6K7"
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Saturday: 9:30 AM - 11:30 AM"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
            Join Us
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Visit us and become part of our reading community
          </p>
        </ScrollAnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Contact Information */}
          <div className="space-y-4">
            {contactDetails.map((detail, index) => {
              const IconComponent = detail.icon;
              return (
                <ScrollAnimatedSection key={index} delay={100 + index * 100}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-primary rounded-lg shadow-neu-light">
                          <IconComponent className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary mb-1 text-lg">
                            {detail.label}
                          </h3>
                          {detail.link ? (
                            <a 
                              href={detail.link}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{detail.value}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimatedSection>
              );
            })}
          </div>

          {/* Map Image */}
          <ScrollAnimatedSection delay={200}>
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <img 
                  src={locationMap} 
                  alt="Location map showing 1 The Esplanade, Pickering Ontario" 
                  className="w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
