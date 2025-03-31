
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  ClipboardCheck, 
  Info, 
  Menu, 
  X,
  Video
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => (
  <Link to={to} onClick={onClick}>
    <Button
      variant={active ? "default" : "ghost"}
      className={`w-full justify-start gap-2 mb-1 ${
        active ? 'bg-primary text-white' : 'hover:bg-primary/10'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

const CoachingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { to: '/schedule', icon: <Calendar size={20} />, label: 'Schedule' },
    { to: '/attendance', icon: <ClipboardCheck size={20} />, label: 'Attendance' },
    { to: '/online-classes', icon: <Video size={20} />, label: 'Online Classes' },
    { to: '/profile', icon: <Users size={20} />, label: 'Profile' },
    { to: '/about', icon: <Info size={20} />, label: 'About Us' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-b-primary/10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" alt="SSF Study Point" className="h-10 mr-2" />
              <h1 className="text-xl font-bold text-primary">SSF Study Point</h1>
            </Link>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:block w-64 border-r bg-sidebar-background border-r-primary/10 p-4">
          <nav className="space-y-1 mt-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </nav>
        </aside>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50">
            <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-lg p-4">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavItem
                    key={item.to}
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    active={location.pathname === item.to}
                    onClick={closeMobileMenu}
                  />
                ))}
              </nav>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CoachingLayout;
