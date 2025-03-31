
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Video, Calendar, Clock, Users, Play, BookOpen, BarChart, Download, Bookmark, BookmarkCheck } from 'lucide-react';
import { format } from 'date-fns';

// Sample online classes data
const onlineClassesData = [
  {
    id: 1,
    title: 'Introduction to Calculus',
    subject: 'Mathematics',
    description: 'Learn the fundamentals of calculus, including limits, derivatives, and integrals.',
    teacher: 'Prof. Sharma',
    date: '2023-08-15',
    startTime: '09:00',
    endTime: '10:30',
    status: 'upcoming',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    isSaved: false
  },
  {
    id: 2,
    title: 'Forces and Motion',
    subject: 'Physics',
    description: 'Understanding Newton\'s laws of motion and their applications in real-world scenarios.',
    teacher: 'Dr. Patel',
    date: '2023-08-15',
    startTime: '11:00',
    endTime: '12:30',
    status: 'live',
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    meetingUrl: 'https://meet.google.com/jkl-mnop-qrs',
    isSaved: true
  },
  {
    id: 3,
    title: 'Organic Chemistry Introduction',
    subject: 'Chemistry',
    description: 'An overview of organic chemistry concepts, including molecular structures and functional groups.',
    teacher: 'Dr. Singh',
    date: '2023-08-16',
    startTime: '09:00',
    endTime: '10:30',
    status: 'upcoming',
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    meetingUrl: 'https://meet.google.com/tuv-wxyz-123',
    isSaved: false
  },
  {
    id: 4,
    title: 'Literary Analysis Techniques',
    subject: 'English',
    description: 'Learn advanced techniques for analyzing literature, including characterization, theme, and symbolism.',
    teacher: 'Mrs. Gupta',
    date: '2023-08-14',
    startTime: '14:00',
    endTime: '15:30',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    meetingUrl: 'https://meet.google.com/456-789-abc',
    isSaved: true
  },
  {
    id: 5,
    title: 'Programming Fundamentals',
    subject: 'Computer Science',
    description: 'Introduction to programming concepts, algorithms, and basic data structures.',
    teacher: 'Mr. Kumar',
    date: '2023-08-14',
    startTime: '16:00',
    endTime: '17:30',
    status: 'completed',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    meetingUrl: 'https://meet.google.com/def-ghi-jkl',
    isSaved: false
  }
];

// Sample recorded classes data
const recordedClassesData = [
  {
    id: 1,
    title: 'Advanced Calculus Techniques',
    subject: 'Mathematics',
    description: 'Deep dive into advanced calculus techniques including multiple integrals and vector calculus.',
    teacher: 'Prof. Sharma',
    date: '2023-08-10',
    duration: '1h 35m',
    views: 124,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    isSaved: true
  },
  {
    id: 2,
    title: 'Quantum Physics Fundamentals',
    subject: 'Physics',
    description: 'Introduction to quantum mechanics and its applications in modern physics.',
    teacher: 'Dr. Patel',
    date: '2023-08-08',
    duration: '1h 45m',
    views: 98,
    thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    isSaved: false
  },
  {
    id: 3,
    title: 'Chemical Bonding',
    subject: 'Chemistry',
    description: 'Understanding different types of chemical bonds and their properties.',
    teacher: 'Dr. Singh',
    date: '2023-08-05',
    duration: '1h 20m',
    views: 85,
    thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    isSaved: true
  },
  {
    id: 4,
    title: 'Shakespeare Analysis',
    subject: 'English',
    description: 'Deep dive into Shakespeare\'s plays with focus on Hamlet and Macbeth.',
    teacher: 'Mrs. Gupta',
    date: '2023-08-02',
    duration: '1h 50m',
    views: 76,
    thumbnail: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    isSaved: false
  },
  {
    id: 5,
    title: 'Object-Oriented Programming',
    subject: 'Computer Science',
    description: 'Learn about classes, objects, inheritance, polymorphism, and encapsulation.',
    teacher: 'Mr. Kumar',
    date: '2023-07-30',
    duration: '2h 05m',
    views: 112,
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    isSaved: true
  }
];

const OnlineClasses = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [liveClasses, setLiveClasses] = useState(onlineClassesData);
  const [recordings, setRecordings] = useState(recordedClassesData);
  
  const toggleSaveClass = (id: number, isLive: boolean) => {
    if (isLive) {
      setLiveClasses(
        liveClasses.map(cls => 
          cls.id === id ? { ...cls, isSaved: !cls.isSaved } : cls
        )
      );
    } else {
      setRecordings(
        recordings.map(rec => 
          rec.id === id ? { ...rec, isSaved: !rec.isSaved } : rec
        )
      );
    }
  };
  
  const filteredLiveClasses = liveClasses.filter(cls => 
    cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRecordings = recordings.filter(rec => 
    rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-red-500">Live Now</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="coaching-container">
      <h1 className="page-title">Online Classes</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="live" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="live">Live Classes</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        {/* Live Classes Tab */}
        {activeTab === 'live' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLiveClasses.filter(cls => cls.status !== 'completed').map(classItem => (
              <Card key={classItem.id} className="overflow-hidden flex flex-col">
                <div className="relative h-40">
                  <img 
                    src={classItem.thumbnail} 
                    alt={classItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(classItem.status)}
                  </div>
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-primary"
                    onClick={() => toggleSaveClass(classItem.id, true)}
                  >
                    {classItem.isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </Button>
                  {classItem.status === 'live' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button className="rounded-full w-14 h-14 flex items-center justify-center">
                        <Play size={24} />
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/5 text-primary">
                      {classItem.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{classItem.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{classItem.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-0 pt-0 flex-1">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>Instructor: {classItem.teacher}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{format(new Date(classItem.date), 'MMMM dd, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{classItem.startTime} - {classItem.endTime}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4">
                  {classItem.status === 'live' ? (
                    <Button className="w-full bg-red-500 hover:bg-red-600">
                      Join Live Class
                    </Button>
                  ) : (
                    <Button className="w-full">
                      Set Reminder
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
            
            {filteredLiveClasses.filter(cls => cls.status !== 'completed').length === 0 && (
              <div className="col-span-full text-center py-12">
                <Video className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium mb-2">No live classes found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria or check back later</p>
              </div>
            )}
          </div>
        )}
        
        {/* Recordings Tab */}
        {activeTab === 'recordings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecordings.map(recording => (
              <Card key={recording.id} className="overflow-hidden flex flex-col">
                <div className="relative h-40">
                  <img 
                    src={recording.thumbnail} 
                    alt={recording.title} 
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-primary"
                    onClick={() => toggleSaveClass(recording.id, false)}
                  >
                    {recording.isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                  </Button>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button className="rounded-full w-14 h-14 flex items-center justify-center">
                      <Play size={24} />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-primary/5 text-primary">
                      {recording.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{recording.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{recording.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-0 pt-0 flex-1">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>Instructor: {recording.teacher}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{format(new Date(recording.date), 'MMMM dd, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>Duration: {recording.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <BarChart size={16} className="text-primary" />
                      <span>{recording.views} views</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Button className="w-full">
                    Watch Recording
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredRecordings.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Video className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium mb-2">No recordings found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}
        
        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ...filteredLiveClasses.filter(cls => cls.isSaved),
              ...filteredRecordings.filter(rec => rec.isSaved)
            ].map(item => {
              const isLiveClass = 'status' in item;
              
              return (
                <Card key={`${isLiveClass ? 'live' : 'rec'}-${item.id}`} className="overflow-hidden flex flex-col">
                  <div className="relative h-40">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    {isLiveClass && (
                      <div className="absolute top-2 right-2">
                        {getStatusBadge((item as typeof liveClasses[0]).status)}
                      </div>
                    )}
                    <Button
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 left-2 bg-white/80 hover:bg-white text-primary"
                      onClick={() => toggleSaveClass(item.id, isLiveClass)}
                    >
                      <BookmarkCheck size={18} />
                    </Button>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button className="rounded-full w-14 h-14 flex items-center justify-center">
                        <Play size={24} />
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/5 text-primary">
                        {item.subject}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-0 pt-0 flex-1">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-primary" />
                        <span>Instructor: {item.teacher}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        <span>{format(new Date(item.date), 'MMMM dd, yyyy')}</span>
                      </div>
                      
                      {isLiveClass ? (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary" />
                          <span>{(item as typeof liveClasses[0]).startTime} - {(item as typeof liveClasses[0]).endTime}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary" />
                          <span>Duration: {(item as typeof recordings[0]).duration}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-4">
                    <Button className="w-full">
                      {isLiveClass 
                        ? (item as typeof liveClasses[0]).status === 'live' 
                          ? 'Join Live Class' 
                          : 'View Details'
                        : 'Watch Recording'
                      }
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
            
            {filteredLiveClasses.filter(cls => cls.isSaved).length === 0 && 
             filteredRecordings.filter(rec => rec.isSaved).length === 0 && (
              <div className="col-span-full text-center py-12">
                <BookmarkCheck className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium mb-2">No saved classes or recordings</h3>
                <p className="text-muted-foreground">Bookmark your favorite classes to access them quickly</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineClasses;
