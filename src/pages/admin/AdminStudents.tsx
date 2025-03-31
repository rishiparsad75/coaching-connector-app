
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
import { useAuth } from '@/contexts/AuthContext';

// Mock data for students
const mockStudents = [
  { id: '1', name: 'John Doe', class: 'Class 10', email: 'john@example.com', attendance: '85%', fees: 'Paid' },
  { id: '2', name: 'Jane Smith', class: 'Class 12', email: 'jane@example.com', attendance: '92%', fees: 'Pending' },
  { id: '3', name: 'Alex Johnson', class: 'Class 11', email: 'alex@example.com', attendance: '78%', fees: 'Paid' },
  { id: '4', name: 'Sarah Williams', class: 'Class 9', email: 'sarah@example.com', attendance: '90%', fees: 'Paid' },
  { id: '5', name: 'Michael Brown', class: 'Class 10', email: 'michael@example.com', attendance: '65%', fees: 'Pending' },
  { id: '6', name: 'Emily Davis', class: 'Class 11', email: 'emily@example.com', attendance: '88%', fees: 'Paid' },
  { id: '7', name: 'David Wilson', class: 'Class 12', email: 'david@example.com', attendance: '72%', fees: 'Pending' },
  { id: '8', name: 'Lisa Miller', class: 'Class 9', email: 'lisa@example.com', attendance: '95%', fees: 'Paid' },
];

const AdminStudents = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <p className="text-gray-500">Manage all students registered at the coaching center</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>A complete list of all registered students.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Fees Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.fees === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {student.fees}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStudents;
