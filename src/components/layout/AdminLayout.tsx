
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, Moon, Sun, ClipboardCheck, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'dark' || 
           (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
           ? 'dark' : 'light';
  });
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    toast({
      title: `${theme === 'light' ? 'Dark' : 'Light'} mode activated`,
      description: `Switched to ${theme === 'light' ? 'dark' : 'light'} theme.`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleCreateAccount = () => {
    // In a real app, this would call an API to create the account
    toast({
      title: "Account Created",
      description: `New ${newUser.role} account created for ${newUser.name}.`,
    });
    setIsCreateAccountOpen(false);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'student'
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border shadow-sm hidden md:block">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" 
              alt="SSF Study Point" 
              className="h-10 mr-2" 
            />
            <h1 className="text-lg font-bold text-sidebar-foreground">Admin Panel</h1>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <p className="text-sm text-sidebar-foreground/70 mb-1">Logged in as</p>
            <p className="font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-sm text-sidebar-foreground/70">{user?.email}</p>
          </div>
          
          <nav className="space-y-1">
            <Link to="/admin">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground bg-sidebar-accent/0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LayoutDashboard className="mr-2" size={18} />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/students">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground bg-sidebar-accent/0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Users className="mr-2" size={18} />
                Students
              </Button>
            </Link>
            <Link to="/admin/courses">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground bg-sidebar-accent/0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <BookOpen className="mr-2" size={18} />
                Courses
              </Button>
            </Link>
            <Link to="/admin/schedule">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground bg-sidebar-accent/0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Calendar className="mr-2" size={18} />
                Schedule
              </Button>
            </Link>
            <Link to="/admin/attendance">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground bg-sidebar-accent/0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <ClipboardCheck className="mr-2" size={18} />
                Attendance
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="ghost" className="w-full justify-start text-sidebar-foreground bg-sidebar-accent/0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Settings className="mr-2" size={18} />
                Settings
              </Button>
            </Link>
          </nav>

          <div className="mt-4 pt-4 border-t border-sidebar-border">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setIsCreateAccountOpen(true)}
            >
              <UserPlus className="mr-2" size={18} />
              Create Account
            </Button>
          </div>
        </div>
        
        <div className="p-4 mt-auto border-t border-sidebar-border absolute bottom-0 w-64">
          <div className="flex justify-between mb-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-sidebar-border text-sidebar-foreground"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button 
              variant="outline" 
              className="w-3/4 justify-start text-red-500 border-sidebar-border" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2" size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-sidebar p-4 border-b border-sidebar-border flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" 
              alt="SSF Study Point" 
              className="h-8 mr-2" 
            />
            <h1 className="text-lg font-bold text-sidebar-foreground">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-sidebar-border text-sidebar-foreground"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-sidebar-border text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <main>
          {children}
        </main>
      </div>

      {/* Create Account Dialog */}
      <Dialog open={isCreateAccountOpen} onOpenChange={setIsCreateAccountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>
              Add a new student or admin account to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select 
                value={newUser.role} 
                onValueChange={(value) => setNewUser({...newUser, role: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateAccountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAccount}>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLayout;
