
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, MapPin, Users, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';

// Sample schedule data - in a real app, this would come from an API
const scheduleData = [
  {
    id: 1,
    subject: 'Mathematics',
    topic: 'Calculus: Differentiation',
    startTime: '09:00',
    endTime: '10:30',
    date: '2023-08-14',
    teacher: 'Prof. Sharma',
    location: 'Room 101',
    color: 'bg-blue-500',
    isOnline: false
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Mechanics: Forces and Motion',
    startTime: '11:00',
    endTime: '12:30',
    date: '2023-08-14',
    teacher: 'Dr. Patel',
    location: 'Room 102',
    color: 'bg-green-500',
    isOnline: false
  },
  {
    id: 3,
    subject: 'Chemistry',
    topic: 'Organic Chemistry: Alkanes',
    startTime: '14:00',
    endTime: '15:30',
    date: '2023-08-14',
    teacher: 'Dr. Singh',
    location: 'Lab 3',
    color: 'bg-purple-500',
    isOnline: true
  },
  {
    id: 4,
    subject: 'English',
    topic: 'Literary Analysis',
    startTime: '09:00',
    endTime: '10:30',
    date: '2023-08-15',
    teacher: 'Mrs. Gupta',
    location: 'Room 105',
    color: 'bg-yellow-500',
    isOnline: false
  },
  {
    id: 5,
    subject: 'Computer Science',
    topic: 'Data Structures',
    startTime: '11:00',
    endTime: '12:30',
    date: '2023-08-15',
    teacher: 'Mr. Kumar',
    location: 'Computer Lab',
    color: 'bg-red-500',
    isOnline: true
  },
  {
    id: 6,
    subject: 'Mathematics',
    topic: 'Calculus: Integration',
    startTime: '09:00',
    endTime: '10:30',
    date: '2023-08-16',
    teacher: 'Prof. Sharma',
    location: 'Room 101',
    color: 'bg-blue-500',
    isOnline: false
  },
  {
    id: 7,
    subject: 'Physics',
    topic: 'Electromagnetism',
    startTime: '11:00',
    endTime: '12:30',
    date: '2023-08-16',
    teacher: 'Dr. Patel',
    location: 'Room 102',
    color: 'bg-green-500',
    isOnline: true
  },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const Schedule = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(today, { weekStartsOn: 1 }));
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  
  // Format date for comparison
  const formatDateForCompare = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  // Calculate week range
  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: addDays(currentWeekStart, 6)
  });

  // Navigate week
  const previousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const nextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  // Filter classes for selected date or week
  const getFilteredClasses = () => {
    if (viewMode === 'day' && selectedDate) {
      return scheduleData.filter(
        item => item.date === formatDateForCompare(selectedDate)
      );
    } else if (viewMode === 'week') {
      const weekDatesStr = weekDays.map(day => formatDateForCompare(day));
      return scheduleData.filter(item => weekDatesStr.includes(item.date));
    }
    return scheduleData;
  };

  const filteredClasses = getFilteredClasses();

  // Find classes for a specific day and time (for week view)
  const getClassForDayAndTime = (day: Date, timeSlot: string) => {
    const dayStr = formatDateForCompare(day);
    return scheduleData.find(
      item => item.date === dayStr && 
      (item.startTime === timeSlot || 
        (item.startTime < timeSlot && item.endTime > timeSlot))
    );
  };

  return (
    <div className="coaching-container">
      <h1 className="page-title">Class Schedule</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - calendar picker */}
        <div className="w-full md:w-auto">
          <Card className="md:min-w-[350px]">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">View Mode</h3>
                <Tabs defaultValue="week" onValueChange={(v) => setViewMode(v as 'day' | 'week' | 'month')}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right side - schedule display */}
        <div className="flex-1">
          {viewMode === 'day' && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>
                  {selectedDate ? format(selectedDate, 'EEEE, MMMM dd, yyyy') : 'Select a date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredClasses.length > 0 ? (
                  <div className="space-y-4">
                    {filteredClasses.map(classItem => (
                      <div 
                        key={classItem.id} 
                        className="border rounded-md p-4 transition-all hover:shadow-md cursor-pointer bg-white"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-1 h-full min-h-[3rem] ${classItem.color} rounded-full mr-3`}></div>
                            <div>
                              <h3 className="font-medium text-lg">{classItem.subject}</h3>
                              <p className="text-sm text-muted-foreground">{classItem.topic}</p>
                            </div>
                          </div>
                          {classItem.isOnline && (
                            <Badge variant="outline" className="bg-primary/10 text-primary">Online</Badge>
                          )}
                        </div>
                        
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span>{classItem.startTime} - {classItem.endTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            <span>{classItem.teacher}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <span>{classItem.location}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end">
                          {classItem.isOnline && (
                            <Button>Join Online Class</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No classes scheduled</h3>
                    <p className="text-muted-foreground">There are no classes scheduled for this day.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {viewMode === 'week' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="flex items-center">
                  {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={previousWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-auto">
                <div className="min-w-[800px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[10%]">Time</TableHead>
                        {weekDays.map((day) => (
                          <TableHead 
                            key={day.toString()} 
                            className={`text-center ${isSameDay(day, today) ? 'bg-primary/5' : ''}`}
                          >
                            <div>{format(day, 'EEE')}</div>
                            <div className="text-sm font-normal">{format(day, 'MMM d')}</div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeSlots.map((timeSlot) => (
                        <TableRow key={timeSlot}>
                          <TableCell className="font-medium">{timeSlot}</TableCell>
                          {weekDays.map((day) => {
                            const classItem = getClassForDayAndTime(day, timeSlot);
                            return (
                              <TableCell 
                                key={day.toString()} 
                                className={`text-center ${isSameDay(day, today) ? 'bg-primary/5' : ''}`}
                              >
                                {classItem && classItem.startTime === timeSlot && (
                                  <div 
                                    className={`${classItem.color} text-white p-2 rounded-md text-sm`}
                                  >
                                    <div className="font-medium">{classItem.subject}</div>
                                    <div className="text-xs">{classItem.startTime} - {classItem.endTime}</div>
                                    {classItem.isOnline && (
                                      <Badge variant="outline" className="bg-white/20 text-white mt-1">
                                        Online
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
          
          {viewMode === 'month' && (
            <Card>
              <CardHeader>
                <CardTitle>Monthly View</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-10">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Monthly view coming soon</h3>
                <p className="text-muted-foreground">We're working on this feature. Please use Day or Week view for now.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
