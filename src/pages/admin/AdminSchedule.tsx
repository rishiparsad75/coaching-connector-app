
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for the schedule
const initialSchedule = [
  { id: '1', course: 'Mathematics', time: '9:00 AM - 10:30 AM', days: 'Monday, Wednesday, Friday', room: 'Room 101', instructor: 'Dr. Patel' },
  { id: '2', course: 'Physics', time: '10:30 AM - 12:00 PM', days: 'Tuesday, Thursday', room: 'Room 102', instructor: 'Prof. Sharma' },
  { id: '3', course: 'Chemistry', time: '2:00 PM - 3:30 PM', days: 'Monday, Wednesday', room: 'Lab 201', instructor: 'Dr. Gupta' },
  { id: '4', course: 'Biology', time: '3:30 PM - 5:00 PM', days: 'Tuesday, Thursday', room: 'Lab 202', instructor: 'Dr. Singh' },
  { id: '5', course: 'English', time: '12:00 PM - 1:30 PM', days: 'Friday', room: 'Room 103', instructor: 'Mrs. Verma' },
  { id: '6', course: 'Computer Science', time: '4:00 PM - 5:30 PM', days: 'Wednesday, Friday', room: 'Computer Lab', instructor: 'Mr. Joshi' },
];

const AdminSchedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (item: any) => {
    setCurrentItem({ ...item });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (currentItem) {
      setSchedule(schedule.map(item => item.id === currentItem.id ? currentItem : item));
      setIsEditDialogOpen(false);
      toast({
        title: "Schedule Updated",
        description: `${currentItem.course} schedule has been updated successfully.`,
      });
    }
  };

  const handleDelete = (id: string) => {
    setSchedule(schedule.filter(item => item.id !== id));
    toast({
      title: "Schedule Removed",
      description: "The class has been removed from the schedule.",
      variant: "destructive",
    });
  };

  const handleAdd = () => {
    const newItem = {
      id: String(Date.now()),
      course: currentItem?.course || '',
      time: currentItem?.time || '',
      days: currentItem?.days || '',
      room: currentItem?.room || '',
      instructor: currentItem?.instructor || '',
    };
    
    setSchedule([...schedule, newItem]);
    setIsAddDialogOpen(false);
    setCurrentItem(null);
    toast({
      title: "Schedule Added",
      description: `${newItem.course} has been added to the schedule.`,
    });
  };

  const handleAddNew = () => {
    setCurrentItem({
      id: '',
      course: '',
      time: '',
      days: '',
      room: '',
      instructor: '',
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Schedule Management</h1>
          <p className="text-muted-foreground">Manage class schedules for the coaching center</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add New Class
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
          <CardDescription>Complete schedule of all classes at the coaching center. You can edit or remove classes from here.</CardDescription>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.course}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.days}</TableCell>
                  <TableCell>{item.room}</TableCell>
                  <TableCell>{item.instructor}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(item.id)}>
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
            <DialogTitle>Edit Class Schedule</DialogTitle>
            <DialogDescription>
              Make changes to the class schedule here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">Course</Label>
              <Input 
                id="course" 
                value={currentItem?.course || ''} 
                onChange={(e) => setCurrentItem({...currentItem, course: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <Input 
                id="time" 
                value={currentItem?.time || ''} 
                onChange={(e) => setCurrentItem({...currentItem, time: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">Days</Label>
              <Input 
                id="days" 
                value={currentItem?.days || ''} 
                onChange={(e) => setCurrentItem({...currentItem, days: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">Room</Label>
              <Input 
                id="room" 
                value={currentItem?.room || ''} 
                onChange={(e) => setCurrentItem({...currentItem, room: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructor" className="text-right">Instructor</Label>
              <Input 
                id="instructor" 
                value={currentItem?.instructor || ''} 
                onChange={(e) => setCurrentItem({...currentItem, instructor: e.target.value})}
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
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>
              Enter the details for the new class. Click add when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-course" className="text-right">Course</Label>
              <Input 
                id="add-course" 
                value={currentItem?.course || ''} 
                onChange={(e) => setCurrentItem({...currentItem, course: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-time" className="text-right">Time</Label>
              <Input 
                id="add-time" 
                value={currentItem?.time || ''} 
                onChange={(e) => setCurrentItem({...currentItem, time: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-days" className="text-right">Days</Label>
              <Input 
                id="add-days" 
                value={currentItem?.days || ''} 
                onChange={(e) => setCurrentItem({...currentItem, days: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-room" className="text-right">Room</Label>
              <Input 
                id="add-room" 
                value={currentItem?.room || ''} 
                onChange={(e) => setCurrentItem({...currentItem, room: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="add-instructor" className="text-right">Instructor</Label>
              <Input 
                id="add-instructor" 
                value={currentItem?.instructor || ''} 
                onChange={(e) => setCurrentItem({...currentItem, instructor: e.target.value})}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSchedule;
