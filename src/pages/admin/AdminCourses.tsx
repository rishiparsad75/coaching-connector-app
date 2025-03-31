
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

// Mock data for the courses
const mockCourses = [
  { id: '1', name: 'Mathematics', students: 45, instructor: 'Dr. Patel', schedule: 'Mon, Wed, Fri 9:00 AM' },
  { id: '2', name: 'Physics', students: 38, instructor: 'Prof. Sharma', schedule: 'Tue, Thu 10:30 AM' },
  { id: '3', name: 'Chemistry', students: 32, instructor: 'Dr. Gupta', schedule: 'Mon, Wed 2:00 PM' },
  { id: '4', name: 'Biology', students: 28, instructor: 'Dr. Singh', schedule: 'Tue, Thu 3:30 PM' },
  { id: '5', name: 'English', students: 50, instructor: 'Mrs. Verma', schedule: 'Fri 12:00 PM' },
  { id: '6', name: 'Computer Science', students: 35, instructor: 'Mr. Joshi', schedule: 'Wed, Fri 4:00 PM' },
];

const AdminCourses = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <p className="text-gray-500">Manage all courses offered at the coaching center</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses List</CardTitle>
          <CardDescription>All courses currently offered by the coaching center.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Enrolled Students</TableHead>
                <TableHead>Schedule</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCourses.map(course => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCourses;
