import Navigation from '@/components/Navigation';
import PageWrapper from '@/components/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Schedule = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">Program Schedule</h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Find out when our tutoring sessions and programs are held
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Regular Tutoring Sessions */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Regular Tutoring Sessions</CardTitle>
                  <CardDescription>
                    Our core literacy and numeracy support programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Elementary Students</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Monday:</span>
                          <span className="text-foreground">4:00 PM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Wednesday:</span>
                          <span className="text-foreground">4:00 PM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Saturday:</span>
                          <span className="text-foreground">10:00 AM - 12:00 PM</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Middle School Students</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Tuesday:</span>
                          <span className="text-foreground">4:30 PM - 6:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Thursday:</span>
                          <span className="text-foreground">4:30 PM - 6:30 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/70">Saturday:</span>
                          <span className="text-foreground">1:00 PM - 3:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Programs */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Special Programs</CardTitle>
                  <CardDescription>
                    Enrichment activities and seasonal programs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold text-foreground">Summer Reading Camp</h3>
                      <p className="text-sm text-foreground/70">July - August</p>
                      <p className="text-sm text-foreground/90 mt-1">
                        Monday to Friday, 9:00 AM - 12:00 PM
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold text-foreground">Homework Help Club</h3>
                      <p className="text-sm text-foreground/70">September - June</p>
                      <p className="text-sm text-foreground/90 mt-1">
                        Tuesday and Thursday, 3:30 PM - 5:00 PM
                      </p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold text-foreground">Story Time & Reading Circle</h3>
                      <p className="text-sm text-foreground/70">Year-round</p>
                      <p className="text-sm text-foreground/90 mt-1">
                        First and Third Saturday of each month, 2:00 PM - 3:30 PM
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Location</CardTitle>
                  <CardDescription>
                    Where our programs take place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-foreground">
                      <strong>Pickering Reading Circle Center</strong>
                    </p>
                    <p className="text-foreground/90">
                      1235 Kingston Road<br />
                      Pickering, Ontario L1V 1B5
                    </p>
                    <p className="text-foreground/90">
                      <strong>Phone:</strong> (905) 555-0123
                    </p>
                    <p className="text-foreground/90">
                      <strong>Email:</strong> info@pickeringreadingcircle.ca
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-foreground/90">
                      <strong>Note:</strong> All programs are offered free of charge. Please contact us to register 
                      or for more information about session availability.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Holiday Schedule */}
              <Card className="border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Holiday Schedule</CardTitle>
                  <CardDescription>
                    Program closures and special holiday hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-foreground/90 space-y-1">
                    <p>· <strong>Winter Break:</strong> December 24 - January 2</p>
                    <p>· <strong>March Break:</strong> One week in March (dates vary yearly)</p>
                    <p>· <strong>Good Friday & Easter Monday:</strong> Closed</p>
                    <p>· <strong>Victoria Day:</strong> Closed</p>
                    <p>· <strong>Canada Day:</strong> Closed</p>
                    <p>· <strong>Civic Holiday:</strong> Closed</p>
                    <p>· <strong>Labour Day:</strong> Closed</p>
                    <p>· <strong>Thanksgiving:</strong> Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Schedule;
