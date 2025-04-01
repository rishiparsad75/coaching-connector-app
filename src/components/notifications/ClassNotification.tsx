
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bell, Clock } from "lucide-react";
import { format, addMinutes, isBefore } from "date-fns";

type ClassSchedule = {
  id: string;
  course: string;
  time: string;
  days: string;
  room: string;
  instructor: string;
};

// Helper function to check if a class is today
const isClassToday = (classDays: string): boolean => {
  const today = format(new Date(), 'EEEE').toLowerCase();
  return classDays.toLowerCase().includes(today);
};

// Parse time string like "9:00 AM - 10:30 AM" and return Date object for start time
const parseClassTime = (timeString: string): Date => {
  const startTimeStr = timeString.split('-')[0].trim();
  const [hourMin, ampm] = startTimeStr.split(' ');
  let [hours, minutes] = hourMin.split(':').map(Number);
  
  if (ampm.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  } else if (ampm.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }
  
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
};

// Check if class is starting soon (within next 15 minutes)
const isClassStartingSoon = (classTime: Date): boolean => {
  const now = new Date();
  const fifteenMinutesFromNow = addMinutes(now, 15);
  return isBefore(classTime, fifteenMinutesFromNow) && isBefore(now, classTime);
};

export const useClassNotifications = (
  scheduleData: ClassSchedule[],
  notifyMinutesBefore: number = 15
) => {
  const { toast } = useToast();
  const [notifiedClasses, setNotifiedClasses] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check for upcoming classes
    const checkUpcomingClasses = () => {
      const todayClasses = scheduleData.filter(cls => isClassToday(cls.days));
      
      todayClasses.forEach(cls => {
        const classTime = parseClassTime(cls.time);
        
        if (isClassStartingSoon(classTime) && !notifiedClasses.has(cls.id)) {
          // Notify about the upcoming class
          toast({
            title: "Class Starting Soon",
            description: `${cls.course} with ${cls.instructor} in ${cls.room} at ${cls.time.split('-')[0].trim()}`,
            variant: "default",
          });
          
          // Add to notified classes to prevent duplicate notifications
          setNotifiedClasses(prev => new Set([...prev, cls.id]));
        }
      });
    };

    // Initial check
    checkUpcomingClasses();
    
    // Set interval to check every minute
    const intervalId = setInterval(checkUpcomingClasses, 60000);
    
    return () => clearInterval(intervalId);
  }, [scheduleData, toast, notifiedClasses]);

  return null;
};

export const ClassNotificationsProvider: React.FC<{
  scheduleData: ClassSchedule[];
  children: React.ReactNode;
}> = ({ scheduleData, children }) => {
  useClassNotifications(scheduleData);
  return <>{children}</>;
};

export const NotificationBell: React.FC<{
  scheduleData: ClassSchedule[];
  onClick?: () => void;
}> = ({ scheduleData, onClick }) => {
  const [upcomingClasses, setUpcomingClasses] = useState<ClassSchedule[]>([]);
  
  useEffect(() => {
    // Filter classes that are today and starting soon
    const todayClasses = scheduleData.filter(cls => isClassToday(cls.days));
    const upcoming = todayClasses.filter(cls => {
      const classTime = parseClassTime(cls.time);
      return isClassStartingSoon(classTime);
    });
    
    setUpcomingClasses(upcoming);
  }, [scheduleData]);

  return (
    <div className="relative" onClick={onClick}>
      <Bell className="h-5 w-5" />
      {upcomingClasses.length > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
          {upcomingClasses.length}
        </span>
      )}
    </div>
  );
};
