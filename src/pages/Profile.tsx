
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Calendar, Mail, Phone, Home, Edit, Download } from 'lucide-react';

const Profile = () => {
  // Sample student data - in a real app, this would come from an API
  const student = {
    id: 'ST-12345',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: '123 Education Lane, Knowledge City, India',
    batch: '2023-24 Science',
    joinDate: 'June 15, 2023',
    profileImage: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    enrolledCourses: [
      { id: 1, name: 'Mathematics - Grade 10', progress: 75, instructor: 'Prof. Sharma' },
      { id: 2, name: 'Physics - Grade 12', progress: 60, instructor: 'Dr. Patel' },
      { id: 3, name: 'Chemistry Fundamentals', progress: 45, instructor: 'Dr. Singh' }
    ],
    achievements: [
      { id: 1, title: 'Perfect Attendance', date: 'July 2023', description: '100% attendance for the month' },
      { id: 2, title: 'Quiz Champion', date: 'August 2023', description: 'Highest score in Mathematics quiz' }
    ],
    payments: [
      { id: 1, date: '2023-06-15', amount: '₹12,500', status: 'Paid', description: 'Admission Fee' },
      { id: 2, date: '2023-07-10', amount: '₹8,000', status: 'Paid', description: 'Monthly Tuition - July' },
      { id: 3, date: '2023-08-10', amount: '₹8,000', status: 'Pending', description: 'Monthly Tuition - August' }
    ]
  };
  
  return (
    <div className="coaching-container">
      <h1 className="page-title">Student Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-col items-center text-center pb-2">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={student.profileImage} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{student.name}</CardTitle>
            <CardDescription className="font-medium">
              <Badge variant="outline">{student.id}</Badge>
            </CardDescription>
            <CardDescription className="mt-1">{student.batch}</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Separator className="my-4" />
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary flex-shrink-0" />
                <span className="flex-1 truncate">{student.email}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary flex-shrink-0" />
                <span>{student.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-secondary flex-shrink-0" />
                <span>{student.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-secondary flex-shrink-0" />
                <span>Joined: {student.joinDate}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Edit size={16} />
              Edit Profile
            </Button>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="courses">
            <TabsList className="mb-6">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
            </TabsList>
            
            {/* Courses Tab */}
            <TabsContent value="courses">
              <div className="space-y-4">
                {student.enrolledCourses.map(course => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        </div>
                        <Button size="sm" className="mt-2 md:mt-0">
                          View Course
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Course Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <div className="space-y-4">
                {student.achievements.map(achievement => (
                  <Card key={achievement.id}>
                    <CardContent className="p-6 flex gap-4">
                      <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        <p className="mt-1 text-sm">{achievement.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {student.achievements.length === 0 && (
                  <div className="text-center py-10">
                    <Award className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No achievements yet</h3>
                    <p className="text-muted-foreground">Keep learning to earn achievements!</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment History</CardTitle>
                  <CardDescription>View and download payment receipts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.payments.map(payment => (
                      <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(payment.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{payment.amount}</p>
                            <Badge variant={payment.status === 'Paid' ? 'outline' : 'secondary'}>
                              {payment.status}
                            </Badge>
                          </div>
                          {payment.status === 'Paid' && (
                            <Button size="icon" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
