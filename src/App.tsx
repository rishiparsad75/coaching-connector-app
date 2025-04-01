
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
import AdminStudents from "./pages/admin/AdminStudents";
import AdminAddStudent from "./pages/admin/AdminAddStudent";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminSchedule from "./pages/admin/AdminSchedule";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAttendance from "./pages/admin/AdminAttendance";
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
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminStudents />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-student" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminAddStudent />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/courses" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminCourses />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/schedule" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminSchedule />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/attendance" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminAttendance />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <AdminSettings />
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />
            
            {/* Student routes - require authentication */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <CoachingLayout>
                    <Dashboard />
                  </CoachingLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/courses" 
              element={
                <ProtectedRoute>
                  <CoachingLayout>
                    <Courses />
                  </CoachingLayout>
                </ProtectedRoute>
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
                <ProtectedRoute>
                  <CoachingLayout>
                    <Schedule />
                  </CoachingLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/attendance" 
              element={
                <ProtectedRoute>
                  <CoachingLayout>
                    <Attendance />
                  </CoachingLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/online-classes" 
              element={
                <ProtectedRoute>
                  <CoachingLayout>
                    <OnlineClasses />
                  </CoachingLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/about" 
              element={
                <ProtectedRoute>
                  <CoachingLayout>
                    <Index />
                  </CoachingLayout>
                </ProtectedRoute>
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
