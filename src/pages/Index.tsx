
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, CalendarCheck, Award, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" 
              alt="SSF Study Point" 
              className="h-32 w-32"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-coaching-secondary">SSF Study Point</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Empowering students through quality education since 2020
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-coaching-primary hover:bg-coaching-primary/90">
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-coaching-secondary">Why Choose SSF Study Point?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-coaching-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-7 w-7 text-coaching-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
                <p className="text-gray-600">Learn from experienced educators with proven teaching methodologies.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-coaching-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-coaching-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Small Batch Sizes</h3>
                <p className="text-gray-600">Personalized attention with limited students per batch for better learning.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-coaching-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CalendarCheck className="h-7 w-7 text-coaching-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-gray-600">Choose from various batches to fit your learning preferences and schedule.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 bg-coaching-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-coaching-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Results Oriented</h3>
                <p className="text-gray-600">Proven track record of excellent results and student achievements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-coaching-secondary mb-4 md:mb-0">Popular Courses</h2>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/courses">
                View All Courses <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
              <div className="relative h-40 bg-coaching-primary/10">
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-16 w-16 text-coaching-primary/40" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Mathematics</h3>
                <p className="text-gray-600 mb-4">Comprehensive mathematics courses for all levels with focus on problem-solving techniques.</p>
                <Button asChild className="w-full bg-coaching-primary hover:bg-coaching-primary/90">
                  <Link to="/courses">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
              <div className="relative h-40 bg-coaching-secondary/10">
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-16 w-16 text-coaching-secondary/40" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Physics</h3>
                <p className="text-gray-600 mb-4">Master physics concepts through practical examples and engaging experiments.</p>
                <Button asChild className="w-full bg-coaching-primary hover:bg-coaching-primary/90">
                  <Link to="/courses">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all">
              <div className="relative h-40 bg-coaching-accent/10">
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-16 w-16 text-coaching-accent/40" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Chemistry</h3>
                <p className="text-gray-600 mb-4">Understanding chemical principles through interactive teaching and laboratory work.</p>
                <Button asChild className="w-full bg-coaching-primary hover:bg-coaching-primary/90">
                  <Link to="/courses">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-coaching-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-coaching-secondary">Ready to Excel in Your Studies?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join SSF Study Point today and take the first step towards academic excellence.
          </p>
          <Button asChild size="lg" className="bg-coaching-primary hover:bg-coaching-primary/90">
            <Link to="/about">Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
