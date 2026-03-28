import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import JoinUsSection from '@/components/JoinUsSection';
import PageWrapper from '@/components/PageWrapper';

const Home = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <AboutSection />
        <TestimonialsSection />
        <JoinUsSection />
      </div>
    </PageWrapper>
  );
};

export default Home;