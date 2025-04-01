import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { format, subDays, addDays } from 'date-fns';
import { Check, Search, Calendar as CalendarIcon, BarChart, Filter, Download, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Sample students data
const studentsData = [
  { id: 1, name: 'Rahul Sharma', rollNo: 'S001', present: true },
  { id: 2, name: 'Priya Patel', rollNo: 'S002', present: false },
  { id: 3, name: 'Amit Singh', rollNo: 'S003', present: true },
  { id: 4, name: 'Neha Gupta', rollNo: 'S004', present: true },
  { id: 5, name: 'Raj Kumar', rollNo: 'S005', present: false },
  { id: 6, name: 'Ananya Desai', rollNo: 'S006', present: true },
  { id: 7, name: 'Vikram Reddy', rollNo: 'S007', present: true },
  { id: 8, name: 'Sunita Joshi', rollNo: 'S008', present: true },
  { id: 9, name: 'Deepak Malhotra', rollNo: 'S009', present: false },
  { id: 10, name: 'Meera Shah', rollNo: 'S010', present: true },
];

// Sample attendance history
const attendanceHistory = [
  { 
    date: '2023-08-14', 
    subject: 'Mathematics', 
    teacher: 'Prof. Sharma', 
    totalStudents: 45, 
    presentStudents: 42, 
    absentStudents: 3 
  },
  { 
    date: '2023-08-14', 
    subject: 'Physics', 
    teacher: 'Dr. Patel', 
    totalStudents: 38, 
    presentStudents: 35, 
    absentStudents: 3 
  },
  { 
    date: '2023-08-13', 
    subject: 'Chemistry', 
    teacher: 'Dr. Singh', 
    totalStudents: 40, 
    presentStudents: 38, 
    absentStudents: 2 
  },
  { 
    date: '2023-08-13', 
    subject: 'English', 
    teacher: 'Mrs. Gupta', 
    totalStudents: 45, 
    presentStudents: 40, 
    absentStudents: 5 
  },
  { 
    date: '2023-08-12', 
    subject: 'Computer Science', 
    teacher: 'Mr. Kumar', 
    totalStudents: 35, 
    presentStudents: 33, 
    absentStudents: 2 
  },
];

// Sample student attendance statistics
const studentStats = [
  { id: 1, name: 'Rahul Sharma', rollNo: 'S001', attendance: 95, lastAbsent: '2023-08-05' },
  { id: 2, name: 'Priya Patel', rollNo: 'S002', attendance: 80, lastAbsent: '2023-08-14' },
  { id: 3, name: 'Amit Singh', rollNo: 'S003', attendance: 90, lastAbsent: '2023-08-10' },
  { id: 4, name: 'Neha Gupta', rollNo: 'S004', attendance: 98, lastAbsent: '2023-07-29' },
  { id: 5, name: 'Raj Kumar', rollNo: 'S005', attendance: 75, lastAbsent: '2023-08-14' },
  { id: 6, name: 'Ananya Desai', rollNo: 'S006', attendance: 92, lastAbsent: '2023-08-01' },
  { id: 7, name: 'Vikram Reddy', rollNo: 'S007', attendance: 89, lastAbsent: '2023-08-03' },
  { id: 8, name: 'Sunita Joshi', rollNo: 'S008', attendance: 94, lastAbsent: '2023-07-25' },
  { id: 9, name: 'Deepak Malhotra', rollNo: 'S009', attendance: 78, lastAbsent: '2023-08-14' },
  { id: 10, name: 'Meera Shah', rollNo: 'S010', attendance: 91, lastAbsent: '2023-08-02' },
];

const Attendance = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.role === 'admin' ? 'mark' : 'history');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState('Mathematics');
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setStudents(
      students.map(student => 
        student.id === studentId ? { ...student, present } : student
      )
    );
  };
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = attendanceHistory.filter(record =>
    record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStats = studentStats.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isAdmin = user?.role === 'admin';

  return (
    <div className="coaching-container">
      <h1 className="page-title">Attendance Management</h1>
      
      <Tabs defaultValue={isAdmin ? "mark" : "history"} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full grid-cols-1 ${isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'} mb-6`}>
          {isAdmin && <TabsTrigger value="mark">Mark Attendance</TabsTrigger>}
          <TabsTrigger value="history">Attendance Records</TabsTrigger>
          <TabsTrigger value="stats">Student Statistics</TabsTrigger>
        </TabsList>
        
        {isAdmin && (
          <TabsContent value="mark">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Select Date & Class</CardTitle>
                  <CardDescription>Mark attendance for a specific date and class</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={{
                        after: new Date(),
                        before: subDays(new Date(), 7)
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Class</Label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="English">English</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedClass} - {selectedDate ? format(selectedDate, 'EEEE, MMMM dd, yyyy') : 'Today'}
                  </CardTitle>
                  <CardDescription>Manage attendance for the selected class</CardDescription>
                  
                  <div className="w-full relative mt-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Roll No</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="text-right">Attendance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map(student => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.rollNo}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Label htmlFor={`attendance-${student.id}`}>
                                  {student.present ? 'Present' : 'Absent'}
                                </Label>
                                <Switch
                                  id={`attendance-${student.id}`}
                                  checked={student.present}
                                  onCheckedChange={(checked) => handleAttendanceChange(student.id, checked)}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Present: {students.filter(s => s.present).length}/{students.length}
                    </span>
                  </div>
                  <Button>Save Attendance</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>View and manage attendance history</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter size={16} />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download size={16} />
                    Export
                  </Button>
                </div>
              </div>
              <div className="w-full relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by subject or teacher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {format(new Date(record.date), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>{record.teacher}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={(record.presentStudents / record.totalStudents) * 100} className="h-2" />
                            <span className="text-sm whitespace-nowrap">
                              {record.presentStudents}/{record.totalStudents}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Student Attendance Statistics</CardTitle>
                  <CardDescription>View overall attendance performance</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <BarChart size={16} />
                    Charts
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download size={16} />
                    Export
                  </Button>
                </div>
              </div>
              <div className="w-full relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Roll No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Attendance %</TableHead>
                      <TableHead>Last Absent</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStats.map(student => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={student.attendance} className="h-2" />
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{format(new Date(student.lastAbsent), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            className={
                              student.attendance >= 90 ? 'bg-green-500' :
                              student.attendance >= 80 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }
                          >
                            {student.attendance >= 90 ? 'Excellent' :
                             student.attendance >= 80 ? 'Good' :
                             'Needs Improvement'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attendance;
