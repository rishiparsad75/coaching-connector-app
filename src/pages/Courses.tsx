
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Users, Search, Filter, Star } from 'lucide-react';

// Sample course data
const coursesData = [
  {
    id: 1,
    title: 'Mathematics - Grade 10',
    description: 'Comprehensive course covering algebra, geometry, and trigonometry for 10th grade students.',
    instructor: 'Prof. Sharma',
    duration: '4 months',
    enrolled: 45,
    level: 'Intermediate',
    category: 'Mathematics',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    status: 'Active'
  },
  {
    id: 2,
    title: 'Physics - Grade 12',
    description: 'Advanced physics course preparing students for competitive exams and board examinations.',
    instructor: 'Dr. Patel',
    duration: '6 months',
    enrolled: 32,
    level: 'Advanced',
    category: 'Science',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    status: 'Active'
  },
  {
    id: 3,
    title: 'English Literature',
    description: 'Detailed study of classic and contemporary literary works with focus on critical analysis.',
    instructor: 'Mrs. Gupta',
    duration: '3 months',
    enrolled: 28,
    level: 'Beginner',
    category: 'Language',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    status: 'Active'
  },
  {
    id: 4,
    title: 'Chemistry Fundamentals',
    description: 'Core chemistry concepts with laboratory experiments for high school students.',
    instructor: 'Dr. Singh',
    duration: '5 months',
    enrolled: 36,
    level: 'Intermediate',
    category: 'Science',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    status: 'Upcoming'
  },
  {
    id: 5,
    title: 'Computer Science Basics',
    description: 'Introduction to programming concepts, algorithms, and data structures.',
    instructor: 'Mr. Kumar',
    duration: '4 months',
    enrolled: 40,
    level: 'Beginner',
    category: 'Technology',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    status: 'Active'
  },
  {
    id: 6,
    title: 'History - Modern World',
    description: 'Exploration of significant historical events from the 18th century to present times.',
    instructor: 'Prof. Iyer',
    duration: '3 months',
    enrolled: 22,
    level: 'Intermediate',
    category: 'Humanities',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    status: 'Completed'
  }
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && course.status.toLowerCase() === activeTab.toLowerCase();
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="coaching-container">
      <h1 className="page-title">Course Catalog</h1>
      
      {/* Search and filter section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={16} />
            Filter
          </Button>
        </div>
      </div>
      
      {/* Tabs for course status */}
      <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Course cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card key={course.id} className="overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge 
                  className={
                    course.status === 'Active' ? 'bg-green-500' : 
                    course.status === 'Upcoming' ? 'bg-blue-500' : 
                    'bg-gray-500'
                  }
                >
                  {course.status}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-secondary" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-secondary" />
                  <span>Duration: {course.duration}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-amber-500" />
                  <span>{course.rating} ({course.enrolled} students)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-secondary" />
                  <Badge variant="outline">{course.level}</Badge>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Button className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No courses found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
