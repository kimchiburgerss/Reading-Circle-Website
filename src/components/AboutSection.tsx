import { Card, CardContent } from '@/components/ui/card';
import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import malaImage from '@/assets/mala-mahabir.png';
import volunteerKidsImage from '@/assets/volunteer-kids.png';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
            About Us
          </h2>
        </ScrollAnimatedSection>
        
        {/* About Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Text Content */}
          <ScrollAnimatedSection delay={200}>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  The Pickering Reading Circle has provided Educational support for over 30 years. 
                  An award winning, not-for-profit program offering Free tutoring and mentorship for 
                  success in education. We are committed to helping improve Education statistics, 
                  foster a love of learning and help individuals explore, awaken and live their full potential.
                </p>
                
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  Our programs focuses on improving foundational skill sets for students, programs are 
                  centered on – literacy in English and French, numeracy, mentorship and social skill building.
                </p>
                
                <p className="text-lg text-foreground leading-relaxed italic text-primary">
                  "Investing in Education is investing in lives, future leaders, communities, countries 
                  and the world. Investing in Education is investing in positive change, political, 
                  economical and social stability and sustainability."
                </p>
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
          
          {/* Right Column - Director Image */}
          <ScrollAnimatedSection delay={400} className="lg:pl-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <img 
                    src={malaImage} 
                    alt="Executive Director Mala Mahabir" 
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Our Executive Director Mala Mahabir
                </p>
              </CardContent>
            </Card>
          </ScrollAnimatedSection>
        </div>

        {/* Mission Statement - Full Width Section */}
        <ScrollAnimatedSection delay={600}>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Mission Image */}
            <div className="flex items-center">
              <img 
                src={volunteerKidsImage} 
                alt="Volunteers teaching kids at Pickering Reading Circle" 
                className="w-full h-full object-cover rounded-lg shadow-elegant"
              />
            </div>
            
            {/* Mission Text */}
            <Card className="bg-gradient-primary border-primary/20">
              <CardContent className="p-10 flex flex-col justify-center h-full">
                <h3 className="text-3xl font-bold text-primary-foreground mb-6">
                  Our Mission
                </h3>
                <p className="text-primary-foreground leading-relaxed text-lg">
                  To address existing barriers to much needed educational support by providing 
                  opportunities to improve and build solid foundational skills like literacy and 
                  numeracy. Skills that form the pillars to success. Our aim is to support students 
                  and individuals in our programs to become strong, empowered lifelong learners as 
                  they navigate a career in education and life.
                </p>
                <p className="text-primary-foreground leading-relaxed mt-4 text-lg">
                  Our purpose is to encourage and prepare individuals, students, parents and volunteers 
                  of the Pickering Reading Circle to rise to their full potential and become productive, 
                  contributing members of society.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimatedSection>
      </div>
    </section>
  );
};

export default AboutSection;