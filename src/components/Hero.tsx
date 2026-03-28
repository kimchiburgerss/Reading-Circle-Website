import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import heroBackground from '@/assets/library-background.png';

const Hero = () => {
  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Content */}
      <ScrollAnimatedSection className="relative z-10 container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-hero-text mb-6">
          Pickering Reading Circle
        </h1>
        
        <p className="text-xl md:text-2xl text-hero-text/90 mb-12 max-w-2xl mx-auto">
          Empowering children through literacy for over 30 years
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={handleLearnMore}
            variant="hero"
            size="lg"
            className="px-8 py-3 text-lg font-semibold"
          >
            Learn More
          </Button>
          
          <Link to="/contact">
            <Button 
              variant="join"
              size="lg"
              className="px-8 py-3 text-lg font-semibold"
            >
              Join Us
            </Button>
          </Link>
        </div>
      </ScrollAnimatedSection>
    </section>
  );
};

export default Hero;