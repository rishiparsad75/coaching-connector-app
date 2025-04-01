import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';

const mockStudents = [
  { id: '1', name: 'John Doe', class: 'Class 10', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', class: 'Class 12', email: 'jane@example.com' },
  { id: '3', name: 'Alex Johnson', class: 'Class 11', email: 'alex@example.com' },
  { id: '4', name: 'Sarah Williams', class: 'Class 9', email: 'sarah@example.com' },
  { id: '5', name: 'Michael Brown', class: 'Class 10', email: 'michael@example.com' },
  { id: '6', name: 'Emily Davis', class: 'Class 11', email: 'emily@example.com' },
];

const mockCourses = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'Physics' },
  { id: '3', name: 'Chemistry' },
  { id: '4', name: 'Biology' },
  { id: '5', name: 'English' },
  { id: '6', name: 'Computer Science' },
];

const mockAttendance = {
  '2023-05-10': {
    '1': { // Course ID
      '1': true, // Student ID: present
      '2': true,
      '3': false,
      '4': true,
      '5': false,
      '6': true,
    },
    '2': {
      '1': true,
      '2': false,
      '3': true,
      '4': true,
      '5': true,
      '6': false,
    }
  },
  '2023-05-11': {
    '1': {
      '1': false,
      '2': true,
      '3': true,
      '4': false,
      '5': true,
      '6': true,
    }
  }
};

const AdminAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCourse, setSelectedCourse] = useState<string>("1");
  const [attendanceData, setAttendanceData] = useState<any>(mockAttendance);
  const [studentAttendance, setStudentAttendance] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const formatDate = (date?: Date) => {
    return date ? format(date, 'yyyy-MM-dd') : '';
  };

  React.useEffect(() => {
    if (selectedDate && selectedCourse) {
      const dateKey = formatDate(selectedDate);
      const courseAttendance = attendanceData[dateKey]?.[selectedCourse] || {};
      setStudentAttendance(courseAttendance);
    }
  }, [selectedDate, selectedCourse, attendanceData]);

  const handleToggleAttendance = (studentId: string) => {
    setStudentAttendance(prev => {
      const newAttendance = { ...prev, [studentId]: !prev[studentId] };
      return newAttendance;
    });
  };

  const saveAttendance = () => {
    if (selectedDate && selectedCourse) {
      const dateKey = formatDate(selectedDate);
      
      setAttendanceData(prev => {
        const newData = { ...prev };
        
        if (!newData[dateKey]) {
          newData[dateKey] = {};
        }
        
        newData[dateKey][selectedCourse] = studentAttendance;
        
        return newData;
      });
      
      toast({
        title: "Attendance Saved",
        description: `Attendance for ${format(selectedDate, 'MMMM d, yyyy')} has been updated.`,
      });
    }
  };

  const markAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    mockStudents.forEach(student => {
      allPresent[student.id] = true;
    });
    setStudentAttendance(allPresent);
  };

  const markAllAbsent = () => {
    const allAbsent: Record<string, boolean> = {};
    mockStudents.forEach(student => {
      allAbsent[student.id] = false;
    });
    setStudentAttendance(allAbsent);
  };

  const getAttendancePercentage = (studentId: string) => {
    let present = 0;
    let total = 0;

    Object.keys(attendanceData).forEach(date => {
      Object.keys(attendanceData[date]).forEach(courseId => {
        if (attendanceData[date][courseId][studentId] !== undefined) {
          total++;
          if (attendanceData[date][courseId][studentId]) {
            present++;
          }
        }
      });
    });

    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Attendance Management</h1>
        <p className="text-muted-foreground">Manage student attendance for all classes</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">Select Date & Course</CardTitle>
              <CardDescription>Choose a date and course to manage attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full max-w-full"
                  showOutsideDays={false}
                  disabled={(date) => date > new Date()}
                />
              </div>
              
              <div>
                <h3 className="mb-2 font-medium">Course</h3>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-8">
          <Tabs defaultValue="mark" className="w-full">
            <TabsList className="mb-4 w-full sm:w-auto">
              <TabsTrigger value="mark" className="flex-1 sm:flex-none">Mark Attendance</TabsTrigger>
              <TabsTrigger value="reports" className="flex-1 sm:flex-none">Attendance Reports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mark">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div>
                      <CardTitle className="text-lg md:text-xl">
                        {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Today'}
                      </CardTitle>
                      <CardDescription>
                        {mockCourses.find(c => c.id === selectedCourse)?.name || 'Select a course'}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm" onClick={markAllPresent}>
                        All Present
                      </Button>
                      <Button variant="outline" size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm" onClick={markAllAbsent}>
                        All Absent
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          {!isMobile && <TableHead>Class</TableHead>}
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockStudents.map(student => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.name}
                              {isMobile && <div className="text-xs text-muted-foreground mt-1">{student.class}</div>}
                            </TableCell>
                            {!isMobile && <TableCell>{student.class}</TableCell>}
                            <TableCell>
                              {studentAttendance[student.id] !== undefined ? (
                                <Badge variant={studentAttendance[student.id] ? "outline" : "destructive"} className="whitespace-nowrap">
                                  {studentAttendance[student.id] ? 'Present' : 'Absent'}
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="whitespace-nowrap">Not Marked</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleToggleAttendance(student.id)}
                                className={`text-xs sm:text-sm ${studentAttendance[student.id] ? "text-destructive" : "text-primary"}`}
                              >
                                {studentAttendance[student.id] ? 'Mark Absent' : 'Mark Present'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button onClick={saveAttendance}>Save Attendance</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reports">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg md:text-xl">Attendance Reports</CardTitle>
                  <CardDescription>Overall attendance statistics for all students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          {!isMobile && <TableHead>Class</TableHead>}
                          <TableHead>Attendance %</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockStudents.map(student => {
                          const attendancePercent = getAttendancePercentage(student.id);
                          return (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">
                                {student.name}
                                {isMobile && <div className="text-xs text-muted-foreground mt-1">{student.class}</div>}
                              </TableCell>
                              {!isMobile && <TableCell>{student.class}</TableCell>}
                              <TableCell>{attendancePercent}%</TableCell>
                              <TableCell>
                                {attendancePercent >= 80 ? (
                                  <Badge className="bg-green-100 text-green-800">Good</Badge>
                                ) : attendancePercent >= 60 ? (
                                  <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
                                ) : (
                                  <Badge className="bg-red-100 text-red-800">Poor</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
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

export default AdminAttendance;
