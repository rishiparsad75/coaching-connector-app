
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Calendar, ClipboardCheck, GraduationCap } from 'lucide-react';

// Mock data for the admin dashboard
const mockStudents = [
  { id: '1', name: 'John Doe', class: 'Class 10', attendance: '85%', fees: 'Paid' },
  { id: '2', name: 'Jane Smith', class: 'Class 12', attendance: '92%', fees: 'Pending' },
  { id: '3', name: 'Alex Johnson', class: 'Class 11', attendance: '78%', fees: 'Paid' },
  { id: '4', name: 'Sarah Williams', class: 'Class 9', attendance: '90%', fees: 'Paid' },
  { id: '5', name: 'Michael Brown', class: 'Class 10', attendance: '65%', fees: 'Pending' },
];

const mockCourses = [
  { id: '1', name: 'Mathematics', students: 45, instructor: 'Dr. Patel' },
  { id: '2', name: 'Physics', students: 38, instructor: 'Prof. Sharma' },
  { id: '3', name: 'Chemistry', students: 32, instructor: 'Dr. Gupta' },
  { id: '4', name: 'Biology', students: 28, instructor: 'Dr. Singh' },
];

// Mock data for faculty
const mockFaculty = [
  { id: '1', name: 'Dr. Patel', department: 'Mathematics', qualification: 'PhD', experience: '15 years' },
  { id: '2', name: 'Prof. Sharma', department: 'Physics', qualification: 'MSc', experience: '12 years' },
  { id: '3', name: 'Dr. Gupta', department: 'Chemistry', qualification: 'PhD', experience: '10 years' },
  { id: '4', name: 'Dr. Singh', department: 'Biology', qualification: 'PhD', experience: '8 years' },
  { id: '5', name: 'Mrs. Verma', department: 'English', qualification: 'MA', experience: '9 years' },
];

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Users className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">145</p>
            <p className="text-muted-foreground text-sm">Total Students</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <GraduationCap className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">12</p>
            <p className="text-muted-foreground text-sm">Faculty Members</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <BookOpen className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">12</p>
            <p className="text-muted-foreground text-sm">Active Courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Calendar className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">24</p>
            <p className="text-muted-foreground text-sm">Scheduled Classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <ClipboardCheck className="text-primary mb-2" size={24} />
            <p className="text-xl font-bold">85%</p>
            <p className="text-muted-foreground text-sm">Avg. Attendance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="mb-4">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View and manage all registered students.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Class</th>
                      <th className="px-4 py-2 text-left">Attendance</th>
                      <th className="px-4 py-2 text-left">Fees Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map(student => (
                      <tr key={student.id} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-3">{student.name}</td>
                        <td className="px-4 py-3">{student.class}</td>
                        <td className="px-4 py-3">{student.attendance}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            student.fees === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {student.fees}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Management</CardTitle>
              <CardDescription>View and manage all faculty members.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Department</th>
                      <th className="px-4 py-2 text-left">Qualification</th>
                      <th className="px-4 py-2 text-left">Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFaculty.map(faculty => (
                      <tr key={faculty.id} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium">{faculty.name}</td>
                        <td className="px-4 py-3">{faculty.department}</td>
                        <td className="px-4 py-3">{faculty.qualification}</td>
                        <td className="px-4 py-3">{faculty.experience}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Manage the courses offered by the coaching center.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Course Name</th>
                      <th className="px-4 py-2 text-left">Enrolled Students</th>
                      <th className="px-4 py-2 text-left">Instructor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCourses.map(course => (
                      <tr key={course.id} className="border-b hover:bg-slate-50">
                        <td className="px-4 py-3">{course.name}</td>
                        <td className="px-4 py-3">{course.students}</td>
                        <td className="px-4 py-3">{course.instructor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Class Schedule</CardTitle>
              <CardDescription>Manage the class schedules and timings.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Schedule management content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>Configure system settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings content will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
