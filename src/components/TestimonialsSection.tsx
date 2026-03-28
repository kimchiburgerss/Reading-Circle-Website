import { ScrollAnimatedSection } from '@/hooks/use-scroll-animation';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "The Pickering Reading Circle stresses importance of reading to children from an early age. It fosters the love of reading in a child and how it can change their life. I think today we have many busy parents and often children don't have an older person they can look up to, someone to read to them out loud. The Pickering Reading circle gets passionate volunteers to read to kids and listen to them read – helping them improve their own reading abilities. Being a volunteer for this program is extremely self-rewarding because you are fostering the love of reading in a child and can change their life by introducing them to a new series, new genre, new story,or new adventure to read about. Through this program we can educate the future through literature and by practising these listening, reading and writing skills, we have the power to make a difference as these children grow up to be potential world changers.",
    author: "Sumaiyah Shihipar",
    role: "Volunteer"
  },
  {
    id: 2,
    text: "The Reading Circle has transformed my child's relationship with books. The personalized attention and encouragement they receive has boosted their confidence tremendously.",
    author: "Sarah Johnson",
    role: "Parent"
  },
  {
    id: 3,
    text: "As a teacher, I've seen firsthand how the Reading Circle's programs complement classroom learning. The children who participate show remarkable improvement in their literacy skills.",
    author: "Michael Chen",
    role: "Elementary School Teacher"
  },
  {
    id: 4,
    text: "Volunteering with the Pickering Reading Circle has been one of the most rewarding experiences of my life. Watching children discover the joy of reading is truly magical.",
    author: "Emma Williams",
    role: "Volunteer Tutor"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <ScrollAnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What People Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our volunteers, parents, and community members about the impact of the Pickering Reading Circle
          </p>
        </ScrollAnimatedSection>

        <ScrollAnimatedSection delay={200}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-8 h-full flex flex-col">
                      <Quote className="h-8 w-8 text-primary mb-4 opacity-60" />
                      <blockquote className="text-foreground/90 mb-6 flex-grow leading-relaxed">
                        {testimonial.text}
                      </blockquote>
                      <footer className="border-t border-border/20 pt-4">
                        <cite className="font-semibold text-foreground block">
                          {testimonial.author}
                        </cite>
                        <span className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </span>
                      </footer>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </ScrollAnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;