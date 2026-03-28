import Navigation from '@/components/Navigation';
import PageWrapper from '@/components/PageWrapper';
import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Volunteer = () => {
  const volunteerBenefits = [
    {
      icon: Calendar,
      title: "Saturday Sessions",
      description: "Join us every Saturday from 9:30 AM - 11:30 AM for 2 hours of meaningful volunteer work"
    },
    {
      icon: Award,
      title: "Earn Volunteer Hours",
      description: "Receive official volunteer hours for your time helping students in our community"
    },
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Help children develop reading skills and foster a lifelong love of learning"
    },
    {
      icon: Clock,
      title: "Friday Seminars",
      description: "Attend our Friday seminars to earn additional volunteer hours and expand your teaching skills"
    }
  ];

  return (
    <PageWrapper>
      <Navigation />
      <section className="py-20 px-4 bg-background min-h-screen">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
              Volunteer With Us
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Make a lasting impact by volunteering at the Pickering Reading Circle. Help children 
              in our community while earning valuable volunteer hours.
            </p>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {volunteerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <ScrollAnimatedSection key={index} delay={100 + index * 100}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-primary rounded-lg shadow-neu-light flex-shrink-0">
                          <IconComponent className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollAnimatedSection>
              );
            })}
          </div>

          <ScrollAnimatedSection delay={500}>
            <Card className="bg-gradient-primary border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  Ready to Make a Difference?
                </h3>
                <p className="text-primary-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
                  Join our community of dedicated volunteers who are helping shape the future 
                  through education. Whether you're looking to give back, gain experience, or 
                  earn volunteer hours, we'd love to have you on our team.
                </p>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="shadow-neu-light hover:shadow-neu-hover"
                  onClick={() => window.location.href = 'mailto:pickeringreads@hotmail.com?subject=Volunteer Inquiry'}
                >
                  Contact Us to Volunteer
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Volunteer;
