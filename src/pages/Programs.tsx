import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import PageWrapper from '@/components/PageWrapper';
import { BookOpen, Calculator, Users, Heart } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "Literacy Programs",
      description: "English and French reading comprehension and writing skills development",
      details: "Our literacy programs focus on building strong foundational reading and writing skills in both English and French. Students work with experienced tutors to improve their comprehension, vocabulary, and communication abilities."
    },
    {
      icon: Calculator,
      title: "Numeracy Support", 
      description: "Mathematical skills building from basic arithmetic to advanced concepts",
      details: "We provide personalized math tutoring to help students build confidence with numbers. Our approach makes mathematics accessible and enjoyable while strengthening problem-solving abilities."
    },
    {
      icon: Users,
      title: "Mentorship Program",
      description: "One-on-one guidance and support for academic and personal growth", 
      details: "Our mentorship program pairs students with caring adult volunteers who provide ongoing support, encouragement, and guidance both academically and personally."
    },
    {
      icon: Heart,
      title: "Social Skills Building",
      description: "Developing communication, teamwork, and interpersonal abilities",
      details: "Through group activities and interactive sessions, students develop essential social skills including communication, collaboration, leadership, and emotional intelligence."
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
                Our Programs
              </h1>
              
              <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
                Comprehensive educational support programs designed to help every child reach their full potential
              </p>
            </ScrollAnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {programs.map((program, index) => {
                const IconComponent = program.icon;
                return (
                  <ScrollAnimatedSection key={index} delay={index * 200}>
                    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gradient-primary rounded-lg shadow-neu-light">
                            <IconComponent className="h-8 w-8 text-primary-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-primary">{program.title}</CardTitle>
                            <CardDescription className="text-base">{program.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground leading-relaxed">
                          {program.details}
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollAnimatedSection>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Programs;