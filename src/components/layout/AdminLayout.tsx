
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm hidden md:block">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" 
              alt="SSF Study Point" 
              className="h-10 mr-2" 
            />
            <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Logged in as</p>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          
          <nav className="space-y-1">
            <Link to="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2" size={18} />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/students">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2" size={18} />
                Students
              </Button>
            </Link>
            <Link to="/admin/courses">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2" size={18} />
                Courses
              </Button>
            </Link>
            <Link to="/admin/schedule">
              <Button variant="ghost" className="w-full justify-start">
                <Calendar className="mr-2" size={18} />
                Schedule
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2" size={18} />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
        
        <div className="p-4 mt-auto border-t absolute bottom-0 w-64">
          <Button variant="outline" className="w-full justify-start text-red-500" onClick={handleLogout}>
            <LogOut className="mr-2" size={18} />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" 
              alt="SSF Study Point" 
              className="h-8 mr-2" 
            />
            <h1 className="text-lg font-bold text-primary">Admin</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut size={16} />
          </Button>
        </div>
        
        {/* Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
