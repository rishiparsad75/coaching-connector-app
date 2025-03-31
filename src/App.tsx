
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";
import Attendance from "./pages/Attendance";
import OnlineClasses from "./pages/OnlineClasses";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachingLayout from "./components/layout/CoachingLayout";
import AdminLayout from "./components/layout/AdminLayout";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Student routes - require authentication */}
            <Route 
              path="/" 
              element={
                <CoachingLayout>
                  <Dashboard />
                </CoachingLayout>
              } 
            />
            <Route 
              path="/courses" 
              element={
                <CoachingLayout>
                  <Courses />
                </CoachingLayout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <CoachingLayout>
                    <Profile />
                  </CoachingLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/schedule" 
              element={
                <CoachingLayout>
                  <Schedule />
                </CoachingLayout>
              } 
            />
            <Route 
              path="/attendance" 
              element={
                <CoachingLayout>
                  <Attendance />
                </CoachingLayout>
              } 
            />
            <Route 
              path="/online-classes" 
              element={
                <CoachingLayout>
                  <OnlineClasses />
                </CoachingLayout>
              } 
            />
            <Route 
              path="/about" 
              element={
                <CoachingLayout>
                  <Index />
                </CoachingLayout>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
