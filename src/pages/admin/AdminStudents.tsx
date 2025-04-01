
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
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for students
const initialStudents = [
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
  const { toast } = useToast();
  const [students, setStudents] = useState(initialStudents);
  const [studentToDelete, setStudentToDelete] = useState<{id: string, name: string} | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleToggleFeeStatus = (studentId: string) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId 
          ? { ...student, fees: student.fees === 'Paid' ? 'Pending' : 'Paid' } 
          : student
      )
    );
    
    const student = students.find(s => s.id === studentId);
    const newStatus = student?.fees === 'Paid' ? 'Pending' : 'Paid';
    
    toast({
      title: "Fee Status Updated",
      description: `${student?.name}'s fee status is now ${newStatus}`,
      duration: 3000,
    });
  };

  const confirmDeleteStudent = (id: string, name: string) => {
    setStudentToDelete({ id, name });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteStudent = () => {
    if (studentToDelete) {
      setStudents(prevStudents => 
        prevStudents.filter(student => student.id !== studentToDelete.id)
      );
      
      toast({
        title: "Student Removed",
        description: `${studentToDelete.name} has been removed from the system`,
        duration: 3000,
      });
      
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-500">Manage all students registered at the coaching center</p>
        </div>
        <Link to="/admin/add-student">
          <Button className="flex items-center gap-2">
            <PlusCircle size={16} />
            Add Student
          </Button>
        </Link>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                        student.fees === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}
                      onClick={() => handleToggleFeeStatus(student.id)}
                    >
                      {student.fees}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit size={16} className="mr-2" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleFeeStatus(student.id)}>
                          <Edit size={16} className="mr-2" />
                          Toggle Fee Status
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => confirmDeleteStudent(student.id, student.name)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Remove Student
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {studentToDelete?.name} from the system? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteStudent}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminStudents;
