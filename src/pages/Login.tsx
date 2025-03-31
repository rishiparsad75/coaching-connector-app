
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(studentEmail, studentPassword, 'student');
      
      if (success) {
        toast({
          title: "Logged in successfully",
          description: "Welcome back to SSF Study Point!",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(adminEmail, adminPassword, 'admin');
      
      if (success) {
        toast({
          title: "Admin logged in successfully",
          description: "Welcome to the admin dashboard!",
        });
        navigate('/admin');
      } else {
        toast({
          variant: "destructive",
          title: "Admin login failed",
          description: "Invalid admin credentials.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/00e0e767-6224-4a34-973b-48940dc19d1b.png" 
            alt="SSF Study Point" 
            className="h-16 mx-auto mb-2" 
          />
          <h1 className="text-2xl font-bold text-primary">SSF Study Point</h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Student Login</TabsTrigger>
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Student Login</CardTitle>
                <CardDescription>Enter your credentials to access your student account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStudentLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="student-email">Email</Label>
                      <Input 
                        id="student-email" 
                        type="email" 
                        placeholder="student@example.com" 
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-password">Password</Label>
                      <Input 
                        id="student-password" 
                        type="password" 
                        value={studentPassword}
                        onChange={(e) => setStudentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-center flex justify-center">
                <p>Demo account: student@example.com / student123</p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        placeholder="admin@example.com" 
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input 
                        id="admin-password" 
                        type="password" 
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-center flex justify-center">
                <p>Demo account: admin@example.com / admin123</p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
