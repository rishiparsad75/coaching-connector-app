
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for the courses
const initialCourses = [
  { id: '1', name: 'Mathematics', students: 45, instructor: 'Dr. Patel', schedule: 'Mon, Wed, Fri 9:00 AM' },
  { id: '2', name: 'Physics', students: 38, instructor: 'Prof. Sharma', schedule: 'Tue, Thu 10:30 AM' },
  { id: '3', name: 'Chemistry', students: 32, instructor: 'Dr. Gupta', schedule: 'Mon, Wed 2:00 PM' },
  { id: '4', name: 'Biology', students: 28, instructor: 'Dr. Singh', schedule: 'Tue, Thu 3:30 PM' },
  { id: '5', name: 'English', students: 50, instructor: 'Mrs. Verma', schedule: 'Fri 12:00 PM' },
  { id: '6', name: 'Computer Science', students: 35, instructor: 'Mr. Joshi', schedule: 'Wed, Fri 4:00 PM' },
];

const AdminCourses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (course: any) => {
    setCurrentCourse({ ...course });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (currentCourse) {
      setCourses(courses.map(course => 
        course.id === currentCourse.id ? currentCourse : course
      ));
      setIsEditDialogOpen(false);
      toast({
        title: "Course Updated",
        description: `${currentCourse.name} has been updated successfully.`,
      });
    }
  };

  const handleDelete = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "Course Removed",
      description: "The course has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    setCurrentCourse({
      id: '',
      name: '',
      students: 0,
      instructor: '',
      schedule: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleAdd = () => {
    const newCourse = {
      id: String(Date.now()),
      name: currentCourse?.name || '',
      students: Number(currentCourse?.students) || 0,
      instructor: currentCourse?.instructor || '',
      schedule: currentCourse?.schedule || '',
    };
    
    setCourses([...courses, newCourse]);
    setIsAddDialogOpen(false);
    setCurrentCourse(null);
    toast({
      title: "Course Added",
      description: `${newCourse.name} has been added successfully.`,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground">Manage all courses offered at the coaching center</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses List</CardTitle>
          <CardDescription>All courses currently offered by the coaching center. You can edit or remove courses from here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Enrolled Students</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map(course => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.schedule}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(course.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Make changes to the course details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Course Name</Label>
              <Input 
                id="name" 
                value={currentCourse?.name || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, name: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructor" className="text-right">Instructor</Label>
              <Input 
                id="instructor" 
                value={currentCourse?.instructor || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, instructor: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="students" className="text-right">Students</Label>
              <Input 
                id="students" 
                type="number"
                value={currentCourse?.students || 0} 
                onChange={(e) => setCurrentCourse({...currentCourse, students: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule" className="text-right">Schedule</Label>
              <Input 
                id="schedule" 
                value={currentCourse?.schedule || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, schedule: e.target.value})}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
            <DialogDescription>
              Enter the details for the new course. Click add when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-name" className="text-right">Course Name</Label>
              <Input 
                id="add-name" 
                value={currentCourse?.name || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, name: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-instructor" className="text-right">Instructor</Label>
              <Input 
                id="add-instructor" 
                value={currentCourse?.instructor || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, instructor: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-students" className="text-right">Students</Label>
              <Input 
                id="add-students" 
                type="number"
                value={currentCourse?.students || 0} 
                onChange={(e) => setCurrentCourse({...currentCourse, students: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-schedule" className="text-right">Schedule</Label>
              <Input 
                id="add-schedule" 
                value={currentCourse?.schedule || ''} 
                onChange={(e) => setCurrentCourse({...currentCourse, schedule: e.target.value})}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
