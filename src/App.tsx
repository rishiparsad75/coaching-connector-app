
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
import CoachingLayout from "./components/layout/CoachingLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CoachingLayout><Dashboard /></CoachingLayout>} />
          <Route path="/courses" element={<CoachingLayout><Courses /></CoachingLayout>} />
          <Route path="/profile" element={<CoachingLayout><Profile /></CoachingLayout>} />
          <Route path="/schedule" element={<CoachingLayout><Schedule /></CoachingLayout>} />
          <Route path="/attendance" element={<CoachingLayout><Attendance /></CoachingLayout>} />
          <Route path="/online-classes" element={<CoachingLayout><OnlineClasses /></CoachingLayout>} />
          <Route path="/about" element={<CoachingLayout><Index /></CoachingLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
