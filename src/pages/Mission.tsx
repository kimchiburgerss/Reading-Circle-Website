import Navigation from '@/components/Navigation';
import PageWrapper from '@/components/PageWrapper';

const Mission = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">Mission Statement</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Our commitment to empowering children through literacy and education
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    The Pickering Reading Circle is dedicated to providing free tutoring and mentorship to children in our community, 
                    fostering literacy, numeracy, and social skills development. For over 30 years, we have been committed to helping 
                    young learners achieve their full potential through personalized educational support.
                  </p>

                  <h2 className="text-2xl font-semibold text-primary mb-4">Our Vision</h2>
                  <p className="text-foreground/90 leading-relaxed mb-6">
                    We envision a community where every child has access to quality educational resources and support, 
                    regardless of their family's financial circumstances. Our goal is to create a nurturing environment 
                    where children can develop confidence, academic skills, and a lifelong love of learning.
                  </p>

                  <h2 className="text-2xl font-semibold text-primary mb-4">Our Values</h2>
                  <ul className="list-disc list-inside text-foreground/90 space-y-2 mb-6">
                    <li><strong>Excellence:</strong> We maintain high standards in our tutoring programs and educational approaches</li>
                    <li><strong>Inclusivity:</strong> We welcome children from all backgrounds and learning abilities</li>
                    <li><strong>Community:</strong> We build strong relationships with families, schools, and community partners</li>
                    <li><strong>Empowerment:</strong> We help children develop confidence and independence in their learning journey</li>
                    <li><strong>Dedication:</strong> Our volunteers are committed to making a meaningful difference in each child's life</li>
                  </ul>

                  <h2 className="text-2xl font-semibold text-primary mb-4">Our Impact</h2>
                  <p className="text-foreground/90 leading-relaxed">
                    Since our founding, we have helped hundreds of children improve their reading skills, build academic confidence, 
                    and develop a positive attitude toward learning. Our award-winning program continues to be a cornerstone of 
                    educational support in Pickering, Ontario, adapting to meet the evolving needs of our community's children.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Mission;
