
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter 
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { registerUser, loginUser } from '../services/authService';

interface AuthModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  username: string;
  confirmPassword: string;
}

const AuthModal = ({ open, setOpen, onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' }
  });
  
  const registerForm = useForm<RegisterFormData>({
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' }
  });

  const handleLogin = (data: LoginFormData) => {
    const user = loginUser(data.email, data.password);
    if (user) {
      setOpen(false);
      loginForm.reset();
      if (onSuccess) onSuccess();
    }
  };

  const handleRegister = (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError('confirmPassword', { 
        type: 'manual', 
        message: 'Passwords do not match' 
      });
      return;
    }
    
    const user = registerUser(data.username, data.email, data.password);
    if (user) {
      setOpen(false);
      registerForm.reset();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Login or create an account to rate menu items and save your preferences.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  {...loginForm.register('email', { required: true })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  {...loginForm.register('password', { required: true })} 
                />
              </div>
              
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4">
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="register-username">Username</Label>
                <Input 
                  id="register-username" 
                  {...registerForm.register('username', { required: true })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  {...registerForm.register('email', { required: true })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  {...registerForm.register('password', { required: true })} 
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input 
                  id="register-confirm-password" 
                  type="password" 
                  {...registerForm.register('confirmPassword', { required: true })} 
                />
                {registerForm.formState.errors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {registerForm.formState.errors.confirmPassword.message}
                  </span>
                )}
              </div>
              
              <Button type="submit" className="w-full">Register</Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
