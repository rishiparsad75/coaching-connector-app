
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing, Calendar, Book, Users, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API
  const announcements = [
    {
      id: 1,
      title: 'New Math Course Available',
      description: 'We have added a new course for advanced calculus starting next week.',
      date: 'Today',
      type: 'info'
    },
    {
      id: 2,
      title: 'Holiday Notice',
      description: 'The center will be closed for Independence Day on August 15th.',
      date: 'Yesterday',
      type: 'warning'
    },
    {
      id: 3,
      title: 'Exam Preparations',
      description: 'Special sessions for board exam preparations will start from next month.',
      date: '3 days ago',
      type: 'success'
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      time: '9:00 AM - 10:30 AM',
      teacher: 'Prof. Sharma',
      room: 'Room 101',
      today: true
    },
    {
      id: 2,
      subject: 'Physics Lab',
      time: '11:00 AM - 12:30 PM',
      teacher: 'Dr. Patel',
      room: 'Lab 3',
      today: true
    },
    {
      id: 3,
      subject: 'English Literature',
      time: '9:00 AM - 10:30 AM',
      teacher: 'Mrs. Gupta',
      room: 'Room 105',
      today: false
    }
  ];

  return (
    <div className="coaching-container">
      <h1 className="page-title">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Book className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">12</p>
            <p className="text-muted-foreground text-sm">Enrolled Courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Calendar className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">24</p>
            <p className="text-muted-foreground text-sm">Upcoming Classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Award className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">85%</p>
            <p className="text-muted-foreground text-sm">Attendance Rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Clock className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">46</p>
            <p className="text-muted-foreground text-sm">Hours Completed</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 text-primary" size={20} />
                Upcoming Classes
              </CardTitle>
              <CardDescription>Your scheduled classes for today and tomorrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map(classItem => (
                  <div key={classItem.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                    <div className="bg-primary/10 p-2 rounded">
                      <Calendar className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{classItem.subject}</h3>
                        {classItem.today && (
                          <Badge className="bg-accent">Today</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{classItem.time}</p>
                      <div className="flex items-center mt-1 text-sm">
                        <Users className="mr-1" size={14} />
                        <span>{classItem.teacher}</span>
                        <span className="mx-2">•</span>
                        <span>{classItem.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Classes
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Announcements */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="mr-2 text-primary" size={20} />
                Announcements
              </CardTitle>
              <CardDescription>Important updates from your coaching center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map(announcement => (
                  <div key={announcement.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <Badge
                        className={`${
                          announcement.type === 'info'
                            ? 'bg-blue-500'
                            : announcement.type === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                        }`}
                      >
                        {announcement.date}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1">{announcement.description}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Announcements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
