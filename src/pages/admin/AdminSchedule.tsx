
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data for the schedule
const mockSchedule = [
  { id: '1', course: 'Mathematics', time: '9:00 AM - 10:30 AM', days: 'Monday, Wednesday, Friday', room: 'Room 101', instructor: 'Dr. Patel' },
  { id: '2', course: 'Physics', time: '10:30 AM - 12:00 PM', days: 'Tuesday, Thursday', room: 'Room 102', instructor: 'Prof. Sharma' },
  { id: '3', course: 'Chemistry', time: '2:00 PM - 3:30 PM', days: 'Monday, Wednesday', room: 'Lab 201', instructor: 'Dr. Gupta' },
  { id: '4', course: 'Biology', time: '3:30 PM - 5:00 PM', days: 'Tuesday, Thursday', room: 'Lab 202', instructor: 'Dr. Singh' },
  { id: '5', course: 'English', time: '12:00 PM - 1:30 PM', days: 'Friday', room: 'Room 103', instructor: 'Mrs. Verma' },
  { id: '6', course: 'Computer Science', time: '4:00 PM - 5:30 PM', days: 'Wednesday, Friday', room: 'Computer Lab', instructor: 'Mr. Joshi' },
];

const AdminSchedule = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Schedule Management</h1>
        <p className="text-muted-foreground">Manage class schedules for the coaching center</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
          <CardDescription>Complete schedule of all classes at the coaching center.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Instructor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSchedule.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.course}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.days}</TableCell>
                  <TableCell>{item.room}</TableCell>
                  <TableCell>{item.instructor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSchedule;
